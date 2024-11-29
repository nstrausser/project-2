import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShieldCheck, AlertOctagon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WarrantyClaim } from '@/types/quality';

// Mock data
const mockClaims: WarrantyClaim[] = [
  {
    id: '1',
    installationId: 'inst-1',
    claimDate: '2024-03-15',
    customerName: 'John Smith',
    vehicleInfo: '2023 Tesla Model 3',
    issue: 'Edge lifting on hood',
    status: 'pending',
  },
  {
    id: '2',
    installationId: 'inst-2',
    claimDate: '2024-03-10',
    customerName: 'Sarah Johnson',
    vehicleInfo: '2024 BMW M4',
    issue: 'Bubbles appearing after installation',
    status: 'approved',
    resolution: 'Full recut and reinstallation approved',
    resolutionDate: '2024-03-12',
  },
];

const getStatusColor = (status: WarrantyClaim['status']) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'denied':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'resolved':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  }
};

export default function WarrantyClaimsView() {
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null);

  const pendingClaims = mockClaims.filter((claim) => claim.status === 'pending').length;
  const approvalRate = (mockClaims.filter((claim) => claim.status === 'approved').length / mockClaims.length) * 100;
  const avgResolutionDays = 3.5; // Mock average resolution time

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{pendingClaims}</div>
              <div className="text-sm text-muted-foreground">Pending Claims</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{approvalRate.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Approval Rate</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <AlertOctagon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{avgResolutionDays}</div>
              <div className="text-sm text-muted-foreground">Avg. Resolution Days</div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <ScrollArea className="h-[600px]">
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClaims.map((claim) => (
                  <TableRow
                    key={claim.id}
                    className={cn(
                      'cursor-pointer transition-colors',
                      expandedClaim === claim.id ? 'bg-muted/50' : 'hover:bg-muted/50'
                    )}
                    onClick={() =>
                      setExpandedClaim(expandedClaim === claim.id ? null : claim.id)
                    }
                  >
                    <TableCell>
                      {new Date(claim.claimDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{claim.customerName}</TableCell>
                    <TableCell>{claim.vehicleInfo}</TableCell>
                    <TableCell>
                      <div>{claim.issue}</div>
                      {expandedClaim === claim.id && claim.resolution && (
                        <div className="mt-2">
                          <div className="text-sm font-medium">Resolution:</div>
                          <div className="text-sm text-muted-foreground">
                            {claim.resolution}
                          </div>
                          {claim.resolutionDate && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Resolved on: {new Date(claim.resolutionDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('capitalize', getStatusColor(claim.status))}>
                        {claim.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}