# Lichess Features - Quick Reference

## 🎯 What You Can Exploit from Lichess (Free Forever!)

### ✅ Already Implemented:

1. **Daily Puzzle** - Homepage & `/puzzles`
2. **Live TV Games** - Homepage widget
3. **Puzzle Training Links** - Themed, Storm, Streak modes

### 🔥 Easy Wins (Copy & Paste Ready):

#### 1. Add Opening Explorer to Any Page:
```tsx
<iframe 
  src={`https://explorer.lichess.ovh/masters?fen=${fen}`}
  width="100%" 
  height="600px"
/>
```

#### 2. Embed Any Lichess Game:
```tsx
<iframe 
  src={`https://lichess.org/embed/game/${gameId}?theme=brown&bg=dark`}
  width="100%" 
  height="500px"
/>
```

#### 3. Embed Lichess Study:
```tsx
<iframe 
  src={`https://lichess.org/study/embed/${studyId}/${chapterId}`}
  width="100%" 
  height="600px"
/>
```

#### 4. Show User Rating:
```tsx
const user = await fetch(`https://lichess.org/api/user/${username}`).then(r => r.json());
// user.perfs.blitz.rating
// user.perfs.rapid.rating
```

#### 5. Tournament Widget:
```tsx
<iframe 
  src="https://lichess.org/tournament/calendar"
  width="100%" 
  height="800px"
/>
```

---

## 📊 Lichess Data You Can Access:

### User Data:
- ✅ Username & profile
- ✅ Rating (all time controls)
- ✅ Games played
- ✅ Recent games (with PGN)
- ✅ Rating history
- ✅ Country & bio

### Game Data:
- ✅ 2+ billion games database
- ✅ Master games (2M+)
- ✅ Opening statistics
- ✅ Computer analysis
- ✅ Live games (TV channels)

### Training:
- ✅ Daily puzzle
- ✅ 500,000+ rated puzzles
- ✅ Puzzle themes (50+ categories)
- ✅ Puzzle Storm (speed training)
- ✅ Puzzle Streak (accuracy training)

### Tools:
- ✅ Opening Explorer (master & lichess databases)
- ✅ Endgame Tablebase (7-piece)
- ✅ Analysis board (Stockfish)
- ✅ Study import/export

---

## 🎨 Embedding Best Practices:

### Theme Parameters:
```
?theme=brown    // Matches your bronze theme
&bg=dark        // Dark background
```

### Other Themes:
- `blue`, `blue2`, `blue3`
- `wood`, `wood2`, `wood3`
- `canvas`
- `metal`
- `olive`
- `purple`

### Embed Options:
```
?theme=brown
&bg=dark
&controls=0     // Hide controls
&embed=1        // Embed mode
```

---

## 💻 Code Examples:

### Fetch Coach Ratings:
```typescript
// In About page
const coaches = [
  { name: 'Coach Alex', lichessUsername: 'coachAlex' },
  { name: 'Coach Sarah', lichessUsername: 'sarahIM' }
];

for (const coach of coaches) {
  const user = await fetch(
    `https://lichess.org/api/user/${coach.lichessUsername}`
  ).then(r => r.json());
  
  console.log(`${coach.name}: ${user.perfs.classical.rating}`);
}
```

### Opening Explorer Component:
```typescript
'use client';
import { useState } from 'react';

export default function OpeningExplorer() {
  const [fen, setFen] = useState('start');
  
  return (
    <div>
      <input 
        value={fen} 
        onChange={(e) => setFen(e.target.value)}
        placeholder="Enter FEN"
      />
      <iframe
        src={`https://explorer.lichess.ovh/masters?fen=${fen}`}
        width="100%"
        height="600px"
      />
    </div>
  );
}
```

### Show Live Tournament:
```typescript
// Fetch current tournaments
const tournaments = await fetch(
  'https://lichess.org/api/tournament'
).then(r => r.json());

tournaments.started.map(t => ({
  name: t.fullName,
  players: t.nbPlayers,
  link: `https://lichess.org/tournament/${t.id}`
}));
```

---

## 🚀 Quick Implementation Guide:

### 1. Homepage (Already Done ✅)
- Daily puzzle
- Live TV games

### 2. About Page (5 minutes)
```tsx
// Add to src/app/about/page.tsx
import { getLichessUser } from '@/lib/lichess';

const coach = await getLichessUser('coachUsername');
<p>Rated {coach.perfs.classical.rating} in Classical</p>
```

### 3. New Tools Page (10 minutes)
```tsx
// src/app/tools/page.tsx
<div className="grid grid-cols-2 gap-8">
  <iframe src="https://lichess.org/training/themes" />
  <iframe src="https://lichess.org/analysis" />
</div>
```

### 4. Watch Page (15 minutes)
```tsx
// src/app/watch/page.tsx
const channels = ['best', 'bullet', 'blitz', 'rapid', 'classical'];

channels.map(channel => (
  <iframe src={`https://lichess.org/tv/${channel}/frame`} />
))
```

---

## 📱 Mobile Optimization:

```tsx
<div className="aspect-video w-full">
  <iframe
    src={lichessUrl}
    className="w-full h-full"
    allowFullScreen
  />
</div>
```

---

## ⚡ Performance Tips:

1. **Cache API Responses**:
```tsx
fetch(url, {
  next: { revalidate: 3600 } // 1 hour
})
```

2. **Use Suspense**:
```tsx
<Suspense fallback={<Skeleton />}>
  <LichessWidget />
</Suspense>
```

3. **Lazy Load Iframes**:
```tsx
<iframe loading="lazy" ... />
```

---

## 🎁 Free Lichess Features Summary:

| Feature | API Endpoint | Cache Time |
|---------|-------------|------------|
| Daily Puzzle | `/api/puzzle/daily` | 1 hour |
| TV Channels | `/api/tv/channels` | 30 sec |
| User Profile | `/api/user/{username}` | 1 hour |
| User Games | `/api/games/user/{username}` | 10 min |
| Opening Stats | `explorer.lichess.ovh/masters` | 24 hours |
| Tournaments | `/api/tournament` | 5 min |

---

## 🔗 Resources:

- **Full API Docs**: `/docs/LICHESS_INTEGRATION.md`
- **Implementation Details**: `/docs/LICHESS_IMPLEMENTATION.md`
- **API Reference**: https://lichess.org/api
- **Lichess Source**: https://github.com/lichess-org/lila

---

*Everything is 100% free forever. No API keys. No limits. Just chess!* ♟️
