'use client'

import { CollapsibleCard } from '@/components/admin/collapsible-card'
import { BlogContent } from '@/components/blog/blog-content'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { getAdminBasePath } from '@/lib/admin-path'
import { getAdminHeaders } from '@/lib/middleware/auth'
import { Blog, BLOG_TAG_TYPES, BlogCreateInputSchema } from '@/lib/types/blog'
import { generateSlug } from '@/lib/utils/formatting'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertTriangle,
  BookOpen,
  Code2,
  Copy,
  Download,
  ImageIcon,
  Loader2,
  Save,
  Tag,
  Upload,
  User,
  X,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { z } from 'zod'

type BlogFormInput = z.infer<typeof BlogCreateInputSchema>

interface BlogFormProps {
  initialData?: Blog
  isEditing?: boolean
}

type BlogSection = 'author' | 'details'

const inputCls = (hasError?: boolean) =>
  `w-full text-[14px] text-[#0d253d] bg-white border rounded-xl px-4 py-2.5 outline-none transition-all shadow-sm h-auto focus-visible:ring-[3px] focus-visible:outline-none ${hasError
    ? 'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive'
    : 'border-slate-200 focus-visible:ring-[#DC2626]/20 focus-visible:border-[#DC2626]'
  }`

const navItems: { key: BlogSection; label: string; icon: React.ElementType }[] = [
  { key: 'author', label: 'Author Info', icon: User },
  { key: 'details', label: 'Blog Details', icon: BookOpen },
]

const sectionMeta: Record<BlogSection, { title: string; subtitle: string; icon: React.ElementType }> = {
  author: { title: 'Author Info', subtitle: 'Enter the post author details', icon: User },
  details: { title: 'Blog Details', subtitle: 'Title, content, image and settings', icon: BookOpen },
}

export function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [activeSection, setActiveSection] = useState<BlogSection>('author')
  const [isCustomCategory, setIsCustomCategory] = useState(() => {
    if (!initialData?.tag_type) return false
    return !BLOG_TAG_TYPES.includes(initialData.tag_type as any)
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string>(initialData?.featured_image ?? '')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // ── JSON import / export ──────────────────────────────────────
  const [jsonModal, setJsonModal] = useState<'closed' | 'import' | 'export'>('closed')
  const [jsonText, setJsonText] = useState('')
  const [jsonError, setJsonError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    trigger,
    reset,
  } = useForm<BlogFormInput>({
    resolver: zodResolver(BlogCreateInputSchema),
    defaultValues: initialData
      ? {
        title: initialData.title,
        slug: initialData.slug,
        description: initialData.description ?? '',
        content: initialData.content,
        author: initialData.author,
        featured_image: initialData.featured_image ?? '',
        published: initialData.published,
        is_featured: initialData.is_featured ?? false,
        tag_type: initialData.tag_type ?? undefined,
        created_by: initialData.created_by ?? '',
        updated_by: initialData.updated_by ?? '',
      }
      : {
        title: '',
        slug: '',
        description: '',
        content: '',
        author: '',
        featured_image: '',
        published: false,
        is_featured: false,
        tag_type: undefined,
        created_by: '',
        updated_by: '',
      },
  })

  const content = watch('content')

  const handleJsonImport = () => {
    setJsonError(null)
    let parsed: any
    try {
      parsed = JSON.parse(jsonText)
    } catch {
      setJsonError('Invalid JSON — please check your syntax.')
      return
    }
    reset(parsed)
    if (parsed.featured_image) setImagePreview(parsed.featured_image)
    if (parsed.tag_type && !BLOG_TAG_TYPES.includes(parsed.tag_type as any)) setIsCustomCategory(true)
    setJsonModal('closed')
    setJsonText('')
  }

  const handleTitleChange = (value: string) => {
    if (!isEditing) setValue('slug', generateSlug(value))
  }

  const handleFileSelect = async (file: File) => {
    if (!file) return
    setUploadError(null)
    setIsUploading(true)
    setImagePreview(URL.createObjectURL(file))
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload/blog-image', { method: 'POST', body: fd })
      const json = await res.json()
      if (!json.success) {
        setUploadError(json.error ?? 'Upload failed')
        setImagePreview(initialData?.featured_image ?? '')
        return
      }
      setImagePreview(json.url)
      setValue('featured_image', json.url, { shouldValidate: true })
    } catch {
      setUploadError('Upload failed — please try again')
      setImagePreview(initialData?.featured_image ?? '')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDropZoneClick = () => fileInputRef.current?.click()
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }
  const clearImage = () => {
    setImagePreview('')
    setValue('featured_image', '', { shouldValidate: true })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onSubmit = async (data: BlogFormInput) => {
    try {
      setIsLoading(true)
      setError(null)
      data.updated_by = data.author
      if (!isEditing) data.created_by = data.author
      const url = isEditing ? `/api/blogs/${initialData?.id}` : '/api/blogs'
      const method = isEditing ? 'PATCH' : 'POST'
      const response = await fetch(url, {
        method,
        headers: getAdminHeaders(),
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!result.success) {
        setError(result.error || 'An error occurred')
        return
      }
      router.push(getAdminBasePath())
      router.refresh()
    } catch (err) {
      setError('An error occurred while saving the blog')
      console.error('[blog-form] submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreviewClick = async () => {
    const isValid = await trigger()
    if (isValid) setShowPreview(true)
  }

  const { title: sectionTitle, subtitle: sectionSubtitle, icon: SectionIcon } = sectionMeta[activeSection]

  if (showPreview) {
    return (
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-[#DC2626]">Preview Mode</h2>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(false)}
              className="text-black hover:text-white hover:bg-black"
            >
              ← Back to Edit
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-10">
          {imagePreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imagePreview} alt="Featured image" className="w-full max-h-96 object-cover rounded-xl mb-8" />
          )}
          {content ? (
            <div className="prose dark:prose-invert max-w-none">
              <BlogContent content={content} />
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No content to preview.</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4 pt-2">
            <Button
              type="submit"
              disabled={isLoading || isUploading}
              className="bg-black hover:bg-[#DC2626] text-white border-none shadow-sm"
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</>
              ) : isEditing ? 'Update Post' : 'Submit Post'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPreview(false)}
              disabled={isLoading || isUploading}
              className="border-black text-black hover:text-white hover:bg-black"
            >
              Back to Edit
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex -m-6 sm:-m-8 lg:-m-10">
      {/* ── Secondary Sidebar ── */}
      <aside className="w-56 shrink-0 bg-slate-50/60 border-r border-slate-200 flex flex-col h-screen sticky top-0 overflow-y-auto">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1B2340] shadow-md shrink-0">
              <BookOpen size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-[#1B2340] uppercase tracking-wider">
                {isEditing ? 'Edit Post' : 'New Post'}
              </h2>
              <p className="text-[11px] text-[#6B7280] mt-0.5">Select a section</p>
            </div>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ key, label, icon: Icon }) => {
            const active = activeSection === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveSection(key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${active
                  ? 'bg-[#DC2626] text-white font-semibold shadow-sm'
                  : 'text-[#6B7280] hover:text-[#DC2626] hover:bg-slate-200/50 font-medium'
                  }`}
              >
                <Icon size={15} className={active ? 'text-white' : 'text-[#6B7280]'} />
                <span>{label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col">
        {error && (
          <div className="px-8 pt-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Content Manager-style Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 pt-8 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B2340] shadow-md shrink-0">
              <SectionIcon size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1B2340]">{sectionTitle}</h1>
              <p className="text-sm text-[#6B7280] mt-0.5">{sectionSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* JSON buttons */}
            <Button type="button" variant="outline" onClick={() => { setJsonText(JSON.stringify(watch(), null, 2)); setJsonError(null); setJsonModal('export') }} className="border-black text-black hover:text-white hover:bg-black text-sm gap-1.5 hidden sm:flex">
              <Download size={13} /> Export JSON
            </Button>
            <Button type="button" variant="outline" onClick={() => { setJsonText(''); setJsonError(null); setJsonModal('import') }} className="border-black text-black hover:text-white hover:bg-black text-sm gap-1.5 hidden sm:flex">
              <Upload size={13} /> Import JSON
            </Button>
          </div>
        </div>

        {/* Hidden slug */}
        <input type="hidden" {...register('slug')} />

        {/* Fields */}
        <div className="flex-1 px-8 pb-10 space-y-5">

          {/* ── AUTHOR INFO ── */}
          {activeSection === 'author' && (
            <div className="space-y-5">
              <CollapsibleCard title="Author Details" defaultOpen={false}>
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-sm font-semibold text-[#1B2340]">
                    Author Name <span className="text-[#DC2626]">*</span>
                  </Label>
                  <Input
                    id="author"
                    placeholder="Your full name"
                    {...register('author')}
                    className={inputCls(!!errors.author)}
                  />
                  {errors.author && (
                    <p className="text-sm text-[#DC2626]">{errors.author.message}</p>
                  )}
                </div>
              </CollapsibleCard>

            </div>
          )}

          {/* ── BLOG DETAILS ── */}
          {activeSection === 'details' && (
            <div className="space-y-5">
              <CollapsibleCard title="Post Details" defaultOpen={false}>
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-[#1B2340]">
                    Post Title <span className="text-[#DC2626]">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter blog post title"
                    {...register('title', {
                      onChange: (e) => handleTitleChange(e.target.value),
                    })}
                    className={inputCls(!!errors.title)}
                  />
                  {errors.title && <p className="text-sm text-[#DC2626]">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold text-[#1B2340]">
                    Short Description
                  </Label>
                  <Input
                    id="description"
                    placeholder="Brief summary of the post"
                    {...register('description')}
                    className={inputCls(!!errors.description)}
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-semibold text-[#1B2340]">
                    Post Content <span className="text-[#DC2626]">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    placeholder={`# Heading\n\nWrite your blog post here using markdown.\n\n- Bullet points\n- **Bold** and *italic*`}
                    {...register('content')}
                    rows={20}
                    className={`${inputCls(!!errors.content)} font-mono min-h-[420px] resize-y`}
                  />
                  {errors.content && <p className="text-sm text-[#DC2626]">{errors.content.message}</p>}
                </div>
              </CollapsibleCard>

              {/* Image + Category stack */}
              <div className="space-y-5">
                {/* Featured Image */}
                <CollapsibleCard title="Featured Image" defaultOpen={false}>
                  <Label className="flex items-center gap-1.5 text-sm font-semibold text-[#1B2340]">
                    <ImageIcon size={14} />
                    Featured Image <span className="text-[#DC2626]">*</span>
                  </Label>
                  {uploadError && (
                    <Alert variant="destructive" className="py-2">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{uploadError}</AlertDescription>
                    </Alert>
                  )}
                  {imagePreview ? (
                    <Card className="overflow-hidden">
                      <div className="relative group cursor-pointer" onClick={handleDropZoneClick}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Featured image preview" className="w-full max-h-52 object-cover" />
                        {isUploading && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 text-white animate-spin" />
                            <span className="ml-2 text-white text-sm font-medium">Uploading…</span>
                          </div>
                        )}
                        {!isUploading && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); clearImage() }}
                            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </Card>
                  ) : (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={handleDropZoneClick}
                      onKeyDown={(e) => e.key === 'Enter' && handleDropZoneClick()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleFileDrop}
                      className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#DC2626]/50 hover:bg-[#DC2626]/5 transition-colors"
                    >
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                          <p className="text-sm text-muted-foreground">Uploading…</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-[#1B2340]/5 flex items-center justify-center">
                            <Upload className="h-6 w-6 text-[#1B2340]/40" />
                          </div>
                          <p className="text-sm font-medium text-[#1B2340]">Click to upload or drag &amp; drop</p>
                          <p className="text-xs text-[#9CA3AF]">JPG, PNG, WebP, GIF, SVG — max 5 MB</p>
                        </div>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileSelect(file)
                    }}
                  />
                  <input type="hidden" {...register('featured_image')} />
                  {errors.featured_image && (
                    <p className="text-sm text-[#DC2626]">{errors.featured_image.message}</p>
                  )}
                </CollapsibleCard>

                {/* Category + Toggles */}
                <CollapsibleCard title="Category & Settings" defaultOpen={false}>
                  <div className="space-y-2">
                    <Label htmlFor="tag_type" className="flex items-center gap-1.5 text-sm font-semibold text-[#1B2340]">
                      <Tag size={14} />
                      Category
                    </Label>
                    <Controller
                      name="tag_type"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <select
                            id="tag_type"
                            value={isCustomCategory ? 'Other' : (field.value ?? '')}
                            onChange={(e) => {
                              const val = e.target.value
                              if (val === 'Other') {
                                setIsCustomCategory(true)
                                field.onChange('')
                              } else {
                                setIsCustomCategory(false)
                                field.onChange(val === '' ? null : val)
                              }
                            }}
                            className="w-full text-[14px] text-[#0d253d] bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#DC2626]/20 focus-visible:border-[#DC2626] transition-all shadow-sm appearance-none"
                          >
                            <option value="">— Select a category —</option>
                            {BLOG_TAG_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                          {isCustomCategory && (
                            <input
                              type="text"
                              placeholder="Enter custom category"
                              value={field.value ?? ''}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="w-full text-[14px] text-[#0d253d] bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#DC2626]/20 focus-visible:border-[#DC2626] transition-all shadow-sm"
                            />
                          )}
                        </div>
                      )}
                    />
                    {errors.tag_type && <p className="text-sm text-[#DC2626]">{errors.tag_type.message}</p>}
                  </div>

                  <div className="space-y-3 pt-1">
                    <p className="text-sm font-semibold text-[#1B2340]">Publish Settings</p>
                    <div className="flex items-center space-x-3">
                      <Controller
                        name="published"
                        control={control}
                        render={({ field }) => (
                          <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />
                        )}
                      />
                      <Label htmlFor="published" className="font-normal cursor-pointer text-sm text-[#6B7280]">
                        Publish immediately
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Controller
                        name="is_featured"
                        control={control}
                        render={({ field }) => (
                          <Switch id="is_featured" checked={field.value} onCheckedChange={field.onChange} />
                        )}
                      />
                      <Label htmlFor="is_featured" className="font-normal cursor-pointer text-sm text-[#6B7280]">
                        Mark as Featured
                      </Label>
                    </div>
                  </div>
                </CollapsibleCard>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-slate-200 px-8 py-6 flex items-center justify-between bg-slate-50 sticky bottom-0 z-10">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-black text-black hover:bg-black hover:text-white text-sm"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handlePreviewClick}
              className="flex items-center gap-2 bg-black hover:bg-[#DC2626] text-white border-none shadow-sm text-sm"
            >
              Preview
            </Button>
          </div>

          {activeSection === 'author' ? (
            <Button
              type="button"
              onClick={() => setActiveSection('details')}
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-sm"
            >
              Next: Blog Details →
            </Button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || isUploading}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#DC2626] text-white text-sm font-semibold hover:bg-black disabled:opacity-60 transition-all shadow-sm"
            >
              {isLoading ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {isLoading ? 'Saving…' : isEditing ? 'Update Post' : 'Save Post'}
            </button>
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
                  Paste a JSON object below. It should match the blog data structure.
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