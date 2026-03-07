import { routes } from "./routes";
import { withService } from "./withService";
import { createRateLimiter, getClientKey } from "../security/rate-limit";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const rateLimiter = createRateLimiter({ windowMs: 60_000, maxRequests: 5 });

function normalizePath(path: string): string {
  const withoutQuery = path.split("?")[0];
  return withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
}

export async function handle(
  request: NextRequest,
  path: string
): Promise<NextResponse> {
  const method = request.method as "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  const normalizedPath = normalizePath(path);

  const route = routes.find(
    (r) => r.method === method && r.path === normalizedPath
  );

  if (!route) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const now = Date.now();
  const clientKey = getClientKey(request.headers, request.ip ?? null);

  if (rateLimiter.isRateLimited(clientKey, now)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const handler = withService(route.service, route.schema);
  return handler(request);
}

export { routes } from "./routes";
