# Lichess Integration - Phase 2 Development Plan

## 🎯 Goal
Implement 3 core Lichess features with optional user account linking for enhanced functionality.

## 📋 Selected Features

### 1. **Watch Live Games Page** (`/watch`)
- Multiple TV channels (Best, Bullet, Blitz, Rapid, Classical)
- Channel switcher
- Current game information
- Player ratings and titles

### 2. **Tournament Calendar** (`/tournaments`)
- Upcoming Lichess tournaments
- Arena and Swiss tournaments
- Tournament details (time control, duration, prizes)
- Direct links to register on Lichess

### 3. **Articles with Lichess Studies**
- Embed Lichess studies in articles
- Coach-created study materials
- Interactive study viewer
- Chapter navigation

### 4. **Optional: Lichess Account Linking**
- Add "lichess_username" field to profiles
- Profile settings page to link account
- Display user's Lichess stats on profile
- Show coach Lichess ratings on About page

---

## 🗄️ Database Changes

### Migration 1: Add Lichess Username to Profiles

```sql
-- Add lichess_username column to profiles table
ALTER TABLE profiles 
ADD COLUMN lichess_username TEXT;

-- Add index for faster lookups
CREATE INDEX idx_profiles_lichess_username ON profiles(lichess_username);
```

---

## 📁 File Structure

```
src/
├── app/
│   ├── watch/
│   │   └── page.tsx                    # Live games page
│   ├── tournaments/
│   │   ├── page.tsx                    # Tournament listing
│   │   └── [id]/
│   │       └── page.tsx                # Tournament detail (optional)
│   ├── profile/
│   │   └── settings/
│   │       └── page.tsx                # Profile settings with Lichess link
│   └── about/
│       └── page.tsx                    # Update with coach Lichess cards
├── components/
│   └── lichess/
│       ├── TVChannelSelector.tsx       # TV channel switcher
│       ├── TournamentCard.tsx          # Tournament display card
│       ├── LichessStudyEmbed.tsx       # Study embed component
│       └── LichessProfileCard.tsx      # User/coach profile card
└── lib/
    └── lichess.ts                      # Add new API functions
```

---

## 🔧 Implementation Steps

### Step 1: Database Migration (5 min)
- [x] Create migration SQL
- [ ] Run migration in Supabase
- [ ] Update profiles type definitions

### Step 2: Lichess API Extensions (15 min)
- [ ] Add `getLichessStudy()` function
- [ ] Add `getTournaments()` function
- [ ] Add `getTournamentDetails()` function
- [ ] Update TypeScript interfaces

### Step 3: Watch Live Games Page (30 min)
- [ ] Create `/watch` page
- [ ] Build TV channel selector component
- [ ] Add channel info display
- [ ] Implement responsive grid layout

### Step 4: Tournament Calendar (30 min)
- [ ] Create `/tournaments` page
- [ ] Fetch upcoming tournaments
- [ ] Build tournament card component
- [ ] Add filters (time control, status)

### Step 5: Lichess Studies in Articles (20 min)
- [ ] Create LichessStudyEmbed component
- [ ] Update ArticleRenderer to support study blocks
- [ ] Add study type to content_json schema
- [ ] Test with sample article

### Step 6: Profile Lichess Linking (25 min)
- [ ] Create profile settings page
- [ ] Add Lichess username input form
- [ ] Update profile mutation
- [ ] Display Lichess stats on profile

### Step 7: Coach Lichess Cards (15 min)
- [ ] Create LichessProfileCard component
- [ ] Update About page with coach data
- [ ] Fetch and display Lichess ratings
- [ ] Add "Challenge on Lichess" links

### Step 8: Navigation & Polish (10 min)
- [ ] Add "Watch" to navbar
- [ ] Add "Tournaments" to navbar
- [ ] Test all pages
- [ ] Error handling and loading states

---

## 📊 API Endpoints to Use

### Already Implemented:
✅ `GET /api/puzzle/daily` - Daily puzzle
✅ `GET /api/tv/channels` - TV channels

### New Endpoints:
🆕 `GET /api/tournament` - Upcoming tournaments
🆕 `GET /api/study/{studyId}` - Study metadata
🆕 `GET /api/user/{username}` - User profile (already in lib, need to use)

---

## 💾 Database Schema Updates

### profiles table (updated):
```typescript
interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  lichess_username: string | null;  // NEW
  created_at: string;
  updated_at: string;
}
```

### articles table (content_json extended):
```typescript
// New block type for content_json
{
  type: "lichess_study",
  studyId: "abc123",
  chapterId?: "def456",  // Optional specific chapter
  caption?: "Study description"
}
```

---

## 🎨 Component Designs

### 1. TV Channel Selector
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
  <button>Best</button>
  <button>Bullet</button>
  <button>Blitz</button>
  <button>Rapid</button>
  <button>Classical</button>
</div>
<iframe src={selectedChannel} />
```

### 2. Tournament Card
```tsx
<div className="tournament-card">
  <h3>{tournament.name}</h3>
  <p>Starts: {tournament.startsAt}</p>
  <p>Time Control: {tournament.clock}</p>
  <p>Players: {tournament.nbPlayers}</p>
  <a href={`https://lichess.org/tournament/${id}`}>Join</a>
</div>
```

### 3. Lichess Profile Card (Coach)
```tsx
<div className="coach-card">
  <img src={avatar} />
  <h3>{name}</h3>
  <p>Lichess: @{lichessUsername}</p>
  <div>
    <span>Blitz: {blitzRating}</span>
    <span>Rapid: {rapidRating}</span>
  </div>
  <a href={`https://lichess.org/@/${username}`}>View Profile</a>
</div>
```

---

## 🧪 Testing Checklist

### Watch Page:
- [ ] All 5 channels load correctly
- [ ] Channel switching works
- [ ] Responsive on mobile
- [ ] Error handling if API fails

### Tournaments:
- [ ] Tournaments load and display
- [ ] Links to Lichess work
- [ ] Time zones display correctly
- [ ] Filters work (if implemented)

### Studies in Articles:
- [ ] Study embeds render correctly
- [ ] Chapter navigation works
- [ ] Responsive design
- [ ] Fallback if study is private

### Profile Linking:
- [ ] Username can be saved
- [ ] Stats fetch and display
- [ ] Validation for valid usernames
- [ ] Error messages for invalid users

---

## 📈 Success Metrics

1. **Watch Page**: Users can watch live games seamlessly
2. **Tournaments**: Users can find and join tournaments easily
3. **Studies**: Coaches can embed educational content
4. **Linking**: Users connect their Lichess accounts

---

## ⏱️ Time Estimate

- Database Migration: 5 min
- API Extensions: 15 min
- Watch Page: 30 min
- Tournaments: 30 min
- Studies: 20 min
- Profile Linking: 25 min
- Coach Cards: 15 min
- Navigation: 10 min

**Total: ~2.5 hours**

---

## 🚀 Deployment Order

1. ✅ Run database migration
2. ✅ Deploy API extensions
3. ✅ Deploy Watch page
4. ✅ Deploy Tournaments page
5. ✅ Update article system with studies
6. ✅ Deploy profile settings
7. ✅ Update About page
8. ✅ Update navigation

---

## 🎁 Bonus Features (If Time Permits)

- [ ] Tournament filters by time control
- [ ] "Recommended for you" tournaments based on rating
- [ ] Save favorite tournaments
- [ ] Email notifications for tournament start times
- [ ] Study favorites/bookmarks
- [ ] Recent games widget on profile

---

*Ready to implement! Starting with Step 1...*
