# Deployment Guide for Smart Chess Academy

## Prerequisites
1. Vercel account (free tier works fine)
2. Supabase project set up with all tables
3. GitHub repository connected

## Steps to Deploy

### 1. Prepare Supabase
Make sure you have run all the SQL scripts in the `scripts/` folder in your Supabase SQL Editor:
- `supabase-schema.sql` - Main database schema
- `update-news-to-events.sql` - Events system setup
- Other migration scripts as needed

### 2. Get Supabase Credentials
From your Supabase project dashboard:
1. Go to Settings > API
2. Copy your `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
3. Copy your `anon/public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" > "Project"
3. Import your GitHub repository: `selimsoyah/smartchess`
4. Configure the project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

6. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

### 4. Configure Environment Variables in Vercel
After deployment, you can also add/update environment variables:
1. Go to your project in Vercel Dashboard
2. Settings > Environment Variables
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy if needed

### 5. Post-Deployment Checklist
- ✅ Homepage loads correctly
- ✅ Lichess integrations work (puzzles, live games)
- ✅ Events display from database
- ✅ Forum accessible
- ✅ Contact form works
- ✅ Authentication works (sign up/sign in)
- ✅ Social media links work
- ✅ Map displays correctly

### 6. Custom Domain (Optional)
1. In Vercel Dashboard > Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Important Notes

- **No .env file in repository**: Environment variables are set in Vercel Dashboard
- **Build time**: First deployment takes 2-3 minutes
- **Automatic deployments**: Every push to `main` branch triggers new deployment
- **Preview deployments**: Pull requests get automatic preview URLs

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set correctly

### Database Connection Issues
- Verify Supabase URL and key are correct
- Check Supabase project is not paused
- Ensure RLS policies are configured correctly

### Lichess Features Not Working
- These use public APIs and should work without configuration
- If issues persist, check browser console for CORS errors

## Support
If you encounter issues, check:
- Vercel build logs
- Browser console for errors
- Supabase logs for database issues
