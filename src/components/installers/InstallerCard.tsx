import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Clock,
  TrendingUp,
  Ruler,
  DollarSign,
  Award,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import type { Installer, InstallerStats } from '@/types';

type InstallerCardProps = {
  installer: Installer;
  stats: InstallerStats;
};

export default function InstallerCard({ installer, stats }: InstallerCardProps) {
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('');

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Calculate efficiency percentage based on average install time
  // Assuming 8 hours is standard time (480 minutes)
  const calculateEfficiency = (avgTime: number) => {
    const standardTime = 480;
    const efficiency = ((standardTime - (avgTime - standardTime)) / standardTime) * 100;
    return Math.min(Math.max(efficiency, 0), 100); // Clamp between 0-100
  };

  const efficiency = calculateEfficiency(stats.averageInstallTime);

  const getRoleBadgeVariant = (role: Installer['role']) => {
    switch (role) {
      case 'Lead':
        return 'default';
      case 'Installer':
        return 'secondary';
      case 'Training':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
            {getInitials(installer.name)}
          </div>
          <div>
            <h3 className="font-semibold">{installer.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant={getRoleBadgeVariant(installer.role)}>{installer.role}</Badge>
              <span className="text-sm text-muted-foreground">
                Since {new Date(installer.joinedDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        {/* Certification & Quality Badges */}
        <div className="flex space-x-2">
          {stats.certifications > 0 && (
            <div className="flex items-center space-x-1 text-sm">
              <Award className="h-4 w-4 text-blue-500" />
              <span>{stats.certifications}</span>
            </div>
          )}
          {stats.qualityScore && (
            <div className="flex items-center space-x-1 text-sm">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>{stats.qualityScore}%</span>
            </div>
          )}
          {stats.trainingProgress && (
            <div className="flex items-center space-x-1 text-sm">
              <GraduationCap className="h-4 w-4 text-purple-500" />
              <span>{stats.trainingProgress}%</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-2 h-4 w-4" />
            Efficiency Rating
          </div>
          <Progress value={efficiency} className="h-2" />
          <span className="text-sm font-medium">
            {efficiency.toFixed(1)}%
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            Avg. Install Time
          </div>
          <span className="text-sm font-medium">
            {formatTime(stats.averageInstallTime)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Ruler className="mr-2 h-4 w-4" />
            Film Usage
          </div>
          <span className="text-sm font-medium">{stats.filmUsage} ft²</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="mr-2 h-4 w-4" />
            Revenue Generated
          </div>
          <span className="text-sm font-medium">
            ${stats.revenueGenerated.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm text-muted-foreground">
          Total Installations
        </div>
        <div className="text-2xl font-bold">{stats.totalInstallations}</div>
      </div>
    </Card>
  );
}