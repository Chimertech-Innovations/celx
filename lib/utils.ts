import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ManuscriptStatus } from '@prisma/client'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'N/A'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return 'N/A'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function generateManuscriptId(journalSlug: string, year: number, sequence: number): string {
  const prefixMap: Record<string, string> = {
    'journal-biomedical-translational-research': 'BIOMED',
    'journal-agricultural-veterinary-sciences': 'AGVET',
    'journal-engineering-ai-applied-technologies': 'ENGAI',
    'journal-public-health-clinical-studies': 'PUBH',
    'student-journal-emerging-research': 'SJER',
  }
  const prefix = prefixMap[journalSlug] || 'CLEX'
  return `${prefix}-${year}-${String(sequence).padStart(4, '0')}`
}

export function getStatusColor(status: ManuscriptStatus): string {
  const colorMap: Record<ManuscriptStatus, string> = {
    DRAFT: 'bg-gray-100 text-gray-700',
    SUBMITTED: 'bg-blue-100 text-blue-700',
    UNDER_TECHNICAL_CHECK: 'bg-yellow-100 text-yellow-700',
    UNDER_EDITORIAL_SCREENING: 'bg-orange-100 text-orange-700',
    REVIEWER_INVITED: 'bg-purple-100 text-purple-700',
    UNDER_REVIEW: 'bg-indigo-100 text-indigo-700',
    REVIEWS_COMPLETED: 'bg-teal-100 text-teal-700',
    DECISION_PENDING: 'bg-amber-100 text-amber-700',
    REVISION_REQUESTED: 'bg-red-100 text-red-700',
    REVISED_MANUSCRIPT_SUBMITTED: 'bg-blue-100 text-blue-700',
    ACCEPTED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-800',
    TRANSFERRED: 'bg-gray-100 text-gray-600',
    IN_PRODUCTION: 'bg-cyan-100 text-cyan-700',
    PROOF_SENT_TO_AUTHOR: 'bg-violet-100 text-violet-700',
    PROOF_APPROVED: 'bg-teal-100 text-teal-800',
    PUBLISHED: 'bg-emerald-100 text-emerald-800',
    WITHDRAWN: 'bg-gray-100 text-gray-500',
  }
  return colorMap[status] || 'bg-gray-100 text-gray-700'
}

export function getStatusLabel(status: ManuscriptStatus): string {
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

export function getArticleTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    ORIGINAL_RESEARCH: 'Original Research',
    REVIEW_ARTICLE: 'Review Article',
    CASE_REPORT: 'Case Report',
    SHORT_COMMUNICATION: 'Short Communication',
    LETTER_TO_EDITOR: 'Letter to Editor',
    EDITORIAL: 'Editorial',
    COMMENTARY: 'Commentary',
    OPINION: 'Opinion',
    TECHNICAL_NOTE: 'Technical Note',
    CONFERENCE_PAPER: 'Conference Paper',
    BOOK_REVIEW: 'Book Review',
  }
  return labels[type] || type
}

export function getLicenseLabel(license: string): string {
  const labels: Record<string, string> = {
    CC_BY: 'CC BY 4.0',
    CC_BY_NC: 'CC BY-NC 4.0',
    CC_BY_ND: 'CC BY-ND 4.0',
    CC_BY_SA: 'CC BY-SA 4.0',
    CC_BY_NC_ND: 'CC BY-NC-ND 4.0',
    ALL_RIGHTS_RESERVED: 'All Rights Reserved',
  }
  return labels[license] || license
}

export function getServiceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    ENGLISH_EDITING: 'English Language Editing',
    STATISTICAL_ANALYSIS: 'Statistical Analysis',
    SCHEMATIC_DIAGRAM: 'Schematic Diagram Design',
    SCIENTIFIC_EDITING: 'Scientific Editing',
    MANUSCRIPT_FORMATTING: 'Manuscript Formatting',
    COVER_LETTER: 'Cover Letter Preparation',
    REVIEWER_RESPONSE: 'Reviewer Response Editing',
  }
  return labels[type] || type
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}
