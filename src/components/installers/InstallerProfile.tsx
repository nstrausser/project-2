import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Clock,
  TrendingUp,
  Ruler,
  DollarSign,
  Award,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import type { Installer, InstallerStats } from '@/types';

type InstallerProfileProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  installer: Installer;
  stats: InstallerStats;
};

export default function InstallerProfile({
  open,
  onOpenChange,
  installer,
  stats,
}: InstallerProfileProps) {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const calculateEfficiency = (avgTime: number) => {
    const standardTime = 480;
    const efficiency =
      ((standardTime - (avgTime - standardTime)) / standardTime) * 100;
    return Math.min(Math.max(efficiency, 0), 100);
  };

  const efficiency = calculateEfficiency(stats.averageInstallTime);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Installer Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {installer.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{installer.name}</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{installer.role}</Badge>
                <span className="text-sm text-muted-foreground">
                  Since {new Date(installer.joinedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex justify-end">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Efficiency Rating
                    </div>
                    <Progress value={efficiency} className="h-2" />
                    <span className="text-2xl font-bold">
                      {efficiency.toFixed(1)}%
                    </span>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      Average Installation Time
                    </div>
                    <span className="text-2xl font-bold">
                      {formatTime(stats.averageInstallTime)}
                    </span>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Ruler className="mr-2 h-4 w-4" />
                      Total Film Usage
                    </div>
                    <span className="text-2xl font-bold">
                      {stats.filmUsage.toLocaleString()} ft²
                    </span>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Revenue Generated
                    </div>
                    <span className="text-2xl font-bold">
                      ${stats.revenueGenerated.toLocaleString()}
                    </span>
                  </div>
                </Card>
              </div>

              {/* Recent Installations */}
              <Card className="mt-6">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Recent Installations
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Film Used</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Quality Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Add recent installations data here */}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="quality">
              <div className="space-y-6">
                {/* Quality Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">95%</div>
                        <div className="text-sm text-muted-foreground">
                          Pass Rate
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">1.2</div>
                        <div className="text-sm text-muted-foreground">
                          Avg Issues/Install
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">4.8</div>
                        <div className="text-sm text-muted-foreground">
                          Quality Rating
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="training">
              <div className="space-y-6">
                {/* Training Metrics */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Training Progress
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Overall Progress
                          </span>
                          <span className="text-sm font-medium">
                            {stats.trainingProgress}%
                          </span>
                        </div>
                        <Progress value={stats.trainingProgress} className="h-2" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}