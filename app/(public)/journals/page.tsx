import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/index'
import { BookOpen, Users, FileText, Clock, DollarSign, ChevronRight, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Journals',
  description: 'Browse all CleX peer-reviewed open-access journals across biomedical, agricultural, engineering, and public health sciences.',
}

export const dynamic = 'force-dynamic'

export default async function JournalsPage() {
  const journals = await prisma.journal.findMany({
    where: { isActive: true },
    include: {
      editorInChief: { select: { name: true } },
      _count: { select: { articles: true, manuscripts: true } },
    },
    orderBy: { title: 'asc' },
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-navy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-sm font-medium text-teal-400 uppercase tracking-wider mb-2">Our Portfolio</div>
          <h1 className="text-4xl font-bold mb-4">Academic Journals</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Five peer-reviewed, open-access journals spanning biomedical sciences, agriculture, engineering, and public health. All journals follow COPE ethical guidelines.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {journals.map((journal) => (
            <div key={journal.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all bg-white">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {journal.issn && (
                        <span className="text-xs text-slate-500 font-mono">ISSN: {journal.issn}</span>
                      )}
                      {journal.eissn && (
                        <span className="text-xs text-slate-500 font-mono">e-ISSN: {journal.eissn}</span>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        <Globe className="w-3 h-3" />
                        Open Access
                      </span>
                    </div>

                    <Link href={`/journals/${journal.slug}`}>
                      <h2 className="text-xl font-bold text-slate-900 hover:text-navy-800 transition-colors mb-2">
                        {journal.title}
                      </h2>
                    </Link>

                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{journal.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      {journal.editorInChief && (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>EIC: {journal.editorInChief.name}</span>
                        </div>
                      )}
                      {journal.reviewTimeline && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span>Review: {journal.reviewTimeline}</span>
                        </div>
                      )}
                      {journal.apcFee !== null && (
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-slate-400" />
                          <span>APC: ${journal.apcFee}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span>{journal._count.articles} articles</span>
                      </div>
                    </div>

                    {journal.indexingStatus && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {journal.indexingStatus.split(',').map(idx => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {idx.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:w-40 shrink-0">
                    <Link href={`/journals/${journal.slug}`}>
                      <Button className="w-full" size="sm">
                        View Journal <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/submit?journal=${journal.slug}`}>
                      <Button variant="outline" className="w-full" size="sm">
                        Submit
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
