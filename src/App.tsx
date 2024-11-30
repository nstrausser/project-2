import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import LoginPage from '@/components/auth/LoginPage';
import Dashboard from '@/components/Dashboard';
import Inventory from '@/components/Inventory';
import Analytics from '@/components/Analytics';
import Settings from '@/components/Settings';
import InstallersView from '@/components/installers/InstallersView';
import InstallationsView from '@/components/installations/InstallationsView';
import QualityDashboard from '@/components/quality/QualityDashboard';
import TrainingDashboard from '@/components/training/TrainingDashboard';
import Layout from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';
import ProfileSettings from '@/components/settings/ProfileSettings';
import AppointmentsView from '@/components/appointments/AppointmentsView';
import AuthCallback from '@/components/auth/AuthCallback';

// Export the View type for use in other components
export type { View } from '@/types';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="installers" element={<InstallersView />} />
                <Route path="installations" element={<InstallationsView />} />
                <Route path="appointments" element={<AppointmentsView />} />
                <Route path="quality" element={<QualityDashboard />} />
                <Route path="training" element={<TrainingDashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<ProfileSettings />} />
              </Route>
            </Routes>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}