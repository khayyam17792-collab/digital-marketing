import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Checks if Supabase has been configured with a public client key.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseKey &&
    ![
      "your_anon_key_here",
      "your_supabase_anon_key_here",
      "your_supabase_publishable_key_here",
    ].includes(supabaseKey) &&
    supabaseUrl.startsWith("https://")
)

/**
 * Uses a Supabase publishable key or legacy anon key with Row Level Security.
 */
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null
