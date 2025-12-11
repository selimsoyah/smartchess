import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MessageSquare, Clock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PostDeleteButton from '@/components/forum/PostDeleteButton'
import CommentSection from '@/components/forum/CommentSection'

interface ForumPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ForumPostPage({ params }: ForumPostPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch forum post
  const { data: post, error } = await supabase
    .from('forum_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) {
    console.error('Error fetching post:', error)
    notFound()
  }

  // Fetch user profile and auth data if post has user_id
  let userProfile = null
  let displayName = 'Anonymous'
  if (post.user_id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', post.user_id)
      .single()
    userProfile = profile
    
    // Use profile name if available, otherwise try to get username from profile or use Anonymous
    if (profile?.full_name) {
      displayName = profile.full_name
    } else if (profile) {
      // If profile exists but no name, use part of their ID
      displayName = `User ${post.user_id.slice(0, 8)}`
    }
  }

  // Fetch comments (table may not exist yet)
  let comments: any[] = []
  try {
    const { data: commentsData } = await supabase
      .from('forum_comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    
    if (commentsData) {
      comments = await Promise.all(
        commentsData.map(async (comment) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', comment.user_id)
            .single()
          return { ...comment, profiles: profile }
        })
      )
    }
  } catch (err) {
    console.log('Comments table not yet created')
  }

  // Try to increment view count (function may not exist yet)
  try {
    await supabase.rpc('increment_post_views', { post_uuid: id })
  } catch (err) {
    // Function doesn't exist yet, skip
  }

  // Get current user for edit/delete permissions
  const { data: { user } } = await supabase.auth.getUser()
  const isAuthor = user?.id === post.user_id

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-[#c49e4e] hover:text-[#bac1bf] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Forum
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#c49e4e]/20 flex-shrink-0">
              <MessageSquare className="h-6 w-6 text-[#c49e4e]" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-[#bac1bf]">
                <div className="flex items-center gap-2">
                  {userProfile?.avatar_url ? (
                    <img
                      src={userProfile.avatar_url}
                      alt={userProfile.full_name || 'User'}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-[#c49e4e]" />
                  )}
                  <span>{displayName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#c49e4e]" />
                  <span>{new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-[#bac1bf]/30">
          {/* Author Info & Actions */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#bac1bf]/30">
            <div className="flex items-center gap-4">
              {userProfile?.avatar_url ? (
                <img
                  src={userProfile.avatar_url}
                  alt={userProfile.full_name || 'User'}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#c49e4e]/20"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#c49e4e]/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-[#c49e4e]" />
                </div>
              )}
              <div>
                <p className="font-semibold text-[#232829] text-lg">
                  {displayName}
                </p>
                <p className="text-sm text-[#5a605a]">
                  Posted {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            {/* Edit/Delete buttons for post author */}
            {isAuthor && (
              <div className="flex items-center gap-2">
                <Link
                  href={`/forum/${id}/edit`}
                  className="px-4 py-2 text-sm font-medium text-[#c49e4e] hover:bg-[#c49e4e]/10 rounded-lg transition-colors"
                >
                  Edit
                </Link>
                <PostDeleteButton postId={id} />
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="prose prose-slate max-w-none">
            <div className="text-[#232829] whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection 
          postId={id} 
          comments={comments || []} 
          currentUser={user}
        />
      </div>
    </div>
  )
}

// Metadata generation
export async function generateMetadata({ params }: ForumPostPageProps) {
  const { id } = await params
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js')
  
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: post } = await supabase
    .from('forum_posts')
    .select('title, content')
    .eq('id', id)
    .single()

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const preview = post.content.substring(0, 160)

  return {
    title: `${post.title} | Smart Chess Academy Forum`,
    description: preview,
  }
}
