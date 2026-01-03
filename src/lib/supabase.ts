import { createClient } from '@supabase/supabase-js'

// 1. Grab your keys from the .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 2. Initialize the client
// The '!' tells TypeScript "Trust me, these variables exist"
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
