'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, User, BookOpen, Star, Mail, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AuthorData {
  name: string
  role: string
  expertise: string
  image: string
  bio: string
  publications: string[]
}

const mockAuthors: AuthorData[] = [
  {
    name: 'Dr. Ragul',
    role: 'Chimertech CEO', 
    expertise: 'Expert in Industrial Microbiology and Bioprocess Engineering',
    image: '/Dr Ragul.jpg.jpeg',
    bio: 'Dr. Ragul is the CEO of Chimertech and a pioneer in metabolic engineering. His research focuses on creating synthetic bacterial strains optimized for oil degradation and heavy metal bioremediation in marine ecosystems.',
    publications: [
      'Chimeric Pseudomonas Strains for Heavy Oil Bio-degradation',
      'Metabolic Pathway Engineering in Bioreactor Upscaling'
    ]
  },
  {
    name: 'Prof. Steven Langford',
    role: 'Professor in Statistics',
    expertise: 'Expertise in Mathematical Sciences',
    image: '/WhatsApp Image 2026-06-27 at 7.20.52 PM.jpeg',
    bio: 'Head, School of Mathematical and Physical Sciences UTS',
    publications: [
      'Multiplex Diagnostics of Respiratory Infections in Clinic Cohorts',
      'Plasmids and Resistance Mapping in Hospital Outbreaks'
    ]
  },
  {
    name: 'Dr. Saravanan',
    role: 'Clinical Microbiology Specialist',
    expertise: 'Expert in Infectious Diseases Diagnostics',
    image: '/WhatsApp Image 2026-06-27 at 7.19.31 PM.jpeg',
    bio: 'Antimicrobial Resistance (AMR) | Nanotheranostics Materials | Smart 3D bioprinting | World’s Top 2% Scientist  (Stanford Univ.) | TANSA Award for Medical Science—2023 | Recipient of Talant R VISA from China.',
    publications: [
      'Inhibition of Biofilm Formation in Staphylococcus aureus',
      'Rapid MALDI-TOF Screening of ESBL Gram-Negative Bacilli'
    ]
  },
  {
    name: 'Prof. Steven Langford',
    role: 'Professor in Statistics',
    expertise: 'Expertise in Mathematical Sciences',
    image: '/WhatsApp Image 2026-06-27 at 7.20.52 PM.jpeg',
    bio: 'Head, School of Mathematical and Physical Sciences UTS',
    publications: [
      'Multiplex Diagnostics of Respiratory Infections in Clinic Cohorts',
      'Plasmids and Resistance Mapping in Hospital Outbreaks'
    ]
  },
  {
    name: 'Dr. Yuki Tanaka',
    role: 'Marine Virology Specialist',
    expertise: 'Phage Therapy, Ocean Virions & Virology Ecology',
    image: '/dr-karthik.png',
    bio: 'Dr. Yuki Tanaka is an oceanography researcher examining marine viral ecology, bacteriophage applications in agriculture, and wastewater virus indicators.',
    publications: [
      'Bacteriophage Therapy in Agricultural Soils: Opportunities',
      'Wastewater-Based Epidemiology Metrics for Enterovirus Outbreaks'
    ]
  }
]

export default function FeaturedAuthorsSection() {
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorData | null>(null)
  const [showAllList, setShowAllList] = useState(false)

  const handleAuthorClick = (author: AuthorData) => {
    setSelectedAuthor(author)
  }

  return (
    <div className="space-y-8">
      {/* Authors Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl lg:text-2xl font-black text-navy-950 uppercase tracking-widest">
          Featured Authors
        </h2>
        <button 
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setShowAllList(true)
          }}
          className="text-xs md:text-sm font-extrabold text-teal-650 hover:text-teal-700 transition-colors uppercase tracking-wider cursor-pointer px-4 py-2 bg-transparent hover:bg-slate-100 rounded-lg border border-transparent"
        >
          View all Authors →
        </button>
      </div>

      {/* Main 3 Featured Authors cards grid - LARGE SCALE DISPLAY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {mockAuthors.slice(0, 3).map(author => (
          <div 
            key={author.name} 
            onClick={(e) => {
              e.stopPropagation()
              handleAuthorClick(author)
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col items-center text-center justify-between hover:shadow-xl hover:border-teal-300 transition-all duration-300 cursor-pointer group"
          >
            <div className="space-y-4 flex flex-col items-center">
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border border-slate-250 transition-transform group-hover:scale-108 duration-300 shadow-md">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pt-2">
                <h4 className="text-base md:text-lg lg:text-xl font-black text-slate-900 leading-tight group-hover:text-teal-650 transition-colors">
                  {author.name}
                </h4>
                <span className="text-xs text-slate-400 font-semibold block mt-1">{author.role}</span>
              </div>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-4">
                {author.expertise}
              </p>
            </div>
            <div className="mt-6">
              <span className="bg-teal-50 text-teal-750 border border-teal-200 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase">
                Top Author
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ==================== MODAL: ALL AUTHORS LIST ==================== */}
      {showAllList && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1528] border border-slate-800 text-white rounded-2xl p-6 md:p-8 max-w-2xl w-full relative animate-scale-up shadow-[0_20px_50px_rgba(20,_184,_166,_0.3)]">
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setShowAllList(false)
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900 border border-slate-850 p-1.5 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-wider">All Indexed Authors</h3>
                <span className="text-xs text-slate-450 block mt-1">CELX Publishing Platform Registry</span>
              </div>

              {/* Scrollable list */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                {mockAuthors.map(author => (
                  <div 
                    key={author.name}
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowAllList(false)
                      setSelectedAuthor(author)
                    }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-850 hover:border-teal-400 hover:bg-slate-900/80 transition-all cursor-pointer group"
                  >
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-slate-800 shrink-0">
                      <Image
                        src={author.image}
                        alt={author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-teal-450 transition-colors">
                        {author.name}
                      </h4>
                      <p className="text-xs text-slate-450 truncate">{author.role}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{author.expertise}</p>
                    </div>
                    <span className="text-[10px] text-teal-450 font-bold border border-teal-500/20 bg-teal-500/5 px-2.5 py-0.5 rounded">
                      Profile
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: INDIVIDUAL AUTHOR PROFILE DETAILS ==================== */}
      {selectedAuthor && (
        <div className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1528] border border-slate-800 text-white rounded-2xl p-6 md:p-8 max-w-xl w-full relative animate-scale-up shadow-[0_20px_50px_rgba(20,_184,_166,_0.35)]">
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setSelectedAuthor(null)
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900 border border-slate-850 p-1.5 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border border-slate-800 shadow-md">
                  <Image
                    src={selectedAuthor.image}
                    alt={selectedAuthor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="bg-teal-500/10 text-teal-350 border border-teal-500/20 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Verified Researcher
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight mt-1">{selectedAuthor.name}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{selectedAuthor.role}</p>
                </div>
              </div>

              {/* Bio description */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-350 uppercase tracking-wide block">Biography & Background:</span>
                <p className="text-slate-400 leading-relaxed">{selectedAuthor.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-900/40 p-3 rounded-lg border border-slate-850">
                <div>
                  <span className="text-slate-450 block font-semibold">Specialization:</span>
                  <span className="font-bold text-teal-400">{selectedAuthor.expertise.split(' in ')[1] || selectedAuthor.role}</span>
                </div>
                <div>
                  <span className="text-slate-455 block font-semibold">Indexing Authority:</span>
                  <span className="font-bold text-white">CELX Editorial Board</span>
                </div>
              </div>

              {/* Publications list */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-350 uppercase tracking-wide block">Recent Publications in CELX:</span>
                <div className="space-y-2">
                  {selectedAuthor.publications.map((pub, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start p-2.5 rounded bg-slate-900/30 border border-slate-850/60 hover:bg-slate-900/50 transition-colors">
                      <span className="w-4 h-4 rounded-full bg-teal-500/10 text-teal-400 text-[10px] flex items-center justify-center font-bold mt-0.5 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-medium text-slate-300 leading-snug">
                        {pub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Link href={`/search?q=${encodeURIComponent(selectedAuthor.name)}`} className="flex-1">
                  <Button className="w-full bg-teal-650 hover:bg-teal-650 text-white text-xs font-bold h-10 rounded-lg shadow-md">
                    Search Published Papers
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedAuthor(null)
                  }}
                  className="border-slate-800 text-slate-300 hover:bg-slate-850 h-10 px-4 rounded-lg bg-transparent text-xs"
                >
                  Close Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
