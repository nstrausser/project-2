import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://umgiffmkrbwvuempwazw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZ2lmZm1rcmJ3dnVlbXB3YXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyODc5NzUsImV4cCI6MjA0Njg2Mzk3NX0.P14SnWoJX2MhAxdVFjarA2zQDnpm1IyBd-_ZpQiBRZg';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);