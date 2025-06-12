
-- First, let's ensure the profiles table has the correct structure
-- and then create the foreign key relationship

-- Add foreign key constraint to link community_posts.user_id to profiles.id
ALTER TABLE community_posts 
ADD CONSTRAINT fk_community_posts_user_id 
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);
