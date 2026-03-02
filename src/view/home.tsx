"use client";
import { Button } from "@/components/ui/atom/button";
import { HTMLAttributes } from "react";

export type HomeData = {};
type HomeProps = HTMLAttributes<HTMLDivElement> & HomeData;

export const HomeView: React.FC<HomeProps> = ({
  className,
  children,
  ...props
}) => (
  <div className="mx-auto max-w-6xl px-4 py-12">
    <h1 className="text-3xl font-semibold text-foreground">דף הבית</h1>

    <p className="mt-4 text-muted-foreground">
      שלד האתר – תוכן ועיצוב יוגדרו בהמשך.
    </p>

    <div className="flex gap-2">
      <Button role="submit">Submot</Button>
      <Button
        variant="ghost"
        disabled
        onClick={() => alert("This button is disabled")}
      >
        click here
      </Button>
    </div>
  </div>
);