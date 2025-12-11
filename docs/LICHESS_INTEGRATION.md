# Lichess API Integration Guide

## Available Lichess Features (Free & Open Source)

### 1. **Puzzles** 🧩
- **Daily Puzzle**: Get the daily tactical puzzle
- **Puzzle Database**: Access thousands of rated puzzles
- **API Endpoint**: `GET https://lichess.org/api/puzzle/daily`
- **Use Case**: Create a "Puzzle of the Day" section on homepage

### 2. **Games Database** ♟️
- **User Games**: Fetch games from any user
- **Game Analysis**: Get computer analysis
- **Opening Explorer**: Opening statistics from master games
- **API Endpoints**: 
  - `GET /api/games/user/{username}`
  - `GET /api/user/{username}/current-game`
  - `GET /api/games/export/{gameId}`

### 3. **Embedded Chess Board** 📊
- **Game Viewer**: Embed any Lichess game
- **Study Chapters**: Embed interactive studies
- **Analysis Board**: Embed position analysis
- **Format**: `https://lichess.org/embed/game/{gameId}?theme=brown&bg=dark`
- **Already Implemented**: ✅ In ArticleRenderer component

### 4. **TV/Streamed Games** 📺
- **Watch Live Games**: Stream top-rated games
- **TV Channels**: Different rating pools
- **API Endpoint**: `GET /api/tv/channels`
- **Use Case**: "Watch Live Masters Play" section

### 5. **Opening Explorer** 📚
- **Master Games Database**: 2+ million master games
- **Lichess Games Database**: Billions of positions
- **API Endpoint**: `GET /api/explorer/master`
- **Use Case**: Opening statistics and recommendations

### 6. **User Profiles** 👤
- **Player Stats**: Rating, games played, performance
- **Rating History**: Track progress over time
- **API Endpoint**: `GET /api/user/{username}`
- **Use Case**: Coach profiles with Lichess stats

### 7. **Tournaments** 🏆
- **Public Tournaments**: Browse upcoming tournaments
- **Tournament Info**: Details, standings, games
- **API Endpoint**: `GET /api/tournament`
- **Use Case**: Display community tournaments

### 8. **Tablebase** 📖
- **7-piece Endgame Database**: Perfect play lookup
- **API Endpoint**: `GET /api/tablebase/standard`
- **Use Case**: Endgame position analysis

### 9. **Studies** 📝
- **Import Studies**: Fetch public study chapters
- **Collaborative Analysis**: Share annotated games
- **Format**: `https://lichess.org/study/{studyId}`
- **Use Case**: Coach-created study materials

---

## Recommended Implementations

### Phase 1: Easy Wins (1-2 hours)
1. **Daily Puzzle Widget** - Homepage feature
2. **Watch Live Games** - TV stream on homepage
3. **Lichess Profile Cards** - For coaches (show their rating)

### Phase 2: Medium Features (2-4 hours)
4. **Opening Explorer Tool** - Interactive opening research
5. **Puzzle Trainer** - Integrated puzzle solving
6. **Tournament Calendar** - Upcoming Lichess tournaments

### Phase 3: Advanced Features (4-8 hours)
7. **Game Database Search** - Find games by opening/player
8. **Position Analysis** - Stockfish evaluation via Lichess
9. **Study Import** - Import Lichess studies as articles

---

## Implementation Examples

### 1. Daily Puzzle (Easiest - Start Here!)

```typescript
// lib/lichess.ts
export async function getDailyPuzzle() {
  const res = await fetch('https://lichess.org/api/puzzle/daily', {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  return res.json();
}

// Response format:
{
  "game": { "id": "...", "pgn": "..." },
  "puzzle": { 
    "id": "...", 
    "rating": 1500,
    "plays": 12000,
    "solution": ["e2e4", "e7e5"],
    "themes": ["middlegame", "pin"]
  }
}
```

### 2. Live TV Games

```typescript
// Get current TV game
export async function getTVChannels() {
  const res = await fetch('https://lichess.org/api/tv/channels', {
    next: { revalidate: 10 } // Update every 10 seconds
  });
  return res.json();
}
```

### 3. User Profile

```typescript
// Get player stats
export async function getLichessUser(username: string) {
  const res = await fetch(`https://lichess.org/api/user/${username}`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

// Response:
{
  "id": "username",
  "perfs": {
    "blitz": { "rating": 2000, "games": 500 },
    "rapid": { "rating": 1950, "games": 300 }
  },
  "profile": { "country": "US", "bio": "..." }
}
```

### 4. Opening Explorer

```typescript
// Get opening statistics
export async function getOpeningStats(fen: string) {
  const res = await fetch(
    `https://explorer.lichess.ovh/masters?fen=${encodeURIComponent(fen)}`,
    { next: { revalidate: 86400 } } // Cache for 24 hours
  );
  return res.json();
}
```

---

## Quick Implementation Plan

### Immediate (Add to Homepage Today):

**Daily Puzzle Section:**
```tsx
// Add to src/app/page.tsx
const puzzle = await fetch('https://lichess.org/api/puzzle/daily')
  .then(r => r.json());

<section className="mb-16">
  <h2>Daily Chess Puzzle</h2>
  <iframe 
    src={`https://lichess.org/training/${puzzle.puzzle.id}/embed`}
    width="100%" 
    height="500px"
  />
</section>
```

**Live Games Widget:**
```tsx
<section className="mb-16">
  <h2>Watch Masters Play Live</h2>
  <iframe 
    src="https://lichess.org/tv/frame?theme=brown&bg=dark"
    width="100%" 
    height="500px"
  />
</section>
```

### This Week:

1. **Puzzle Trainer Page** (`/puzzles`)
   - Daily puzzle
   - Puzzle rush integration
   - Personal puzzle stats

2. **Opening Explorer** (`/tools/openings`)
   - Interactive board
   - Master game statistics
   - Popular variations

3. **Coach Profiles with Lichess Stats**
   - Show real Lichess ratings
   - Link to Lichess profiles
   - Recent games

### Next Week:

4. **Community Tournaments Page**
   - Upcoming Lichess tournaments
   - Academy tournament listings
   - Registration links

5. **Game Analysis Tool**
   - Paste PGN
   - Get Stockfish analysis via Lichess
   - Save to profile

---

## API Rate Limits

- **No Authentication Required** for most endpoints
- **Rate Limit**: ~60 requests/minute (generous)
- **Caching**: Use Next.js `revalidate` to respect their servers
- **Free Forever**: Lichess is funded by donations, 100% free

---

## Best Practices

1. **Cache Everything**: Use Next.js `revalidate` to minimize requests
2. **Attribute Lichess**: Add "Powered by Lichess" with their logo
3. **Respect Rate Limits**: Don't hammer the API
4. **Progressive Enhancement**: Make features optional (fail gracefully)
5. **Consider Donations**: If heavily used, donate to Lichess

---

## Legal & Attribution

- ✅ **100% Free to Use** - No API keys needed
- ✅ **Open Source** - AGPLv3 license
- ✅ **No Commercial Restrictions** - Can use in paid features
- ⚠️ **Attribution Required** - Show "Powered by Lichess"
- 📝 **License**: https://github.com/lichess-org/lila

---

## Resources

- **API Docs**: https://lichess.org/api
- **GitHub**: https://github.com/lichess-org/lila
- **Forum**: https://lichess.org/forum/lichess-feedback
- **API Status**: https://status.lichess.org/
