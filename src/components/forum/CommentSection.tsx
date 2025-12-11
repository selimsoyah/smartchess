'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { MessageSquare, User, Clock, Loader2, Trash2, Edit2 } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface Comment {
  id: string
  content: string
  created_at: string
  updated_at: string
  user_id: string
  profiles: {
    id: string
    full_name: string | null
    avatar_url: string | null
  } | null
}

interface CommentSectionProps {
  postId: string
  comments: Comment[]
  currentUser: SupabaseUser | null
}

export default function CommentSection({ postId, comments: initialComments, currentUser }: CommentSectionProps) {
  const router = useRouter()
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser || !newComment.trim()) return

    setIsSubmitting(true)

    try {
      const supabase = createClient()
      
      // Insert the comment
      const { data, error } = await supabase
        .from('forum_comments')
        .insert([
          {
            post_id: postId,
            user_id: currentUser.id,
            content: newComment.trim()
          }
        ])
        .select()
        .single()

      if (error) throw error

      // Fetch the user profile for this comment
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single()

      const newCommentWithProfile = {
        ...data,
        profiles: profile || { 
          id: currentUser.id, 
          full_name: currentUser.email?.split('@')[0] || 'User'
        }
      }

      setComments([...comments, newCommentWithProfile as Comment])
      setNewComment('')
      router.refresh()
    } catch (err) {
      console.error('Error posting comment:', err)
      alert('Failed to post comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('forum_comments')
        .delete()
        .eq('id', commentId)

      if (error) throw error

      setComments(comments.filter(c => c.id !== commentId))
      router.refresh()
    } catch (err) {
      console.error('Error deleting comment:', err)
      alert('Failed to delete comment. Please try again.')
    }
  }

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) return

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('forum_comments')
        .update({ content: editContent.trim() })
        .eq('id', commentId)

      if (error) throw error

      setComments(comments.map(c => 
        c.id === commentId 
          ? { ...c, content: editContent.trim(), updated_at: new Date().toISOString() }
          : c
      ))
      setEditingId(null)
      setEditContent('')
      router.refresh()
    } catch (err) {
      console.error('Error updating comment:', err)
      alert('Failed to update comment. Please try again.')
    }
  }

  const startEdit = (comment: Comment) => {
    setEditingId(comment.id)
    setEditContent(comment.content)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditContent('')
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6 md:p-8 border border-[#bac1bf]/30">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-[#c49e4e]" />
        <h3 className="text-xl font-bold text-[#232829]">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      {currentUser ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#c49e4e]/10 flex items-center justify-center">
                <User className="h-5 w-5 text-[#c49e4e]" />
              </div>
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full px-4 py-3 border border-[#bac1bf]/30 rounded-lg focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent outline-none transition-all resize-none"
                disabled={isSubmitting}
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-[#5a605a]">
                  {newComment.length}/10,000
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim() || newComment.length > 10000}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#c49e4e] text-white rounded-lg font-medium hover:bg-[#9e7642] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    'Post Comment'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-[#c49e4e]/5 border border-[#c49e4e]/20 rounded-lg text-center">
          <p className="text-[#5a605a]">
            Please{' '}
            <a href="/auth/signin" className="text-[#c49e4e] hover:underline font-medium">
              sign in
            </a>
            {' '}to post a comment
          </p>
        </div>
      )}

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => {
            const isAuthor = currentUser?.id === comment.user_id
            const isEditing = editingId === comment.id

            return (
              <div key={comment.id} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {comment.profiles?.avatar_url ? (
                    <img
                      src={comment.profiles.avatar_url}
                      alt={comment.profiles.full_name || 'User'}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#c49e4e]/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#c49e4e]/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#c49e4e]" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#232829]">
                      {comment.profiles?.full_name || comment.profiles?.email || 'Anonymous'}
                    </span>
                    <span className="text-sm text-[#5a605a] flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(comment.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {comment.updated_at !== comment.created_at && (
                      <span className="text-xs text-[#5a605a] italic">
                        (edited)
                      </span>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div className="mt-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-[#bac1bf]/30 rounded-lg focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent outline-none transition-all resize-none"
                      />
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => handleEditComment(comment.id)}
                          disabled={!editContent.trim()}
                          className="px-3 py-1.5 text-sm bg-[#c49e4e] text-white rounded-lg hover:bg-[#9e7642] disabled:opacity-50 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1.5 text-sm text-[#5a605a] hover:text-[#232829] transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-[#232829] whitespace-pre-wrap">
                        {comment.content}
                      </p>
                      
                      {isAuthor && (
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => startEdit(comment)}
                            className="text-sm text-[#5a605a] hover:text-[#c49e4e] transition-colors inline-flex items-center gap-1"
                          >
                            <Edit2 className="h-3 w-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-sm text-[#5a605a] hover:text-red-600 transition-colors inline-flex items-center gap-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageSquare className="mx-auto h-12 w-12 text-[#bac1bf] mb-3" />
          <p className="text-[#5a605a]">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      )}
    </div>
  )
}
