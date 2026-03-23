DROP POLICY "Anyone can insert results" ON calculator_results;

CREATE POLICY "Anyone can insert results"
  ON calculator_results FOR INSERT
  TO public
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);