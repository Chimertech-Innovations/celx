'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { markNotificationRead, markAllNotificationsRead } from '@/app/actions/notifications'
import { Check, CheckCheck, BellOff } from 'lucide-react'
import { formatDateShort } from '@/lib/utils'

interface Notification {
  id: string
  title: string
  message: string
  category: string
  isRead: boolean
  link: string | null
  createdAt: string
}

export function NotificationList({ initialNotifications }: { initialNotifications: Notification[] }) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [isLoading, setIsLoading] = useState(false)

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleMarkRead = async (id: string) => {
    try {
      await markNotificationRead(id)
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      )
      router.refresh()
    } catch (e) {
      alert(String(e))
    }
  }

  const handleMarkAllRead = async () => {
    setIsLoading(true)
    try {
      await markAllNotificationsRead()
      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      )
      router.refresh()
    } catch (e) {
      alert(String(e))
    } finally {
      setIsLoading(false)
    }
  }

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
        <BellOff className="w-10 h-10 text-slate-400" />
        <p>No notifications found.</p>
      </div>
    )
  }

  return (
    <div>
      {unreadCount > 0 && (
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <span className="text-sm text-slate-600 font-medium">{unreadCount} unread notification(s)</span>
          <Button size="sm" variant="outline" onClick={handleMarkAllRead} isLoading={isLoading}>
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </Button>
        </div>
      )}

      <div className="divide-y divide-slate-100">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`p-4 flex items-start gap-4 transition-colors ${
              n.isRead ? 'opacity-70 bg-white' : 'bg-blue-50/30 font-medium'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-navy-50 text-navy-700">
                  {n.category.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-slate-400">{formatDateShort(new Date(n.createdAt))}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900">{n.title}</h4>
              <p className="text-sm text-slate-600 mt-0.5">{n.message}</p>
              {n.link && (
                <Link
                  href={n.link}
                  className="inline-block text-xs font-semibold text-navy-700 hover:underline mt-2"
                >
                  View Details
                </Link>
              )}
            </div>
            {!n.isRead && (
              <button
                onClick={() => handleMarkRead(n.id)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
                title="Mark as read"
              >
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
