import { Card, CardContent } from '@/components/ui/index'
import { Globe, Shield, Award, Users } from 'lucide-react'

export const metadata = {
  title: 'About CleX',
  description: 'CleX Research Publishing Platform is a leading open-access publisher of scholarly journals.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">About CleX</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          CleX is a modern, independent open-access publishing platform designed to accelerate scientific discovery and facilitate high-impact peer-reviewed research dissemination.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'Rigorous Peer Review',
            desc: 'All submitted manuscripts undergo a double-blind peer review process conducted by leading experts in the respective disciplines.',
            icon: Shield,
            color: 'text-blue-600 bg-blue-50',
          },
          {
            title: 'Gold Open Access',
            desc: 'We believe that scientific knowledge should be freely accessible. All published articles are immediately online without paywalls.',
            icon: Globe,
            color: 'text-teal-600 bg-teal-50',
          },
          {
            title: 'High Editorial Standards',
            desc: 'Our editorial boards are composed of prominent researchers committed to ensuring the highest quality and integrity.',
            icon: Award,
            color: 'text-purple-600 bg-purple-50',
          },
          {
            title: 'Global Community',
            desc: 'We support authors, reviewers, and readers from across the globe with particular support for researchers in developing countries.',
            icon: Users,
            color: 'text-orange-600 bg-orange-50',
          },
        ].map(card => {
          const Icon = card.icon
          return (
            <Card key={card.title}>
              <CardContent className="pt-6 flex gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900">{card.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
        <p className="text-slate-600 leading-relaxed">
          CleX aims to redefine academic publishing by providing a streamlined, fast-tracked, and highly professional experience. By leveraging cutting-edge technology, we minimize the time from submission to publication while maintaining top-tier peer review standards. We are proud to publish across multiple domains, including biomedicine, engineering, agriculture, and public health.
        </p>
      </div>
    </div>
  )
}
