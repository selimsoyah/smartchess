'use client';

import { useEffect, useState } from 'react';
import { getUserStudies } from '@/lib/lichess';
import { BookOpen, ExternalLink, Users, Eye, Clock } from 'lucide-react';
import Link from 'next/link';

interface UserStudiesProps {
  username: string;
  limit?: number;
  showInArticles?: boolean;
}

export default function UserStudies({ username, limit, showInArticles = false }: UserStudiesProps) {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStudies() {
      try {
        setLoading(true);
        setError(false);
        const data = await getUserStudies(username);
        const limitedData = limit ? data.slice(0, limit) : data;
        setStudies(limitedData);
      } catch (err) {
        console.error('Failed to fetch user studies:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchStudies();
    }
  }, [username, limit]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-[#c49e4e]/10 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800">
          Unable to load studies. Please verify the Lichess username is correct.
        </p>
      </div>
    );
  }

  if (!studies || studies.length === 0) {
    return (
      <div className="bg-[#bac1bf]/10 border border-[#bac1bf]/30 rounded-lg p-6 text-center">
        <BookOpen className="h-12 w-12 text-[#5a605a] mx-auto mb-3" />
        <p className="text-[#5a605a]">
          No public studies found for @{username}
        </p>
        <p className="text-sm text-[#5a605a] mt-2">
          Studies will appear here once they are created on Lichess
        </p>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[#232829]">
            Lichess Studies by @{username}
          </h3>
          <p className="text-sm text-[#5a605a] mt-1">
            {studies.length} {studies.length === 1 ? 'study' : 'studies'} available
          </p>
        </div>
        <a
          href={`https://lichess.org/study/by/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#c49e4e] hover:text-[#9e7642] flex items-center gap-1"
        >
          View on Lichess
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {studies.map((study) => (
          <div
            key={study.id}
            className="bg-white rounded-lg border border-[#bac1bf]/30 hover:border-[#c49e4e]/50 transition-all overflow-hidden group"
          >
            <div className="p-5">
              {/* Study Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-[#232829] group-hover:text-[#c49e4e] transition-colors mb-1">
                    {study.name}
                  </h4>
                  {study.topics && study.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {study.topics.slice(0, 3).map((topic: string) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 bg-[#c49e4e]/10 text-[#745832] rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                      {study.topics.length > 3 && (
                        <span className="text-xs px-2 py-1 text-[#5a605a]">
                          +{study.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Study Description */}
              {study.description && (
                <p className="text-sm text-[#5a605a] mb-4 line-clamp-2">
                  {study.description}
                </p>
              )}

              {/* Study Stats */}
              <div className="flex items-center gap-4 text-sm text-[#5a605a] mb-4">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{study.chapters} {study.chapters === 1 ? 'chapter' : 'chapters'}</span>
                </div>
                {study.likes !== undefined && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{formatNumber(study.likes)} likes</span>
                  </div>
                )}
                {study.views !== undefined && study.views > 0 && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{formatNumber(study.views)} views</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(study.updatedAt || study.createdAt)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {showInArticles && (
                  <button
                    onClick={() => {
                      // Copy JSON for article embedding
                      const embedCode = JSON.stringify({
                        type: 'lichess_study',
                        studyId: study.id,
                        caption: study.name
                      }, null, 2);
                      navigator.clipboard.writeText(embedCode);
                      alert('Study embed code copied to clipboard!');
                    }}
                    className="flex-1 px-4 py-2 bg-[#c49e4e]/10 text-[#745832] rounded-md font-medium hover:bg-[#c49e4e]/20 transition-colors text-sm"
                  >
                    Copy Embed Code
                  </button>
                )}
                <a
                  href={`https://lichess.org/study/${study.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${showInArticles ? 'flex-1' : 'w-full'} px-4 py-2 bg-[#c49e4e] text-white rounded-md font-medium hover:bg-[#9e7642] transition-colors text-sm text-center flex items-center justify-center gap-2`}
                >
                  Open Study
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Visual Indicator for Study Type */}
            {study.visibility === 'public' && (
              <div className="bg-gradient-to-r from-[#c49e4e]/5 to-transparent px-5 py-2 border-t border-[#bac1bf]/20">
                <span className="text-xs text-[#745832] font-medium">
                  ✓ Public Study
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {limit && studies.length >= limit && (
        <div className="text-center pt-4">
          <a
            href={`https://lichess.org/study/by/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c49e4e] hover:text-[#9e7642] font-medium"
          >
            View all studies on Lichess
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}
