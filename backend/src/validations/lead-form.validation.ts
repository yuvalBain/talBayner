import { z } from "zod";

// TODO: add dynamic validation for the form based on the form fields
// Note: React escapes JSX by default (XSS mitigation). No sanitize transform needed for display.
export const leadFormSchema = z.object({
  name: z.string().min(1, "שם הוא שדה חובה").max(100, "השם ארוך מדי"),
  tel: z
    .string()
    .min(7, "מספר הטלפון קצר מדי")
    .max(20, "מספר הטלפון ארוך מדי"),
  email: z.string().email("כתובת אימייל לא תקינה").transform((s) => s.toLowerCase()),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
