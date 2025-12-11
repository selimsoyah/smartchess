import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft, Newspaper } from 'lucide-react'
import Link from 'next/link'

interface NewsPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch news item
  const { data: newsItem, error } = await supabase
    .from('news_facts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !newsItem) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#c49e4e] hover:text-[#bac1bf] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#c49e4e]/20 flex-shrink-0">
              <Newspaper className="h-6 w-6 text-[#c49e4e]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[#c49e4e] mb-3">
                <Calendar className="h-5 w-5" />
                <time dateTime={newsItem.date} className="text-sm">
                  {new Date(newsItem.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {newsItem.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* News Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-[#bac1bf]/30">
          <div className="prose prose-slate max-w-none">
            <div className="text-[#232829] whitespace-pre-wrap leading-relaxed text-lg">
              {newsItem.content}
            </div>
          </div>
        </article>

        {/* Related Actions */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/news"
            className="px-6 py-3 bg-white border border-[#bac1bf] text-[#232829] rounded-lg font-medium hover:border-[#c49e4e] transition-colors"
          >
            View All News
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#c49e4e] text-[#232829] rounded-lg font-semibold hover:bg-[#9e7642] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

// Metadata generation
export async function generateMetadata({ params }: NewsPageProps) {
  const { id } = await params
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js')
  
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: newsItem } = await supabase
    .from('news_facts')
    .select('title, content')
    .eq('id', id)
    .single()

  if (!newsItem) {
    return {
      title: 'News Not Found',
    }
  }

  const preview = newsItem.content.substring(0, 160)

  return {
    title: `${newsItem.title} | Smart Chess Academy News`,
    description: preview,
  }
}
