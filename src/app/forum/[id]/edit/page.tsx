import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import EditPostForm from '@/components/forum/EditPostForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/signin?redirect=/forum/' + id)
  }

  // Fetch the post
  const { data: post, error } = await supabase
    .from('forum_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) {
    notFound()
  }

  // Check if user is the author
  if (post.user_id !== user.id) {
    redirect('/forum/' + id)
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/forum/${id}`}
            className="inline-flex items-center gap-2 text-[#c49e4e] hover:text-[#bac1bf] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Discussion
          </Link>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Edit Discussion
          </h1>
          <p className="mt-2 text-[#bac1bf]">
            Update your post content
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EditPostForm post={post} />
      </div>
    </div>
  )
}
