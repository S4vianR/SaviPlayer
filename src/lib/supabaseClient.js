import {createClient} from '@supabase/supabase-js'

const supabaseUrl = "https://zusbrvxyixbimtetogyp.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, SUPABASE_KEY)