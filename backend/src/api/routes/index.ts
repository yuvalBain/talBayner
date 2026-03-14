import { createLead } from "../../services/create-lead";
import { leadFormSchema } from "../../validations/lead-form.validation";
import type { Route } from "./types";

export const routes: Route[] = [
  {
    path: "/create-lead",
    method: "POST",
    schema: leadFormSchema,
    service: createLead,
  },
];