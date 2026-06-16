'use client'

import { CollapsibleCard } from '@/components/admin/collapsible-card'
import { CaseStudyLayout } from '@/components/case-studies/case-study-layout'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { getAdminBasePath } from '@/lib/admin-path'
import { getAdminHeaders } from '@/lib/middleware/auth'
import { CaseStudy, CaseStudyCreateInputSchema } from '@/lib/types/case_study'
import { generateSlug } from '@/lib/utils/formatting'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, BookMarked, Building2, CheckCircle2, Code2, Copy, Download, FileText, Loader2, Plus, Save, Target, Trash2, Upload, User, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import type { z } from 'zod'

const INDUSTRY_TYPES = ['E-commerce', 'SaaS', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Other'] as const
const CATEGORY_TYPES = ['Start Up', 'Mid Level / MSE', 'Enterprise', 'Government', 'NGO', 'Other'] as const

type CSInput = z.infer<typeof CaseStudyCreateInputSchema>
type CSSection = 'author' | 'company' | 'case_study' | 'problem' | 'solution' | 'results' | 'testimonial'

interface Props { initialData?: CaseStudy & any; isEditing?: boolean }

const cls = (err?: boolean) =>
  `w-full text-[14px] text-[#0d253d] bg-white border rounded-xl px-4 py-2.5 outline-none transition-all shadow-sm h-auto focus-visible:ring-[3px] focus-visible:outline-none ${err ? 'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive' : 'border-slate-200 focus-visible:ring-[#DC2626]/20 focus-visible:border-[#DC2626]'}`

const navItems: { key: CSSection; label: string; icon: React.ElementType }[] = [
  { key: 'author', label: 'Author Info', icon: User },
  { key: 'company', label: 'Company Info', icon: Building2 },
  { key: 'case_study', label: 'Case Study Info', icon: FileText },
  { key: 'problem', label: 'The Problem', icon: AlertTriangle },
  { key: 'solution', label: 'The Solution', icon: CheckCircle2 },
  { key: 'results', label: 'Results', icon: Target },
  { key: 'testimonial', label: 'Testimonial', icon: FileText },
]

const meta: Record<CSSection, { title: string; subtitle: string; icon: React.ElementType }> = {
  author: { title: 'Author Info', subtitle: 'Who wrote this case study', icon: User },
  company: { title: 'Company Info', subtitle: 'Client details & classification', icon: Building2 },
  case_study: { title: 'Case Study Info', subtitle: 'Title, subtitle & highlights', icon: FileText },
  problem: { title: 'The Problem', subtitle: 'Challenges faced', icon: AlertTriangle },
  solution: { title: 'The Solution', subtitle: 'How it was solved', icon: CheckCircle2 },
  results: { title: 'Results', subtitle: 'Impact and metrics', icon: Target },
  testimonial: { title: 'Testimonial', subtitle: 'Client quote', icon: FileText },
}

export function CaseStudyForm({ initialData, isEditing = false }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [active, setActive] = useState<CSSection>('author')
  const [isCustomIndustry, setIsCustomIndustry] = useState(() =>
    initialData?.industry ? !INDUSTRY_TYPES.includes(initialData.industry as any) : false
  )
  const [isCustomCategory, setIsCustomCategory] = useState(() =>
    initialData?.tag_type ? !CATEGORY_TYPES.includes(initialData.tag_type as any) : false
  )
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState(initialData?.featured_image ?? '')
  const [logoPreview, setLogoPreview] = useState(initialData?.company_logo ?? '')
  const [isUploading, setIsUploading] = useState(false)
  const [isLogoUploading, setIsLogoUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [logoUploadError, setLogoUploadError] = useState<string | null>(null)

  // ── JSON import / export ──────────────────────────────────────
  const [jsonModal, setJsonModal] = useState<'closed' | 'import' | 'export'>('closed')
  const [jsonText, setJsonText] = useState('')
  const [jsonError, setJsonError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, watch, setValue, control, reset } = useForm<CSInput>({
    resolver: zodResolver(CaseStudyCreateInputSchema),
    defaultValues: {
      title: initialData?.title ?? '', slug: initialData?.slug ?? '',
      subtitle: initialData?.subtitle ?? '', company_name: initialData?.company_name ?? '',
      company_logo: initialData?.company_logo ?? '', industry: initialData?.industry ?? '',
      featured_image: initialData?.featured_image ?? '', author: initialData?.author ?? '',
      published: initialData?.published ?? false, is_featured: initialData?.is_featured ?? false,
      tag_type: initialData?.tag_type ?? undefined, seo_title: initialData?.seo_title ?? '',
      seo_description: initialData?.seo_description ?? '', content: initialData?.content ?? '',

      problem: initialData?.problem ?? { heading: '', description: '', cards: [] },
      solution: initialData?.solution ?? { heading: '', description: '', steps: [] },
      results: initialData?.results ?? { title: '', items: [] },
      testimonial: initialData?.testimonial ?? { quote: '', person_name: '', designation: '', avatar_url: '' },
      metrics: initialData?.metrics ?? [],
    },
  })

  const { fields: problemCards, append: appendProblemCard, remove: removeProblemCard, replace: replaceProblemCards } = useFieldArray({ control, name: 'problem.cards' })
  const { fields: solutionSteps, append: appendSolutionStep, remove: removeSolutionStep, replace: replaceSolutionSteps } = useFieldArray({ control, name: 'solution.steps' })
  const { fields: resultItems, append: appendResultItem, remove: removeResultItem, replace: replaceResultItems } = useFieldArray({ control, name: 'results.items' })
  const { fields: metricFields, append: appendMetric, remove: removeMetric, replace: replaceMetrics } = useFieldArray({ control, name: 'metrics' })

  const handleJsonImport = () => {
    setJsonError(null)
    let parsedRaw: any
    try {
      parsedRaw = JSON.parse(jsonText)
    } catch {
      setJsonError('Invalid JSON — please check your syntax.')
      return
    }

    const cleanJson = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(cleanJson)
      }
      if (obj && typeof obj === 'object') {
        return Object.fromEntries(
          Object.entries(obj)
            .filter(([k]) => !k.startsWith('_'))
            .map(([k, v]) => [k, cleanJson(v)])
        )
      }
      return obj
    }

    const parsed = cleanJson(parsedRaw)

    // Validate against schema (soft — just try, don't block)
    const { problem, solution, results, metrics, testimonial, ...rest } = parsed
    reset({ ...rest, problem: problem ?? { heading: '', description: '', cards: [] }, solution: solution ?? { heading: '', description: '', steps: [] }, results: results ?? { title: '', items: [] }, metrics: metrics ?? [], testimonial: testimonial ?? { quote: '', person_name: '', designation: '', avatar_url: '' } })
    // Repopulate field arrays
    replaceProblemCards(problem?.cards ?? [])
    replaceSolutionSteps(solution?.steps ?? [])
    replaceResultItems(results?.items ?? [])
    replaceMetrics(metrics ?? [])
    // Sync previews
    if (rest.company_logo) setLogoPreview(rest.company_logo)
    if (rest.featured_image) setImagePreview(rest.featured_image)
    setJsonModal('closed')
    setJsonText('')
  }

  const handleJsonExport = () => {
    const exportData: any = { ...watch() }

    if (!exportData.title) {
      exportData._version = "1.0"
      exportData._description = "Case Study Import Template"
    }

    if (!exportData.metrics?.length) {
      exportData.metrics = [{
        _help: "Top hero metric",
        metric_value: "35%",
        metric_label: "Reduction in hiring time",
        display_order: 0
      }]
    }

    if (!exportData.problem?.cards?.length) {
      exportData.problem = {
        ...(exportData.problem || {}),
        cards: [{
          _help: "Single challenge card",
          stat: "15+",
          stat_label: "hours wasted",
          title: "Manual Resume Screening",
          bullets: ["Reviewing applications manually", "Slow candidate evaluation", "High recruiter workload"],
          display_order: 0
        }]
      }
    }

    if (!exportData.solution?.steps?.length) {
      exportData.solution = {
        ...(exportData.solution || {}),
        steps: [{
          _help: "One solution step",
          step_number: 1,
          title: "Automated Screening",
          bullets: ["Resume scoring", "Candidate ranking", "Auto filtering"],
          display_order: 0
        }]
      }
    }

    if (!exportData.results?.items?.length) {
      exportData.results = {
        ...(exportData.results || {}),
        items: [{
          _help: "Result block",
          category: "Efficiency",
          badge: "35% IMPROVEMENT",
          metrics: [
            { value: "35%", label: "faster hiring" },
            { value: "15+", label: "hours saved" },
            { value: "60%", label: "less manual work" }
          ],
          display_order: 0
        }]
      }
    }

    setJsonText(JSON.stringify(exportData, null, 2))
    setJsonError(null)
    setJsonModal('export')
  }

  const handleTitleChange = (v: string) => { if (!isEditing) setValue('slug', generateSlug(v)) }

  const handleFileSelect = async (file: File) => {
    if (!file) return
    setUploadError(null); setIsUploading(true)
    setImagePreview(URL.createObjectURL(file))
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/upload/blog-image', { method: 'POST', body: fd })
      const json = await res.json()
      if (!json.success) { setUploadError(json.error ?? 'Upload failed'); setImagePreview(initialData?.featured_image ?? ''); return }
      setImagePreview(json.url); setValue('featured_image', json.url, { shouldValidate: true })
    } catch { setUploadError('Upload failed'); setImagePreview(initialData?.featured_image ?? '') }
    finally { setIsUploading(false) }
  }

  const handleLogoSelect = async (file: File) => {
    if (!file) return
    setLogoUploadError(null); setIsLogoUploading(true)
    setLogoPreview(URL.createObjectURL(file))
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/upload/blog-image', { method: 'POST', body: fd })
      const json = await res.json()
      if (!json.success) { setLogoUploadError(json.error ?? 'Upload failed'); setLogoPreview(initialData?.company_logo ?? ''); return }
      setLogoPreview(json.url); setValue('company_logo', json.url, { shouldValidate: true })
    } catch { setLogoUploadError('Upload failed'); setLogoPreview(initialData?.company_logo ?? '') }
    finally { setIsLogoUploading(false) }
  }

  const handleDropZoneClick = () => fileInputRef.current?.click()
  const clearImage = () => { setImagePreview(''); setValue('featured_image', '', { shouldValidate: true }); if (fileInputRef.current) fileInputRef.current.value = '' }
  const clearLogo = () => { setLogoPreview(''); setValue('company_logo', '', { shouldValidate: true }); if (logoInputRef.current) logoInputRef.current.value = '' }

  const onSubmit = async (data: CSInput) => {
    try {
      setIsLoading(true); setError(null)
      const url = isEditing ? `/api/case-studies/${initialData?.id}` : '/api/case-studies'
      const res = await fetch(url, { method: isEditing ? 'PATCH' : 'POST', headers: getAdminHeaders(), body: JSON.stringify(data) })
      const result = await res.json()
      if (!result.success) { setError(result.error || 'An error occurred'); return }
      router.push(getAdminBasePath()); router.refresh()
    } catch { setError('An error occurred while saving') }
    finally { setIsLoading(false) }
  }

  const { title: sTitle, subtitle: sSubtitle, icon: SIcon } = meta[active]

  if (showPreview) {
    const study = watch()
    return (
      <div className="w-full h-full flex flex-col bg-slate-50 -m-6 sm:-m-8 lg:-m-10 min-h-screen">
        <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowPreview(false)} className="text-black hover:text-white hover:bg-black">
              ← Back to Edit
            </Button>
            <h2 className="text-lg font-semibold text-[#1B2340]">Preview Mode</h2>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={handleJsonExport} className="border-black text-black hover:text-white hover:bg-black text-sm gap-1.5">
              <Download size={13} /> Export JSON
            </Button>
            <Button type="button" variant="outline" onClick={() => { setJsonText(''); setJsonError(null); setJsonModal('import') }} className="border-black text-black hover:text-white hover:bg-black text-sm gap-1.5">
              <Upload size={13} /> Import JSON
            </Button>
            <button type="button" onClick={handleSubmit(onSubmit)} disabled={isLoading} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-[#DC2626] disabled:opacity-60 transition-all shadow-sm">
              {isLoading ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {isLoading ? 'Saving…' : isEditing ? 'Update Study' : 'Save Study'}
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <CaseStudyLayout study={study} />
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex -m-6 sm:-m-8 lg:-m-10">
      {/* Secondary Sidebar */}
      <aside className="w-56 shrink-0 bg-slate-50/60 border-r border-slate-200 flex flex-col h-screen sticky top-0 overflow-y-auto">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1B2340] shadow-md shrink-0">
              <BookMarked size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-[#1B2340] uppercase tracking-wider">{isEditing ? 'Edit Study' : 'New Study'}</h2>
              <p className="text-[11px] text-[#6B7280] mt-0.5">Select a section</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = active === key
            return (
              <button key={key} type="button" onClick={() => setActive(key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? 'bg-[#DC2626] text-white font-semibold shadow-sm' : 'text-[#6B7280] hover:text-[#DC2626] hover:bg-slate-200/50 font-medium'}`}>
                <Icon size={15} className={isActive ? 'text-white' : 'text-[#6B7280]'} />
                <span>{label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {error && <div className="px-8 pt-6"><Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert></div>}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 pt-8 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B2340] shadow-md shrink-0">
              <SIcon size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1B2340]">{sTitle}</h1>
              <p className="text-sm text-[#6B7280] mt-0.5">{sSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()} className="border-black text-black hover:bg-black hover:text-white text-sm">Cancel</Button>
            <Button type="button" onClick={() => setShowPreview(true)} className="bg-black text-white hover:bg-[#DC2626] text-sm">Preview</Button>
            <Button type="button" variant="outline" onClick={handleJsonExport} className="border-black text-black hover:text-white hover:bg-black text-sm gap-1.5 hidden sm:flex">
              <Download size={13} /> Export JSON
            </Button>
            <Button type="button" variant="outline" onClick={() => { setJsonText(''); setJsonError(null); setJsonModal('import') }} className="border-black text-black hover:text-white hover:bg-black text-sm gap-1.5 hidden sm:flex">
              <Upload size={13} /> Import JSON
            </Button>
            <button type="submit" disabled={isLoading || isUploading}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#DC2626] text-white text-sm font-semibold hover:bg-black disabled:opacity-60 transition-all shadow-sm">
              {isLoading ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {isLoading ? 'Saving…' : isEditing ? 'Update Study' : 'Save Study'}
            </button>
          </div>
        </div>

        <input type="hidden" {...register('slug')} />

        <div className="flex-1 overflow-y-auto px-8 pb-10 space-y-5">

          {/* ── AUTHOR INFO ── */}
          {active === 'author' && (
            <div className="space-y-5">
              <CollapsibleCard title="Author Details" defaultOpen={false}>
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-sm font-semibold text-[#1B2340]">Author Name <span className="text-[#DC2626]">*</span></Label>
                  <Input id="author" placeholder="Your full name" {...register('author')} className={cls(!!errors.author)} />
                  {errors.author && <p className="text-sm text-[#DC2626]">{errors.author.message}</p>}
                </div>
              </CollapsibleCard>
              <div className="pt-2">
                <Button type="button" onClick={() => setActive('company')} className="bg-[#DC2626] hover:bg-[#B91C1C] text-white">Next: Company Info →</Button>
              </div>
            </div>
          )}

          {/* ── COMPANY INFO ── */}
          {active === 'company' && (
            <div className="space-y-5">

              {/* Company Details card */}
              <CollapsibleCard title="Company Details" defaultOpen={false}>
                <div className="space-y-2">
                  <Label htmlFor="company_name" className="text-sm font-semibold text-[#1B2340]">Company Name <span className="text-[#DC2626]">*</span></Label>
                  <Input id="company_name" placeholder="e.g. Acme Corp" {...register('company_name')} className={cls(!!errors.company_name)} />
                  {errors.company_name && <p className="text-sm text-[#DC2626]">{errors.company_name.message}</p>}
                </div>

                {/* Industry Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-semibold text-[#1B2340]">Industry</Label>
                  <Controller name="industry" control={control} render={({ field }) => (
                    <div className="space-y-2">
                      <select
                        id="industry"
                        value={isCustomIndustry ? 'Other' : (field.value ?? '')}
                        onChange={e => {
                          const v = e.target.value
                          if (v === 'Other') { setIsCustomIndustry(true); field.onChange('') }
                          else { setIsCustomIndustry(false); field.onChange(v || null) }
                        }}
                        className="w-full text-[14px] text-[#0d253d] bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-[#DC2626]/10 focus:border-[#DC2626] transition-all shadow-sm appearance-none"
                      >
                        <option value="">— Select industry —</option>
                        {INDUSTRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {isCustomIndustry && (
                        <Input placeholder="Enter custom industry" value={field.value ?? ''} onChange={e => field.onChange(e.target.value)} className={cls()} />
                      )}
                    </div>
                  )} />
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="tag_type" className="text-sm font-semibold text-[#1B2340]">Category</Label>
                  <Controller name="tag_type" control={control} render={({ field }) => (
                    <div className="space-y-2">
                      <select
                        id="tag_type"
                        value={isCustomCategory ? 'Other' : (field.value ?? '')}
                        onChange={e => {
                          const v = e.target.value
                          if (v === 'Other') { setIsCustomCategory(true); field.onChange('') }
                          else { setIsCustomCategory(false); field.onChange(v || null) }
                        }}
                        className="w-full text-[14px] text-[#0d253d] bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-[#DC2626]/10 focus:border-[#DC2626] transition-all shadow-sm appearance-none"
                      >
                        <option value="">— Select category —</option>
                        {CATEGORY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {isCustomCategory && (
                        <Input placeholder="Enter custom category" value={field.value ?? ''} onChange={e => field.onChange(e.target.value)} className={cls()} />
                      )}
                    </div>
                  )} />
                </div>
              </CollapsibleCard>

              {/* Company Logo Upload */}
              <CollapsibleCard title="Company Logo" subtitle="Upload a transparent PNG or SVG for best results." defaultOpen={false}>
                {logoUploadError && <Alert variant="destructive" className="py-2"><AlertTriangle className="h-4 w-4" /><AlertDescription>{logoUploadError}</AlertDescription></Alert>}
                {logoPreview ? (
                  <div className="relative inline-flex items-center justify-center border border-slate-200 rounded-xl p-4 bg-slate-50 group">
                    <img src={logoPreview} alt="company logo" className="h-16 max-w-[200px] object-contain" />
                    {isLogoUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl"><Loader2 className="h-6 w-6 animate-spin text-slate-500" /></div>}
                    <button type="button" onClick={clearLogo} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"><X size={12} /></button>
                  </div>
                ) : (
                  <div
                    role="button" tabIndex={0}
                    onClick={() => logoInputRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleLogoSelect(f) }}
                    className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#DC2626]/50 hover:bg-[#DC2626]/5 transition-colors"
                  >
                    {isLogoUploading
                      ? <div className="flex flex-col items-center gap-2"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /><p className="text-sm text-slate-500">Uploading…</p></div>
                      : <div className="flex flex-col items-center gap-2"><div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><Upload className="h-5 w-5 text-slate-400" /></div><p className="text-sm font-medium text-[#1B2340]">Click to upload logo</p><p className="text-xs text-slate-400">PNG, SVG, WebP — transparent background preferred</p></div>
                    }
                  </div>
                )}
                <input ref={logoInputRef} type="file" accept="image/png,image/svg+xml,image/webp,image/jpeg" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoSelect(f) }} />
                <input type="hidden" {...register('company_logo')} />
              </CollapsibleCard>

              {/* About Section */}
              <CollapsibleCard title="About Company" defaultOpen={false}>
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-semibold text-[#1B2340]">About / Overview</Label>
                  <Textarea id="content" placeholder="Brief overview of the company..." {...register('content')} rows={5} className={cls()} />
                </div>
              </CollapsibleCard>

              <div className="pt-2">
                <Button type="button" onClick={() => setActive('case_study')} className="bg-[#DC2626] hover:bg-[#B91C1C] text-white">Next: Case Study Info →</Button>
              </div>
            </div>
          )}

          {/* ── CASE STUDY INFO ── */}
          {active === 'case_study' && (
            <div className="space-y-5">

              {/* Core Details */}
              <CollapsibleCard title="Core Details" defaultOpen={false}>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-[#1B2340]">Case Study Title <span className="text-[#DC2626]">*</span></Label>
                  <Input id="title" placeholder="Enter case study title" {...register('title', { onChange: e => handleTitleChange(e.target.value) })} className={cls(!!errors.title)} />
                  {errors.title && <p className="text-sm text-[#DC2626]">{errors.title.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle" className="text-sm font-semibold text-[#1B2340]">Subtitle / Tagline</Label>
                  <Input id="subtitle" placeholder="One-line description of the engagement" {...register('subtitle')} className={cls()} />
                </div>
              </CollapsibleCard>

              {/* Highlights / Hero Metrics */}
              <CollapsibleCard
                title="Highlights"
                subtitle="Key stats shown at the top — e.g. 50% · Faster time-to-hire"
                defaultOpen={false}
                headerAction={
                  <Button
                    type="button" variant="outline" size="sm"
                    onClick={() => appendMetric({ metric_value: '', metric_label: '', display_order: metricFields.length })}
                  >
                    <Plus size={14} className="mr-1" /> Add Highlight
                  </Button>
                }
              >
                {metricFields.length === 0 && (
                  <div className="text-center py-8 text-sm text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                    No highlights yet — add key stats like <span className="font-semibold">50%</span> · Faster time-to-hire
                  </div>
                )}

                <div className="space-y-3">
                  {metricFields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-slate-600">Value</Label>
                            <Input placeholder="e.g. 50%" {...register(`metrics.${index}.metric_value` as const)} className={cls()} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-slate-600">Label</Label>
                            <Input placeholder="e.g. Faster time-to-hire" {...register(`metrics.${index}.metric_label` as const)} className={cls()} />
                          </div>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeMetric(index)} className="text-slate-300 hover:text-red-500 mt-6 shrink-0"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </CollapsibleCard>

              {/* Publish Settings */}
              <CollapsibleCard title="Publish Settings" defaultOpen={false}>
                <div className="flex items-center space-x-3">
                  <Controller name="published" control={control} render={({ field }) => <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />} />
                  <Label htmlFor="published" className="font-normal cursor-pointer text-sm text-[#6B7280]">Publish immediately</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Controller name="is_featured" control={control} render={({ field }) => <Switch id="is_featured" checked={field.value ?? false} onCheckedChange={field.onChange} />} />
                  <Label htmlFor="is_featured" className="font-normal cursor-pointer text-sm text-[#6B7280]">Mark as Featured</Label>
                </div>
              </CollapsibleCard>

              <div className="pt-2">
                <Button type="button" onClick={() => setActive('problem')} className="bg-[#DC2626] hover:bg-[#B91C1C] text-white">Next: The Problem →</Button>
              </div>
            </div>
          )}

          {/* ── THE PROBLEM ── */}
          {active === 'problem' && (
            <div className="space-y-5">
              <CollapsibleCard title="Problem Details" defaultOpen={false}>
                <div className="space-y-2">
                  <Label htmlFor="problem.heading" className="text-sm font-semibold text-[#1B2340]">Heading</Label>
                  <Input id="problem.heading" placeholder="e.g. The Challenge" {...register('problem.heading')} className={cls()} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="problem.description" className="text-sm font-semibold text-[#1B2340]">Description</Label>
                  <Textarea id="problem.description" placeholder="Describe the problem..." {...register('problem.description')} rows={4} className={cls()} />
                </div>
              </CollapsibleCard>

              <CollapsibleCard
                title="Problem Cards"
                defaultOpen={false}
                headerAction={
                  <Button type="button" variant="outline" size="sm" onClick={() => appendProblemCard({ stat: '', stat_label: '', title: '', bullets: [], display_order: problemCards.length })}>
                    <Plus size={14} className="mr-1" /> Add Card
                  </Button>
                }
              >
                {problemCards.map((field, index) => (
                  <div key={field.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 relative">
                    <button type="button" onClick={() => removeProblemCard(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>

                    {/* Row 1: Stat value + Stat label */}
                    <div className="grid grid-cols-2 gap-4 mr-8">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-600">Stat Value</Label>
                        <Input placeholder="e.g. 15+ hrs" {...register(`problem.cards.${index}.stat` as const)} className={cls()} />
                        <p className="text-[11px] text-slate-400">Large purple number at the top</p>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-600">Stat Label</Label>
                        <Input placeholder="e.g. per week on hiring" {...register(`problem.cards.${index}.stat_label` as const)} className={cls()} />
                        <p className="text-[11px] text-slate-400">Grey subtitle under the stat</p>
                      </div>
                    </div>

                    {/* Row 2: Card title */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Card Title</Label>
                      <Input placeholder="e.g. Founder time drain" {...register(`problem.cards.${index}.title` as const)} className={cls()} />
                      <p className="text-[11px] text-slate-400">Bold heading shown after the divider</p>
                    </div>

                    {/* Row 3: Bullet points */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Bullet Points</Label>
                      <Controller
                        name={`problem.cards.${index}.bullets` as const}
                        control={control}
                        render={({ field: f }) => (
                          <Textarea
                            placeholder={`Co-founders manually screening every resume\nFirst-round interviews running back-to-back\nProduct decisions getting deferred`}
                            value={Array.isArray(f.value) ? f.value.join('\n') : (f.value ?? '')}
                            onChange={e => f.onChange(e.target.value.split('\n').filter(Boolean))}
                            rows={4}
                            className={cls()}
                          />
                        )}
                      />
                      <p className="text-[11px] text-slate-400">One bullet per line (dash — style in the preview)</p>
                    </div>
                  </div>
                ))}
                {problemCards.length === 0 && <div className="text-center py-8 text-sm text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">No cards added yet.</div>}
              </CollapsibleCard>

              <div className="pt-2">
                <Button type="button" onClick={() => setActive('solution')} className="bg-[#DC2626] hover:bg-[#B91C1C] text-white">Next: The Solution →</Button>
              </div>
            </div>
          )}

          {/* ── THE SOLUTION ── */}
          {active === 'solution' && (
            <div className="space-y-5">
              <CollapsibleCard title="Solution Details" defaultOpen={false}>
                <div className="space-y-2">
                  <Label htmlFor="solution.heading" className="text-sm font-semibold text-[#1B2340]">Heading</Label>
                  <Input id="solution.heading" placeholder="e.g. The Solution" {...register('solution.heading')} className={cls()} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solution.description" className="text-sm font-semibold text-[#1B2340]">Description</Label>
                  <Textarea id="solution.description" placeholder="Describe the solution..." {...register('solution.description')} rows={4} className={cls()} />
                </div>
              </CollapsibleCard>

              <CollapsibleCard
                title="Solution Steps"
                defaultOpen={false}
                headerAction={
                  <Button type="button" variant="outline" size="sm" onClick={() => appendSolutionStep({ step_number: solutionSteps.length + 1, title: '', bullets: [], display_order: solutionSteps.length })}>
                    <Plus size={14} className="mr-1" /> Add Step
                  </Button>
                }
              >
                {solutionSteps.map((field, index) => (
                  <div key={field.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 relative">
                    <button type="button" onClick={() => removeSolutionStep(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>

                    {/* Step title — full width, auto step number shown as badge */}
                    <div className="flex items-center gap-2 mr-8">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold shrink-0">{index + 1}</span>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Step {index + 1}</span>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Step Title</Label>
                      <Input placeholder="e.g. Every applicant scored" {...register(`solution.steps.${index}.title` as const)} className={cls()} />
                    </div>

                    {/* Row 2: Bullet Points */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Bullet Points</Label>
                      <Controller
                        name={`solution.steps.${index}.bullets` as const}
                        control={control}
                        render={({ field: f }) => (
                          <Textarea
                            placeholder={`Every resume evaluated against technical + startup-fit criteria\nRanked shortlist instead of a pile of unread applications\nNo more 20-out-of-150 manual triage`}
                            value={Array.isArray(f.value) ? f.value.join('\n') : (f.value ?? '')}
                            onChange={e => f.onChange(e.target.value.split('\n').filter(Boolean))}
                            rows={4}
                            className={cls()}
                          />
                        )}
                      />
                      <p className="text-[11px] text-slate-400">One bullet per line — shown with ✓ checkmarks in the preview</p>
                    </div>
                  </div>
                ))}
                {solutionSteps.length === 0 && <div className="text-center py-8 text-sm text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">No steps added yet.</div>}
              </CollapsibleCard>

              <div className="pt-2">
                <Button type="button" onClick={() => setActive('results')} className="bg-[#DC2626] hover:bg-[#B91C1C] text-white">Next: Results →</Button>
              </div>
            </div>
          )}

          {/* ── RESULTS ── */}
          {active === 'results' && (
            <div className="space-y-5">
              <CollapsibleCard title="Results Details" defaultOpen={false}>
                <div className="space-y-2">
                  <Label htmlFor="results.title" className="text-sm font-semibold text-[#1B2340]">Section Title</Label>
                  <Input id="results.title" placeholder="e.g. The Impact" {...register('results.title')} className={cls()} />
                </div>
              </CollapsibleCard>

              <CollapsibleCard
                title="Result Items"
                defaultOpen={false}
                headerAction={
                  <Button type="button" variant="outline" size="sm" onClick={() => appendResultItem({ category: '', badge: '', metrics: [], display_order: resultItems.length })}>
                    <Plus size={14} className="mr-1" /> Add Result Category
                  </Button>
                }
              >
                {resultItems.map((field, index) => (
                  <div key={field.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5 relative">
                    <button type="button" onClick={() => removeResultItem(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>

                    {/* Row 1: Category name + Badge */}
                    <div className="grid grid-cols-2 gap-4 mr-8">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-600">Category Name</Label>
                        <Input placeholder="e.g. Founder time reclaimed" {...register(`results.items.${index}.category` as const)} className={cls()} />
                        <p className="text-[11px] text-slate-400">Bold label on the left of the row</p>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-600">Badge Text</Label>
                        <Input placeholder="e.g. 15 HRS / WEEK BACK" {...register(`results.items.${index}.badge` as const)} className={cls()} />
                        <p className="text-[11px] text-slate-400">Green pill shown below the category</p>
                      </div>
                    </div>

                    {/* Row 2: Metrics (up to 3) */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-slate-600">Metrics (up to 3 columns)</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {[0, 1, 2].map(mi => (
                          <div key={mi} className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Metric {mi + 1}</p>
                            <div className="space-y-1.5">
                              <Label className="text-[11px] font-semibold text-slate-600">Value</Label>
                              <Input
                                placeholder={mi === 0 ? 'e.g. 15+' : mi === 1 ? 'e.g. 60%' : 'e.g. 0'}
                                {...register(`results.items.${index}.metrics.${mi}.value` as const)}
                                className={cls()}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-[11px] font-semibold text-slate-600">Label</Label>
                              <Input
                                placeholder={mi === 0 ? 'founder hours reclaimed per week' : mi === 1 ? 'reduction in founder interview hours' : 'first-round interviews by founders'}
                                {...register(`results.items.${index}.metrics.${mi}.label` as const)}
                                className={cls()}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-400">Each metric shows as a large value + small description in the result row</p>
                    </div>
                  </div>
                ))}
                {resultItems.length === 0 && <div className="text-center py-8 text-sm text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">No results added yet.</div>}
              </CollapsibleCard>
              <div className="pt-2">
                <Button type="button" onClick={() => setActive('testimonial')} className="bg-[#DC2626] hover:bg-[#B91C1C] text-white">Next: Testimonial →</Button>
              </div>
            </div>
          )}

          {/* ── TESTIMONIAL ── */}
          {active === 'testimonial' && (
            <div className="space-y-5">
              <CollapsibleCard title="Client Quote" defaultOpen={true}>
                <div className="space-y-2">
                  <Label htmlFor="testimonial.quote" className="text-sm font-semibold text-[#1B2340]">Quote</Label>
                  <Textarea id="testimonial.quote" placeholder="e.g. Fabric worked so well for our engineering hires..." {...register('testimonial.quote')} rows={4} className={cls()} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="testimonial.person_name" className="text-sm font-semibold text-[#1B2340]">Person Name</Label>
                    <Input id="testimonial.person_name" placeholder="e.g. Harry Gupta" {...register('testimonial.person_name')} className={cls()} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimonial.designation" className="text-sm font-semibold text-[#1B2340]">Designation</Label>
                    <Input id="testimonial.designation" placeholder="e.g. Co-Founder, QuickReply" {...register('testimonial.designation')} className={cls()} />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="testimonial.avatar_url" className="text-sm font-semibold text-[#1B2340]">Avatar URL</Label>
                  <Input id="testimonial.avatar_url" placeholder="e.g. https://.../avatar.jpg" {...register('testimonial.avatar_url')} className={cls()} />
                </div>
              </CollapsibleCard>
            </div>
          )}

        </div>

      </div>

      {/* JSON Import/Export Modal */}
      {jsonModal !== 'closed' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2 text-[#1B2340]">
                <Code2 size={20} />
                <h3 className="font-semibold">{jsonModal === 'import' ? 'Import JSON' : 'Export JSON'}</h3>
              </div>
              <button type="button" onClick={() => setJsonModal('closed')} className="p-2 rounded-full hover:bg-slate-200/50 text-slate-500 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {jsonModal === 'import' && (
                <p className="text-sm text-slate-500 mb-4">
                  Paste a JSON object below. It should match the case study data structure.
                </p>
              )}
              {jsonError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{jsonError}</AlertDescription>
                </Alert>
              )}
              <Textarea
                value={jsonText}
                onChange={(e) => { setJsonText(e.target.value); setJsonError(null); }}
                readOnly={jsonModal === 'export'}
                className="font-mono text-sm min-h-[400px] bg-slate-900 text-slate-50 border-0 p-4 rounded-xl focus-visible:ring-1 focus-visible:ring-slate-400"
                placeholder="{ ... }"
                spellCheck={false}
              />
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setJsonModal('closed')} className="text-black hover:text-white hover:bg-black">
                Cancel
              </Button>
              {jsonModal === 'import' ? (
                <Button type="button" onClick={handleJsonImport} className="bg-black text-white hover:bg-[#DC2626]">
                  <Upload size={16} className="mr-2" />
                  Import Data
                </Button>
              ) : (
                <Button type="button" onClick={() => { navigator.clipboard.writeText(jsonText); setJsonModal('closed'); }} className="bg-black text-white hover:bg-[#DC2626]">
                  <Copy size={16} className="mr-2" />
                  Copy to Clipboard
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </form>
  )
}