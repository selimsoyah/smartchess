-- Seed script for forum with real user data
-- Run this AFTER running forum-migration.sql

-- First, get the user ID
DO $$
DECLARE
  test_user_id UUID;
BEGIN
  -- Get the first user
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NULL THEN
    RAISE NOTICE 'No users found. Please sign up first, then run this script.';
  ELSE
    RAISE NOTICE 'Using user ID: %', test_user_id;

    -- Clear existing test data (optional - comment out if you want to keep existing posts)
    -- DELETE FROM forum_comments;
    -- DELETE FROM forum_posts WHERE user_id = test_user_id;

    -- Insert sample forum posts
    INSERT INTO forum_posts (user_id, title, content, view_count, created_at) VALUES
    (
      test_user_id,
      'Best opening for beginners?',
      E'I''ve been playing chess for about 3 months now and I''m struggling to find a good opening repertoire. I currently play e4 as white but I get confused after Black''s various responses.\n\nWhat would you recommend for a beginner to learn? Should I stick with one opening or learn multiple?\n\nI''m currently rated around 800 on Lichess and looking to improve my fundamentals.',
      15,
      NOW() - INTERVAL '2 days'
    ),
    (
      test_user_id,
      'How to improve tactical vision?',
      E'I keep missing simple tactics in my games, even ones I can solve easily in puzzles. Does anyone have advice on how to translate puzzle skills into actual games?\n\nI''m rated around 1200 and feel stuck. I can solve 1500-rated puzzles but blunder pieces in real games.\n\nAny training methods or tips would be greatly appreciated!',
      23,
      NOW() - INTERVAL '5 days'
    ),
    (
      test_user_id,
      'Analyzing my first tournament game',
      E'Just played my first OTB tournament yesterday! Lost all 5 games but learned so much.\n\nIn one game, I had a winning position but blundered a piece due to time pressure. In another, I didn''t see a simple back-rank mate.\n\nHow do you deal with tournament nerves and time pressure? Any tips for a beginner tournament player?',
      42,
      NOW() - INTERVAL '1 day'
    ),
    (
      test_user_id,
      'London System - overpowered or overrated?',
      E'I''ve been facing the London System a lot lately as Black. It seems like White just plays the same setup regardless of what Black does.\n\nWhat''s the best way to counter it? Is it really as strong as everyone says, or are there good lines against it?\n\nI play the King''s Indian Defense usually, but maybe I need a different approach against the London?',
      18,
      NOW() - INTERVAL '3 days'
    ),
    (
      test_user_id,
      'Recommended chess books for intermediate players?',
      E'I''m around 1500 rated and looking to improve my understanding of strategy and positional play.\n\nI''ve heard good things about:\n- "My System" by Nimzowitsch\n- "The Amateur''s Mind" by Silman\n- "Dvoretsky''s Endgame Manual"\n\nWhat books helped you break through to the next level? Any other recommendations?',
      31,
      NOW() - INTERVAL '4 days'
    ),
    (
      test_user_id,
      'King''s Gambit in 2025 - still playable?',
      E'I''ve always loved aggressive, attacking chess. Is the King''s Gambit still viable at club level?\n\nI know it''s considered dubious at master level, but I''m only 1400 rated. Will it help me develop my tactical skills?\n\nOr should I focus on more solid openings first?',
      27,
      NOW() - INTERVAL '6 hours'
    ),
    (
      test_user_id,
      'Struggling with endgames - where to start?',
      E'I''ve been avoiding studying endgames because they seem boring, but I keep losing won positions in the endgame.\n\nWhere should I start? Lucena position? Philidor position? King and pawn endgames?\n\nWhat''s the most practical approach for a club player to learn endgames without getting overwhelmed?',
      19,
      NOW() - INTERVAL '8 hours'
    ),
    (
      test_user_id,
      'Best way to analyze your own games?',
      E'I want to improve my analysis skills. Currently, I just run my games through an engine and look at the mistakes.\n\nBut I feel like I''m not learning much. What''s the proper way to analyze your games?\n\nShould I analyze without an engine first? What should I be looking for?',
      35,
      NOW() - INTERVAL '12 hours'
    );

    RAISE NOTICE 'Sample forum posts created successfully!';
  END IF;
END $$;
