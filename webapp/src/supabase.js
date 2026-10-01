import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wrcjlgklobxepqzchraa.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyY2psZ2tsb2J4ZXBxemNocmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MjMzMzcsImV4cCI6MjEwNjM5OTMzN30.gD65baQ-Xkk9MfgWy_EMdspqh5wZmDi8rubrDTsC9hE';

export const supabase = createClient(supabaseUrl, supabaseKey);
