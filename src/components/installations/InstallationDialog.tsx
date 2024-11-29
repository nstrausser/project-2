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
import type { Installation } from '@/types';

type InstallationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  installation?: Installation;
  onSave: (installation: Installation) => void;
};

export default function InstallationDialog({
  open,
  onOpenChange,
  installation,
  onSave,
}: InstallationDialogProps) {
  const [formData, setFormData] = useState({
    customerName: installation?.customerName || '',
    vehicleInfo: installation?.vehicleInfo || '',
    notes: installation?.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.customerName) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!formData.vehicleInfo) {
      newErrors.vehicleInfo = 'Vehicle information is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...installation,
      ...formData,
      id: installation?.id || Math.random().toString(36).slice(2),
      status: installation?.status || 'in-progress',
      createdAt: installation?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Installation);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {installation ? 'Edit Installation' : 'New Installation'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className={errors.customerName ? 'border-destructive' : ''}
              aria-invalid={errors.customerName ? 'true' : 'false'}
            />
            {errors.customerName && (
              <p className="text-sm text-destructive">{errors.customerName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleInfo">Vehicle Information</Label>
            <Input
              id="vehicleInfo"
              value={formData.vehicleInfo}
              onChange={(e) => setFormData({ ...formData, vehicleInfo: e.target.value })}
              className={errors.vehicleInfo ? 'border-destructive' : ''}
              aria-invalid={errors.vehicleInfo ? 'true' : 'false'}
            />
            {errors.vehicleInfo && (
              <p className="text-sm text-destructive">{errors.vehicleInfo}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes about the installation..."
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {installation ? 'Update Installation' : 'Create Installation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}