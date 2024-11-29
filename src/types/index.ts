export type Installer = {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  role: InstallerRole;
  joinedDate: string;
};

export type InstallerRole = 'Lead' | 'Installer' | 'Training';

export type InstallerStats = {
  totalInstallations: number;
  averageInstallTime: number;
  filmUsage: number;
  revenueGenerated: number;
  certifications: number;
  qualityScore?: number;
  trainingProgress?: number;
};

export type Installation = {
  id: string;
  customerName: string;
  vehicleInfo: string;
  installer: {
    id: string;
    name: string;
  };
  status: 'completed' | 'in-progress' | 'needs-recut';
  totalArea: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type Appointment = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  vehicleInfo: string;
  date: string;
  time: string;
  estimatedDuration: number;
  installerId: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  serviceType: 'Full Body' | 'Partial Body' | 'Custom' | 'Touch Up';
  estimatedSquareFeet: number;
  quotedPrice: number;
  deposit?: number;
  notes?: string;
};

export type View =
  | 'dashboard'
  | 'inventory'
  | 'installers'
  | 'installations'
  | 'analytics'
  | 'quality'
  | 'training'
  | 'settings';

export type PPFRoll = {
  id: string;
  sku: string;
  rollId: string;
  name: string;
  lengthFeet: number;
  widthInches: number;
  price: number;
  category: string;
  manufacturer: string;
};

export type Brand = {
  id: string;
  name: string;
  logo?: string;
  notes?: string;
};

export type Sku = {
  id: string;
  sku: string;
  brandId: string;
  name: string;
  widthInches: number;
  lengthFeet: number;
  cost: number;
  notes?: string;
};

export type TimelineViewProps = {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  onAppointmentUpdate?: (appointment: Appointment) => void;
  selectedInstallerId?: string;
};

export * from './quality';
export * from './training';