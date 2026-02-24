import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { HTMLAttributes } from "react";

export type NavLinksData = {
  items: { href: string; label: string }[];
  onNavigate?: () => void;
  className?: string;
};
type NavLinksProps = HTMLAttributes<HTMLUListElement> & NavLinksData;

/**
 * Main nav links. Active = black top border + bolder text. No button look; cursor pointer.
 */
export const NavLinks: React.FC<NavLinksProps> = ({
  items,
  onNavigate,
  className,
  children,
  ...props
}) => {
  const pathname = usePathname();

  return (
    <ul
      className={cn("flex items-center gap-5 md:gap-4", className)}
      role="menubar"
      aria-label="תפריט ראשי"
      {...props}
    >
      {items.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <li key={href} role="none">
            <Link
              href={href}
              role="menuitem"
              onClick={onNavigate}
              className={cn(
                "relative block whitespace-nowrap py-2 pt-3 text-[14px] leading-tight tracking-[0.2px] md:text-[16px]",
                "border-t-2 border-transparent transition-[border-color,color,font-weight] duration-200 ease-out",
                "text-nav-link hover:text-nav-link-hover cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-nav-primary focus-visible:rounded",
                isActive &&
                  "border-nav-link-active font-semibold text-nav-link-hover"
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};