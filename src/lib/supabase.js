import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Checks if Supabase has been properly configured with valid keys.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseAnonKey !== "your_anon_key_here" &&
    supabaseAnonKey !== "your_supabase_anon_key_here" &&
    supabaseUrl.startsWith("https://")
)

/**
 * Supabase client instance for frontend operations.
 * Uses only the public/anon key, safe for client-side usage with Row Level Security (RLS).
 */
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
