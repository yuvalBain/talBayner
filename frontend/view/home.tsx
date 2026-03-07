"use client";

import type { FC, HTMLAttributes } from "react";

export type HomeData = {};
type HomeProps = HTMLAttributes<HTMLDivElement> & HomeData;

export const HomeView: FC<HomeProps> = ({ className, ...props }) => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12" {...props}>
      דף הבית
    </div>
  );
};