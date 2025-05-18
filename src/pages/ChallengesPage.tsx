
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Check, TreeDeciduous, HandHeart, Leaf, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const ChallengesPage = () => {
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'challenges' | 'community'>('challenges');

  const challenges = [
    {
      id: '1',
      title: 'Plastic-Free Week',
      description: 'Eliminate single-use plastics from your daily routine for 7 days',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
      participants: 1240,
      duration: '7 days',
      difficulty: 'Medium',
      points: 450, // Increased points
      impact: 'Prevent ~5kg of plastic waste'
    },
    {
      id: '2',
      title: '30-Day Water Conservation',
      description: 'Reduce your water consumption through simple daily actions',
      image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=800&q=80',
      participants: 3450,
      duration: '30 days',
      difficulty: 'Easy',
      points: 400, // Increased points
      impact: 'Save up to 1500 liters of water'
    },
    {
      id: '3',
      title: 'Zero Waste Month',
      description: 'Minimize your household waste and aim for zero landfill contribution',
      image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800&q=80',
      participants: 890,
      duration: '30 days',
      difficulty: 'Hard',
      points: 750, // Increased points
      impact: 'Reduce ~20kg of landfill waste'
    },
    {
      id: '4',
      title: 'Plant-Based Diet Challenge',
      description: 'Adopt a plant-based diet for two weeks to reduce carbon footprint',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
      participants: 2120,
      duration: '14 days',
      difficulty: 'Medium',
      points: 500, // Increased points
      impact: 'Reduce ~75kg CO2 emissions'
    },
    {
      id: '5',
      title: 'Plant a Tree',
      description: 'Plant a tree in your community and share a photo of your contribution',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
      participants: 287,
      duration: '1 day',
      difficulty: 'Medium',
      points: 500, // Increased points
      impact: 'Absorb ~20kg CO2 per year'
    },
    {
      id: '6',
      title: 'Help at a Local Shelter',
      description: 'Volunteer at a local animal shelter or old age home for a day',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80',
      participants: 156,
      duration: '1 day',
      difficulty: 'Hard',
      points: 600, // Increased points
      impact: 'Improve community well-being'
    }
  ];

  const communityPosts = [
    {
      id: '1',
      user: {
        name: 'Jennifer L.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        level: 'Gold'
      },
      title: 'My Energy Saving Journey',
      content: "I've managed to reduce my electricity usage by 30% this month by implementing simple changes in my daily routine. I started by replacing all light bulbs with LED alternatives, setting up timers for electronics, and being more mindful about my energy consumption. The difference is noticeable both for the environment and my utility bills!",
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
      content: "I've transformed my living space into an eco-friendly environment. Here are some tips on how you can do the same: use natural cleaning products, set up rainwater collection, compost food waste, and invest in energy-efficient appliances. Small changes really do add up to make a big difference!",
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
      image: 'https://images.unsplash.com/photo-1502839405393-37888b38a066?auto=format&fit=crop&w=800&q=80',
      postedAt: '3 weeks ago',
      likes: 67,
      comments: 18
    }
  ];

  const toggleJoinChallenge = (id: string) => {
    if (joinedChallenges.includes(id)) {
      setJoinedChallenges(joinedChallenges.filter(c => c !== id));
    } else {
      setJoinedChallenges([...joinedChallenges, id]);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">Environmental Hub</h1>
          <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Join challenges and connect with our community to make a bigger impact together
          </p>

          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-md">
              <div className="flex space-x-1">
                <button
                  className={`px-6 py-2 rounded-full text-center transition-all ${
                    activeTab === 'challenges' 
                      ? 'bg-green-500 text-white' 
                      : 'hover:bg-green-100'
                  }`}
                  onClick={() => setActiveTab('challenges')}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Leaf className="w-4 h-4" />
                    Challenges
                  </span>
                </button>
                <button
                  className={`px-6 py-2 rounded-full text-center transition-all ${
                    activeTab === 'community' 
                      ? 'bg-green-500 text-white' 
                      : 'hover:bg-green-100'
                  }`}
                  onClick={() => setActiveTab('community')}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    Community
                  </span>
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'challenges' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {challenges.map((challenge) => (
                <motion.div 
                  key={challenge.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={challenge.image} 
                      alt={challenge.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-6 mt-auto">
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{challenge.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Difficulty</p>
                        <p className="font-medium">{challenge.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Participants</p>
                        <p className="font-medium">{challenge.participants.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Points</p>
                        <p className="font-medium text-green-600">{challenge.points}</p>
                      </div>
                    </div>
                    
                    <Button 
                      className={joinedChallenges.includes(challenge.id) ? 
                        "bg-green-100 text-green-800 hover:bg-green-200 border border-green-500" : 
                        "bg-green-500 hover:bg-green-600 text-white"
                      }
                      onClick={() => toggleJoinChallenge(challenge.id)}
                    >
                      {joinedChallenges.includes(challenge.id) ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Joined
                        </>
                      ) : (
                        'Join Challenge'
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'community' && (
            <div className="mb-10">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-6">Share Your Story</h3>
                <div className="mb-4">
                  <input 
                    type="text"
                    placeholder="Give your story a title"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  />
                  <textarea
                    placeholder="Share your eco-friendly journey with the community..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-32 mb-4"
                  ></textarea>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Add Image
                    </Button>
                    <Button className="bg-green-500 hover:bg-green-600">
                      Post Your Story
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {communityPosts.map((post) => (
                  <motion.div 
                    key={post.id} 
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={post.user.avatar} 
                            alt={post.user.name} 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{post.user.name}</p>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                post.user.level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                                post.user.level === 'Silver' ? 'bg-gray-100 text-gray-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {post.user.level}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">Posted {post.postedAt}</p>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.content}</p>
                      
                      {post.image && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-green-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-green-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                            </svg>
                            <span>{post.comments}</span>
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
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChallengesPage;
