import { NavLogo } from "./nav-logo";
import { NavItem } from "./nav-item";
import { mainNavItems } from "./constants";
import type { SidebarProps } from "./types";

export function DesktopNav({ currentView, setCurrentView }: SidebarProps) {
  return (
    <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-[72px] flex-col bg-background border-r">
      <div className="flex items-center justify-center h-[72px] border-b">
        <NavLogo
          onClick={() => setCurrentView('dashboard')}
          className="h-12 w-12 relative group"
        />
      </div>

      <nav className="flex-1 flex flex-col items-center py-6 space-y-4" role="navigation">
        {mainNavItems.slice(1).map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isActive={currentView === item.view}
            onClick={() => setCurrentView(item.view)}
          />
        ))}
      </nav>
    </div>
  );
}