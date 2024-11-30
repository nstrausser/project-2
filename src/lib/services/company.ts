import { supabase } from '@/lib/supabase';

export async function createCompany(userId: string, companyData: {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
}) {
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .insert([companyData])
    .select()
    .single();

  if (companyError) throw companyError;

  const { error: memberError } = await supabase
    .from('company_members')
    .insert([
      {
        company_id: company.id,
        user_id: userId,
        role: 'owner',
      },
    ]);

  if (memberError) throw memberError;

  return company;
}

export async function updateCompany(companyId: string, updates: {
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
}) {
  const { data, error } = await supabase
    .from('companies')
    .update(updates)
    .eq('id', companyId)
    .select()
    .single();

  if (error) throw error;
  return data;
} 