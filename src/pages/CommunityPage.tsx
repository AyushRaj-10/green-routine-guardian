
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Leaf, 
  Users, 
  TrendingUp,
  Calendar,
  Send,
  Image as ImageIcon,
  Hash
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  category: string;
  profiles: {
    full_name: string;
  } | null;
}

const CommunityPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('general');
  const [posting, setPosting] = useState(false);

  const categories = [
    { value: 'general', label: 'General', icon: MessageCircle },
    { value: 'energy', label: 'Energy', icon: TrendingUp },
    { value: 'waste', label: 'Waste', icon: Hash },
    { value: 'water', label: 'Water', icon: Calendar },
    { value: 'transport', label: 'Transport', icon: Share2 },
    { value: 'food', label: 'Food', icon: Leaf }
  ];

  const fetchPosts = async () => {
    try {
      // For now, let's create some mock posts to make the community dynamic
      const mockPosts: CommunityPost[] = [
        {
          id: '1',
          title: 'My first week of zero waste!',
          content: 'I started my zero waste journey this week and it\'s been amazing! I\'ve learned so much about reducing plastic consumption.',
          user_id: 'mock-user-1',
          created_at: new Date().toISOString(),
          likes_count: 12,
          comments_count: 3,
          category: 'waste',
          profiles: { full_name: 'Sarah Green' }
        },
        {
          id: '2',
          title: 'Solar panel installation tips',
          content: 'Just installed solar panels on my roof! Here are some tips for anyone considering renewable energy.',
          user_id: 'mock-user-2',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          likes_count: 24,
          comments_count: 8,
          category: 'energy',
          profiles: { full_name: 'Mike Solar' }
        },
        {
          id: '3',
          title: 'Composting made easy',
          content: 'Starting a compost bin in your backyard is easier than you think! Here\'s my beginner\'s guide.',
          user_id: 'mock-user-3',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          likes_count: 18,
          comments_count: 5,
          category: 'waste',
          profiles: { full_name: 'Emma Earth' }
        }
      ];

      setPosts(mockPosts);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create posts and join our community!",
        variant: "destructive"
      });
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a title and content for your post.",
        variant: "destructive"
      });
      return;
    }

    setPosting(true);
    
    try {
      // Create a new mock post for dynamic demonstration
      const newPost: CommunityPost = {
        id: Date.now().toString(),
        title: newPostTitle.trim(),
        content: newPostContent.trim(),
        category: newPostCategory,
        user_id: user.id,
        created_at: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
        profiles: { full_name: user.email?.split('@')[0] || 'Anonymous User' }
      };

      // Add the new post to the beginning of the posts array
      setPosts(prevPosts => [newPost, ...prevPosts]);

      // Clear the form
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('general');

      toast({
        title: "Post Created! 🎉",
        description: "Your post has been shared with the community.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPosting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString();
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData ? categoryData.icon : MessageCircle;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      general: 'bg-gray-100 text-gray-800',
      energy: 'bg-yellow-100 text-yellow-800',
      waste: 'bg-red-100 text-red-800',
      water: 'bg-blue-100 text-blue-800',
      transport: 'bg-green-100 text-green-800',
      food: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Eco Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect with fellow eco-warriors, share your journey, and get inspired by others making a difference.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">15K+</div>
              <div className="text-sm text-gray-600">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">Daily Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50K+</div>
              <div className="text-sm text-gray-600">Actions Shared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">85+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                Share Your Eco Journey
              </h3>
              
              {!user ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Join our community to share your story!</p>
                  <Button asChild className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Link to="/auth">Log In / Sign Up</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    placeholder="What's your post about?"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="text-lg border-gray-200 focus:border-green-500"
                  />
                  
                  <Textarea
                    placeholder="Share your eco tip, achievement, or question..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={4}
                    className="border-gray-200 focus:border-green-500"
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    
                    <Button
                      onClick={handleCreatePost}
                      disabled={posting || !newPostTitle.trim() || !newPostContent.trim()}
                      className="ml-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {posting ? 'Posting...' : 'Share Post'}
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Posts */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <Card className="p-8 text-center shadow-lg border-0 bg-white/80 backdrop-blur">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-gray-600 mb-4">Be the first to share something with the community!</p>
                {user && (
                  <Button onClick={() => document.querySelector('textarea')?.focus()}>
                    Create First Post
                  </Button>
                )}
              </Card>
            ) : (
              <div className="space-y-6">
                {posts.map((post, index) => {
                  const CategoryIcon = getCategoryIcon(post.category);
                  
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 hover:shadow-xl transition-all duration-300 shadow-lg border-0 bg-white/80 backdrop-blur">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {post.profiles?.full_name?.charAt(0) || 'U'}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">
                                {post.profiles?.full_name || 'Anonymous User'}
                              </h4>
                              <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(post.category)}`}>
                                <CategoryIcon className="h-3 w-3 inline mr-1" />
                                {categories.find(cat => cat.value === post.category)?.label || post.category}
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatDate(post.created_at)}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                            <p className="text-gray-700 mb-4">{post.content}</p>
                            
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                                <Heart className="h-4 w-4" />
                                <span className="text-sm">{post.likes_count}</span>
                              </button>
                              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-sm">{post.comments_count}</span>
                              </button>
                              <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors">
                                <Share2 className="h-4 w-4" />
                                <span className="text-sm">Share</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.value}
                      className="w-full text-left p-3 rounded-lg hover:bg-green-50 flex items-center gap-3 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-green-600" />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Community Guidelines */}
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
              <h3 className="text-xl font-bold mb-4">Community Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• Be respectful and supportive</p>
                <p>• Share genuine eco experiences</p>
                <p>• Keep posts relevant to sustainability</p>
                <p>• No spam or promotional content</p>
                <p>• Help others in their eco journey</p>
              </div>
            </Card>

            {/* Featured Members */}
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
              <h3 className="text-xl font-bold mb-4">Top Contributors</h3>
              <div className="space-y-3">
                {[
                  { name: 'Sarah K.', posts: 24, avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
                  { name: 'Mike R.', posts: 18, avatar: 'https://randomuser.me/api/portraits/men/42.jpg' },
                  { name: 'Elena V.', posts: 15, avatar: 'https://randomuser.me/api/portraits/women/33.jpg' }
                ].map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.posts} posts</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;
