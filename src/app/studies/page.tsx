import { Metadata } from 'next';
import UserStudies from '@/components/lichess/UserStudies';
import { BookOpen, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Lichess Studies | Smart Chess Academy',
  description: 'Explore chess studies from top coaches and players on Lichess',
};

export default function StudiesPage() {
  // Featured study creators (coaches/masters)
  const featuredCreators = [
    {
      username: 'MagnusCarlsen',
      name: 'Magnus Carlsen',
      description: 'World Chess Champion'
    },
    {
      username: 'Hikaru',
      name: 'Hikaru Nakamura',
      description: 'Grandmaster & Streamer'
    },
    {
      username: 'GothamChess',
      name: 'Levy Rozman',
      description: 'Chess Educator'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#c49e4e]/20 rounded-full">
                <BookOpen className="h-12 w-12 text-[#c49e4e]" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Lichess Study Browser
            </h1>
            <p className="text-lg leading-8 text-[#bac1bf]">
              Explore chess studies created by top players, coaches, and educators. Learn from annotated games, opening repertoires, and tactical exercises.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white border-b border-[#bac1bf]/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="bg-[#c49e4e]/5 border border-[#c49e4e]/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Search className="h-5 w-5 text-[#c49e4e]" />
                <h2 className="text-lg font-semibold text-[#232829]">
                  Browse Studies by Username
                </h2>
              </div>
              <p className="text-sm text-[#5a605a] mb-4">
                To view studies from a specific Lichess user, update the URL: <br />
                <code className="bg-[#232829] text-[#c49e4e] px-2 py-1 rounded text-xs mt-2 inline-block">
                  /studies?user=USERNAME
                </code>
              </p>
              <p className="text-sm text-[#5a605a]">
                Or link your Lichess account on your profile page to display your studies automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#232829] mb-3">Featured Study Creators</h2>
            <p className="text-[#5a605a]">
              Explore curated study collections from renowned chess personalities
            </p>
          </div>

          <div className="space-y-16">
            {featuredCreators.map((creator) => (
              <div key={creator.username} className="bg-white rounded-lg shadow-sm border border-[#bac1bf]/30 p-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#232829] mb-1">
                    {creator.name}
                  </h3>
                  <p className="text-[#5a605a]">{creator.description}</p>
                  <a
                    href={`https://lichess.org/@/${creator.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#c49e4e] hover:text-[#9e7642] inline-flex items-center gap-1 mt-2"
                  >
                    View Profile on Lichess
                  </a>
                </div>
                <UserStudies 
                  username={creator.username} 
                  limit={3} 
                  showInArticles={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 bg-gradient-to-br from-[#c49e4e]/5 to-[#c49e4e]/10 border-t border-[#bac1bf]/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-[#232829] mb-6 text-center">
              How to Use Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-[#bac1bf]/30">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-semibold text-[#232829] mb-2">Browse</h3>
                <p className="text-sm text-[#5a605a]">
                  Explore studies by topic, opening, or creator
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-[#bac1bf]/30">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-[#232829] mb-2">Study</h3>
                <p className="text-sm text-[#5a605a]">
                  Read annotations, play through variations
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-[#bac1bf]/30">
                <div className="text-3xl mb-3">✍️</div>
                <h3 className="font-semibold text-[#232829] mb-2">Embed</h3>
                <p className="text-sm text-[#5a605a]">
                  Copy embed code to add to articles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
