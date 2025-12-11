'use client';

import { useState } from 'react';
import LichessEmbed from '@/components/lichess/LichessEmbed';
import { lichessEmbeds } from '@/lib/lichess';

const TV_CHANNELS = [
  { id: 'best', name: 'Top Rated', description: 'Watch the highest-rated players' },
  { id: 'bullet', name: 'Bullet', description: 'Lightning-fast 1-minute games' },
  { id: 'blitz', name: 'Blitz', description: 'Quick 3-5 minute games' },
  { id: 'rapid', name: 'Rapid', description: '10-15 minute games' },
  { id: 'classical', name: 'Classical', description: '15+ minute games' },
  { id: 'crazyhouse', name: 'Crazyhouse', description: 'Drop captured pieces' },
  { id: 'chess960', name: 'Chess960', description: 'Fischer Random Chess' },
  { id: 'kingOfTheHill', name: 'King of the Hill', description: 'Get your king to the center' },
  { id: 'threeCheck', name: 'Three-check', description: 'Check your opponent 3 times' },
  { id: 'antichess', name: 'Antichess', description: 'Lose all your pieces to win' },
] as const;

export default function TVChannelSelector() {
  const [selectedChannel, setSelectedChannel] = useState<string>('best');

  const currentChannel = TV_CHANNELS.find(ch => ch.id === selectedChannel) || TV_CHANNELS[0];

  return (
    <div>
      {/* Channel Selector */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#232829] mb-4">
          Select Channel
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {TV_CHANNELS.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedChannel === channel.id
                  ? 'border-[#c49e4e] bg-[#c49e4e]/10'
                  : 'border-[#bac1bf]/30 hover:border-[#c49e4e]/50 bg-white'
              }`}
            >
              <div className="font-semibold text-[#232829] mb-1">
                {channel.name}
              </div>
              <div className="text-xs text-[#5a605a]">
                {channel.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Channel Info */}
      <div className="mb-4 p-4 bg-[#c49e4e]/10 rounded-lg border border-[#c49e4e]/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-[#232829]">
            Live: {currentChannel.name}
          </span>
        </div>
        <p className="text-sm text-[#5a605a] mt-1">
          {currentChannel.description}
        </p>
      </div>

      {/* Video Player */}
      <LichessEmbed
        src={lichessEmbeds.tv(selectedChannel)}
        title={`Lichess TV - ${currentChannel.name}`}
        height={600}
      />

      {/* Attribution */}
      <div className="mt-4 text-center text-sm text-[#5a605a]">
        <p>
          Streaming live from{' '}
          <a
            href="https://lichess.org/tv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c49e4e] hover:text-[#9e7642] font-semibold"
          >
            Lichess.org TV
          </a>
        </p>
      </div>
    </div>
  );
}
