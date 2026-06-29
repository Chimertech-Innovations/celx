import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getArticleTypeLabel, formatDateShort } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Search as SearchIcon, BookOpen, User, FileText } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

const mockJournalsList = [
  { id: 'mj-1', title: 'CELX Microbiology Letters', slug: 'celx-microbiology-letters', abbreviation: 'CELX Microbiol Lett' },
  { id: 'mj-2', title: 'Journal of Pathogen Research', slug: 'journal-pathogen-research', abbreviation: 'J Pathog Res' },
  { id: 'mj-3', title: 'Metagenomics & Applied Biotechnology', slug: 'metagenomics-applied-biotechnology', abbreviation: 'Metagenomics Appl Biotechnol' },
  { id: 'mj-4', title: 'Clinical Diagnostic Bacteriology', slug: 'clinical-diagnostic-bacteriology', abbreviation: 'Clin Diagn Bacteriol' },
  { id: 'mj-5', title: 'Environmental Virology Reviews', slug: 'environmental-virology-reviews', abbreviation: 'Environ Virol Rev' }
]

const mockArticlesList = [
  {
    id: 'ma-1',
    title: 'Chimeric Pseudomonas Strains for Heavy Oil Bio-degradation',
    slug: 'chimeric-pseudomonas-heavy-oil-biodegradation',
    abstract: 'Development of chimeric Pseudomonas putida strains optimized for high saline and low temperature bioremediation of hydrocarbon spills.',
    articleType: 'RESEARCH_ARTICLE',
    publishedDate: new Date('2025-04-10'),
    authors: [{ name: 'Dr. Rgul' }, { name: 'Dr. Sarah Chen' }],
    journal: { abbreviation: 'Metagenomics Appl Biotechnol' }
  },
  {
    id: 'ma-2',
    title: 'Metabolic Pathway Engineering in Bioreactor Upscaling',
    slug: 'metabolic-pathway-engineering-bioreactor-upscaling',
    abstract: 'Scaling constraints and gene-circuit stability when running chimeric industrial microbial processes in 500L stirred bioreactors.',
    articleType: 'RESEARCH_ARTICLE',
    publishedDate: new Date('2025-03-24'),
    authors: [{ name: 'Dr. Rgul' }],
    journal: { abbreviation: 'Metagenomics Appl Biotechnol' }
  },
  {
    id: 'ma-3',
    title: 'CRISPR-Cas9 Editing of Multidrug-Resistant Klebsiella',
    slug: 'crispr-cas9-editing-multidrug-resistant-klebsiella',
    abstract: 'Knockout strategies targeting plasmid-borne blaKPC resistance determinants in clinical isolates of K. pneumoniae.',
    articleType: 'RESEARCH_ARTICLE',
    publishedDate: new Date('2025-02-15'),
    authors: [{ name: 'Dr. Amina Varghese' }, { name: 'Dr. Raj Patel' }],
    journal: { abbreviation: 'CELX Microbiol Lett' }
  },
  {
    id: 'ma-4',
    title: 'Metagenomic Sequencing of Wastewater Aeration Tanks',
    slug: 'metagenomic-sequencing-wastewater-aeration-tanks',
    abstract: 'High-throughput metagenomic analysis mapping resistance transfer dynamics within sludge treatment pools.',
    articleType: 'RESEARCH_ARTICLE',
    publishedDate: new Date('2025-01-20'),
    authors: [{ name: 'Dr. Amina Varghese' }],
    journal: { abbreviation: 'CELX Microbiol Lett' }
  },
  {
    id: 'ma-5',
    title: 'Inhibition of Biofilm Formation in Staphylococcus aureus',
    slug: 'inhibition-biofilm-formation-staphylococcus-aureus',
    abstract: 'Novel bioactive small molecules target cell-to-cell signaling to disrupt agr-mediated quorum sensing pathways.',
    articleType: 'RESEARCH_ARTICLE',
    publishedDate: new Date('2025-03-05'),
    authors: [{ name: 'Dr. Karthik Raman' }],
    journal: { abbreviation: 'J Pathog Res' }
  },
  {
    id: 'ma-6',
    title: 'Rapid MALDI-TOF Screening of ESBL Gram-Negative Bacilli',
    slug: 'rapid-maldi-tof-screening-esbl-bacilli',
    abstract: 'Clinical evaluation of a direct detection protocol for extended-spectrum beta-lactamases from positive blood cultures.',
    articleType: 'RESEARCH_ARTICLE',
    publishedDate: new Date('2025-02-28'),
    authors: [{ name: 'Dr. Karthik Raman' }, { name: 'Prof. Elena Vasquez' }],
    journal: { abbreviation: 'Clin Diagn Bacteriol' }
  }
]

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams
  const query = resolvedParams.q || ''
  const queryLower = query.toLowerCase()

  // Fetch journals from DB
  const dbJournals = await prisma.journal.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { slug: { contains: query } }
      ]
    },
    take: 5
  })

  // Fetch articles from DB
  const dbArticles = await prisma.article.findMany({
    where: {
      isPublished: true,
      OR: [
        { title: { contains: query } },
        { abstract: { contains: query } },
        {
          authors: {
            some: {
              name: { contains: query }
            }
          }
        }
      ]
    },
    include: {
      authors: true,
      journal: { select: { abbreviation: true } }
    },
    take: 15
  })

  // Filter mock journals
  const matchedMockJournals = queryLower 
    ? mockJournalsList.filter(j => 
        j.title.toLowerCase().includes(queryLower) || 
        j.slug.toLowerCase().includes(queryLower) ||
        j.abbreviation.toLowerCase().includes(queryLower)
      )
    : []

  // Filter mock articles
  const matchedMockArticles = queryLower 
    ? mockArticlesList.filter(a => 
        a.title.toLowerCase().includes(queryLower) || 
        a.abstract.toLowerCase().includes(queryLower) ||
        a.authors.some(auth => auth.name.toLowerCase().includes(queryLower)) ||
        a.journal.abbreviation.toLowerCase().includes(queryLower)
      )
    : []

  // Merge results
  const journals = [...dbJournals, ...matchedMockJournals]
  const articles = [...dbArticles, ...matchedMockArticles]

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Search Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-black text-navy-950 font-serif">Search CELX Registry</h1>
          <p className="text-sm text-slate-500">
            Query across all publications, clinical authors, and indexing journals.
          </p>

          <form action="/search" method="GET" className="bg-white rounded-xl p-1.5 flex gap-2 shadow-md border border-slate-200">
            <div className="flex-1 relative flex items-center">
              <SearchIcon className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                name="q"
                type="text"
                defaultValue={query}
                placeholder="Search articles, authors, or journals..."
                className="w-full h-12 bg-transparent text-slate-900 pl-12 pr-4 text-sm focus:outline-none placeholder:text-slate-450"
              />
            </div>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 px-6 rounded-lg">
              Search
            </Button>
          </form>
        </div>

        {/* Results Info */}
        {query && (
          <div className="text-xs text-slate-450 font-semibold uppercase tracking-wider">
            Showing results for "{query}"
          </div>
        )}

        {/* Journals Found */}
        {journals.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-extrabold text-navy-950 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              Matching Journals ({journals.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journals.map(journal => (
                <Link
                  key={journal.id}
                  href={`/journals/${journal.slug}`}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-sm block"
                >
                  <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1">{journal.title}</h3>
                  <span className="text-[10px] text-slate-450 block mt-1 font-mono uppercase">{journal.abbreviation || 'CELX Journal'}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles Found */}
        <div className="space-y-4">
          <h2 className="text-base font-extrabold text-navy-950 uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600" />
            Research Articles ({articles.length})
          </h2>

          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map(article => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md block space-y-2.5 transition-shadow"
                >
                  <div className="flex gap-2 items-center">
                    <span className="bg-teal-50 text-teal-700 text-[9px] font-bold px-2 py-0.5 rounded border border-teal-150 uppercase tracking-wider">
                      Open Access
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {getArticleTypeLabel(article.articleType)}
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-extrabold text-slate-900 leading-snug line-clamp-2 hover:text-teal-600 transition-colors font-serif">
                    {article.title}
                  </h3>

                  <div className="flex justify-between items-center text-[10px] text-slate-450 font-semibold border-t border-slate-100 pt-2">
                    <span className="truncate max-w-[280px]">
                      {article.authors.map(a => a.name).join(', ')}
                    </span>
                    <span>
                      {article.journal?.abbreviation} • {formatDateShort(article.publishedDate)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs leading-relaxed">
              No matching articles found. Try searching for a broader term like "Microbial" or specific authors like "Rgul".
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
