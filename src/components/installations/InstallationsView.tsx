import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InstallationFilters from './InstallationFilters';
import InstallationList from './InstallationList';
import InstallationStats from './InstallationStats';
import InstallationDialog from './InstallationDialog';
import QualityCheckDialog from '../quality/QualityCheckDialog';
import DefectReportDialog from '../quality/DefectReportDialog';
import type { Installation } from '@/types';

export default function InstallationsView() {
  const [installations, setInstallations] = useState<Installation[]>([
    {
      id: '1',
      customerName: 'John Doe',
      vehicleInfo: '2023 Tesla Model 3',
      installer: {
        id: '1',
        name: 'Matt Anderson',
      },
      status: 'completed',
      totalArea: 125.5,
      notes: 'Clean installation, customer very satisfied',
      createdAt: '2024-03-15T09:00:00Z',
      updatedAt: '2024-03-15T14:00:00Z',
    },
  ]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedInstallation, setSelectedInstallation] = useState<Installation | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isQualityCheckDialogOpen, setIsQualityCheckDialogOpen] = useState(false);
  const [isDefectReportDialogOpen, setIsDefectReportDialogOpen] = useState(false);

  const filteredInstallations = installations.filter(
    (installation) =>
      (filterStatus === 'all' || installation.status === filterStatus) &&
      (installation.customerName.toLowerCase().includes(search.toLowerCase()) ||
        installation.vehicleInfo.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (installation: Installation) => {
    if (selectedInstallation) {
      setInstallations(installations.map(inst => 
        inst.id === installation.id ? installation : inst
      ));
    } else {
      setInstallations([installation, ...installations]);
    }
    setIsDialogOpen(false);
    setSelectedInstallation(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Installations</h1>
          <p className="text-muted-foreground">
            Track and manage PPF installations
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Installation
        </Button>
      </div>

      <InstallationStats installations={filteredInstallations} />

      <InstallationFilters
        search={search}
        onSearchChange={setSearch}
        status={filterStatus}
        onStatusChange={setFilterStatus}
      />

      <InstallationList
        installations={filteredInstallations}
        onInstallationClick={(installation) => {
          setSelectedInstallation(installation);
          setIsDialogOpen(true);
        }}
        onQualityCheck={(installation) => {
          setSelectedInstallation(installation);
          setIsQualityCheckDialogOpen(true);
        }}
        onDefectReport={(installation) => {
          setSelectedInstallation(installation);
          setIsDefectReportDialogOpen(true);
        }}
      />

      <InstallationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        installation={selectedInstallation}
        onSave={handleSave}
      />

      {selectedInstallation && (
        <>
          <QualityCheckDialog
            open={isQualityCheckDialogOpen}
            onOpenChange={setIsQualityCheckDialogOpen}
            installationId={selectedInstallation.id}
            onSave={() => {
              setIsQualityCheckDialogOpen(false);
            }}
          />

          <DefectReportDialog
            open={isDefectReportDialogOpen}
            onOpenChange={setIsDefectReportDialogOpen}
            installationId={selectedInstallation.id}
            onSave={() => {
              setIsDefectReportDialogOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
}