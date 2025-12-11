# Smart Chess Academy Website

A modern, feature-rich website for a professional Chess Academy built with Next.js, Supabase, and Lichess integration.

## Tech Stack

- **Frontend/Backend:** Next.js 15 (App Router)
- **Database & Auth:** Supabase (PostgreSQL, Authentication, Storage)
- **Styling:** Tailwind CSS
- **Chess Integration:** chess.js, react-chessboard, Lichess API
- **UI Components:** Lucide React icons

## Features

### Core Features
- ✅ Responsive navigation with mobile menu
- ✅ Homepage with hero section and latest articles
- ✅ Programs & Pricing page with 3-tier plans
- ✅ About Us page with instructor profiles
- ✅ Contact form with email notifications
- ✅ Newsletter subscription system
- ✅ User authentication (Sign up/Sign in/Password reset)
- ✅ User profiles with avatar uploads
- ✅ Community forum with posts, replies, and likes
- ✅ Interactive chess articles with PGN boards
- ✅ News & updates system with facts feed

### Lichess Integration
- ✅ **Daily Puzzles** - Homepage widget + dedicated puzzles page
- ✅ **Live Games** - Watch top players across 10 TV channels
- ✅ **Tournaments** - Browse and join Lichess tournaments
- ✅ **Studies** - Embed interactive Lichess studies in articles
- ✅ **Profile Stats** - Link Lichess account to display ratings and progress
- ✅ **8 API Functions** - Comprehensive Lichess data integration

### Pages
1. **/** - Homepage with hero, features, coaches, testimonials, Lichess widgets
2. **/about** - Mission statement and coach profiles
3. **/articles** - Chess content library with study embeds
4. **/forum** - Community discussion board
5. **/news** - Chess news and daily facts
6. **/contact** - Contact form
7. **/programs** - Pricing and program details
8. **/puzzles** - Daily puzzle training
9. **/watch** - Live game streaming (10 TV channels)
10. **/tournaments** - Tournament calendar
11. **/profile** - User settings and Lichess integration
12. **/auth/signin** - Authentication
13. **/auth/signup** - Registration
14. **/auth/reset-password** - Password recovery

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Wait for the database to be set up
   - Go to Project Settings > API to get your credentials

3. **Configure environment variables**
   
   Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database schema**
   
   - Open the Supabase Dashboard
   - Go to SQL Editor
   - Copy the contents of `supabase-schema.sql`
   - Paste and run the SQL in the editor
   - Run the Lichess migration: `scripts/add-lichess-username.sql`

5. **Create Storage Buckets**
   
   In Supabase Dashboard > Storage:
   - Create a public bucket named `avatars`
   - Create a public bucket named `article-images`

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

## Database Schema

### Tables

- **profiles** - User metadata (username, avatar_url, lichess_username)
- **newsletter_subscribers** - Email signups
- **articles** - Chess articles with rich content (supports Lichess study embeds)
- **forum_posts** - Community forum posts and replies
- **news_facts** - Chess news and daily facts

## Lichess Integration

### Features
- **Daily Puzzles**: Automatically fetched from Lichess, displayed on homepage and `/puzzles`
- **Live Games**: 10 TV channels (Top Rated, Bullet, Blitz, Rapid, Classical, and 5 variants)
- **Tournaments**: Browse In Progress and Upcoming tournaments with direct join links
- **Studies**: Embed interactive Lichess studies in articles for chess lessons
- **Profile Stats**: Students link Lichess accounts to display ratings and progress

### Usage
- No authentication required for Lichess API
- Generous rate limits with built-in caching
- All data fetched server-side for performance
- Responsive design for mobile chess learning

### Documentation
- `SAMPLE_ARTICLE_WITH_STUDY.md` - Guide for creating articles with Lichess studies
- `TESTING_CHECKLIST.md` - Comprehensive testing guide for all features
- `DEVELOPMENT_SUMMARY.md` - Complete feature overview and implementation details

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
smartchess/
├── src/
│   ├── app/              # Next.js pages (App Router)
│   │   ├── (auth)/       # Authentication pages
│   │   ├── articles/     # Article system
│   │   ├── forum/        # Forum pages
│   │   ├── news/         # News & facts
│   │   ├── profile/      # User profile
│   │   ├── puzzles/      # Lichess puzzles
│   │   ├── watch/        # Live games
│   │   └── tournaments/  # Tournament calendar
│   ├── components/       # React components
│   │   ├── lichess/      # Lichess integration components
│   │   ├── article/      # Article rendering
│   │   └── forum/        # Forum components
│   └── lib/
│       ├── supabase/     # Supabase client
│       ├── types/        # TypeScript definitions
│       └── lichess.ts    # Lichess API utilities
├── scripts/              # Database migrations
├── public/              # Static assets
└── docs/                # Additional documentation
```

## License

Proprietary - All rights reserved
