import { createClient } from '@supabase/supabase-js'

const URL = 'https://kdvsgcttqyghmsvcbaxw.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkdnNnY3R0cXlnaG1zdmNiYXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwODc0NTUsImV4cCI6MjA2MDY2MzQ1NX0.kcjBiCr2CRKxit0AlUVH2aDtyO1Rlpf-UGogZ6vV4UQ';

export const supabase = createClient(URL, API_KEY);