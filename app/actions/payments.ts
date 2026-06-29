'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function simulatePayment(invoiceId: string, paymentMethod: string) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId, userId: session.user.id },
  })
  if (!invoice) throw new Error('Invoice not found')

  if (invoice.status === 'PAID') throw new Error('Invoice already paid')

  // Create payment record
  const transactionId = `TXN-${Date.now().toString().slice(-8)}`
  await prisma.payment.create({
    data: {
      userId: session.user.id,
      invoiceId,
      amount: invoice.totalAmount,
      currency: invoice.currency,
      status: 'PAID',
      paymentMethod,
      transactionId,
      paidAt: new Date(),
    },
  })

  // Update invoice status
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      status: 'PAID',
      paidAt: new Date(),
    },
  })

  // If APC payment, update manuscript status
  if (invoice.manuscriptId) {
    await prisma.manuscript.update({
      where: { id: invoice.manuscriptId },
      data: { status: 'IN_PRODUCTION' },
    })

    // Create notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: 'Payment Received',
        message: `Your APC payment for invoice ${invoice.invoiceNumber} has been received. Your manuscript has moved to production.`,
        category: 'INVOICE',
        link: `/dashboard/author/manuscripts/${invoice.manuscriptId}`,
      },
    })
  }

  // Audit log
  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'PAYMENT_COMPLETED',
      entity: 'Invoice',
      entityId: invoiceId,
      details: `Paid amount ${invoice.totalAmount} ${invoice.currency}`,
    },
  })

  revalidatePath('/dashboard/author/payments')
  return { success: true }
}
