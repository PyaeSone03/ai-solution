import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Define protected routes (only staff-restricted routes)
const restrictedRoutes = ["/office/management"];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value || req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!token) {
    console.log("🚨 No Token Found, Redirecting to Login");
    return NextResponse.redirect(new URL("/front/login", req.url));
  }

  try {
    // ✅ Decode JWT Token safely
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

    console.log("🔹 Decoded Token:", payload);

    const role = payload.role;

    // ✅ Restrict staff from accessing management
    if (role === "staff" && restrictedRoutes.includes(req.nextUrl.pathname)) {
      console.log("🚨 Staff Not Allowed:", req.nextUrl.pathname);
      return NextResponse.redirect(new URL("/office", req.url)); // Redirect to a safe page
    }
  } catch (error) {
    console.error("🚨 Error decoding JWT:", error);
    return NextResponse.redirect(new URL("/front/login", req.url)); // Redirect on error
  }

  return NextResponse.next();
}

// ✅ Apply Middleware to Protected Routes
export const config = {
  matcher: ["/office/:path*"], // ✅ Protect entire `/office/` section
};
