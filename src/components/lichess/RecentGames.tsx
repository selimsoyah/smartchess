'use client';

import { useEffect, useState } from 'react';
import { getUserGames } from '@/lib/lichess';
import { Trophy, Clock, Calendar, ExternalLink } from 'lucide-react';

interface RecentGamesProps {
  username: string;
  limit?: number;
}

export default function RecentGames({ username, limit = 5 }: RecentGamesProps) {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        setError(false);
        const data = await getUserGames(username, limit);
        setGames(data);
      } catch (err) {
        console.error('Failed to fetch recent games:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchGames();
    }
  }, [username, limit]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-[#c49e4e]/10 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error || !games || games.length === 0) {
    return (
      <div className="bg-[#bac1bf]/10 border border-[#bac1bf]/30 rounded-lg p-4 text-center">
        <p className="text-sm text-[#5a605a]">
          No recent games found. Play some games on Lichess!
        </p>
      </div>
    );
  }

  const getResultColor = (game: any, username: string) => {
    const isWhite = game.players.white.user?.id.toLowerCase() === username.toLowerCase();
    const result = isWhite ? game.players.white.result : game.players.black.result;
    
    if (result === 'win') return 'text-green-600';
    if (result === 'loss') return 'text-red-600';
    return 'text-[#5a605a]';
  };

  const getResultText = (game: any, username: string) => {
    const isWhite = game.players.white.user?.id.toLowerCase() === username.toLowerCase();
    const result = isWhite ? game.players.white.result : game.players.black.result;
    
    if (result === 'win') return 'Won';
    if (result === 'loss') return 'Lost';
    return 'Draw';
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#232829]">Recent Games</h3>
        <a
          href={`https://lichess.org/@/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#c49e4e] hover:text-[#9e7642] flex items-center gap-1"
        >
          View All
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="space-y-3">
        {games.map((game) => {
          const isWhite = game.players.white.user?.id.toLowerCase() === username.toLowerCase();
          const opponent = isWhite ? game.players.black : game.players.white;
          const resultColor = getResultColor(game, username);
          const resultText = getResultText(game, username);

          return (
            <a
              key={game.id}
              href={`https://lichess.org/${game.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-br from-[#c49e4e]/5 to-[#c49e4e]/10 rounded-lg p-4 border border-[#c49e4e]/20 hover:border-[#c49e4e]/40 transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className={`h-4 w-4 ${resultColor}`} />
                  <span className={`font-semibold ${resultColor}`}>{resultText}</span>
                  <span className="text-xs text-[#5a605a]">
                    as {isWhite ? 'White' : 'Black'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#5a605a]">
                  <Calendar className="h-3 w-3" />
                  {formatDate(game.createdAt || game.lastMoveAt)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#232829]">
                    vs {opponent.user?.name || 'Anonymous'}
                  </p>
                  {opponent.rating && (
                    <p className="text-xs text-[#5a605a]">
                      Rating: {opponent.rating}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-[#5a605a]">
                    <Clock className="h-3 w-3" />
                    {game.speed} • {game.perf}
                  </div>
                  {game.moves && (
                    <p className="text-xs text-[#5a605a] mt-1">
                      {Math.ceil(game.moves.split(' ').length / 2)} moves
                    </p>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
