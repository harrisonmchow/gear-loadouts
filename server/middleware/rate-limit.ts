import { NextResponse } from "next/server";

interface RateLimitOptions {
  /** Max requests per window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
  /** Key extractor: returns a string identifying the caller */
  keyFn: (request: Request) => string;
}

interface WindowEntry {
  count: number;
  resetAt: number;
}

// In-memory store — per-instance on serverless. Sufficient for abuse deterrence;
// swap for Upstash Redis for true cross-instance rate limiting in production.
const store = new Map<string, WindowEntry>();

function getKey(request: Request, prefix: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return `${prefix}:${ip}`;
}

export function withRateLimit(
  options: RateLimitOptions,
  handler: (
    request: Request,
    context: { params: Promise<Record<string, string>> }
  ) => Promise<NextResponse>
): (
  request: Request,
  context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse> {
  return async (request, context) => {
    const key = options.keyFn(request);
    const now = Date.now();

    const entry = store.get(key);
    if (!entry || entry.resetAt <= now) {
      store.set(key, { count: 1, resetAt: now + options.windowMs });
    } else {
      entry.count += 1;
      if (entry.count > options.limit) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        return NextResponse.json(
          { error: "Too many requests" },
          {
            status: 429,
            headers: { "Retry-After": String(retryAfter) },
          }
        );
      }
    }

    return handler(request, context);
  };
}

/** Pre-built limiters for common endpoints */
export const signupRateLimit = (
  handler: (
    request: Request,
    context: { params: Promise<Record<string, string>> }
  ) => Promise<NextResponse>
) =>
  withRateLimit(
    {
      limit: 5,
      windowMs: 60_000,
      keyFn: (req) => getKey(req, "signup"),
    },
    handler
  );

export const reviewRateLimit = (
  handler: (
    request: Request,
    context: { params: Promise<Record<string, string>> }
  ) => Promise<NextResponse>
) =>
  withRateLimit(
    {
      limit: 10,
      windowMs: 60_000,
      keyFn: (req) => getKey(req, "review"),
    },
    handler
  );

export const subscribeRateLimit = (
  handler: (
    request: Request,
    context: { params: Promise<Record<string, string>> }
  ) => Promise<NextResponse>
) =>
  withRateLimit(
    {
      limit: 5,
      windowMs: 60_000,
      keyFn: (req) => getKey(req, "subscribe"),
    },
    handler
  );
