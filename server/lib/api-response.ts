import { NextResponse } from "next/server";

export function successResponse(
  data: unknown,
  status = 200,
  cacheControl?: string
): NextResponse {
  const response = NextResponse.json(data, { status });
  if (cacheControl) {
    response.headers.set("Cache-Control", cacheControl);
  }
  return response;
}

export function errorResponse(
  message: string,
  status = 500,
  details?: unknown
): NextResponse {
  return NextResponse.json(
    { error: message, ...(details ? { details } : {}) },
    { status }
  );
}
