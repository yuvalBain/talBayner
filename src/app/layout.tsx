import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { TopLoaderProvider } from "@/components/layout/top-loader-provider";
import { BASE_URL, SITE_DESCRIPTION, SITE_NAME } from "@/constants/site";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { cookies } from "next/headers";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";

  return (
    <html lang="he" dir="rtl" data-theme={theme}>
      <head>
        <title>TODO</title>
      </head>
      <body className={`min-h-screen antialiased `}>
        <ThemeProvider themeIn={theme}>
          <TopLoaderProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />

              <main
                className="flex-1 bg-background px-4"
                id="main-content"
                role="main"
              >
                {children}
              </main>

              <Footer />
            </div>
          </TopLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}