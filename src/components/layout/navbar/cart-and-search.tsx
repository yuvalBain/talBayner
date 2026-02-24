import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";
import Link from "next/link";
import React, { HTMLAttributes } from "react";

export type CartButtonData = {};
type CartButtonProps = HTMLAttributes<HTMLDivElement> & CartButtonData;

/**
 * Cart button (bag) + search input. Uses navbar input vars.
 */
export const CartAndSearch: React.FC<CartButtonProps> = ({
  className,
  children,
  ...props
}) => (
  <div className="flex shrink-0 items-center gap-2" {...props}>
    <Link
      href={ROUTES.shop}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
        "text-nav-link hover:text-nav-link-hover",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-nav-primary"
      )}
      aria-label="חנות"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    </Link>
    <label className="sr-only" htmlFor="navbar-search">
      חיפוש בחנות
    </label>
    <input
      id="navbar-search"
      type="search"
      placeholder="חיפוש..."
      className={cn(
        "h-10 w-40 rounded-md border px-3 text-sm outline-none transition-colors",
        "bg-nav-input border-nav-input",
        "text-primary placeholder-muted-foreground",
        "focus:ring-2 focus:ring-primary focus:border-transparent",
        "md:w-48"
      )}
      aria-label="חיפוש בחנות"
    />
  </div>
);