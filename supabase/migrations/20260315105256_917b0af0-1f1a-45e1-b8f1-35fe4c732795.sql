
CREATE TABLE public.simulation_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  monthly_contribution NUMERIC NOT NULL,
  birth_year INTEGER NOT NULL,
  children INTEGER NOT NULL DEFAULT 0,
  retirement_age INTEGER NOT NULL DEFAULT 67,
  return_assumption NUMERIC NOT NULL DEFAULT 7,
  calculated_capital NUMERIC NOT NULL,
  monthly_payout NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.simulation_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON public.simulation_leads FOR INSERT
  WITH CHECK (true);
