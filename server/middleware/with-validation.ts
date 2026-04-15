import { NextResponse } from "next/server";
import type { ZodSchema, z } from "zod";
import { sanitizeStrings } from "@server/lib/sanitize";

type ValidatedHandler<T> = (
  request: Request,
  context: {
    data: T;
    params: Promise<Record<string, string>>;
  }
) => Promise<NextResponse>;

type RouteHandler = (
  request: Request,
  context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

export function withValidation<S extends ZodSchema>(
  schema: S,
  handler: ValidatedHandler<z.infer<S>>
): RouteHandler {
  return async (request, context) => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const sanitized = sanitizeStrings(result.data) as z.infer<S>;

    return handler(request, { data: sanitized, params: context.params });
  };
}
