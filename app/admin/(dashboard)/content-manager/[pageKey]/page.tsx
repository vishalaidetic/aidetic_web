import { ContentManagerEditor } from '@/components/admin/content-manager-editor'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const PAGE_META: Record<string, { label: string }> = {
  'home': { label: 'Home Page' },
  'agent-factory': { label: 'Agent Factory' },
  'blog': { label: 'Blog Page' },
  'case-study': { label: 'Case Study Page' },
  'navbar': { label: 'Navbar' },
  'footer': { label: 'Footer' },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pageKey: string }>
}): Promise<Metadata> {
  const { pageKey } = await params
  const meta = PAGE_META[pageKey]
  return {
    title: meta ? `${meta.label} Content — Admin` : 'Content Manager — Admin',
  }
}

export default async function ContentManagerPage({
  params,
}: {
  params: Promise<{ pageKey: string }>
}) {
  const { pageKey } = await params
  const meta = PAGE_META[pageKey]

  if (!meta) notFound()

  return <ContentManagerEditor pageKey={pageKey} pageLabel={meta.label} />
}
