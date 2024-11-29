import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AppointmentDialog } from './AppointmentDialog';
import type { Appointment } from '@/types/appointment';
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Full Vehicle PPF',
    description: 'Complete vehicle protection film installation',
    startTime: new Date('2024-03-20T09:00:00'),
    endTime: new Date('2024-03-20T17:00:00'),
    customerId: 'cust1',
    customerName: 'John Doe',
    installerId: 'inst1',
    installerName: 'Mike Smith',
    status: 'scheduled',
    vehicleInfo: {
      make: 'Tesla',
      model: 'Model 3',
      year: '2023',
      color: 'Red',
    },
    services: ['Full Front PPF', 'Door Edges'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock appointments as needed
];

export default function AppointmentsView() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>();

  const handleSave = (appointmentData: Partial<Appointment>) => {
    if (selectedAppointment) {
      // Update existing appointment
      setAppointments(appointments.map(app => 
        app.id === selectedAppointment.id 
          ? { ...app, ...appointmentData }
          : app
      ));
    } else {
      // Create new appointment
      const newAppointment: Appointment = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...appointmentData,
      } as Appointment;
      setAppointments([...appointments, newAppointment]);
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'default';
      case 'in-progress':
        return 'warning';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <Button onClick={() => {
          setSelectedAppointment(undefined);
          setDialogOpen(true);
        }}>
          Add Appointment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="cursor-pointer hover:bg-muted/50"
            onClick={() => {
              setSelectedAppointment(appointment);
              setDialogOpen(true);
            }}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{appointment.title}</CardTitle>
                  <CardDescription>{appointment.customerName}</CardDescription>
                </div>
                <Badge variant={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {appointment.startTime.toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {appointment.startTime.toLocaleTimeString()} - {appointment.endTime.toLocaleTimeString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="mr-2 h-4 w-4" />
                  {appointment.installerName || 'Unassigned'}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AppointmentDialog
        appointment={selectedAppointment}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
      />
    </div>
  );
}