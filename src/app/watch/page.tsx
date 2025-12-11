import { Metadata } from 'next';
import { Radio, Users, Trophy, Zap } from 'lucide-react';
import TVChannelSelector from '@/components/lichess/TVChannelSelector';

export const metadata: Metadata = {
  title: 'Watch Live Chess Games | Smart Chess Academy',
  description: 'Watch top-rated players and grandmasters compete live on Lichess TV. Multiple channels including Bullet, Blitz, Rapid, and Classical.',
};

export default function WatchPage() {
  return (
    <div className="bg-[#faf9f7] min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Radio className="h-12 w-12 text-red-500 animate-pulse" />
              <Trophy className="h-16 w-16 text-[#c49e4e]" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Watch Live Chess Games
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#bac1bf]">
              Watch grandmasters and top players compete in real-time. Learn from the best by observing their games live.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <TVChannelSelector />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#232829] sm:text-4xl">
              Why Watch Live Games?
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#5a605a]">
              Improve your chess by watching masters play
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Users className="h-12 w-12 text-[#c49e4e] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Learn from Masters
              </h3>
              <p className="text-[#5a605a]">
                Watch how titled players handle various positions and time pressure situations.
              </p>
            </div>

            <div className="text-center p-6">
              <Zap className="h-12 w-12 text-[#c49e4e] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Different Time Controls
              </h3>
              <p className="text-[#5a605a]">
                From bullet to classical, see how strategy changes with time.
              </p>
            </div>

            <div className="text-center p-6">
              <Trophy className="h-12 w-12 text-[#c49e4e] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Top-Rated Games
              </h3>
              <p className="text-[#5a605a]">
                Only the highest-quality games from 2000+ rated players.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-[#faf9f7]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-[#232829] mb-8">
            How to Learn from Live Games
          </h2>
          <div className="space-y-6 text-[#5a605a]">
            <div className="border-l-4 border-[#c49e4e] pl-6">
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Try to Predict Moves
              </h3>
              <p>
                Pause before each move and try to guess what the player will do. This improves your tactical vision and strategic thinking.
              </p>
            </div>
            <div className="border-l-4 border-[#c49e4e] pl-6">
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Focus on Critical Moments
              </h3>
              <p>
                Pay special attention during tactical complications, endgames, and time scrambles. These moments reveal a player's true strength.
              </p>
            </div>
            <div className="border-l-4 border-[#c49e4e] pl-6">
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Watch Multiple Games
              </h3>
              <p>
                Switch between channels to see different time controls and playing styles. Notice how strategy changes between bullet and classical.
              </p>
            </div>
            <div className="border-l-4 border-[#c49e4e] pl-6">
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Analyze After Watching
              </h3>
              <p>
                After a game ends, try to review it with an engine. Understanding why certain moves were played deepens your learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#232829] to-[#44321b] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Want to Improve Your Game?
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#bac1bf]">
              Join our academy for personalized coaching and structured training
            </p>
            <div className="mt-10">
              <a
                href="/plans"
                className="rounded-md bg-[#c49e4e] px-6 py-3 text-sm font-semibold text-[#232829] shadow-sm hover:bg-[#9e7642] transition-colors inline-block"
              >
                View Training Plans
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
