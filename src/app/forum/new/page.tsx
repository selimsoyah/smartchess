import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import NewPostForm from '@/components/forum/NewPostForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function NewPostPage() {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/signin?redirect=/forum/new')
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
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Create New Discussion
          </h1>
          <p className="mt-2 text-[#bac1bf]">
            Share your thoughts, ask questions, or start a conversation with the community
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <NewPostForm userId={user.id} />
      </div>
    </div>
  )
}
