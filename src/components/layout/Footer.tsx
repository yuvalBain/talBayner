/**
 * Footer placeholder – structure only. No business logic.
 */
export function Footer() {
  return (
    <footer
      className="border-t border-default bg-secondary py-8"
      role="contentinfo"
      aria-label="פוטר"
    >
      <div className="mx-auto max-w-6xl px-4 text-center text-muted-foreground text-sm  ">
        <p>© {new Date().getFullYear()} – Placeholder. Design to follow.</p>
      </div>
    </footer>
  );
}