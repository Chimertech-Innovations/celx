'use client'

import { useState } from 'react'
import { CitationModal } from '@/components/citations/CitationModal'
import { Button } from '@/components/ui/button'
import { Quote, Share2, Download } from 'lucide-react'

interface ArticleActionsProps {
  citations: {
    apa: string
    mla: string
    vancouver: string
    bibtex: string
    ris: string
  }
  pdfUrl?: string | null
}

export function ArticleActions({ citations, pdfUrl }: ArticleActionsProps) {
  const [showCitation, setShowCitation] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: document.title, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCitation(true)}
          id="cite-article-btn"
        >
          <Quote className="w-4 h-4" />
          Cite
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        {pdfUrl ? (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <Button size="sm">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </a>
        ) : (
          <Button size="sm" disabled title="PDF not yet available">
            <Download className="w-4 h-4" />
            PDF (Coming)
          </Button>
        )}
      </div>

      <CitationModal
        citations={citations}
        isOpen={showCitation}
        onClose={() => setShowCitation(false)}
      />
    </>
  )
}
