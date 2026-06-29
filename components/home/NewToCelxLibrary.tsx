'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Dna, Star, X } from 'lucide-react'

interface JournalCoverData {
  title: string
  abbreviation: string
  coverColor: string
  issn: string
  editor: string
  impactFactor: string
  aims: string
  papers: string[]
}

const mockJournals: JournalCoverData[] = [
  {
    title: 'CELX Microbiology Letters',
    abbreviation: 'CELX Microbiol Lett',
    coverColor: 'from-[#065f46] to-[#047857]', // Emerald
    issn: '2943-118X',
    editor: 'Dr. Amina Varghese',
    impactFactor: '4.8',
    aims: 'Rapid publication of concise, high-impact research letters covering bacterial physiology, gene structures, and virological reports.',
    papers: [
      'CRISPR-Cas9 Editing of Multidrug-Resistant Klebsiella',
      'Metagenomic Sequencing of Wastewater Aeration Tanks'
    ]
  },
  {
    title: 'Journal of Pathogen Research',
    abbreviation: 'J Pathog Res',
    coverColor: 'from-[#991b1b] to-[#b91c1c]', // Crimson
    issn: '2943-1198',
    editor: 'Dr. Karthik Raman',
    impactFactor: '5.2',
    aims: 'Focusing on pathogen virulence mechanisms, host immune defenses, vaccine vectors, and antimicrobial drug development.',
    papers: [
      'Inhibition of Biofilm Formation in Staphylococcus aureus',
      'Monoclonal Antibody Neutralization of Emerging Influenza Strains'
    ]
  },
  {
    title: 'Metagenomics & Applied Biotechnology',
    abbreviation: 'Metagenomics Appl Biotechnol',
    coverColor: 'from-[#1e3a8a] to-[#1d4ed8]', // Cobalt Blue
    issn: '2943-1201',
    editor: 'Dr. Rgul',
    impactFactor: '6.1',
    aims: 'Highlighting metagenomic dataset assemblies, metabolic engineering, and synthetic microbial communities for bioremediation.',
    papers: [
      'Chimeric Pseudomonas Strains for Heavy Oil Bio-degradation',
      'Longitudinal Shift of Gut Microbiome in Type 2 Diabetes'
    ]
  },
  {
    title: 'Clinical Diagnostic Bacteriology',
    abbreviation: 'Clin Diagn Bacteriol',
    coverColor: 'from-[#854d0e] to-[#a16207]', // Gold/Amber
    issn: '2943-121X',
    editor: 'Prof. Elena Vasquez',
    impactFactor: '4.5',
    aims: 'Dedicated to rapid clinical assays, point-of-care PCR diagnostics, and clinical outcomes of drug-resistant pathogens.',
    papers: [
      'Rapid MALDI-TOF Screening of ESBL Gram-Negative Bacilli',
      'Multiplex Diagnostics of Respiratory Infections in Clinic Cohorts'
    ]
  },
  {
    title: 'Environmental Virology Reviews',
    abbreviation: 'Environ Virol Rev',
    coverColor: 'from-[#581c87] to-[#6b21a8]', // Purple
    issn: '2943-1228',
    editor: 'Dr. Yuki Tanaka',
    impactFactor: '5.5',
    aims: 'Reviewing bacteriophages, marine viral ecology, zoonotic viral transmissions, and environmental monitoring systems.',
    papers: [
      'Bacteriophage Therapy in Agricultural Soils: Opportunities',
      'Wastewater-Based Epidemiology Metrics for Enterovirus Outbreaks'
    ]
  }
]

export default function NewToCelxLibrary() {
  const [activeJournal, setActiveJournal] = useState<JournalCoverData | null>(null)
  const { data: session } = useSession()
  const router = useRouter()

  const handleJournalClick = (journal: JournalCoverData) => {
    if (!session) {
      router.push('/login')
    } else {
      setActiveJournal(journal)
    }
  }

  return (
    <section className="bg-[#050c18] border-t border-slate-900 py-16 text-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white font-serif">
            New to CELX Online Library
          </h3>
          <span className="text-xs text-slate-450 font-medium">
            Click on a cover to inspect recent articles, metrics, and aims & scope.
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockJournals.map(journal => (
            <div
              key={journal.title}
              onClick={() => handleJournalClick(journal)}
              className="group cursor-pointer flex flex-col items-center gap-3 transition-transform hover:-translate-y-2 duration-300"
            >
              {/* Journal Cover Canvas */}
              <div className={`w-36 h-48 rounded-md shadow-2xl border border-slate-800/80 relative bg-gradient-to-br ${journal.coverColor} p-4 flex flex-col justify-between text-white overflow-hidden`}>
                <div className="space-y-1">
                  <span className="text-[7px] tracking-widest font-mono text-slate-350 block uppercase">
                    CELX Open Access
                  </span>
                  <h4 className="text-[11px] font-black leading-tight tracking-tight uppercase line-clamp-3">
                    {journal.title}
                  </h4>
                </div>
                
                {/* Miniature decorative abstract cells/DNA */}
                <div className="absolute top-1/2 left-0 right-0 h-10 bg-white/10 skew-y-12 flex items-center justify-center">
                  <Dna className="w-8 h-8 text-white/10 rotate-12" />
                </div>

                <div className="flex items-end justify-between border-t border-white/20 pt-2 mt-auto">
                  <span className="text-[8px] font-bold tracking-widest uppercase">CELX</span>
                  <span className="text-[7px] font-mono opacity-80">{journal.impactFactor} IF</span>
                </div>
              </div>

              {/* Journal Title underneath cover */}
              <span className="text-xs font-extrabold text-center text-slate-350 group-hover:text-teal-400 transition-colors line-clamp-1 max-w-[144px]">
                {journal.title}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* ==================== INTERACTIVE JOURNAL INFORMATION MODAL ==================== */}
      {activeJournal && (
        <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1528] border border-slate-800 text-white rounded-2xl p-6 md:p-8 max-w-xl w-full relative animate-scale-up shadow-[0_20px_50px_rgba(20,_184,_166,_0.3)]">
            {/* Close Button */}
            <button 
              onClick={() => setActiveJournal(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 p-1.5 rounded-full hover:bg-slate-850 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1 bg-teal-500/20 text-teal-350 border border-teal-500/30 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-2">
                  <Star className="w-3 h-3 text-teal-400 fill-teal-400" />
                  Impact Factor: {activeJournal.impactFactor}
                </span>
                <h3 className="text-xl font-extrabold text-white leading-snug">{activeJournal.title}</h3>
                <span className="text-xs text-slate-400 font-mono block mt-1">ISSN: {activeJournal.issn} | Abbrev: {activeJournal.abbreviation}</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-350 uppercase tracking-wide block">Aims & Scope:</span>
                <p className="text-slate-405 leading-relaxed">{activeJournal.aims}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-900/50 p-3 rounded-lg border border-slate-850">
                <div>
                  <span className="text-slate-450 block font-semibold">Chief Editor:</span>
                  <span className="font-bold text-teal-400">{activeJournal.editor}</span>
                </div>
                <div>
                  <span className="text-slate-450 block font-semibold">Indexing Status:</span>
                  <span className="font-bold text-white">Google Scholar, Crossref</span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-350 uppercase tracking-wide block">Sample Articles:</span>
                <div className="space-y-2">
                  {activeJournal.papers.map((paper, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start p-2 rounded bg-slate-900/30 hover:bg-slate-900/60 border border-slate-850/60 transition-colors font-sans">
                      <span className="w-4 h-4 rounded-full bg-teal-500/10 text-teal-400 text-[10px] flex items-center justify-center font-bold mt-0.5 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-medium text-slate-300 leading-snug hover:text-teal-400 transition-colors cursor-pointer">
                        {paper}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Link href={`/dashboard/author/submit?journal=${activeJournal.abbreviation.toLowerCase().replace(/ /g, '-')}`} className="flex-1">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold h-10 rounded-lg shadow-md">
                    Submit Manuscript
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveJournal(null)}
                  className="border-slate-800 text-slate-300 hover:bg-slate-850 h-10 px-4 rounded-lg bg-transparent text-xs"
                >
                  Close Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
