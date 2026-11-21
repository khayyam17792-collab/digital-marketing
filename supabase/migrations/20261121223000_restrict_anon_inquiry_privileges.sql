REVOKE ALL ON TABLE public.inquiries FROM PUBLIC, anon;
GRANT INSERT ON TABLE public.inquiries TO anon;

DROP POLICY IF EXISTS "Allow website submissions" ON public.inquiries;
DROP POLICY IF EXISTS "Allow admin staff to view inquiries" ON public.inquiries;
