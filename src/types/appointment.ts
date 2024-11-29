export interface Appointment {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  customerId: string;
  customerName: string;
  installerId?: string;
  installerName?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  vehicleInfo?: {
    make: string;
    model: string;
    year: string;
    color: string;
  };
  services: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
} 