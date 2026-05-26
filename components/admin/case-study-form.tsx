'use client'

import { BlogContent } from '@/components/blog/blog-content'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { getAdminHeaders } from '@/lib/middleware/auth'
import { CASE_STUDY_TAG_TYPES, CaseStudy, CaseStudyCreateInputSchema } from '@/lib/types/case_study'
import { generateSlug } from '@/lib/utils/formatting'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertTriangle,
  ImageIcon,
  Loader2,
  Tag,
  Upload,
  X,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { z } from 'zod'

type CaseStudyFormInput = z.infer<typeof CaseStudyCreateInputSchema>

interface CaseStudyFormProps {
  initialData?: CaseStudy
  isEditing?: boolean
}

/**
 * Admin blog form with:
 *  – Image upload to Supabase Storage
 *  – tag_type selector
 *  – created_by / updated_by from admin email
 *  – markdown preview
 */
export function CaseStudyForm({ initialData, isEditing = false }: CaseStudyFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [isCustomCategory, setIsCustomCategory] = useState(() => {
    if (!initialData?.tag_type) return false;
    return !CASE_STUDY_TAG_TYPES.includes(initialData.tag_type as any);
  });

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    author: true,
    details: true,
  })

  // Image upload state
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string>(
    initialData?.featured_image ?? ''
  )
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    trigger,
  } = useForm<CaseStudyFormInput>({
    resolver: zodResolver(CaseStudyCreateInputSchema),
    defaultValues: initialData
      ? {
        title: initialData.title,
        slug: initialData.slug,
        description: initialData.description ?? '',
        content: initialData.content,
        author: initialData.author,
        featured_image: initialData.featured_image ?? '',
        published: initialData.published,
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
        tag_type: undefined,
        created_by: '',
        updated_by: '',
      },
  })

  const title = watch('title')
  const content = watch('content')
  const featuredImage = watch('featured_image')

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    if (!isEditing) {
      setValue('slug', generateSlug(value))
    }
  }

  // ── Image upload ────────────────────────────────────────────
  const handleFileSelect = async (file: File) => {
    if (!file) return
    setUploadError(null)
    setIsUploading(true)

    // Local preview immediately
    const objectUrl = URL.createObjectURL(file)
    setImagePreview(objectUrl)

    try {
      const fd = new FormData()
      fd.append('file', file)

      const res = await fetch('/api/upload/blog-image', {
        method: 'POST',
        body: fd,
      })
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

  // ── Submit ──────────────────────────────────────────────────
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true)
      setError(null)

      // Auto-set created_by and updated_by from the Author field
      data.updated_by = data.author
      if (!isEditing) {
        data.created_by = data.author
      }

      const url = isEditing ? `/api/case-studies/${initialData?.id}` : '/api/case-studies'
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

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError('An error occurred while saving the case study')
      console.error('[case-study-form] submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreviewClick = async () => {
    const isValid = await trigger()
    if (isValid) {
      setShowPreview(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Hidden Slug */}
      <input type="hidden" {...register('slug')} />

      {!showPreview ? (
        <div className="space-y-6">
          {/* SECTION 1: Author Details - Collapsible */}
          <div className="border rounded-lg overflow-hidden bg-card">
            <button
              type="button"
              onClick={() => toggleSection('author')}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors border-l-4 border-[#DC2626]"
            >
              <div className="text-left">
                <h2 className="text-lg font-semibold tracking-tight text-[#1B2340]">Author Info</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Enter your name and email
                </p>
              </div>
              <svg
                className={`w-5 h-5 text-[#DC2626] transition-transform duration-300 ${expandedSections.author ? 'rotate-180' : ''
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {expandedSections.author && (
              <div className="px-6 py-6 space-y-6 border-t">
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-sm font-medium text-[#1B2340]">Author Name *</Label>
                  <Input
                    id="author"
                    placeholder="Your name"
                    {...register('author')}
                    className={errors.author ? 'border-destructive' : ''}
                  />
                  {errors.author && (
                    <p className="text-sm text-destructive">{errors.author.message}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: Case Study Details - Collapsible */}
          <div className="border rounded-lg overflow-hidden bg-card">
            <button
              type="button"
              onClick={() => toggleSection('details')}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors border-l-4 border-[#DC2626]"
            >
              <div className="text-left">
                <h2 className="text-lg font-semibold tracking-tight text-[#1B2340]">Case Study Details</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Title, content, image and more
                </p>
              </div>
              <svg
                className={`w-5 h-5 text-[#DC2626] transition-transform duration-300 ${expandedSections.details ? 'rotate-180' : ''
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {expandedSections.details && (
              <div className="px-6 py-6 space-y-6 border-t">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-[#1B2340]">Case Study Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter case study title"
                    {...register('title', {
                      onChange: (e) => handleTitleChange(e.target.value),
                    })}
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium text-[#1B2340]">Case Study Content *</Label>
                  <Textarea
                    id="content"
                    placeholder={`# Heading\n\nWrite your case study here using markdown.\n\n- Bullet points\n- **Bold** and *italic*\n\n\`\`\`js\nconsole.log('Hello')\n\`\`\``}
                    {...register('content')}
                    rows={24}
                    className={
                      errors.content ? 'border-[#DC2626]' : 'font-mono text-sm min-h-[520px] resize-y'
                    }
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">{errors.content.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-1.5">
                      <ImageIcon size={14} />
                      Featured Image *
                    </Label>

                    {uploadError && (
                      <Alert variant="destructive" className="py-2">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{uploadError}</AlertDescription>
                      </Alert>
                    )}

                    {imagePreview ? (
                      <Card className="overflow-hidden">
                        <div
                          className="relative group cursor-pointer"
                          onClick={handleDropZoneClick}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imagePreview}
                            alt="Featured image preview"
                            className="w-full max-h-60 object-cover"
                          />
                          {isUploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <Loader2 className="h-8 w-8 text-white animate-spin" />
                              <span className="ml-2 text-white text-sm font-medium">
                                Uploading...
                              </span>
                            </div>
                          )}
                          {!isUploading && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                clearImage()
                              }}
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
                        className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center cursor-pointer hover:border-[#DC2626]/50 hover:bg-[#DC2626]/3 transition-colors"
                      >
                        {isUploading ? (
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                            <p className="text-sm text-muted-foreground">Uploading...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-[#1B2340]/5 flex items-center justify-center">
                              <Upload className="h-6 w-6 text-[#1B2340]/40" />
                            </div>
                            <p className="text-sm font-medium text-[#1B2340]">
                              Click to upload or drag &amp; drop
                            </p>
                            <p className="text-xs text-[#9CA3AF]">
                              JPG, PNG, WebP, GIF, SVG — max 5 MB
                            </p>
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
                      <p className="text-sm text-destructive">
                        {errors.featured_image.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-6">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="tag_type" className="flex items-center gap-1.5">
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
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="">— Select a category —</option>
                              {CASE_STUDY_TAG_TYPES.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                            {isCustomCategory && (
                              <input
                                type="text"
                                placeholder="Enter custom category"
                                value={field.value ?? ''}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mt-2"
                              />
                            )}
                          </div>
                        )}
                      />
                      {errors.tag_type && (
                        <p className="text-sm text-destructive">{errors.tag_type.message}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Controller
                        name="published"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            id="published"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="published" className="font-normal cursor-pointer">
                        Publish this case study immediately
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-200">
            <Button 
              type="button" 
              onClick={handlePreviewClick}
              className="bg-[#1B2340] hover:bg-[#1B2340]/85 text-white border-none shadow-sm"
            >
              Preview
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-[#1B2340]/20 text-[#1B2340] hover:bg-[#1B2340]/5 hover:border-[#1B2340]/40"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-semibold tracking-tight text-[#1B2340]">Preview Mode</h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
                className="text-[#DC2626] hover:text-[#B91C1C] hover:bg-[#DC2626]/5"
              >
                ← Back to Edit
              </Button>
            </div>

            <div className="bg-card rounded-lg border shadow-sm p-6 lg:p-10">
              {imagePreview && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imagePreview}
                  alt="Featured image"
                  className="w-full max-h-96 object-cover rounded-xl mb-8"
                />
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
          </div>

          <div className="flex gap-4 pt-6 border-t border-border">
            <Button 
              type="submit" 
              disabled={isLoading || isUploading}
              className="bg-[#1B2340] hover:bg-[#1B2340]/85 text-white border-none shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : isEditing ? (
                'Update Post'
              ) : (
                'Submit Post'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPreview(false)}
              disabled={isLoading || isUploading}
              className="border-[#1B2340]/20 text-[#1B2340] hover:bg-[#1B2340]/5 hover:border-[#1B2340]/40"
            >
              Back to Edit
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}