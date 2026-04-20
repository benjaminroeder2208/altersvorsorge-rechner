CREATE POLICY "Admins can view leads"
ON public.simulation_leads
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));