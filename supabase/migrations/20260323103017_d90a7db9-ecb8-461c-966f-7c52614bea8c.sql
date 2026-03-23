
CREATE TABLE public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  email text,
  ip_address text,
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert audit logs"
  ON public.security_audit_log FOR INSERT
  TO public
  WITH CHECK (auth.role() = 'service_role'::text);

CREATE POLICY "Service role can read audit logs"
  ON public.security_audit_log FOR SELECT
  TO public
  USING (auth.role() = 'service_role'::text);

CREATE INDEX idx_audit_log_event_type ON public.security_audit_log (event_type);
CREATE INDEX idx_audit_log_created_at ON public.security_audit_log (created_at DESC);
