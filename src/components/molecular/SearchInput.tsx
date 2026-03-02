import type { FC, InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/atom/input";

type SearchInputVariant = "filled" | "outline";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: SearchInputVariant;
};

const variantMap: Record<SearchInputVariant, "filled" | "outline"> = {
  filled: "filled",
  outline: "outline",
};

export const SearchInput: FC<SearchInputProps> = ({
  className,
  variant = "outline",
  ...props
}) => {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-base-secondary after:content-['search']" />
      <Input
        type="search"
        variant={variantMap[variant]}
        className="pl-16 pr-3"
        {...props}
      />
    </div>
  );
};

