
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, MessageCircle, Heart, Globe } from 'lucide-react';

const CommunityPreview = () => {
  const stats = [
    { icon: Users, label: 'Active Members', value: '15,000+' },
    { icon: MessageCircle, label: 'Daily Posts', value: '500+' },
    { icon: Heart, label: 'Actions Shared', value: '50,000+' },
    { icon: Globe, label: 'Countries', value: '85+' },
  ];

  const recentPosts = [
    {
      id: 1,
      user: 'Sarah K.',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      content: 'Just completed my first plastic-free week challenge! Feeling amazing about the small changes making a big impact. 🌱',
      likes: 24,
      time: '2h ago'
    },
    {
      id: 2,
      user: 'Mike R.',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      content: 'Sharing my water conservation tips that helped me save 40% on my monthly usage. Every drop counts! 💧',
      likes: 18,
      time: '4h ago'
    },
    {
      id: 3,
      user: 'Elena V.',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      content: 'Our community garden project is growing! 12 families now growing their own vegetables. 🥕',
      likes: 31,
      time: '6h ago'
    }
  ];

  return (
    <section id="community-preview" className="section bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fadeInUp">Join Our Global Community</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fadeInUp">
            Connect with like-minded individuals making a difference. Share your journey, get inspired, and grow together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <stat.icon className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center lg:text-left">
              <Button size="lg" asChild className="bg-blue-500 hover:bg-blue-600">
                <Link to="/community">Explore Community</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Recent Community Posts</h3>
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <img 
                    src={post.avatar} 
                    alt={post.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{post.user}</h4>
                      <span className="text-xs text-gray-500">{post.time}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{post.content}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPreview;
