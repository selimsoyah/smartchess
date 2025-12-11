'use client';

import { useEffect, useState } from 'react';
import { getLichessUser } from '@/lib/lichess';
import { ExternalLink, Trophy } from 'lucide-react';

interface LichessProfileCardProps {
  username: string;
  compact?: boolean;
}

export default function LichessProfileCard({ username, compact = false }: LichessProfileCardProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError(false);
        const data = await getLichessUser(username);
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch Lichess profile:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-[#c49e4e]/20 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-[#c49e4e]/10 rounded w-1/2"></div>
      </div>
    );
  }

  if (error || !profile) {
    return null; // Silently fail for coach cards
  }

  const mainPerf = profile.perfs?.blitz || profile.perfs?.rapid || profile.perfs?.classical || profile.perfs?.bullet;

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-[#c49e4e]/5 to-[#c49e4e]/10 rounded-lg p-3 border border-[#c49e4e]/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-[#c49e4e]" />
            <span className="text-sm font-semibold text-[#232829]">Lichess Profile</span>
          </div>
          <a
            href={`https://lichess.org/@/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c49e4e] hover:text-[#9e7642]"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        {mainPerf && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#5a605a]">Rating</span>
            <span className="text-lg font-bold text-[#232829]">{mainPerf.rating}</span>
          </div>
        )}
        <div className="text-xs text-[#5a605a] mt-1">
          @{username}
        </div>
      </div>
    );
  }

  // Full card view (for future use)
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-[#bac1bf]/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#232829]">Lichess Profile</h3>
        <a
          href={`https://lichess.org/@/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c49e4e] hover:text-[#9e7642] flex items-center gap-1 text-sm"
        >
          View Profile
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      
      <div className="space-y-3">
        {['blitz', 'rapid', 'classical', 'bullet'].map((key) => {
          const perf = profile.perfs[key];
          if (!perf || perf.games === 0) return null;
          
          return (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-[#5a605a] capitalize">{key}</span>
              <span className="text-lg font-bold text-[#232829]">{perf.rating}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
