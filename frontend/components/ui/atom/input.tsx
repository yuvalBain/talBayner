"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes } from "react";

const inputVariants = cva(
  "flex h-10 w-full rounded-md text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-default [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        filled:
          "bg-input-primary border border-transparent text-foreground focus-visible:border-border-primary",
        outline:
          "bg-background border border-base-default text-foreground focus-visible:border-border-base-accent",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 rounded-md px-2.5 text-xs",
        lg: "h-11 rounded-md px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

export interface InputProps
  extends
    InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, disabled, onClick, ...props }, ref) => {
    const handleClick = disabled ? undefined : onClick;

    return (
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          inputVariants({ variant, size, className }),
          "focus-visible:ring-brand-accent focus-visible:ring-offset-base-primary"
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };