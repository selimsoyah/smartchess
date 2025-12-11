-- Seed news_facts with fake chess news
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

-- Add a success message
SELECT 'Successfully added 10 news items!' as message;
