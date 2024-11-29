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
import { Scan } from 'lucide-react';
import type { PPFRoll } from '@/types';

// Enhanced SKU to Product mapping
const skuMap: Record<
  string,
  {
    name: string;
    manufacturer: string;
    widthInches: number;
    lengthFeet: number;
    cost: number;
  }
> = {
  'XPL-CL': {
    name: 'XPEL Ultimate Plus',
    manufacturer: 'XPEL',
    widthInches: 60,
    lengthFeet: 100,
    cost: 899.99,
  },
  'XPL-MT': {
    name: 'XPEL Stealth',
    manufacturer: 'XPEL',
    widthInches: 60,
    lengthFeet: 100,
    cost: 949.99,
  },
  '3M-PS': {
    name: '3M Pro Series',
    manufacturer: '3M',
    widthInches: 48,
    lengthFeet: 100,
    cost: 849.99,
  },
  '3M-CS': {
    name: '3M Crystalline',
    manufacturer: '3M',
    widthInches: 40,
    lengthFeet: 100,
    cost: 999.99,
  },
  'SNT-PR': {
    name: 'SunTek Premium',
    manufacturer: 'SunTek',
    widthInches: 60,
    lengthFeet: 100,
    cost: 879.99,
  },
  'STK-DY': {
    name: 'STEK DYNOshield',
    manufacturer: 'STEK',
    widthInches: 60,
    lengthFeet: 100,
    cost: 1099.99,
  },
};

const getProductInfo = (sku: string) => {
  const prefix = Object.keys(skuMap).find((key) => sku.startsWith(key));
  return prefix ? skuMap[prefix] : null;
};

type AddItemDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (item: Omit<PPFRoll, 'id'>) => void;
};

type ScanningState = 'sku' | 'rollId' | 'none';

export default function AddItemDialog({
  open,
  onOpenChange,
  onAdd,
}: AddItemDialogProps) {
  const [formData, setFormData] = useState({
    sku: '',
    rollId: '',
    name: '',
    lengthFeet: '',
    widthInches: '',
    cost: '',
    category: '',
    manufacturer: '',
  });

  const [scanningState, setScanningState] = useState<ScanningState>('none');
  const [scanning, setScanning] = useState(false);

  const simulateScan = (type: 'sku' | 'rollId') => {
    setScanning(true);
    setScanningState(type);

    // Simulate a barcode scan
    setTimeout(() => {
      if (type === 'sku') {
        const mockSku = `XPL-CL-${Math.random().toString().slice(2, 4)}`;
        const productInfo = getProductInfo(mockSku);
        if (productInfo) {
          setFormData({
            ...formData,
            sku: mockSku,
            name: productInfo.name,
            manufacturer: productInfo.manufacturer,
            widthInches: productInfo.widthInches.toString(),
            lengthFeet: productInfo.lengthFeet.toString(),
            cost: productInfo.cost.toString(),
          });
        }
      } else {
        const mockRollId = `R${Math.random().toString().slice(2, 8)}`;
        setFormData({
          ...formData,
          rollId: mockRollId,
        });
      }
      setScanning(false);
      setScanningState('none');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      sku: formData.sku,
      rollId: formData.rollId,
      name: formData.name,
      lengthFeet: parseInt(formData.lengthFeet),
      widthInches: parseInt(formData.widthInches),
      price: parseFloat(formData.cost),
      category: formData.category,
      manufacturer: formData.manufacturer,
    });
    onOpenChange(false);
    setFormData({
      sku: '',
      rollId: '',
      name: '',
      lengthFeet: '',
      widthInches: '',
      cost: '',
      category: '',
      manufacturer: '',
    });
  };

  const handleSkuChange = (value: string) => {
    const productInfo = getProductInfo(value);
    setFormData({
      ...formData,
      sku: value,
      name: productInfo?.name || '',
      manufacturer: productInfo?.manufacturer || '',
      widthInches: productInfo?.widthInches.toString() || '',
      lengthFeet: productInfo?.lengthFeet.toString() || '',
      cost: productInfo?.cost.toString() || '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New PPF Roll</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="sku">SKU</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => simulateScan('sku')}
                disabled={scanning}
              >
                <Scan className="mr-2 h-4 w-4" />
                {scanning && scanningState === 'sku'
                  ? 'Scanning...'
                  : 'Scan SKU'}
              </Button>
            </div>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => handleSkuChange(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="rollId">Roll ID</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => simulateScan('rollId')}
                disabled={scanning || !formData.sku}
              >
                <Scan className="mr-2 h-4 w-4" />
                {scanning && scanningState === 'rollId'
                  ? 'Scanning...'
                  : 'Scan Roll ID'}
              </Button>
            </div>
            <Input
              id="rollId"
              value={formData.rollId}
              onChange={(e) =>
                setFormData({ ...formData, rollId: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lengthFeet">Length (feet)</Label>
              <Input
                id="lengthFeet"
                type="number"
                min="0"
                value={formData.lengthFeet}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="widthInches">Width (inches)</Label>
              <Input
                id="widthInches"
                type="number"
                min="0"
                value={formData.widthInches}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input
              id="manufacturer"
              value={formData.manufacturer}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Clear Protection Film">
                  Clear Protection Film
                </SelectItem>
                <SelectItem value="Matte Protection Film">
                  Matte Protection Film
                </SelectItem>
                <SelectItem value="Colored Protection Film">
                  Colored Protection Film
                </SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost</Label>
            <Input
              id="cost"
              type="number"
              min="0"
              step="0.01"
              value={formData.cost}
              readOnly
              className="bg-muted"
            />
          </div>

          <DialogFooter>
            <Button type="submit">Add Roll</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}