-- Sample forum posts and news items
-- Run this after you have created a user profile

-- FORUM POSTS
-- Replace 'YOUR_USER_ID_HERE' with your actual user ID from the profiles table

INSERT INTO forum_posts (user_id, title, content) VALUES
(
  'YOUR_USER_ID_HERE',
  'Best opening for intermediate players?',
  'I''ve been playing chess for about 2 years now and I''m rated around 1400. I''ve been using the Italian Game as white, but I feel like I''ve hit a plateau. 

What openings would you recommend for someone at my level? I''m looking for something that:
- Has clear strategic ideas
- Teaches good middlegame principles
- Isn''t too theoretical

Any suggestions would be greatly appreciated!'
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

What other fundamental endgames should every player know?'
),
(
  'YOUR_USER_ID_HERE',
  'How do you handle time pressure?',
  'I keep losing games where I have a winning position but run out of time. Even in 15-minute games, I somehow end up with less than a minute while my opponent still has 5-10 minutes.

My main issues:
- I calculate too many variations
- I double-check obvious moves
- I struggle to find candidate moves quickly

How do you experienced players manage your time? Any tips for staying calm when the clock is ticking?'
),
(
  'YOUR_USER_ID_HERE',
  'Studying classical games vs. playing - what''s the ratio?',
  'How much time should I spend on each activity?

Currently I''m doing:
- 60% playing online
- 20% tactics puzzles  
- 20% watching YouTube videos

But I keep hearing I should study classical games more. Is this true? What''s worked for you in terms of time allocation for improvement?'
);

-- NEWS ITEMS
-- These can be inserted directly as they don't require user references

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

Early bird registration is now open with a 20% discount. Limited to 30 students to ensure quality instruction.

For more information, contact us or check our Programs page.'
),
(
  CURRENT_DATE - INTERVAL ''7 days'',
  'Student Tournament Success',
  'Congratulations to our academy students who competed in the Regional Rapid Championship last weekend!

Notable results:
🥇 Sarah Chen - 1st place in U1400 section (7/7 score!)
🥈 Michael Rodriguez - 2nd place in Open section
🥉 Emma Thompson - 3rd place in U1200 section

15 of our students participated, and 11 finished in prize positions. We''re incredibly proud of everyone who competed. Your preparation and dedication really showed!

Special thanks to Coach Anderson for organizing the training camp leading up to the event.'
),
(
  CURRENT_DATE - INTERVAL ''14 days'',
  'New Training Materials Available',
  'We''ve just added over 500 new tactical puzzles to our online training platform!

New categories include:
• Advanced pin tactics
• Deflection and decoy themes
• Complex calculation exercises
• Endgame puzzles (rook vs. pawns)

All current students have automatic access. The puzzles are organized by difficulty rating and include detailed explanations.

We recommend starting with puzzles 50-100 points below your current rating and working your way up. Consistency is key - try to solve at least 10 puzzles per day!'
),
(
  CURRENT_DATE - INTERVAL ''21 days'',
  'Guest Lecture: GM Sarah Johnson Next Week',
  'We''re honored to host International Grandmaster Sarah Johnson for a special lecture series!

Topic: "Modern Opening Preparation in the Computer Age"

GM Johnson will discuss:
• How to use engines effectively in opening prep
• Understanding engine evaluations
• When to trust your intuition over the computer
• Building a practical opening repertoire

Date: Next Friday, 7 PM EST
Duration: 90 minutes + Q&A
Format: Live online session

Open to all academy members. Non-members can purchase a guest pass for $15. Don''t miss this rare opportunity to learn from one of the world''s top players!'
);

-- Instructions for use:
-- 1. Create a user account and get your profile UUID from Supabase
-- 2. Replace 'YOUR_USER_ID_HERE' with your actual UUID
-- 3. Run this script in the Supabase SQL Editor
-- 4. Check /forum and /news pages to see the sample content
