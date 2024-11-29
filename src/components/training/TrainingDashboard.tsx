import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import TrainingMetricsView from './TrainingMetrics';
import TrainingPlansView from './TrainingPlansView';
import CertificationsView from './CertificationsView';
import TrainingPlanDialog from './TrainingPlanDialog';

// Mock data
const mockMetrics = {
  overallProficiency: 85,
  trainingHours: 120,
  certifications: 8,
  successRate: 92,
  skillBreakdown: [
    { skill: 'Surface Preparation', proficiency: 90, level: 'high' as const },
    { skill: 'Film Application', proficiency: 85, level: 'high' as const },
    { skill: 'Complex Curves', proficiency: 75, level: 'medium' as const },
    { skill: 'Edge Wrapping', proficiency: 80, level: 'medium' as const },
    { skill: 'Post-Installation', proficiency: 95, level: 'high' as const },
  ],
  recentAchievements: [
    {
      title: 'Advanced PPF Certification',
      date: '2024-03-15',
      type: 'certification' as const,
    },
    {
      title: 'Complex Curves Mastery',
      date: '2024-03-10',
      type: 'skill' as const,
    },
    {
      title: '100 Installations',
      date: '2024-03-01',
      type: 'milestone' as const,
    },
  ],
};

export default function TrainingDashboard() {
  const [activeTab, setActiveTab] = useState('metrics');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training & Development</h1>
          <p className="text-muted-foreground">
            Monitor and manage training progress
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Training Plan
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="plans">Training Plans</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="mt-6">
          <TrainingMetricsView metrics={mockMetrics} />
        </TabsContent>

        <TabsContent value="plans" className="mt-6">
          <TrainingPlansView />
        </TabsContent>

        <TabsContent value="certifications" className="mt-6">
          <CertificationsView />
        </TabsContent>
      </Tabs>

      <TrainingPlanDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={(plan) => {
          console.log('Saving plan:', plan);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}