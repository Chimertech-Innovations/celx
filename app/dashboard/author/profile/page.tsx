import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index'
import { ProfileForm } from '@/components/profile/ProfileForm'

export const metadata = { title: 'Profile Settings' }

export default async function AuthorProfilePage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) redirect('/login')

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500 text-sm">Update your personal information, affiliations, and ORCID iD</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm initialData={{
            name: user.name,
            email: user.email,
            affiliation: user.affiliation,
            country: user.country,
            bio: user.bio,
            orcidId: user.orcidId
          }} />
        </CardContent>
      </Card>
    </div>
  )
}
