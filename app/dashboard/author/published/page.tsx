import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { Button } from '@/components/ui/button'
import { BookOpen, ExternalLink, Download, Eye } from 'lucide-react'

export const metadata = { title: 'Published Articles' }

export default async function PublishedArticlesPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  // Find articles where the user is an author
  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
      authors: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      journal: { select: { title: true, abbreviation: true } },
      authors: true,
    },
    orderBy: { publishedDate: 'desc' },
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Published Articles</h1>
        <p className="text-slate-500 text-sm">Your peer-reviewed research publications on the CleX platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-600" />
            My Publications ({articles.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {articles.length === 0 ? (
            <div className="p-8 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
              <BookOpen className="w-10 h-10 text-slate-400 opacity-60" />
              <p>You do not have any published articles yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {articles.map(art => (
                <div key={art.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                        {art.articleType.replace(/_/g, ' ')}
                      </span>
                      {art.doi && <span className="text-xs text-slate-400 font-mono">DOI: {art.doi}</span>}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{art.title}</h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span>{art.journal?.title}</span>
                      <span>·</span>
                      <span>Published: {art.publishedDate ? formatDateShort(art.publishedDate) : 'N/A'}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      Authors: {art.authors.map(a => a.name).join(', ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-xs text-right text-slate-500 hidden md:block">
                      <div><span className="font-semibold text-slate-700">{art.viewCount}</span> views</div>
                      <div><span className="font-semibold text-slate-700">{art.downloadCount}</span> downloads</div>
                    </div>
                    <Link href={`/articles/${art.slug}`} target="_blank">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                        View Article
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
