import { cn } from '@/lib/utils';
import { formatDate, parseISODate, isSameDayDate } from '@/lib/utils';
import type { Appointment, TimelineViewProps } from '@/types';

// Mock data for installers
const installers = [
  { id: '1', name: 'Matt Anderson' },
  { id: '2', name: 'Shawn Williams' },
  { id: '3', name: 'Brandon Davis' },
  { id: '4', name: 'Kevin Thompson' },
];

// Get today's date and next 6 days
const today = new Date();
const dates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  return date;
});

// Installer colors for visual distinction
const installerColors = {
  '1': 'bg-blue-50/50 dark:bg-blue-950/20',
  '2': 'bg-green-50/50 dark:bg-green-950/20',
  '3': 'bg-purple-50/50 dark:bg-purple-950/20',
  '4': 'bg-orange-50/50 dark:bg-orange-950/20',
};

function AppointmentCard({ 
  appointment,
  onClick,
  daysSpan,
  startColumn,
}: { 
  appointment: Appointment;
  onClick: () => void;
  daysSpan: number;
  startColumn: number;
}) {
  const parts = appointment.vehicleInfo.split(' - ');
  const customer = parts[0];
  const vehicle = parts[1];
  const service = parts[2];

  return (
    <div
      className={cn(
        "absolute inset-y-0 h-[calc(100%-12px)] px-3 py-2 mx-1 my-1.5",
        "text-sm font-medium bg-white dark:bg-white/5 border rounded-md cursor-pointer",
        "hover:bg-accent hover:border-primary/20 dark:hover:bg-accent/10",
        "transition-all duration-200 shadow-sm",
        "flex flex-col justify-center"
      )}
      onClick={onClick}
      style={{
        left: `${(startColumn - 1) * 100}%`,
        width: `${daysSpan * 100 - 1}%`,
        zIndex: 10,
      }}
    >
      <div className="font-semibold truncate">
        {customer}
      </div>
      <div className="truncate text-muted-foreground text-xs">
        {vehicle} - {service}
      </div>
    </div>
  );
}

export default function TimelineView({
  appointments,
  onAppointmentClick,
  selectedInstallerId,
}: TimelineViewProps) {
  // Group appointments by installer
  const appointmentsByInstaller = appointments.reduce((acc, appointment) => {
    const installer = installers.find(i => i.id === appointment.installerId);
    if (installer) {
      if (!acc[installer.id]) {
        acc[installer.id] = {
          id: installer.id,
          name: installer.name,
          appointments: [],
        };
      }
      acc[installer.id].appointments.push(appointment);
    }
    return acc;
  }, {} as Record<string, { id: string; name: string; appointments: Appointment[] }>);

  return (
    <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
      <div className="bg-primary/5 dark:bg-primary/10 p-3 text-center font-semibold border-b text-lg">
        PPF DAILY OBJECTIVES
      </div>
      
      <div className="grid grid-cols-6 divide-x divide-border border-b bg-secondary/50 dark:bg-secondary/20">
        <div className="p-3 font-medium">BOOKING STATUS:</div>
        {dates.map((date) => (
          <div key={date.toISOString()} className="p-3 text-center">
            <div className="font-medium">{formatDate(date, 'EEEE').toUpperCase()}</div>
            <div className="text-sm text-muted-foreground">{formatDate(date, 'M/d')}</div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-border">
        {Object.values(appointmentsByInstaller)
          .filter(installer => !selectedInstallerId || installer.id === selectedInstallerId)
          .map((installer) => (
            <div 
              key={installer.id} 
              className={cn(
                "grid grid-cols-6 divide-x divide-border min-h-[100px]",
                installerColors[installer.id as keyof typeof installerColors]
              )}
            >
              <div className="p-3 font-medium">
                {installer.name.toUpperCase()}
              </div>
              <div className="col-span-5 relative min-h-[100px]">
                {installer.appointments.map((appointment) => {
                  const aptDate = parseISODate(appointment.date);
                  const daysSpan = Math.ceil(appointment.estimatedDuration / 480);
                  
                  const startColumn = dates.findIndex(date => 
                    isSameDayDate(date, aptDate)
                  ) + 1;

                  if (startColumn > 0) {
                    return (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onClick={() => onAppointmentClick(appointment)}
                        daysSpan={Math.min(daysSpan, 6 - startColumn)}
                        startColumn={startColumn}
                      />
                    );
                  }
                  return null;
                })}
                {installer.id === '1' && isSameDayDate(dates[0], today) && (
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-medium text-muted-foreground">
                    OFF
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}