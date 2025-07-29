import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value

  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")

  if (!token && !isAuthPage && request.nextUrl.pathname !== "/posts") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/posts", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/posts/:path*", "/dashboard/:path*", "/profile/:path*", "/login", "/register"],
}
