import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatDateShort } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { Button } from '@/components/ui/button'
import { NotificationList } from '@/components/notifications/NotificationList'
import { Bell } from 'lucide-react'

export const metadata = { title: 'Notifications' }

export default async function NotificationsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 text-sm">Stay up-to-date with your manuscript status and reviews</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-600" />
            Inbox
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <NotificationList initialNotifications={notifications.map(n => ({
            id: n.id,
            title: n.title,
            message: n.message,
            category: n.category,
            isRead: n.isRead,
            link: n.link,
            createdAt: n.createdAt.toISOString()
          }))} />
        </CardContent>
      </Card>
    </div>
  )
}
