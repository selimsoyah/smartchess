import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight, BookOpen, Users, Trophy, MessageSquare, Newspaper, Calendar, ExternalLink } from "lucide-react";
import { Suspense } from "react";
import DailyPuzzle from "@/components/lichess/DailyPuzzle";
import LiveGames from "@/components/lichess/LiveGames";
import ChessKnightLogo from "@/components/ChessKnightLogo";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollToTop from "@/components/ScrollToTop";
import { getLichessBlogPosts } from "@/lib/lichess";

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch latest 3 Lichess blog posts instead of database articles
  const lichessBlog = await getLichessBlogPosts(1);
  const articles = lichessBlog.currentPageResults.slice(0, 3);

  // Fetch latest 4 forum posts
  const { data: forumPosts } = await supabase
    .from('forum_posts')
    .select('id, title, content, created_at')
    .order('created_at', { ascending: false })
    .limit(4);

  // Fetch latest 3 news items
  const { data: news } = await supabase
    .from('news_facts')
    .select('id, date, event_date, event_time, title, content, location, event_type')
    .order('event_date', { ascending: true })
    .gte('event_date', new Date().toISOString().split('T')[0]) // Only future/today events
    .limit(3);

  // If no upcoming events, get the most recent past events
  const { data: pastNews } = news && news.length === 0 ? await supabase
    .from('news_facts')
    .select('id, date, event_date, event_time, title, content, location, event_type')
    .order('event_date', { ascending: false })
    .limit(3) : { data: null };

  const displayNews = news && news.length > 0 ? news : pastNews;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#c49e4e] rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-[#9e7642] rounded-full blur-3xl animate-pulse-slow delay-300"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Logo with float animation */}
            <div className="flex justify-center mb-8 animate-float">
              <div className="hover-glow">
                <ChessKnightLogo className="w-24 h-24 sm:w-32 sm:h-32 hover:scale-125 transition-transform duration-500 drop-shadow-2xl" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl animate-slideUp">
              Smart Chess Academy
            </h1>
            <p className="mt-6 text-2xl font-semibold text-[#c49e4e] animate-slideUp delay-100">
              Make the Right Move!
            </p>
            <p className="mt-4 text-lg leading-8 text-[#bac1bf] animate-slideUp delay-150">
              Professional Chess Coaching in Sousse, Tunisia
            </p>
            
            {/* Quick Access Feature Buttons */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-center gap-3 sm:gap-4 max-w-4xl mx-auto animate-slideUp delay-150">
              <a
                href="#puzzle"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#232829]/80 text-[#c49e4e] rounded-lg font-semibold hover:bg-[#232829] hover:scale-105 transition-all duration-300 border border-[#c49e4e]/30 hover:border-[#c49e4e] whitespace-nowrap text-sm sm:text-base"
              >
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Daily Puzzle</span>
                <span className="sm:hidden">Puzzle</span>
              </a>
              <a
                href="#live-games"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#232829]/80 text-[#c49e4e] rounded-lg font-semibold hover:bg-[#232829] hover:scale-105 transition-all duration-300 border border-[#c49e4e]/30 hover:border-[#c49e4e] whitespace-nowrap text-sm sm:text-base"
              >
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Live Games</span>
                <span className="sm:hidden">Live</span>
              </a>
              <a
                href="#articles"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#232829]/80 text-[#c49e4e] rounded-lg font-semibold hover:bg-[#232829] hover:scale-105 transition-all duration-300 border border-[#c49e4e]/30 hover:border-[#c49e4e] whitespace-nowrap text-sm sm:text-base"
              >
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Articles</span>
              </a>
              <a
                href="#forum"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#232829]/80 text-[#c49e4e] rounded-lg font-semibold hover:bg-[#232829] hover:scale-105 transition-all duration-300 border border-[#c49e4e]/30 hover:border-[#c49e4e] whitespace-nowrap text-sm sm:text-base"
              >
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Forum</span>
              </a>
              <a
                href="#news"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#232829]/80 text-[#c49e4e] rounded-lg font-semibold hover:bg-[#232829] hover:scale-105 transition-all duration-300 border border-[#c49e4e]/30 hover:border-[#c49e4e] whitespace-nowrap text-sm sm:text-base col-span-2 sm:col-span-1"
              >
                <Newspaper className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>News</span>
              </a>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-slideUp delay-200">
              <Link
                href="/plans"
                className="rounded-md bg-[#c49e4e] px-8 py-4 text-base font-bold text-[#232829] shadow-sm hover:bg-[#9e7642] hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                View Programs
              </Link>
              <Link
                href="/about"
                className="text-base font-bold leading-6 text-[#c49e4e] hover:text-[#bac1bf] hover:translate-x-2 transition-all duration-300 group"
              >
                Learn more <ArrowRight className="inline h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Highlights */}
      <section className="py-24 sm:py-32 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#232829] sm:text-4xl">
                Why Choose Smart Chess Academy?
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#5a605a]">
                Experience professional chess coaching tailored to your level and goals
              </p>
            </div>
          </ScrollReveal>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            <ScrollReveal delay={100}>
              <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md border-2 border-[#bac1bf]/30 hover:border-[#c49e4e] hover-lift group">
                <div className="rounded-full bg-gradient-to-br from-[#c49e4e]/20 to-[#9e7642]/20 p-4 mb-6 group-hover:from-[#c49e4e]/40 group-hover:to-[#9e7642]/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Users className="h-10 w-10 text-[#c49e4e]" />
                </div>
                <h3 className="text-xl font-bold text-[#232829] mb-3 group-hover:text-[#c49e4e] transition-colors">Experienced Coaches</h3>
                <p className="text-[#5a605a] leading-relaxed">
                  Learn from titled players and experienced instructors with proven teaching methods
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md border-2 border-[#bac1bf]/30 hover:border-[#c49e4e] hover-lift group">
                <div className="rounded-full bg-gradient-to-br from-[#c49e4e]/20 to-[#9e7642]/20 p-4 mb-6 group-hover:from-[#c49e4e]/40 group-hover:to-[#9e7642]/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <BookOpen className="h-10 w-10 text-[#c49e4e]" />
                </div>
                <h3 className="text-xl font-bold text-[#232829] mb-3 group-hover:text-[#c49e4e] transition-colors">Flexible Scheduling</h3>
                <p className="text-[#5a605a] leading-relaxed">
                  Individual and group lessons designed to fit your schedule and learning style
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md border-2 border-[#bac1bf]/30 hover:border-[#c49e4e] hover-lift group">
                <div className="rounded-full bg-gradient-to-br from-[#c49e4e]/20 to-[#9e7642]/20 p-4 mb-6 group-hover:from-[#c49e4e]/40 group-hover:to-[#9e7642]/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Trophy className="h-10 w-10 text-[#c49e4e]" />
                </div>
                <h3 className="text-xl font-bold text-[#232829] mb-3 group-hover:text-[#c49e4e] transition-colors">Tournament Ready</h3>
                <p className="text-[#5a605a] leading-relaxed">
                  Preparation and support for competitive play at all levels
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section id="articles" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#232829] sm:text-4xl">
                Latest from Lichess Blog
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#5a605a]">
                Stay updated with the latest chess news and articles from Lichess
              </p>
            </div>
          </ScrollReveal>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {articles && articles.length > 0 ? (
              articles.map((article, idx) => (
                <ScrollReveal key={article.id} delay={idx * 100} direction="up">
                  <article className="flex flex-col bg-gradient-to-br from-white to-[#faf9f7] rounded-2xl shadow-lg overflow-hidden hover-lift border-2 border-[#bac1bf]/20 hover:border-[#c49e4e] transition-all duration-500 group h-full">
                    {article.image && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-8">
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#c49e4e] to-[#9e7642] text-white text-xs font-bold rounded-full mb-4 group-hover:scale-110 transition-transform">
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h3 className="text-2xl font-bold text-[#232829] mb-3 group-hover:text-[#c49e4e] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-[#5a605a] mb-4 leading-relaxed line-clamp-3">
                        {article.shortlede}
                      </p>
                      <div className="text-sm font-semibold text-[#745832] group-hover:text-[#c49e4e] transition-colors">{article.author}</div>
                    </div>
                    <div className="px-8 pb-8">
                      <a
                        href={article.discuss || `https://lichess.org/blog/${article.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-[#c49e4e] text-white rounded-lg font-bold hover:bg-[#9e7642] transition-all duration-300 group-hover:scale-105 shadow-md hover:shadow-xl"
                      >
                        Read on Lichess <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </article>
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-3 text-center text-[#5a605a]">
                <p>Unable to load articles. Please try again later.</p>
              </div>
            )}
          </div>
          {articles && articles.length > 0 && (
            <div className="mt-10 flex justify-center">
              <a
                href="https://lichess.org/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#c49e4e] to-[#9e7642] px-8 py-4 text-base font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/20"
              >
                View All Articles on Lichess <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Social Proof / CTA */}
      <section className="relative bg-gradient-to-br from-[#232829] to-[#44321b] py-16 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c49e4e] rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl animate-slideUp">
              Ready to Improve Your Game?
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#bac1bf] animate-slideUp delay-100">
              Join our community and start your chess journey today
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-slideUp delay-200">
              <Link
                href="/plans"
                className="rounded-lg bg-gradient-to-r from-[#c49e4e] to-[#9e7642] px-8 py-4 text-base font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/20"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="text-base font-bold leading-6 text-[#c49e4e] hover:text-white hover:translate-x-2 transition-all duration-300 group"
              >
                Contact us <ArrowRight className="inline h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Forum Preview */}
      <section id="forum" className="py-24 sm:py-32 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <MessageSquare className="mx-auto h-12 w-12 text-[#c49e4e] mb-4 animate-float" />
              <h2 className="text-3xl font-bold tracking-tight text-[#232829] sm:text-4xl">
                Community Discussions
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#5a605a]">
                Join the conversation with fellow chess enthusiasts
              </p>
            </div>
          </ScrollReveal>
          
          {forumPosts && forumPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {forumPosts.map((post, idx) => (
                <ScrollReveal key={post.id} delay={idx * 100} direction="up">
                  <Link
                    href={`/forum/${post.id}`}
                    className="block bg-white rounded-2xl p-8 shadow-lg hover-lift border-2 border-[#bac1bf]/30 hover:border-[#c49e4e] transition-all duration-500 group"
                  >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c49e4e]/20 to-[#9e7642]/20 flex items-center justify-center flex-shrink-0 group-hover:from-[#c49e4e]/40 group-hover:to-[#9e7642]/40 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                      <Users className="h-7 w-7 text-[#c49e4e]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-[#232829] mb-2 group-hover:text-[#c49e4e] transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#5a605a] line-clamp-2 leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#5a605a] pt-3 border-t border-[#bac1bf]/20 group-hover:border-[#c49e4e]/30 transition-colors">
                    <span className="font-semibold">Anonymous</span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center text-[#5a605a]">
              <p>No discussions yet. Be the first to start one!</p>
            </div>
          )}
          
          <div className="mt-10 flex justify-center">
            <Link
              href="/forum"
              className="rounded-lg bg-gradient-to-r from-[#c49e4e] to-[#9e7642] px-8 py-4 text-base font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/20"
            >
              View All Discussions
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section id="news" className="py-24 sm:py-32 bg-gradient-to-br from-[#faf9f7] to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#c49e4e] to-[#9e7642] text-white mb-6 animate-float">
              <Calendar className="h-10 w-10" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-[#232829] sm:text-5xl mb-4">
              🎯 Upcoming Events
            </h2>
            <p className="mt-4 text-xl leading-8 text-[#5a605a] font-semibold">
              Don't miss out on our exciting chess events!
            </p>
          </div>

          {displayNews && displayNews.length > 0 ? (
            <div className="mx-auto max-w-5xl space-y-8">
              {displayNews.map((item, idx) => {
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
                          
                          <p className="text-lg text-[#5a605a] leading-relaxed line-clamp-2 mb-4">
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

                        {/* Arrow indicator */}
                        <div className="hidden md:block">
                          <ArrowRight className={`h-10 w-10 group-hover:translate-x-3 transition-transform ${
                            isUpcoming ? 'text-[#c49e4e]' : 'text-[#bac1bf]'
                          }`} />
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-block p-12 bg-gradient-to-br from-[#faf9f7] to-white rounded-3xl shadow-xl border-2 border-[#bac1bf]/30">
                <Calendar className="h-16 w-16 text-[#bac1bf] mx-auto mb-4" />
                <p className="text-xl text-[#5a605a] font-semibold">No events scheduled yet</p>
                <p className="text-[#5a605a] mt-2">Check back soon for upcoming tournaments and workshops!</p>
              </div>
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <Link
              href="/news"
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#c49e4e] to-[#9e7642] px-10 py-5 text-lg font-black text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border-4 border-white"
            >
              <Calendar className="h-6 w-6" />
              View All Events & News
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Features - Lichess Integration */}
      <section id="puzzle" className="py-24 sm:py-32 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#232829] sm:text-4xl">
              Train & Watch Live
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#5a605a]">
              Solve puzzles and watch top players compete in real-time
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Puzzle */}
            <Suspense fallback={<PuzzleSkeleton />}>
              <DailyPuzzle />
            </Suspense>

            {/* Live Games */}
            <div id="live-games">
              <Suspense fallback={<LiveGamesSkeleton />}>
                <LiveGames />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#232829] to-[#44321b] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join Smart Chess Academy Today
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#bac1bf]">
              Experience world-class chess education and become part of our growing community
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/signup"
                className="rounded-md bg-[#c49e4e] px-6 py-3 text-sm font-semibold text-[#232829] shadow-sm hover:bg-[#9e7642] transition-colors"
              >
                Create Free Account
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-[#c49e4e] hover:text-[#bac1bf] transition-colors"
              >
                Learn more <ArrowRight className="inline h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
}

// Loading skeletons
function PuzzleSkeleton() {
  return (
    <div className="bg-[#232829] rounded-lg p-6 border border-[#c49e4e]/20 animate-pulse">
      <div className="h-8 bg-[#c49e4e]/20 rounded w-1/2 mb-4"></div>
      <div className="h-[500px] bg-[#c49e4e]/10 rounded mb-4"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-[#c49e4e]/20 rounded w-20"></div>
        <div className="h-6 bg-[#c49e4e]/20 rounded w-24"></div>
      </div>
    </div>
  );
}

function LiveGamesSkeleton() {
  return (
    <div className="bg-[#232829] rounded-lg p-6 border border-[#c49e4e]/20 animate-pulse">
      <div className="h-8 bg-[#c49e4e]/20 rounded w-2/3 mb-4"></div>
      <div className="h-[500px] bg-[#c49e4e]/10 rounded"></div>
    </div>
  );
}
