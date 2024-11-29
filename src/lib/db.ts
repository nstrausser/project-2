import { supabase } from './supabase';
import type { Database } from '@/types/supabase';

export async function getInstallers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function getInventory() {
  const { data, error } = await supabase
    .from('ppf_rolls')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getInstallations() {
  const { data, error } = await supabase
    .from('installations')
    .select(`
      *,
      users (
        name
      )
    `)
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      users (
        name
      )
    `)
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function createInstaller(installer: {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: installer.email,
    password: Math.random().toString(36).slice(-8), // Generate random password
    options: {
      data: {
        first_name: installer.firstName,
        last_name: installer.lastName,
        role: installer.role,
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function updateInstaller(id: string, updates: Partial<Database['public']['Tables']['users']['Update']>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
  return data;
}

export async function deleteInstaller(id: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Add more database functions as needed