import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort, getStatusColor, getStatusLabel } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { PlusCircle, Eye, Edit3 } from 'lucide-react'

export default async function AuthorManuscriptsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const manuscripts = await prisma.manuscript.findMany({
    where: { submitterId: session.user.id },
    include: {
      journal: { select: { title: true, abbreviation: true } },
      _count: { select: { reviews: true, editorialDecisions: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Manuscripts</h1>
          <p className="text-slate-500 text-sm">{manuscripts.length} manuscript(s)</p>
        </div>
        <Link href="/dashboard/author/submit">
          <Button><PlusCircle className="w-4 h-4" /> New Submission</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {manuscripts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 mb-4">No manuscripts found.</p>
              <Link href="/dashboard/author/submit"><Button>Start Submission</Button></Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {manuscripts.map(ms => (
                <div key={ms.id} className="p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-mono text-slate-500">{ms.manuscriptId}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(ms.status)}`}>
                          {getStatusLabel(ms.status)}
                        </span>
                      </div>
                      <h3 className="font-medium text-slate-900 mb-1">{ms.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                        <span>{ms.journal?.title}</span>
                        {ms.submittedAt && <span>Submitted: {formatDateShort(ms.submittedAt)}</span>}
                        <span>Reviews: {ms._count.reviews}</span>
                        <span>Updated: {formatDateShort(ms.updatedAt)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {ms.status === 'DRAFT' && (
                        <Link href={`/dashboard/author/submit?continue=${ms.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit3 className="w-3.5 h-3.5" /> Continue
                          </Button>
                        </Link>
                      )}
                      <Link href={`/dashboard/author/manuscripts/${ms.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3.5 h-3.5" /> View
                        </Button>
                      </Link>
                    </div>
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
