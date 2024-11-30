import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCompany } from '@/hooks/useCompany';
import { toast } from '@/hooks/use-toast';
import type { Appointment } from '@/types/appointment';

export function useAppointments() {
  const { user } = useAuth();
  const { company } = useCompany();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (company) {
      fetchAppointments();
    }
  }, [company]);

  async function fetchAppointments() {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          customers (
            name,
            email,
            phone
          ),
          vehicles (
            make,
            model,
            year,
            color
          )
        `)
        .eq('company_id', company.id)
        .order('start_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch appointments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function createAppointment(appointmentData: Partial<Appointment>) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([{ ...appointmentData, company_id: company.id }])
        .select()
        .single();

      if (error) throw error;
      setAppointments([...appointments, data]);
      return data;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create appointment',
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateAppointment(id: string, updates: Partial<Appointment>) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setAppointments(appointments.map(app => app.id === id ? data : app));
      return data;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update appointment',
        variant: 'destructive',
      });
      throw error;
    }
  }

  return {
    appointments,
    loading,
    createAppointment,
    updateAppointment,
    refreshAppointments: fetchAppointments,
  };
} 