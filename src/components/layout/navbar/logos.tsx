import { useTheme } from "@/components/layout/ThemeProvider";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import React, { type HTMLAttributes } from 'react';


const ICON_PATH = "http://localhost:3000/assets/icons/display-icons";

type LogosProps = HTMLAttributes<HTMLDivElement>;

type logosObject = {
    src: string;
    alt: string;
};

const LOGOS: logosObject[] = [
    {src: "/logo.svg", alt: "לוגו"},
    {src: "/postertubeLogo.svg", alt: "פוסטר טיוב"},
    {src: "/theDesigner.svg", alt: "המעצב"},
];

const Logos: React.FC = ({className, children, ...props}: LogosProps) => {

    const  isDarkMode = useTheme().theme == "dark" ;


    return     <Link
        href={ROUTES.home}
        className="flex shrink-0 items-center gap-6"
        aria-label="דף הבית"
    >
        {LOGOS?.map(({src, alt}, i) => (
            <Image
                key={i}
                src={`${ICON_PATH}${src}`}
                alt={alt}
                width={32}
                height={32}
                className={cn("h-8 w-auto "  , isDarkMode ? "invert" : "")}

            />
        ))}
    </Link>
    ;
};

export { Logos, type LogosProps };