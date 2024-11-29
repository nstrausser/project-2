import { useState } from 'react';
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
import { GraduationCap, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TrainingPlan } from '@/types/training';

// Mock data
const mockPlans: TrainingPlan[] = [
  {
    id: '1',
    installerId: '1',
    startDate: '2024-03-01',
    endDate: '2024-04-01',
    modules: [
      {
        id: 'm1',
        title: 'Advanced PPF Installation',
        description: 'Master complex curves and deep recesses',
        duration: 16,
        requiredSkills: ['Basic PPF', 'Surface Prep'],
        objectives: ['Handle complex curves', 'Perfect edge wrapping'],
        status: 'in_progress',
      },
      {
        id: 'm2',
        title: 'Quality Control',
        description: 'Learn quality inspection techniques',
        duration: 8,
        requiredSkills: ['Basic PPF'],
        objectives: ['Identify defects', 'Perform inspections'],
        status: 'not_started',
      },
    ],
    status: 'active',
    progress: 35,
    notes: 'Focus on complex curves mastery',
  },
  {
    id: '2',
    installerId: '2',
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    modules: [
      {
        id: 'm3',
        title: 'Paint Protection Basics',
        description: 'Fundamentals of PPF installation',
        duration: 24,
        requiredSkills: [],
        objectives: ['Basic installation', 'Surface preparation'],
        status: 'completed',
      },
    ],
    status: 'active',
    progress: 75,
  },
];

const getStatusColor = (status: TrainingPlan['status'] | TrainingPlan['modules'][0]['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-[#0070F3]/10 text-[#0070F3] border-[#0070F3]/20';
    case 'active':
    case 'in_progress':
      return 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20';
    case 'on_hold':
    case 'not_started':
      return 'bg-secondary text-secondary-foreground';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

export default function TrainingPlansView() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {mockPlans.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            'p-6 transition-all duration-200',
            expandedPlan === plan.id ? 'ring-2 ring-primary' : ''
          )}
        >
          <div
            className="space-y-4 cursor-pointer"
            onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Training Plan</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(plan.startDate).toLocaleDateString()} -{' '}
                      {new Date(plan.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className={cn('capitalize', getStatusColor(plan.status))}>
                  {plan.status.replace('_', ' ')}
                </Badge>
                <div className="text-right">
                  <div className="text-sm font-medium">{plan.progress}% Complete</div>
                  <Progress value={plan.progress} className="w-[100px]" />
                </div>
              </div>
            </div>

            {expandedPlan === plan.id && (
              <div className="mt-6 space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plan.modules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{module.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {module.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            {module.duration} hours
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              'capitalize',
                              getStatusColor(module.status)
                            )}
                          >
                            {module.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {plan.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{plan.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}