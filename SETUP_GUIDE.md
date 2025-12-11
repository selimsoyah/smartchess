# 🎯 Smart Chess Academy - Setup Guide

## ✅ What's Been Built

### Phase 0 & 1: Complete ✅
- Next.js 15 with TypeScript, Tailwind CSS, App Router
- Supabase integration (client, server, middleware)
- Custom color scheme applied throughout
- Responsive navigation with authentication state
- Homepage with hero, highlights, latest articles
- About Us page with instructor profiles
- Programs & Pricing page (3 tiers)
- Contact page with form
- Newsletter subscription
- Footer with social links

### Phase 2: Complete ✅
- **Authentication System**
  - Sign up page (`/auth/signup`)
  - Sign in page (`/auth/signin`)
  - Sign out functionality
  - Protected routes
  - Session management via middleware

- **User Profiles**
  - Profile page (`/profile`)
  - Avatar upload to Supabase Storage
  - Username management
  - User menu in navbar

### Placeholder Pages: Complete ✅
- Articles listing page (`/articles`)
- Forum page (`/forum`)
- News page (`/news`)

## 🎨 Color Scheme

Your sophisticated bronze/gold chess academy theme:
- **Primary (Tussock):** `#c49e4e` - Gold/bronze accent
- **Primary Dark (Cape Palliser):** `#9e7642` - Darker gold
- **Secondary (Outer Space):** `#272f2c` - Dark charcoal
- **Accent (Shingle Fawn):** `#745832` - Brown
- **Dark Bronze:** `#44321b` - Deep bronze
- **Text Light (Finlandia):** `#5a605a` - Medium gray
- **Powder Ash:** `#bac1bf` - Light gray

## 🚀 Getting Started

### 1. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to initialize
3. Copy your credentials from **Project Settings > API**:
   - Project URL
   - Anon/Public Key

### 2. Update Environment Variables

Edit `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
```

### 3. Run Database Schema

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Copy all contents from `supabase-schema.sql`
4. Paste and click **Run**

This creates:
- `profiles` table
- `newsletter_subscribers` table
- `forum_posts` table  
- `articles` table
- `news_facts` table
- Row Level Security policies
- Triggers for auto-updating timestamps
- Auto-create profile on signup

### 4. Create Storage Buckets

In Supabase Dashboard > **Storage**:

1. Create bucket named `avatars`:
   - Make it **public**
   - Allow image uploads (MIME types: `image/*`)

2. Create bucket named `article-images`:
   - Make it **public**
   - Allow image uploads

### 5. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🧪 Testing the Application

### Test Authentication

1. Go to `/auth/signup`
2. Create an account (email + password)
3. If email confirmation is required, check your email
4. Sign in at `/auth/signin`
5. Visit `/profile` to update your profile and upload an avatar

### Test Newsletter

1. Scroll to footer on any page
2. Enter email and submit
3. Check Supabase Dashboard > **Table Editor** > `newsletter_subscribers`

### Test Contact Form

1. Go to `/contact`
2. Fill out the form
3. Check terminal/console for the logged message

## 📂 Project Structure

```
src/
├── app/
│   ├── about/              # About page
│   ├── api/
│   │   ├── contact/        # Contact form API
│   │   └── newsletter/     # Newsletter API
│   ├── articles/           # Articles listing
│   ├── auth/
│   │   ├── signin/         # Sign in page
│   │   ├── signup/         # Sign up page
│   │   └── actions.ts      # Auth server actions
│   ├── contact/            # Contact page
│   ├── forum/              # Forum (placeholder)
│   ├── news/               # News listing
│   ├── plans/              # Pricing page
│   ├── profile/            # User profile page
│   │   ├── page.tsx        # Server component
│   │   └── ProfileClient.tsx
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles with color vars
├── components/
│   ├── Footer.tsx          # Footer with newsletter
│   ├── NavbarServer.tsx    # Server navbar (auth check)
│   └── NavbarClient.tsx    # Client navbar (UI)
└── lib/
    ├── supabase/
    │   ├── client.ts       # Browser Supabase client
    │   ├── server.ts       # Server Supabase client
    │   └── middleware.ts   # Session refresh
    ├── types/
    │   └── database.types.ts # TypeScript types
    └── utils.ts            # Utility functions
```

## 🎯 Next Development Steps

### Option 1: Forum System (Phase 3)
Build the community forum:
- Forum posts listing with pagination
- Create new post page (rich text editor)
- Individual post view page
- Delete/edit own posts
- Later: Add comments system

### Option 2: Interactive Articles (Phase 3 - MVP)
The unique selling point:
- Dynamic article renderer from JSON
- PGN Chessboard component (chess.js + react-chessboard)
- Lichess Study iframe embed component
- Article creation admin interface
- Image uploads for articles

### Option 3: News & Updates System
Quick wins:
- Admin-only news creation page
- Display news on homepage sidebar widget
- Full news listing page (already scaffolded)

## 📊 Database Quick Reference

### Adding Sample Data

**Sample Article:**
```sql
INSERT INTO articles (slug, title, author, description, content_json, published_at)
VALUES (
  'kings-gambit-guide',
  'The King''s Gambit: A Complete Guide',
  'IM Sarah Johnson',
  'Learn the aggressive King''s Gambit opening with detailed analysis and practical examples',
  '[
    {"type": "paragraph", "text": "The King''s Gambit is one of the oldest and most aggressive openings..."},
    {"type": "chessboard", "pgn": "1. e4 e5 2. f4", "caption": "The starting position"},
    {"type": "paragraph", "text": "After 1.e4 e5 2.f4, White offers a pawn..."}
  ]'::jsonb,
  NOW()
);
```

**Sample News:**
```sql
INSERT INTO news_facts (date, title, content)
VALUES (
  CURRENT_DATE,
  'Academy Student Wins Regional Tournament',
  'Congratulations to our student Alex Chen for winning the Regional Chess Championship! Alex scored 7/9 points and earned a USCF rating increase of 150 points.'
);
```

## 🔐 Security Notes

- RLS (Row Level Security) is enabled on all tables
- Users can only edit their own profiles and posts
- Newsletter and articles require service role for writes
- File uploads are restricted to authenticated users
- Session tokens are httpOnly cookies (secure)

## 🎨 Customization Tips

All colors are defined in `src/app/globals.css` as CSS variables:
```css
--tussock: #c49e4e;
--outer-space: #272f2c;
/* etc. */
```

To change the theme, update these variables and the Tailwind classes throughout the components.

## 🐛 Common Issues

**"Invalid API credentials"**
- Check `.env.local` has correct Supabase URL and key
- Restart dev server after changing env vars

**"Relation 'profiles' does not exist"**
- Run the SQL schema from `supabase-schema.sql`

**"Storage bucket not found"**
- Create `avatars` and `article-images` buckets in Supabase Storage
- Set them to public

**Avatar upload fails**
- Check bucket is public
- Verify RLS policies allow authenticated uploads
- Check file size (max 2MB recommended)

## 📞 Support

Built with:
- Next.js 15
- Supabase
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- chess.js & react-chessboard (ready to use)

Ready to continue development? Let me know which feature to build next!
