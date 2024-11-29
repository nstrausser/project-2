import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Sidebar from '@/components/navigation/sidebar';
import { mainNavItems } from '@/components/navigation/constants';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { View } from '@/App';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentView = mainNavItems.find(
    (item) => item.path === location.pathname
  )?.view as View;

  return (
    <div className="min-h-screen bg-background">
      <TooltipProvider>
        <Sidebar
          navigation={mainNavItems}
          currentView={currentView}
          setCurrentView={(view) => {
            const path = mainNavItems.find((item) => item.view === view)?.path;
            if (path) navigate(path);
          }}
        />
      </TooltipProvider>
      <main className="md:pl-[72px]">
        <div className={`${currentView === 'analytics' ? 'p-4' : 'p-8'}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}