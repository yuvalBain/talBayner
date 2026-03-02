import { useTheme } from "@/components/layout/theme-provider";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import type { FC, HTMLAttributes } from "react";

const ICON_PATH = "http://localhost:3000/assets/icons/display-icons";

type LogosProps = HTMLAttributes<HTMLDivElement>;

type LogosObject = {
  src: string;
  alt: string;
};

const LOGOS: LogosObject[] = [
  { src: "/logo.svg", alt: "לוגו" },
  { src: "/postertubeLogo.svg", alt: "פוסטר טיוב" },
  { src: "/theDesigner.svg", alt: "המעצב" },
];

const Logos: FC<LogosProps> = ({ className, children, ...props }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  //TODO :  will need to fix it in other way... maybe nextjs will know how to deal with that  w-[260px]
  return (
    <Link
      href={ROUTES.home}
      className={cn("flex shrink-0 items-center gap-6 w-[260px]", className)}
      aria-label="דף הבית"
      {...props}
    >
      {LOGOS.map(({ src, alt }, index) => (
        <Image
          key={index}
          src={`${ICON_PATH}${src}`}
          alt={alt}
          width={32}
          height={32}
          className={cn("h-8 w-auto", isDarkMode && "invert")}
        />
      ))}
    </Link>
  );
};

export { Logos, type LogosProps };