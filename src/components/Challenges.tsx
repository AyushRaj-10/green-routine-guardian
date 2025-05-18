
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const challenges = [
  {
    id: 1,
    title: 'Plastic-Free Week',
    description: 'Avoid using single-use plastics for an entire week.',
    difficulty: 'Medium',
    points: 250,
    participants: 1240,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
    category: 'waste',
    status: 'active',
  },
  {
    id: 2,
    title: '30-Day Water Conservation',
    description: 'Reduce your water consumption through simple daily actions.',
    difficulty: 'Easy',
    points: 150,
    participants: 2187,
    image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=800&q=80',
    category: 'water',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Zero Waste Month',
    description: 'Minimize your household waste and aim for zero landfill contribution.',
    difficulty: 'Hard',
    points: 500,
    participants: 943,
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800&q=80',
    category: 'food',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Plant-Based Diet Challenge',
    description: 'Adopt a plant-based diet for two weeks to reduce carbon footprint.',
    difficulty: 'Medium',
    points: 200,
    participants: 2120,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
    category: 'transport',
    status: 'active',
  },
];

const topUsers = [
  {
    id: 1,
    name: 'Jennifer L.',
    points: 3450,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    level: 'Gold',
  },
  {
    id: 2,
    name: 'Robert W.',
    points: 3280,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    level: 'Gold',
  },
  {
    id: 3,
    name: 'Ashley T.',
    points: 3105,
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    level: 'Silver',
  },
  {
    id: 4,
    name: 'Mark D.',
    points: 2890,
    avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
    level: 'Silver',
  },
  {
    id: 5,
    name: 'Sophia L.',
    points: 2745,
    avatar: 'https://randomuser.me/api/portraits/women/38.jpg',
    level: 'Silver',
  },
];

const Challenges = () => {
  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const levelColor = (level: string) => {
    switch (level) {
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Silver':
        return 'bg-gray-100 text-gray-800';
      case 'Bronze':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="challenges" className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fadeInUp">Challenges & Leaderboard</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fadeInUp">
            Join challenges, earn points, and compete with others to make a bigger impact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Active & Upcoming Challenges</h3>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={challenge.image} 
                      alt={challenge.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(challenge.status)}`}>
                        {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{challenge.title}</h4>
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{challenge.participants} participants</span>
                      <span className="font-bold text-green-500">{challenge.points} points</span>
                    </div>
                    <Button className="w-full mt-4" asChild>
                      <Link to="/challenges">
                        {challenge.status === 'active' ? 'Join Challenge' : 
                        challenge.status === 'upcoming' ? 'Get Notified' : 'View Results'}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to="/challenges">View All Challenges</Link>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Leaderboard</h3>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-medium">Top Contributors</span>
                <span className="text-sm text-gray-500">This Month</span>
              </div>
              
              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="mr-4 font-bold text-lg text-gray-500 w-6 text-center">
                      {index + 1}
                    </div>
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{user.name}</span>
                        <span className="font-bold text-green-500">{user.points}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${levelColor(user.level)}`}>
                          {user.level}
                        </span>
                        <span className="text-xs text-gray-500">{index === 0 ? '1st' : index === 1 ? '2nd' : index === 2 ? '3rd' : `${index+1}th`}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-sm text-gray-500">Your Rank</span>
                    <span className="font-bold">12th</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">Your Points</span>
                    <span className="font-bold text-green-500">1,850</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6">View Full Leaderboard</Button>
            </div>
            
            <div className="bg-green-50 rounded-xl shadow-lg p-6 mt-6">
              <h4 className="font-bold text-lg mb-4">Rewards</h4>
              <p className="text-gray-600 mb-4">Earn points by completing challenges and get exclusive rewards!</p>
              
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-full mr-3">
                    <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                      <line x1="16" y1="8" x2="2" y2="22"></line>
                      <line x1="17.5" y1="15" x2="9" y2="15"></line>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">Eco-friendly Products</span>
                      <span className="text-sm font-bold">2,500 pts</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">Sustainability Guide</span>
                      <span className="text-sm font-bold">1,000 pts</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">Plant a Tree</span>
                      <span className="text-sm font-bold">5,000 pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenges;
