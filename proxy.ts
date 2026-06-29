import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'
import { NextResponse } from 'next/server'
import { getDashboardPath } from '@/lib/rbac'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl, auth: session } = req as typeof req & { auth: { user?: { role: string } } | null }
  const isLoggedIn = !!session?.user

  const isPublicRoute =
    nextUrl.pathname === '/' ||
    nextUrl.pathname.startsWith('/journals') ||
    nextUrl.pathname.startsWith('/articles') ||
    nextUrl.pathname.startsWith('/search') ||
    nextUrl.pathname.startsWith('/services') ||
    nextUrl.pathname.startsWith('/ethics') ||
    nextUrl.pathname.startsWith('/peer-review-policy') ||
    nextUrl.pathname.startsWith('/open-access') ||
    nextUrl.pathname.startsWith('/apc-fees') ||
    nextUrl.pathname.startsWith('/author-guidelines') ||
    nextUrl.pathname.startsWith('/reviewer-guidelines') ||
    nextUrl.pathname.startsWith('/about') ||
    nextUrl.pathname.startsWith('/contact') ||
    nextUrl.pathname === '/login' ||
    nextUrl.pathname === '/register' ||
    nextUrl.pathname.startsWith('/api/auth')

  const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard')

  // Redirect unauthenticated users from dashboard to login
  if (isDashboardRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', nextUrl.origin)
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users from login/register to their dashboard
  if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/register')) {
    const role = session?.user?.role as string
    const dashboardPath = getDashboardPath(role as Parameters<typeof getDashboardPath>[0])
    return NextResponse.redirect(new URL(dashboardPath, nextUrl.origin))
  }

  // Role-based dashboard protection
  if (isDashboardRoute && isLoggedIn) {
    const role = session?.user?.role as string
    const path = nextUrl.pathname

    const roleRouteMap: Record<string, string[]> = {
      AUTHOR: ['/dashboard/author'],
      SERVICE_CUSTOMER: ['/dashboard/author'],
      REVIEWER: ['/dashboard/reviewer'],
      EDITOR_IN_CHIEF: ['/dashboard/editor'],
      ASSOCIATE_EDITOR: ['/dashboard/editor'],
      EDITORIAL_OFFICE: ['/dashboard/office'],
      PRODUCTION_EDITOR: ['/dashboard/production'],
      FINANCE_ADMIN: ['/dashboard/finance'],
      JOURNAL_ADMIN: ['/dashboard/admin'],
      SUPER_ADMIN: ['/dashboard/admin', '/dashboard/author', '/dashboard/editor', '/dashboard/office', '/dashboard/production', '/dashboard/finance', '/dashboard/reviewer'],
      READER: [],
      SERVICE_TEAM: ['/dashboard/admin'],
    }

    const allowedPaths = roleRouteMap[role] || []
    const hasAccess = allowedPaths.some(allowed => path.startsWith(allowed))

    if (!hasAccess && path !== '/dashboard') {
      const dashboardPath = getDashboardPath(role as Parameters<typeof getDashboardPath>[0])
      return NextResponse.redirect(new URL(dashboardPath, nextUrl.origin))
    }

    // Redirect /dashboard root to role dashboard
    if (path === '/dashboard') {
      const dashboardPath = getDashboardPath(role as Parameters<typeof getDashboardPath>[0])
      return NextResponse.redirect(new URL(dashboardPath, nextUrl.origin))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}
