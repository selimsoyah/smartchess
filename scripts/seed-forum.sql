-- Seed forum with fake discussions
-- First, let's create some test users if they don't exist
-- You'll need to replace these UUIDs with actual user IDs from your auth.users table

-- Sample forum posts with chess-related content
INSERT INTO forum_posts (user_id, title, content, created_at) VALUES
(
  (SELECT id FROM auth.users LIMIT 1),
  'Best opening for beginners?',
  'I''ve been playing chess for about 3 months now and I''m struggling to find a good opening repertoire. I currently play e4 as white but I get confused after Black''s various responses. What would you recommend for a beginner to learn? Should I stick with one opening or learn multiple?',
  NOW() - INTERVAL '2 days'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'How to improve tactical vision?',
  'I keep missing simple tactics in my games, even ones I can solve easily in puzzles. Does anyone have advice on how to translate puzzle skills into actual games? I''m rated around 1200 and feel stuck.',
  NOW() - INTERVAL '5 days'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Analyzing my first tournament game',
  'Just played my first OTB tournament yesterday! Lost all 5 games but learned so much. In one game, I had a winning position but blundered a piece. How do you deal with tournament nerves and time pressure?',
  NOW() - INTERVAL '1 day'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'London System - overpowered or overrated?',
  'I''ve been facing the London System a lot lately as Black. It seems like White just plays the same setup regardless of what Black does. What''s the best way to counter it? Is it really as strong as everyone says?',
  NOW() - INTERVAL '3 days'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Recommended chess books for intermediate players?',
  'I''m around 1500 rated and looking to improve my understanding of strategy and positional play. I''ve heard good things about "My System" by Nimzowitsch and "The Amateur''s Mind" by Silman. What books helped you break through to the next level?',
  NOW() - INTERVAL '4 days'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Should I learn to play the endgame first?',
  'My coach told me to study endgames before focusing on openings, but that seems backwards to me. Don''t I need to know openings to get good positions? What do you think is the right learning order?',
  NOW() - INTERVAL '6 days'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'King''s Gambit in 2025 - still playable?',
  'I''ve always loved aggressive, attacking chess. Is the King''s Gambit still viable at club level? I know it''s considered dubious at master level, but I''m only 1400 rated. Will it help me develop my tactical skills?',
  NOW() - INTERVAL '1 hour'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'How often should I analyze my games?',
  'I play about 5-10 games per week on Lichess. Should I be analyzing every single game or just the important ones? I find analysis exhausting and sometimes I just want to play more games instead.',
  NOW() - INTERVAL '8 hours'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Dealing with aggressive players',
  'In my club, there''s this player who always plays super aggressive with early queen attacks and pawn storms. I know the attacks aren''t sound, but I always panic and make mistakes. Any tips for staying calm against aggressive play?',
  NOW() - INTERVAL '2 days'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Online vs OTB chess - big difference?',
  'I''m rated 1800 online but only 1400 OTB. Is this normal? I find it so much harder to calculate without being able to pre-move and I get nervous with someone sitting across from me. How do I bridge this gap?',
  NOW() - INTERVAL '3 days'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Classical vs Rapid for improvement',
  'Should I focus on classical time controls (15+10) or rapid (10+0) if I want to improve faster? I enjoy rapid more because I can play more games, but people say classical is better for learning. What''s your experience?',
  NOW() - INTERVAL '5 hours'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Magnus vs Hikaru - who''s better?',
  'Settled debate or ongoing discussion? Magnus has the classical dominance but Hikaru kills it in speed chess. If they played 100 games in each time control (classical, rapid, blitz, bullet), who wins overall?',
  NOW() - INTERVAL '12 hours'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Chess blindness - how to overcome it?',
  'Sometimes I just don''t see moves that are right in front of me. Like I''ll miss a hanging piece or a simple checkmate. It''s embarrassing. Does this get better with practice or is it a fundamental vision problem I need to work on specifically?',
  NOW() - INTERVAL '1 day'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Caro-Kann vs French Defense',
  'Both seem like solid, strategic defenses against e4. Which one should I learn? I like positional play and don''t want to memorize too many sharp lines. What are the key differences between them?',
  NOW() - INTERVAL '4 hours'
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'When to trade pieces?',
  'I struggle with knowing when to trade pieces. Sometimes I trade everything and get a boring position, other times I avoid trades and get mated. What are the key principles for deciding whether to trade or not?',
  NOW() - INTERVAL '2 days'
);

-- Add a success message
SELECT 'Successfully added 15 forum discussions!' as message;
