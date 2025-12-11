-- Migration: Add Lichess username support to profiles
-- Date: 2025-12-03
-- Description: Allow users to link their Lichess accounts

-- Add lichess_username column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS lichess_username TEXT;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_lichess_username 
ON profiles(lichess_username);

-- Add comment for documentation
COMMENT ON COLUMN profiles.lichess_username IS 'User''s Lichess.org username for account linking and stats display';

-- Verification query
-- SELECT id, email, full_name, lichess_username FROM profiles LIMIT 5;
