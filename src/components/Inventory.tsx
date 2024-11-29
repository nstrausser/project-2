import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AddItemDialog from './AddItemDialog';
import type { PPFRoll } from '@/types';

// Brand logos as SVG components for better performance and styling
const BrandLogos = {
  XPEL: () => (
    <svg
      viewBox="0 0 100 24"
      className="h-8 w-auto"
      fill="currentColor"
    >
      <g className="text-[#FDB913]">
        <circle cx="6" cy="12" r="3" />
        <circle cx="14" cy="12" r="3" />
        <circle cx="22" cy="12" r="3" />
        <path d="M35 4L50 12L35 20V4zM60 4L75 12L60 20V4z" />
      </g>
    </svg>
  ),
  '3M': () => (
    <svg
      viewBox="0 0 100 24"
      className="h-8 w-auto"
      fill="currentColor"
    >
      <g className="text-[#FF0000]">
        <path d="M20 4h8v16h-8zM32 4h8l8 16h-8zM52 4h8l-8 16h-8z" />
      </g>
    </svg>
  ),
  SunTek: () => (
    <svg
      viewBox="0 0 100 24"
      className="h-8 w-auto"
      fill="currentColor"
    >
      <g className="text-[#005DAA]">
        <circle cx="12" cy="12" r="8" />
        <path d="M14 4l20 8-20 8M40 4h8l4 16h-8z" />
      </g>
    </svg>
  ),
};

// Mock data
const mockInventory: PPFRoll[] = [
  {
    id: '1',
    sku: 'XPL-CL-60',
    rollId: 'R123456',
    name: 'XPEL Ultimate Plus',
    lengthFeet: 100,
    widthInches: 60,
    price: 899.99,
    category: 'Clear Protection Film',
    manufacturer: 'XPEL',
  },
  {
    id: '2',
    sku: '3M-PS-48',
    rollId: 'R789012',
    name: '3M Pro Series',
    lengthFeet: 75,
    widthInches: 48,
    price: 749.99,
    category: 'Clear Protection Film',
    manufacturer: '3M',
  },
  {
    id: '3',
    sku: 'SNT-PR-60',
    rollId: 'R345678',
    name: 'SunTek Premium',
    lengthFeet: 100,
    widthInches: 60,
    price: 879.99,
    category: 'Clear Protection Film',
    manufacturer: 'SunTek',
  },
];

export default function Inventory() {
  const [inventory, setInventory] = useState<PPFRoll[]>(mockInventory);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.rollId.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddItem = (item: Omit<PPFRoll, 'id'>) => {
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    };
    setInventory([...inventory, newItem]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PPF Inventory</h1>
          <p className="text-muted-foreground">
            Manage your paint protection film inventory.
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Roll
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Manufacturer</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Roll ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="w-36">
                    {BrandLogos[item.manufacturer as keyof typeof BrandLogos] ? (
                      BrandLogos[item.manufacturer as keyof typeof BrandLogos]()
                    ) : (
                      <span>{item.manufacturer}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-mono">{item.sku}</TableCell>
                <TableCell className="font-mono">{item.rollId}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  {item.widthInches}"×{item.lengthFeet}'
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  ${item.price.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddItemDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAdd={handleAddItem}
      />
    </div>
  );
}