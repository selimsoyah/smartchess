'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

interface NewPostFormProps {
  userId: string
}

export default function NewPostForm({ userId }: NewPostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      
      const { data, error: submitError } = await supabase
        .from('forum_posts')
        .insert([
          {
            user_id: userId,
            title: formData.title,
            content: formData.content
          }
        ])
        .select()
        .single()

      if (submitError) throw submitError

      // Redirect to the new post
      router.push(`/forum/${data.id}`)
      router.refresh()
    } catch (err) {
      console.error('Error creating post:', err)
      setError(err instanceof Error ? err.message : 'Failed to create post')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[#232829] mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          required
          minLength={5}
          maxLength={200}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 border border-[#bac1bf]/30 rounded-lg focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent outline-none transition-all"
          placeholder="What would you like to discuss?"
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-[#5a605a]">
          {formData.title.length}/200 characters
        </p>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-[#232829] mb-2">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          required
          minLength={20}
          maxLength={10000}
          rows={12}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 border border-[#bac1bf]/30 rounded-lg focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent outline-none transition-all resize-none"
          placeholder="Share your thoughts, questions, or insights..."
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-[#5a605a]">
          {formData.content.length}/10,000 characters
        </p>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#bac1bf]/20">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="px-6 py-3 text-[#232829] hover:text-[#5a605a] font-medium transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || formData.title.length < 5 || formData.content.length < 20}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#c49e4e] text-white rounded-lg font-semibold hover:bg-[#9e7642] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Discussion'
          )}
        </button>
      </div>
    </form>
  )
}
