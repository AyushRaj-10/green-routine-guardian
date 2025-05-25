
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Image, Send } from 'lucide-react';

const CommunityPage = () => {
  const [stories, setStories] = useState([
    {
      id: '1',
      user: {
        name: 'Jennifer L.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        level: 'Gold'
      },
      title: 'My Energy Saving Journey',
      content: "I have managed to reduce my electricity usage by 30% this month by implementing simple changes in my daily routine. I started by replacing all light bulbs with LED alternatives, setting up timers for electronics, and being more mindful about my energy consumption. The difference is noticeable both for the environment and my utility bills!",
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80',
      postedAt: '3 days ago',
      likes: 42,
      comments: 12
    },
    {
      id: '2',
      user: {
        name: 'Robert W.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        level: 'Silver'
      },
      title: 'Creating a Sustainable Home',
      content: "I have transformed my living space into an eco-friendly environment. Here are some tips on how you can do the same: use natural cleaning products, set up rainwater collection, compost food waste, and invest in energy-efficient appliances. Small changes really do add up to make a big difference!",
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80',
      postedAt: '1 week ago',
      likes: 78,
      comments: 24
    },
    {
      id: '3',
      user: {
        name: 'Ashley T.',
        avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        level: 'Gold'
      },
      title: 'Park Cleanup Success',
      content: 'Our community came together to clean up Jefferson Park last weekend. We collected over 50 bags of trash and recyclables. It was amazing to see so many people come together for this cause. We found everything from plastic bottles to abandoned furniture. Looking forward to organizing more cleanup events in the future!',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80',
      postedAt: '2 weeks ago',
      likes: 105,
      comments: 36
    },
    {
      id: '4',
      user: {
        name: 'Mark D.',
        avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
        level: 'Bronze'
      },
      title: 'My First Tree Planting Experience',
      content: 'I participated in the tree planting challenge this month and it was such a rewarding experience! I planted an oak tree in my local community garden. The process was easier than I expected, and I learned so much about proper tree care. Already looking forward to watching it grow over the coming years.',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
      postedAt: '3 weeks ago',
      likes: 67,
      comments: 18
    }
  ]);

  const [newStory, setNewStory] = useState({ title: '', content: '', image: '' });

  const handleSubmitStory = () => {
    if (newStory.title && newStory.content) {
      const story = {
        id: (stories.length + 1).toString(),
        user: {
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
          level: 'Bronze'
        },
        title: newStory.title,
        content: newStory.content,
        image: newStory.image || '',
        postedAt: 'Just now',
        likes: 0,
        comments: 0
      };
      setStories([story, ...stories]);
      setNewStory({ title: '', content: '', image: '' });
    }
  };

  const handleLike = (storyId: string) => {
    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, likes: story.likes + 1 }
        : story
    ));
  };

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
                  disabled={!newStory.title || !newStory.content}
                >
                  Share Your Story
                </Button>
              </div>
            </div>
          </motion.div>

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
                      <img 
                        src={story.user.avatar} 
                        alt={story.user.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{story.user.name}</p>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            story.user.level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                            story.user.level === 'Silver' ? 'bg-gray-100 text-gray-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {story.user.level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Posted {story.postedAt}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                  <p className="text-gray-600 mb-4">{story.content}</p>
                  
                  {story.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={story.image} 
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
                        <span>{story.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>{story.comments}</span>
                      </button>
                    </div>
                    <Button size="sm" variant="outline" className="text-green-600 border-green-500 hover:bg-green-50">
                      Comment
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
                <p className="text-3xl font-bold mb-2">247</p>
                <p className="text-green-100">Stories Shared</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">1,540</p>
                <p className="text-green-100">Community Members</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">89</p>
                <p className="text-green-100">Environmental Projects</p>
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
