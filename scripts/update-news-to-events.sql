-- Update news_facts table to be better suited for events
-- Add event-specific columns

-- Add event_date column (separate from created date)
ALTER TABLE news_facts ADD COLUMN IF NOT EXISTS event_date DATE;

-- Add event_time column for specific event times
ALTER TABLE news_facts ADD COLUMN IF NOT EXISTS event_time TIME;

-- Add location column for event venue
ALTER TABLE news_facts ADD COLUMN IF NOT EXISTS location TEXT;

-- Add event_type column (tournament, workshop, club_meeting, etc.)
ALTER TABLE news_facts ADD COLUMN IF NOT EXISTS event_type TEXT;

-- Add registration_link column
ALTER TABLE news_facts ADD COLUMN IF NOT EXISTS registration_link TEXT;

-- Update existing records to use date as event_date if not set
UPDATE news_facts 
SET event_date = date 
WHERE event_date IS NULL;

-- Create index on event_date for faster queries
CREATE INDEX IF NOT EXISTS idx_news_facts_event_date ON news_facts(event_date);

-- Add some sample events with different dates
INSERT INTO news_facts (date, event_date, event_time, title, content, location, event_type, registration_link)
VALUES 
  (NOW(), '2025-12-20', '18:00:00', 'Winter Chess Tournament 2025', 'Join us for our annual Winter Chess Tournament! Open to all skill levels. Prizes for top 3 finishers in each category. Registration deadline: December 18th.

Date: December 20, 2025
Time: 6:00 PM - 10:00 PM
Location: Smart Chess Academy Main Hall
Categories: Beginner, Intermediate, Advanced
Entry Fee: $25 (Students: $15)', 'Smart Chess Academy Main Hall', 'tournament', '/contact'),
  
  (NOW(), '2025-12-15', '10:00:00', 'Opening Strategies Workshop', 'Master the art of opening preparation with IM Sarah Johnson. This intensive 3-hour workshop covers popular openings like the Italian Game, Ruy Lopez, and Sicilian Defense.

Date: December 15, 2025
Time: 10:00 AM - 1:00 PM
Location: Online via Zoom
Max Participants: 20
Fee: $40', 'Online via Zoom', 'workshop', '/plans'),
  
  (NOW(), '2025-12-28', '14:00:00', 'Youth Chess Camp - Holiday Edition', 'A fun and educational 3-day chess camp for young players aged 8-14. Includes lessons, puzzles, games, and a mini-tournament on the final day!

Dates: December 28-30, 2025
Time: 2:00 PM - 5:00 PM daily
Location: Smart Chess Academy
Ages: 8-14 years
Full Camp: $120 | Single Day: $45', 'Smart Chess Academy', 'camp', '/contact'),
  
  (NOW(), '2026-01-10', '19:00:00', 'Endgame Mastery Series - Session 1', 'Part 1 of our 4-week endgame training series. Learn essential king and pawn endgames, opposition, and breakthrough techniques.

Date: January 10, 2026
Time: 7:00 PM - 9:00 PM
Location: Smart Chess Academy
Level: Intermediate to Advanced
Series Pass: $100 | Single Session: $30', 'Smart Chess Academy', 'class', '/plans'),
  
  (NOW(), '2026-01-25', '15:00:00', 'Simultaneous Exhibition with FM Michael Chen', 'Watch FM Michael Chen take on 20 players simultaneously! Spectators welcome. Limited playing spots available - first come, first served.

Date: January 25, 2026
Time: 3:00 PM - 6:00 PM
Location: Smart Chess Academy Main Hall
Players: $15 | Spectators: Free', 'Smart Chess Academy Main Hall', 'exhibition', '/contact')

ON CONFLICT DO NOTHING;

COMMENT ON COLUMN news_facts.event_date IS 'The actual date when the event takes place';
COMMENT ON COLUMN news_facts.event_time IS 'The time when the event starts';
COMMENT ON COLUMN news_facts.location IS 'Physical or virtual location of the event';
COMMENT ON COLUMN news_facts.event_type IS 'Type of event: tournament, workshop, camp, class, exhibition, club_meeting';
COMMENT ON COLUMN news_facts.registration_link IS 'Link for registration or more information';
