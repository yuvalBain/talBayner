import type { Metadata } from "next";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "פרויקטים",
  description: `פרויקטים – ${SITE_NAME}`,
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">פרויקטים</h1>
      <p className="mt-4 text-muted-foreground">תוכן יוגדר בהמשך.</p>
    </div>
  );
}
