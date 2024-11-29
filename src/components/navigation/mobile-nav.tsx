import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { NavItem } from './nav-item';
import { NavLogo } from './nav-logo';
import { UserMenu } from '@/components/UserMenu';
import { Separator } from '@/components/ui/separator';
import type { SidebarProps } from './types';

export function MobileNav({ navigation, currentView, setCurrentView }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed left-4 top-4 z-40"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <NavLogo
              onClick={() => {
                setCurrentView('dashboard');
                setOpen(false);
              }}
              className="h-12 w-12 relative group"
            />
          </div>
          <div className="flex-1 overflow-auto">
            <nav className="grid gap-1 p-2">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={currentView === item.view}
                  onClick={() => {
                    setCurrentView(item.view);
                    setOpen(false);
                  }}
                  variant="full"
                />
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <UserMenu />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}