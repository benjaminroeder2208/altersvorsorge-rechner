
-- Add confirmed and confirmation_token to simulation_leads
ALTER TABLE public.simulation_leads 
  ADD COLUMN confirmed boolean NOT NULL DEFAULT false,
  ADD COLUMN confirmation_token text UNIQUE;

-- Allow the confirm edge function to read and update leads
CREATE POLICY "Service role can read leads"
  ON public.simulation_leads
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Service role can update leads"
  ON public.simulation_leads
  FOR UPDATE
  USING (auth.role() = 'service_role'::text)
  WITH CHECK (auth.role() = 'service_role'::text);
