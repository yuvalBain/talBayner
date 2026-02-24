import { cn } from "@/lib/cn";
import React, { HTMLAttributes } from "react";

type MobileMenuButtonProps = HTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  open: boolean;
};

/**
 * Mobile menu button (hamburger).
 */
export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  onClick,
  open,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-md md:hidden",
        "text-nav-link hover:text-nav-link-hover ",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-nav-primary"
      )}
      aria-expanded={open}
      aria-label="תפריט"
      aria-controls="mobile-nav"
      {...props}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        {open ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <>
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </>
        )}
      </svg>
    </button>
  );
};