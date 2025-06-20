
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Trophy, 
  Target, 
  Clock, 
  Star,
  CheckCircle,
  Play,
  Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ChallengesPage = () => {
  const { user } = useAuth();
  const [joinedChallenges, setJoinedChallenges] = useState<Set<number>>(new Set());

  const challenges = [
    {
      id: 1,
      title: 'Plastic-Free Week',
      description: 'Avoid using single-use plastics for an entire week and document your journey.',
      longDescription: 'This challenge encourages participants to eliminate single-use plastics from their daily routine. Track your plastic consumption, find alternatives, and share your experience with the community.',
      difficulty: 'Medium',
      points: 250,
      participants: 1240,
      duration: '7 days',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
      category: 'waste',
      status: 'active',
      progress: 65,
      startDate: '2025-06-15',
      endDate: '2025-06-22',
      requirements: ['Track daily plastic usage', 'Find 3 plastic alternatives', 'Share progress photos'],
      rewards: ['250 points', 'Plastic-free badge', 'Eco-friendly product discount']
    },
    {
      id: 2,
      title: '30-Day Water Conservation',
      description: 'Reduce your water consumption through simple daily actions and tracking.',
      longDescription: 'Learn and implement water-saving techniques in your daily routine. Monitor your water usage and discover how small changes can make a big impact.',
      difficulty: 'Easy',
      points: 150,
      participants: 2187,
      duration: '30 days',
      image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=800&q=80',
      category: 'water',
      status: 'upcoming',
      progress: 0,
      startDate: '2025-07-01',
      endDate: '2025-07-31',
      requirements: ['Install water-saving devices', 'Track daily usage', 'Complete weekly check-ins'],
      rewards: ['150 points', 'Water guardian badge', 'Water conservation guide']
    },
    {
      id: 3,
      title: 'Zero Waste Month',
      description: 'Minimize your household waste and aim for zero landfill contribution.',
      longDescription: 'The ultimate sustainability challenge! Reduce, reuse, and recycle to achieve minimal waste output. Perfect for advanced eco-warriors.',
      difficulty: 'Hard',
      points: 500,
      participants: 943,
      duration: '30 days',
      image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800&q=80',
      category: 'waste',
      status: 'completed',
      progress: 100,
      startDate: '2025-05-01',
      endDate: '2025-05-31',
      requirements: ['Achieve <1kg waste per week', 'Document all waste', 'Share tips with community'],
      rewards: ['500 points', 'Zero waste champion badge', 'Sustainability consultation']
    },
    {
      id: 4,
      title: 'Plant-Based Diet Challenge',
      description: 'Adopt a plant-based diet for two weeks to reduce your carbon footprint.',
      longDescription: 'Explore the environmental benefits of plant-based eating. Discover new recipes, track your carbon savings, and feel great!',
      difficulty: 'Medium',
      points: 200,
      participants: 2120,
      duration: '14 days',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
      category: 'food',
      status: 'active',
      progress: 42,
      startDate: '2025-06-10',
      endDate: '2025-06-24',
      requirements: ['Plan plant-based meals', 'Try 5 new recipes', 'Calculate carbon savings'],
      rewards: ['200 points', 'Plant-based pioneer badge', 'Recipe book']
    },
    {
      id: 5,
      title: 'Bike to Work Challenge',
      description: 'Use your bicycle for commuting and reduce transportation emissions.',
      longDescription: 'Ditch the car and embrace cycling! Track your rides, calculate emission savings, and join a growing community of eco-commuters.',
      difficulty: 'Medium',
      points: 300,
      participants: 856,
      duration: '21 days',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      category: 'transport',
      status: 'active',
      progress: 78,
      startDate: '2025-06-01',
      endDate: '2025-06-21',
      requirements: ['Bike to work 15+ days', 'Track distance and emissions', 'Share cycling tips'],
      rewards: ['300 points', 'Eco-cyclist badge', 'Bike maintenance kit']
    },
    {
      id: 6,
      title: 'Energy Saver Challenge',
      description: 'Reduce your home energy consumption by 20% through smart habits.',
      longDescription: 'Learn energy-efficient practices and implement them at home. Monitor your usage and see the impact on both the environment and your bills.',
      difficulty: 'Easy',
      points: 180,
      participants: 1567,
      duration: '28 days',
      image: 'https://images.unsplash.com/photo-1497436072909-f5e4be912640?auto=format&fit=crop&w=800&q=80',
      category: 'energy',
      status: 'upcoming',
      progress: 0,
      startDate: '2025-07-15',
      endDate: '2025-08-11',
      requirements: ['Install energy monitoring', 'Achieve 20% reduction', 'Share energy tips'],
      rewards: ['180 points', 'Energy master badge', 'Smart home guide']
    }
  ];

  const topParticipants = [
    { id: 1, name: 'Jennifer L.', points: 3450, avatar: 'https://randomuser.me/api/portraits/women/44.jpg', level: 'Gold', challenges: 12 },
    { id: 2, name: 'Robert W.', points: 3280, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', level: 'Gold', challenges: 10 },
    { id: 3, name: 'Ashley T.', points: 3105, avatar: 'https://randomuser.me/api/portraits/women/67.jpg', level: 'Silver', challenges: 9 },
    { id: 4, name: 'Mark D.', points: 2890, avatar: 'https://randomuser.me/api/portraits/men/81.jpg', level: 'Silver', challenges: 8 },
    { id: 5, name: 'Sophia L.', points: 2745, avatar: 'https://randomuser.me/api/portraits/women/38.jpg', level: 'Silver', challenges: 7 }
  ];

  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const levelColor = (level: string) => {
    switch (level) {
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleJoinChallenge = (challengeId: number, challengeTitle: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to join challenges and start your eco journey!",
        variant: "destructive"
      });
      return;
    }

    if (joinedChallenges.has(challengeId)) {
      toast({
        title: "Already Joined!",
        description: `You're already participating in "${challengeTitle}". Keep up the great work!`,
      });
      return;
    }

    // Simulate joining the challenge
    setJoinedChallenges(prev => new Set([...prev, challengeId]));
    
    toast({
      title: "Challenge Joined! 🎉",
      description: `Welcome to "${challengeTitle}"! Check your dashboard for progress tracking.`,
    });
  };

  const getButtonText = (challenge: any) => {
    if (joinedChallenges.has(challenge.id)) return 'Joined';
    if (challenge.status === 'completed') return 'View Results';
    if (challenge.status === 'upcoming') return 'Get Notified';
    return 'Join Challenge';
  };

  const getButtonIcon = (challenge: any) => {
    if (joinedChallenges.has(challenge.id)) return CheckCircle;
    if (challenge.status === 'completed') return Trophy;
    if (challenge.status === 'upcoming') return Clock;
    return Play;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Eco Challenges
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of eco-warriors in making a real difference. Complete challenges, earn points, and help create a sustainable future.
          </p>
          
          {!user && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
              <p className="text-blue-800">
                <strong>Want to join challenges?</strong> Please{' '}
                <Link to="/auth" className="text-blue-600 hover:underline font-semibold">
                  log in or create an account
                </Link>{' '}
                to start your eco journey!
              </p>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Challenges */}
          <div className="lg:col-span-3">
            <div className="grid gap-6">
              {challenges.map((challenge, index) => {
                const ButtonIcon = getButtonIcon(challenge);
                const isJoined = joinedChallenges.has(challenge.id);
                
                return (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img 
                            src={challenge.image} 
                            alt={challenge.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className={difficultyColor(challenge.difficulty)}>
                              {challenge.difficulty}
                            </Badge>
                            <Badge className={statusColor(challenge.status)}>
                              {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="border-gray-300">
                              <Clock className="h-3 w-3 mr-1" />
                              {challenge.duration}
                            </Badge>
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-3">{challenge.title}</h3>
                          <p className="text-gray-600 mb-4">{challenge.longDescription}</p>
                          
                          {challenge.status === 'active' && (
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progress</span>
                                <span>{challenge.progress}%</span>
                              </div>
                              <Progress value={challenge.progress} className="h-2" />
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <Users className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                              <div className="text-sm font-semibold">{challenge.participants}</div>
                              <div className="text-xs text-gray-500">Participants</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <Star className="h-5 w-5 mx-auto mb-1 text-yellow-600" />
                              <div className="text-sm font-semibold">{challenge.points}</div>
                              <div className="text-xs text-gray-500">Points</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg col-span-2 md:col-span-1">
                              <Target className="h-5 w-5 mx-auto mb-1 text-green-600" />
                              <div className="text-sm font-semibold">{challenge.category}</div>
                              <div className="text-xs text-gray-500">Category</div>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={() => handleJoinChallenge(challenge.id, challenge.title)}
                            className={`w-full ${isJoined ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            disabled={isJoined}
                          >
                            <ButtonIcon className="h-4 w-4 mr-2" />
                            {getButtonText(challenge)}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <h3 className="text-xl font-bold">Top Challengers</h3>
              </div>
              
              <div className="space-y-4">
                {topParticipants.map((participant, index) => (
                  <div key={participant.id} className="flex items-center gap-3">
                    <div className="text-lg font-bold text-gray-400 w-6">
                      {index + 1}
                    </div>
                    <img 
                      src={participant.avatar} 
                      alt={participant.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{participant.name}</div>
                      <div className="text-sm text-gray-500">{participant.challenges} challenges</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{participant.points}</div>
                      <Badge className={`text-xs ${levelColor(participant.level)}`}>
                        {participant.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              {user && (
                <div className="mt-6 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Your Rank</div>
                    <div className="font-bold text-lg">12th</div>
                    <div className="text-sm text-gray-500 mt-2">Your Points</div>
                    <div className="font-bold text-green-600">1,850</div>
                  </div>
                </div>
              )}
            </Card>

            {/* Rewards Info */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-purple-600" />
                <h3 className="text-xl font-bold">Rewards</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Eco Badge</span>
                  <Badge variant="outline">100 pts</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Gift Card</span>
                  <Badge variant="outline">500 pts</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Plant a Tree</span>
                  <Badge variant="outline">1000 pts</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Consultation</span>
                  <Badge variant="outline">2500 pts</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChallengesPage;
