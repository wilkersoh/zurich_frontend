import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

const protectedRoutes: string[] = ["/users"];

export default auth((req: NextRequest) => {
  const isLoggedIn: boolean = !!(req as unknown as { auth: boolean }).auth;
  const isProtectedRoute: boolean = protectedRoutes.some((route: string) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
});
