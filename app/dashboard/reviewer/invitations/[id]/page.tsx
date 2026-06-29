import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { ReviewForm } from '@/components/review/ReviewForm'
import { ArrowLeft } from 'lucide-react'

interface Props { params: Promise<{ id: string }> }

export default async function ReviewPage({ params }: Props) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) redirect('/login')

  const invitation = await prisma.reviewerInvitation.findUnique({
    where: { id, reviewerId: session.user.id },
    include: {
      manuscript: {
        include: { journal: { select: { title: true } } },
      },
    },
  })

  if (!invitation) notFound()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/reviewer">
          <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Review Manuscript</h1>
          <p className="text-xs text-slate-500">{invitation.manuscript.manuscriptId}</p>
        </div>
      </div>

      {/* Manuscript preview for reviewer */}
      <Card>
        <CardHeader><CardTitle>Manuscript to Review</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Title</div>
            <div className="text-base font-medium text-slate-900">{invitation.manuscript.title}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Journal</div>
            <div className="text-sm">{invitation.manuscript.journal?.title}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Abstract</div>
            <div className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-lg p-3">
              {invitation.manuscript.abstract}
            </div>
          </div>
          {invitation.manuscript.keywords && invitation.manuscript.keywords.trim().length > 0 && (
            <div>
              <div className="text-xs font-medium text-slate-500 mb-2">Keywords</div>
              <div className="flex flex-wrap gap-1.5">
                {invitation.manuscript.keywords.split(',').map(k => k.trim()).filter(Boolean).map(kw => (
                  <span key={kw} className="text-xs bg-navy-50 text-navy-700 px-2.5 py-0.5 rounded-full">{kw}</span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviewer guidelines notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>Reviewer Guidelines:</strong> Please provide constructive, detailed feedback. Focus on scientific validity, methodology, originality, and clarity. You may not contact the authors directly. Your identity will remain confidential.
        <Link href="/reviewer-guidelines" className="ml-2 underline">Read full guidelines</Link>
      </div>

      <ReviewForm
        invitationId={id}
        manuscriptId={invitation.manuscriptId}
        manuscriptTitle={invitation.manuscript.title}
        status={invitation.status}
      />
    </div>
  )
}
