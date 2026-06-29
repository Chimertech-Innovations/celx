import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDateShort, getStatusColor, getStatusLabel } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { BookOpen, FileText, Users, DollarSign, Globe, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (!['SUPER_ADMIN', 'JOURNAL_ADMIN', 'SERVICE_TEAM'].includes(session.user.role)) redirect('/dashboard')

  const [
    totalUsers, totalManuscripts, totalArticles, totalJournals,
    recentManuscripts, recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.manuscript.count(),
    prisma.article.count({ where: { isPublished: true } }),
    prisma.journal.count({ where: { isActive: true } }),
    prisma.manuscript.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: { journal: { select: { abbreviation: true } }, submitter: { select: { name: true } } },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
  ])

  const statusCounts = await prisma.manuscript.groupBy({
    by: ['status'],
    _count: { id: true },
  })

  const statusMap = Object.fromEntries(statusCounts.map(s => [s.status, s._count.id]))

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm">Full platform overview and management</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: totalUsers, icon: Users, href: '/dashboard/admin/users', color: 'text-blue-600 bg-blue-50' },
          { label: 'Manuscripts', value: totalManuscripts, icon: FileText, href: '/dashboard/admin/manuscripts', color: 'text-amber-600 bg-amber-50' },
          { label: 'Published Articles', value: totalArticles, icon: Globe, href: '/dashboard/admin/articles', color: 'text-green-600 bg-green-50' },
          { label: 'Active Journals', value: totalJournals, icon: BookOpen, href: '/dashboard/admin/journals', color: 'text-teal-600 bg-teal-50' },
        ].map(stat => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Manuscript pipeline */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Manuscript Pipeline</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Submitted', status: 'SUBMITTED', color: 'bg-blue-50 text-blue-800' },
              { label: 'Tech Check', status: 'UNDER_TECHNICAL_CHECK', color: 'bg-yellow-50 text-yellow-800' },
              { label: 'Under Review', status: 'UNDER_REVIEW', color: 'bg-purple-50 text-purple-800' },
              { label: 'Decision', status: 'REVIEWS_COMPLETED', color: 'bg-orange-50 text-orange-800' },
              { label: 'Accepted', status: 'ACCEPTED', color: 'bg-green-50 text-green-800' },
              { label: 'Revision', status: 'REVISION_REQUESTED', color: 'bg-red-50 text-red-800' },
              { label: 'Production', status: 'IN_PRODUCTION', color: 'bg-cyan-50 text-cyan-800' },
              { label: 'Published', status: 'PUBLISHED', color: 'bg-emerald-50 text-emerald-800' },
            ].map(s => (
              <div key={s.status} className={`p-3 rounded-lg text-center ${s.color}`}>
                <div className="text-xl font-bold">{statusMap[s.status] || 0}</div>
                <div className="text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent manuscripts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle>Recent Manuscripts</CardTitle>
            <Link href="/dashboard/admin/manuscripts" className="text-xs text-navy-700 hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentManuscripts.map(ms => (
                <div key={ms.id} className="p-3 flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-slate-400">{ms.manuscriptId}</div>
                    <div className="text-sm font-medium text-slate-900 truncate">{ms.title}</div>
                    <div className="text-xs text-slate-400">{ms.submitter.name} · {ms.journal?.abbreviation}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${getStatusColor(ms.status)}`}>
                    {getStatusLabel(ms.status)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle>Recent Users</CardTitle>
            <Link href="/dashboard/admin/users" className="text-xs text-navy-700 hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentUsers.map(user => (
                <div key={user.id} className="p-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center text-navy-700 text-xs font-bold shrink-0">
                    {user.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-500 truncate">{user.email}</div>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded shrink-0">
                    {user.role.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick admin links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
          { href: '/dashboard/admin/journals', label: 'Manage Journals', icon: BookOpen },
          { href: '/dashboard/admin/announcements', label: 'Announcements', icon: Globe },
          { href: '/dashboard/admin/audit', label: 'Audit Log', icon: FileText },
        ].map(link => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href}>
              <div className="border border-slate-200 rounded-xl p-4 hover:shadow-sm hover:border-navy-200 transition-all flex items-center gap-3">
                <div className="w-9 h-9 bg-navy-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-navy-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">{link.label}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
