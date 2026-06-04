import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { Session } from "next-auth";

type AuthedHandler = (
  request: Request,
  context: {
    session: Session & { user: { id: string } };
    params: Promise<Record<string, string>>;
  }
) => Promise<NextResponse>;

type RouteHandler = (
  request: Request,
  context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

export function withAuth(handler: AuthedHandler): RouteHandler {
  return async (request, context) => {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return handler(request, {
      session: session as Session & { user: { id: string } },
      params: context.params,
    });
  };
}
