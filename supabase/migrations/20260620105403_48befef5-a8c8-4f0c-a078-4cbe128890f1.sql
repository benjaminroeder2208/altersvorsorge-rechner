
CREATE TABLE public.ai_assistant_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  vorname text,
  email text,
  alter integer,
  sparbetrag_monatlich numeric,
  rendite_prozent numeric,
  renteneintrittsalter integer,
  kinder_anzahl integer DEFAULT 0,
  ergebnis_kapital numeric,
  newsletter_opt_in boolean DEFAULT false,
  flow_completed boolean DEFAULT false,
  session_id text
);

GRANT INSERT, UPDATE ON public.ai_assistant_leads TO anon, authenticated;
GRANT SELECT, DELETE ON public.ai_assistant_leads TO authenticated;
GRANT ALL ON public.ai_assistant_leads TO service_role;

ALTER TABLE public.ai_assistant_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert"
  ON public.ai_assistant_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update by session"
  ON public.ai_assistant_leads
  FOR UPDATE
  TO anon, authenticated
  USING (session_id IS NOT NULL)
  WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Admins can view all leads"
  ON public.ai_assistant_leads
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
  ON public.ai_assistant_leads
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
