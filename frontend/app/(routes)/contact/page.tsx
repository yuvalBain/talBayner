import { SITE_NAME } from "@/constants/site";
import { ContactUs } from "@/view/contact-us";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "צור קשר",
  description: `צור קשר – ${SITE_NAME}`,
};

/**
 * Contact page shell – structure only. Form and logic in Phase 3.
 */
export default function ContactPage() {
  return <ContactUs />;
}