'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check, X } from 'lucide-react'

interface CitationModalProps {
  citations: {
    apa: string
    mla: string
    vancouver: string
    bibtex: string
    ris: string
  }
  isOpen: boolean
  onClose: () => void
}

const formats = ['APA', 'MLA', 'Vancouver', 'BibTeX', 'RIS'] as const

export function CitationModal({ citations, isOpen, onClose }: CitationModalProps) {
  const [activeFormat, setActiveFormat] = useState<typeof formats[number]>('APA')
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const citationMap = {
    APA: citations.apa,
    MLA: citations.mla,
    Vancouver: citations.vancouver,
    BibTeX: citations.bibtex,
    RIS: citations.ris,
  }

  const currentCitation = citationMap[activeFormat]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCitation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const ext = activeFormat === 'BibTeX' ? 'bib' : activeFormat === 'RIS' ? 'ris' : 'txt'
    const blob = new Blob([currentCitation], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `citation.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Cite This Article</h2>
            <p className="text-sm text-slate-500">Select a citation format and copy to clipboard</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-md transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-5">
          {/* Format tabs */}
          <div className="flex items-center gap-1 mb-4 bg-slate-100 p-1 rounded-lg">
            {formats.map(format => (
              <button
                key={format}
                onClick={() => setActiveFormat(format)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeFormat === format
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {format}
              </button>
            ))}
          </div>

          {/* Citation text */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 min-h-[120px] font-mono text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {currentCitation}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4">
            <Button
              onClick={handleCopy}
              variant="default"
              className="flex-1"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Citation
                </>
              )}
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
