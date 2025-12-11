# Forum System Implementation Guide

## Overview
Complete forum system with user authentication, post management, and commenting functionality.

## Features Implemented

### ✅ User Authentication Integration
- Posts are linked to user profiles
- Only authenticated users can create posts and comments
- Users must sign in to participate

### ✅ Post Management
- **Create**: Authenticated users can create new discussions
- **Read**: Anyone can view posts (public access)
- **Update**: Post authors can edit their own posts
- **Delete**: Post authors can delete their own posts
- View counter increments on each post view

### ✅ Commenting System
- Users can comment on posts
- Edit and delete own comments
- Comments show author information
- Real-time comment posting without page reload
- Nested user profiles in comments

### ✅ Row Level Security (RLS)
- Posts: Public read, authenticated create, author-only update/delete
- Comments: Public read, authenticated create, author-only update/delete  
- Profiles: Public read, owner-only update

## Database Setup

### 1. Run the Migration
Execute the migration script in Supabase SQL Editor:

```sql
-- Run this file first
scripts/forum-migration.sql
```

This creates:
- `forum_posts` table with user relationships
- `forum_comments` table for replies
- `profiles` table for user information
- RLS policies for security
- Helper functions for view counting and auto-profile creation

### 2. Seed Test Data (Optional)
After signing up at least one user:

```sql
-- Run this file second
scripts/seed-forum-with-users.sql
```

This creates sample posts for testing.

## File Structure

```
src/
├── app/
│   └── forum/
│       ├── page.tsx                    # Forum list page
│       ├── new/
│       │   └── page.tsx                # Create new post
│       └── [id]/
│           ├── page.tsx                # View post & comments
│           └── edit/
│               └── page.tsx            # Edit post (author only)
│
└── components/
    └── forum/
        ├── NewPostForm.tsx             # Create post form
        ├── EditPostForm.tsx            # Edit post form
        ├── PostDeleteButton.tsx        # Delete post button
        └── CommentSection.tsx          # Comments with CRUD

scripts/
├── forum-migration.sql                 # Database schema
└── seed-forum-with-users.sql          # Sample data
```

## Usage

### Creating a Post
1. User must be signed in
2. Navigate to `/forum`
3. Click "New Discussion" button
4. Fill in title (5-200 chars) and content (20-10,000 chars)
5. Submit to create

### Editing a Post
1. Navigate to the post
2. Click "Edit" button (only visible to author)
3. Modify title or content
4. Save changes

### Deleting a Post
1. Navigate to the post
2. Click "Delete" button (only visible to author)
3. Confirm deletion
4. Post and all comments are deleted (CASCADE)

### Commenting
1. User must be signed in
2. Navigate to any post
3. Type comment in the text area
4. Click "Post Comment"
5. Edit or delete own comments using action buttons

## Security Features

### Authentication Checks
- Server-side user validation on all mutations
- Redirect to sign-in for unauthorized access
- Client-side conditional rendering of actions

### RLS Policies
```sql
-- Posts
- SELECT: public (anyone can read)
- INSERT: authenticated (user_id must match auth.uid())
- UPDATE: author only (auth.uid() = user_id)
- DELETE: author only (auth.uid() = user_id)

-- Comments  
- SELECT: public
- INSERT: authenticated (user_id must match auth.uid())
- UPDATE: author only
- DELETE: author only
```

### Data Validation
- Title: 5-200 characters
- Content: 20-10,000 characters
- User IDs automatically set server-side
- SQL injection protection via parameterized queries

## API Endpoints

### Forum Posts
```typescript
// List all posts with profiles
supabase
  .from('forum_posts')
  .select('*, profiles(id, full_name, avatar_url)')
  .order('created_at', { ascending: false })

// Get single post with comments
supabase
  .from('forum_posts')
  .select('*, profiles(id, full_name, avatar_url)')
  .eq('id', postId)
  .single()

// Create post
supabase
  .from('forum_posts')
  .insert({ user_id, title, content })

// Update post
supabase
  .from('forum_posts')
  .update({ title, content })
  .eq('id', postId)

// Delete post
supabase
  .from('forum_posts')
  .delete()
  .eq('id', postId)
```

### Comments
```typescript
// Get comments for post
supabase
  .from('forum_comments')
  .select('*, profiles(id, full_name, avatar_url)')
  .eq('post_id', postId)
  .order('created_at', { ascending: true })

// Create comment
supabase
  .from('forum_comments')
  .insert({ post_id, user_id, content })

// Update comment
supabase
  .from('forum_comments')
  .update({ content })
  .eq('id', commentId)

// Delete comment
supabase
  .from('forum_comments')
  .delete()
  .eq('id', commentId)
```

## Testing Checklist

- [ ] Run forum-migration.sql in Supabase
- [ ] Sign up a test user account
- [ ] Run seed-forum-with-users.sql
- [ ] View forum list - should show 8 posts
- [ ] Click on a post - should increment view count
- [ ] Create new post (requires sign in)
- [ ] Edit your own post
- [ ] Try to edit someone else's post (should not see button)
- [ ] Delete your own post
- [ ] Add a comment to a post
- [ ] Edit your own comment
- [ ] Delete your own comment
- [ ] Sign out and verify you can still read posts
- [ ] Sign out and verify you cannot comment

## Future Enhancements

Potential features to add:
- [ ] Post categories/tags
- [ ] Search functionality
- [ ] Pagination for posts and comments
- [ ] Upvoting/downvoting
- [ ] User reputation system
- [ ] Moderator roles
- [ ] Report/flag inappropriate content
- [ ] Email notifications
- [ ] Rich text editor
- [ ] Image uploads
- [ ] Pin important posts
- [ ] Lock posts to prevent new comments

## Troubleshooting

### Posts not showing user names
- Check that profiles table has data
- Verify RLS policies on profiles table
- Ensure the query includes the profiles join

### Can't create posts
- Verify user is signed in
- Check RLS policies on forum_posts
- Ensure user_id is being set correctly

### Comments not appearing
- Run migration to create forum_comments table
- Check RLS policies
- Verify foreign key constraints

### 404 on post pages
- Ensure post exists in database
- Check that post_id is valid UUID
- Verify RLS SELECT policy allows public access
