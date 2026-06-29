import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDateShort, getArticleTypeLabel, truncate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Globe, Users, Clock, DollarSign, FileText,
  ChevronRight, Shield, ArrowRight, BookOpen,
} from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const journal = await prisma.journal.findUnique({ where: { slug } })
  if (!journal) return {}
  return {
    title: journal.title,
    description: journal.description,
  }
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params
  const journal = await prisma.journal.findUnique({
    where: { slug },
    include: {
      editorInChief: { select: { name: true, affiliation: true } },
      editorialBoard: { orderBy: { role: 'asc' } },
      articles: {
        where: { isPublished: true },
        include: {
          authors: { take: 3, orderBy: { order: 'asc' } },
          volume: true,
          issue: true,
        },
        orderBy: { publishedDate: 'desc' },
        take: 10,
      },
    },
  })

  if (!journal) notFound()

  return (
    <div className="min-h-screen bg-white">
      {/* Journal header */}
      <div className="bg-navy-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link href="/journals" className="text-slate-400 hover:text-white text-sm transition-colors">Journals</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300 text-sm">{journal.abbreviation || 'Journal Detail'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {journal.issn && <span className="text-xs font-mono text-slate-400">ISSN: {journal.issn}</span>}
            {journal.eissn && <span className="text-xs font-mono text-slate-400">| e-ISSN: {journal.eissn}</span>}
            <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-300 bg-teal-900/30 border border-teal-700 px-2 py-0.5 rounded-full">
              <Globe className="w-3 h-3" /> Open Access
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{journal.title}</h1>
          <p className="text-slate-300 max-w-3xl leading-relaxed">{journal.description}</p>

          <div className="flex flex-wrap gap-6 mt-6 text-sm text-slate-300">
            {journal.editorInChief && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" />
                <span>EIC: <span className="text-white">{journal.editorInChief.name}</span></span>
              </div>
            )}
            {journal.reviewTimeline && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>Review time: <span className="text-white">{journal.reviewTimeline}</span></span>
              </div>
            )}
            {journal.publicationFrequency && (
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>{journal.publicationFrequency}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-8">
            <Link href={`/submit?journal=${journal.slug}`}>
              <Button variant="secondary">Submit Manuscript</Button>
            </Link>
            <Link href={`/articles?journal=${journal.slug}`}>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent hover:text-white">
                Browse Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Aims & Scope */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">Aims & Scope</h2>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line">{journal.aimsAndScope}</div>
            </div>

            {/* Editorial Board */}
            {journal.editorialBoard.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">Editorial Board</h2>
                <div className="space-y-3">
                  {journal.editorialBoard.map(member => (
                    <div key={member.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                      <div className="w-9 h-9 bg-navy-100 rounded-full flex items-center justify-center text-navy-700 font-bold text-sm shrink-0">
                        {member.name[0]}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 text-sm">{member.name}</div>
                        {member.title && <div className="text-xs text-teal-600">{member.role}</div>}
                        {member.affiliation && <div className="text-xs text-slate-500">{member.affiliation}{member.country ? `, ${member.country}` : ''}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Articles */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">Latest Articles</h2>
                <Link href={`/articles?journal=${journal.slug}`} className="text-sm text-navy-700 hover:text-navy-900 flex items-center gap-1">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-4">
                {journal.articles.length === 0 ? (
                  <div className="text-slate-500 text-sm py-6 text-center">No published articles yet.</div>
                ) : (
                  journal.articles.map(article => (
                    <div key={article.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                          {getArticleTypeLabel(article.articleType)}
                        </span>
                        {article.volume && <span className="text-xs text-slate-400">Vol. {article.volume.number}, No. {article.issue?.number}</span>}
                      </div>
                      <Link href={`/articles/${article.slug}`}>
                        <h3 className="font-medium text-slate-900 hover:text-navy-800 mb-1.5 line-clamp-2 text-sm leading-snug">
                          {article.title}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{article.authors.map(a => a.name).join(', ')}</span>
                        <span>{formatDateShort(article.publishedDate)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* APC Info */}
            <div className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-teal-600" /> APC & Fees
              </h3>
              <div className="text-2xl font-bold text-navy-900 mb-1">
                {journal.apcFee ? `$${journal.apcFee}` : 'Free'}
              </div>
              <div className="text-xs text-slate-500 mb-3">Article Processing Charge (USD)</div>
              {journal.waiverPolicy && (
                <div className="text-xs text-slate-600 bg-green-50 border border-green-200 rounded-md p-2.5">
                  <strong className="text-green-700">Waiver available:</strong> {truncate(journal.waiverPolicy, 120)}
                </div>
              )}
            </div>

            {/* Indexing */}
            {journal.indexingStatus && (
              <div className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-3">Indexing</h3>
                <div className="flex flex-wrap gap-2">
                  {journal.indexingStatus.split(',').map(idx => (
                    <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">
                      {idx.trim()}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-xs text-slate-400">
                  * We do not claim false indexing or impact factors
                </div>
              </div>
            )}

            {/* Open Access Policy */}
            {journal.openAccessPolicy && (
              <div className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-600" /> Open Access
                </h3>
                <p className="text-sm text-slate-600">{truncate(journal.openAccessPolicy, 200)}</p>
              </div>
            )}

            {/* Ethics */}
            <div className="bg-navy-50 border border-navy-200 rounded-xl p-5">
              <h3 className="font-semibold text-navy-900 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Ethics Statement
              </h3>
              <p className="text-xs text-navy-700">
                This journal follows COPE guidelines. No guaranteed acceptance. Peer review is independent of payment. No fake indexing or impact factor claims.
              </p>
              <Link href="/ethics" className="text-xs text-navy-600 font-medium hover:underline mt-2 inline-block">
                Read full ethics policy →
              </Link>
            </div>

            {/* Submit CTA */}
            <Link href={`/submit?journal=${journal.slug}`}>
              <Button className="w-full">
                <FileText className="w-4 h-4" />
                Submit Manuscript
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
