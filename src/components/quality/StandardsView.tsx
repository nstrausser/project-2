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
import { FileText, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InstallationStandard } from '@/types/quality';

// Mock data
const mockStandards: InstallationStandard[] = [
  {
    id: '1',
    name: 'PPF Installation Standard v2.0',
    version: '2.0',
    categories: [
      {
        name: 'Surface Preparation',
        requirements: [
          {
            id: 'r1',
            description: 'Surface must be thoroughly cleaned and decontaminated',
            criticalityLevel: 'high',
          },
          {
            id: 'r2',
            description: 'Surface temperature must be within recommended range',
            criticalityLevel: 'medium',
          },
        ],
      },
      {
        name: 'Installation Technique',
        requirements: [
          {
            id: 'r3',
            description: 'Proper slip solution mixture must be used',
            criticalityLevel: 'high',
          },
          {
            id: 'r4',
            description: 'Correct squeegee pressure must be applied',
            criticalityLevel: 'medium',
          },
        ],
      },
    ],
    updatedAt: '2024-03-15T10:00:00Z',
  },
];

const getCriticalityColor = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'low':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  }
};

export default function StandardsView() {
  const [expandedStandard, setExpandedStandard] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{mockStandards.length}</div>
              <div className="text-sm text-muted-foreground">Active Standards</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Critical Requirements</div>
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
                  <TableHead>Standard Name</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStandards.map((standard) => (
                  <TableRow
                    key={standard.id}
                    className={cn(
                      'cursor-pointer transition-colors',
                      expandedStandard === standard.id ? 'bg-muted/50' : 'hover:bg-muted/50'
                    )}
                    onClick={() =>
                      setExpandedStandard(expandedStandard === standard.id ? null : standard.id)
                    }
                  >
                    <TableCell>
                      <div className="font-medium">{standard.name}</div>
                      {expandedStandard === standard.id && (
                        <div className="mt-4 space-y-4">
                          {standard.categories.map((category) => (
                            <div key={category.name} className="pl-4 border-l-2 border-muted">
                              <h4 className="font-medium mb-2">{category.name}</h4>
                              <div className="space-y-2">
                                {category.requirements.map((req) => (
                                  <div key={req.id} className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                      {req.description}
                                    </span>
                                    <Badge
                                      className={cn(
                                        'ml-2',
                                        getCriticalityColor(req.criticalityLevel)
                                      )}
                                    >
                                      {req.criticalityLevel}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{standard.version}</TableCell>
                    <TableCell>{standard.categories.length}</TableCell>
                    <TableCell>
                      {new Date(standard.updatedAt).toLocaleDateString()}
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