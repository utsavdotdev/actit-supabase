import {createClient} from '@supabase/supabase-js'
export function createClient() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}
