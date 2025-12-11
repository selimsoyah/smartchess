# Database Seeding Instructions

## Good News! 
Your **forum discussions are already populated** ✅

## To fix the news seeding issue:

### Option 1: Use Supabase Dashboard (Easiest)
1. Go to https://jhowtypkdmhocvgnbpzp.supabase.co
2. Click **SQL Editor** in the left sidebar
3. Paste this SQL:

```sql
-- Temporarily disable RLS for seeding
ALTER TABLE news_facts DISABLE ROW LEVEL SECURITY;

-- Insert news items
INSERT INTO news_facts (date, title, content) VALUES
(NOW() - INTERVAL '1 day', 'Academy Student Wins Local Tournament', 'Congratulations to Sarah Chen, one of our intermediate students, who won first place in the City Chess Championship last weekend!'),
(NOW() - INTERVAL '3 days', 'New Group Classes Starting in January', 'We''re excited to announce new group classes starting January 15th!'),
(NOW() - INTERVAL '5 days', 'Chess World Championship Update', 'The 2025 World Chess Championship has reached the halfway point!'),
(NOW() - INTERVAL '7 days', 'Coach Martinez Achieves IM Title', 'Huge congratulations to our coach, Alex Martinez!'),
(NOW() - INTERVAL '10 days', 'Holiday Blitz Tournament - Results', 'Our annual Holiday Blitz Tournament was a huge success!');

-- Re-enable RLS
ALTER TABLE news_facts ENABLE ROW LEVEL SECURITY;
```

4. Click **Run**

### Option 2: Update RLS Policies
Add a policy that allows inserts:

```sql
CREATE POLICY "Enable insert for service role" ON news_facts
  FOR INSERT
  WITH CHECK (true);
```

## Verify It Worked
Visit these pages:
- Forum: http://localhost:3000/forum ✅ (already working)
- News: http://localhost:3000/news (will work after fixing RLS)
- Homepage: http://localhost:3000 (will show latest posts)

## Start Dev Server
```bash
npm run dev
```

Then visit http://localhost:3000 to see all the animations and new content!
