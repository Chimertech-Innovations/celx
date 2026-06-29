import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort, getStatusColor, getStatusLabel, truncate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import {
  FileText,
  PlusCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  TrendingUp,
  Bell,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Bookmark,
  Sparkles,
} from 'lucide-react'

export default async function AuthorDashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const [manuscripts, notifications, publishedCount] = await Promise.all([
    prisma.manuscript.findMany({
      where: { submitterId: session.user.id },
      include: {
        journal: { select: { abbreviation: true, title: true } },
        reviews: {
          where: { isSubmitted: true },
          select: { commentsToAuthor: true, recommendation: true, updatedAt: true },
        },
        editorialDecisions: {
          select: { decisionType: true, decisionLetter: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: 6,
    }),
    prisma.notification.findMany({
      where: { userId: session.user.id, isRead: false },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.article.count({
      where: {
        authors: { some: { userId: session.user.id } },
        isPublished: true,
      },
    }),
  ])

  const submitted = manuscripts.filter(m => m.status !== 'DRAFT').length
  const accepted = manuscripts.filter(m => m.status === 'ACCEPTED' || m.status === 'PUBLISHED').length
  const underReview = manuscripts.filter(m => m.status === 'UNDER_REVIEW').length
  const revisionRequested = manuscripts.filter(m => m.status === 'REVISION_REQUESTED').length

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      
      {/* ==================== WELCOME & SUBMISSION HERO BANNER ==================== */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-cover bg-center border border-navy-950 shadow-xl"
        style={{ backgroundImage: "linear-gradient(to right, rgba(0, 45, 98, 0.95) 0%, rgba(0, 45, 98, 0.7) 100%), url('/microbiology-hero.png')" }}
      >
        <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-white space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              CLEX Author Portal
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome Back, {session.user.name}
            </h1>
            <p className="text-slate-300 text-xs md:text-sm max-w-lg leading-relaxed">
              Track your active microbiology submissions, review editorial board decisions, and submit new research findings to our open-access journals.
            </p>
          </div>
          <Link href="/dashboard/author/submit" className="shrink-0">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all h-12 px-6 rounded-md">
              <PlusCircle className="w-5 h-5" />
              Submit New Manuscript
            </Button>
          </Link>
        </div>
      </div>

      {/* ==================== IMAGE-FILLED DASHBOARD STATS CARDS ==================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total Submissions', 
            value: submitted, 
            image: '/microbiology-hero.png',
            color: 'from-navy-900/90 to-navy-950/95'
          },
          { 
            label: 'Under Review', 
            value: underReview, 
            image: '/microbiology-hero.png',
            color: 'from-amber-900/90 to-amber-950/95' 
          },
          { 
            label: 'Revisions Requested', 
            value: revisionRequested, 
            image: '/microbiology-hero.png',
            color: 'from-blue-900/90 to-blue-950/95'
          },
          { 
            label: 'Published Papers', 
            value: publishedCount, 
            image: '/microbiology-hero.png',
            color: 'from-emerald-900/90 to-emerald-950/95'
          },
        ].map((stat, idx) => (
          <div 
            key={idx}
            className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm h-24 bg-cover bg-center transition-transform hover:-translate-y-0.5"
            style={{ backgroundImage: `url('${stat.image}')` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} p-4 flex flex-col justify-between text-white`}>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
                {stat.label}
              </span>
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ==================== RECENT SUBMISSIONS PORTLET ==================== */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <CardTitle className="text-base font-extrabold text-navy-950">Active Manuscripts</CardTitle>
                <p className="text-[11px] text-slate-400 mt-0.5">Showing latest manuscript submissions first</p>
              </div>
              <Link href="/dashboard/author/manuscripts" className="text-xs font-bold text-navy-900 hover:text-teal-600 transition-colors uppercase tracking-wider flex items-center gap-0.5">
                All Manuscripts <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="pt-6">
              {manuscripts.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-sm font-semibold text-slate-700">No active manuscripts found</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Get started by uploading your files, abstract, and pathogen research details.</p>
                  <Link href="/dashboard/author/submit" className="mt-4 inline-block">
                    <Button size="sm" className="bg-navy-900 hover:bg-navy-800 text-white text-xs h-9 px-4">
                      Submit Your First Paper
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {manuscripts.map(ms => {
                    const hasDecision = ms.editorialDecisions.length > 0;
                    const latestDecision = ms.editorialDecisions[0];
                    return (
                      <div key={ms.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-4">
                        {/* Upper row details */}
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded">
                                {ms.manuscriptId}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getStatusColor(ms.status)}`}>
                                {getStatusLabel(ms.status)}
                              </span>
                            </div>
                            <Link href={`/dashboard/author/manuscripts/${ms.id}`}>
                              <h4 className="text-sm font-bold text-navy-950 hover:text-teal-600 transition-colors leading-snug line-clamp-1">
                                {ms.title}
                              </h4>
                            </Link>
                            <span className="text-[10px] text-slate-400 block">
                              {ms.journal?.abbreviation} • Last Updated {formatDateShort(ms.updatedAt)}
                            </span>
                          </div>
                          
                          <Link href={`/dashboard/author/manuscripts/${ms.id}`}>
                            <Button size="sm" variant="outline" className="text-xs h-8 px-3 shrink-0">
                              <Eye className="w-3.5 h-3.5" />
                              Details
                            </Button>
                          </Link>
                        </div>

                        {/* Pipeline Stage Visualizer */}
                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            <span>Submission Pipeline</span>
                            <span className="text-navy-900">{getStatusLabel(ms.status)}</span>
                          </div>
                          
                          {/* 4-step pipeline bar */}
                          <div className="grid grid-cols-4 gap-1.5 h-2">
                            {/* Step 1: Submission */}
                            <div className={`rounded-full h-full ${
                              ms.status !== 'DRAFT' ? 'bg-navy-900' : 'bg-slate-200'
                            }`} />
                            
                            {/* Step 2: Under Review */}
                            <div className={`rounded-full h-full ${
                              ['UNDER_REVIEW', 'REVIEWS_COMPLETED', 'DECISION_PENDING', 'REVISION_REQUESTED', 'REVISED_MANUSCRIPT_SUBMITTED', 'ACCEPTED', 'PUBLISHED'].includes(ms.status) 
                                ? 'bg-navy-900' : 'bg-slate-200'
                            }`} />

                            {/* Step 3: Decision */}
                            <div className={`rounded-full h-full ${
                              ['ACCEPTED', 'REJECTED', 'PUBLISHED'].includes(ms.status) 
                                ? 'bg-navy-900' 
                                : ms.status === 'REVISION_REQUESTED' ? 'bg-amber-500 animate-pulse' : 'bg-slate-200'
                            }`} />

                            {/* Step 4: Publication */}
                            <div className={`rounded-full h-full ${
                              ms.status === 'PUBLISHED' ? 'bg-emerald-600' : 'bg-slate-200'
                            }`} />
                          </div>
                        </div>

                        {/* Reviewer / Editor Feedback Block */}
                        {(hasDecision || ms.reviews.length > 0) && (
                          <div className="p-3 bg-teal-50/50 rounded-lg border border-teal-100/50 text-[11px] space-y-2">
                            <div className="flex items-center gap-1.5 text-navy-950 font-bold">
                              <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                              Reviewer & Editor Feedback
                            </div>
                            
                            {/* Show decision letter if available */}
                            {hasDecision && (
                              <div className="text-slate-700">
                                <span className="font-semibold text-navy-900">Decision ({latestDecision.decisionType}): </span>
                                <span className="italic">"{truncate(latestDecision.decisionLetter, 120)}"</span>
                              </div>
                            )}

                            {/* Show reviews if no decision but reviews exist */}
                            {!hasDecision && ms.reviews.map((rev, idx) => (
                              <div key={idx} className="text-slate-600 pl-2 border-l border-teal-200">
                                <span className="font-semibold">Reviewer {idx + 1} ({rev.recommendation}): </span>
                                <span className="italic">"{truncate(rev.commentsToAuthor || '', 120)}"</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ==================== NOTIFICATIONS & RESOURCES PANEL ==================== */}
        <div className="space-y-6">
          {/* Notifications List */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-extrabold text-navy-950 flex items-center gap-2">
                <Bell className="w-4 h-4 text-teal-600" />
                Alerts
              </CardTitle>
              {notifications.length > 0 && (
                <span className="bg-red-500 text-white text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              {notifications.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">No new notifications</p>
              ) : (
                <div className="space-y-3">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3 bg-teal-50/50 rounded-lg border border-teal-100/50">
                      <div className="text-xs font-bold text-navy-950 mb-0.5">{n.title}</div>
                      <div className="text-[10px] text-slate-500 leading-normal line-clamp-2">{n.message}</div>
                      <div className="text-[9px] text-slate-400 mt-1">{formatDateShort(n.createdAt)}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wiley Author Advice Guide Card */}
          <Card className="border border-slate-200 bg-white overflow-hidden">
            <div 
              className="h-20 bg-cover bg-center relative"
              style={{ backgroundImage: "linear-gradient(to bottom, rgba(0, 45, 98, 0.4), rgba(0, 45, 98, 0.9)), url('/microbiology-hero.png')" }}
            >
              <div className="absolute bottom-2 left-4 text-white font-extrabold text-xs flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5 text-teal-300" />
                Wiley-Style Author Guide
              </div>
            </div>
            <CardContent className="pt-4 space-y-4">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Before submitting to our journals, please ensure your files match CLEX guidelines:
              </p>
              <div className="space-y-2 text-[10px] font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Manuscript in DOCX or PDF format
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Figures/Images in high-res PNG/TIFF format
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Structured abstract (max 250 words)
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Conflicts of interest fully disclosed
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <Link href="/author-guidelines" className="text-[10px] font-bold text-navy-900 hover:text-teal-600 transition-colors uppercase tracking-wider block text-center">
                  Read Detailed Guidelines →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </div>
  )
}

