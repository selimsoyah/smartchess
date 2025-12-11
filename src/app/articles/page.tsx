import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { BookOpen, Calendar, User } from 'lucide-react'

export default async function ArticlesPage() {
  const supabase = await createClient()
  
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Chess Articles</h1>
            <p className="mt-6 text-lg leading-8 text-[#bac1bf]">
              Explore interactive lessons, game analysis, and chess strategies from our expert coaches
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg hover:border-[#c49e4e]/50 border border-transparent transition-all"
                >
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 text-sm text-[#9e7642] mb-3">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">
                        {new Date(article.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-[#232829] mb-3">
                      <Link href={`/articles/${article.slug}`} className="hover:text-[#c49e4e] transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                    
                    {article.description && (
                      <p className="text-[#5a605a] mb-4 line-clamp-3">
                        {article.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-[#745832]">
                      <User className="h-4 w-4" />
                      <span>By {article.author}</span>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="inline-flex items-center text-[#c49e4e] hover:text-[#9e7642] font-medium transition-colors"
                    >
                      Read article
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-16 w-16 text-[#bac1bf] mb-4" />
              <h3 className="text-2xl font-semibold text-[#232829] mb-2">No Articles Yet</h3>
              <p className="text-[#5a605a] mb-6">
                Our chess articles are coming soon. Check back later for expert insights and analysis!
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-[#c49e4e] text-white rounded-md font-medium hover:bg-[#9e7642] transition-colors"
              >
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
