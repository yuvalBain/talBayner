import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(1, "שם הוא שדה חובה").max(100, "השם ארוך מדי"),
  tel: z
    .string()
    .min(7, "מספר הטלפון קצר מדי")
    .max(20, "מספר הטלפון ארוך מדי"),
  email: z.string().email("כתובת אימייל לא תקינה"),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

