import { createClient } from '@/lib/supabase/server'
import { MessageSquare, Clock, User, Plus } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export default async function ForumPage() {
  const supabase = await createClient()

  // Fetch forum posts
  const { data: posts, error: postsError } = await supabase
    .from('forum_posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (postsError) {
    console.error('Error fetching posts:', postsError)
  }

  // Fetch user profiles for all posts
  const postsWithProfiles = posts ? await Promise.all(
    posts.map(async (post) => {
      if (!post.user_id) return { ...post, profiles: null }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', post.user_id)
        .single()
      
      return { ...post, profiles: profile }
    })
  ) : []

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section with animated background */}
      <section className="relative bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-[#c49e4e] rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-[#9e7642] rounded-full blur-3xl animate-pulse-slow delay-300"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="animate-slideUp">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-10 w-10 text-[#c49e4e] animate-float" />
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Community Forum</h1>
              </div>
              <p className="text-lg leading-8 text-[#bac1bf]">
                Connect with fellow chess enthusiasts, share strategies, and discuss games
              </p>
            </div>
            {user && (
              <Link
                href="/forum/new"
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-[#c49e4e] text-[#232829] rounded-lg font-semibold hover:bg-[#9e7642] hover:scale-105 hover:shadow-lg transition-all duration-300 animate-scaleIn delay-200"
              >
                <Plus className="h-5 w-5" />
                New Discussion
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Create Button */}
      {user && (
        <div className="md:hidden mx-auto max-w-7xl px-6 lg:px-8 -mt-6 mb-8">
          <Link
            href="/forum/new"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#c49e4e] text-[#232829] rounded-lg font-semibold hover:bg-[#9e7642] transition-colors shadow-lg"
          >
            <Plus className="h-5 w-5" />
            New Discussion
          </Link>
        </div>
      )}

      {/* Forum Posts */}
      <section className="py-24 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {postsWithProfiles && postsWithProfiles.length > 0 ? (
            <div className="space-y-4">
              {postsWithProfiles.map((post, idx) => (
                <ScrollReveal key={post.id} delay={Math.min(idx * 50, 300)} direction="up">
                  <Link
                    href={`/forum/${post.id}`}
                    className="block bg-white rounded-xl p-6 shadow-sm hover-lift border border-[#bac1bf]/30 hover:border-[#c49e4e]/50 transition-all duration-300 group"
                  >
                  <div className="flex items-start gap-4">
                    {/* Avatar with glow effect on hover */}
                    <div className="flex-shrink-0">
                      {post.profiles?.avatar_url ? (
                        <img
                          src={post.profiles.avatar_url}
                          alt={post.profiles.full_name || 'User'}
                          className="w-14 h-14 rounded-full object-cover group-hover:scale-110 transition-transform duration-300 ring-2 ring-[#c49e4e]/20 group-hover:ring-[#c49e4e]/40"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c49e4e]/20 to-[#9e7642]/20 flex items-center justify-center group-hover:from-[#c49e4e]/30 group-hover:to-[#9e7642]/30 transition-all duration-300 group-hover:scale-110">
                          <User className="h-7 w-7 text-[#c49e4e]" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-[#232829] mb-2 group-hover:text-[#c49e4e] transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      
                      <p className="text-[#5a605a] mb-3 line-clamp-2 leading-relaxed">
                        {post.content}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#5a605a]">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#c49e4e]/5 rounded-full group-hover:bg-[#c49e4e]/10 transition-colors">
                          <User className="h-4 w-4 text-[#c49e4e]" />
                          <span className="font-medium">{post.profiles?.full_name || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#9e7642]/5 rounded-full group-hover:bg-[#9e7642]/10 transition-colors">
                          <Clock className="h-4 w-4 text-[#9e7642]" />
                          <span>{new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                      <svg className="w-6 h-6 text-[#c49e4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-16 w-16 text-[#bac1bf] mb-4" />
              <h3 className="text-2xl font-semibold text-[#232829] mb-2">No Discussions Yet</h3>
              <p className="text-[#5a605a] mb-6 max-w-2xl mx-auto">
                Be the first to start a discussion! Share your chess insights, ask questions, or discuss recent games.
              </p>
              <div className="flex gap-4 justify-center">
                {user ? (
                  <Link
                    href="/forum/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#c49e4e] text-[#232829] rounded-lg font-semibold hover:bg-[#9e7642] transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    Start a Discussion
                  </Link>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center px-6 py-3 bg-[#c49e4e] text-[#232829] rounded-md font-medium hover:bg-[#9e7642] transition-colors"
                  >
                    Sign In to Post
                  </Link>
                )}
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-white border border-[#bac1bf] text-[#232829] rounded-md font-medium hover:border-[#c49e4e] transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
