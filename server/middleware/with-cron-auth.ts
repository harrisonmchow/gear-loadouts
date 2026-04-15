import { NextResponse } from "next/server";

type RouteHandler = (
  request: Request,
  context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

export function withCronAuth(handler: RouteHandler): RouteHandler {
  return async (request, context) => {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In production on Vercel, also check the x-vercel-cron header
    const isVercel = process.env.VERCEL === "1";
    if (isVercel && !request.headers.get("x-vercel-cron")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(request, context);
  };
}
