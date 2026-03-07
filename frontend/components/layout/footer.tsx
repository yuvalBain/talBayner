import { FC, HTMLAttributes } from "react";

/**
 * Footer placeholder – structure only. No business logic. using HTMLElement as the footer element, but it can be changed to a div or any other element if needed.
 */
type FooterProps = HTMLAttributes<HTMLElement>;

export const Footer: FC<FooterProps> = () => (
  <footer
    className="border-t border-default bg-secondary py-8 px-4"
    role="contentinfo"
    aria-label="פוטר"
  >
    <div className="mx-auto max-w-6xl px-4 text-center text-muted-foreground text-sm  ">
      <p>© {new Date().getFullYear()} – Placeholder. Design to follow.</p>
    </div>
  </footer>
);