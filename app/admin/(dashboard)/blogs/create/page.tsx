import { BlogForm } from '@/components/admin/blog-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Blog Post',
  description: 'Create a new blog post',
}

export default function CreateBlogPage() {
  return <BlogForm />
}
