-- ============================================================
-- PUBLISH LAB — Supabase RLS Setup
-- Run this in: supabase.com/dashboard → project mctmtdjbjynzlunfictm
--              → SQL Editor → New Query → paste → Run
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. PROFILES TABLE
-- Stores subscription tier per user (synced by Paddle webhook)
-- ────────────────────────────────────────────────────────────

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users CANNOT insert or update profiles directly
-- Only the Paddle webhook (service role key) can write profiles
CREATE POLICY "profiles_no_insert"
  ON profiles FOR INSERT
  WITH CHECK (false);

CREATE POLICY "profiles_no_update"
  ON profiles FOR UPDATE
  USING (false);

CREATE POLICY "profiles_no_delete"
  ON profiles FOR DELETE
  USING (false);

-- ────────────────────────────────────────────────────────────
-- 2. CONTENT TABLE
-- Stores usage records (one row per generation event)
-- ────────────────────────────────────────────────────────────

-- Enable RLS
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Users can read only their own records
CREATE POLICY "content_select_own"
  ON content FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert only records with their own user_id
-- Prevents inserting fake low-usage records for other users
CREATE POLICY "content_insert_own"
  ON content FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Nobody can update or delete usage records
-- Prevents resetting usage counts by deleting rows
CREATE POLICY "content_no_update"
  ON content FOR UPDATE
  USING (false);

CREATE POLICY "content_no_delete"
  ON content FOR DELETE
  USING (false);

-- ────────────────────────────────────────────────────────────
-- 3. VERIFICATION QUERIES (run after applying policies)
-- Should return RLS = true for both tables
-- ────────────────────────────────────────────────────────────

SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('profiles', 'content');

-- ────────────────────────────────────────────────────────────
-- 4. MONTHLY USAGE FUNCTION (server-side enforcement helper)
-- Called by /api/check-usage serverless function
-- Returns usage counts for the current calendar month
-- ────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_monthly_usage(p_user_id UUID)
RETURNS TABLE (
  books_this_month   BIGINT,
  images_this_month  BIGINT,
  manuscripts_this_month BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER -- runs as the function owner (service role) so it bypasses RLS
AS $$
DECLARE
  start_of_month TIMESTAMPTZ := date_trunc('month', now());
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) FILTER (WHERE type IN ('KDP_BOOK_LAB', 'TEXT_TO_IMAGE', 'COLORING_PAGES', 'BOOK')) AS books_this_month,
    COUNT(*) FILTER (WHERE type IN ('POD_MERCH', 'LOGO_CREATOR', 'PATTERN_MAKER'))              AS images_this_month,
    COUNT(*) FILTER (WHERE type = 'MANUSCRIPT_DOCTOR')                                          AS manuscripts_this_month
  FROM content
  WHERE user_id = p_user_id
    AND created_at >= start_of_month;
END;
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION get_monthly_usage(UUID) TO authenticated;
