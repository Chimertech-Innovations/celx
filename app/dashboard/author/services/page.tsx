import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getServiceTypeLabel, formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { ServiceOrderForm } from '@/components/services/ServiceOrderForm'
import { QuoteAction } from '@/components/services/QuoteAction'
import { ShoppingBag, PlusCircle, HelpCircle } from 'lucide-react'

export const metadata = { title: 'Author Services Portal' }

export default async function AuthorServicesDashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const orders = await prisma.serviceOrder.findMany({
    where: { userId: session.user.id },
    include: { invoices: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Author Services</h1>
        <p className="text-slate-500 text-sm">Request professional editing, formatting, or figures design for your manuscripts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: new order form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader><CardTitle>Request a Service</CardTitle></CardHeader>
            <CardContent>
              <ServiceOrderForm />
            </CardContent>
          </Card>
        </div>

        {/* Right: existing orders */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-slate-600" />
                Active Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {orders.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  No active service requests. Select a service type on the left to start.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {orders.map(order => {
                    const activeInvoice = order.invoices[0]
                    return (
                      <div key={order.id} className="p-5 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                order.status === 'REQUESTED' ? 'bg-blue-100 text-blue-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>{order.status.replace(/_/g, ' ')}</span>
                              <span className="text-xs text-slate-400">Urgency: {order.urgency}</span>
                            </div>
                            <h3 className="font-semibold text-slate-900 text-sm">
                              {getServiceTypeLabel(order.serviceType)}
                            </h3>
                            {order.manuscriptTitle && (
                              <p className="text-xs text-slate-500 truncate mt-0.5">Title: {order.manuscriptTitle}</p>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            {order.quoteAmount ? (
                              <div className="text-sm font-bold text-slate-900">{formatCurrency(order.quoteAmount)}</div>
                            ) : (
                              <div className="text-xs text-slate-400 italic">Quote pending</div>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded">{order.description}</p>

                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Requested: {formatDate(order.createdAt)}</span>
                          <div>
                            {order.status === 'QUOTE_SENT' && (
                              <QuoteAction orderId={order.id} />
                            )}
                            {order.status === 'PAYMENT_PENDING' && activeInvoice && (
                              <span className="text-amber-600 font-medium">
                                Invoice generated: {activeInvoice.invoiceNumber}. Please pay in billing history.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
