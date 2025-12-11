import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ArticleRenderer from '@/components/article/ArticleRenderer'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch article from database
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !article) {
    notFound()
  }

  // Parse content JSON
  const content = article.content_json

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23c49e4e' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-[#c49e4e] hover:text-[#9e7642] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {article.title}
          </h1>

          {article.description && (
            <p className="text-xl text-[#bac1bf] mb-8 leading-relaxed">
              {article.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-[#bac1bf]">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#c49e4e]" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#c49e4e]" />
              <span>{new Date(article.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <article className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <ArticleRenderer content={content} />
        </article>

        {/* Author Bio */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 border-l-4 border-[#c49e4e]">
          <h3 className="text-xl font-bold text-[#232829] mb-4">About the Author</h3>
          <div className="flex items-start gap-4">
            <div>
              <p className="font-semibold text-[#232829] text-lg">
                {article.author}
              </p>
              <p className="text-[#5a605a] mt-2">
                Passionate chess educator and strategist at Smart Chess Academy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all published articles (optional - for SSG)
// Note: Using client for build-time data fetching (no cookies needed)
export async function generateStaticParams() {
  const { createClient } = await import('@supabase/supabase-js')
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: articles } = await supabase
    .from('articles')
    .select('slug')

  return articles?.map((article) => ({
    slug: article.slug,
  })) || []
}

// Metadata generation
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js')
  
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: article } = await supabase
    .from('articles')
    .select('title, description')
    .eq('slug', slug)
    .single()

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.title} | Smart Chess Academy`,
    description: article.description || 'Learn advanced chess strategies and techniques',
  }
}
