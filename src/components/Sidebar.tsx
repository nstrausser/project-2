import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Scroll, Menu } from "lucide-react";
import { useState } from "react";
import type { View } from "@/App";

type SidebarProps = {
  navigation: {
    name: string;
    icon: any;
    view: View;
  }[];
  currentView: View;
  setCurrentView: (view: View) => void;
};

export default function Sidebar({
  navigation,
  currentView,
  setCurrentView,
}: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 hover:bg-primary/10"
                onClick={() => {
                  setCurrentView('dashboard');
                  setOpen(false);
                }}
              >
                <Scroll className="h-6 w-6" />
              </Button>
            </SheetTitle>
          </SheetHeader>
          <nav className="p-6 space-y-2">
            {navigation.slice(1).map((item) => (
              <Button
                key={item.name}
                variant={currentView === item.view ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  currentView === item.view && 'bg-secondary hover:bg-secondary/80'
                )}
                onClick={() => {
                  setCurrentView(item.view);
                  setOpen(false);
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-[72px] flex-col bg-background border-r">
        <div className="flex items-center justify-center h-[72px] border-b">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 hover:bg-primary/10"
            onClick={() => setCurrentView('dashboard')}
          >
            <Scroll className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center py-6 space-y-4">
          {navigation.slice(1).map((item) => (
            <Button
              key={item.name}
              variant={currentView === item.view ? 'secondary' : 'ghost'}
              size="icon"
              className={cn(
                'h-12 w-12 relative group hover:bg-primary/10',
                currentView === item.view && 'bg-secondary hover:bg-secondary/80'
              )}
              onClick={() => setCurrentView(item.view)}
            >
              <item.icon className="h-6 w-6" />
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                {item.name}
              </div>
              {currentView === item.view && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-primary rounded-r-full" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}