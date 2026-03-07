import type { z } from "zod";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ServiceResult =
  | { success: true }
  | { success: false; error: string };

export type Route<TInput = unknown> = {
  path: string;
  method: Method;
  schema: z.ZodType<TInput>;
  service: (data: TInput) => Promise<ServiceResult>;
};
