import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort, getStatusColor, getStatusLabel } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { ClipboardList, CheckCircle, Eye } from 'lucide-react'

export default async function EditorialOfficeDashboard() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (!['EDITORIAL_OFFICE', 'SUPER_ADMIN'].includes(session.user.role)) redirect('/dashboard')

  const manuscripts = await prisma.manuscript.findMany({
    where: { status: { in: ['SUBMITTED', 'UNDER_TECHNICAL_CHECK'] } },
    include: { journal: { select: { abbreviation: true } }, submitter: { select: { name: true } } },
    orderBy: { submittedAt: 'asc' },
  })

  const submitted = manuscripts.filter(m => m.status === 'SUBMITTED').length
  const checking = manuscripts.filter(m => m.status === 'UNDER_TECHNICAL_CHECK').length

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Editorial Office</h1>
        <p className="text-slate-500 text-sm">Technical check queue</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'New Submissions', value: submitted, color: 'text-blue-600 bg-blue-50' },
          { label: 'Under Check', value: checking, color: 'text-amber-600 bg-amber-50' },
          { label: 'Total Queue', value: manuscripts.length, color: 'text-slate-600 bg-slate-50' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="pt-5">
              <div className={`text-2xl font-bold ${stat.color.split(' ')[0]}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Manuscripts Queue</CardTitle></CardHeader>
        <CardContent className="p-0">
          {manuscripts.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No manuscripts in queue</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {manuscripts.map(ms => (
                <div key={ms.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-slate-500">{ms.manuscriptId}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(ms.status)}`}>
                        {getStatusLabel(ms.status)}
                      </span>
                    </div>
                    <div className="font-medium text-slate-900 text-sm">{ms.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      by {ms.submitter.name} · {ms.journal?.abbreviation} · {formatDateShort(ms.submittedAt)}
                    </div>
                  </div>
                  <Link href={`/dashboard/office/manuscripts/${ms.id}`}>
                    <Button size="sm">
                      <ClipboardList className="w-4 h-4" />
                      Technical Check
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
