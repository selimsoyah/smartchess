# Smart Chess Academy - Setup Guide

## 🚀 Quick Start

### 1. Environment Variables

Create `.env.local` in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project dashboard: Settings → API

### 2. Install Dependencies

```bash
npm install
```

### 3. Populate Database

#### Step 3.1: Verify Database Schema
Go to Supabase SQL Editor and verify all tables exist:
- profiles
- newsletter_subscribers
- articles
- forum_posts
- news_facts

(Schema should already be created from Phase 0)

#### Step 3.2: Seed Articles & News
In Supabase SQL Editor, run:
```bash
scripts/seed-complete.sql
```
This will add:
- ✅ 5 interactive articles (Italian Game, Endgame Essentials, Tactical Motifs, etc.)
- ✅ 6 news items (course launches, tournaments, events)

#### Step 3.3: Create First User
1. Run the dev server: `npm run dev`
2. Navigate to `http://localhost:3000/auth/signup`
3. Create an account with email/password
4. Note: Check Supabase → Authentication → Users to get your User ID

#### Step 3.4: Seed Forum Posts
1. Get your User ID from Supabase dashboard (Authentication → Users → copy UUID)
2. In Supabase SQL Editor, find the forum_posts INSERT section in `seed-complete.sql`
3. Replace `'YOUR_USER_ID_HERE'` with your actual user ID (6 occurrences)
4. Run the forum_posts INSERT statements

Example:
```sql
-- Change this:
INSERT INTO forum_posts (author_id, title, ...)
VALUES ('YOUR_USER_ID_HERE', 'Best Opening for Beginners?', ...)

-- To this (with your actual ID):
INSERT INTO forum_posts (author_id, title, ...)
VALUES ('a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8', 'Best Opening for Beginners?', ...)
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ Verify Everything Works

### Homepage Checklist:
- [ ] Hero section displays
- [ ] 3 academy highlights visible
- [ ] 3 latest articles shown with descriptions
- [ ] 4 forum discussions displayed with avatars
- [ ] 3 news items with dates
- [ ] All "View All" CTAs work

### Feature Pages:
- [ ] `/articles` - Shows all 5 articles
- [ ] `/articles/[id]` - Interactive chessboards work
- [ ] `/forum` - Shows all forum posts
- [ ] `/forum/new` - Can create new posts (protected)
- [ ] `/news` - Shows all news items
- [ ] `/profile` - Shows user profile with avatar upload
- [ ] `/auth/signup` & `/auth/signin` - Authentication flows work

### Test Interactive Features:
1. **Articles**: Click any article → verify chessboard PGN renders and moves work
2. **Forum**: Create a new post → verify it appears in listings
3. **Profile**: Upload avatar → verify it shows in forum posts
4. **News**: Click news item → verify full content displays

## 🎨 Color Scheme

The site uses a bronze/gold theme:
- Primary Gold: `#c49e4e`
- Dark Background: `#272f2c`
- Accent Gray: `#bac1bf`

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS
- **Chess**: chess.js + react-chessboard v5.8.6
- **Icons**: Lucide React

## 🗂️ Database Schema

```
profiles
├── id (uuid, references auth.users)
├── email (text)
├── display_name (text)
├── avatar_url (text)
└── created_at (timestamp)

articles
├── id (uuid)
├── title (text)
├── author (text)
├── description (text)
├── content (jsonb) - Array of blocks: text, heading, image, chessboard, lichess
├── published_at (timestamp)
└── created_at (timestamp)

forum_posts
├── id (uuid)
├── author_id (uuid, references profiles)
├── title (text)
├── content (text)
├── created_at (timestamp)
└── updated_at (timestamp)

news_facts
├── id (uuid)
├── title (text)
├── content (text)
├── published_at (timestamp)
└── created_at (timestamp)

newsletter_subscribers
├── id (uuid)
├── email (text)
└── created_at (timestamp)
```

## 🔒 Security Notes

All tables have Row Level Security (RLS) enabled:
- **Articles**: Public read, no writes
- **Forum Posts**: Public read, authenticated write (author only can update/delete)
- **News**: Public read, no writes
- **Profiles**: Public read, owner can update

## 🚧 Optional Post-MVP Features

(Documented in `docs/PROGRESS.md`)
- Forum comments/replies
- Admin dashboard for content management
- Payment integration for premium plans
- Chess puzzles trainer
- User achievements and progress tracking

## 📞 Support

Check `docs/PROGRESS.md` for detailed development history and feature documentation.
