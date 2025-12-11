// Lichess API integration utilities
// Documentation: https://lichess.org/api

const LICHESS_API_BASE = 'https://lichess.org';

export interface LichessPuzzle {
  game: {
    id: string;
    pgn: string;
    clock: string;
  };
  puzzle: {
    id: string;
    rating: number;
    plays: number;
    initialPly: number;
    solution: string[];
    themes: string[];
  };
}

export interface LichessUser {
  id: string;
  username: string;
  perfs: {
    [key: string]: {
      rating: number;
      games: number;
      prog: number;
    };
  };
  profile?: {
    country?: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
  };
  createdAt: number;
  seenAt: number;
  playTime: {
    total: number;
    tv: number;
  };
}

export interface LichessTVChannels {
  [channel: string]: {
    user: {
      id: string;
      name: string;
      title?: string;
    };
    rating: number;
    gameId: string;
  };
}

export interface LichessTournament {
  id: string;
  createdBy: string;
  system: 'arena' | 'swiss';
  minutes: number;
  clock: {
    limit: number;
    increment: number;
  };
  rated: boolean;
  fullName: string;
  nbPlayers: number;
  variant: {
    key: string;
    name: string;
  };
  startsAt: string;
  finishesAt: string;
  status: number;
  perf: {
    key: string;
    name: string;
  };
}

export interface LichessStudy {
  id: string;
  name: string;
  members: Array<{
    user: {
      name: string;
      id: string;
    };
    role: string;
  }>;
  chapters: Array<{
    id: string;
    name: string;
  }>;
  createdAt: number;
  updatedAt: number;
  likes: number;
  views: number;
  description?: string;
}

export interface LichessBlogPost {
  id: string;
  title: string;
  shortlede: string;
  markdown: string;
  html: string;
  image: string;
  date: number;
  author: string;
  discuss?: string;
}

/**
 * Get the daily puzzle from Lichess
 * Updates once per day
 */
export async function getDailyPuzzle(): Promise<LichessPuzzle> {
  const res = await fetch(`${LICHESS_API_BASE}/api/puzzle/daily`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch daily puzzle');
  }

  return res.json();
}

/**
 * Get current TV channels (live games)
 * Updates frequently
 */
export async function getTVChannels(): Promise<LichessTVChannels> {
  const res = await fetch(`${LICHESS_API_BASE}/api/tv/channels`, {
    next: { revalidate: 30 }, // Cache for 30 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch TV channels');
  }

  return res.json();
}

/**
 * Get Lichess user profile and stats
 * @param username - Lichess username
 */
export async function getLichessUser(username: string): Promise<LichessUser> {
  const res = await fetch(`${LICHESS_API_BASE}/api/user/${username}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${username}`);
  }

  return res.json();
}

/**
 * Get opening statistics from master games
 * @param fen - FEN position string
 */
export async function getOpeningStats(fen: string) {
  const res = await fetch(
    `https://explorer.lichess.ovh/masters?fen=${encodeURIComponent(fen)}`,
    {
      next: { revalidate: 86400 }, // Cache for 24 hours
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch opening stats');
  }

  return res.json();
}

/**
 * Get user's recent games
 * @param username - Lichess username
 * @param max - Maximum number of games (default: 10)
 */
export async function getUserGames(username: string, max: number = 10) {
  const res = await fetch(
    `${LICHESS_API_BASE}/api/games/user/${username}?max=${max}&pgnInJson=true&moves=true&opening=true`,
    {
      next: { revalidate: 600 }, // Cache for 10 minutes
      headers: {
        'Accept': 'application/x-ndjson'
      }
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch games for user: ${username}`);
  }

  const text = await res.text();
  // Parse NDJSON (newline-delimited JSON)
  const games = text
    .trim()
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => JSON.parse(line));

  return games;
}

/**
 * Get upcoming tournaments
 */
export async function getTournaments(): Promise<{
  created: LichessTournament[];
  started: LichessTournament[];
  finished: LichessTournament[];
}> {
  const res = await fetch(`${LICHESS_API_BASE}/api/tournament`, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tournaments');
  }

  return res.json();
}

/**
 * Get tournament details
 * @param tournamentId - Tournament ID
 */
export async function getTournamentDetails(tournamentId: string) {
  const res = await fetch(`${LICHESS_API_BASE}/api/tournament/${tournamentId}`, {
    next: { revalidate: 60 }, // Cache for 1 minute
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tournament: ${tournamentId}`);
  }

  return res.json();
}

/**
 * Get Lichess study metadata
 * @param studyId - Study ID
 */
export async function getLichessStudy(studyId: string): Promise<LichessStudy> {
  const res = await fetch(`${LICHESS_API_BASE}/api/study/${studyId}.json`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch study: ${studyId}`);
  }

  return res.json();
}

/**
 * Get all public studies by a Lichess user
 * @param username - Lichess username
 */
export async function getUserStudies(username: string) {
  const res = await fetch(
    `${LICHESS_API_BASE}/api/study/by/${username}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/x-ndjson'
      }
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch studies for user: ${username}`);
  }

  const text = await res.text();
  // Parse NDJSON (newline-delimited JSON)
  const studies = text
    .trim()
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => JSON.parse(line));

  return studies;
}

/**
 * Get Lichess blog posts from RSS feed
 */
export async function getLichessBlogPosts(page: number = 1): Promise<{
  currentPage: number;
  maxPerPage: number;
  nbPages: number;
  nbResults: number;
  nextPage?: number;
  previousPage?: number;
  currentPageResults: LichessBlogPost[];
}> {
  try {
    const Parser = require('rss-parser');
    const parser = new Parser();
    
    const feed = await parser.parseURL('https://lichess.org/blog.atom');
    
    const posts: LichessBlogPost[] = feed.items.map((item: any) => ({
      id: item.link?.split('/').pop() || item.guid || Math.random().toString(),
      title: item.title || 'Untitled',
      shortlede: item.contentSnippet || item.content?.substring(0, 200) || '',
      markdown: '',
      html: item.content || '',
      image: item.enclosure?.url || 'https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=800&h=400&fit=crop',
      date: new Date(item.pubDate || item.isoDate).getTime(),
      author: item.creator || 'Lichess',
      discuss: item.link || ''
    }));

    // Add featured article at the top
    const featuredArticle: LichessBlogPost = {
      id: 'E2biEKGc',
      title: 'FIDE World Cup Semifinals: Wei Yi & Javokhir Sindarov qualify to Candidates',
      shortlede: 'The FIDE World Cup semifinals concluded with exciting games as Wei Yi and Javokhir Sindarov secured their spots in the Candidates tournament.',
      markdown: '',
      html: '<p>The FIDE World Cup semifinals concluded with exciting games as Wei Yi and Javokhir Sindarov secured their spots in the Candidates tournament.</p>',
      image: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&h=400&fit=crop&q=80',
      date: Date.now(),
      author: 'Lichess',
      discuss: 'https://lichess.org/@/Lichess/blog/fide-world-cup-semifinals-wei-yi--javokhir-sindarov-qualify-to-candidates/E2biEKGc'
    };

    // Combine featured article with RSS posts
    const allPosts = [featuredArticle, ...posts];

    return {
      currentPage: page,
      maxPerPage: 10,
      nbPages: Math.ceil(allPosts.length / 10),
      nbResults: allPosts.length,
      currentPageResults: allPosts.slice(0, 10)
    };
  } catch (error) {
    console.error('Failed to fetch Lichess blog RSS:', error);
    // Return empty array on error
    return {
      currentPage: 1,
      maxPerPage: 10,
      nbPages: 0,
      nbResults: 0,
      currentPageResults: []
    };
  }
}

/**
 * Helper to generate Lichess embed URLs
 */
export const lichessEmbeds = {
  game: (gameId: string, theme: string = 'brown') =>
    `${LICHESS_API_BASE}/embed/game/${gameId}?theme=${theme}&bg=dark`,

  puzzle: (puzzleId: string) =>
    `${LICHESS_API_BASE}/training/frame?theme=brown&bg=dark`,

  tv: (channel: string = 'best', theme: string = 'brown') =>
    `${LICHESS_API_BASE}/tv/${channel}/frame?theme=${theme}&bg=dark`,

  study: (studyId: string, chapterId?: string) =>
    `${LICHESS_API_BASE}/study/embed/${studyId}${chapterId ? `/${chapterId}` : ''}`,

  analysis: (fen: string) =>
    `${LICHESS_API_BASE}/analysis/${encodeURIComponent(fen)}`,
};

/**
 * Format Lichess rating with color
 */
export function formatRating(rating: number): string {
  if (rating >= 2400) return '🏆 ' + rating; // Master
  if (rating >= 2200) return '💎 ' + rating; // Expert
  if (rating >= 2000) return '⭐ ' + rating; // Strong
  if (rating >= 1800) return '🔥 ' + rating; // Intermediate
  return rating.toString();
}

/**
 * Get time control name
 */
export function getTimeControlName(key: string): string {
  const names: { [key: string]: string } = {
    bullet: 'Bullet',
    blitz: 'Blitz',
    rapid: 'Rapid',
    classical: 'Classical',
    correspondence: 'Correspondence',
    chess960: 'Chess960',
    puzzle: 'Puzzles',
  };
  return names[key] || key;
}
