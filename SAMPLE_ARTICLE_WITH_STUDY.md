# Sample Article with Lichess Study

This document shows how to create an article that includes a Lichess study embed.

## Instructions for Creating Articles with Lichess Studies

### Step 1: Get Study ID from Lichess

1. Go to lichess.org/study
2. Open any public study
3. Copy the study ID from the URL (e.g., `https://lichess.org/study/XtFCFYlM` → ID is `XtFCFYlM`)

### Step 2: Create Article in Supabase

Run this SQL in your Supabase SQL Editor:

```sql
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  author_id,
  published_at,
  published
) 
SELECT
  'Mastering the King''s Indian Defense',
  'mastering-kings-indian-defense',
  'Learn the key ideas and typical plans in the King''s Indian Defense with annotated games and strategic explanations.',
  '[
    {
      "type": "heading",
      "level": 2,
      "text": "Introduction"
    },
    {
      "type": "paragraph",
      "text": "The King''s Indian Defense is one of the most dynamic and aggressive responses to 1.d4. In this comprehensive study, we will explore the key strategic ideas, typical pawn structures, and attacking plans for both sides."
    },
    {
      "type": "heading",
      "level": 2,
      "text": "Main Line Structure"
    },
    {
      "type": "paragraph",
      "text": "The typical pawn structure arises after the moves 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O. Black allows White to build a strong pawn center with the intention of undermining it later."
    },
    {
      "type": "lichess_study",
      "studyId": "XtFCFYlM",
      "caption": "Classical King''s Indian Defense - Main Line with 7.O-O"
    },
    {
      "type": "heading",
      "level": 2,
      "text": "Key Strategic Themes"
    },
    {
      "type": "paragraph",
      "text": "Black typically aims for ...e5 and ...f5, launching a kingside attack. White must decide between expanding on the queenside with c5, or preparing e5 in the center. Understanding these imbalances is crucial for both sides."
    },
    {
      "type": "heading",
      "level": 3,
      "text": "Common Mistakes to Avoid"
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        "Pushing ...f5 too early before completing development",
        "Allowing White to close the position with e5 without counterplay",
        "Neglecting the queenside as Black while attacking on the kingside",
        "As White, playing passively instead of creating immediate threats"
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "text": "Practice Recommendations"
    },
    {
      "type": "paragraph",
      "text": "To truly master this opening, you should:"
    },
    {
      "type": "list",
      "ordered": true,
      "items": [
        "Study the annotated games in the Lichess study above",
        "Practice the key positions against the engine",
        "Play at least 20 games with this opening to understand the typical middlegame patterns",
        "Review master games in this line from recent tournaments"
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "text": "Conclusion"
    },
    {
      "type": "paragraph",
      "text": "The King''s Indian Defense offers Black excellent winning chances and leads to rich, complex positions. While it requires understanding of dynamic play and sharp tactics, the effort invested in learning this opening will pay dividends in your tournament results."
    }
  ]'::jsonb,
  id,
  NOW(),
  true
FROM profiles
WHERE username = 'admin'
LIMIT 1;
```

### Step 3: Available Study IDs

Here are some public Lichess studies you can use:

- **XtFCFYlM** - Classical King's Indian Defense
- **MR7CFGJ6** - Caro-Kann Defense
- **gQVXEPhZ** - Sicilian Dragon
- **bDLxgCKL** - Queen's Gambit Declined
- **pVB8fKLJ** - French Defense

### Step 4: JSON Structure for Study Block

```json
{
  "type": "lichess_study",
  "studyId": "XtFCFYlM",
  "chapterId": "optional-chapter-id",
  "caption": "Optional caption describing the study"
}
```

**Fields:**
- `type`: Must be `"lichess_study"`
- `studyId` (required): The Lichess study ID from the URL
- `chapterId` (optional): Specific chapter within the study
- `caption` (optional): Text displayed below the embedded study

### Step 5: Verify the Article

1. Go to `http://localhost:3000/articles`
2. Find your article in the list
3. Click to view it
4. The Lichess study should be embedded and interactive

## Example Output

When rendered, the article will show:
- All text content formatted properly
- An interactive Lichess study viewer embedded in the article
- Users can navigate through the study, view annotations, and play out variations
- The study opens in fullscreen on Lichess when users click "Open on Lichess"

## Notes

- Studies must be **public** on Lichess to be embedded
- The embed is responsive and works on mobile devices
- Users don't need a Lichess account to view the study
- All study features work: annotations, variations, comments, etc.
