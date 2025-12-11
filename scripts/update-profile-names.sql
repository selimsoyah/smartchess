-- Update profiles to have default names based on email
-- Run this to set names for users who don't have one

UPDATE profiles
SET full_name = split_part((SELECT email FROM auth.users WHERE id = profiles.id), '@', 1)
WHERE full_name IS NULL OR full_name = '';

-- Alternatively, if you want to set a specific name for your account:
-- UPDATE profiles SET full_name = 'Your Name Here' WHERE id = (SELECT id FROM auth.users WHERE email = 'your@email.com');
