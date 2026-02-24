import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants/site";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

/**
 * Home page shell – structure only. No functionality yet.
 */
export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">
        דף הבית
      </h1>
      <p className="mt-4 text-muted-foreground">
        שלד האתר – תוכן ועיצוב יוגדרו בהמשך.
      </p>
    </div>
  );
}
