
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Image, Send, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  likes_count: number;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name?: string;
    email?: string;
  };
}

const CommunityPage = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<CommunityPost[]>([]);
  const [newStory, setNewStory] = useState({ title: '', content: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCommunityPosts();
  }, []);

  const fetchCommunityPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching community posts:', error);
      toast({
        title: "Error",
        description: "Failed to load community posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStory = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to share your story",
        variant: "destructive"
      });
      return;
    }

    if (!newStory.title || !newStory.content) {
      toast({
        title: "Missing information",
        description: "Please fill in both title and content",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('community_posts')
        .insert([
          {
            user_id: user.id,
            title: newStory.title,
            content: newStory.content,
            image_url: newStory.image || null
          }
        ]);

      if (error) throw error;

      toast({
        title: "Story shared!",
        description: "Your story has been posted to the community"
      });

      setNewStory({ title: '', content: '', image: '' });
      fetchCommunityPosts();
    } catch (error) {
      console.error('Error submitting story:', error);
      toast({
        title: "Error",
        description: "Failed to share your story",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (storyId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like posts",
        variant: "destructive"
      });
      return;
    }

    try {
      const story = stories.find(s => s.id === storyId);
      if (!story) return;

      const { error } = await supabase
        .from('community_posts')
        .update({ likes_count: story.likes_count + 1 })
        .eq('id', storyId);

      if (error) throw error;

      setStories(stories.map(story => 
        story.id === storyId 
          ? { ...story, likes_count: story.likes_count + 1 }
          : story
      ));
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Error",
        description: "Failed to like the post",
        variant: "destructive"
      });
    }
  };

  const handleDeleteStory = async (storyId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', storyId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Story deleted",
        description: "Your story has been removed"
      });

      setStories(stories.filter(story => story.id !== storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
      toast({
        title: "Error",
        description: "Failed to delete story",
        variant: "destructive"
      });
    }
  };

  const getUserDisplayName = (post: CommunityPost) => {
    if (post.profiles?.full_name) return post.profiles.full_name;
    if (post.profiles?.email) return post.profiles.email.split('@')[0];
    return 'Anonymous User';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50">
        <Navbar />
        <div className="pt-28 pb-16 text-center">
          <p>Loading community posts...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Community Stories</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your eco-friendly journey and inspire others in our community
            </p>
          </motion.div>

          {/* Share Your Story Form */}
          {user ? (
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-green-600" />
                Share Your Eco Story
              </h3>
              <div className="space-y-4">
                <input 
                  type="text"
                  placeholder="Give your story a compelling title..."
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Share your journey, tips, or experiences with sustainable living..."
                  value={newStory.content}
                  onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
                <input 
                  type="url"
                  placeholder="Add an image URL (optional)"
                  value={newStory.image}
                  onChange={(e) => setNewStory({ ...newStory, image: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="flex items-center justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Add Photo
                  </Button>
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={handleSubmitStory}
                    disabled={!newStory.title || !newStory.content || submitting}
                  >
                    {submitting ? 'Sharing...' : 'Share Your Story'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
              <p className="text-gray-600 mb-4">Log in to share your eco-friendly stories and connect with others</p>
              <Button onClick={() => window.location.href = '/auth'}>
                Sign In to Share
              </Button>
            </motion.div>
          )}

          {/* Community Stories */}
          <div className="space-y-8">
            {stories.map((story, index) => (
              <motion.div 
                key={story.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-bold">
                          {getUserDisplayName(story).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{getUserDisplayName(story)}</p>
                        <p className="text-xs text-gray-500">
                          Posted {new Date(story.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {user && story.user_id === user.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStory(story.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                  <p className="text-gray-600 mb-4">{story.content}</p>
                  
                  {story.image_url && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={story.image_url} 
                        alt={story.title} 
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                        onClick={() => handleLike(story.id)}
                      >
                        <Heart className="w-5 h-5" />
                        <span>{story.likes_count}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>Comment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {stories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No community posts yet. Be the first to share your story!</p>
              {!user && (
                <Button onClick={() => window.location.href = '/auth'}>
                  Sign In to Share
                </Button>
              )}
            </div>
          )}

          {/* Community Stats */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Community Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold mb-2">{stories.length}</p>
                <p className="text-green-100">Stories Shared</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">{stories.reduce((sum, story) => sum + story.likes_count, 0)}</p>
                <p className="text-green-100">Total Likes</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">
                  {new Set(stories.map(story => story.user_id)).size}
                </p>
                <p className="text-green-100">Active Members</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityPage;
