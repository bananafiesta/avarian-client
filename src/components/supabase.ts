import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const supabase: SupabaseClient = createClient('https://mrxhsyvorpwbzgesfqqo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yeGhzeXZvcnB3YnpnZXNmcXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MzgyMjYsImV4cCI6MjAzNjMxNDIyNn0.Q4w8mSGrSPb9JuvIT0904RUwJY0iKnX-Zkj6oFFHBRY');
