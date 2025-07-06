import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create a Supabase client with service role key for admin operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Create a client for public operations
export const supabasePublic = createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) 