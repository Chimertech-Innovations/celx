import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate, getArticleTypeLabel, getLicenseLabel } from '@/lib/utils'
import { generateAllCitations } from '@/lib/citation'
import { ArticleActions } from '@/components/articles/ArticleActions'
import {
  Globe, Calendar, Eye, Download, Tag, ChevronRight, Shield, BookOpen, FileText,
} from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) return {}
  return {
    title: article.title,
    description: article.abstract.slice(0, 160),
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug, isPublished: true },
    include: {
      authors: { orderBy: { order: 'asc' } },
      journal: { select: { title: true, abbreviation: true, slug: true } },
      volume: { select: { number: true, year: true } },
      issue: { select: { number: true, title: true } },
      references: { orderBy: { order: 'asc' } },
    },
  })

  if (!article) notFound()

  // Increment view count
  await prisma.article.update({
    where: { id: article.id },
    data: { viewCount: { increment: 1 } },
  })

  const citations = generateAllCitations(article as Parameters<typeof generateAllCitations>[0])

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/articles" className="hover:text-slate-900">Articles</Link>
          <ChevronRight className="w-4 h-4" />
          {article.journal && (
            <>
              <Link href={`/journals/${article.journal.slug}`} className="hover:text-slate-900">
                {article.journal.abbreviation || article.journal.title}
              </Link>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
          <span className="text-slate-700 truncate max-w-48">{article.title.slice(0, 50)}...</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Article header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                  <Globe className="w-3 h-3" /> Open Access
                </span>
                <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                  {getArticleTypeLabel(article.articleType)}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5 leading-tight">
                {article.title}
              </h1>

              {/* Authors */}
              <div className="flex flex-wrap gap-1 mb-4">
                {article.authors.map((author, idx) => (
                  <span key={author.id}>
                    <span className={`text-sm font-medium ${author.isCorresponding ? 'text-navy-700' : 'text-slate-700'}`}>
                      {author.name}
                      {author.isCorresponding && <sup title="Corresponding author">*</sup>}
                    </span>
                    {idx < article.authors.length - 1 && <span className="text-slate-400">, </span>}
                  </span>
                ))}
              </div>

              {/* Affiliations */}
              <div className="space-y-0.5 mb-4">
                {article.authors.map(author => author.affiliation && (
                  <p key={author.id} className="text-sm text-slate-500">{author.affiliation}{author.country ? `, ${author.country}` : ''}</p>
                ))}
              </div>

              {/* Publication info */}
              <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-5 pb-5 border-b border-slate-200">
                {article.receivedDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Received: {formatDate(article.receivedDate)}
                  </div>
                )}
                {article.acceptedDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Accepted: {formatDate(article.acceptedDate)}
                  </div>
                )}
                {article.publishedDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Published: {formatDate(article.publishedDate)}
                  </div>
                )}
              </div>

              {/* Actions */}
              <ArticleActions citations={citations} pdfUrl={article.pdfUrl} />
            </div>

            {/* Abstract */}
            <div className="mb-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Abstract</h2>
              <p className="text-slate-700 leading-relaxed">{article.abstract}</p>
            </div>

            {/* Keywords */}
            {article.keywords && article.keywords.trim().length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                    <Tag className="w-4 h-4" /> Keywords:
                  </span>
                  {article.keywords.split(',').map(k => k.trim()).filter(Boolean).map(kw => (
                    <Link key={kw} href={`/search?q=${encodeURIComponent(kw)}`}>
                      <span className="text-sm bg-navy-50 text-navy-700 border border-navy-200 px-2.5 py-0.5 rounded-full hover:bg-navy-100 transition-colors cursor-pointer">
                        {kw}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Full text */}
            {article.fullTextHtml && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">Full Text</h2>
                <div
                  className="prose prose-slate max-w-none text-slate-700 leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: article.fullTextHtml }}
                />
              </div>
            )}

            {/* Declarations */}
            <div className="space-y-4 mb-8">
              {article.fundingStatement && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">Funding</h3>
                  <p className="text-sm text-slate-600">{article.fundingStatement}</p>
                </div>
              )}
              {article.conflictOfInterest && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">Conflict of Interest</h3>
                  <p className="text-sm text-slate-600">{article.conflictOfInterest}</p>
                </div>
              )}
              {article.ethicsStatement && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">Ethics Approval</h3>
                  <p className="text-sm text-slate-600">{article.ethicsStatement}</p>
                </div>
              )}
              {article.dataAvailability && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">Data Availability</h3>
                  <p className="text-sm text-slate-600">{article.dataAvailability}</p>
                </div>
              )}
            </div>

            {/* References */}
            {article.references.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">References</h2>
                <ol className="space-y-2">
                  {article.references.map((ref, idx) => (
                    <li key={ref.id} className="text-sm text-slate-600 leading-relaxed flex gap-3">
                      <span className="shrink-0 font-medium text-slate-400 w-6">{idx + 1}.</span>
                      <span>
                        {ref.text}
                        {ref.doi && (
                          <a href={`https://doi.org/${ref.doi}`} target="_blank" rel="noopener noreferrer"
                            className="ml-2 text-navy-600 hover:underline text-xs">
                            DOI
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* DOI */}
            {article.doi && (
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="text-xs font-medium text-slate-500 mb-1">DOI</div>
                <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-navy-700 hover:underline break-all">
                  {article.doi}
                </a>
              </div>
            )}

            {/* Metrics */}
            <div className="border border-slate-200 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Article Metrics</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-slate-600"><Eye className="w-4 h-4" /> Views</span>
                  <span className="font-medium text-slate-900">{article.viewCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-slate-600"><Download className="w-4 h-4" /> Downloads</span>
                  <span className="font-medium text-slate-900">{article.downloadCount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* License */}
            <div className="border border-slate-200 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">License</h3>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-slate-700">{getLicenseLabel(article.license)}</span>
              </div>
            </div>

            {/* Journal info */}
            {article.journal && (
              <div className="border border-slate-200 rounded-xl p-4">
                <h3 className="font-semibold text-slate-900 mb-2 text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-navy-600" /> Published In
                </h3>
                <Link href={`/journals/${article.journal.slug}`} className="text-sm text-navy-700 hover:underline">
                  {article.journal.title}
                </Link>
                {article.volume && (
                  <div className="text-xs text-slate-500 mt-1">
                    Volume {article.volume.number}, Issue {article.issue?.number}
                  </div>
                )}
              </div>
            )}

            {/* Ethics notice */}
            <div className="bg-navy-50 border border-navy-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-navy-700" />
                <span className="text-sm font-semibold text-navy-900">Peer Reviewed</span>
              </div>
              <p className="text-xs text-navy-700">
                This article was peer reviewed according to CleX ethical publishing standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
