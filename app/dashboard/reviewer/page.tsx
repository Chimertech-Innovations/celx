import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { CheckCircle, Clock, X } from 'lucide-react'

export default async function ReviewerDashboard() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (!['REVIEWER', 'SUPER_ADMIN'].includes(session.user.role)) redirect('/dashboard')

  const [invitations, reviews] = await Promise.all([
    prisma.reviewerInvitation.findMany({
      where: { reviewerId: session.user.id },
      include: {
        manuscript: {
          include: { journal: { select: { abbreviation: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.review.findMany({
      where: { reviewerId: session.user.id, isSubmitted: true },
      include: { manuscript: { select: { manuscriptId: true, title: true } } },
      orderBy: { submittedAt: 'desc' },
      take: 5,
    }),
  ])

  const pending = invitations.filter(i => i.status === 'PENDING').length
  const accepted = invitations.filter(i => i.status === 'ACCEPTED').length
  const completed = invitations.filter(i => i.status === 'COMPLETED').length

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reviewer Dashboard</h1>
        <p className="text-slate-500 text-sm">Your review invitations and completed reviews</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: pending, color: 'text-amber-600' },
          { label: 'In Progress', value: accepted, color: 'text-blue-600' },
          { label: 'Completed', value: completed, color: 'text-green-600' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="pt-5">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Review Invitations</CardTitle></CardHeader>
        <CardContent className="p-0">
          {invitations.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No invitations received yet</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {invitations.map(inv => (
                <div key={inv.id} className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        inv.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                        inv.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' :
                        inv.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>{inv.status}</span>
                      <span className="text-xs text-slate-400">{inv.manuscript.journal?.abbreviation}</span>
                      {inv.dueDate && <span className="text-xs text-slate-400">Due: {formatDateShort(inv.dueDate)}</span>}
                    </div>
                    <div className="font-medium text-sm text-slate-900">{inv.manuscript.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Invited: {formatDateShort(inv.createdAt)}</div>
                  </div>
                  <div>
                    {inv.status === 'PENDING' && (
                      <Link href={`/dashboard/reviewer/invitations/${inv.id}`}>
                        <Button size="sm">Respond</Button>
                      </Link>
                    )}
                    {inv.status === 'ACCEPTED' && (
                      <Link href={`/dashboard/reviewer/reviews/${inv.id}`}>
                        <Button size="sm" variant="secondary">Submit Review</Button>
                      </Link>
                    )}
                    {inv.status === 'COMPLETED' && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="w-3.5 h-3.5" /> Done
                      </span>
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
