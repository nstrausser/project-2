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
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAppointments } from '@/hooks/useAppointments';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function AppointmentsView() {
  const { appointments, loading, createAppointment, updateAppointment } = useAppointments();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>();

  if (loading) {
    return <LoadingScreen />;
  }

  const handleSave = async (appointmentData: Partial<Appointment>) => {
    try {
      if (selectedAppointment) {
        await updateAppointment(selectedAppointment.id, appointmentData);
      } else {
        await createAppointment(appointmentData);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Failed to save appointment:', error);
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