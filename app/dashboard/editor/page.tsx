import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort, getStatusColor, getStatusLabel } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { FileText, Users, CheckCircle, Clock } from 'lucide-react'

export default async function EditorDashboard() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (!['EDITOR_IN_CHIEF', 'ASSOCIATE_EDITOR', 'SUPER_ADMIN'].includes(session.user.role)) redirect('/dashboard')

  const manuscripts = await prisma.manuscript.findMany({
    where: {
      status: {
        in: [
          'UNDER_EDITORIAL_SCREENING',
          'REVIEWER_INVITED',
          'UNDER_REVIEW',
          'REVIEWS_COMPLETED',
          'DECISION_PENDING',
        ],
      },
    },
    include: {
      journal: { select: { abbreviation: true } },
      submitter: { select: { name: true } },
      reviewerInvitations: { select: { status: true } },
      reviews: { where: { isSubmitted: true }, select: { id: true, recommendation: true } },
    },
    orderBy: { updatedAt: 'asc' },
  })

  const screeningCount = manuscripts.filter(m => m.status === 'UNDER_EDITORIAL_SCREENING').length
  const reviewCount = manuscripts.filter(m => ['REVIEWER_INVITED', 'UNDER_REVIEW'].includes(m.status)).length
  const decisionNeeded = manuscripts.filter(m => m.status === 'REVIEWS_COMPLETED').length

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Editor-in-Chief Dashboard</h1>
        <p className="text-slate-500 text-sm">Manage editorial decisions and reviewer assignments</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'For Screening', value: screeningCount, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Under Review', value: reviewCount, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Decision Needed', value: decisionNeeded, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Total Active', value: manuscripts.length, color: 'text-slate-600', bg: 'bg-slate-50' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="pt-5">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Active Manuscripts</CardTitle></CardHeader>
        <CardContent className="p-0">
          {manuscripts.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No active manuscripts</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {manuscripts.map(ms => {
                const completedReviews = ms.reviews.length
                const totalInvitations = ms.reviewerInvitations.length
                return (
                  <div key={ms.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-slate-500">{ms.manuscriptId}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(ms.status)}`}>
                          {getStatusLabel(ms.status)}
                        </span>
                        {ms.status === 'REVIEWS_COMPLETED' && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                            Action Required
                          </span>
                        )}
                      </div>
                      <div className="font-medium text-slate-900 text-sm">{ms.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {ms.submitter.name} · {ms.journal?.abbreviation} · {formatDateShort(ms.updatedAt)}
                        {totalInvitations > 0 && (
                          <span className="ml-2">· Reviews: {completedReviews}/{totalInvitations}</span>
                        )}
                      </div>
                    </div>
                    <Link href={`/dashboard/editor/manuscripts/${ms.id}`}>
                      <Button size="sm">
                        {ms.status === 'REVIEWS_COMPLETED' ? 'Make Decision' : 'Manage'}
                      </Button>
                    </Link>
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
