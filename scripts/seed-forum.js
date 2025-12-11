const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedForumDirect() {
  console.log('🌱 Seeding forum with direct SQL...\n')

  // Delete existing posts first
  console.log('🗑️  Clearing existing posts...')
  const { error: deleteError } = await supabase
    .from('forum_posts')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

  if (deleteError) {
    console.log('Note: Could not clear existing posts:', deleteError.message)
  }

  // Seed Forum Posts WITHOUT user_id (will show as Anonymous)
  console.log('📝 Adding forum discussions...')
  const forumPosts = [
    {
      user_id: null,
      title: 'Best opening for beginners?',
      content: 'I\'ve been playing chess for about 3 months now and I\'m struggling to find a good opening repertoire. I currently play e4 as white but I get confused after Black\'s various responses. What would you recommend for a beginner to learn? Should I stick with one opening or learn multiple?',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'How to improve tactical vision?',
      content: 'I keep missing simple tactics in my games, even ones I can solve easily in puzzles. Does anyone have advice on how to translate puzzle skills into actual games? I\'m rated around 1200 and feel stuck.',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'Analyzing my first tournament game',
      content: 'Just played my first OTB tournament yesterday! Lost all 5 games but learned so much. In one game, I had a winning position but blundered a piece. How do you deal with tournament nerves and time pressure?',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'London System - overpowered or overrated?',
      content: 'I\'ve been facing the London System a lot lately as Black. It seems like White just plays the same setup regardless of what Black does. What\'s the best way to counter it? Is it really as strong as everyone says?',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'Recommended chess books for intermediate players?',
      content: 'I\'m around 1500 rated and looking to improve my understanding of strategy and positional play. I\'ve heard good things about "My System" by Nimzowitsch and "The Amateur\'s Mind" by Silman. What books helped you break through to the next level?',
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'Should I learn to play the endgame first?',
      content: 'My coach told me to study endgames before focusing on openings, but that seems backwards to me. Don\'t I need to know openings to get good positions? What do you think is the right learning order?',
      created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'King\'s Gambit in 2025 - still playable?',
      content: 'I\'ve always loved aggressive, attacking chess. Is the King\'s Gambit still viable at club level? I know it\'s considered dubious at master level, but I\'m only 1400 rated. Will it help me develop my tactical skills?',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'How often should I analyze my games?',
      content: 'I play about 5-10 games per week on Lichess. Should I be analyzing every single game or just the important ones? I find analysis exhausting and sometimes I just want to play more games instead.',
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'Dealing with aggressive players',
      content: 'In my club, there\'s this player who always plays super aggressive with early queen attacks and pawn storms. I know the attacks aren\'t sound, but I always panic and make mistakes. Any tips for staying calm against aggressive play?',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'Online vs OTB chess - big difference?',
      content: 'I\'m rated 1800 online but only 1400 OTB. Is this normal? I find it so much harder to calculate without being able to pre-move and I get nervous with someone sitting across from me. How do I bridge this gap?',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'Classical vs Rapid for improvement',
      content: 'Should I focus on classical time controls (15+10) or rapid (10+0) if I want to improve faster? I enjoy rapid more because I can play more games, but people say classical is better for learning.',
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'Magnus vs Hikaru - who\'s better?',
      content: 'Settled debate or ongoing discussion? Magnus has the classical dominance but Hikaru kills it in speed chess. If they played 100 games in each time control, who wins overall?',
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'Chess blindness - how to overcome it?',
      content: 'Sometimes I just don\'t see moves that are right in front of me. Like I\'ll miss a hanging piece or a simple checkmate. Does this get better with practice?',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'Caro-Kann vs French Defense',
      content: 'Both seem like solid, strategic defenses against e4. Which one should I learn? I like positional play and don\'t want to memorize too many sharp lines.',
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: null,
      title: 'When to trade pieces?',
      content: 'I struggle with knowing when to trade pieces. Sometimes I trade everything and get a boring position, other times I avoid trades and get mated. What are the key principles?',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  const { data: insertedPosts, error: postsError } = await supabase
    .from('forum_posts')
    .insert(forumPosts)
    .select()

  if (postsError) {
    console.error('❌ Error seeding forum posts:', postsError.message)
    console.error('Full error:', postsError)
  } else {
    console.log(`✅ Successfully added ${insertedPosts?.length || 0} forum discussions!`)
  }

  // Verify the posts were inserted
  const { data: verifyPosts, error: verifyError } = await supabase
    .from('forum_posts')
    .select('id, title')
    .order('created_at', { ascending: false })

  if (verifyError) {
    console.error('❌ Error verifying posts:', verifyError.message)
  } else {
    console.log(`\n✅ Verified: Found ${verifyPosts?.length || 0} total posts in database`)
    if (verifyPosts && verifyPosts.length > 0) {
      console.log('\nLatest posts:')
      verifyPosts.slice(0, 5).forEach((post, i) => {
        console.log(`  ${i + 1}. ${post.title}`)
      })
    }
  }

  console.log('\n🎉 Forum seeding complete!')
  console.log('\n📍 Visit http://localhost:3000/forum to see the discussions')
}

seedForumDirect()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  })
