import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-95",
  {
    variants: {
      variant: {
        // Primary CTA - Blue
        default: "bg-[#4A90E2] text-white hover:bg-[#3d7fd6] active:bg-[#2b5ec4] shadow-md hover:shadow-lg hover:shadow-[#4A90E2]/20",
        
        // Destructive/Critical - Red
        destructive:
          "bg-[#702006] text-white hover:bg-[#5a1805] active:bg-[#3d0f03] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 shadow-md hover:shadow-[#702006]/20",
        
        // Secondary - Cyan
        secondary:
          "bg-[#66A5AD] text-white hover:bg-[#5596a0] active:bg-[#457c8a] shadow-md hover:shadow-[#66A5AD]/20",
        
        // Accent/Success - Teal
        accent:
          "bg-[#3B8075] text-white hover:bg-[#2f6760] active:bg-[#22504a] shadow-md hover:shadow-[#3B8075]/20",
        
        // Ghost variant - for subtle actions
        ghost:
          "text-[#E5E7EB] hover:bg-[#1F2937] active:bg-[#16213E] border border-white/10",
        
        // Outline variant - bordered
        outline:
          "border border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2]/10 active:bg-[#4A90E2]/20",
        
        // Link variant - text-only
        link: "text-[#4A90E2] underline-offset-4 hover:underline active:text-[#3d7fd6]",
        
        // Disabled/Muted
        muted: "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#2A3C4C] cursor-not-allowed",
      },
      size: {
        default: "h-10 px-4 py-2.5 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 rounded-lg px-6 text-base has-[>svg]:px-4",
        icon: "size-10 rounded-lg",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
