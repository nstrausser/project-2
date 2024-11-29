import { Button } from "@/components/ui/button";
import { Scroll } from "lucide-react";
import type { View } from "@/App";

type NavLogoProps = {
  onClick: () => void;
  className?: string;
};

export function NavLogo({ onClick, className }: NavLogoProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-md p-2">
        <Scroll className="h-6 w-6" />
      </div>
      <span className="sr-only">Dashboard</span>
    </Button>
  );
}