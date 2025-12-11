import { getDailyPuzzle } from '@/lib/lichess';
import { Trophy, TrendingUp } from 'lucide-react';

export default async function DailyPuzzle() {
  try {
    const puzzle = await getDailyPuzzle();

    return (
      <div className="bg-[#232829] rounded-lg p-6 border border-[#c49e4e]/20 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-1">
              Daily Chess Puzzle
            </h3>
            <p className="text-[#bac1bf]">
              Solve today's tactical challenge
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#bac1bf]">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-[#c49e4e]" />
              <span>Rating: {puzzle.puzzle.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-[#c49e4e]" />
              <span>{puzzle.puzzle.plays.toLocaleString()} plays</span>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-[#1a1d1a] rounded-lg overflow-hidden">
          <iframe
            src="https://lichess.org/training/frame?theme=brown&bg=dark"
            width="100%"
            height="500px"
            frameBorder="0"
            className="rounded-lg"
            title="Daily Chess Puzzle"
          />
        </div>

        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {puzzle.puzzle.themes.map((theme) => (
            <span
              key={theme}
              className="px-3 py-1 bg-[#c49e4e]/10 text-[#c49e4e] rounded-full text-sm capitalize h-fit"
            >
              {theme.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#c49e4e]/20">
          <a
            href="https://lichess.org/training"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c49e4e] hover:text-[#d4ae5e] text-sm flex items-center gap-2"
          >
            Practice more puzzles on Lichess →
          </a>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to load daily puzzle:', error);
    return (
      <div className="bg-[#232829] rounded-lg p-6 border border-[#c49e4e]/20 h-full flex flex-col">
        <h3 className="text-2xl font-bold text-white mb-2">
          Daily Chess Puzzle
        </h3>
        <p className="text-[#bac1bf] mb-4">
          Unable to load today's puzzle. Please try again later.
        </p>
        <a
          href="https://lichess.org/training"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c49e4e] hover:text-[#d4ae5e]"
        >
          Visit Lichess for puzzles →
        </a>
      </div>
    );
  }
}
