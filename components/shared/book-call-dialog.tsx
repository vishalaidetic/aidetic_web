'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Building2, CheckCircle2, Mail, Phone, User } from 'lucide-react'

// Top 30 most common country codes
const COUNTRY_CODES = [
  { code: '+1',   flag: '🇺🇸', name: 'US/CA' },
  { code: '+44',  flag: '🇬🇧', name: 'UK' },
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+61',  flag: '🇦🇺', name: 'Australia' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+33',  flag: '🇫🇷', name: 'France' },
  { code: '+39',  flag: '🇮🇹', name: 'Italy' },
  { code: '+34',  flag: '🇪🇸', name: 'Spain' },
  { code: '+81',  flag: '🇯🇵', name: 'Japan' },
  { code: '+82',  flag: '🇰🇷', name: 'Korea' },
  { code: '+86',  flag: '🇨🇳', name: 'China' },
  { code: '+55',  flag: '🇧🇷', name: 'Brazil' },
  { code: '+7',   flag: '🇷🇺', name: 'Russia' },
  { code: '+27',  flag: '🇿🇦', name: 'S. Africa' },
  { code: '+52',  flag: '🇲🇽', name: 'Mexico' },
  { code: '+65',  flag: '🇸🇬', name: 'Singapore' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+60',  flag: '🇲🇾', name: 'Malaysia' },
  { code: '+62',  flag: '🇮🇩', name: 'Indonesia' },
  { code: '+63',  flag: '🇵🇭', name: 'Philippines' },
  { code: '+66',  flag: '🇹🇭', name: 'Thailand' },
  { code: '+84',  flag: '🇻🇳', name: 'Vietnam' },
  { code: '+20',  flag: '🇪🇬', name: 'Egypt' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+31',  flag: '🇳🇱', name: 'Netherlands' },
  { code: '+46',  flag: '🇸🇪', name: 'Sweden' },
  { code: '+41',  flag: '🇨🇭', name: 'Switzerland' },
  { code: '+48',  flag: '🇵🇱', name: 'Poland' },
]

interface BookCallDialogProps {
  children: React.ReactNode
}

export function BookCallDialog({ children }: BookCallDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [countryCode, setCountryCode] = useState('+91')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
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

    const phone = formData.phoneNumber
      ? `${countryCode} ${formData.phoneNumber}`
      : undefined

    try {
      const res = await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone,
          organization: formData.organization,
          purpose: formData.purpose,
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          setOpen(false)
          setTimeout(() => setSuccess(false), 400)
        }, 3200)
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to submit request.')
      }
    } catch {
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (v: boolean) => {
    setOpen(v)
    if (!v) {
      setTimeout(() => {
        setSuccess(false)
        setFormData({ name: '', email: '', phoneNumber: '', organization: '', purpose: '' })
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 overflow-hidden border-0 shadow-2xl sm:max-w-[500px] rounded-2xl">

        {/* Header gradient bar */}
        <div
          className="px-7 pt-7 pb-5 relative"
          style={{ background: 'linear-gradient(135deg, #DC2626 0%, #1B2340 100%)' }}
        >
          {/* Aidetic Logo */}
          <div className="absolute top-5 right-6 opacity-30 pointer-events-none">
            <img 
              src="/Aideticlogo.png" 
              alt="Aidetic" 
              className="h-7 w-auto object-contain brightness-0 invert" 
            />
          </div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Phone size={17} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
              Request a Call
            </h2>
          </div>
          <p className="text-sm text-white/65 pl-12" style={{ fontFamily: 'var(--font-quicksand)' }}>
            Share your details and we'll schedule a meeting.
          </p>
        </div>

        {/* Body */}
        <div className="bg-white px-7 pt-5 pb-7">
          {success ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto">
                <CheckCircle2 size={30} className="text-green-500" />
              </div>
              <h3 className="font-bold text-[#1B2340] text-lg mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
                Request Submitted!
              </h3>
              <p className="text-sm text-[#64748b]" style={{ fontFamily: 'var(--font-quicksand)' }}>
                We'll reach out to you shortly to confirm your meeting.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="rc-name" className="text-xs font-semibold text-[#1B2340] uppercase tracking-wider">
                  Full Name <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="rc-name"
                    name="name"
                    required
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-9 h-10 text-sm border-slate-200 focus-visible:ring-1 focus-visible:ring-[#DC2626] focus-visible:border-[#DC2626]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="rc-email" className="text-xs font-semibold text-[#1B2340] uppercase tracking-wider">
                  Work Email <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="rc-email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-9 h-10 text-sm border-slate-200 focus-visible:ring-1 focus-visible:ring-[#DC2626] focus-visible:border-[#DC2626]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="rc-phone" className="text-xs font-semibold text-[#1B2340] uppercase tracking-wider">
                  Phone Number <span className="text-slate-400 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-10 rounded-md border border-slate-200 bg-slate-50 text-sm px-2 text-[#1B2340] focus:outline-none focus:ring-1 focus:ring-[#DC2626] focus:border-[#DC2626] w-[110px] shrink-0"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code + c.name} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <Input
                      id="rc-phone"
                      name="phoneNumber"
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="pl-9 h-10 text-sm border-slate-200 focus-visible:ring-1 focus-visible:ring-[#DC2626] focus-visible:border-[#DC2626]"
                    />
                  </div>
                </div>
              </div>

              {/* Organization */}
              <div className="space-y-1.5">
                <label htmlFor="rc-org" className="text-xs font-semibold text-[#1B2340] uppercase tracking-wider">
                  Organization <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="rc-org"
                    name="organization"
                    required
                    placeholder="Acme Corp"
                    value={formData.organization}
                    onChange={handleChange}
                    className="pl-9 h-10 text-sm border-slate-200 focus-visible:ring-1 focus-visible:ring-[#DC2626] focus-visible:border-[#DC2626]"
                  />
                </div>
              </div>

              {/* Purpose */}
              <div className="space-y-1.5">
                <label htmlFor="rc-purpose" className="text-xs font-semibold text-[#1B2340] uppercase tracking-wider">
                  Purpose of Meeting <span className="text-[#DC2626]">*</span>
                </label>
                <Textarea
                  id="rc-purpose"
                  name="purpose"
                  required
                  placeholder="I'd like to discuss migrating our data pipeline to Aidetic..."
                  value={formData.purpose}
                  onChange={handleChange}
                  className="resize-none h-20 text-sm border-slate-200 focus-visible:ring-1 focus-visible:ring-[#DC2626] focus-visible:border-[#DC2626]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl font-bold text-sm text-white tracking-wide uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                style={{ background: 'linear-gradient(135deg, #DC2626 0%, #1B2340 100%)', fontFamily: 'var(--font-inter)' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Submitting…
                  </span>
                ) : 'Submit Request'}
              </button>

              <p className="text-center text-[11px] text-slate-400" style={{ fontFamily: 'var(--font-quicksand)' }}>
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
