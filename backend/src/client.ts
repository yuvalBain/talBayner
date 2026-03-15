/**
 * Client-safe exports only (validations, types).
 * Use this from frontend Client Components to avoid pulling in Node-only modules (e.g. dns/promises).
 */
export {
  leadFormSchema,
  type LeadFormValues,
} from "./validations/lead-form.validation";
