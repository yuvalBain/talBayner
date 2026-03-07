import type { ServiceResult } from "./routes/types";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { z } from "zod";

export function withService<TInput>(
  service: (data: TInput) => Promise<ServiceResult>,
  schema: z.ZodType<TInput>
): (request: NextRequest) => Promise<NextResponse> {
  return async (request: NextRequest): Promise<NextResponse> => {
    let payload: unknown;

    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const parsed = schema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }

    const result = await service(parsed.data);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "server check complete" },
      { status: 200 }
    );
  };
}
