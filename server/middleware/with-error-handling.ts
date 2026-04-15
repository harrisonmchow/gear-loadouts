import { NextResponse } from "next/server";
import { AppError } from "@server/lib/errors";

type RouteHandler = (
  request: Request,
  context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (err) {
      if (err instanceof AppError) {
        return NextResponse.json(
          { error: err.message },
          { status: err.statusCode }
        );
      }
      console.error("[API Error]", err);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
