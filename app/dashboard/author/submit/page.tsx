import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Suspense } from 'react'
import { SubmissionForm } from '@/components/manuscripts/SubmissionForm'

export const metadata = { title: 'Submit Manuscript' }

export default async function SubmitPage() {
  const session = await auth()
  if (!session?.user) redirect('/login?callbackUrl=/dashboard/author/submit')

  const journals = await prisma.journal.findMany({
    where: { isActive: true },
    select: {
      id: true,
      title: true,
      abbreviation: true,
      subjectArea: true,
      slug: true,
    },
    orderBy: { title: 'asc' },
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Submit a Manuscript</h1>
        <p className="text-slate-500 text-sm mt-1">
          Complete all steps to submit your manuscript for editorial review.
        </p>
      </div>
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading submission wizard...</div>}>
        <SubmissionForm journals={journals as Array<{ id: string; title: string; abbreviation: string | null; subjectArea: string; slug: string }>} />
      </Suspense>
    </div>
  )
}
