import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://rgbguwjmttvlvosjoinx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYmd1d2ptdHR2bHZvc2pvaW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTEzMzcsImV4cCI6MjA5Nzg2NzMzN30.559Kc9lhJL6lsf8BLUqaWpg7OwzEE9V9bdv-9x8VtSM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
