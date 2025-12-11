import { LichessTournament } from '@/lib/lichess';
import { Calendar, Users, Clock, Trophy, ExternalLink } from 'lucide-react';

interface TournamentCardProps {
  tournament: LichessTournament;
}

export default function TournamentCard({ tournament }: TournamentCardProps) {
  const startDate = new Date(tournament.startsAt);
  const isStartingSoon = startDate.getTime() - Date.now() < 3600000; // Within 1 hour

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-[#bac1bf]/30 hover:border-[#c49e4e]/50 transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {tournament.system === 'arena' ? (
              <Trophy className="h-5 w-5 text-[#c49e4e]" />
            ) : (
              <Users className="h-5 w-5 text-[#c49e4e]" />
            )}
            <span className="text-xs font-semibold text-[#c49e4e] uppercase">
              {tournament.system}
            </span>
            {isStartingSoon && (
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                Starting Soon!
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#232829] mb-1">
            {tournament.fullName}
          </h3>
          <p className="text-sm text-[#5a605a]">
            {tournament.perf.name} • {tournament.rated ? 'Rated' : 'Casual'}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-[#5a605a]">
          <Calendar className="h-4 w-4 text-[#c49e4e]" />
          <div>
            <div className="font-semibold text-[#232829]">
              {startDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="text-xs">
              {startDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#5a605a]">
          <Clock className="h-4 w-4 text-[#c49e4e]" />
          <div>
            <div className="font-semibold text-[#232829]">
              {tournament.clock.limit / 60}+{tournament.clock.increment}
            </div>
            <div className="text-xs">Time Control</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#5a605a]">
          <Users className="h-4 w-4 text-[#c49e4e]" />
          <div>
            <div className="font-semibold text-[#232829]">
              {tournament.nbPlayers.toLocaleString()}
            </div>
            <div className="text-xs">Players</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#5a605a]">
          <Trophy className="h-4 w-4 text-[#c49e4e]" />
          <div>
            <div className="font-semibold text-[#232829]">
              {tournament.minutes} min
            </div>
            <div className="text-xs">Duration</div>
          </div>
        </div>
      </div>

      {/* Variant Badge */}
      {tournament.variant.key !== 'standard' && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[#c49e4e]/10 text-[#c49e4e] rounded-full text-xs font-semibold">
            {tournament.variant.name}
          </span>
        </div>
      )}

      {/* Action Button */}
      <a
        href={`https://lichess.org/tournament/${tournament.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center rounded-md bg-[#c49e4e] px-4 py-2.5 text-sm font-semibold text-[#232829] shadow-sm hover:bg-[#9e7642] transition-colors"
      >
        <span className="flex items-center justify-center gap-2">
          {tournament.status === 10 ? 'View Tournament' : 'Join on Lichess'}
          <ExternalLink className="h-4 w-4" />
        </span>
      </a>
    </div>
  );
}
