import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  const isAuthenticated = !!session

  // Define protected routes
  const protectedRoutes = [
    "/dashboard",
    "/floral-marketplace",
    "/vendor-coordination",
    "/mood-board",
    "/tented-venues",
    "/transaction",
  ]

  // Define auth routes (login, signup, etc.)
  const authRoutes = ["/login", "/onboarding", "/reset-password"]

  const path = req.nextUrl.pathname

  // Check if the route is protected and the user is not authenticated
  if (protectedRoutes.some((route) => path.startsWith(route)) && !isAuthenticated) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is authenticated and trying to access auth routes, redirect to dashboard
  if (authRoutes.includes(path) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/floral-marketplace/:path*",
    "/vendor-coordination/:path*",
    "/mood-board/:path*",
    "/tented-venues/:path*",
    "/transaction/:path*",
    "/login",
    "/onboarding",
    "/reset-password",
  ],
}
