"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, type MouseEvent, forwardRef } from "react";

const DEFAULT_DEBOUNCE_DELAY_MS = 3000;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent-primary hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** When true, uses default delay (3000ms). When a number, uses that many ms. Clicks are debounced (last click wins). */
  debounce?: boolean | number;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      type = "button",
      debounce,
      onClick: onClickProp,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const delayMs =
      debounce === true
        ? DEFAULT_DEBOUNCE_DELAY_MS
        : typeof debounce === "number"
          ? debounce
          : DEFAULT_DEBOUNCE_DELAY_MS;
    const debouncedRun = useDebounce({ delay: delayMs });

    const onClick =
      props.disabled
        ? undefined
        : debounce
          ? (e: MouseEvent<HTMLButtonElement>) => {
              debouncedRun({ callback: () => onClickProp?.(e) });
            }
          : onClickProp;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        onClick={onClick}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };