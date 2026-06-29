import Link from 'next/link'
import { BookOpen, Mail, Globe, FileText } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">CleX</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              A trusted, transparent, and ethical multi-journal scholarly publishing platform committed to open-access research dissemination.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Mail className="w-3.5 h-3.5" />
              <a href="mailto:editorial@clex.org" className="hover:text-slate-300 transition-colors">editorial@clex.org</a>
            </div>
          </div>

          {/* Journals */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Our Journals</h3>
            <ul className="space-y-2">
              {[
                { href: '/journals/journal-biomedical-translational-research', label: 'J. Biomedical Research' },
                { href: '/journals/journal-agricultural-veterinary-sciences', label: 'J. Agricultural Sciences' },
                { href: '/journals/journal-engineering-ai-applied-technologies', label: 'J. Engineering & AI' },
                { href: '/journals/journal-public-health-clinical-studies', label: 'J. Public Health' },
                { href: '/journals/student-journal-emerging-research', label: 'Student Journal' },
              ].map(j => (
                <li key={j.href}>
                  <Link href={j.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {j.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Authors */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">For Authors</h3>
            <ul className="space-y-2">
              {[
                { href: '/submit', label: 'Submit Manuscript' },
                { href: '/author-guidelines', label: 'Author Guidelines' },
                { href: '/apc-fees', label: 'APC & Fees' },
                { href: '/open-access', label: 'Open Access Policy' },
                { href: '/services', label: 'Author Services' },
                { href: '/reviewer-guidelines', label: 'Reviewer Guidelines' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Policies & Info</h3>
            <ul className="space-y-2">
              {[
                { href: '/ethics', label: 'Publication Ethics' },
                { href: '/peer-review-policy', label: 'Peer Review Policy' },
                { href: '/about', label: 'About CleX' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/articles', label: 'Browse Articles' },
                { href: '/search', label: 'Advanced Search' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ethics statement */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="bg-white/5 rounded-lg p-4 mb-6 text-xs text-slate-400 space-y-1">
            <p><strong className="text-slate-300">Ethics Notice:</strong> CleX does not guarantee acceptance. Peer review decisions are independent of payment. APC is charged only upon acceptance and according to our transparent fee policy. We do not make false indexing or impact factor claims. Payment for author services does not influence editorial decisions.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} CleX Research Publishing Platform. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>ISSN Portal</span>
              <span>CrossRef Member</span>
              <span>DOAJ Member</span>
              <span>Open Access</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
