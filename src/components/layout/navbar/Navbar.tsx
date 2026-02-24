"use client";

import { CartAndSearch } from "@/components/layout/navbar/cart-and-search";
import { Logos } from "@/components/layout/navbar/logos";
import { MobileDrawer } from "@/components/layout/navbar/mobile-drawer";
import { MobileMenuButton } from "@/components/layout/navbar/mobile-menu-button";
import { NavLinks } from "@/components/layout/navbar/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import Link from "next/link";
import React, { HTMLAttributes, useCallback, useEffect, useState } from "react";
import { ROUTES, NAV_ITEMS } from "@/constants/routes";
import { cn } from "@/lib/cn";

type NavbarProps = HTMLAttributes<HTMLHeadElement>;

export const Navbar: React.FC<NavbarProps> = ({ className, ...props }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header
        role="banner"
        aria-label="ניווט ראשי"
        dir={"ltr"}
        className={cn(
          className,
          "direction-ltr sticky top-0 z-30 flex min-h-nav w-full items-center border-b border-nav-primary bg-nav-primary transition-shadow duration-200 pt-3 pb-3",
          scrolled && "shadow-nav"
        )}
        {...props}
      >
        <nav
          className="mx-auto flex h-full w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 "
          aria-label="תפריט ראשי"
        >
          {/* Left: top row = cart+search (+ theme), bottom row = logos (Figma) */}
          <div className="flex gap-2 flex-row-reverse ">
            <div className="flex items-center gap-2">
              <CartAndSearch />
            </div>

            <Logos />

            <ThemeToggle />
          </div>

          {/* Middle: nav links (desktop) */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:min-w-0">
            <NavLinks items={NAV_ITEMS} />
          </div>

          {/* Right: divider, lang selector, mobile menu */}
          <div className=" items-center gap-2 flex sm:hidden">
            <MobileMenuButton
              open={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            />
          </div>
        </nav>
      </header>

      {/* Mobile: cart + search visible below logos area, or inside drawer. Per spec "Drawer: Same as navbar original just on a list". So links in drawer. I'll put cart+search in drawer too. */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="mb-4 flex items-center gap-2">
          <Link
            href={ROUTES.shop}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-nav-link hover:bg-secondary"
            onClick={() => setMobileOpen(false)}
          >
            <span>חנות</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </Link>
        </div>
        <label className="sr-only" htmlFor="mobile-search">
          חיפוש
        </label>
        <input
          id="mobile-search"
          type="search"
          placeholder="חיפוש..."
          className={cn(
            "mb-4 h-10 w-full rounded-md border px-3 text-sm bg-nav-input border-nav-input text-primary outline-none focus:ring-2 focus:ring-primary"
          )}
        />
        <NavLinks
          items={NAV_ITEMS}
          onNavigate={() => setMobileOpen(false)}
          className="flex-col items-stretch gap-0"
        />
      </MobileDrawer>
    </>
  );
};