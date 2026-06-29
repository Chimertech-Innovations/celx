'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Bell,
  Search,
} from 'lucide-react'

const journals = [
  { href: '/journals/journal-biomedical-translational-research', label: 'J. Biomedical & Translational Research' },
  { href: '/journals/journal-agricultural-veterinary-sciences', label: 'J. Agricultural & Veterinary Sciences' },
  { href: '/journals/journal-engineering-ai-applied-technologies', label: 'J. Engineering, AI & Applied Technologies' },
  { href: '/journals/journal-public-health-clinical-studies', label: 'J. Public Health & Clinical Studies' },
  { href: '/journals/student-journal-emerging-research', label: 'Student J. of Emerging Research' },
]

const services = [
  { href: '/services/english-editing', label: 'English Language Editing' },
  { href: '/services/statistical-analysis', label: 'Statistical Analysis' },
  { href: '/services/schematic-diagram', label: 'Schematic Diagram Design' },
]

const policies = [
  { href: '/ethics', label: 'Publication Ethics' },
  { href: '/peer-review-policy', label: 'Peer Review Policy' },
  { href: '/open-access', label: 'Open Access Policy' },
  { href: '/apc-fees', label: 'APC & Fees' },
]

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050c18] border-b border-slate-900 shadow-md text-white">
      {/* ==================== TOP UTILITY BAR ==================== */}
      <div className="bg-[#030810] text-slate-400 text-[10px] py-2 border-b border-slate-900/60 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-teal-400 transition-colors">About CELX</Link>
            <span className="text-slate-700">|</span>
            <Link href="/author-guidelines" className="hover:text-teal-400 transition-colors">For Authors</Link>
            <span className="text-slate-700">|</span>
            <Link href="/reviewer-guidelines" className="hover:text-teal-400 transition-colors">For Reviewers</Link>
            <span className="text-slate-700">|</span>
            <span className="hover:text-teal-400 cursor-pointer transition-colors">Editorial Board</span>
            <span className="text-slate-700">|</span>
            <Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-teal-400 cursor-pointer flex items-center gap-0.5 transition-colors">
              🌐 English <ChevronDown className="w-3 h-3" />
            </span>
            <span className="text-slate-700">|</span>
            <Link href="/contact" className="hover:text-teal-400 transition-colors">Support</Link>
            <span className="text-slate-700">|</span>
            <Link href="/register" className="hover:text-teal-400 transition-colors">Register</Link>
          </div>
        </div>
      </div>

      {/* ==================== MAIN HEADER NAVIGATION ==================== */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col shrink-0 group">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center group-hover:bg-teal-400 transition-colors">
                <BookOpen className="w-4 h-4 text-[#050c18]" />
              </div>
              <span className="font-extrabold text-white text-xl tracking-tight">
                CEL<span className="text-teal-400 font-extrabold">X</span>
              </span>
            </div>
            <span className="text-[8px] text-slate-400 font-medium tracking-tight uppercase -mt-0.5">
              International Journal of Microbiology
            </span>
          </Link>

          {/* Desktop Navigation Link Items */}
          <nav className="hidden lg:flex items-center gap-1">
            
            {/* Journals Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-3 py-2 text-xs font-bold transition-colors ${
                  isActive('/journals') ? 'text-teal-400' : 'text-slate-200 hover:text-teal-400'
                }`}
              >
                Journals
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-72 bg-[#050c18] rounded-lg shadow-2xl border border-slate-800 py-1 hidden group-hover:block hover:block">
                <Link href="/journals" className="block px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 border-b border-slate-800">
                  All Journals →
                </Link>
                {journals.map(j => (
                  <Link key={j.href} href={j.href} className="block px-4 py-2 text-[11px] text-slate-300 hover:bg-slate-800 hover:text-teal-400">
                    {j.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Articles Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-3 py-2 text-xs font-bold transition-colors ${
                  isActive('/articles') ? 'text-teal-400' : 'text-slate-200 hover:text-teal-400'
                }`}
              >
                Articles
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#050c18] rounded-lg shadow-2xl border border-slate-800 py-1 hidden group-hover:block hover:block">
                <Link href="/articles" className="block px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 border-b border-slate-800">
                  Latest Research
                </Link>
                <Link href="/articles?type=REVIEW_ARTICLE" className="block px-4 py-2 text-[11px] text-slate-300 hover:bg-slate-800 hover:text-teal-400">
                  Review Articles
                </Link>
                <Link href="/articles?type=CASE_REPORT" className="block px-4 py-2 text-[11px] text-slate-300 hover:bg-slate-800 hover:text-teal-400">
                  Case Reports
                </Link>
              </div>
            </div>

            <Link
              href="/search?q=author"
              className="px-3 py-2 text-xs font-bold text-slate-200 hover:text-teal-400 transition-colors"
            >
              Authors
            </Link>

            <span
              className="px-3 py-2 text-xs font-bold text-slate-200 hover:text-teal-400 cursor-pointer transition-colors"
            >
              Collections
            </span>

            <span
              className="px-3 py-2 text-xs font-bold text-slate-200 hover:text-teal-400 cursor-pointer transition-colors"
            >
              News & Events
            </span>

            {/* Search Loupe Icon */}
            <Link href="/search" className="p-2 text-slate-200 hover:text-teal-400 transition-colors">
              <Search className="w-4 h-4" />
            </Link>

          </nav>

          {/* Right Call-To-Actions (CTA) + Auth Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {session?.user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-200 rounded-md hover:bg-slate-800 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-[#050c18] text-[10px] font-extrabold">
                    {session.user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="max-w-24 truncate">{session.user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>
                <div className="absolute top-full right-0 mt-1 w-52 bg-[#050c18] rounded-lg shadow-2xl border border-slate-800 py-1 hidden group-hover:block">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <div className="text-xs font-bold text-white truncate">{session.user.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{session.user.email}</div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-200 hover:bg-slate-850 hover:text-teal-400"
                  >
                    <LayoutDashboard className="w-4 h-4 text-teal-400" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-400 hover:bg-red-950/20"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent text-xs h-9 px-4 font-semibold rounded-md">
                    Login
                  </Button>
                </Link>
                <Link href="/dashboard/author/submit">
                  <Button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-9 px-4 font-bold rounded-md shadow-sm">
                    Submit Manuscript
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-slate-200 hover:bg-slate-800 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-900 bg-[#050c18]">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link href="/journals" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800 rounded-md">Journals</Link>
            <Link href="/articles" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800 rounded-md">Articles</Link>
            <Link href="/search" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800 rounded-md">Search</Link>
            <span className="block px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800 cursor-pointer rounded-md">Collections</span>
            <span className="block px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800 cursor-pointer rounded-md">News & Events</span>
            <div className="pt-3 border-t border-slate-850 space-y-2">
              {session?.user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full border-slate-800 text-white hover:bg-slate-800 text-xs">Dashboard</Button>
                  </Link>
                  <Button variant="ghost" className="w-full text-red-400 hover:bg-red-950/20 text-xs" onClick={() => signOut({ callbackUrl: '/' })}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 text-xs">Login</Button>
                  </Link>
                  <Link href="/dashboard/author/submit" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold">Submit Manuscript</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

