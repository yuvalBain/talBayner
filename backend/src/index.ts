import { handle } from "./api/router";
import type { NextRequest } from "next/server";

export { handle, routes } from "./api/router";
export type { Method, Route, ServiceResult } from "./api/routes/types";
export { createRateLimiter, getClientKey } from "./security/rate-limit";
export { isUrlAllowed } from "./security/ssrf";
export { createLead } from "./services/create-lead";
export {
  leadFormSchema,
  type LeadFormValues,
} from "./validations/lead-form.validation";

export const POST = (request: NextRequest) => handle(request, "/create-lead");
