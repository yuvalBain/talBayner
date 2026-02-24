import { cn } from "@/lib/cn";
import React, { HTMLAttributes, useEffect } from "react";

export type MobileDrawerData = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
type MobileDrawerProps = HTMLAttributes<HTMLDivElement> & MobileDrawerData;

/**
 * Mobile drawer – full height, slide from right, same links as nav.
 */
export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  children,
  ...props
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        id="mobile-nav"
        role="dialog"
        aria-label="תפריט ניווט"
        className={cn(
          "fixed top-0 bottom-0 right-0 z-50 w-[min(100vw,320px)] overflow-y-auto bg-nav-primary border-l border-nav-primary shadow-xl transition-transform duration-200 ease-out md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-1 p-4 pt-nav">{children}</div>
      </aside>
    </>
  );
};