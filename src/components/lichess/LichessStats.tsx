'use client';

import { useEffect, useState } from 'react';
import { getLichessUser, formatRating } from '@/lib/lichess';
import { Trophy, TrendingUp, Target, Zap } from 'lucide-react';

interface LichessStatsProps {
  username: string;
}

export default function LichessStats({ username }: LichessStatsProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        setError(false);
        const data = await getLichessUser(username);
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch Lichess stats:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchStats();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-[#c49e4e]/20 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-[#c49e4e]/10 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800">
          Unable to load Lichess stats. Please verify your username is correct.
        </p>
      </div>
    );
  }

  const mainPerfs = ['blitz', 'rapid', 'classical', 'bullet'];
  const availablePerfs = mainPerfs.filter(key => stats.perfs[key]?.games > 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#232829]">
          Lichess Statistics
        </h3>
        <a
          href={`https://lichess.org/@/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#c49e4e] hover:text-[#9e7642] flex items-center gap-1"
        >
          View Full Profile
          <Trophy className="h-4 w-4" />
        </a>
      </div>

      {/* Rating Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {availablePerfs.map((perfKey) => {
          const perf = stats.perfs[perfKey];
          const icons = {
            bullet: Zap,
            blitz: TrendingUp,
            rapid: Target,
            classical: Trophy,
          };
          const Icon = icons[perfKey as keyof typeof icons] || Trophy;

          return (
            <div
              key={perfKey}
              className="bg-gradient-to-br from-[#c49e4e]/10 to-[#c49e4e]/5 rounded-lg p-4 border border-[#c49e4e]/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-[#c49e4e]" />
                <span className="text-xs font-semibold text-[#5a605a] uppercase">
                  {perfKey}
                </span>
              </div>
              <div className="text-2xl font-bold text-[#232829]">
                {perf.rating}
              </div>
              <div className="text-xs text-[#5a605a] mt-1">
                {perf.games} games
                {perf.prog !== 0 && (
                  <span className={perf.prog > 0 ? 'text-green-600' : 'text-red-600'}>
                    {' '}({perf.prog > 0 ? '+' : ''}{perf.prog})
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="flex items-center gap-4 text-sm text-[#5a605a] pt-2 border-t border-[#bac1bf]/30">
        <div>
          <span className="font-semibold">Member since:</span>{' '}
          {new Date(stats.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </div>
        {stats.profile?.country && (
          <div>
            <span className="font-semibold">Country:</span> {stats.profile.country}
          </div>
        )}
      </div>

      {stats.profile?.bio && (
        <div className="pt-2 border-t border-[#bac1bf]/30">
          <p className="text-sm text-[#5a605a] italic">{stats.profile.bio}</p>
        </div>
      )}
    </div>
  );
}
