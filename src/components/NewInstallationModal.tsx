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
import { Scan, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Installer } from '@/types';

interface NewInstallationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  installers?: Installer[];
}

export default function NewInstallationModal({
  open,
  onOpenChange,
  installers,
}: NewInstallationModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    vehicleInfo: '',
    servicePrice: '',
    installDate: new Date().toISOString().split('T')[0],
    installer: '',
    notes: '',
  });

  const [scannedRolls, setScannedRolls] = useState<
    { id: string; sqft: number }[]
  >([]);
  const [scanning, setScanning] = useState(false);

  const simulateScan = () => {
    setScanning(true);
    // Simulate a barcode scan
    setTimeout(() => {
      const mockRollId = `R${Math.random().toString().slice(2, 8)}`;
      setScannedRolls([...scannedRolls, { id: mockRollId, sqft: 0 }]);
      setScanning(false);
    }, 1000);
  };

  const removeRoll = (rollId: string) => {
    setScannedRolls(scannedRolls.filter((roll) => roll.id !== rollId));
  };

  const updateRollSqft = (rollId: string, sqft: number) => {
    setScannedRolls(
      scannedRolls.map((roll) =>
        roll.id === rollId ? { ...roll, sqft } : roll
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Installation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servicePrice">Service Price</Label>
              <Input
                id="servicePrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="$0.00"
                value={formData.servicePrice}
                onChange={(e) =>
                  setFormData({ ...formData, servicePrice: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleInfo">Vehicle Information</Label>
              <Input
                id="vehicleInfo"
                placeholder="Year Make Model"
                value={formData.vehicleInfo}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleInfo: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="installDate">Installation Date</Label>
              <Input
                id="installDate"
                type="date"
                value={formData.installDate}
                onChange={(e) =>
                  setFormData({ ...formData, installDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="installer">Installer</Label>
            <Select
              value={formData.installer}
              onValueChange={(value) =>
                setFormData({ ...formData, installer: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select installer" />
              </SelectTrigger>
              <SelectContent>
                {installers ? (
                  installers.map((installer) => (
                    <SelectItem key={installer.id} value={installer.id}>
                      {installer.name}
                    </SelectItem>
                  ))
                ) : (
                  <>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>PPF Rolls Used</Label>
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={simulateScan}
                  disabled={scanning}
                >
                  <Scan className="mr-2 h-4 w-4" />
                  {scanning ? 'Scanning...' : 'Scan Roll'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setScannedRolls([
                      ...scannedRolls,
                      { id: '', sqft: 0 },
                    ])
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Manually
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {scannedRolls.map((roll, index) => (
                <div
                  key={roll.id || index}
                  className="flex items-center space-x-2"
                >
                  <div className="flex-1">
                    <Input
                      placeholder="Roll ID"
                      value={roll.id}
                      onChange={(e) => {
                        const newRolls = [...scannedRolls];
                        newRolls[index].id = e.target.value;
                        setScannedRolls(newRolls);
                      }}
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="Sq. Ft."
                      value={roll.sqft || ''}
                      onChange={(e) =>
                        updateRollSqft(roll.id, Number(e.target.value))
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRoll(roll.id)}
                    className="h-9 w-9 p-0"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              ))}
              {scannedRolls.length > 0 && (
                <div className="mt-2">
                  <Badge variant="secondary">
                    Total Area:{' '}
                    {scannedRolls
                      .reduce((acc, roll) => acc + (roll.sqft || 0), 0)
                      .toFixed(1)}{' '}
                    sq ft
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Additional notes about the installation..."
            />
          </div>

          <DialogFooter>
            <Button type="submit">Create Installation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}