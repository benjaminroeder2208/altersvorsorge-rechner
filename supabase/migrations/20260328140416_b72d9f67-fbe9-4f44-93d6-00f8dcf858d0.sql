
CREATE TABLE public.scheduled_followup_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  resend_message_id text NOT NULL,
  mail_type text NOT NULL,
  scheduled_at timestamp with time zone NOT NULL,
  cancelled boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_scheduled_followup_email ON public.scheduled_followup_emails (email);

ALTER TABLE public.scheduled_followup_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage scheduled emails"
  ON public.scheduled_followup_emails
  FOR ALL
  TO public
  USING (auth.role() = 'service_role'::text)
  WITH CHECK (auth.role() = 'service_role'::text);
