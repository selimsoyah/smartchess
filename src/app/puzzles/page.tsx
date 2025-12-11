import { Metadata } from 'next';
import { Suspense } from 'react';
import DailyPuzzle from '@/components/lichess/DailyPuzzle';
import { Brain, Target, TrendingUp, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chess Puzzles | Smart Chess Academy',
  description: 'Improve your tactical skills with daily chess puzzles and training exercises from Lichess.',
};

export default function PuzzlesPage() {
  return (
    <div className="bg-[#faf9f7] min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Brain className="mx-auto h-16 w-16 text-[#c49e4e] mb-4" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Chess Puzzles & Tactics
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#bac1bf]">
              Sharpen your tactical vision with daily puzzles and unlimited training exercises
            </p>
          </div>
        </div>
      </section>

      {/* Daily Puzzle */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Suspense fallback={<PuzzleSkeleton />}>
            <DailyPuzzle />
          </Suspense>
        </div>
      </section>

      {/* Training Options */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#232829] sm:text-4xl">
              Puzzle Training Options
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#5a605a]">
              Choose your training mode and improve your chess vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Puzzle Themes */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-[#bac1bf]/30 hover:border-[#c49e4e]/50 transition-all">
              <Target className="h-12 w-12 text-[#c49e4e] mb-4" />
              <h3 className="text-xl font-bold text-[#232829] mb-3">
                Themed Puzzles
              </h3>
              <p className="text-[#5a605a] mb-6">
                Practice specific tactical patterns like pins, forks, discovered attacks, and more.
              </p>
              <a
                href="https://lichess.org/training/themes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#c49e4e] hover:text-[#9e7642] font-semibold"
              >
                Train by Theme <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Puzzle Rush */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-[#bac1bf]/30 hover:border-[#c49e4e]/50 transition-all">
              <TrendingUp className="h-12 w-12 text-[#c49e4e] mb-4" />
              <h3 className="text-xl font-bold text-[#232829] mb-3">
                Puzzle Storm
              </h3>
              <p className="text-[#5a605a] mb-6">
                Solve as many puzzles as you can in 3 minutes. Test your speed and accuracy under pressure.
              </p>
              <a
                href="https://lichess.org/storm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#c49e4e] hover:text-[#9e7642] font-semibold"
              >
                Start Storm <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Puzzle Streak */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-[#bac1bf]/30 hover:border-[#c49e4e]/50 transition-all">
              <Brain className="h-12 w-12 text-[#c49e4e] mb-4" />
              <h3 className="text-xl font-bold text-[#232829] mb-3">
                Puzzle Streak
              </h3>
              <p className="text-[#5a605a] mb-6">
                Build a winning streak! Solve puzzles correctly in a row and challenge yourself to break records.
              </p>
              <a
                href="https://lichess.org/streak"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#c49e4e] hover:text-[#9e7642] font-semibold"
              >
                Start Streak <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-[#232829] mb-8">
            Tips for Puzzle Training
          </h2>
          <div className="space-y-6 text-[#5a605a]">
            <div className="border-l-4 border-[#c49e4e] pl-6">
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Take Your Time
              </h3>
              <p>
                Don't rush! Puzzles are about accuracy, not speed. Calculate variations fully before making your move.
              </p>
            </div>
            <div className="border-l-4 border-[#c49e4e] pl-6">
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Look for Forcing Moves
              </h3>
              <p>
                Start by considering checks, captures, and threats. The solution usually involves forcing your opponent's hand.
              </p>
            </div>
            <div className="border-l-4 border-[#c49e4e] pl-6">
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Practice Daily
              </h3>
              <p>
                Consistency is key! Solve at least 5-10 puzzles every day to see rapid improvement in your tactical vision.
              </p>
            </div>
            <div className="border-l-4 border-[#c49e4e] pl-6">
              <h3 className="text-xl font-semibold text-[#232829] mb-2">
                Review Your Mistakes
              </h3>
              <p>
                When you get a puzzle wrong, study the solution carefully. Understanding why you failed is more valuable than getting it right.
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
              Want Personalized Training?
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#bac1bf]">
              Join our academy for structured puzzle training and expert guidance
            </p>
            <div className="mt-10">
              <Link
                href="/plans"
                className="rounded-md bg-[#c49e4e] px-6 py-3 text-sm font-semibold text-[#232829] shadow-sm hover:bg-[#9e7642] transition-colors"
              >
                View Training Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PuzzleSkeleton() {
  return (
    <div className="bg-[#232829] rounded-lg p-6 border border-[#c49e4e]/20 animate-pulse">
      <div className="h-8 bg-[#c49e4e]/20 rounded w-1/2 mb-4"></div>
      <div className="h-[500px] bg-[#c49e4e]/10 rounded mb-4"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-[#c49e4e]/20 rounded w-20"></div>
        <div className="h-6 bg-[#c49e4e]/20 rounded w-24"></div>
      </div>
    </div>
  );
}
