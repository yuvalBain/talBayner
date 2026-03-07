"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { forwardRef, type MouseEvent, type ReactNode } from "react";

const imageVariants = cva(
  "overflow-hidden rounded-md flex flex-col items-center justify-center transition-transform [&_img]:h-auto [&_img]:w-full [&_img]:object-cover",
  {
    variants: {
      variant: {
        filled: "bg-base-secondary border border-base-subtle",
        outline: "bg-background border border-base-accent",
      },
      withHoverZoom: {
        true: "group [&_img]:transition-transform [&_img]:group-hover:scale-[1.03]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "filled",
      withHoverZoom: false,
    },
  }
);

export interface ImageProps
  extends
    Omit<NextImageProps, "className">,
    VariantProps<typeof imageVariants> {
  className?: string;
  caption?: ReactNode;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const Image = forwardRef<HTMLElement, ImageProps>(
  (
    {
      className,
      variant,
      withHoverZoom,
      caption,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = disabled ? undefined : onClick;

    return (
      <figure
        ref={ref}
        className={cn(imageVariants({ variant, withHoverZoom, className }))}
        onClick={handleClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
        aria-disabled={onClick ? disabled : undefined}
      >
        <NextImage
          {...props}
          className={cn(withHoverZoom && "group-hover:scale-[1.03]")}
        />
        {caption ? (
          <figcaption className="w-full px-3 py-2 text-xs text-base-secondary">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }
);
Image.displayName = "Image";

export { Image, imageVariants };