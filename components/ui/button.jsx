import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-md hover:brightness-105 hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]",
        destructive:
          "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-md hover:brightness-110 hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus-visible:ring-red-400",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:scale-[1.03] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:brightness-110 hover:shadow-md hover:scale-[1.03] active:scale-[0.97]",
        ghost:
          "hover:bg-accent/50 hover:text-accent-foreground hover:scale-[1.03] dark:hover:bg-accent/30",
        link: "text-primary underline-offset-4 hover:underline hover:text-blue-600 dark:hover:text-blue-400",

        // ✨ Blue themed premium styles
        primary:
          "backdrop-blur-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white shadow-lg hover:brightness-110 hover:shadow-2xl hover:scale-[1.05] active:scale-[0.97] focus-visible:ring-blue-400",
        glass:
          "backdrop-blur-xl bg-blue-500/10 text-blue-100 border border-blue-400/30 shadow-sm hover:bg-blue-500/20 hover:shadow-lg hover:scale-[1.05] active:scale-[0.97] focus-visible:ring-blue-400/40",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4 text-sm",
        xl: "h-12 px-6 text-base rounded-xl", // custom
        icon: "size-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
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
