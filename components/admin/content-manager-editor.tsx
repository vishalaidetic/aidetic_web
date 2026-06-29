'use client'

import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, AlertCircle, Loader2, Save, RefreshCw, Edit3, Search, Home, Bot, Newspaper, BookMarked, AlignLeft, Footprints, FileText } from 'lucide-react'
import { CollapsibleCard } from '@/components/admin/collapsible-card'

interface ContentManagerEditorProps {
  pageKey: string
  pageLabel: string
}

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

function isObject(val: JsonValue): val is { [key: string]: JsonValue } {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}

// ── Recursive flattened key-value editor ──────────────────────────────────────
function flattenObject(obj: JsonValue, prefix = ''): Array<{ key: string; value: string }> {
  if (typeof obj !== 'object' || obj === null) return []
  return Object.entries(obj).flatMap(([k, v]) => {
    const fullKey = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'object' && v !== null) return flattenObject(v, fullKey)
    return [{ key: fullKey, value: String(v ?? '') }]
  })
}

function setNestedValue(obj: JsonValue, keyPath: string, val: string): JsonValue {
  if (typeof obj !== 'object' || obj === null) return obj
  const parts = keyPath.split('.')
  const top = parts[0]
  
  if (parts.length === 1) {
    if (Array.isArray(obj)) {
      const newArr = [...obj]
      newArr[Number(top)] = val as any
      return newArr
    }
    return { ...obj, [top]: val }
  }

  const nextVal = (obj as any)[top]
  const nextTarget = nextVal ?? (isNaN(Number(parts[1])) ? {} : [])

  if (Array.isArray(obj)) {
    const newArr = [...obj]
    newArr[Number(top)] = setNestedValue(nextTarget, parts.slice(1).join('.'), val) as any
    return newArr
  }

  return {
    ...obj,
    [top]: setNestedValue(nextTarget, parts.slice(1).join('.'), val),
  }
}

// ── Collapsible section for nested keys ───────────────────────────────────────
function SectionGroup({
  prefix,
  fields,
  onChange,
}: {
  prefix: string
  fields: Array<{ key: string; value: string }>
  onChange: (key: string, val: string) => void
}) {
  const relativeFields = fields.map(f => ({ ...f, relKey: f.key.slice(prefix.length + 1) }))

  return (
    <div className="mb-5">
      <CollapsibleCard title={prefix.replace(/_/g, ' ')} defaultOpen={false}>
        <div className="space-y-5">
          {relativeFields.map(({ key, relKey, value }) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-semibold text-[#1B2340] capitalize block">
                {relKey.replace(/_/g, ' ')}
              </label>
              <textarea
                value={value}
                onChange={e => onChange(key, e.target.value)}
                rows={value.length > 100 ? 4 : value.length > 50 ? 2 : 1}
                className="w-full text-[14px] text-[#0d253d] bg-white border border-slate-200 rounded-xl px-4 py-2.5 resize-none focus:outline-none focus:ring-4 focus:ring-[#DC2626]/10 focus:border-[#DC2626] transition-all font-mono shadow-sm"
              />
            </div>
          ))}
        </div>
      </CollapsibleCard>
    </div>
  )
}

// ── Main editor component ─────────────────────────────────────────────────────
export function ContentManagerEditor({ pageKey, pageLabel }: ContentManagerEditorProps) {
  const [raw, setRaw] = useState<JsonValue>({})
  const [mode, setMode] = useState<'visual' | 'json'>('visual')
  const [jsonText, setJsonText] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'saved' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const load = useCallback(async () => {
    setStatus('loading')
    try {
      const res = await fetch(`/api/content/${pageKey}`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setRaw(data)
      setJsonText(JSON.stringify(data, null, 2))
      setStatus('idle')
    } catch (e) {
      setStatus('error')
      setErrorMsg('Could not load content. Check if the JSON file exists.')
    }
  }, [pageKey])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setStatus('saving')
    try {
      const payload = mode === 'json' ? JSON.parse(jsonText) : raw
      const res = await fetch(`/api/content/${pageKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Save failed')
      if (mode === 'json') setRaw(JSON.parse(jsonText))
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setErrorMsg('Failed to save. Check JSON syntax and try again.')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const handleFieldChange = (key: string, val: string) => {
    const updated = setNestedValue(raw, key, val)
    setRaw(updated)
    setJsonText(JSON.stringify(updated, null, 2))
  }

  // Group flat keys by top-level section
  const flat = flattenObject(raw)
  let filteredFlat = flat
  if (searchTerm.trim() !== '') {
    const q = searchTerm.toLowerCase()
    filteredFlat = flat.filter(f => 
      f.key.toLowerCase().includes(q) || 
      f.value.toLowerCase().includes(q)
    )
  }
  const sections = Array.from(new Set(filteredFlat.map(f => f.key.split('.')[0])))

  // Icon mapping
  const Icon = (() => {
    switch (pageKey) {
      case 'home': return Home
      case 'blog': return Newspaper
      case 'case-study': return BookMarked
      case 'navbar': return AlignLeft
      case 'footer': return Footprints
      default: return FileText
    }
  })()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B2340] shadow-md shrink-0">
            <Icon size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1B2340]">{pageLabel}</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              Edit content properties and text elements for this page.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-1 text-sm">
            <button
              onClick={() => setMode('visual')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${mode === 'visual' ? 'bg-white text-[#1B2340] shadow-sm' : 'text-[#6B7280]'}`}
            >
              Visual
            </button>
            <button
              onClick={() => setMode('json')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${mode === 'json' ? 'bg-white text-[#1B2340] shadow-sm' : 'text-[#6B7280]'}`}
            >
              JSON
            </button>
          </div>

          {/* Refresh */}
          <button
            onClick={load}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-[#6B7280]"
            title="Reload from file"
          >
            <RefreshCw size={16} />
          </button>

          {/* Save */}
          <button
            onClick={save}
            disabled={status === 'saving' || status === 'loading'}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[black] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-all shadow-sm"
          >
            {status === 'saving' ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {status === 'saving' ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Search Bar (only in visual mode) */}
      {status !== 'loading' && mode === 'visual' && (
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-[18px] h-[18px]" />
          <input
            type="text"
            placeholder={`Search ${pageLabel} content...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] focus:outline-none focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10 transition-all text-[15px] text-[#0d253d] placeholder:text-slate-400"
          />
        </div>
      )}

      {/* Status banner */}
      {status === 'saved' && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm font-medium">
          <CheckCircle2 size={16} /> Changes saved successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      {/* Loading */}
      {status === 'loading' && (
        <div className="flex items-center justify-center py-24 text-[#6B7280]">
          <Loader2 size={28} className="animate-spin mr-3" /> Loading content…
        </div>
      )}

      {/* ── Visual Editor ── */}
      {status !== 'loading' && mode === 'visual' && (
        <div className="space-y-4">
          {sections.map(section => {
            const sectionFields = filteredFlat.filter(f => f.key.startsWith(`${section}.`))
            if (sectionFields.length === 0) return null
            return (
              <SectionGroup
                key={section}
                prefix={section}
                fields={sectionFields}
                onChange={handleFieldChange}
              />
            )
          })}
          {sections.length === 0 && (
            <div className="text-center py-16 text-[#6B7280]">
              <Edit3 size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">No editable fields found.</p>
              <p className="text-sm mt-1 opacity-70">Switch to JSON mode to edit raw content.</p>
            </div>
          )}
        </div>
      )}

      {/* ── JSON Editor ── */}
      {status !== 'loading' && mode === 'json' && (
        <div className="relative">
          <textarea
            value={jsonText}
            onChange={e => setJsonText(e.target.value)}
            spellCheck={false}
            className="w-full h-[60vh] font-mono text-sm bg-[#1e1e2e] text-[#cdd6f4] rounded-2xl p-6 resize-none focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50 border border-slate-200"
          />
          <span className="absolute top-3 right-4 text-xs text-[#6B7280] bg-[#1e1e2e] px-2">JSON</span>
        </div>
      )}
    </div>
  )
}
