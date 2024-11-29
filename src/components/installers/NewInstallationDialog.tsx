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
import type { Installer } from '@/types';

type NewInstallationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  installers: Installer[];
};

export default function NewInstallationDialog({
  open,
  onOpenChange,
  installers,
}: NewInstallationDialogProps) {
  const [formData, setFormData] = useState({
    installerId: '',
    date: new Date().toISOString().split('T')[0],
    vehicleType: '',
    filmUsed: '',
    timeSpent: '',
    quality: '',
    customerSatisfaction: '',
    notes: '',
    rollIds: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    onOpenChange(false);
    setFormData({
      installerId: '',
      date: new Date().toISOString().split('T')[0],
      vehicleType: '',
      filmUsed: '',
      timeSpent: '',
      quality: '',
      customerSatisfaction: '',
      notes: '',
      rollIds: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Record New Installation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="installer">Installer</Label>
            <Select
              value={formData.installerId}
              onValueChange={(value) =>
                setFormData({ ...formData, installerId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select installer" />
              </SelectTrigger>
              <SelectContent>
                {installers.map((installer) => (
                  <SelectItem key={installer.id} value={installer.id}>
                    {installer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Input
                id="vehicleType"
                value={formData.vehicleType}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleType: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filmUsed">Film Used (feet)</Label>
              <Input
                id="filmUsed"
                type="number"
                min="0"
                step="0.1"
                value={formData.filmUsed}
                onChange={(e) =>
                  setFormData({ ...formData, filmUsed: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeSpent">Time Spent (minutes)</Label>
              <Input
                id="timeSpent"
                type="number"
                min="0"
                value={formData.timeSpent}
                onChange={(e) =>
                  setFormData({ ...formData, timeSpent: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quality">Quality Rating</Label>
              <Select
                value={formData.quality}
                onValueChange={(value) =>
                  setFormData({ ...formData, quality: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerSatisfaction">
                Customer Satisfaction
              </Label>
              <Select
                value={formData.customerSatisfaction}
                onValueChange={(value) =>
                  setFormData({ ...formData, customerSatisfaction: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rollIds">Roll IDs Used (comma-separated)</Label>
            <Input
              id="rollIds"
              value={formData.rollIds}
              onChange={(e) =>
                setFormData({ ...formData, rollIds: e.target.value })
              }
              placeholder="e.g., R123456, R789012"
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
              placeholder="Any additional notes about the installation..."
            />
          </div>

          <DialogFooter>
            <Button type="submit">Record Installation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}