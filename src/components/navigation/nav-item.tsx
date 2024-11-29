import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "./types";

type NavItemProps = {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  variant?: 'icon' | 'full';
};

export function NavItem({ item, isActive, onClick, variant = 'icon' }: NavItemProps) {
  if (variant === 'full') {
    return (
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start text-left font-normal',
          isActive && 'bg-secondary hover:bg-secondary/80'
        )}
        onClick={onClick}
      >
        <item.icon className="mr-2 h-4 w-4" />
        {item.name}
      </Button>
    );
  }

  return (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      size="icon"
      className={cn(
        'h-12 w-12 relative group hover:bg-primary/10',
        isActive && 'bg-secondary hover:bg-secondary/80'
      )}
      onClick={onClick}
      aria-label={item.name}
      aria-current={isActive ? 'page' : undefined}
    >
      <item.icon className="h-6 w-6" />
      <div 
        className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
        role="tooltip"
      >
        {item.name}
      </div>
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-primary rounded-r-full" />
      )}
    </Button>
  );
}