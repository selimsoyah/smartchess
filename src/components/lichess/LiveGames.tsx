import { getTVChannels } from '@/lib/lichess';
import { Radio, Users } from 'lucide-react';

export default async function LiveGames() {
  try {
    const channels = await getTVChannels();
    
    // Get the top-rated game
    const topChannel = channels.best || Object.values(channels)[0];

    return (
      <div className="bg-[#232829] rounded-lg p-6 border border-[#c49e4e]/20 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Radio className="w-5 h-5 text-red-500 animate-pulse" />
              <h3 className="text-2xl font-bold text-white">
                Watch Masters Play Live
              </h3>
            </div>
            <p className="text-[#bac1bf]">
              {topChannel.user.title && (
                <span className="text-[#c49e4e] font-bold mr-1">
                  {topChannel.user.title}
                </span>
              )}
              {topChannel.user.name} ({topChannel.rating}) is playing now
            </p>
          </div>
          <div className="flex items-center gap-1 text-[#bac1bf]">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {Object.keys(channels).length} live games
            </span>
          </div>
        </div>

        <div className="mb-4 bg-[#1a1d1a] rounded-lg overflow-hidden">
          <iframe
            src="https://lichess.org/tv/frame?theme=brown&bg=dark"
            width="100%"
            height="500px"
            frameBorder="0"
            className="rounded-lg"
            title="Lichess TV - Live Chess Game"
          />
        </div>

        <div className="min-h-[40px] mb-4"></div>

        <div className="mt-auto pt-4 border-t border-[#c49e4e]/20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#bac1bf]">
              Powered by{' '}
              <a
                href="https://lichess.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c49e4e] hover:text-[#d4ae5e]"
              >
                Lichess.org
              </a>
            </div>
            <a
              href="https://lichess.org/tv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c49e4e] hover:text-[#d4ae5e] text-sm"
            >
              View all channels →
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to load live games:', error);
    return (
      <div className="bg-[#232829] rounded-lg p-6 border border-[#c49e4e]/20 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Radio className="w-5 h-5 text-red-500" />
          <h3 className="text-2xl font-bold text-white">
            Watch Masters Play Live
          </h3>
        </div>
        <p className="text-[#bac1bf] mb-4">
          Unable to load live games. Please try again later.
        </p>
        <a
          href="https://lichess.org/tv"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c49e4e] hover:text-[#d4ae5e]"
        >
          Watch on Lichess →
        </a>
      </div>
    );
  }
}
