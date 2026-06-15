'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit, Eye, Trash2, Star, StarOff, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getAdminBasePath } from '@/lib/admin-path'
import { getAdminHeaders } from '@/lib/middleware/auth'

interface CaseStudy {
  id: string
  slug: string
  is_featured?: boolean
  published?: boolean
}

interface CaseStudyActionsMenuProps {
  caseStudy: CaseStudy
}

export function CaseStudyActionsMenu({ caseStudy }: CaseStudyActionsMenuProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleToggleFeatured = async () => {
    try {
      setIsUpdating(true)
      const response = await fetch(`/api/case-studies/${caseStudy.id}`, {
        method: 'PATCH',
        headers: getAdminHeaders(),
        body: JSON.stringify({ is_featured: !caseStudy.is_featured }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        const data = await response.json()
        alert(data.error?.message || 'Failed to update featured status.')
      }
    } catch (error) {
      console.error(error)
      alert('Error updating featured status.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleTogglePublish = async () => {
    try {
      setIsUpdating(true)
      const response = await fetch(`/api/case-studies/${caseStudy.id}`, {
        method: 'PATCH',
        headers: getAdminHeaders(),
        body: JSON.stringify({ published: !caseStudy.published }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to update published status.')
      }
    } catch (error) {
      console.error(error)
      alert('Error updating published status.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this case study? This action cannot be undone.')) {
      try {
        setIsUpdating(true)
        const response = await fetch(`/api/case-studies/${caseStudy.id}`, {
          method: 'DELETE',
          headers: getAdminHeaders(),
        })

        if (response.ok) {
          router.refresh()
        } else {
          alert('Failed to delete case study.')
        }
      } catch (error) {
        console.error(error)
        alert('Error deleting case study.')
      } finally {
        setIsUpdating(false)
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 border-[#1B2340]/20 text-[#1B2340] hover:bg-[#DC2626] hover:text-white">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* View */}
        <DropdownMenuItem asChild className="cursor-pointer focus:bg-slate-100 focus:text-[#1B2340]">
          <Link href={`/case-studies/${caseStudy.slug}`} target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </Link>
        </DropdownMenuItem>

        {/* Edit */}
        <DropdownMenuItem asChild className="cursor-pointer focus:bg-slate-100 focus:text-[#1B2340]">
          <Link href={`${getAdminBasePath()}/case-studies/${caseStudy.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />

        {/* Toggle Featured */}
        <DropdownMenuItem 
          onClick={handleToggleFeatured} 
          disabled={isUpdating}
          className="cursor-pointer focus:bg-slate-100 focus:text-[#1B2340]"
        >
          {caseStudy.is_featured ? (
            <StarOff className="mr-2 h-4 w-4 text-[#6B7280]" />
          ) : (
            <Star className="mr-2 h-4 w-4 text-[#1B2340]" />
          )}
          <span>{caseStudy.is_featured ? 'Omit Featured' : 'Make Featured'}</span>
        </DropdownMenuItem>

        {/* Toggle Publish */}
        <DropdownMenuItem 
          onClick={handleTogglePublish} 
          disabled={isUpdating}
          className="cursor-pointer focus:bg-slate-100 focus:text-[#1B2340]"
        >
          {caseStudy.published ? (
            <XCircle className="mr-2 h-4 w-4 text-orange-500" />
          ) : (
            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
          )}
          <span>{caseStudy.published ? 'Move to Draft' : 'Publish'}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete */}
        <DropdownMenuItem 
          onClick={handleDelete} 
          disabled={isUpdating}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
