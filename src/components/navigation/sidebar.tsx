import { cn } from '@/lib/utils';
import { NavItem } from './nav-item';
import { NavLogo } from './nav-logo';
import { MobileNav } from './mobile-nav';
import { UserMenu } from '@/components/UserMenu';
import { Separator } from '@/components/ui/separator';
import type { SidebarProps } from './types';

export default function Sidebar({ navigation, currentView, setCurrentView }: SidebarProps) {
  return (
    <>
      <MobileNav
        navigation={navigation}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <div
        className={cn(
          'fixed hidden h-screen w-[72px] flex-col justify-between border-r bg-background md:flex'
        )}
      >
        <div className="space-y-4 py-4">
          <div className="flex justify-center">
            <NavLogo
              onClick={() => setCurrentView('dashboard')}
              className="h-12 w-12 relative group"
            />
          </div>
          <Separator />
          <nav className="grid gap-1 px-2">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={currentView === item.view}
                onClick={() => setCurrentView(item.view)}
              />
            ))}
          </nav>
        </div>

        <div className="border-t p-2">
          <UserMenu />
        </div>
      </div>
    </>
  );
}