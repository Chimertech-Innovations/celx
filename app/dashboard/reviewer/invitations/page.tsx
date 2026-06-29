import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { Bell } from 'lucide-react'

export const metadata = { title: 'Review Invitations' }

export default async function ReviewerInvitationsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (!['REVIEWER', 'SUPER_ADMIN'].includes(session.user.role)) redirect('/dashboard')

  const invitations = await prisma.reviewerInvitation.findMany({
    where: { reviewerId: session.user.id },
    include: {
      manuscript: {
        include: { journal: { select: { title: true, abbreviation: true } } }
      }
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Review Invitations</h1>
        <p className="text-slate-500 text-sm">Respond to active requests to review scientific manuscripts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-600" />
            Invitations ({invitations.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {invitations.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No review invitations received yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {invitations.map(inv => (
                <div key={inv.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        inv.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                        inv.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' :
                        inv.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>{inv.status}</span>
                      <span className="text-xs text-slate-400">{inv.manuscript.journal?.abbreviation}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{inv.manuscript.title}</h3>
                    <div className="text-xs text-slate-500">
                      Invited: {formatDateShort(inv.createdAt)} {inv.dueDate && `· Due: ${formatDateShort(inv.dueDate)}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 justify-end">
                    {inv.status === 'PENDING' && (
                      <Link href={`/dashboard/reviewer/invitations/${inv.id}`}>
                        <Button size="sm">Respond</Button>
                      </Link>
                    )}
                    {inv.status === 'ACCEPTED' && (
                      <Link href={`/dashboard/reviewer/invitations/${inv.id}`}>
                        <Button size="sm" variant="secondary">Start Review</Button>
                      </Link>
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
