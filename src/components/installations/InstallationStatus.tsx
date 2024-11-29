import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type InstallationStatusProps = {
  status: 'completed' | 'in-progress' | 'needs-recut';
};

const STATUS_STYLES = {
  completed: 'bg-[#0070F3]/10 text-[#0070F3] border-[#0070F3]/20',
  'in-progress': 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20',
  'needs-recut': 'bg-[#E00]/10 text-[#E00] border-[#E00]/20',
};

const STATUS_LABELS = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  'needs-recut': 'Needs Recut',
};

export default function InstallationStatus({ status }: InstallationStatusProps) {
  return (
    <Badge 
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
}