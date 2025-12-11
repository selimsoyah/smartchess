-- Combined seed script for forum discussions and news
-- Run this in your Supabase SQL Editor

-- ============================================
-- SEED FORUM DISCUSSIONS
-- ============================================

INSERT INTO forum_posts (user_id, title, content, created_at) VALUES
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'Best opening for beginners?',
  'I''ve been playing chess for about 3 months now and I''m struggling to find a good opening repertoire. I currently play e4 as white but I get confused after Black''s various responses. What would you recommend for a beginner to learn? Should I stick with one opening or learn multiple?',
  NOW() - INTERVAL '2 days'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'How to improve tactical vision?',
  'I keep missing simple tactics in my games, even ones I can solve easily in puzzles. Does anyone have advice on how to translate puzzle skills into actual games? I''m rated around 1200 and feel stuck.',
  NOW() - INTERVAL '5 days'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'Analyzing my first tournament game',
  'Just played my first OTB tournament yesterday! Lost all 5 games but learned so much. In one game, I had a winning position but blundered a piece. How do you deal with tournament nerves and time pressure?',
  NOW() - INTERVAL '1 day'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'London System - overpowered or overrated?',
  'I''ve been facing the London System a lot lately as Black. It seems like White just plays the same setup regardless of what Black does. What''s the best way to counter it? Is it really as strong as everyone says?',
  NOW() - INTERVAL '3 days'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'Recommended chess books for intermediate players?',
  'I''m around 1500 rated and looking to improve my understanding of strategy and positional play. I''ve heard good things about "My System" by Nimzowitsch and "The Amateur''s Mind" by Silman. What books helped you break through to the next level?',
  NOW() - INTERVAL '4 days'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'Should I learn to play the endgame first?',
  'My coach told me to study endgames before focusing on openings, but that seems backwards to me. Don''t I need to know openings to get good positions? What do you think is the right learning order?',
  NOW() - INTERVAL '6 days'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'King''s Gambit in 2025 - still playable?',
  'I''ve always loved aggressive, attacking chess. Is the King''s Gambit still viable at club level? I know it''s considered dubious at master level, but I''m only 1400 rated. Will it help me develop my tactical skills?',
  NOW() - INTERVAL '1 hour'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'How often should I analyze my games?',
  'I play about 5-10 games per week on Lichess. Should I be analyzing every single game or just the important ones? I find analysis exhausting and sometimes I just want to play more games instead.',
  NOW() - INTERVAL '8 hours'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'Dealing with aggressive players',
  'In my club, there''s this player who always plays super aggressive with early queen attacks and pawn storms. I know the attacks aren''t sound, but I always panic and make mistakes. Any tips for staying calm against aggressive play?',
  NOW() - INTERVAL '2 days'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'Online vs OTB chess - big difference?',
  'I''m rated 1800 online but only 1400 OTB. Is this normal? I find it so much harder to calculate without being able to pre-move and I get nervous with someone sitting across from me. How do I bridge this gap?',
  NOW() - INTERVAL '3 days'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'Classical vs Rapid for improvement',
  'Should I focus on classical time controls (15+10) or rapid (10+0) if I want to improve faster? I enjoy rapid more because I can play more games, but people say classical is better for learning. What''s your experience?',
  NOW() - INTERVAL '5 hours'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'Magnus vs Hikaru - who''s better?',
  'Settled debate or ongoing discussion? Magnus has the classical dominance but Hikaru kills it in speed chess. If they played 100 games in each time control (classical, rapid, blitz, bullet), who wins overall?',
  NOW() - INTERVAL '12 hours'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'Chess blindness - how to overcome it?',
  'Sometimes I just don''t see moves that are right in front of me. Like I''ll miss a hanging piece or a simple checkmate. It''s embarrassing. Does this get better with practice or is it a fundamental vision problem I need to work on specifically?',
  NOW() - INTERVAL '1 day'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'Caro-Kann vs French Defense',
  'Both seem like solid, strategic defenses against e4. Which one should I learn? I like positional play and don''t want to memorize too many sharp lines. What are the key differences between them?',
  NOW() - INTERVAL '4 hours'
),
(
  (SELECT id FROM auth.users ORDER BY created_at LIMIT 1),
  'When to trade pieces?',
  'I struggle with knowing when to trade pieces. Sometimes I trade everything and get a boring position, other times I avoid trades and get mated. What are the key principles for deciding whether to trade or not?',
  NOW() - INTERVAL '2 days'
);

-- ============================================
-- SEED NEWS ITEMS
-- ============================================

INSERT INTO news_facts (date, title, content) VALUES
(
  NOW() - INTERVAL '1 day',
  'Academy Student Wins Local Tournament',
  'Congratulations to Sarah Chen, one of our intermediate students, who won first place in the City Chess Championship last weekend! Sarah scored 5.5/6 points in the U1800 section, defeating several higher-rated opponents.

Her coach, FM Rodriguez, praised her preparation: "Sarah has been working hard on her endgame technique and it really showed in the tournament. She converted several winning positions that many players at her level would have drawn."

This marks Sarah''s third tournament victory this year. Keep up the great work!'
),
(
  NOW() - INTERVAL '3 days',
  'New Group Classes Starting in January',
  'We''re excited to announce new group classes starting January 15th! Classes will be available for all skill levels:

- Beginner (Rated under 1000): Tuesdays 6-7:30 PM
- Intermediate (1000-1600): Wednesdays 6-7:30 PM  
- Advanced (1600+): Thursdays 7-8:30 PM

Each class is limited to 8 students to ensure personalized attention. Topics covered include opening principles, tactical patterns, endgame fundamentals, and game analysis.

Early bird discount: Register before December 20th and save 15%! Contact us for more information.'
),
(
  NOW() - INTERVAL '5 days',
  'Chess World Championship Update',
  'The 2025 World Chess Championship between Ding Liren and Gukesh D has reached the halfway point with the score tied 3-3. Game 6 yesterday featured a sharp Najdorf Sicilian that ended in a thrilling draw after 52 moves.

Our academy will be hosting a watch party for Game 7 this Friday at 7 PM. Join us to watch the game live with expert commentary from our coaches. Pizza and snacks will be provided!

All members and guests welcome. RSVP on our Discord server.'
),
(
  NOW() - INTERVAL '1 week',
  'Spotlight: Coach Martinez Achieves IM Title',
  'Huge congratulations to our coach, Alex Martinez, who has earned the International Master title! Alex achieved the required 2400+ rating and completed his final IM norm at the Chicago Open last month.

Alex has been teaching at Smart Chess Academy for two years and specializes in opening preparation and attacking chess. His students have seen an average rating gain of 200 points.

"Teaching has made me a better player," Alex said. "Explaining concepts to students forces you to understand them deeply yourself."

Alex will be offering special IM-level classes starting next month for our advanced students.'
),
(
  NOW() - INTERVAL '10 days',
  'Holiday Blitz Tournament - Results',
  'Our annual Holiday Blitz Tournament was a huge success with 32 participants competing in a 5-round Swiss tournament!

Winners:
🥇 1st Place: David Kim (5/5)
🥈 2nd Place: Jennifer Lee (4/5)  
🥉 3rd Place: Marcus Thompson (4/5)

Congratulations to all participants! Special shoutout to 10-year-old Emily Rodriguez who scored 3/5 playing up in the open section.

Thanks to everyone who came out and to our sponsors for providing the prizes. See you next year!'
),
(
  NOW() - INTERVAL '2 weeks',
  'New Analysis Tool Integration',
  'We''ve integrated Lichess analysis directly into our member portal! Students can now:

- Import games automatically from Lichess
- Get computer analysis with engine evaluation
- Share annotated games with coaches
- Track progress with statistics and graphs

Our coaches will be using this tool for lesson preparation and homework assignments. Check your email for login instructions and a tutorial video.

Questions? Join our weekly Q&A session every Monday at 5 PM.'
),
(
  NOW() - INTERVAL '3 weeks',
  'Academy Team Places 2nd in State League',
  'Our academy team finished in 2nd place in the State Chess League after a competitive season! Highlights include:

- 8 match wins, 2 draws, 1 loss
- Board 1: Michael Chen - 7.5/11 (68%)
- Board 2: Lisa Wang - 8/11 (73%)  
- Board 3: James Park - 6.5/11 (59%)
- Board 4: Emma Davis - 9/11 (82%) - Top scorer!

The team showed great improvement throughout the season. Special thanks to Coach Rodriguez for leading the team and to all the parents for their support.

Next season starts in March. Tryouts will be announced in February.'
),
(
  NOW() - INTERVAL '4 weeks',
  'Grandmaster Simultaneous Exhibition',
  'Mark your calendars! GM Elena Petrova will be visiting our academy on January 28th for a simultaneous exhibition.

GM Petrova, currently ranked #15 in the world, will play up to 20 players simultaneously. This is a rare opportunity to play against a world-class player!

Event Details:
- Date: January 28, 2 PM - 6 PM
- Entry: $50 (includes signed scoresheet)
- Limited to 20 spots
- All skill levels welcome

Registration opens December 15th. First come, first served! After the simul, GM Petrova will do a Q&A session and book signing.'
),
(
  NOW() - INTERVAL '1 month',
  'December Puzzle Rush Challenge',
  'Join our December Puzzle Rush Challenge! Compete against other academy members to see who can solve the most puzzles.

Categories:
- Beginner (Rated under 1200)
- Intermediate (1200-1800)  
- Advanced (1800+)

Prizes:
- 1st place each category: Free month of lessons
- 2nd place: 50% off next month
- 3rd place: Free chess book

Challenge runs through December 31st. Use the link in your member portal to participate. Current leaders are posted on our Discord.

Good luck everyone! Remember: accuracy is more important than speed!'
),
(
  NOW() - INTERVAL '5 weeks',
  'Thanksgiving Break Schedule',
  'Please note our modified schedule for Thanksgiving week:

November 27-29: Academy closed
November 30 (Saturday): Normal classes resume

Online lessons will be available on request during the break. Contact your coach directly to arrange.

Happy Thanksgiving to all our students and families! We''re grateful for this amazing chess community.'
);

-- Success message
SELECT 
  (SELECT COUNT(*) FROM forum_posts) as forum_posts_count,
  (SELECT COUNT(*) FROM news_facts) as news_count,
  'Database seeded successfully! 🎉' as status;
