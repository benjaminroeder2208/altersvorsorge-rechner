
CREATE TABLE public.calculator_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  monthly_contribution NUMERIC NOT NULL,
  income_bracket TEXT NOT NULL,
  birth_year INTEGER NOT NULL,
  children INTEGER NOT NULL DEFAULT 0,
  retirement_age INTEGER NOT NULL DEFAULT 67,
  return_assumption NUMERIC NOT NULL DEFAULT 7,
  total_capital NUMERIC NOT NULL,
  monthly_payout NUMERIC NOT NULL,
  own_contributions NUMERIC NOT NULL,
  subsidies NUMERIC NOT NULL,
  tax_benefits NUMERIC NOT NULL,
  capital_gains NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.calculator_results ENABLE ROW LEVEL SECURITY;

-- Jeder kann anonym speichern (user_id kann null sein)
CREATE POLICY "Anyone can insert results"
  ON public.calculator_results FOR INSERT
  WITH CHECK (true);

-- Eingeloggte Nutzer sehen nur ihre eigenen Ergebnisse
CREATE POLICY "Users can view own results"
  ON public.calculator_results FOR SELECT
  USING (auth.uid() = user_id);

-- Eingeloggte Nutzer können eigene Ergebnisse löschen
CREATE POLICY "Users can delete own results"
  ON public.calculator_results FOR DELETE
  USING (auth.uid() = user_id);
