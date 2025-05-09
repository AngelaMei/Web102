import { createClient } from '@supabase/supabase-js'

const URL = 'https://bznkumztvveixmxjexec.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6bmt1bXp0dnZlaXhteGpleGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MzcwOTUsImV4cCI6MjA2MjMxMzA5NX0.STbjI3s_oV3wts_dL3MoVws6h9rgpboCr20PXXQtn_E';

export const supabase = createClient(URL, API_KEY);