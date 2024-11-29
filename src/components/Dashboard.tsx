import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ScrollText,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Plus,
  Scissors,
  Ruler,
} from 'lucide-react';
import NewInstallationModal from './NewInstallationModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data for recent installations
const recentInstallations = [
  {
    id: '1',
    date: '2024-01-15',
    customer: 'John Doe',
    vehicle: '2023 Tesla Model 3',
    installer: 'Sarah Johnson',
    status: 'completed',
    price: 2499.99,
    sqft: 125.5,
  },
  {
    id: '2',
    date: '2024-01-14',
    customer: 'Alice Smith',
    vehicle: '2024 BMW M4',
    installer: 'John Smith',
    status: 'in-progress',
    price: 3299.99,
    sqft: 165.2,
  },
  {
    id: '3',
    date: '2024-01-14',
    customer: 'Bob Wilson',
    vehicle: '2023 Porsche 911',
    installer: 'Sarah Johnson',
    status: 'needs-recut',
    price: 4199.99,
    sqft: 185.8,
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in-progress':
      return 'secondary';
    case 'needs-recut':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    {
      name: 'Total Rolls',
      value: '156',
      icon: ScrollText,
      change: '+4.75%',
      trend: 'up',
    },
    {
      name: 'Low Stock',
      value: '8',
      icon: AlertTriangle,
      change: '-2.3%',
      trend: 'down',
    },
    {
      name: 'Monthly Usage',
      value: '2,423 ft²',
      icon: Ruler,
      change: '+11.4%',
      trend: 'up',
    },
    {
      name: 'Installations',
      value: '45',
      icon: Scissors,
      change: '+15.2%',
      trend: 'up',
    },
    {
      name: 'Revenue',
      value: '$48,234',
      icon: DollarSign,
      change: '+23.1%',
      trend: 'up',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your PPF inventory.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Installation
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span
                className={cn(
                  'text-sm',
                  stat.trend === 'up'
                    ? 'text-green-600 dark:text-green-500'
                    : 'text-red-600 dark:text-red-500'
                )}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold">Recent Installations</h2>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInstallations.map((installation) => (
                  <TableRow key={installation.id}>
                    <TableCell>
                      {new Date(installation.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{installation.customer}</TableCell>
                    <TableCell>{installation.vehicle}</TableCell>
                    <TableCell>{installation.sqft} ft²</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(installation.status)}>
                        {installation.status === 'needs-recut'
                          ? 'Needs Recut'
                          : installation.status === 'in-progress'
                          ? 'In Progress'
                          : 'Completed'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      ${installation.price.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      <NewInstallationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}