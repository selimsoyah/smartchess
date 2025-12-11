-- Fix profile auto-creation for new user signups
-- This ensures new users get a profile automatically

-- First, drop the old trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a new, simpler function that works with any profile structure
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  username TEXT;
BEGIN
  -- Extract username from email (part before @)
  username := split_part(NEW.email, '@', 1);
  
  -- Try to insert the profile - ignore if it already exists
  BEGIN
    INSERT INTO public.profiles (id)
    VALUES (NEW.id)
    ON CONFLICT (id) DO NOTHING;
    
    -- If full_name column exists, update it
    UPDATE public.profiles 
    SET full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', username)
    WHERE id = NEW.id AND full_name IS NULL;
  EXCEPTION
    WHEN OTHERS THEN
      -- If columns don't exist, just insert the ID
      INSERT INTO public.profiles (id)
      VALUES (NEW.id)
      ON CONFLICT (id) DO NOTHING;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill existing users who don't have profiles
INSERT INTO public.profiles (id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- Update profiles to have names if full_name column exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'full_name'
  ) THEN
    UPDATE public.profiles p
    SET full_name = split_part((SELECT email FROM auth.users WHERE id = p.id), '@', 1)
    WHERE full_name IS NULL OR full_name = '';
  END IF;
  
  RAISE NOTICE 'Profile auto-creation fixed! All users should now have profiles.';
END $$;
