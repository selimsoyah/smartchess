-- Sample article with interactive chess content
-- Run this after you have set up your Supabase database

-- First, create a sample article with PGN chessboard and Lichess embed
INSERT INTO articles (
  title,
  slug,
  author,
  description,
  content_json
) VALUES (
  'The Italian Game: A Complete Guide',
  'italian-game-complete-guide',
  'Smart Chess Academy',
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
  }'
);

INSERT INTO articles (
  title,
  slug,
  author,
  description,
  content_json
) VALUES (
  'Endgame Essentials: King and Pawn vs King',
  'king-pawn-endgame-essentials',
  'Smart Chess Academy',
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
  }'
);

INSERT INTO articles (
  title,
  slug,
  author,
  description,
  content_json
) VALUES (
  'Tactical Motifs: Pins, Forks, and Skewers',
  'tactical-motifs-pins-forks-skewers',
  'Smart Chess Academy',
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
  }'
);

-- Note: These articles use the basic schema with TEXT author field
-- If you've updated your schema to use author_id (UUID), modify accordingly
