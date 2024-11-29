import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[#0070F3]/10 text-[#0070F3] dark:bg-[#0070F3]/20",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-[#FF0000]/10 text-[#FF0000] dark:bg-[#FF0000]/20",
        outline: "text-foreground border border-input",
        success: "bg-[#21C55D]/10 text-[#21C55D] dark:bg-[#21C55D]/20",
        warning: "bg-[#F5A623]/10 text-[#F5A623] dark:bg-[#F5A623]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };