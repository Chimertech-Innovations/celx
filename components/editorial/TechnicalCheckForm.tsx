'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { completeTechnicalCheck } from '@/app/actions/editorial'
import { Button } from '@/components/ui/button'
import { Textarea, Alert } from '@/components/ui/index'
import { CheckCircle, XCircle } from 'lucide-react'

const checklistItems = [
  { id: 'file_uploaded', label: 'Manuscript file uploaded' },
  { id: 'journal_correct', label: 'Correct journal selected' },
  { id: 'article_type_valid', label: 'Article type valid' },
  { id: 'abstract_included', label: 'Abstract included' },
  { id: 'keywords_included', label: 'Keywords included' },
  { id: 'author_details', label: 'Author details complete' },
  { id: 'conflict_statement', label: 'Conflict statement included' },
  { id: 'funding_statement', label: 'Funding statement included' },
  { id: 'ethics_statement', label: 'Ethics statement included' },
  { id: 'data_availability', label: 'Data availability included' },
  { id: 'cover_letter', label: 'Cover letter included' },
  { id: 'file_naming', label: 'File naming valid' },
]

export function TechnicalCheckForm({ manuscriptId }: { manuscriptId: string }) {
  const router = useRouter()
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const allChecked = checklistItems.every(item => checked[item.id])
  const checkedCount = Object.values(checked).filter(Boolean).length

  const handleSubmit = async (passed: boolean) => {
    setIsLoading(true)
    setError('')
    try {
      const summary = checklistItems.map(item => `${checked[item.id] ? '✓' : '✗'} ${item.label}`).join('\n')
      const fullNotes = `Technical Check Results:\n${summary}\n\nNotes: ${notes || 'None'}`
      await completeTechnicalCheck(manuscriptId, fullNotes, passed)
      router.push('/dashboard/office')
      router.refresh()
    } catch (e) {
      setError(String(e))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && <Alert variant="destructive">{error}</Alert>}

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Technical Checklist</h3>
          <span className="text-sm text-slate-500">{checkedCount}/{checklistItems.length} completed</span>
        </div>
        <div className="space-y-2.5">
          {checklistItems.map(item => (
            <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                id={item.id}
                checked={!!checked[item.id]}
                onChange={e => setChecked(prev => ({ ...prev, [item.id]: e.target.checked }))}
                className="w-4 h-4 text-navy-600 rounded border-slate-300"
              />
              <span className={`text-sm transition-colors ${checked[item.id] ? 'text-slate-700 line-through' : 'text-slate-600'}`}>
                {item.label}
              </span>
              {checked[item.id] && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
            </label>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-slate-200 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${(checkedCount / checklistItems.length) * 100}%` }}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Notes / Comments</label>
        <Textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Add any notes or comments about the technical check..."
          className="min-h-[100px]"
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => handleSubmit(true)}
          isLoading={isLoading}
          disabled={!allChecked}
          className="flex-1"
        >
          <CheckCircle className="w-4 h-4" />
          Pass — Send to Editorial Screening
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleSubmit(false)}
          isLoading={isLoading}
          className="flex-1"
        >
          <XCircle className="w-4 h-4" />
          Return to Author
        </Button>
      </div>
      {!allChecked && (
        <p className="text-xs text-amber-600 text-center">Complete all checklist items before passing</p>
      )}
    </div>
  )
}
