import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { CheckSquare } from 'lucide-react'

export const metadata = { title: 'My Completed Reviews' }

export default async function ReviewerReviewsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (!['REVIEWER', 'SUPER_ADMIN'].includes(session.user.role)) redirect('/dashboard')

  const reviews = await prisma.review.findMany({
    where: { reviewerId: session.user.id, isSubmitted: true },
    include: {
      manuscript: {
        select: { manuscriptId: true, title: true }
      }
    },
    orderBy: { submittedAt: 'desc' },
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Reviews</h1>
        <p className="text-slate-500 text-sm">Review history and submitted evaluations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-slate-600" />
            Completed Reviews ({reviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {reviews.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No completed reviews found in your history.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {reviews.map(rev => (
                <div key={rev.id} className="p-5 space-y-2 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-slate-500">{rev.manuscript.manuscriptId}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          rev.recommendation === 'ACCEPT' ? 'bg-green-100 text-green-700' :
                          rev.recommendation === 'REJECT' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>{rev.recommendation?.replace(/_/g, ' ')}</span>
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm">{rev.manuscript.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Submitted: {rev.submittedAt ? formatDateShort(rev.submittedAt) : 'N/A'}
                      </p>
                    </div>
                  </div>
                  {rev.commentsToAuthor && (
                    <div className="bg-slate-50 p-3 rounded text-xs text-slate-600 line-clamp-3">
                      <strong>My Comments:</strong> {rev.commentsToAuthor}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
