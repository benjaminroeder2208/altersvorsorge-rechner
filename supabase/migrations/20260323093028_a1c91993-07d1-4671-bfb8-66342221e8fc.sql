DROP POLICY "Service role can read leads" ON simulation_leads;

CREATE POLICY "Service role can read leads"
  ON simulation_leads FOR SELECT
  TO public
  USING (auth.role() = 'service_role');