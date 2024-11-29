import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import InstallerCard from './InstallerCard';
import InstallerProfile from './InstallerProfile';
import NewInstallationModal from '@/components/NewInstallationModal';
import type { Installer, InstallerStats } from '@/types';

// Mock data
const mockInstallers: Installer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'Lead',
    joinedDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'Installer',
    joinedDate: '2023-06-01',
  },
];

const mockStats: Record<string, InstallerStats> = {
  '1': {
    totalInstallations: 156,
    averageInstallTime: 420, // 7 hours - more efficient
    filmUsage: 1250,
    revenueGenerated: 45600,
    certifications: 3,
    qualityScore: 95,
    trainingProgress: 100,
  },
  '2': {
    totalInstallations: 82,
    averageInstallTime: 540, // 9 hours - less efficient
    filmUsage: 820,
    revenueGenerated: 28400,
    certifications: 1,
    qualityScore: 88,
    trainingProgress: 75,
  },
};

export default function InstallersView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(
    null
  );

  const filteredInstallers = mockInstallers.filter(
    (installer) =>
      (filterRole === 'all' || installer.role === filterRole) &&
      installer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Installers</h1>
          <p className="text-muted-foreground">
            Track and manage installer performance
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Installation
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search installers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Lead">Lead</SelectItem>
            <SelectItem value="Installer">Installer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredInstallers.map((installer) => (
          <div
            key={installer.id}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedInstaller(installer)}
          >
            <InstallerCard
              installer={installer}
              stats={mockStats[installer.id]}
            />
          </div>
        ))}
      </div>

      <NewInstallationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        installers={mockInstallers}
      />

      {selectedInstaller && (
        <InstallerProfile
          open={!!selectedInstaller}
          onOpenChange={(open) => !open && setSelectedInstaller(null)}
          installer={selectedInstaller}
          stats={mockStats[selectedInstaller.id]}
        />
      )}
    </div>
  );
}