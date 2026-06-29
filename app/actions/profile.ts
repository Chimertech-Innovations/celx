'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateProfile(data: {
  name: string
  affiliation?: string | null
  country?: string | null
  bio?: string | null
  orcidId?: string | null
}) {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: data.name,
      affiliation: data.affiliation,
      country: data.country,
      bio: data.bio,
      orcidId: data.orcidId,
    },
  })

  revalidatePath('/dashboard/author/profile')
  revalidatePath('/dashboard/reviewer/profile')
  return { success: true }
}
