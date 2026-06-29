import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { Receipt, CreditCard, CheckCircle, Clock } from 'lucide-react'

export default async function FinanceDashboard() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (!['FINANCE_ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) redirect('/dashboard')

  const [invoices, payments] = await Promise.all([
    prisma.invoice.findMany({
      include: {
        user: { select: { name: true, email: true } },
        manuscript: { select: { manuscriptId: true, title: true } },
        serviceOrder: { select: { serviceType: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.payment.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  const pendingAmount = invoices.filter(i => i.status === 'PENDING').reduce((acc, i) => acc + i.totalAmount, 0)
  const paidAmount = invoices.filter(i => i.status === 'PAID').reduce((acc, i) => acc + i.totalAmount, 0)
  const waiverAmount = invoices.filter(i => i.status === 'WAIVER_APPROVED').reduce((acc, i) => acc + i.totalAmount, 0)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Finance Dashboard</h1>
        <p className="text-slate-500 text-sm">Monitor APC fees, service payments, and invoices</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Paid', value: formatCurrency(paidAmount), color: 'text-green-600' },
          { label: 'Total Pending', value: formatCurrency(pendingAmount), color: 'text-amber-600' },
          { label: 'Waivers Approved', value: formatCurrency(waiverAmount), color: 'text-slate-500' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="pt-5">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices list */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Invoices</CardTitle></CardHeader>
            <CardContent className="p-0">
              {invoices.length === 0 ? (
                <div className="p-6 text-center text-slate-500">No invoices generated yet</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {invoices.map(inv => (
                    <div key={inv.id} className="p-4 flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-slate-500">{inv.invoiceNumber}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            inv.status === 'PAID' ? 'bg-green-100 text-green-700' :
                            inv.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>{inv.status}</span>
                        </div>
                        <div className="text-sm font-medium text-slate-900 truncate">
                          {inv.manuscript ? `APC: ${inv.manuscript.title}` : `Service Order: ${inv.serviceOrder?.serviceType}`}
                        </div>
                        <div className="text-xs text-slate-400">
                          {inv.user.name} · Due: {inv.dueDate ? formatDate(inv.dueDate) : 'N/A'}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-slate-900">{formatCurrency(inv.totalAmount)}</div>
                        <div className="text-xs text-slate-400">{inv.currency}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payments history */}
        <div>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Transactions</CardTitle></CardHeader>
            <CardContent className="p-0">
              {payments.length === 0 ? (
                <div className="p-6 text-center text-slate-500">No transactions recorded</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {payments.map(p => (
                    <div key={p.id} className="p-3 text-xs">
                      <div className="flex justify-between font-medium mb-0.5">
                        <span className="text-slate-800">{p.user.name}</span>
                        <span className="text-green-700">+{formatCurrency(p.amount)}</span>
                      </div>
                      <div className="text-slate-400">{p.paymentMethod || 'Card'} · {formatDate(p.createdAt)}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
