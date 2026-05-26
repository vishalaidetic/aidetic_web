'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getAdminHeaders } from '@/lib/middleware/auth'
import { useState } from 'react'

interface DeleteCaseStudyButtonProps {
  id: string
}

export function DeleteCaseStudyButton({ id }: DeleteCaseStudyButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this case study? This action cannot be undone.')) {
      try {
        setIsDeleting(true)
        const response = await fetch(`/api/case-studies/${id}`, {
          method: 'DELETE',
          headers: getAdminHeaders()
        })
        
        if (response.ok) {
          router.refresh()
        } else {
          console.error('Failed to delete case study:', await response.text())
          alert('Failed to delete case study. Please try again.')
        }
      } catch (error) {
        console.error('Error deleting case study:', error)
        alert('An error occurred while deleting the case study.')
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
