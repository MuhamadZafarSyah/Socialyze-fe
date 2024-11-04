import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center text-text justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:translate-x-boxShadowX disabled:translate-y-boxShadowY disabled:shadow-none dark:disabled:shadow-none",
  {
    variants: {
      variant: {
        default:
          "bg-main border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none dark:active:shadow-none",
        noShadow: "bg-main border-2 border-border dark:border-darkBorder",
        neutral:
          "bg-white dark:bg-secondaryBlack dark:text-darkText border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none dark:active:shadow-none",
        reverse:
          "bg-main border-2 border-border dark:border-darkBorder active:translate-x-reverseBoxShadowX active:translate-y-reverseBoxShadowY active:shadow-light dark:active:shadow-dark",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
