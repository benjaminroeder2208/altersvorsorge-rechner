-- 1. App role enum + user_roles table (security best practice: roles in separate table)
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles WITHOUT recursive RLS
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: users can read their own roles, only admins can manage
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));


-- 2. Newsletter editions table
CREATE TABLE public.newsletter_editions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  preheader text,
  html_content text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  scheduled_at timestamptz,
  sent_at timestamptz,
  recipient_count integer NOT NULL DEFAULT 0,
  success_count integer NOT NULL DEFAULT 0,
  failed_count integer NOT NULL DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT newsletter_editions_status_check
    CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed', 'cancelled'))
);

CREATE INDEX idx_newsletter_editions_status_scheduled
  ON public.newsletter_editions (status, scheduled_at)
  WHERE status = 'scheduled';

ALTER TABLE public.newsletter_editions ENABLE ROW LEVEL SECURITY;

-- Only admins can read/write editions
CREATE POLICY "Admins can view editions"
  ON public.newsletter_editions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert editions"
  ON public.newsletter_editions FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update editions"
  ON public.newsletter_editions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete editions"
  ON public.newsletter_editions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));


-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_newsletter_editions_updated_at
  BEFORE UPDATE ON public.newsletter_editions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();


-- 3. Per-recipient send log (helps with retries and stats, max 500 rows per edition for now)
CREATE TABLE public.newsletter_edition_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id uuid NOT NULL REFERENCES public.newsletter_editions(id) ON DELETE CASCADE,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  resend_message_id text,
  error_message text,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (edition_id, email),
  CONSTRAINT newsletter_recipients_status_check
    CHECK (status IN ('pending', 'sent', 'failed', 'skipped_suppressed', 'skipped_unsubscribed'))
);

CREATE INDEX idx_newsletter_recipients_edition ON public.newsletter_edition_recipients (edition_id, status);

ALTER TABLE public.newsletter_edition_recipients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view recipient log"
  ON public.newsletter_edition_recipients FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- (Inserts/updates only by service role; no policy = blocked for authenticated)
