-- ============================================================================
-- ZENTRO DIGITAL MARKETING AGENCY - INQUIRIES DATABASE SCHEMA
-- ============================================================================

-- 1. Create inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  service_required TEXT NOT NULL,
  project_budget TEXT,
  project_details TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'contacted', 'in_progress', 'closed')),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Create index on created_at for fast query ordering in dashboard
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_email_idx ON public.inquiries (email);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 4. Policies:
-- Allow anonymous/public visitors to INSERT new inquiries via the website form
CREATE POLICY "Allow anonymous website submissions"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Deny public reading of inquiries to prevent competitor or scraper data leakage.
-- Only authenticated users (admins/agency staff logged in to Supabase) can view inquiries.
CREATE POLICY "Allow authenticated staff to view inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update inquiries (e.g., mark as 'contacted' or 'closed')
CREATE POLICY "Allow authenticated staff to update inquiries"
  ON public.inquiries
  FOR UPDATE
  TO authenticated
  USING (true);
