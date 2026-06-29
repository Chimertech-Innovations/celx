'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input, Textarea, Label, Alert } from '@/components/ui/index'
import { updateProfile } from '@/app/actions/profile'

interface ProfileData {
  name: string
  email: string
  affiliation: string
  country: string
  bio: string
  orcidId: string
}

export function ProfileForm({ initialData }: {
  initialData: {
    name: string
    email: string
    affiliation: string | null
    country: string | null
    bio: string | null
    orcidId: string | null
  }
}) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>({
    defaultValues: {
      name: initialData.name || '',
      email: initialData.email || '',
      affiliation: initialData.affiliation || '',
      country: initialData.country || '',
      bio: initialData.bio || '',
      orcidId: initialData.orcidId || '',
    }
  })

  const onSubmit = async (data: ProfileData) => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    try {
      await updateProfile({
        name: data.name,
        affiliation: data.affiliation || null,
        country: data.country || null,
        bio: data.bio || null,
        orcidId: data.orcidId || null,
      })
      setSuccess('Profile updated successfully!')
      router.refresh()
    } catch (e) {
      setError(String(e))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      {error && <Alert variant="destructive">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input id="name" {...register('name', { required: 'Name is required' })} />
        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" disabled {...register('email')} className="bg-slate-50 cursor-not-allowed" />
        <p className="text-xs text-slate-400 mt-1">To change your email address, please contact support.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="affiliation">Affiliation / Institution</Label>
          <Input id="affiliation" placeholder="e.g. University of Cambridge" {...register('affiliation')} />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" placeholder="e.g. United Kingdom" {...register('country')} />
        </div>
      </div>

      <div>
        <Label htmlFor="orcidId">ORCID iD</Label>
        <Input id="orcidId" placeholder="0000-0000-0000-0000" {...register('orcidId')} />
        <p className="text-xs text-slate-400 mt-1">Providing your ORCID iD helps uniquely identify you and your scholarly contributions.</p>
      </div>

      <div>
        <Label htmlFor="bio">Biography / Research Interests</Label>
        <Textarea
          id="bio"
          placeholder="Describe your research interests or professional background..."
          className="min-h-[100px]"
          {...register('bio')}
        />
      </div>

      <Button type="submit" isLoading={isLoading}>
        Save Changes
      </Button>
    </form>
  )
}
