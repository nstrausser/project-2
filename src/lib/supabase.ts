import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

export const supabase = createClient(
  'https://ekmsjqlnhtuxzycwivwv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbXNqcWxuaHR1eHp5Y3dpdnd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzOTQ4NTAsImV4cCI6MjA0NDk3MDg1MH0.leGZXrO1_m_bWVSoH4T0hWKH2MFaO-18upbUa7zFuBA',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);