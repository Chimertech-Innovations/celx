import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort, getStatusColor, getStatusLabel } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { ClipboardList, Edit3 } from 'lucide-react'

export const metadata = { title: 'Manuscript Revisions' }

export default async function RevisionsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const manuscripts = await prisma.manuscript.findMany({
    where: {
      submitterId: session.user.id,
      status: 'REVISION_REQUESTED',
    },
    include: {
      journal: { select: { title: true, abbreviation: true } },
      editorialDecisions: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manuscript Revisions</h1>
        <p className="text-slate-500 text-sm">Action required: Revise your submitted manuscripts based on reviewer and editor feedback</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-slate-600" />
            Awaiting Revisions ({manuscripts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {manuscripts.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No manuscripts currently require revision. Great job!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {manuscripts.map(ms => {
                const latestDecision = ms.editorialDecisions[0]
                return (
                  <div key={ms.id} className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-slate-500">{ms.manuscriptId}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(ms.status)}`}>
                            {getStatusLabel(ms.status)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 text-sm">{ms.title}</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          {ms.journal?.title} · Last Updated: {formatDateShort(ms.updatedAt)}
                        </p>
                      </div>
                      <Link href={`/dashboard/author/manuscripts/${ms.id}`} className="shrink-0">
                        <Button size="sm">
                          <Edit3 className="w-4 h-4" />
                          View Feedback
                        </Button>
                      </Link>
                    </div>

                    {latestDecision && (
                      <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 text-xs text-amber-900">
                        <strong>Editor Decision Note:</strong>
                        <p className="mt-1 line-clamp-3 whitespace-pre-line text-slate-700">{latestDecision.decisionLetter}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
