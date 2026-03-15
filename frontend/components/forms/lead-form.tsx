"use client";

import { Button } from "@/components/ui/atom/button";
import { Input } from "@/components/ui/atom/input";
import { Form, type FormSubmitResult } from "@/ui/atom/form";
import { leadFormSchema, type LeadFormValues } from "@talbayner/backend";
import { ChangeEvent, type FC, type FormHTMLAttributes, useState } from "react";

type LeadFormProps = FormHTMLAttributes<HTMLFormElement>;

type FieldErrors = Partial<Record<keyof LeadFormValues, string>>;

export const LeadForm: FC<LeadFormProps> = ({
  className,
  onSubmit: _onSubmit,
  ...props
}) => {
  const [values, setValues] = useState<LeadFormValues>({
    name: "",
    tel: "",
    email: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange =
    (field: keyof LeadFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    };



  const handleSubmit:(values: {
    name: string;
    tel: string;
    email: string;
  }) => FormSubmitResult | Promise<FormSubmitResult> = async  (
    currentValues: LeadFormValues
  ): Promise<FormSubmitResult>  => {
    const parsed = leadFormSchema.safeParse(currentValues);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};

      parsed.error.issues.forEach((issue) => {
        const pathKey = issue.path[0];
        if (typeof pathKey === "string" && !(pathKey in nextErrors)) {
          nextErrors[pathKey as keyof LeadFormValues] = issue.message;
        }
      });

      setFieldErrors(nextErrors);

      return { ok: false }
    }

    try {
      //TODO :  fix api calls - what we do till now -  we had the function call on the elementHTML then he send the function to hook or function that deal with the call and then its sending to a store (like mobx) and the store will call to the
      // api folder, from there it will send to the backend route and there to the controller, the controller do the service and then we get all the response back to the front
      const response = await fetch("/api/create-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      if (response.status === 429) {
        return {
          ok: false,
          message: "בוצעו יותר מדי ניסיונות. נסה שוב בעוד דקה.",
        };
      }

      if (!response.ok) {
        return {
          ok: false,
          message: "אירעה שגיאה בשליחת הטופס. נסה שוב מאוחר יותר.",
        };
      }

      const data = (await response.json()) as { message?: string };
      setValues({
        name: "",
        tel: "",
        email: "",
      });
      setFieldErrors({});

      return {
        ok: true,
        message: data.message ?? "הטופס נשלח בהצלחה. נחזור אליך בהקדם.",
      };
    } catch {
      return {
        ok: false,
        message: "אירעה שגיאה בשליחת הטופס. נסה שוב מאוחר יותר.",
      };
    }
  };

  return (
    <Form<LeadFormValues>
      className={className}
      values={values}
      onSubmit={handleSubmit}
      {...props}
    >
      {({ isSubmitting, statusMessage }) => (
        <>
          <div className="grid gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              שם מלא
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={handleChange("name")}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            {fieldErrors.name ? (
              <p id="name-error" className="text-xs text-destructive">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <label
              htmlFor="tel"
              className="text-sm font-medium text-foreground"
            >
              טלפון
            </label>
            <Input
              id="tel"
              name="tel"
              type="tel"
              autoComplete="tel"
              value={values.tel}
              onChange={handleChange("tel")}
              aria-invalid={Boolean(fieldErrors.tel)}
              aria-describedby={fieldErrors.tel ? "tel-error" : undefined}
            />
            {fieldErrors.tel ? (
              <p id="tel-error" className="text-xs text-destructive">
                {fieldErrors.tel}
              </p>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              אימייל
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange("email")}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email ? (
              <p id="email-error" className="text-xs text-destructive">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "שולח..." : "שלח"}
            </Button>
            {statusMessage ? (
              <p className="text-sm text-muted-foreground">{statusMessage}</p>
            ) : null}
          </div>
        </>
      )}
    </Form>
  );
};