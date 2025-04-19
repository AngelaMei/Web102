import { createClient } from '@supabase/supabase-js'

const URL = 'https://vgdeolaovdnqdtchttwq.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZGVvbGFvdmRucWR0Y2h0dHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Nzk3MzksImV4cCI6MjA2MDA1NTczOX0.bsVYtTyeZ-H4bi81N1cFpwI6PfsN-A1o5t_aVpzDWwg';

export const supabase = createClient(URL, API_KEY);