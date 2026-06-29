import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { FileText, CheckCircle, HelpCircle, Star, Sparkles, MessageSquare } from 'lucide-react'

export const metadata = {
  title: 'Author Services',
  description: 'Boost your publication chances with CleX professional English language editing, statistical analysis, and diagram design.',
}

const serviceItems = [
  {
    type: 'ENGLISH_EDITING',
    title: 'English Language Editing',
    price: 'From $150 USD',
    desc: 'Improve the clarity, flow, grammar, and academic tone of your manuscript. Recommended for non-native English speakers.',
    features: ['Grammar & spelling corrections', 'Style & vocabulary enhancements', 'Sentence structure optimization', 'Free editing certificate'],
  },
  {
    type: 'STATISTICAL_ANALYSIS',
    title: 'Statistical Analysis Review',
    price: 'From $350 USD',
    desc: 'Get your experimental data, methods, and statistical models validated by expert biostatisticians and math experts.',
    features: ['Statistical test validation', 'Data visualization check', 'Sample size calculation audit', 'Detailed statistics report'],
  },
  {
    type: 'SCHEMATIC_DIAGRAM',
    title: 'Schematic Diagram & Figure Design',
    price: 'From $120 USD',
    desc: 'Transform your hand-drawn sketch or low-resolution graphs into professional, publication-ready vector figures.',
    features: ['High-res output (TIFF/PDF)', 'Compliance with journal styles', 'Unlimited revisions', 'Graphical abstract creation'],
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-navy-950 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Independent Editorial Support
          </div>
          <h1 className="text-4xl font-bold mb-4">Professional Author Services</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Enhance the quality of your research manuscript. Settle and request expert assistance from our panel of native English editors and statisticians.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Marketplace cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {serviceItems.map(item => (
            <Card key={item.type} className="flex flex-col border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">{item.price}</div>
                <CardTitle className="text-lg font-bold text-slate-900 leading-tight">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-2 mb-8">
                    {item.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/dashboard/author/services?type=${item.type}`} className="w-full mt-auto">
                  <Button className="w-full">Order Service</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ethics disclaimer card */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 shrink-0 mx-auto md:mx-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-bold text-amber-900 text-lg">Independent Editorial Policy Notice</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              Use of CleX Author Services is completely voluntary and independent of the peer review process. Settle of any service does not guarantee manuscript acceptance or influence editorial decision. Peer review process is handled blindly and ethically.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
