'use client';

import type { FC, ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";

type TopLoaderProviderProps = {
  children?: ReactNode;
};

export const TopLoaderProvider: FC<TopLoaderProviderProps> = ({ children }) => {
  return (
    <>
      <NextTopLoader
        color="var(--primary)"
        initialPosition={0.08}
        crawlSpeed={120}
        height={3}
        crawl
        showSpinner={false}
      />
      {children}
    </>
  );
};

