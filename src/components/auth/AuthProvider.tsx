import { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import LoadingScreen from '@/components/LoadingScreen';
import { toast } from '@/hooks/use-toast';
import * as auth from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthError = (error: AuthError) => {
    toast({
      title: "Authentication Error",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  };

  const signIn = async (email: string, password: string) => {
    try {
      await auth.signIn(email, password);
    } catch (error) {
      handleAuthError(error as AuthError);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await auth.signUp(email, password);
    } catch (error) {
      handleAuthError(error as AuthError);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      handleAuthError(error as AuthError);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await auth.resetPassword(email);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for the password reset link.",
      });
    } catch (error) {
      handleAuthError(error as AuthError);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}