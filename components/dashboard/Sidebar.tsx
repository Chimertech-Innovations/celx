'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  BookOpen, LayoutDashboard, FileText, Users, Search, Bell,
  Settings, LogOut, ChevronDown, PlusCircle, CreditCard,
  ShoppingBag, MessageSquare, User, ClipboardList, Award,
  CheckSquare, Send, BarChart3, DollarSign, Receipt,
  Package, Shield, Megaphone, Globe,
} from 'lucide-react'

const navConfig = {
  AUTHOR: [
    { label: 'Dashboard', href: '/dashboard/author', icon: LayoutDashboard },
    { label: 'New Submission', href: '/dashboard/author/submit', icon: PlusCircle },
    { label: 'My Manuscripts', href: '/dashboard/author/manuscripts', icon: FileText },
    { label: 'Revisions', href: '/dashboard/author/revisions', icon: ClipboardList },
    { label: 'Published Articles', href: '/dashboard/author/published', icon: Award },
    { label: 'Payments & Invoices', href: '/dashboard/author/payments', icon: CreditCard },
    { label: 'Services', href: '/dashboard/author/services', icon: ShoppingBag },
    { label: 'Profile', href: '/dashboard/author/profile', icon: User },
  ],
  REVIEWER: [
    { label: 'Dashboard', href: '/dashboard/reviewer', icon: LayoutDashboard },
    { label: 'Invitations', href: '/dashboard/reviewer/invitations', icon: Bell },
    { label: 'My Reviews', href: '/dashboard/reviewer/reviews', icon: CheckSquare },
    { label: 'Profile', href: '/dashboard/reviewer/profile', icon: User },
  ],
  EDITOR_IN_CHIEF: [
    { label: 'Dashboard', href: '/dashboard/editor', icon: LayoutDashboard },
    { label: 'Manuscripts', href: '/dashboard/editor/manuscripts', icon: FileText },
    { label: 'Reviewer Pool', href: '/dashboard/editor/reviewers', icon: Users },
  ],
  ASSOCIATE_EDITOR: [
    { label: 'Dashboard', href: '/dashboard/editor', icon: LayoutDashboard },
    { label: 'Manuscripts', href: '/dashboard/editor/manuscripts', icon: FileText },
  ],
  EDITORIAL_OFFICE: [
    { label: 'Dashboard', href: '/dashboard/office', icon: LayoutDashboard },
    { label: 'Technical Check', href: '/dashboard/office/manuscripts', icon: CheckSquare },
  ],
  PRODUCTION_EDITOR: [
    { label: 'Dashboard', href: '/dashboard/production', icon: LayoutDashboard },
    { label: 'Accepted Manuscripts', href: '/dashboard/production/manuscripts', icon: FileText },
  ],
  FINANCE_ADMIN: [
    { label: 'Dashboard', href: '/dashboard/finance', icon: LayoutDashboard },
    { label: 'Invoices', href: '/dashboard/finance/invoices', icon: Receipt },
    { label: 'Service Orders', href: '/dashboard/finance/services', icon: ShoppingBag },
  ],
  SUPER_ADMIN: [
    { label: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Users', href: '/dashboard/admin/users', icon: Users },
    { label: 'Journals', href: '/dashboard/admin/journals', icon: BookOpen },
    { label: 'Manuscripts', href: '/dashboard/admin/manuscripts', icon: FileText },
    { label: 'Articles', href: '/dashboard/admin/articles', icon: Globe },
    { label: 'Services', href: '/dashboard/admin/services', icon: ShoppingBag },
    { label: 'Payments', href: '/dashboard/admin/payments', icon: DollarSign },
    { label: 'Announcements', href: '/dashboard/admin/announcements', icon: Megaphone },
    { label: 'CMS Pages', href: '/dashboard/admin/cms', icon: Package },
    { label: 'Audit Log', href: '/dashboard/admin/audit', icon: Shield },
  ],
  JOURNAL_ADMIN: [
    { label: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Journals', href: '/dashboard/admin/journals', icon: BookOpen },
    { label: 'Articles', href: '/dashboard/admin/articles', icon: Globe },
  ],
  SERVICE_CUSTOMER: [
    { label: 'Dashboard', href: '/dashboard/author', icon: LayoutDashboard },
    { label: 'My Services', href: '/dashboard/author/services', icon: ShoppingBag },
    { label: 'Invoices', href: '/dashboard/author/payments', icon: CreditCard },
  ],
  SERVICE_TEAM: [
    { label: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Service Orders', href: '/dashboard/admin/services', icon: ShoppingBag },
  ],
  READER: [],
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = session?.user?.role as keyof typeof navConfig || 'AUTHOR'
  const navItems = navConfig[role] || navConfig.AUTHOR

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-navy-900 leading-none">CleX</div>
            <div className="text-xs text-slate-500">Publishing</div>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-sm shrink-0">
            {session?.user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-slate-900 truncate">{session?.user?.name}</div>
            <div className="text-xs text-slate-500 truncate">{role.replace(/_/g, ' ')}</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/dashboard/author' && item.href !== '/dashboard/admin' && item.href !== '/dashboard/editor' && item.href !== '/dashboard/office' && item.href !== '/dashboard/production' && item.href !== '/dashboard/finance' && item.href !== '/dashboard/reviewer' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-navy-50 text-navy-800 border-r-2 border-navy-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-slate-200 space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <Globe className="w-4 h-4" />
          Public Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
