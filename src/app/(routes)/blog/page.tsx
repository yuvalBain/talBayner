import type { Metadata } from "next";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "בלוג",
  description: `בלוג – ${SITE_NAME}`,
};

/**
 * Blog page shell – structure only.
 */
export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">
        בלוג
      </h1>
      <p className="mt-4 text-muted-foreground">
        רשימת פוסטים תתווסף בשלב הפונקציונליות.
      </p>
    </div>
  );
}
