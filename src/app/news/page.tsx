import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Calendar, Newspaper } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import ScrollToTop from '@/components/ScrollToTop'

export default async function NewsPage() {
  const supabase = await createClient()
  
  const { data: news } = await supabase
    .from('news_facts')
    .select('*')
    .order('event_date', { ascending: true })

  return (
    <div>
      {/* Hero Section with animated background */}
      <section className="relative bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-80 h-80 bg-[#c49e4e] rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#9e7642] rounded-full blur-3xl animate-pulse-slow delay-300"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center mb-6 animate-float">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c49e4e] to-[#9e7642] flex items-center justify-center">
                <Calendar className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl animate-slideUp mb-4">
              Events & News
            </h1>
            <p className="mt-6 text-xl leading-8 text-[#bac1bf] animate-slideUp delay-100 font-semibold">
              Upcoming tournaments, workshops, and academy updates
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-24 bg-gradient-to-br from-[#faf9f7] to-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {news && news.length > 0 ? (
            <div className="space-y-8">
              {news.map((item, idx) => {
                const eventDate = new Date(item.event_date || item.date);
                const isUpcoming = eventDate >= new Date(new Date().setHours(0, 0, 0, 0));
                
                return (
                  <ScrollReveal key={item.id} delay={idx * 100} direction="up">
                    <Link
                      href={`/news/${item.id}`}
                      className={`block relative rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border-4 overflow-hidden group ${
                        isUpcoming 
                          ? 'bg-gradient-to-br from-[#c49e4e]/10 via-white to-[#9e7642]/10 border-[#c49e4e] hover:border-[#9e7642]' 
                          : 'bg-white border-[#bac1bf]/30 hover:border-[#c49e4e]/50'
                      }`}
                    >
                      {/* Animated background for upcoming events */}
                      {isUpcoming && (
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c49e4e] rounded-full blur-3xl animate-pulse-slow"></div>
                        </div>
                      )}
                      
                      <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Date Display */}
                        <div className={`flex-shrink-0 ${isUpcoming ? 'animate-pulse-slow' : ''}`}>
                          <div className={`w-32 h-32 rounded-2xl flex flex-col items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${
                            isUpcoming 
                              ? 'bg-gradient-to-br from-[#c49e4e] to-[#9e7642] text-white border-4 border-white' 
                              : 'bg-gradient-to-br from-[#5a605a] to-[#232829] text-white border-4 border-white/50'
                          }`}>
                            <div className="text-sm font-bold uppercase tracking-wider">
                              {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                            <div className="text-5xl font-black leading-none my-1">
                              {eventDate.getDate()}
                            </div>
                            <div className="text-sm font-semibold">
                              {eventDate.getFullYear()}
                            </div>
                          </div>
                          {isUpcoming && (
                            <div className="mt-3 text-center">
                              <span className="inline-block px-4 py-1 bg-gradient-to-r from-[#c49e4e] to-[#9e7642] text-white text-xs font-bold rounded-full animate-pulse shadow-lg">
                                UPCOMING
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            {item.event_type && (
                              <span className="text-xs font-bold text-[#c49e4e] border-2 border-[#c49e4e] px-2 py-1 rounded uppercase">
                                {item.event_type}
                              </span>
                            )}
                            <h3 className={`text-2xl md:text-3xl font-black group-hover:text-[#c49e4e] transition-colors ${
                              isUpcoming ? 'text-[#232829]' : 'text-[#5a605a]'
                            }`}>
                              {item.title}
                            </h3>
                          </div>
                          
                          <p className="text-lg text-[#5a605a] leading-relaxed line-clamp-3 mb-4 whitespace-pre-line">
                            {item.content}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
                              isUpcoming 
                                ? 'bg-gradient-to-r from-[#c49e4e] to-[#9e7642] text-white' 
                                : 'bg-[#bac1bf]/30 text-[#5a605a]'
                            }`}>
                              <Calendar className="h-4 w-4" />
                              {eventDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            {item.event_time && (
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#232829]/10 text-[#232829] font-semibold">
                                Time: {new Date(`2000-01-01T${item.event_time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                              </span>
                            )}
                            {item.location && (
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#232829]/10 text-[#232829] font-semibold">
                                Location: {item.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 animate-scaleIn">
              <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6 hover-glow">
                <Newspaper className="mx-auto h-16 w-16 text-[#bac1bf]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#232829] mb-2">No News Yet</h3>
              <p className="text-[#5a605a] mb-6">
                Stay tuned for academy updates, tournament results, and chess world news!
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-[#c49e4e] text-white rounded-md font-medium hover:bg-[#9e7642] hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>
      <ScrollToTop />
    </div>
  )
}
