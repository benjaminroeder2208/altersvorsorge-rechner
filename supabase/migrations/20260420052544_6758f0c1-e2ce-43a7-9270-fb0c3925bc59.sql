-- Newsletter subscriptions with lead magnet (PDF checklist)
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  subscribed_to_newsletter BOOLEAN NOT NULL DEFAULT true,
  confirmation_token TEXT,
  confirmed_at TIMESTAMPTZ,
  pdf_base64 TEXT,
  lead_magnet_type TEXT NOT NULL DEFAULT 'checkliste_3_szenarien',
  source TEXT NOT NULL DEFAULT 'newsletter_landing',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX newsletter_subscriptions_email_idx
  ON public.newsletter_subscriptions (lower(email));

CREATE INDEX newsletter_subscriptions_token_idx
  ON public.newsletter_subscriptions (confirmation_token)
  WHERE confirmation_token IS NOT NULL;

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anyone may insert, but only as unconfirmed entry without token (token set server-side)
CREATE POLICY "Anyone can insert pending newsletter signups"
  ON public.newsletter_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (
    status = 'pending'
    AND confirmation_token IS NULL
    AND confirmed_at IS NULL
  );

CREATE POLICY "Service role can read newsletter subscriptions"
  ON public.newsletter_subscriptions
  FOR SELECT
  TO public
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can update newsletter subscriptions"
  ON public.newsletter_subscriptions
  FOR UPDATE
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');