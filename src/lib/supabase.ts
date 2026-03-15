import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing. Please check your .env.local file.')
}

/**
 * Senior tip: Initialize the Supabase client with generated Database types
 * to get full Intellisense and type safety across the entire application.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
