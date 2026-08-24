import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Fallback origins if ALLOWED_ORIGINS env variable is not set
const DEFAULT_ALLOWED_ORIGINS = [
  "https://aplica.clamecac.lat",
  "https://aplica.calmecac.lat",
  "https://calmecac.lat",
  "https://app.youform.com",
  "http://localhost:3000",
];

function getCorsOrigin(requestOrigin: string | null): string {
  const envOrigins = process.env.ALLOWED_ORIGINS;
  const allowedOrigins = envOrigins
    ? envOrigins
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean)
    : DEFAULT_ALLOWED_ORIGINS;

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  // If no origin header or not in list, return first allowed origin or wildcard as fallback
  return allowedOrigins[0] || "*";
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const requestOrigin = request.headers.get("origin");

  const corsOrigin = getCorsOrigin(requestOrigin);

  // Handle CORS preflight OPTIONS request
  if (request.method === "OPTIONS") {
    const preflightResponse = new NextResponse(null, { status: 204 });
    preflightResponse.headers.set("Access-Control-Allow-Origin", corsOrigin);
    preflightResponse.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS"
    );
    preflightResponse.headers.set(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
    );
    preflightResponse.headers.set("Access-Control-Allow-Credentials", "true");
    preflightResponse.headers.set("Vary", "Origin");
    return preflightResponse;
  }

  let response: NextResponse;

  // Domain rewrite: If request comes from aplica.clamecac.lat or aplica.calmecac.lat, rewrite all paths to /aplica
  const isAplicaDomain =
    hostname.startsWith("aplica.") ||
    hostname.includes("aplica.clamecac.lat") ||
    hostname.includes("aplica.calmecac.lat");

  if (isAplicaDomain) {
    url.pathname = "/aplica";
    response = NextResponse.rewrite(url);
  } else {
    response = NextResponse.next();
  }

  // Inject dynamic CORS headers into response
  response.headers.set("Access-Control-Allow-Origin", corsOrigin);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Vary", "Origin");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and images
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
