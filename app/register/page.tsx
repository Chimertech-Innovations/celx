'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input, Label, Alert, Select } from '@/components/ui/index'
import { BookOpen, Eye, EyeOff } from 'lucide-react'
import { registerUser } from '@/app/actions/auth'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['AUTHOR', 'REVIEWER', 'READER']).default('AUTHOR'),
  affiliation: z.string().optional(),
  country: z.string().optional(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'India', 'China', 'Japan', 'Brazil', 'Nigeria', 'South Africa', 'Kenya',
  'Ghana', 'Ethiopia', 'Egypt', 'Saudi Arabia', 'UAE', 'Singapore', 'South Korea',
  'Indonesia', 'Malaysia', 'Philippines', 'Pakistan', 'Bangladesh', 'Other',
]

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { role: 'AUTHOR' },
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    const result = await registerUser(data)
    if ('error' in result && result.error) {
      setError(result.error)
      return
    }
    // Auto sign-in
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4">
      <div className="max-w-lg w-full mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-navy-900 text-xl">CleX</div>
              <div className="text-sm text-slate-500">Research Publishing Platform</div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create an account</h1>
          <p className="text-slate-500 text-sm mb-6">Join CleX to submit manuscripts and track your research</p>

          {error && (
            <Alert variant="destructive" className="mb-4">{error}</Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="Dr. Jane Smith" {...register('name')} />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="you@university.edu" {...register('email')} />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className="pr-10"
                    {...register('password')}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="role">I am registering as *</Label>
                <Select id="role" {...register('role')}>
                  <option value="AUTHOR">Author — I want to submit manuscripts</option>
                  <option value="REVIEWER">Reviewer — I want to review manuscripts</option>
                  <option value="READER">Reader — I want to browse articles</option>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="affiliation">Institution / Affiliation</Label>
                <Input id="affiliation" placeholder="University of Excellence" {...register('affiliation')} />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Select id="country" {...register('country')}>
                  <option value="">Select country...</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </Select>
              </div>
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
              By registering, you agree to our publication ethics policies and confirm that you will use the platform in good faith. We do not share personal data with third parties.
            </div>

            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Create Account
            </Button>
          </form>

          <p className="text-sm text-slate-500 text-center mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-navy-700 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
