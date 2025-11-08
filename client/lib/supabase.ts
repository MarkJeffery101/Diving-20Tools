import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else if (typeof window !== "undefined") {
  // In development without env vars, create a dummy client
  // or let it fail gracefully when auth is actually used
  console.warn("Supabase environment variables not configured. Auth will not work.");
}

export { supabase };
