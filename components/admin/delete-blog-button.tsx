'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getAdminHeaders } from '@/lib/middleware/auth'
import { useState } from 'react'

interface DeleteBlogButtonProps {
  id: string
}

export function DeleteBlogButton({ id }: DeleteBlogButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      try {
        setIsDeleting(true)
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
          headers: getAdminHeaders()
        })
        
        if (response.ok) {
          router.refresh()
        } else {
          console.error('Failed to delete blog:', await response.text())
          alert('Failed to delete blog. Please try again.')
        }
      } catch (error) {
        console.error('Error deleting blog:', error)
        alert('An error occurred while deleting the blog.')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <Button
      size="sm"
      variant="destructive"
      className="gap-1"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 size={14} />
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  )
}
