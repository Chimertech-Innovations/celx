'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function markNotificationRead(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')

  await prisma.notification.update({
    where: { id, userId: session.user.id },
    data: { isRead: true },
  })

  revalidatePath('/dashboard/author/notifications')
  return { success: true }
}

export async function markAllNotificationsRead() {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')

  await prisma.notification.updateMany({
    where: { userId: session.user.id, isRead: false },
    data: { isRead: true },
  })

  revalidatePath('/dashboard/author/notifications')
  return { success: true }
}
