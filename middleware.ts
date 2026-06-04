import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public API routes that don't require authentication
const PUBLIC_API_PATTERNS = [
  /^\/api\/auth\//,
  /^\/api\/gear\/[^/]+$/, // GET /api/gear/[id]
];

// Public API routes (exact matches)
const PUBLIC_API_EXACT = new Set([
  "/api/gear",
  "/api/upgrades",
  "/api/marketplace/deals",
  "/api/external-reviews",
]);

function isPublicApiRoute(pathname: string, method: string): boolean {
  if (PUBLIC_API_EXACT.has(pathname) && method === "GET") return true;
  if (pathname.match(/^\/api\/profile\/[^/]+$/) && method === "GET") return true;
  if (PUBLIC_API_PATTERNS.some((pattern) => pattern.test(pathname))) return true;
  return false;
}

export default auth((request: NextRequest & { auth: unknown }) => {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const session = request.auth;

  // Protect API routes
  if (pathname.startsWith("/api/")) {
    if (!isPublicApiRoute(pathname, method) && !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Protect app routes — redirect to login if unauthenticated
  if (
    pathname.startsWith("/loadout") ||
    pathname.startsWith("/items") ||
    pathname.startsWith("/upgrades") ||
    pathname.startsWith("/marketplace") ||
    pathname.startsWith("/profile")
  ) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all API routes except Next.js internals
    "/api/((?!_next).*)",
    // Match protected app routes
    "/loadout/:path*",
    "/items/:path*",
    "/upgrades/:path*",
    "/marketplace/:path*",
    "/profile/:path*",
  ],
};
