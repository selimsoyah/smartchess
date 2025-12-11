# Smart Chess Academy - Testing Checklist

## Pre-Testing Setup

### Database Migration (CRITICAL - Must do first!)
- [ ] Open Supabase dashboard
- [ ] Go to SQL Editor
- [ ] Run the migration script: `scripts/add-lichess-username.sql`
- [ ] Verify the column was added: `SELECT * FROM profiles LIMIT 1;`

## Feature Testing

### 1. Homepage Lichess Widgets
- [ ] Daily puzzle displays correctly
- [ ] Puzzle shows rating and difficulty
- [ ] "Solve on Lichess" link works
- [ ] Live games widget shows current games
- [ ] Can switch between different live channels

### 2. Puzzles Page (/puzzles)
- [ ] Page loads without errors
- [ ] Daily puzzle section displays
- [ ] Training links work (open Lichess)
- [ ] Responsive on mobile

### 3. Watch Page (/watch)
- [ ] All 10 TV channels listed
- [ ] Can switch between channels
- [ ] Live game board displays
- [ ] Player names and ratings shown
- [ ] "Live" indicator animates
- [ ] Educational content displays
- [ ] Responsive layout on mobile

**TV Channels to Test:**
1. Top Rated
2. Bullet
3. Blitz
4. Rapid
5. Classical
6. Crazyhouse
7. Chess960
8. King of the Hill
9. Three-check
10. Antichess

### 4. Tournaments Page (/tournaments)
- [ ] Page loads without errors
- [ ] "In Progress" section shows active tournaments
- [ ] "Upcoming" section shows scheduled tournaments
- [ ] Tournament cards display all info (name, duration, players)
- [ ] "Starting Soon" badge appears for upcoming tournaments
- [ ] "Join Tournament" links work (open Lichess)
- [ ] Error state shows if API fails
- [ ] Responsive on mobile

### 5. Profile Page - Lichess Integration
- [ ] Lichess username field visible
- [ ] Can enter Lichess username
- [ ] External link icon appears when username entered
- [ ] External link opens correct Lichess profile
- [ ] Profile saves successfully with Lichess username
- [ ] After saving, Lichess stats section appears below form
- [ ] Stats display correct ratings (Bullet, Blitz, Rapid, Classical)
- [ ] Games count shows for each time control
- [ ] Rating progress shown (+/- indicators)
- [ ] "View Full Profile" link works
- [ ] Member since date displays
- [ ] Country displays (if set on Lichess)
- [ ] Bio displays (if set on Lichess)
- [ ] Loading state shows while fetching stats
- [ ] Error message shows if username invalid

**Test Cases:**
- [ ] Valid username: Try "DrNykterstein" or "penguingim1"
- [ ] Invalid username: Try "nonexistentuser123456"
- [ ] Empty username: Remove username, stats should disappear

### 6. Articles with Lichess Studies
- [ ] Create sample article using `SAMPLE_ARTICLE_WITH_STUDY.md` instructions
- [ ] Study embed displays in article
- [ ] Can navigate through study chapters
- [ ] Annotations are readable
- [ ] Can play through variations
- [ ] "Open on Lichess" button works
- [ ] Embed is responsive on mobile

### 7. Navigation
- [ ] "Watch" link in navbar works
- [ ] "Tournaments" link in navbar works
- [ ] All navigation links work across all pages
- [ ] Active page highlighted in navbar
- [ ] Mobile menu works with new links

### 8. Error Handling
- [ ] Offline mode: Disable network, check error messages
- [ ] Rate limiting: Refresh pages rapidly, check graceful degradation
- [ ] Invalid data: Test with malformed Lichess usernames
- [ ] Loading states: Check spinners appear during data fetching

## Cross-Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

## Performance Testing
- [ ] Page load times < 3 seconds
- [ ] Images lazy load
- [ ] No layout shift on page load
- [ ] Smooth transitions and animations

## Accessibility
- [ ] Tab navigation works on all pages
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] Proper heading hierarchy
- [ ] Color contrast meets WCAG standards

## Final Checks
- [ ] No console errors on any page
- [ ] All links use HTTPS
- [ ] External links open in new tabs
- [ ] Forms validate properly
- [ ] Success/error messages display correctly
- [ ] Responsive design works on all screen sizes (320px - 2560px)

## Known Limitations (Not Bugs)
- Lichess API has rate limits (respect them)
- Studies must be public to embed
- Lichess stats only show if user has played games
- TV channels may have no active games in variant modes

## Post-Testing
- [ ] Update README.md with new features
- [ ] Document environment variables (if any)
- [ ] Create user guide for coaches
- [ ] Add screenshots to documentation

## Production Deployment Checklist
- [ ] All tests passed
- [ ] Database migration run on production
- [ ] Environment variables configured
- [ ] SSL/HTTPS enabled
- [ ] Analytics configured (if applicable)
- [ ] Error monitoring setup (Sentry, etc.)
- [ ] Backup strategy in place
- [ ] Rate limiting configured
