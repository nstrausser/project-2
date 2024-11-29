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
import { Award, Calendar, FileCheck, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Certification } from '@/types/training';

// Mock data
const mockCertifications: Certification[] = [
  {
    id: '1',
    name: 'Advanced PPF Installation',
    issuer: 'XPEL',
    achievedDate: '2024-03-15',
    expiryDate: '2026-03-15',
    status: 'active',
    level: 'advanced',
    skills: ['Complex Curves', 'Deep Recesses', 'Quality Control'],
    score: 95,
  },
  {
    id: '2',
    name: 'Paint Protection Fundamentals',
    issuer: '3M',
    achievedDate: '2023-12-01',
    expiryDate: '2025-12-01',
    status: 'active',
    level: 'intermediate',
    skills: ['Surface Preparation', 'Basic Installation', 'Edge Wrapping'],
    score: 88,
  },
  {
    id: '3',
    name: 'Quality Assurance Specialist',
    issuer: 'SunTek',
    achievedDate: '2023-09-15',
    expiryDate: '2024-04-15',
    status: 'expiring_soon',
    level: 'expert',
    skills: ['Defect Identification', 'Quality Standards', 'Documentation'],
    score: 92,
  },
];

const getLevelColor = (level: Certification['level']) => {
  switch (level) {
    case 'beginner':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'intermediate':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'advanced':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'expert':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const getStatusColor = (status: Certification['status']) => {
  switch (status) {
    case 'active':
      return 'bg-[#0070F3]/10 text-[#0070F3] border-[#0070F3]/20';
    case 'expiring_soon':
      return 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20';
    case 'expired':
      return 'bg-[#E00]/10 text-[#E00] border-[#E00]/20';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

export default function CertificationsView() {
  const [expandedCert, setExpandedCert] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-[#0070F3]/10 flex items-center justify-center">
              <Award className="h-5 w-5 text-[#0070F3]" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {mockCertifications.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Certifications
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-[#F5A623]" />
            </div>
            <div>
              <div className="text-2xl font-bold">1</div>
              <div className="text-sm text-muted-foreground">
                Expiring Soon
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <FileCheck className="h-5 w-5 text-[#10B981]" />
            </div>
            <div>
              <div className="text-2xl font-bold">91.7</div>
              <div className="text-sm text-muted-foreground">
                Average Score
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certification</TableHead>
              <TableHead>Issuer</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCertifications.map((cert) => (
              <TableRow
                key={cert.id}
                className={cn(
                  'cursor-pointer transition-colors',
                  expandedCert === cert.id
                    ? 'bg-muted/50'
                    : 'hover:bg-muted/50'
                )}
                onClick={() =>
                  setExpandedCert(expandedCert === cert.id ? null : cert.id)
                }
              >
                <TableCell>
                  <div className="font-medium">{cert.name}</div>
                  {expandedCert === cert.id && (
                    <div className="mt-2">
                      <div className="text-sm text-muted-foreground mb-1">
                        Skills Covered:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>{cert.issuer}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      'capitalize',
                      getLevelColor(cert.level)
                    )}
                  >
                    {cert.level}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      'capitalize',
                      getStatusColor(cert.status)
                    )}
                  >
                    {cert.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div
                    className={cn(
                      'font-medium',
                      cert.score >= 90
                        ? 'text-green-600 dark:text-green-500'
                        : cert.score >= 80
                        ? 'text-blue-600 dark:text-blue-500'
                        : 'text-yellow-600 dark:text-yellow-500'
                    )}
                  >
                    {cert.score}%
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(cert.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}