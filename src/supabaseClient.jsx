import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qrpctkcqotdmshdbdiub.supabase.co'; // import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFycGN0a2Nxb3RkbXNoZGJkaXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMDkyMjcsImV4cCI6MjAxNDc4NTIyN30.qT0-2v266YyMyrUU9yKiROUveTNTgPrNqMdhAk04AYA'; // import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;