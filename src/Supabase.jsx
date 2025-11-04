import { createClient } from "@supabase/supabase-js";


const url = "https://txykbjumieeifxygbpow.supabase.co";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eWtianVtaWVlaWZ4eWdicG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNDQ5OTUsImV4cCI6MjA3NjYyMDk5NX0.0o5erJUFnqfaIK6KiSmi9HK2IWLOKTsBVbF56rCzC-o"

export const supabase = createClient(url, key);