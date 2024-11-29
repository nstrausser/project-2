import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/lib/utils';
import type { Installation } from '@/types';

type InstallationCardProps = {
  installation: Installation;
  onClick?: () => void;
};

export default function InstallationCard({ installation, onClick }: InstallationCardProps) {
  return (
    <div 
      className="p-4 border rounded-lg bg-card hover:bg-accent/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <Badge className={getStatusColor(installation.status)}>
        {installation.status === 'needs-recut'
          ? 'Needs Recut'
          : installation.status === 'in-progress'
          ? 'In Progress'
          : 'Completed'}
      </Badge>
    </div>
  );
}