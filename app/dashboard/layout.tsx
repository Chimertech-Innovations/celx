import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardSidebar } from '@/components/dashboard/Sidebar'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const unreadCount = await prisma.notification.count({
    where: { userId: session.user.id, isRead: false },
  })

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard header */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="text-sm text-slate-500">
            Welcome back, <span className="font-medium text-slate-900">{session.user.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/author/notifications" className="relative p-2 rounded-md hover:bg-slate-100 text-slate-600">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
