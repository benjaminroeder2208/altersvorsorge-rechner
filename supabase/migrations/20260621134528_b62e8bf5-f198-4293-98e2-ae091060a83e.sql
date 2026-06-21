
DROP POLICY IF EXISTS "Authenticated can insert content pages" ON public.content_pages;
DROP POLICY IF EXISTS "Authenticated can update content pages" ON public.content_pages;
DROP POLICY IF EXISTS "Authenticated can delete content pages" ON public.content_pages;

CREATE POLICY "Admins can insert content pages"
  ON public.content_pages FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update content pages"
  ON public.content_pages FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete content pages"
  ON public.content_pages FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
