'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { ServiceType } from '@prisma/client'

export async function createServiceOrder(data: {
  serviceType: string
  manuscriptTitle?: string
  description: string
  urgency: string
}) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')

  const order = await prisma.serviceOrder.create({
    data: {
      userId: session.user.id,
      serviceType: data.serviceType as ServiceType,
      manuscriptTitle: data.manuscriptTitle,
      description: data.description,
      urgency: data.urgency,
      status: 'REQUESTED',
    },
  })

  // Create notification
  await prisma.notification.create({
    data: {
      userId: session.user.id,
      title: 'Service Order Submitted',
      message: `Your request for ${data.serviceType.replace(/_/g, ' ')} has been submitted. We will send a quote shortly.`,
      category: 'SERVICE_ORDER',
      link: `/dashboard/author/services`,
    },
  })

  // Audit log
  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'SERVICE_ORDER_CREATED',
      entity: 'ServiceOrder',
      entityId: order.id,
      details: `Service order ${order.id} for ${data.serviceType} created`,
    },
  })

  revalidatePath('/dashboard/author/services')
  return { success: true, orderId: order.id }
}

export async function sendQuote(orderId: string, quoteAmount: number) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')
  if (!['SUPER_ADMIN', 'FINANCE_ADMIN', 'SERVICE_TEAM'].includes(session.user.role)) throw new Error('Unauthorized')

  const order = await prisma.serviceOrder.findUnique({ where: { id: orderId } })
  if (!order) throw new Error('Order not found')

  await prisma.serviceOrder.update({
    where: { id: orderId },
    data: {
      quoteAmount,
      status: 'QUOTE_SENT',
    },
  })

  // Notify customer
  await prisma.notification.create({
    data: {
      userId: order.userId,
      title: 'Quote Sent for Service Order',
      message: `A quote of $${quoteAmount} USD has been sent for your request. Settle it to begin the service.`,
      category: 'SERVICE_ORDER',
      link: `/dashboard/author/services`,
    },
  })

  revalidatePath('/dashboard/admin/services')
  return { success: true }
}

export async function approveQuoteAndGenerateInvoice(orderId: string) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')

  const order = await prisma.serviceOrder.findUnique({
    where: { id: orderId, userId: session.user.id },
  })
  if (!order || !order.quoteAmount) throw new Error('Order or quote not found')

  const count = await prisma.invoice.count()
  const invoiceNumber = `INV-SRV-${new Date().getFullYear()}-${String(count + 100).padStart(4, '0')}`

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      userId: session.user.id,
      serviceOrderId: orderId,
      amount: order.quoteAmount,
      taxAmount: 0,
      totalAmount: order.quoteAmount,
      status: 'PENDING',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.serviceOrder.update({
    where: { id: orderId },
    data: { status: 'PAYMENT_PENDING' },
  })

  revalidatePath('/dashboard/author/services')
  return { success: true }
}
