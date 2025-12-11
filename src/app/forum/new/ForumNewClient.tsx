'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { MessageSquare, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ForumNewClient() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('You must be signed in to create a post')
        setLoading(false)
        return
      }

      // Insert forum post
      const { data, error: insertError } = await supabase
        .from('forum_posts')
        .insert({
          user_id: user.id,
          title,
          content
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Redirect to the new post
      router.push(`/forum/${data.id}`)
    } catch (err: any) {
      console.error('Error creating post:', err)
      setError(err.message || 'Failed to create post. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-[#c49e4e] hover:text-[#bac1bf] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Forum
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#c49e4e]/20">
              <MessageSquare className="h-6 w-6 text-[#c49e4e]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Start a Discussion
              </h1>
              <p className="text-[#bac1bf] mt-1">
                Share your chess insights with the community
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-[#bac1bf]/30">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-semibold text-[#232829] mb-2">
              Discussion Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={200}
              placeholder="e.g., Best opening for beginners?"
              className="w-full px-4 py-3 border border-[#bac1bf] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
            />
            <p className="mt-1 text-xs text-[#5a605a]">
              {title.length}/200 characters
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-semibold text-[#232829] mb-2">
              Content *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={12}
              placeholder="Share your thoughts, questions, or analysis..."
              className="w-full px-4 py-3 border border-[#bac1bf] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829] resize-y"
            />
            <p className="mt-1 text-xs text-[#5a605a]">
              Be respectful and constructive. Share your chess knowledge!
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading || !title.trim() || !content.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-[#c49e4e] text-[#232829] rounded-lg font-semibold hover:bg-[#9e7642] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <MessageSquare className="h-5 w-5" />
                  Create Discussion
                </>
              )}
            </button>

            <Link
              href="/forum"
              className="px-6 py-3 text-[#5a605a] hover:text-[#232829] font-medium transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Guidelines */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-[#bac1bf]/30">
          <h3 className="text-lg font-semibold text-[#232829] mb-4">Community Guidelines</h3>
          <ul className="space-y-2 text-sm text-[#5a605a]">
            <li className="flex items-start gap-2">
              <span className="text-[#c49e4e] mt-0.5">•</span>
              <span>Be respectful and constructive in your discussions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c49e4e] mt-0.5">•</span>
              <span>Stay on topic - keep discussions chess-related</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c49e4e] mt-0.5">•</span>
              <span>Use clear, descriptive titles for better discoverability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c49e4e] mt-0.5">•</span>
              <span>Search before posting to avoid duplicate discussions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
