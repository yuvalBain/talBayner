import type { LeadFormValues } from "../validations/lead-form.validation";

export type CreateLeadResult =
  | { success: true }
  | { success: false; error: string };

export const createLead = async (
  _data: LeadFormValues
): Promise<CreateLeadResult> => {
  // TODO: Connect to database and store validated data
  // Example (use parameterized queries only):
  // await db.lead.create({ data: { name, tel, email } });
  return { success: true };
};
