import { useState } from 'react';
import { Download, Upload, Pencil, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';
import UserManagementDialog from './settings/UserManagementDialog';
import BrandManagementDialog from './settings/BrandManagementDialog';
import SkuManagementDialog from './settings/SkuManagementDialog';
import type { Installer, Brand, Sku, InstallerRole } from '@/types';

const presetColors = [
  { name: 'Blue', value: '212 100% 40%' },
  { name: 'Purple', value: '270 80% 45%' },
  { name: 'Violet', value: '290 85% 45%' },
  { name: 'Pink', value: '322 80% 45%' },
  { name: 'Cyan', value: '192 85% 40%' },
  { name: 'Green', value: '142 70% 40%' },
  { name: 'Yellow', value: '48 95% 45%' },
  { name: 'Orange', value: '24 85% 45%' },
  { name: 'Red', value: '0 85% 45%' },
];

const mockBrands = [
  { id: '1', name: 'XPEL', logo: 'xpel-logo.svg' },
  { id: '2', name: '3M', logo: '3m-logo.svg' },
  { id: '3', name: 'SunTek', logo: 'suntek-logo.svg' },
];

const mockSkus = [
  {
    id: '1',
    sku: 'XPL-CL-60',
    brandId: '1',
    name: 'XPEL Ultimate Plus',
    widthInches: 60,
    lengthFeet: 100,
    cost: 899.99,
  },
  {
    id: '2',
    sku: '3M-PS-48',
    brandId: '2',
    name: '3M Pro Series',
    widthInches: 48,
    lengthFeet: 75,
    cost: 749.99,
  },
];

export default function Settings() {
  const { setAccentColor } = useTheme();
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [brandDialogOpen, setBrandDialogOpen] = useState(false);
  const [skuDialogOpen, setSkuDialogOpen] = useState(false);
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | undefined>();
  const [selectedSku, setSelectedSku] = useState<typeof mockSkus[0] | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<typeof mockBrands[0] | undefined>();
  const [installers, setInstallers] = useState<Installer[]>([
    {
      id: '1',
      name: 'Matt Anderson',
      email: 'matt@example.com',
      firstName: 'Matt',
      lastName: 'Anderson',
      role: 'Lead',
      joinedDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Shawn Williams',
      email: 'shawn@example.com',
      firstName: 'Shawn',
      lastName: 'Williams',
      role: 'Installer',
      joinedDate: '2024-02-01',
    },
  ]);

  const handleExportData = () => {
    toast.success('Data exported successfully');
  };

  const handleImportData = () => {
    toast.success('Data imported successfully');
  };

  const handleAddInstaller = (installer: Omit<Installer, 'id' | 'name'>) => {
    const name = `${installer.firstName} ${installer.lastName}`;
    
    if (selectedInstaller) {
      setInstallers(installers.map(inst => 
        inst.id === selectedInstaller.id 
          ? { ...inst, ...installer, name }
          : inst
      ));
      setSelectedInstaller(undefined);
      toast.success('Installer updated successfully');
    } else {
      const newInstaller = {
        ...installer,
        id: Math.random().toString(36).substr(2, 9),
        name,
      };
      setInstallers([...installers, newInstaller]);
      toast.success('Installer added successfully');
    }
  };

  const handleEditSku = (sku: typeof mockSkus[0]) => {
    setSelectedSku(sku);
    setSkuDialogOpen(true);
  };

  const handleEditBrand = (brand: typeof mockBrands[0]) => {
    setSelectedBrand(brand);
    setBrandDialogOpen(true);
  };

  const handleEditUser = (user: Installer) => {
    setSelectedInstaller(user);
    setUserDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and data.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label className="text-sm font-medium">Accent Color</label>
              <div className="flex flex-wrap gap-2">
                {presetColors.map((color) => (
                  <Button
                    key={color.name}
                    variant="outline"
                    className="w-8 h-8 rounded-md p-0 overflow-hidden"
                    style={{
                      backgroundColor: `hsl(${color.value})`,
                    }}
                    onClick={() => setAccentColor(color.value)}
                  >
                    <span className="sr-only">{color.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage installer accounts and permissions.</CardDescription>
            </div>
            <Button onClick={() => setUserDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Installer
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {installers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditUser(user)}
                          className="hover:bg-primary/10 hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle>Inventory Settings</CardTitle>
              <CardDescription>Manage brands and SKUs.</CardDescription>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setBrandDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Brand
              </Button>
              <Button onClick={() => setSkuDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add SKU
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-4">Brands</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Logo</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBrands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell>{brand.name}</TableCell>
                        <TableCell>{brand.logo}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditBrand(brand)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">SKUs</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSkus.map((sku) => (
                      <TableRow key={sku.id}>
                        <TableCell className="font-mono">{sku.sku}</TableCell>
                        <TableCell>{sku.name}</TableCell>
                        <TableCell>
                          {mockBrands.find((b) => b.id === sku.brandId)?.name}
                        </TableCell>
                        <TableCell>
                          {sku.widthInches}"×{sku.lengthFeet}'
                        </TableCell>
                        <TableCell>${sku.cost.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditSku(sku)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Export and import application data.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" onClick={handleImportData}>
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <UserManagementDialog
        open={userDialogOpen}
        onOpenChange={(open) => {
          setUserDialogOpen(open);
          if (!open) setSelectedInstaller(undefined);
        }}
        installer={selectedInstaller}
        onSave={handleAddInstaller}
      />

      <BrandManagementDialog
        open={brandDialogOpen}
        onOpenChange={(open) => {
          setBrandDialogOpen(open);
          if (!open) setSelectedBrand(undefined);
        }}
        brand={selectedBrand}
        onSave={(brand) => {
          console.log('Saving brand:', brand);
          toast.success('Brand saved successfully');
        }}
      />

      <SkuManagementDialog
        open={skuDialogOpen}
        onOpenChange={(open) => {
          setSkuDialogOpen(open);
          if (!open) setSelectedSku(undefined);
        }}
        sku={selectedSku}
        brands={mockBrands}
        onSave={(sku) => {
          console.log('Saving SKU:', sku);
          toast.success('SKU saved successfully');
        }}
      />
    </div>
  );
}