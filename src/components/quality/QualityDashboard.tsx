import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import QualityMetricsView from './QualityMetrics';
import StandardsView from './StandardsView';
import WarrantyClaimsView from './WarrantyClaimsView';
import StandardsDialog from './StandardsDialog';
import WarrantyClaimDialog from './WarrantyClaimDialog';
import type { QualityMetrics } from '@/types';

// Mock data
const mockMetrics: QualityMetrics = {
  period: '2024-Q1',
  totalInstallations: 156,
  passRate: 92,
  averageDefectsPerInstall: 0.8,
  warrantyClaimRate: 2.1,
  customerSatisfactionScore: 4.7,
  topDefects: [
    { type: 'Bubbles', count: 12 },
    { type: 'Edge Lifting', count: 8 },
    { type: 'Dirt Inclusion', count: 5 },
  ],
};

const mockTrends = {
  passRate: [
    { date: '2024-01', value: 90 },
    { date: '2024-02', value: 91 },
    { date: '2024-03', value: 92 },
  ],
  defects: [
    { date: '2024-01', value: 1.0 },
    { date: '2024-02', value: 0.9 },
    { date: '2024-03', value: 0.8 },
  ],
  satisfaction: [
    { date: '2024-01', value: 4.5 },
    { date: '2024-02', value: 4.6 },
    { date: '2024-03', value: 4.7 },
  ],
};

export default function QualityDashboard() {
  const [activeTab, setActiveTab] = useState('metrics');
  const [isStandardsDialogOpen, setIsStandardsDialogOpen] = useState(false);
  const [isWarrantyDialogOpen, setIsWarrantyDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quality Assurance</h1>
          <p className="text-muted-foreground">
            Monitor and maintain installation quality
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsWarrantyDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Warranty Claim
          </Button>
          <Button onClick={() => setIsStandardsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Standard
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="warranty">Warranty Claims</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="mt-6">
          <QualityMetricsView metrics={mockMetrics} trends={mockTrends} />
        </TabsContent>

        <TabsContent value="standards" className="mt-6">
          <StandardsView />
        </TabsContent>

        <TabsContent value="warranty" className="mt-6">
          <WarrantyClaimsView />
        </TabsContent>
      </Tabs>

      <StandardsDialog
        open={isStandardsDialogOpen}
        onOpenChange={setIsStandardsDialogOpen}
        onSave={(standard) => {
          console.log('Saving standard:', standard);
          setIsStandardsDialogOpen(false);
        }}
      />

      <WarrantyClaimDialog
        open={isWarrantyDialogOpen}
        onOpenChange={setIsWarrantyDialogOpen}
        installationId="mock-installation-id"
        onSave={(claim) => {
          console.log('Saving warranty claim:', claim);
          setIsWarrantyDialogOpen(false);
        }}
      />
    </div>
  );
}