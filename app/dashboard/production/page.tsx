import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { Package, Eye, Send } from 'lucide-react'

export default async function ProductionEditorDashboard() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (!['PRODUCTION_EDITOR', 'SUPER_ADMIN'].includes(session.user.role)) redirect('/dashboard')

  const manuscripts = await prisma.manuscript.findMany({
    where: {
      status: { in: ['ACCEPTED', 'IN_PRODUCTION', 'PROOF_SENT_TO_AUTHOR', 'PROOF_APPROVED'] },
    },
    include: {
      journal: { select: { abbreviation: true, title: true } },
      submitter: { select: { name: true } },
    },
    orderBy: { updatedAt: 'asc' },
  })

  const accepted = manuscripts.filter(m => m.status === 'ACCEPTED').length
  const inProduction = manuscripts.filter(m => m.status === 'IN_PRODUCTION').length

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Production Dashboard</h1>
        <p className="text-slate-500 text-sm">Manage accepted manuscripts and publish articles</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Awaiting Production', value: accepted, color: 'text-green-600' },
          { label: 'In Production', value: inProduction, color: 'text-blue-600' },
          { label: 'Total Active', value: manuscripts.length, color: 'text-slate-600' },
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
        <CardHeader><CardTitle>Accepted Manuscripts Queue</CardTitle></CardHeader>
        <CardContent className="p-0">
          {manuscripts.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No manuscripts in production queue</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {manuscripts.map(ms => (
                <div key={ms.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-slate-500">{ms.manuscriptId}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        ms.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                        ms.status === 'IN_PRODUCTION' ? 'bg-blue-100 text-blue-700' :
                        'bg-teal-100 text-teal-700'
                      }`}>
                        {ms.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="font-medium text-sm text-slate-900">{ms.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {ms.submitter.name} · {ms.journal?.abbreviation}
                    </div>
                  </div>
                  <Link href={`/dashboard/production/manuscripts/${ms.id}`}>
                    <Button size="sm">
                      {ms.status === 'ACCEPTED' ? (
                        <><Package className="w-4 h-4" /> Start Production</>
                      ) : (
                        <><Send className="w-4 h-4" /> Publish</>
                      )}
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
