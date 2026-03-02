import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import { AnchorHTMLAttributes, forwardRef, MouseEvent } from "react";

const linkVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        filled:
          "bg-brand-primary text-primary-foreground shadow hover:bg-primary/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  }
);

export interface LinkProps
  extends
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof linkVariants> {
  href: string;
  disabled?: boolean;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { className, variant, size, href, disabled = false, onClick, ...props },
    ref
  ) => {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <NextLink
        ref={ref}
        href={disabled ? "#" : href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={cn(linkVariants({ variant, size, className }))}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";

export { Link, linkVariants };