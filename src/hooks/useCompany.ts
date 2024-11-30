import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from '@/hooks/use-toast';

export function useCompany() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchCompany();
    }
  }, [user]);

  async function fetchCompany() {
    try {
      const { data: companyMember, error: memberError } = await supabase
        .from('company_members')
        .select('company_id')
        .eq('user_id', user?.id)
        .single();

      if (memberError) throw memberError;

      if (companyMember) {
        const { data: company, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('id', companyMember.company_id)
          .single();

        if (companyError) throw companyError;
        setCompany(company);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch company data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return { company, loading };
} 