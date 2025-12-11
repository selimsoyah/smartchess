'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trash2, Loader2 } from 'lucide-react'

interface PostDeleteButtonProps {
  postId: string
}

export default function PostDeleteButton({ postId }: PostDeleteButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('forum_posts')
        .delete()
        .eq('id', postId)

      if (error) throw error

      router.push('/forum')
      router.refresh()
    } catch (err) {
      console.error('Error deleting post:', err)
      alert('Failed to delete post. Please try again.')
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-[#5a605a]">Are you sure?</span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 inline-flex items-center gap-1"
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Deleting...
            </>
          ) : (
            'Yes, Delete'
          )}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="px-3 py-1.5 text-sm font-medium text-[#5a605a] hover:text-[#232829] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      <Trash2 className="h-4 w-4" />
      Delete
    </button>
  )
}
