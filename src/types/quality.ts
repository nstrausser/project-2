export type QualityCheck = {
  id: string;
  installationId: string;
  performedBy: string;
  performedAt: string;
  status: 'passed' | 'failed' | 'needs-review';
  checklist: ChecklistItem[];
  notes?: string;
  images?: string[];
};

export type ChecklistItem = {
  id: string;
  category: 'surface_prep' | 'installation' | 'finish' | 'edges' | 'clarity';
  description: string;
  status: 'passed' | 'failed' | 'na';
  notes?: string;
};

export type DefectReport = {
  id: string;
  installationId: string;
  reportedBy: string;
  reportedAt: string;
  type: 'bubble' | 'dirt' | 'stretch' | 'alignment' | 'edge_lift' | 'other';
  severity: 'low' | 'medium' | 'high';
  location: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved';
  resolution?: string;
  images?: string[];
};

export type WarrantyClaim = {
  id: string;
  installationId: string;
  claimDate: string;
  customerName: string;
  vehicleInfo: string;
  issue: string;
  status: 'pending' | 'approved' | 'denied' | 'resolved';
  resolution?: string;
  defectReportId?: string;
  resolutionDate?: string;
};

export type QualityMetrics = {
  period: string;
  totalInstallations: number;
  passRate: number;
  averageDefectsPerInstall: number;
  warrantyClaimRate: number;
  customerSatisfactionScore: number;
  topDefects: {
    type: string;
    count: number;
  }[];
};

export type InstallationStandard = {
  id: string;
  name: string;
  version: string;
  categories: {
    name: string;
    requirements: {
      id: string;
      description: string;
      criticalityLevel: 'low' | 'medium' | 'high';
    }[];
  }[];
  updatedAt: string;
};