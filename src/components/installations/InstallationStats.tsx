import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Ruler,
} from 'lucide-react';
import type { Installation } from '@/types';

type InstallationStatsProps = {
  installations: Installation[];
};

export default function InstallationStats({ installations }: InstallationStatsProps) {
  const totalInstallations = installations.length;
  const completedInstallations = installations.filter(i => i.status === 'completed').length;
  const needsRecutInstallations = installations.filter(i => i.status === 'needs-recut').length;
  const totalArea = installations.reduce((sum, i) => sum + i.totalArea, 0);
  const completionRate = totalInstallations > 0 ? (completedInstallations / totalInstallations) * 100 : 0;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="text-2xl font-bold">{completedInstallations}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <div className="text-2xl font-bold">{needsRecutInstallations}</div>
            <div className="text-sm text-muted-foreground">Needs Recut</div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Ruler className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-bold">{totalArea.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Total ft²</div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <Progress 
              value={completionRate} 
              className="w-[120px] h-1.5 mt-2" 
            />
          </div>
        </div>
      </Card>
    </div>
  );
}