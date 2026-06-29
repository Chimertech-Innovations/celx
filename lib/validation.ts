import { z } from 'zod'

// ==================== AUTH ====================

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['AUTHOR', 'REVIEWER', 'READER']).default('AUTHOR'),
  affiliation: z.string().optional(),
  country: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

// ==================== MANUSCRIPT ====================

export const manuscriptStep1Schema = z.object({
  journalId: z.string().min(1, 'Please select a journal'),
})

export const manuscriptStep2Schema = z.object({
  articleType: z.enum([
    'ORIGINAL_RESEARCH',
    'REVIEW_ARTICLE',
    'CASE_REPORT',
    'SHORT_COMMUNICATION',
    'LETTER_TO_EDITOR',
    'EDITORIAL',
    'COMMENTARY',
    'OPINION',
    'TECHNICAL_NOTE',
    'CONFERENCE_PAPER',
    'BOOK_REVIEW',
  ]),
})

export const manuscriptStep3Schema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(500, 'Title too long'),
})

export const manuscriptStep4Schema = z.object({
  abstract: z.string().min(100, 'Abstract must be at least 100 characters').max(5000, 'Abstract too long'),
})

export const manuscriptStep5Schema = z.object({
  keywords: z.string().min(1, 'Please add at least one keyword'),
})

export const manuscriptFullSchema = z.object({
  journalId: z.string().min(1),
  articleType: z.string(),
  title: z.string().min(10),
  abstract: z.string().min(100),
  keywords: z.array(z.string()).min(1),
  coverLetter: z.string().optional(),
  suggestedReviewers: z.string().optional(),
  opposedReviewers: z.string().optional(),
  conflictOfInterest: z.string().min(1, 'Please provide a conflict of interest statement'),
  fundingStatement: z.string().min(1, 'Please provide a funding statement'),
  ethicsStatement: z.string().min(1, 'Please provide an ethics statement'),
  dataAvailability: z.string().min(1, 'Please provide a data availability statement'),
  license: z.enum(['CC_BY', 'CC_BY_NC', 'CC_BY_ND', 'CC_BY_SA', 'CC_BY_NC_ND', 'ALL_RIGHTS_RESERVED']).default('CC_BY'),
  apcConfirmed: z.boolean(),
  waiverRequested: z.boolean().default(false),
  waiverReason: z.string().optional(),
})

// ==================== JOURNAL ====================

export const journalSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  abbreviation: z.string().optional(),
  issn: z.string().optional(),
  eissn: z.string().optional(),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  aimsAndScope: z.string().min(50, 'Aims and scope must be at least 50 characters'),
  subjectArea: z.string().min(3),
  publicationFrequency: z.string().optional(),
  reviewTimeline: z.string().optional(),
  apcFee: z.number().optional(),
  waiverPolicy: z.string().optional(),
  openAccessPolicy: z.string().optional(),
  indexingStatus: z.string().optional(),
  isActive: z.boolean().default(true),
})

// ==================== REVIEW ====================

export const reviewSchema = z.object({
  originalityScore: z.number().min(1).max(5),
  methodologyScore: z.number().min(1).max(5),
  dataQualityScore: z.number().min(1).max(5),
  clarityScore: z.number().min(1).max(5),
  ethicalConcerns: z.string().optional(),
  statisticalConcerns: z.string().optional(),
  commentsToAuthor: z.string().min(50, 'Comments to author must be at least 50 characters'),
  confidentialComments: z.string().optional(),
  recommendation: z.enum(['ACCEPT', 'MINOR_REVISION', 'MAJOR_REVISION', 'REJECT', 'TRANSFER']),
  conflictOfInterest: z.string().min(1, 'Please declare any conflicts of interest'),
})

// ==================== EDITORIAL DECISION ====================

export const editorialDecisionSchema = z.object({
  decisionType: z.enum(['ACCEPT', 'MINOR_REVISION', 'MAJOR_REVISION', 'REJECT', 'TRANSFER']),
  decisionLetter: z.string().min(100, 'Decision letter must be at least 100 characters'),
  internalNote: z.string().optional(),
  attachReviewerComments: z.boolean().default(true),
})

// ==================== SERVICE ORDER ====================

export const serviceOrderSchema = z.object({
  serviceType: z.enum([
    'ENGLISH_EDITING',
    'STATISTICAL_ANALYSIS',
    'SCHEMATIC_DIAGRAM',
    'SCIENTIFIC_EDITING',
    'MANUSCRIPT_FORMATTING',
    'COVER_LETTER',
    'REVIEWER_RESPONSE',
  ]),
  manuscriptTitle: z.string().optional(),
  description: z.string().min(20, 'Please provide a detailed description'),
  urgency: z.enum(['normal', 'express', 'urgent']).default('normal'),
})

// ==================== ARTICLE (PRODUCTION) ====================

export const articleSchema = z.object({
  doi: z.string().optional(),
  fullTextHtml: z.string().optional(),
  pdfUrl: z.string().url().optional().or(z.literal('')),
  volumeId: z.string().optional(),
  issueId: z.string().optional(),
  publishedDate: z.string().optional(),
})

// ==================== USER ====================

export const userUpdateSchema = z.object({
  name: z.string().min(2),
  affiliation: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().optional(),
  orcidId: z.string().optional(),
})

// ==================== ANNOUNCEMENT ====================

export const announcementSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  isPublished: z.boolean().default(true),
  expiresAt: z.string().optional(),
})
