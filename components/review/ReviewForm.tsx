'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitReview, respondToInvitation } from '@/app/actions/editorial'
import { Button } from '@/components/ui/button'
import { Textarea, Label, Select, Alert } from '@/components/ui/index'
import { Star, Send } from 'lucide-react'

interface Props {
  invitationId: string
  manuscriptId: string
  manuscriptTitle: string
  status: string
}

const criteria = [
  { key: 'originalityScore', label: 'Originality & Novelty' },
  { key: 'methodologyScore', label: 'Methodology & Research Design' },
  { key: 'dataQualityScore', label: 'Data Quality & Validity' },
  { key: 'clarityScore', label: 'Clarity & Presentation' },
] as const

export function ReviewForm({ invitationId, manuscriptId, manuscriptTitle, status }: Props) {
  const router = useRouter()
  const [scores, setScores] = useState<{
    originalityScore: number
    methodologyScore: number
    dataQualityScore: number
    clarityScore: number
  }>({
    originalityScore: 3,
    methodologyScore: 3,
    dataQualityScore: 3,
    clarityScore: 3,
  })
  const [commentsToAuthor, setCommentsToAuthor] = useState('')
  const [confidentialComments, setConfidentialComments] = useState('')
  const [ethicalConcerns, setEthicalConcerns] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [conflictOfInterest, setConflictOfInterest] = useState('None declared.')
  const [isLoading, setIsLoading] = useState(false)
  const [isResponding, setIsResponding] = useState(false)
  const [error, setError] = useState('')

  const handleAccept = async () => {
    setIsResponding(true)
    try {
      await respondToInvitation(invitationId, true)
      router.refresh()
    } catch (e) { setError(String(e)) }
    finally { setIsResponding(false) }
  }

  const handleDecline = async () => {
    setIsResponding(true)
    try {
      await respondToInvitation(invitationId, false)
      router.push('/dashboard/reviewer')
    } catch (e) { setError(String(e)) }
    finally { setIsResponding(false) }
  }

  const handleSubmitReview = async () => {
    if (!recommendation) { setError('Please select a recommendation'); return }
    if (commentsToAuthor.length < 50) { setError('Comments to author must be at least 50 characters'); return }
    setIsLoading(true)
    setError('')
    try {
      await submitReview(invitationId, {
        ...scores,
        commentsToAuthor,
        confidentialComments,
        ethicalConcerns,
        recommendation,
        conflictOfInterest,
      })
      router.push('/dashboard/reviewer')
    } catch (e) { setError(String(e)) }
    finally { setIsLoading(false) }
  }

  if (status === 'PENDING') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-slate-900">Respond to Invitation</h3>
        <p className="text-sm text-slate-600">You have been invited to review: <strong>{manuscriptTitle}</strong></p>
        {error && <Alert variant="destructive">{error}</Alert>}
        <div className="flex gap-3">
          <Button onClick={handleAccept} isLoading={isResponding} className="flex-1">
            Accept & Begin Review
          </Button>
          <Button variant="destructive" onClick={handleDecline} isLoading={isResponding} className="flex-1">
            Decline
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {error && <Alert variant="destructive">{error}</Alert>}

      {/* Scoring */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Quality Scores</h3>
        <div className="space-y-4">
          {criteria.map(criterion => (
            <div key={criterion.key}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">{criterion.label}</label>
                <span className="text-sm font-bold text-navy-700">{scores[criterion.key]}/5</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    onClick={() => setScores(prev => ({ ...prev, [criterion.key]: val }))}
                    className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                      scores[criterion.key] >= val ? 'bg-navy-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Poor</span><span>Excellent</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-slate-900">Review Comments</h3>
        <div>
          <Label htmlFor="commentsToAuthor">Comments to Author (shared) *</Label>
          <Textarea
            id="commentsToAuthor"
            value={commentsToAuthor}
            onChange={e => setCommentsToAuthor(e.target.value)}
            placeholder="Provide detailed, constructive feedback on the manuscript's scientific quality, methodology, results, and presentation..."
            className="min-h-[200px]"
          />
          <div className="text-xs text-slate-400 mt-1">{commentsToAuthor.length} chars (min. 50)</div>
        </div>
        <div>
          <Label htmlFor="confidentialComments">Confidential Comments to Editor (not shared)</Label>
          <Textarea
            id="confidentialComments"
            value={confidentialComments}
            onChange={e => setConfidentialComments(e.target.value)}
            placeholder="Any concerns or recommendations for the editor only..."
            className="min-h-[80px]"
          />
        </div>
        <div>
          <Label htmlFor="ethicalConcerns">Ethical Concerns (if any)</Label>
          <Textarea
            id="ethicalConcerns"
            value={ethicalConcerns}
            onChange={e => setEthicalConcerns(e.target.value)}
            placeholder="Plagiarism, data fabrication, duplicate publication, etc. Or: None."
            className="min-h-[60px]"
          />
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-slate-900">Recommendation</h3>
        <div>
          <Label htmlFor="recommendation">Your Recommendation *</Label>
          <Select id="recommendation" value={recommendation} onChange={e => setRecommendation(e.target.value)}>
            <option value="">Choose recommendation...</option>
            <option value="ACCEPT">Accept as is</option>
            <option value="MINOR_REVISION">Accept with minor revision</option>
            <option value="MAJOR_REVISION">Major revision required</option>
            <option value="REJECT">Reject</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="coi">Conflict of Interest Declaration *</Label>
          <Textarea
            id="coi"
            value={conflictOfInterest}
            onChange={e => setConflictOfInterest(e.target.value)}
            placeholder="State any conflicts, or 'None declared.'"
            className="min-h-[60px]"
          />
        </div>
        <Button onClick={handleSubmitReview} isLoading={isLoading} className="w-full">
          <Send className="w-4 h-4" /> Submit Review
        </Button>
      </div>
    </div>
  )
}
