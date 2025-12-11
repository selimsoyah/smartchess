import { Metadata } from 'next';
import { getTournaments } from '@/lib/lichess';
import TournamentCard from '@/components/lichess/TournamentCard';
import { Trophy, Calendar, Clock, AlertCircle, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chess Tournaments | Smart Chess Academy',
  description: 'Browse and join upcoming chess tournaments on Lichess. Arena and Swiss tournaments with various time controls.',
};

export default async function TournamentsPage() {
  let tournaments;
  let error = false;

  try {
    tournaments = await getTournaments();
  } catch (err) {
    console.error('Failed to fetch tournaments:', err);
    error = true;
  }

  return (
    <div className="bg-[#faf9f7] min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Trophy className="mx-auto h-16 w-16 text-[#c49e4e] mb-4" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Chess Tournaments
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#bac1bf]">
              Join thousands of players in competitive tournaments. Test your skills and climb the leaderboard!
            </p>
          </div>
        </div>
      </section>

      {error ? (
        /* Error State */
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-[#bac1bf]/30 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-[#c49e4e] mb-4" />
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Unable to Load Tournaments
              </h3>
              <p className="text-[#5a605a] mb-6">
                We couldn't fetch the tournament list. Please try again later or visit Lichess directly.
              </p>
              <a
                href="https://lichess.org/tournament"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md bg-[#c49e4e] px-6 py-3 text-sm font-semibold text-[#232829] shadow-sm hover:bg-[#9e7642] transition-colors"
              >
                View on Lichess
              </a>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Starting Soon / In Progress */}
          {tournaments && tournaments.started && tournaments.started.length > 0 && (
            <section className="py-16">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="h-8 w-8 text-[#c49e4e]" />
                  <h2 className="text-3xl font-bold tracking-tight text-[#232829]">
                    In Progress
                  </h2>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tournaments.started.slice(0, 6).map((tournament) => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Upcoming Tournaments */}
          {tournaments && tournaments.created && tournaments.created.length > 0 && (
            <section className="py-16 bg-white">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                  <Calendar className="h-8 w-8 text-[#c49e4e]" />
                  <h2 className="text-3xl font-bold tracking-tight text-[#232829]">
                    Upcoming Tournaments
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tournaments.created.slice(0, 9).map((tournament) => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* No Tournaments */}
          {tournaments && tournaments.created.length === 0 && tournaments.started.length === 0 && (
            <section className="py-16">
              <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                <Trophy className="mx-auto h-16 w-16 text-[#bac1bf] mb-4" />
                <h3 className="text-2xl font-semibold text-[#232829] mb-2">
                  No Tournaments Available
                </h3>
                <p className="text-[#5a605a] mb-6">
                  Check back soon for upcoming tournaments!
                </p>
                <a
                  href="https://lichess.org/tournament"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-[#c49e4e] px-6 py-3 text-sm font-semibold text-[#232829] shadow-sm hover:bg-[#9e7642] transition-colors"
                >
                  Browse All Tournaments on Lichess
                </a>
              </div>
            </section>
          )}
        </>
      )}

      {/* Info Section */}
      <section className="py-16 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#232829] sm:text-4xl">
              Tournament Types
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#5a605a]">
              Understanding different tournament formats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-[#bac1bf]/30">
              <Trophy className="h-12 w-12 text-[#c49e4e] mb-4" />
              <h3 className="text-xl font-semibold text-[#232829] mb-3">
                Arena Tournaments
              </h3>
              <p className="text-[#5a605a] mb-4">
                Play as many games as you can within the time limit. Each win earns points, with bonus points for win streaks. Join anytime, leave anytime.
              </p>
              <ul className="space-y-2 text-sm text-[#5a605a]">
                <li>✓ Flexible participation</li>
                <li>✓ Win streaks give bonus points</li>
                <li>✓ Great for quick competitions</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-[#bac1bf]/30">
              <Users className="h-12 w-12 text-[#c49e4e] mb-4" />
              <h3 className="text-xl font-semibold text-[#232829] mb-3">
                Swiss Tournaments
              </h3>
              <p className="text-[#5a605a] mb-4">
                Fixed number of rounds with paired opponents of similar strength. Must join before the start and play all rounds scheduled.
              </p>
              <ul className="space-y-2 text-sm text-[#5a605a]">
                <li>✓ Fair pairing system</li>
                <li>✓ Everyone plays same number of games</li>
                <li>✓ More competitive format</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#232829] to-[#44321b] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Prepare for Tournament Success
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#bac1bf]">
              Join our academy for tournament preparation training
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
