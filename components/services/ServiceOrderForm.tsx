'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input, Textarea, Label, Select, Alert } from '@/components/ui/index'
import { createServiceOrder } from '@/app/actions/services'

interface FormData {
  serviceType: string
  manuscriptTitle: string
  description: string
  urgency: string
}

export function ServiceOrderForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: { urgency: 'normal', serviceType: 'ENGLISH_EDITING' },
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    try {
      await createServiceOrder(data)
      setSuccess('Your request has been successfully submitted! We will send a quote shortly.')
      reset()
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
        <Label htmlFor="serviceType">Service Type *</Label>
        <Select id="serviceType" {...register('serviceType')}>
          <option value="ENGLISH_EDITING">English Language Editing</option>
          <option value="STATISTICAL_ANALYSIS">Statistical Analysis Review</option>
          <option value="SCHEMATIC_DIAGRAM">Figure Design & Diagram</option>
          <option value="SCIENTIFIC_EDITING">Scientific Content Editing</option>
          <option value="MANUSCRIPT_FORMATTING">Journal Style Formatting</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="manuscriptTitle">Manuscript Title (optional)</Label>
        <Input id="manuscriptTitle" placeholder="e.g. CRISPR Cas9 Gene Editing in hESCs..." {...register('manuscriptTitle')} />
      </div>

      <div>
        <Label htmlFor="description">Brief Description / Scope *</Label>
        <Textarea
          id="description"
          placeholder="Please describe the scope of work, word count, number of figures, etc..."
          className="min-h-[100px]"
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="urgency">Urgency / Timeline *</Label>
        <Select id="urgency" {...register('urgency')}>
          <option value="normal">Normal (7-10 business days)</option>
          <option value="express">Express (3-5 business days)</option>
          <option value="urgent">Urgent (24-48 hours)</option>
        </Select>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Request Quote
      </Button>
    </form>
  )
}
