-- Drop unused legacy lead table
DROP TABLE IF EXISTS public.ai_assistant_leads CASCADE;

-- Harden simulation_leads insert policy: require email and forbid pre-confirmed inserts
DROP POLICY IF EXISTS "Anyone can insert unconfirmed leads" ON public.simulation_leads;
CREATE POLICY "Anyone can insert unconfirmed leads"
ON public.simulation_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  confirmed = false
  AND email IS NOT NULL
  AND length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);