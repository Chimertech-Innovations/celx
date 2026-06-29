'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'

export default function HeroSection() {
  return (
    <section 
      className="relative py-20 lg:py-28 overflow-hidden border-b border-slate-900 bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(to right, rgba(5, 12, 24, 0.96) 0%, rgba(5, 12, 24, 0.88) 55%, rgba(5, 12, 24, 0.5) 100%), url('/hero-cells-bg.png')" }}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
        
        {/* Upper Hero Grid: Title + Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-8 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-none text-white drop-shadow-sm">
              Advancing Microbiology <br />
              <span className="text-teal-400">for a Healthier World</span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed max-w-lg">
              CELX publishes exceptional, peer-reviewed open-access journals. Explore raw discoveries, submit drafts, and collaborate with leading microbiologists.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/journals">
                <Button className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-sm h-12 px-8 rounded-full inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-300">
                  Explore Journals
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/dashboard/author/submit">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent text-sm h-12 px-6 rounded-full font-bold">
                  Submit Manuscript
                </Button>
              </Link>
            </div>
            
            {/* Slider arrows */}
            <div className="flex items-center gap-3 pt-4 text-slate-500">
              <button className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:text-white hover:border-white transition-colors cursor-pointer bg-slate-900/40">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:text-white hover:border-white transition-colors cursor-pointer bg-slate-900/40">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Collage Column - ENLARGED MEDIUM DISPLAY CAPSULES */}
          <div className="lg:col-span-7 relative h-[450px] hidden md:flex items-center justify-end">
            <div className="flex gap-4 md:gap-5 lg:gap-6 transform skew-x-[-12deg] origin-center pr-2">
              {/* Capsule 1 */}
              <div className="w-32 md:w-38 lg:w-44 h-[320px] md:h-[390px] lg:h-[430px] rounded-full overflow-hidden border border-slate-850 shadow-2xl relative transition-all hover:scale-105 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(20,_184,_166,_0.4)] duration-500 cursor-pointer">
                <div className="absolute inset-0 skew-x-[12deg] scale-125">
                  <Image
                    src="/card-latest-research.png"
                    alt="Microscope visual"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Capsule 2 */}
              <div className="w-32 md:w-38 lg:w-44 h-[320px] md:h-[390px] lg:h-[430px] rounded-full overflow-hidden border border-slate-850 shadow-2xl relative mt-10 transition-all hover:scale-105 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(20,_184,_166,_0.4)] duration-500 cursor-pointer">
                <div className="absolute inset-0 skew-x-[12deg] scale-125">
                  <Image
                    src="/card-trending-articles.png"
                    alt="Pathogens visual"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Capsule 3 */}
              <div className="w-32 md:w-38 lg:w-44 h-[320px] md:h-[390px] lg:h-[430px] rounded-full overflow-hidden border border-slate-850 shadow-2xl relative transition-all hover:scale-105 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(20,_184,_166,_0.4)] duration-500 cursor-pointer">
                <div className="absolute inset-0 skew-x-[12deg] scale-125">
                  <Image
                    src="/card-special-collections.png"
                    alt="Petri dish growth visual"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Capsule 4 */}
              <div className="w-32 md:w-38 lg:w-44 h-[320px] md:h-[390px] lg:h-[430px] rounded-full overflow-hidden border border-slate-850 shadow-2xl relative mt-10 transition-all hover:scale-105 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(20,_184,_166,_0.4)] duration-500 cursor-pointer">
                <div className="absolute inset-0 skew-x-[12deg] scale-125">
                  <Image
                    src="/card-submit-research.png"
                    alt="Scientist pipetting visual"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


