'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function completeTechnicalCheck(manuscriptId: string, notes: string, passed: boolean) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')
  if (!['EDITORIAL_OFFICE', 'SUPER_ADMIN'].includes(session.user.role)) throw new Error('Unauthorized')

  const manuscript = await prisma.manuscript.findUnique({ where: { id: manuscriptId } })
  if (!manuscript) throw new Error('Manuscript not found')

  await prisma.manuscript.update({
    where: { id: manuscriptId },
    data: {
      status: passed ? 'UNDER_EDITORIAL_SCREENING' : 'SUBMITTED',
      technicalCheckDone: passed,
      technicalCheckNotes: notes,
    },
  })

  // Notify submitter
  await prisma.notification.create({
    data: {
      userId: manuscript.submitterId,
      title: 'Technical Check Complete',
      message: passed
        ? `Your manuscript ${manuscript.manuscriptId} has passed technical check and is now under editorial screening.`
        : `Your manuscript ${manuscript.manuscriptId} has been returned for corrections. Please review the technical check comments.`,
      category: 'TECHNICAL_CHECK',
      link: `/dashboard/author/manuscripts/${manuscriptId}`,
    },
  })

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'TECHNICAL_CHECK_COMPLETED',
      entity: 'Manuscript',
      entityId: manuscriptId,
      details: `Technical check ${passed ? 'passed' : 'failed'}: ${notes}`,
    },
  })

  revalidatePath('/dashboard/office')
  return { success: true }
}

export async function inviteReviewer(manuscriptId: string, reviewerId: string, message: string, dueDate: string) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')
  if (!['EDITOR_IN_CHIEF', 'ASSOCIATE_EDITOR', 'SUPER_ADMIN'].includes(session.user.role)) throw new Error('Unauthorized')

  const manuscript = await prisma.manuscript.findUnique({ where: { id: manuscriptId } })
  if (!manuscript) throw new Error('Manuscript not found')

  const invitation = await prisma.reviewerInvitation.create({
    data: {
      manuscriptId,
      reviewerId,
      invitedById: session.user.id,
      status: 'PENDING',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      message,
    },
  })

  // Update manuscript status
  await prisma.manuscript.update({
    where: { id: manuscriptId },
    data: { status: 'REVIEWER_INVITED' },
  })

  // Notify reviewer
  await prisma.notification.create({
    data: {
      userId: reviewerId,
      title: 'Review Invitation',
      message: `You have been invited to review manuscript: "${manuscript.title}". Please accept or decline within 5 days.`,
      category: 'REVIEWER_INVITATION',
      link: `/dashboard/reviewer/invitations/${invitation.id}`,
    },
  })

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'REVIEWER_INVITED',
      entity: 'Manuscript',
      entityId: manuscriptId,
      details: `Reviewer ${reviewerId} invited for manuscript ${manuscript.manuscriptId}`,
    },
  })

  revalidatePath('/dashboard/editor')
  return { success: true }
}

export async function makeEditorialDecision(
  manuscriptId: string,
  decisionType: string,
  decisionLetter: string,
  internalNote: string,
) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')
  if (!['EDITOR_IN_CHIEF', 'ASSOCIATE_EDITOR', 'SUPER_ADMIN'].includes(session.user.role)) throw new Error('Unauthorized')

  const manuscript = await prisma.manuscript.findUnique({ where: { id: manuscriptId } })
  if (!manuscript) throw new Error('Manuscript not found')

  await prisma.editorialDecision.create({
    data: {
      manuscriptId,
      editorId: session.user.id,
      decisionType: decisionType as 'ACCEPT' | 'MINOR_REVISION' | 'MAJOR_REVISION' | 'REJECT' | 'TRANSFER',
      decisionLetter,
      internalNote,
      attachReviewerComments: true,
    },
  })

  const statusMap = {
    ACCEPT: 'ACCEPTED' as const,
    MINOR_REVISION: 'REVISION_REQUESTED' as const,
    MAJOR_REVISION: 'REVISION_REQUESTED' as const,
    REJECT: 'REJECTED' as const,
    TRANSFER: 'TRANSFERRED' as const,
  }

  await prisma.manuscript.update({
    where: { id: manuscriptId },
    data: { status: statusMap[decisionType as keyof typeof statusMap] || 'DECISION_PENDING' },
  })

  // Notify author
  const categoryMap = {
    ACCEPT: 'ACCEPTANCE' as const,
    REJECT: 'REJECTION' as const,
    MINOR_REVISION: 'EDITORIAL_DECISION' as const,
    MAJOR_REVISION: 'EDITORIAL_DECISION' as const,
    TRANSFER: 'EDITORIAL_DECISION' as const,
  }

  await prisma.notification.create({
    data: {
      userId: manuscript.submitterId,
      title: decisionType === 'ACCEPT' ? '🎉 Manuscript Accepted!' : `Editorial Decision: ${decisionType.replace(/_/g, ' ')}`,
      message: `A decision has been made on your manuscript ${manuscript.manuscriptId}. Please check your manuscript details.`,
      category: categoryMap[decisionType as keyof typeof categoryMap] || 'EDITORIAL_DECISION',
      link: `/dashboard/author/manuscripts/${manuscriptId}`,
    },
  })

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'EDITORIAL_DECISION',
      entity: 'Manuscript',
      entityId: manuscriptId,
      details: `Decision: ${decisionType} for manuscript ${manuscript.manuscriptId}`,
    },
  })

  // Generate invoice if accepted
  if (decisionType === 'ACCEPT') {
    const journal = await prisma.journal.findUnique({ where: { id: manuscript.journalId } })
    if (journal?.apcFee && !manuscript.waiverRequested) {
      const invoiceCount = await prisma.invoice.count()
      await prisma.invoice.create({
        data: {
          invoiceNumber: `INV-${new Date().getFullYear()}-${String(invoiceCount + 100).padStart(4, '0')}`,
          userId: manuscript.submitterId,
          manuscriptId,
          amount: journal.apcFee,
          taxAmount: 0,
          totalAmount: journal.apcFee,
          status: 'PENDING',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
    }
  }

  revalidatePath('/dashboard/editor')
  return { success: true }
}

export async function submitReview(
  invitationId: string,
  reviewData: {
    originalityScore: number
    methodologyScore: number
    dataQualityScore: number
    clarityScore: number
    ethicalConcerns?: string
    statisticalConcerns?: string
    commentsToAuthor: string
    confidentialComments?: string
    recommendation: string
    conflictOfInterest: string
  }
) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')

  const invitation = await prisma.reviewerInvitation.findUnique({
    where: { id: invitationId, reviewerId: session.user.id },
    include: { manuscript: true },
  })
  if (!invitation) throw new Error('Invitation not found')

  // Upsert review
  await prisma.review.upsert({
    where: { invitationId },
    update: {
      ...reviewData,
      recommendation: reviewData.recommendation as 'ACCEPT' | 'MINOR_REVISION' | 'MAJOR_REVISION' | 'REJECT' | 'TRANSFER',
      isSubmitted: true,
      submittedAt: new Date(),
    },
    create: {
      manuscriptId: invitation.manuscriptId,
      reviewerId: session.user.id,
      invitationId,
      ...reviewData,
      recommendation: reviewData.recommendation as 'ACCEPT' | 'MINOR_REVISION' | 'MAJOR_REVISION' | 'REJECT' | 'TRANSFER',
      isSubmitted: true,
      submittedAt: new Date(),
    },
  })

  // Update invitation status
  await prisma.reviewerInvitation.update({
    where: { id: invitationId },
    data: { status: 'COMPLETED' },
  })

  // Check if all reviews are complete
  const allInvitations = await prisma.reviewerInvitation.findMany({
    where: { manuscriptId: invitation.manuscriptId, status: { in: ['ACCEPTED', 'PENDING'] } },
  })

  if (allInvitations.length === 0) {
    await prisma.manuscript.update({
      where: { id: invitation.manuscriptId },
      data: { status: 'REVIEWS_COMPLETED' },
    })
  } else {
    await prisma.manuscript.update({
      where: { id: invitation.manuscriptId },
      data: { status: 'UNDER_REVIEW' },
    })
  }

  revalidatePath('/dashboard/reviewer')
  return { success: true }
}

export async function respondToInvitation(invitationId: string, accept: boolean) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')

  const invitation = await prisma.reviewerInvitation.findUnique({
    where: { id: invitationId, reviewerId: session.user.id },
    include: { manuscript: true },
  })
  if (!invitation) throw new Error('Invitation not found')

  await prisma.reviewerInvitation.update({
    where: { id: invitationId },
    data: {
      status: accept ? 'ACCEPTED' : 'DECLINED',
      respondedAt: new Date(),
    },
  })

  if (accept) {
    await prisma.manuscript.update({
      where: { id: invitation.manuscriptId },
      data: { status: 'UNDER_REVIEW' },
    })
  }

  revalidatePath('/dashboard/reviewer')
  return { success: true }
}

export async function publishArticle(manuscriptId: string, data: {
  doi?: string
  fullTextHtml?: string
  pdfUrl?: string
  volumeId?: string
  issueId?: string
  publishedDate?: string
}) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')
  if (!['PRODUCTION_EDITOR', 'SUPER_ADMIN'].includes(session.user.role)) throw new Error('Unauthorized')

  const manuscript = await prisma.manuscript.findUnique({
    where: { id: manuscriptId },
    include: { authors: true, journal: true },
  })
  if (!manuscript) throw new Error('Manuscript not found')

  // Create slug
  const slug = manuscript.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100) + '-' + Date.now().toString().slice(-6)

  // Create article
  const article = await prisma.article.create({
    data: {
      manuscriptId,
      journalId: manuscript.journalId,
      volumeId: data.volumeId || null,
      issueId: data.issueId || null,
      title: manuscript.title,
      slug,
      abstract: manuscript.abstract,
      keywords: manuscript.keywords,
      articleType: manuscript.articleType,
      doi: data.doi,
      fullTextHtml: data.fullTextHtml,
      pdfUrl: data.pdfUrl,
      license: manuscript.license,
      fundingStatement: manuscript.fundingStatement,
      conflictOfInterest: manuscript.conflictOfInterest,
      ethicsStatement: manuscript.ethicsStatement,
      dataAvailability: manuscript.dataAvailability,
      receivedDate: manuscript.submittedAt,
      acceptedDate: new Date(),
      publishedDate: data.publishedDate ? new Date(data.publishedDate) : new Date(),
      isPublished: true,
    },
  })

  // Copy authors
  for (const author of manuscript.authors) {
    await prisma.articleAuthor.create({
      data: {
        articleId: article.id,
        userId: author.userId,
        name: author.name,
        email: author.email,
        affiliation: author.affiliation,
        country: author.country,
        orcidId: author.orcidId,
        isCorresponding: author.isCorresponding,
        order: author.order,
      },
    })
  }

  // Update manuscript status
  await prisma.manuscript.update({
    where: { id: manuscriptId },
    data: { status: 'PUBLISHED' },
  })

  // Notify author
  await prisma.notification.create({
    data: {
      userId: manuscript.submitterId,
      title: '🎉 Article Published!',
      message: `Your article "${manuscript.title}" has been published and is now live on the CleX platform.`,
      category: 'PUBLICATION',
      link: `/articles/${slug}`,
    },
  })

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'ARTICLE_PUBLISHED',
      entity: 'Article',
      entityId: article.id,
      details: `Published article for manuscript ${manuscript.manuscriptId}`,
    },
  })

  revalidatePath('/dashboard/production')
  revalidatePath('/articles')
  return { success: true, articleSlug: slug }
}
