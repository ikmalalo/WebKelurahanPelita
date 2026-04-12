import { createClient } from '@supabase/supabase-js'

// Variabel ini akan diambil dari file .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL atau Anon Key belum diset di .env. Gunakan .env.local untuk development.')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
