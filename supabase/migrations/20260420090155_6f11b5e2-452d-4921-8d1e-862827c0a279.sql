DROP POLICY IF EXISTS "Anyone can insert unconfirmed leads" ON public.simulation_leads;

CREATE POLICY "Anyone can insert unconfirmed leads"
ON public.simulation_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (confirmed = false);