import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { PayButton } from '@/components/payments/PayButton'
import { CreditCard, Receipt } from 'lucide-react'

export const metadata = { title: 'Payments & Invoices' }

export default async function AuthorPaymentsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    include: {
      manuscript: { select: { title: true, manuscriptId: true } },
      serviceOrder: { select: { serviceType: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Payments & Invoices</h1>
        <p className="text-slate-500 text-sm">View your invoices and settle APC or editorial services fees</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-slate-600" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {invoices.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No invoices found for your account. Invoices are generated upon manuscript acceptance or service requests.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {invoices.map(inv => (
                <div key={inv.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs text-slate-500 font-medium">{inv.invoiceNumber}</span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                        inv.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>{inv.status}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {inv.manuscript ? `Article Processing Charge (APC)` : 'Editorial Service Fee'}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mb-1">
                      {inv.manuscript ? `Manuscript: ${inv.manuscript.title} (${inv.manuscript.manuscriptId})` : `Service: ${inv.serviceOrder?.serviceType}`}
                    </p>
                    <div className="text-xs text-slate-400">
                      Issued: {formatDate(inv.createdAt)} · Due: {inv.dueDate ? formatDate(inv.dueDate) : 'N/A'}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">{formatCurrency(inv.totalAmount)}</div>
                      <div className="text-xs text-slate-400">{inv.currency}</div>
                    </div>
                    {inv.status === 'PENDING' && (
                      <PayButton invoiceId={inv.id} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
