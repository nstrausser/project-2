import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Shield, AlertTriangle } from 'lucide-react';
import InstallationStatus from './InstallationStatus';
import type { Installation } from '@/types';

type InstallationListProps = {
  installations: Installation[];
  onInstallationClick: (installation: Installation) => void;
  onQualityCheck: (installation: Installation) => void;
  onDefectReport: (installation: Installation) => void;
};

export default function InstallationList({
  installations,
  onInstallationClick,
  onQualityCheck,
  onDefectReport,
}: InstallationListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Installer</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installations.map((installation) => (
            <TableRow
              key={installation.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onInstallationClick(installation)}
            >
              <TableCell>
                {new Date(installation.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{installation.customerName}</TableCell>
              <TableCell>{installation.vehicleInfo}</TableCell>
              <TableCell>{installation.installer.name}</TableCell>
              <TableCell>{installation.totalArea.toFixed(1)} ft²</TableCell>
              <TableCell>
                <InstallationStatus status={installation.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div
                    className="cursor-pointer p-2 rounded-md hover:bg-accent/50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQualityCheck(installation);
                    }}
                  >
                    <Shield className="h-4 w-4" />
                  </div>
                  <div
                    className="cursor-pointer p-2 rounded-md hover:bg-accent/50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDefectReport(installation);
                    }}
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}