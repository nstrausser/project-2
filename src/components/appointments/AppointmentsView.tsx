import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import AppointmentDialog from './AppointmentDialog';
import TimelineView from './TimelineView';
import type { Appointment } from '@/types';

// Get today's date and next 6 days
const today = new Date();
const formatDate = (date: Date) => date.toISOString().split('T')[0];
const dates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  return formatDate(date);
});

// Mock data for appointments with some multi-day appointments
const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerName: '#1206 E. KRAENZLER',
    customerPhone: '555-0123',
    customerEmail: 'kraenzler@example.com',
    vehicleInfo: '#1206 E. KRAENZLER - BMW X1 - FULL WRAP',
    date: dates[0],
    time: '09:00',
    estimatedDuration: 960, // 2-day installation
    installerId: '1',
    status: 'scheduled',
    estimatedSquareFeet: 150,
    serviceType: 'Full Body',
    quotedPrice: 2499.99,
  },
  {
    id: '2',
    customerName: 'MBNO',
    customerPhone: '555-0124',
    customerEmail: 'mbno@example.com',
    vehicleInfo: 'MBNO - GLE53 - FULL SATIN WRAP',
    date: dates[1],
    time: '09:00',
    estimatedDuration: 1440, // 3-day installation
    installerId: '2',
    status: 'confirmed',
    estimatedSquareFeet: 175,
    serviceType: 'Full Body',
    quotedPrice: 3299.99,
  },
  {
    id: '3',
    customerName: 'MBNO',
    customerPhone: '555-0125',
    customerEmail: 'mbno@example.com',
    vehicleInfo: 'MBNO - GLE53 - FULL SATIN WRAP',
    date: dates[1],
    time: '09:00',
    estimatedDuration: 1440, // 3-day installation
    installerId: '3',
    status: 'scheduled',
    estimatedSquareFeet: 200,
    serviceType: 'Full Body',
    quotedPrice: 4199.99,
  },
];

export const installers = [
  { id: '1', name: 'Matt Anderson' },
  { id: '2', name: 'Shawn Williams' },
  { id: '3', name: 'Brandon Davis' },
  { id: '4', name: 'Kevin Thompson' },
];

export default function AppointmentsView() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInstaller, setSelectedInstaller] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  const handleAppointmentUpdate = (updatedAppointment: Appointment) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === updatedAppointment.id ? { ...apt, ...updatedAppointment } : apt
      )
    );
    toast.success('Appointment updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">
            Schedule and manage installation appointments.
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedInstaller} onValueChange={setSelectedInstaller}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by installer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Installers</SelectItem>
            {installers.map((installer) => (
              <SelectItem key={installer.id} value={installer.id}>
                {installer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card">
        <TimelineView
          appointments={appointments}
          onAppointmentClick={handleAppointmentClick}
          onAppointmentUpdate={handleAppointmentUpdate}
          selectedInstallerId={selectedInstaller === 'all' ? undefined : selectedInstaller}
        />
      </div>

      <AppointmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        appointment={selectedAppointment}
        onSave={(appointment) => {
          if (selectedAppointment) {
            handleAppointmentUpdate(appointment);
          } else {
            setAppointments([...appointments, { ...appointment, id: Date.now().toString() }]);
          }
          setSelectedAppointment(null);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}