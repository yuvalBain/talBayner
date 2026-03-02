import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants/site";
import { HomeView } from "@/view/home";
export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

/**
 * Home page shell – structure only. No functionality yet.
 */
export default function HomePage() {


  return (
   <HomeView /> 
  );
}