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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type Sku = {
  id: string;
  sku: string;
  brandId: string;
  name: string;
  widthInches: number;
  lengthFeet: number;
  cost: number;
  notes?: string;
};

type SkuManagementDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sku?: Sku;
  brands: Array<{ id: string; name: string }>;
  onSave: (sku: Omit<Sku, 'id'>) => void;
};

export default function SkuManagementDialog({
  open,
  onOpenChange,
  sku,
  brands,
  onSave,
}: SkuManagementDialogProps) {
  const [formData, setFormData] = useState({
    sku: sku?.sku || '',
    brandId: sku?.brandId || '',
    name: sku?.name || '',
    widthInches: sku?.widthInches || 0,
    lengthFeet: sku?.lengthFeet || 0,
    cost: sku?.cost || 0,
    notes: sku?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
    toast.success(`SKU ${sku ? 'updated' : 'added'} successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{sku ? 'Edit' : 'Add'} SKU</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sku">SKU Code</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Select
              value={formData.brandId}
              onValueChange={(value) =>
                setFormData({ ...formData, brandId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="widthInches">Width (inches)</Label>
              <Input
                id="widthInches"
                type="number"
                min="0"
                step="0.1"
                value={formData.widthInches}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    widthInches: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lengthFeet">Length (feet)</Label>
              <Input
                id="lengthFeet"
                type="number"
                min="0"
                step="0.1"
                value={formData.lengthFeet}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lengthFeet: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost</Label>
            <Input
              id="cost"
              type="number"
              min="0"
              step="0.01"
              value={formData.cost}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cost: parseFloat(e.target.value),
                })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Additional information about the SKU..."
            />
          </div>

          <DialogFooter>
            <Button type="submit">{sku ? 'Update' : 'Add'} SKU</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}