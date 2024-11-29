export const env = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
} as const;

// Type check to ensure all environment variables are defined
Object.entries(env).forEach(([key, value]) => {
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
}); 