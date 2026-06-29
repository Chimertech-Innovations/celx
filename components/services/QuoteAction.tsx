'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { approveQuoteAndGenerateInvoice } from '@/app/actions/services'

export function QuoteAction({ orderId }: { orderId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleApprove = async () => {
    if (!confirm('Approve this quote? This will generate a pending invoice.')) return
    setIsLoading(true)
    try {
      await approveQuoteAndGenerateInvoice(orderId)
      router.refresh()
    } catch (e) {
      alert(String(e))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button size="sm" onClick={handleApprove} isLoading={isLoading}>
      Accept Quote
    </Button>
  )
}
