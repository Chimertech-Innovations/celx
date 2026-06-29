import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDateShort, getArticleTypeLabel, truncate } from '@/lib/utils'
import { Globe, Search, FileText, Eye, Download } from 'lucide-react'

export const metadata = {
  title: 'Articles',
  description: 'Browse all open-access articles published in CleX journals.',
}

interface Props {
  searchParams: Promise<{ journal?: string; type?: string; q?: string; page?: string }>
}

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const perPage = 15
  const skip = (page - 1) * perPage

  const where: Record<string, unknown> = { isPublished: true }
  if (params.q) {
    where.OR = [
      { title: { contains: params.q, mode: 'insensitive' } },
      { abstract: { contains: params.q, mode: 'insensitive' } },
      { keywords: { contains: params.q, mode: 'insensitive' } },
    ]
  }
  if (params.journal) {
    const journal = await prisma.journal.findUnique({ where: { slug: params.journal }, select: { id: true } })
    if (journal) where.journalId = journal.id
  }
  if (params.type) where.articleType = params.type

  const [articles, total, journals] = await Promise.all([
    prisma.article.findMany({
      where,
      include: {
        authors: { take: 3, orderBy: { order: 'asc' } },
        journal: { select: { title: true, abbreviation: true, slug: true } },
        volume: { select: { number: true } },
        issue: { select: { number: true } },
      },
      orderBy: { publishedDate: 'desc' },
      skip,
      take: perPage,
    }),
    prisma.article.count({ where }),
    prisma.journal.findMany({ where: { isActive: true }, select: { slug: true, abbreviation: true, title: true } }),
  ])

  const totalPages = Math.ceil(total / perPage)

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-navy-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">Published Articles</h1>
          <p className="text-slate-300">{total} open-access articles available for free download and reading.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="border border-slate-200 rounded-xl p-5 sticky top-24">
              <h2 className="font-semibold text-slate-900 mb-4">Filter Articles</h2>
              <form method="GET">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Search</label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        name="q"
                        type="text"
                        defaultValue={params.q}
                        placeholder="Title, abstract, keyword..."
                        className="w-full pl-8 pr-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Journal</label>
                    <select
                      name="journal"
                      defaultValue={params.journal}
                      className="w-full py-2 px-3 text-sm border border-slate-300 rounded-md focus:outline-none"
                    >
                      <option value="">All Journals</option>
                      {journals.map(j => (
                        <option key={j.slug} value={j.slug}>{j.abbreviation || j.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Article Type</label>
                    <select
                      name="type"
                      defaultValue={params.type}
                      className="w-full py-2 px-3 text-sm border border-slate-300 rounded-md focus:outline-none"
                    >
                      <option value="">All Types</option>
                      {['ORIGINAL_RESEARCH', 'REVIEW_ARTICLE', 'CASE_REPORT', 'SHORT_COMMUNICATION', 'LETTER_TO_EDITOR'].map(t => (
                        <option key={t} value={t}>{getArticleTypeLabel(t)}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-navy-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-navy-800 transition-colors">
                    Apply Filters
                  </button>
                  {(params.q || params.journal || params.type) && (
                    <Link href="/articles" className="block text-center text-sm text-slate-500 hover:text-slate-700">
                      Clear filters
                    </Link>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Articles list */}
          <div className="lg:col-span-3">
            {articles.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No articles found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map(article => (
                  <div key={article.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-all bg-white">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                        <Globe className="w-3 h-3" /> Open Access
                      </span>
                      <span className="text-xs text-slate-400">{getArticleTypeLabel(article.articleType)}</span>
                      {article.volume && <span className="text-xs text-slate-400">Vol. {article.volume.number}{article.issue ? `, No. ${article.issue.number}` : ''}</span>}
                    </div>
                    <Link href={`/articles/${article.slug}`}>
                      <h3 className="font-semibold text-slate-900 hover:text-navy-800 mb-2 leading-snug">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-slate-500 mb-3">{truncate(article.abstract, 200)}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 pt-3 border-t border-slate-100">
                      <div>
                        <span className="font-medium text-slate-600">{article.authors.map(a => a.name).join(', ')}</span>
                        {article.authors.length === 3 && <span className="italic"> et al.</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">{article.journal?.abbreviation}</span>
                        <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {article.viewCount}</span>
                        <span className="flex items-center gap-0.5"><Download className="w-3 h-3" /> {article.downloadCount}</span>
                        <span>{formatDateShort(article.publishedDate)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <Link
                        key={p}
                        href={`/articles?${new URLSearchParams({ ...params, page: String(p) }).toString()}`}
                        className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                          p === page
                            ? 'bg-navy-900 text-white'
                            : 'border border-slate-300 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {p}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
