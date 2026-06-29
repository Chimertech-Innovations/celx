import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { Button } from '@/components/ui/button'
import { Input, Textarea, Label } from '@/components/ui/index'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata = { title: 'Contact Us' }

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Have questions about manuscript submission, editorial process, or licensing? Reach out to our team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info card */}
        <Card className="md:col-span-1 bg-navy-950 text-white border-0">
          <CardHeader>
            <CardTitle className="text-white">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4 text-sm text-slate-300">
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">Email support</div>
                <div>support@clex.org</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">Call us</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">Office address</div>
                <div>100 Innovation Way, Suite 400<br />Boston, MA 02111, USA</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact form */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <form className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your inquiry here..." className="min-h-[120px]" />
              </div>
              <Button type="button" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
