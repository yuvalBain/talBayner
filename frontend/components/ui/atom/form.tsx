"use client";

import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { FormHTMLAttributes, ReactNode } from "react";
import { type ForwardedRef, forwardRef, useState } from "react";

const formVariants = cva("", {
  variants: {},
});

type FormVariants = VariantProps<typeof formVariants>;

export type FormStatus = {
  isSubmitting: boolean;
  statusMessage: string | null;
};

export type FormSubmitResult = {
  ok: boolean;
  message?: string;
};

export type FormProps<TValues> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit" | "children"
> &
  FormVariants & {
    values: TValues;
    onSubmit: (
      values: TValues
    ) => Promise<FormSubmitResult > | FormSubmitResult ;
    children: (status: FormStatus) => ReactNode;
  };

const InnerForm = <TValues,>(
  { className, values, onSubmit, children, ...props }: FormProps<TValues>,
  ref: ForwardedRef<HTMLFormElement>
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit: FormHTMLAttributes<HTMLFormElement>["onSubmit"] = async (
    event
  ) => {
    event?.preventDefault();
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      const result = await onSubmit(values);

      if (result && "ok" in result && result.message) {
        setStatusMessage(result.message);
      }
    } catch {
      setStatusMessage("אירעה שגיאה בלתי צפויה. נסה שוב מאוחר יותר.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={ref}
      className={cn("mt-8 grid gap-6 max-w-lg", formVariants(), className)}
      onSubmit={handleSubmit}
      method="post"
      {...props}
    >
      {children({
        isSubmitting,
        statusMessage,
      })}
    </form>
  );
};

const Form = forwardRef(InnerForm) as <TValues,>(
  props: FormProps<TValues> & { ref?: ForwardedRef<HTMLFormElement> }
) => ReactNode;

export { Form };