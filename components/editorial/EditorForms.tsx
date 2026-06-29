'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { inviteReviewer, makeEditorialDecision } from '@/app/actions/editorial'
import { Button } from '@/components/ui/button'
import { Input, Textarea, Label, Select, Alert } from '@/components/ui/index'
import { UserPlus, Send } from 'lucide-react'

interface Reviewer { id: string; name: string; email: string; affiliation: string | null }

export function InviteReviewerForm({ manuscriptId, reviewers }: { manuscriptId: string; reviewers: Reviewer[] }) {
  const router = useRouter()
  const [reviewerId, setReviewerId] = useState('')
  const [message, setMessage] = useState('Dear Reviewer, you are invited to review the above manuscript...')
  const [dueDate, setDueDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInvite = async () => {
    if (!reviewerId) { setError('Please select a reviewer'); return }
    setIsLoading(true)
    setError('')
    try {
      await inviteReviewer(manuscriptId, reviewerId, message, dueDate)
      setSuccess('Reviewer invited successfully!')
      router.refresh()
    } catch (e) {
      setError(String(e))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4 bg-white border border-slate-200 rounded-xl">
      <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
        <UserPlus className="w-4 h-4" /> Invite Reviewer
      </h3>
      {error && <Alert variant="destructive">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <div>
        <Label htmlFor="reviewer">Select Reviewer</Label>
        <Select id="reviewer" value={reviewerId} onChange={e => setReviewerId(e.target.value)}>
          <option value="">Choose a reviewer...</option>
          {reviewers.map(r => (
            <option key={r.id} value={r.id}>{r.name} — {r.affiliation || r.email}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="dueDate">Review Due Date</Label>
        <Input id="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="inviteMessage">Message to Reviewer</Label>
        <Textarea id="inviteMessage" value={message} onChange={e => setMessage(e.target.value)} className="min-h-[80px]" />
      </div>
      <Button onClick={handleInvite} isLoading={isLoading} size="sm">
        <Send className="w-4 h-4" /> Send Invitation
      </Button>
    </div>
  )
}

export function EditorialDecisionForm({ manuscriptId }: { manuscriptId: string }) {
  const router = useRouter()
  const [decisionType, setDecisionType] = useState('')
  const [decisionLetter, setDecisionLetter] = useState('')
  const [internalNote, setInternalNote] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const letterTemplates: Record<string, string> = {
    ACCEPT: `Dear Author,

We are delighted to inform you that your manuscript has been accepted for publication in our journal.

Your manuscript will now be sent to our production team for final processing.

Congratulations!

Best regards,
The Editorial Team`,
    MAJOR_REVISION: `Dear Author,

Thank you for submitting your manuscript. After careful review, we request major revisions before we can consider it for publication.

Please address all reviewer comments carefully and resubmit within 60 days.

Best regards,
The Editorial Team`,
    MINOR_REVISION: `Dear Author,

Thank you for your manuscript. After review, we request minor revisions. Please address the reviewer comments and resubmit within 30 days.

Best regards,
The Editorial Team`,
    REJECT: `Dear Author,

Thank you for submitting to our journal. After careful review, we are unable to accept your manuscript at this time.

We encourage you to revise and consider submission to another journal.

Best regards,
The Editorial Team`,
  }

  const handleDecisionChange = (val: string) => {
    setDecisionType(val)
    if (letterTemplates[val]) setDecisionLetter(letterTemplates[val])
  }

  const handleSubmit = async () => {
    if (!decisionType || !decisionLetter) { setError('Please complete all fields'); return }
    setIsLoading(true)
    setError('')
    try {
      await makeEditorialDecision(manuscriptId, decisionType, decisionLetter, internalNote)
      router.push('/dashboard/editor')
      router.refresh()
    } catch (e) {
      setError(String(e))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4 bg-white border border-slate-200 rounded-xl">
      <h3 className="font-semibold text-slate-900 text-sm">Make Editorial Decision</h3>
      {error && <Alert variant="destructive">{error}</Alert>}
      <div>
        <Label htmlFor="decision">Decision *</Label>
        <Select id="decision" value={decisionType} onChange={e => handleDecisionChange(e.target.value)}>
          <option value="">Choose decision...</option>
          <option value="ACCEPT">Accept</option>
          <option value="MINOR_REVISION">Minor Revision</option>
          <option value="MAJOR_REVISION">Major Revision</option>
          <option value="REJECT">Reject</option>
          <option value="TRANSFER">Transfer to Another Journal</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="decisionLetter">Decision Letter to Author *</Label>
        <Textarea id="decisionLetter" value={decisionLetter} onChange={e => setDecisionLetter(e.target.value)} className="min-h-[180px]" />
      </div>
      <div>
        <Label htmlFor="internalNote">Internal Note (not shared with author)</Label>
        <Textarea id="internalNote" value={internalNote} onChange={e => setInternalNote(e.target.value)} className="min-h-[60px]" />
      </div>
      <Button onClick={handleSubmit} isLoading={isLoading} className="w-full">
        <Send className="w-4 h-4" /> Submit Decision
      </Button>
    </div>
  )
}
