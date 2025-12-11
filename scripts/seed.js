const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n')

  // Check for existing posts first
  const { data: existingPosts } = await supabase
    .from('forum_posts')
    .select('id')
    .limit(1)

  if (existingPosts && existingPosts.length > 0) {
    console.log('⚠️  Forum already has posts. Skipping forum seed.')
  } else {
    // Get first user or use a placeholder
    const { data: { users } } = await supabase.auth.admin.listUsers()
    
    let userId = null
    if (users && users.length > 0) {
      userId = users[0].id
      console.log(`✅ Found user: ${users[0].email}`)
    } else {
      console.log('⚠️  No users found. Using NULL for user_id (you can update later)')
    }

    // Seed Forum Posts
    console.log('\n📝 Seeding forum discussions...')
    const forumPosts = [
      {
        user_id: userId,
        title: 'Best opening for beginners?',
        content: 'I\'ve been playing chess for about 3 months now and I\'m struggling to find a good opening repertoire. I currently play e4 as white but I get confused after Black\'s various responses. What would you recommend for a beginner to learn? Should I stick with one opening or learn multiple?',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        title: 'How to improve tactical vision?',
        content: 'I keep missing simple tactics in my games, even ones I can solve easily in puzzles. Does anyone have advice on how to translate puzzle skills into actual games? I\'m rated around 1200 and feel stuck.',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        title: 'Analyzing my first tournament game',
        content: 'Just played my first OTB tournament yesterday! Lost all 5 games but learned so much. In one game, I had a winning position but blundered a piece. How do you deal with tournament nerves and time pressure?',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        title: 'London System - overpowered or overrated?',
        content: 'I\'ve been facing the London System a lot lately as Black. It seems like White just plays the same setup regardless of what Black does. What\'s the best way to counter it? Is it really as strong as everyone says?',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        title: 'Recommended chess books for intermediate players?',
        content: 'I\'m around 1500 rated and looking to improve my understanding of strategy and positional play. I\'ve heard good things about "My System" by Nimzowitsch and "The Amateur\'s Mind" by Silman. What books helped you break through to the next level?',
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        title: 'King\'s Gambit in 2025 - still playable?',
        content: 'I\'ve always loved aggressive, attacking chess. Is the King\'s Gambit still viable at club level? I know it\'s considered dubious at master level, but I\'m only 1400 rated.',
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        title: 'Magnus vs Hikaru - who\'s better?',
        content: 'Settled debate or ongoing discussion? Magnus has the classical dominance but Hikaru kills it in speed chess.',
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        title: 'Online vs OTB chess - big difference?',
        content: 'I\'m rated 1800 online but only 1400 OTB. Is this normal? I find it so much harder to calculate without being able to pre-move.',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    const { data: insertedPosts, error: postsError } = await supabase
      .from('forum_posts')
      .insert(forumPosts)
      .select()

    if (postsError) {
      console.error('❌ Error seeding forum posts:', postsError.message)
    } else {
      console.log(`✅ Added ${insertedPosts?.length || 0} forum discussions`)
    }
  }

  // Seed News
  console.log('\n📰 Seeding news items...')
  const newsItems = [
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      title: 'Academy Student Wins Local Tournament',
      content: 'Congratulations to Sarah Chen, one of our intermediate students, who won first place in the City Chess Championship last weekend! Sarah scored 5.5/6 points in the U1800 section.'
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      title: 'New Group Classes Starting in January',
      content: 'We\'re excited to announce new group classes starting January 15th! Classes will be available for all skill levels:\n\n- Beginner (Rated under 1000): Tuesdays 6-7:30 PM\n- Intermediate (1000-1600): Wednesdays 6-7:30 PM\n- Advanced (1600+): Thursdays 7-8:30 PM'
    },
    {
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      title: 'Chess World Championship Update',
      content: 'The 2025 World Chess Championship has reached the halfway point! Join us for a watch party this Friday at 7 PM.'
    },
    {
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      title: 'Coach Martinez Achieves IM Title',
      content: 'Huge congratulations to our coach, Alex Martinez, who has earned the International Master title!'
    },
    {
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      title: 'Holiday Blitz Tournament - Results',
      content: 'Our annual Holiday Blitz Tournament was a huge success with 32 participants! 🥇 David Kim (5/5) 🥈 Jennifer Lee (4/5) 🥉 Marcus Thompson (4/5)'
    }
  ]

  const { data: insertedNews, error: newsError } = await supabase
    .from('news_facts')
    .insert(newsItems)
    .select()

  if (newsError) {
    console.error('❌ Error seeding news:', newsError.message)
  } else {
    console.log(`✅ Added ${insertedNews?.length || 0} news items`)
  }

  console.log('\n🎉 Database seeding complete!')
  console.log('\n📍 Visit your site to see the new content:')
  console.log('   - Forum: http://localhost:3000/forum')
  console.log('   - News: http://localhost:3000/news')
}

seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  })
