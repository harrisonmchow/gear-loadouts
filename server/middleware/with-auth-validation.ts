import { NextResponse } from "next/server";
import type { ZodSchema, z } from "zod";
import { auth } from "@/lib/auth";
import type { Session } from "next-auth";
import { sanitizeStrings } from "@server/lib/sanitize";

type AuthValidatedHandler<T> = (
  request: Request,
  context: {
    session: Session & { user: { id: string } };
    data: T;
    params: Promise<Record<string, string>>;
  }
) => Promise<NextResponse>;

type RouteHandler = (
  request: Request,
  context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

/**
 * Combined auth + validation middleware.
 * Use this instead of nesting withAuth(withValidation(...)) — the separate
 * HOFs can't be composed with full type safety.
 */
export function withAuthAndValidation<S extends ZodSchema>(
  schema: S,
  handler: AuthValidatedHandler<z.infer<S>>
): RouteHandler {
  return async (request, context) => {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    return handler(request, {
      session: session as Session & { user: { id: string } },
      data: sanitized,
      params: context.params,
    });
  };
}
