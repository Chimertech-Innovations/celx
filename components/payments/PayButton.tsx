'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { simulatePayment } from '@/app/actions/payments'
import { CreditCard } from 'lucide-react'

export function PayButton({ invoiceId }: { invoiceId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePay = async () => {
    if (!confirm('Simulate Sandbox Payment? This will mark the invoice as PAID.')) return
    setIsLoading(true)
    try {
      await simulatePayment(invoiceId, 'Credit Card (Simulated)')
      router.refresh()
    } catch (e) {
      alert(String(e))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button size="sm" onClick={handlePay} isLoading={isLoading}>
      <CreditCard className="w-4 h-4" />
      Pay Invoice
    </Button>
  )
}
