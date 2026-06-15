import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface Props {
  title: string
  subtitle?: string
  defaultOpen?: boolean
  children: React.ReactNode
  headerAction?: React.ReactNode
}

export function CollapsibleCard({ title, subtitle, defaultOpen = false, children, headerAction }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div 
        className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <button type="button" className="text-slate-400">
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          <div>
            <p className="text-sm font-bold text-[#1B2340] uppercase tracking-wider">{title}</p>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {headerAction && <div onClick={e => e.stopPropagation()}>{headerAction}</div>}
      </div>
      {isOpen && (
        <div className="p-6 pt-2 border-t border-slate-100 space-y-5">
          {children}
        </div>
      )}
    </div>
  )
}
