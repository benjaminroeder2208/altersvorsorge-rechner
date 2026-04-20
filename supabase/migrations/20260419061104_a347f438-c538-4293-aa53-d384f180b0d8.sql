-- Tighten INSERT policy on simulation_leads so anonymous users
-- cannot forge confirmation state or tokens.
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.simulation_leads;

CREATE POLICY "Anyone can insert unconfirmed leads"
ON public.simulation_leads
FOR INSERT
TO public
WITH CHECK (
  -- Anonymous/anon callers must not pre-set confirmation state or tokens.
  -- Service role bypasses RLS and can set these server-side.
  confirmed = false
  AND confirmation_token IS NULL
);