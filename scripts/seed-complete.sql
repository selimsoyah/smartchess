-- Complete database seed script for Smart Chess Academy
-- This will populate all tables with sample data for visualization

-- ============================================
-- CLEAN UP EXISTING DATA (Optional - uncomment to reset)
-- ============================================

-- WARNING: Uncomment the lines below to DELETE ALL existing data before seeding
-- DELETE FROM forum_posts;
-- DELETE FROM articles;
-- DELETE FROM news_facts;
-- DELETE FROM newsletter_subscribers;

-- ============================================
-- ARTICLES TABLE
-- ============================================

-- Delete specific articles if they already exist (to avoid duplicate key errors)
DELETE FROM articles WHERE slug IN (
  'italian-game-complete-guide',
  'king-pawn-endgame-essentials',
  'tactical-motifs-pins-forks-skewers',
  'art-of-positional-play',
  'opening-repertoire-club-players'
);

INSERT INTO articles (title, slug, author, description, content_json, published_at) VALUES
(
  'The Italian Game: A Complete Guide',
  'italian-game-complete-guide',
  'Coach Alessandro Moretti',
  'Master one of the oldest and most reliable chess openings. Learn the key variations, strategic ideas, and tactical patterns that make the Italian Game a favorite among players of all levels.',
  '{
    "blocks": [
      {
        "type": "paragraph",
        "content": "The Italian Game is one of the oldest recorded chess openings, dating back to the 16th century. It begins with the moves 1.e4 e5 2.Nf3 Nc6 3.Bc4, developing the bishop to an active square and controlling the center."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Understanding the Opening Position"
      },
      {
        "type": "paragraph",
        "content": "After the first few moves of the Italian Game, both sides have developed their knights and bishops toward the center. White''s bishop on c4 targets the vulnerable f7 square, while Black must be careful not to fall into early tactical traps."
      },
      {
        "type": "chessboard",
        "pgn": "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Bxc3 9. d5 Bf6 10. Re1 Ne7 11. Rxe4 d6 12. Bg5 Bxg5 13. Nxg5 O-O",
        "caption": "The main line of the Italian Game - study this position carefully"
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Key Strategic Ideas"
      },
      {
        "type": "paragraph",
        "content": "White aims to control the center with pawns and pieces, while maintaining pressure on f7. Black seeks counterplay through active piece development and central pawn breaks. The middlegame often features opposite-side castling and sharp tactical battles."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Famous Italian Game Battle"
      },
      {
        "type": "paragraph",
        "content": "Watch how a grandmaster handles the Italian Game in this classic encounter. Pay attention to the piece coordination and tactical opportunities that arise from the opening setup."
      },
      {
        "type": "embed",
        "url": "https://lichess.org/embed/game/MPJcy1JW?theme=brown&bg=dark",
        "caption": "Caruana vs Nakamura - Speed Chess Championship 2023"
      }
    ]
  }',
  CURRENT_DATE - INTERVAL '2 days'
),
(
  'Endgame Essentials: King and Pawn vs King',
  'king-pawn-endgame-essentials',
  'IM Sarah Chen',
  'The foundation of all endgame knowledge. Understanding these basic positions will improve your endgame technique dramatically and help you convert winning positions with confidence.',
  '{
    "blocks": [
      {
        "type": "heading",
        "level": 1,
        "content": "The Most Important Endgame"
      },
      {
        "type": "paragraph",
        "content": "King and pawn versus king is the most fundamental endgame in chess. Every chess player must master these positions to understand more complex endgames. The key concepts here - opposition, the square rule, and zugzwang - appear in countless practical games."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "The Concept of Opposition"
      },
      {
        "type": "paragraph",
        "content": "Opposition occurs when the two kings face each other with one square between them. The player who does NOT have the move is said to have the opposition. This is crucial because it determines whether the attacking king can advance or must give way."
      },
      {
        "type": "chessboard",
        "pgn": "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6 5. Nxc6 bxc6 6. Bd3",
        "caption": "White to move - Practice navigating toward the correct squares"
      },
      {
        "type": "heading",
        "level": 2,
        "content": "The Square Rule"
      },
      {
        "type": "paragraph",
        "content": "When a passed pawn races toward promotion while being chased by the opponent''s king, we can use the square rule to instantly determine if the king can catch the pawn. Draw an imaginary square from the pawn to its promotion square. If the enemy king can step into this square, it can catch the pawn."
      },
      {
        "type": "image",
        "url": "https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=800&h=500&fit=crop",
        "alt": "Chess endgame position",
        "caption": "Visualizing the square rule in action"
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Practice These Positions"
      },
      {
        "type": "paragraph",
        "content": "The best way to master these endgames is through deliberate practice. Set up various king and pawn positions on a board and play them out against a computer or training partner. Focus on finding the key moves that demonstrate the winning technique or drawing defense."
      }
    ]
  }',
  CURRENT_DATE - INTERVAL '5 days'
),
(
  'Tactical Motifs: Pins, Forks, and Skewers',
  'tactical-motifs-pins-forks-skewers',
  'FM David Williams',
  'Learn to recognize and execute the most common tactical patterns in chess. These fundamental tactics appear in every game and are essential for improving your calculation skills.',
  '{
    "blocks": [
      {
        "type": "paragraph",
        "content": "Tactics are the heart of chess. While strategy determines the plan, tactics determine whether the plan succeeds. In this article, we will explore three fundamental tactical motifs that every chess player must recognize instantly."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "The Pin"
      },
      {
        "type": "paragraph",
        "content": "A pin occurs when an attacking piece threatens two enemy pieces on the same line (rank, file, or diagonal). The front piece cannot or should not move because it would expose a more valuable piece behind it. Pins are particularly powerful when they immobilize defending pieces."
      },
      {
        "type": "chessboard",
        "pgn": "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O",
        "caption": "The Ruy Lopez - notice how White pins the knight on c6"
      },
      {
        "type": "heading",
        "level": 2,
        "content": "The Fork"
      },
      {
        "type": "paragraph",
        "content": "A fork happens when one piece attacks two or more enemy pieces simultaneously. Knights are especially effective at forking because of their unique movement pattern. The most devastating fork is the royal fork - when a knight attacks both the king and queen at once."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "The Skewer"
      },
      {
        "type": "paragraph",
        "content": "A skewer is like a reverse pin - a more valuable piece is attacked and must move, exposing a less valuable piece behind it. Bishops and rooks execute skewers along diagonals and files. The most common skewer involves forcing a king to move and then capturing the piece behind it."
      },
      {
        "type": "embed",
        "url": "https://lichess.org/training/themes",
        "caption": "Practice tactical patterns on Lichess - start with pins, forks, and skewers"
      }
    ]
  }',
  CURRENT_DATE - INTERVAL '1 week'
),
(
  'The Art of Positional Play',
  'art-of-positional-play',
  'Coach Alessandro Moretti',
  'Understanding positional chess is crucial for rating improvement. Learn how to evaluate positions, identify weaknesses, and create long-term plans.',
  '{
    "blocks": [
      {
        "type": "paragraph",
        "content": "Positional play is about understanding the subtle factors that determine who has the advantage when there are no immediate tactics. It''s about pawn structure, piece activity, king safety, and control of key squares."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Pawn Structure Fundamentals"
      },
      {
        "type": "paragraph",
        "content": "The pawn structure forms the skeleton of your position. Isolated pawns, doubled pawns, pawn chains, and passed pawns each have unique characteristics that dictate your middlegame strategy."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "The Minority Attack"
      },
      {
        "type": "paragraph",
        "content": "One of the most instructive positional themes is the minority attack in the Queen''s Gambit Declined. White uses their queenside pawn minority to create weaknesses in Black''s pawn majority."
      },
      {
        "type": "chessboard",
        "pgn": "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5",
        "caption": "Classic Queen''s Gambit position - White plans b2-b4-b5"
      }
    ]
  }',
  CURRENT_DATE - INTERVAL '10 days'
),
(
  'Opening Repertoire for Club Players',
  'opening-repertoire-club-players',
  'IM Sarah Chen',
  'Build a solid, reliable opening repertoire that will serve you well at the club level. Learn which openings to choose and why.',
  '{
    "blocks": [
      {
        "type": "paragraph",
        "content": "Choosing the right openings is crucial for your chess development. At the club level, you want openings that are sound, not too theoretical, and teach you important chess principles."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "What Makes a Good Club Opening?"
      },
      {
        "type": "paragraph",
        "content": "A good opening for club players should: develop pieces naturally, fight for the center, provide clear plans in the middlegame, and not require memorizing 20 moves of theory."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Recommended Repertoire"
      },
      {
        "type": "paragraph",
        "content": "For White: Start with 1.e4 and play the Italian Game or Scotch against 1...e5. Against the Sicilian, try the Alapin (2.c3) or Closed Sicilian (2.Nc3). For Black against 1.e4: The Caro-Kann or French Defense provide solid structures. Against 1.d4: The Queen''s Gambit Declined or King''s Indian Defense offer rich middlegame play."
      }
    ]
  }',
  CURRENT_DATE - INTERVAL '2 weeks'
);

-- ============================================
-- FORUM POSTS TABLE
-- Note: Replace 'YOUR_USER_ID_HERE' with actual UUID from your profiles table
-- ============================================

-- You'll need to run this part after creating a user:
-- INSERT INTO forum_posts (user_id, title, content, created_at) VALUES ...

-- For now, let's create example SQL that you can run after getting your user ID:

/*
-- Example forum posts - replace YOUR_USER_ID_HERE with your actual user ID
INSERT INTO forum_posts (user_id, title, content, created_at) VALUES
(
  'YOUR_USER_ID_HERE',
  'Best opening for intermediate players?',
  'I''ve been playing chess for about 2 years now and I''m rated around 1400. I''ve been using the Italian Game as white, but I feel like I''ve hit a plateau. 

What openings would you recommend for someone at my level? I''m looking for something that:
- Has clear strategic ideas
- Teaches good middlegame principles
- Isn''t too theoretical

Any suggestions would be greatly appreciated!',
  CURRENT_DATE - INTERVAL '1 day'
),
(
  'YOUR_USER_ID_HERE',
  'Amazing endgame study - Lucena Position',
  'Just learned about the Lucena Position and wow, what a fundamental endgame concept!

For those who don''t know: it''s a winning technique in rook endgames where you have a rook and a pawn on the 7th rank vs opponent''s rook. The key moves involve:

1. Building a bridge with your rook
2. Using your king to shield checks
3. Promoting the pawn safely

This single position has improved my endgame understanding dramatically. Highly recommend studying it if you haven''t already.

What other fundamental endgames should every player know?',
  CURRENT_DATE - INTERVAL '2 days'
),
(
  'YOUR_USER_ID_HERE',
  'How do you handle time pressure?',
  'I keep losing games where I have a winning position but run out of time. Even in 15-minute games, I somehow end up with less than a minute while my opponent still has 5-10 minutes.

My main issues:
- I calculate too many variations
- I double-check obvious moves
- I struggle to find candidate moves quickly

How do you experienced players manage your time? Any tips for staying calm when the clock is ticking?',
  CURRENT_DATE - INTERVAL '3 days'
),
(
  'YOUR_USER_ID_HERE',
  'Studying classical games vs. playing - what''s the ratio?',
  'How much time should I spend on each activity?

Currently I''m doing:
- 60% playing online
- 20% tactics puzzles  
- 20% watching YouTube videos

But I keep hearing I should study classical games more. Is this true? What''s worked for you in terms of time allocation for improvement?',
  CURRENT_DATE - INTERVAL '4 days'
),
(
  'YOUR_USER_ID_HERE',
  'Favorite chess book recommendations?',
  'Looking to build my chess library. What are your must-have chess books?

I''ve already read:
- Bobby Fischer Teaches Chess
- Silman''s Complete Endgame Course

What should I add next? I''m around 1500 rating and want to focus on improving my positional understanding.',
  CURRENT_DATE - INTERVAL '5 days'
),
(
  'YOUR_USER_ID_HERE',
  'Tournament preparation checklist',
  'Playing in my first OTB tournament next month! What should I do to prepare?

So far my plan:
- Review my opening repertoire
- Practice with longer time controls
- Get good sleep the night before

What am I missing? Any tips for tournament day itself?',
  CURRENT_DATE - INTERVAL '1 week'
);
*/

-- ============================================
-- NEWS FACTS TABLE
-- ============================================

-- Delete existing news items if they already exist
DELETE FROM news_facts WHERE title IN (
  'New Beginner Course Launches Next Month',
  'Student Tournament Success Stories',
  'New Training Materials Now Available',
  'Guest Lecture: GM Sarah Johnson - December 15th',
  'Holiday Training Camp Registration Open',
  'New Partnership with Local Chess Club',
  'Community Forum Launches - Join the Discussion!'
);

INSERT INTO news_facts (date, title, content) VALUES
(
  CURRENT_DATE,
  'New Beginner Course Launches Next Month',
  'We''re excited to announce our comprehensive Beginner''s Chess Mastery course starting next month! This 8-week program covers everything from basic rules to intermediate tactics.

Highlights include:
• Live online classes twice per week
• Personalized homework assignments
• Access to our puzzle database
• One-on-one coaching session included
• Certificate of completion

Early bird registration is now open with a 20% discount for the first 30 students. Limited enrollment to ensure quality instruction and individual attention.

Course starts: First week of January
Schedule: Tuesdays and Thursdays, 6 PM EST
Duration: 8 weeks
Price: $399 (Early bird: $319)

For more information and to register, visit our Programs page or contact us directly.'
),
(
  CURRENT_DATE - INTERVAL '7 days',
  'Student Tournament Success Stories',
  'Congratulations to our academy students who competed in the Regional Rapid Championship last weekend! Our students showed exceptional preparation and determination.

Notable results:
🥇 Sarah Chen - 1st place in U1400 section with a perfect 7/7 score!
🥈 Michael Rodriguez - 2nd place in Open section (6/7)
🥉 Emma Thompson - 3rd place in U1200 section (6.5/7)
🏆 James Park - 4th place in U1600 section (6/7)
🏆 Lisa Wang - Best game prize for a brilliant tactical victory

15 of our students participated, and 11 finished in prize positions. We''re incredibly proud of everyone who competed. Your preparation and dedication really showed!

Special thanks to Coach Anderson for organizing the intensive training camp leading up to the event, and to all the families who supported our players.

Next tournament: State Championship in 6 weeks. Sign-ups open next Monday!'
),
(
  CURRENT_DATE - INTERVAL '14 days',
  'New Training Materials Now Available',
  'We''ve just added over 500 new tactical puzzles to our online training platform! These puzzles have been carefully curated and organized to help you improve your pattern recognition and calculation skills.

New categories include:
• Advanced pin tactics (150 puzzles)
• Deflection and decoy themes (125 puzzles)
• Complex calculation exercises (100 puzzles)
• Endgame puzzles focusing on rook vs. pawns (125 puzzles)

All current students have automatic access through their student portal. The puzzles are organized by difficulty rating (1200-2400) and include detailed explanations for every solution.

Study recommendations:
- Start with puzzles 50-100 points below your current rating
- Solve at least 10 puzzles per day
- Review your mistakes carefully
- Focus on understanding the pattern, not just finding the move

Additionally, we''ve updated our opening database with 50 new annotated games featuring the latest theory in popular openings like the Berlin Defense, Najdorf Sicilian, and Queen''s Gambit Declined.

Happy training!'
),
(
  CURRENT_DATE - INTERVAL '21 days',
  'Guest Lecture: GM Sarah Johnson - December 15th',
  'We''re honored to host International Grandmaster Sarah Johnson for a special lecture series next week!

Topic: "Modern Opening Preparation in the Computer Age"
Date: Friday, December 15th
Time: 7:00 PM EST
Duration: 90 minutes + 30 minutes Q&A
Format: Live online session (recording available)

GM Johnson (Peak rating: 2615) will discuss:
• How to use chess engines effectively in opening preparation
• Understanding and interpreting engine evaluations
• When to trust your intuition over computer analysis
• Building a practical opening repertoire
• Preparing for specific opponents
• Common mistakes in modern opening prep

About GM Johnson:
- Former US Women''s Champion (2019, 2021)
- Olympiad team member (3 times)
- Professional coach for 10+ years
- Author of "Modern Opening Theory"

This is an incredible opportunity to learn from one of the world''s top players and coaches!

Registration:
- Academy members: Free (check your email for Zoom link)
- Non-members: $15 guest pass
- Recording included with registration

Spots are limited to ensure quality interaction during Q&A. Register now through our contact page or student portal.

Don''t miss this rare opportunity!'
),
(
  CURRENT_DATE - INTERVAL '1 month',
  'Holiday Training Camp Registration Open',
  'Our popular Winter Holiday Training Camp is back! Join us for an intensive week of chess training during the winter break.

Dates: December 26-30 (5 days)
Time: 9 AM - 3 PM EST daily
Format: Online via Zoom
Skill levels: Separate groups for beginners, intermediate, and advanced

Daily Schedule:
9:00 AM - Opening theory and preparation
10:30 AM - Tactical training session
12:00 PM - Lunch break
1:00 PM - Endgame workshop
2:00 PM - Training games with analysis

Features:
• Small group instruction (max 12 students per group)
• Personalized game analysis
• Take-home training materials
• Daily puzzles and homework
• Certificate of completion
• End-of-camp mini-tournament

Instructors:
- IM Sarah Chen (Advanced group)
- FM David Williams (Intermediate group)
- Coach Alessandro Moretti (Beginner group)

Price: $299 (siblings discount: 15% off for 2nd child)

This camp typically sells out, so register early! Perfect for students looking to make progress over the holiday break.

Questions? Email us or call our office.'
(
  CURRENT_DATE - INTERVAL '6 weeks',
  'New Partnership with Local Chess Club',
  'Smart Chess Academy is proud to announce our new partnership with the Metropolitan Chess Club!

This collaboration brings exciting benefits for our students:

• Discounted membership rates for academy students
• Priority registration for club tournaments
• Access to club''s extensive chess library
• Invitation to monthly master class events
• Use of club facilities for in-person training sessions

The Metropolitan Chess Club has been a pillar of our local chess community for over 40 years, hosting weekly tournaments, simultaneous exhibitions, and social events.

Starting next month, academy students can attend one free club event per month. This is a fantastic opportunity to play over-the-board chess, meet other players, and experience tournament conditions.

Club location: 123 Main Street (15 minutes from downtown)
Operating hours: Mon-Fri 4-10 PM, Sat-Sun 10 AM-10 PM

We''ll be organizing a group visit to the club on January 20th for interested students and families. More details coming soon!

This partnership reinforces our commitment to providing comprehensive chess education that extends beyond online lessons.'
),
(
  CURRENT_DATE - INTERVAL '3 days',
  'Community Forum Launches - Join the Discussion!',
  'We''re thrilled to announce the launch of our brand new Community Forum! This is your space to connect with fellow chess enthusiasts, share ideas, and learn from each other.

What you can do in the forum:
• Ask questions about openings, tactics, and strategy
• Share your best games and get feedback
• Discuss chess books and training resources
• Find study partners and training groups
• Participate in community challenges
• Get advice from experienced players

The forum is open to everyone - students, parents, and chess lovers of all skill levels. We believe that learning happens best in a supportive community where everyone feels welcome to contribute.

Forum Guidelines:
✓ Be respectful and constructive
✓ Stay on topic (chess-related discussions)
✓ Share knowledge generously
✓ Ask questions - there are no "dumb" questions!
✓ Have fun and make friends

Our coaches will be active on the forum, answering questions and providing guidance. We''ll also be hosting weekly discussion threads on specific topics like "Opening of the Week" and "Tactic Tuesday".

Getting Started:
1. Create your account (or log in if you''re already a member)
2. Set up your profile with a display name and optional avatar
3. Browse existing discussions or start your own thread
4. Introduce yourself in the "New Members" section

Popular Topics Already Trending:
• Best openings for intermediate players
• Time management strategies
• Endgame fundamentals
• Tournament preparation tips
• Book recommendations

Join the conversation today at smartchessacademy.com/forum - we can''t wait to see what questions and insights you bring to our community!'
);is partnership reinforces our commitment to providing comprehensive chess education that extends beyond online lessons.'
);

-- ============================================
-- NEWSLETTER SUBSCRIBERS (Optional)
-- ============================================

INSERT INTO newsletter_subscribers (email) VALUES
('chess.enthusiast@example.com'),
('future.grandmaster@example.com'),
('parent.support@example.com');

-- ============================================
-- INSTRUCTIONS FOR FORUM POSTS
-- ============================================

-- To add forum posts:
-- 1. Create a user account through the /auth/signup page
-- 2. Get your user ID from Supabase dashboard (Authentication > Users)
-- 3. Copy the UUID
-- 4. Uncomment the forum_posts INSERT block above
-- 5. Replace 'YOUR_USER_ID_HERE' with your actual UUID
-- 6. Run the modified INSERT statements

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Uncomment these to verify your data:
-- SELECT COUNT(*) as article_count FROM articles;
-- SELECT COUNT(*) as forum_count FROM forum_posts;
-- SELECT COUNT(*) as news_count FROM news_facts;
-- SELECT title, published_at FROM articles ORDER BY published_at DESC;
