'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { publishArticle } from '@/app/actions/editorial'
import { Button } from '@/components/ui/button'
import { Input, Textarea, Label, Select, Alert } from '@/components/ui/index'
import { Send } from 'lucide-react'

interface Volume { id: string; number: number; year: number }
interface Issue { id: string; number: number; volumeId: string }

export function PublishForm({
  manuscriptId,
  volumes,
  issues,
}: {
  manuscriptId: string
  volumes: Volume[]
  issues: Issue[]
}) {
  const router = useRouter()
  const [doi, setDoi] = useState('')
  const [fullTextHtml, setFullTextHtml] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')
  const [volumeId, setVolumeId] = useState('')
  const [issueId, setIssueId] = useState('')
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split('T')[0])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const filteredIssues = volumeId ? issues.filter(i => i.volumeId === volumeId) : issues

  const handlePublish = async () => {
    setIsLoading(true)
    setError('')
    try {
      const result = await publishArticle(manuscriptId, {
        doi: doi || undefined,
        fullTextHtml: fullTextHtml || undefined,
        pdfUrl: pdfUrl || undefined,
        volumeId: volumeId || undefined,
        issueId: issueId || undefined,
        publishedDate,
      })
      router.push(`/articles/${result.articleSlug}`)
    } catch (e) {
      setError(String(e))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      {error && <Alert variant="destructive">{error}</Alert>}

      <div>
        <Label htmlFor="doi">DOI (leave blank to skip)</Label>
        <Input id="doi" value={doi} onChange={e => setDoi(e.target.value)} placeholder="10.12345/celx.2024.0001" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="volume">Volume</Label>
          <Select id="volume" value={volumeId} onChange={e => setVolumeId(e.target.value)}>
            <option value="">No volume</option>
            {volumes.map(v => <option key={v.id} value={v.id}>Volume {v.number} ({v.year})</option>)}
          </Select>
        </div>
        <div>
          <Label htmlFor="issue">Issue</Label>
          <Select id="issue" value={issueId} onChange={e => setIssueId(e.target.value)} disabled={!volumeId}>
            <option value="">No issue</option>
            {filteredIssues.map(i => <option key={i.id} value={i.id}>Issue {i.number}</option>)}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="publishedDate">Publication Date *</Label>
        <Input id="publishedDate" type="date" value={publishedDate} onChange={e => setPublishedDate(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="pdfUrl">PDF URL (optional)</Label>
        <Input id="pdfUrl" value={pdfUrl} onChange={e => setPdfUrl(e.target.value)} placeholder="https://..." />
      </div>

      <div>
        <Label htmlFor="fullText">Full Text HTML (optional)</Label>
        <Textarea
          id="fullText"
          value={fullTextHtml}
          onChange={e => setFullTextHtml(e.target.value)}
          placeholder="<p>Introduction...</p><h2>Methods</h2>..."
          className="min-h-[150px] font-mono text-xs"
        />
      </div>

      <Button onClick={handlePublish} isLoading={isLoading} className="w-full">
        <Send className="w-4 h-4" /> Publish Article Now
      </Button>
    </div>
  )
}
