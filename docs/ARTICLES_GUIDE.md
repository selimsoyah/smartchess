# Interactive Articles Setup

This guide explains how to create and manage interactive chess articles in Smart Chess Academy.

## Features

Your article system includes:

1. **PGN Chessboard Viewer** - Display chess games with move-by-move navigation
2. **Lichess Game Embeds** - Embed live games from Lichess
3. **Rich Content Blocks** - Paragraphs, headings, images, and interactive elements
4. **Author Attribution** - Automatic author info from user profiles
5. **Dynamic Routing** - SEO-friendly URLs with `/articles/[slug]`

## Article JSON Structure

Articles are stored in the `articles` table with a `content_json` field that contains structured content blocks:

```json
{
  "blocks": [
    {
      "type": "paragraph",
      "content": "Your paragraph text here..."
    },
    {
      "type": "heading",
      "level": 2,
      "content": "Section Heading"
    },
    {
      "type": "image",
      "url": "https://example.com/image.jpg",
      "alt": "Image description",
      "caption": "Optional caption text"
    },
    {
      "type": "chessboard",
      "pgn": "1. e4 e5 2. Nf3 Nc6 3. Bc4...",
      "caption": "Game analysis or position description"
    },
    {
      "type": "embed",
      "url": "https://lichess.org/embed/game/ABC123",
      "caption": "Embedded game description"
    }
  ]
}
```

## Block Types

### 1. Paragraph
```json
{
  "type": "paragraph",
  "content": "Regular text content with proper spacing and typography."
}
```

### 2. Heading
```json
{
  "type": "heading",
  "level": 2,
  "content": "Your Heading Text"
}
```
Supports levels 1-6 (h1-h6).

### 3. Image
```json
{
  "type": "image",
  "url": "https://example.com/chess-position.jpg",
  "alt": "Descriptive alt text for accessibility",
  "caption": "Optional caption displayed below image"
}
```

### 4. Interactive Chessboard
```json
{
  "type": "chessboard",
  "pgn": "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6",
  "caption": "Analysis of the Italian Game opening"
}
```

The chessboard component provides:
- Move-by-move navigation (previous/next)
- Reset to starting position
- Jump to end of game
- Clickable move list
- Custom bronze/gold styling matching your theme

### 5. Lichess Embed
```json
{
  "type": "embed",
  "url": "https://lichess.org/embed/game/MPJcy1JW?theme=brown&bg=dark",
  "caption": "GM Game: Caruana vs Nakamura"
}
```

You can embed:
- Lichess games: `https://lichess.org/embed/game/[GAME_ID]`
- Lichess studies: `https://lichess.org/study/[STUDY_ID]`
- Lichess puzzles: `https://lichess.org/training/[PUZZLE_ID]`

## Creating Articles

### Option 1: Using Seed Script

1. Update your Supabase credentials in `.env.local`
2. Get your user ID from the profiles table
3. Edit `scripts/seed-articles.sql` and replace `(SELECT id FROM profiles LIMIT 1)` with your actual user ID
4. Run the script in your Supabase SQL editor

### Option 2: Direct Database Insert

```sql
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content_json,
  featured_image,
  author_id,
  published
) VALUES (
  'Your Article Title',
  'your-article-slug',
  'Brief excerpt shown in article listings',
  '{"blocks": [...]}',
  'https://example.com/featured.jpg',
  'YOUR_USER_ID_HERE',
  true
);
```

### Option 3: Admin Interface (Future)

You can build an admin panel with:
- Rich text editor for content
- Visual block composer
- PGN validator
- Image uploader to Supabase Storage
- Slug generator
- Draft/publish workflow

## PGN Format

The chessboard component accepts standard PGN (Portable Game Notation):

```
1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3
```

You can:
- Include move numbers or omit them
- Add variations (multiple lines not supported yet)
- Use standard algebraic notation (SAN)

## Styling

The article components use your custom color scheme:

- **Primary Accent**: `#c49e4e` (Tussock bronze/gold)
- **Dark Background**: `#272f2c` (Outer Space)
- **Light Background**: `#faf9f7` (Off-white)
- **Text Colors**: `#272f2c` (dark), `#5a605a` (medium gray)
- **Chess Squares**: 
  - Dark: `#745832` (Shingle Fawn)
  - Light: `#f0e6d2` (Board beige)

## URL Structure

- Article listing: `/articles`
- Individual article: `/articles/[slug]`

Slugs must be:
- Lowercase
- Hyphen-separated
- URL-safe (no special characters)
- Unique across all articles

## SEO & Metadata

Each article automatically generates:
- Dynamic meta title: `{Article Title} | Smart Chess Academy`
- Meta description from excerpt
- Open Graph tags for social sharing
- Semantic HTML structure

## Next Steps

1. **Set up Supabase** - Add your credentials to `.env.local`
2. **Create your profile** - Sign up through the app to create a user profile
3. **Add articles** - Use the seed script or manual SQL inserts
4. **Test the viewer** - Visit `/articles` to see your content
5. **Optional**: Build an admin interface for easier content management

## Troubleshooting

**Chessboard not loading**: Check that your PGN syntax is valid
**Images not showing**: Verify image URLs are accessible
**Author not displayed**: Ensure `author_id` matches a valid profile
**Article not visible**: Check `published` is set to `true`

## Future Enhancements

Consider adding:
- Comments section
- Article likes/favorites
- Search and filtering
- Related articles
- Tags/categories
- Social sharing buttons
- RSS feed
- Admin content management UI
