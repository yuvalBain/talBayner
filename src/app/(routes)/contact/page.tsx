import type { Metadata } from "next";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "צור קשר",
  description: `צור קשר – ${SITE_NAME}`,
};

/**
 * Contact page shell – structure only. Form and logic in Phase 3.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">
        צור קשר
      </h1>
      <p className="mt-4 text-muted-foreground">
        טופס צור קשר יוגדר עם העיצוב.
      </p>
    </div>
  );
}
