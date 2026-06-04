'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface BookCallDialogProps {
  children: React.ReactNode
}

export function BookCallDialog({ children }: BookCallDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    purpose: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/book-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({ name: '', email: '', organization: '', purpose: '' })
        setTimeout(() => {
          setOpen(false)
          setSuccess(false)
        }, 3000)
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to submit request.')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0d253d]" style={{ fontFamily: 'var(--font-inter)' }}>Request a Call</DialogTitle>
          <DialogDescription className="text-[#64748d]" style={{ fontFamily: 'var(--font-quicksand)' }}>
            Fill out this form and our team will get back to you shortly to schedule a meeting.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-[#0d253d] text-lg">Request Sent!</h3>
            <p className="text-sm text-[#64748d]">We will contact you soon at {formData.email || 'your email'}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-semibold text-[#0d253d]">Full Name *</label>
              <Input
                id="name"
                name="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="focus-visible:ring-[#533afd]"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-[#0d253d]">Email Address *</label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="focus-visible:ring-[#533afd]"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="organization" className="text-sm font-semibold text-[#0d253d]">Organization Name *</label>
              <Input
                id="organization"
                name="organization"
                required
                placeholder="Acme Corp"
                value={formData.organization}
                onChange={handleChange}
                className="focus-visible:ring-[#533afd]"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="purpose" className="text-sm font-semibold text-[#0d253d]">Purpose of Meeting *</label>
              <Textarea
                id="purpose"
                name="purpose"
                required
                placeholder="I would like to discuss..."
                value={formData.purpose}
                onChange={handleChange}
                className="resize-none h-24 focus-visible:ring-[#533afd]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#533afd] hover:bg-[#432bd4] text-white mt-2 font-bold"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Request Meeting'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
