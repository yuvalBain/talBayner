/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

// env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    // add other env vars you use here, e.g.:
    // NEXT_PUBLIC_API_KEY: string;
  }
}