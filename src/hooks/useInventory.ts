import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCompany } from '@/hooks/useCompany';
import { toast } from '@/hooks/use-toast';

interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  sku?: string;
  quantity: number;
  minimum_quantity: number;
  unit_price?: number;
  category?: string;
  supplier?: string;
}

export function useInventory() {
  const { company } = useCompany();
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    if (company) {
      fetchInventory();
    }
  }, [company]);

  async function fetchInventory() {
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .eq('company_id', company.id)
        .order('name');

      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch inventory',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateInventoryItem(id: string, updates: Partial<InventoryItem>) {
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setInventory(inventory.map(item => item.id === id ? data : item));
      return data;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update inventory item',
        variant: 'destructive',
      });
      throw error;
    }
  }

  return {
    inventory,
    loading,
    updateInventoryItem,
    refreshInventory: fetchInventory,
  };
} 