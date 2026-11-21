-- Fix: ensure anon and public role have complete permission to INSERT
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Drop previous insert policy if it exists
DROP POLICY IF EXISTS "Allow anonymous website submissions" ON public.inquiries;
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.inquiries;

-- Create policy allowing anyone (anon) to insert inquiries
CREATE POLICY "Enable insert for everyone"
  ON public.inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Ensure anon role has table grant
GRANT ALL ON public.inquiries TO anon;
GRANT ALL ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
