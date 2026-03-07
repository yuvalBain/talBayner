/**
 * Simple classNames utility for conditional Tailwind classes.
 */
type ClassValue = string | undefined | null | false;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
