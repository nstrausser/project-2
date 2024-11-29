import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type Brand = {
  id: string;
  name: string;
  logo?: string;
  notes?: string;
};

type BrandManagementDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand?: Brand;
  onSave: (brand: Omit<Brand, 'id'>) => void;
};

export default function BrandManagementDialog({
  open,
  onOpenChange,
  brand,
  onSave,
}: BrandManagementDialogProps) {
  const [formData, setFormData] = useState({
    name: brand?.name || '',
    logo: brand?.logo || '',
    notes: brand?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
    toast.success(`Brand ${brand ? 'updated' : 'added'} successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{brand ? 'Edit' : 'Add'} Brand</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Brand Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              type="url"
              value={formData.logo}
              onChange={(e) =>
                setFormData({ ...formData, logo: e.target.value })
              }
              placeholder="https://example.com/logo.svg"
            />
            {formData.logo && (
              <div className="mt-2 p-4 border rounded-lg bg-muted">
                <img
                  src={formData.logo}
                  alt="Brand logo preview"
                  className="h-12 object-contain"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Additional information about the brand..."
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {brand ? 'Update' : 'Add'} Brand
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}