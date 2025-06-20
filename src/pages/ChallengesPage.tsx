import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Droplets, 
  Zap, 
  Car, 
  Recycle, 
  Users, 
  Calendar,
  Trophy,
  Target,
  CheckCircle,
  Clock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  points: number;
  participants: number;
  image: string;
  objectives: string[];
}

interface UserChallenge {
  id: string;
  challenge_id: string;
  is_completed: boolean;
  joined_at: string;
}

const ChallengesPage = () => {
  const { user } = useAuth();
  const [challenges] = useState<Challenge[]>([
    {
      id: 'energy-saver',
      title: 'Energy Saver Challenge',
      description: 'Reduce your energy consumption by 25% this month through simple daily actions.',
      category: 'energy',
      difficulty: 'medium',
      duration: '30 days',
      points: 500,
      participants: 1234,
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
      objectives: [
        'Turn off lights when leaving rooms',
        'Unplug electronics when not in use',
        'Use natural light during the day',
        'Set thermostat 2 degrees lower'
      ]
    },
    {
      id: 'zero-waste-week',
      title: 'Zero Waste Week',
      description: 'Challenge yourself to produce zero waste for an entire week.',
      category: 'waste',
      difficulty: 'hard',
      duration: '7 days',
      points: 750,
      participants: 892,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      objectives: [
        'Use reusable bags and containers',
        'Compost organic waste',
        'Avoid single-use plastics',
        'Repair instead of replacing items'
      ]
    },
    {
      id: 'water-conservation',
      title: 'Water Conservation Master',
      description: 'Save water with smart habits and reduce your usage by 20%.',
      category: 'water',
      difficulty: 'easy',
      duration: '21 days',
      points: 350,
      participants: 2156,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      objectives: [
        'Take shorter showers',
        'Fix any leaky faucets',
        'Use water-efficient appliances',
        'Collect rainwater for plants'
      ]
    },
    {
      id: 'green-transport',
      title: 'Green Transport Challenge',
      description: 'Use eco-friendly transportation for all your trips this month.',
      category: 'transport',
      difficulty: 'medium',
      duration: '30 days',
      points: 600,
      participants: 756,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      objectives: [
        'Walk or bike for short trips',
        'Use public transportation',
        'Carpool when possible',
        'Work from home when feasible'
      ]
    },
    {
      id: 'plant-based-meals',
      title: 'Plant-Based Meals',
      description: 'Eat plant-based meals for 15 days and discover delicious recipes.',
      category: 'food',
      difficulty: 'easy',
      duration: '15 days',
      points: 400,
      participants: 1876,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      objectives: [
        'Try 3 new plant-based recipes',
        'Replace meat with legumes',
        'Explore local farmers markets',
        'Share recipes with friends'
      ]
    },
    {
      id: 'plastic-free-july',
      title: 'Plastic-Free July',
      description: 'Go plastic-free for the entire month and inspire others to do the same.',
      category: 'waste',
      difficulty: 'hard',
      duration: '31 days',
      points: 800,
      participants: 543,
      image: 'https://images.unsplash.com/photo-1609167830220-7164aa360951?auto=format&fit=crop&w=800&q=80',
      objectives: [
        'Use glass and metal containers',
        'Shop with reusable bags',
        'Choose plastic-free alternatives',
        'Document your journey'
      ]
    }
  ]);

  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);
  const [loading, setLoading] = useState(false);

  const categoryIcons = {
    energy: Zap,
    water: Droplets,
    waste: Recycle,
    transport: Car,
    food: Leaf
  };

  const categoryColors = {
    energy: 'bg-yellow-100 text-yellow-800',
    water: 'bg-blue-100 text-blue-800',
    waste: 'bg-green-100 text-green-800',
    transport: 'bg-purple-100 text-purple-800',
    food: 'bg-orange-100 text-orange-800'
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const fetchUserChallenges = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_challenges')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user challenges:', error);
        return;
      }

      setUserChallenges(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserChallenges();
  }, [user]);

  const handleJoinChallenge = async (challengeId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to join challenges and start your eco journey!",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if user already joined this challenge
      const existingChallenge = userChallenges.find(uc => uc.challenge_id === challengeId);
      if (existingChallenge) {
        toast({
          title: "Already Joined",
          description: "You're already participating in this challenge!",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('user_challenges')
        .insert({
          user_id: user.id,
          challenge_id: challengeId
        })
        .select()
        .single();

      if (error) {
        console.error('Error joining challenge:', error);
        toast({
          title: "Error",
          description: "Failed to join challenge. Please try again.",
          variant: "destructive"
        });
        return;
      }

      setUserChallenges(prev => [...prev, data]);
      
      const challenge = challenges.find(c => c.id === challengeId);
      toast({
        title: "Challenge Joined! 🎉",
        description: `You've successfully joined "${challenge?.title}". Good luck on your eco journey!`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  const isJoined = (challengeId: string) => {
    return userChallenges.some(uc => uc.challenge_id === challengeId);
  };

  const isCompleted = (challengeId: string) => {
    const userChallenge = userChallenges.find(uc => uc.challenge_id === challengeId);
    return userChallenge?.is_completed || false;
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
            Eco Challenges
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Take on sustainable challenges, earn points, and make a real difference for our planet. 
            Join thousands of eco-warriors in creating positive change!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12K+</div>
              <div className="text-sm text-gray-600">Active Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2.5M</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">85%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => {
            const CategoryIcon = categoryIcons[challenge.category as keyof typeof categoryIcons];
            const joined = isJoined(challenge.id);
            const completed = isCompleted(challenge.id);
            
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 shadow-lg border-0 bg-white/80 backdrop-blur">
                  <div className="relative">
                    <img 
                      src={challenge.image} 
                      alt={challenge.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        // Fallback to a solid color background if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center';
                        fallbackDiv.innerHTML = `<div class="text-white"><svg class="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>`;
                        target.parentElement!.appendChild(fallbackDiv);
                      }}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={categoryColors[challenge.category as keyof typeof categoryColors]}>
                        <CategoryIcon className="h-3 w-3 mr-1" />
                        {challenge.category}
                      </Badge>
                      <Badge className={difficultyColors[challenge.difficulty]}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    {completed && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="h-8 w-8 text-green-500 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{challenge.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{challenge.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Trophy className="h-4 w-4" />
                        <span>{challenge.points} points</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{challenge.participants.toLocaleString()} participants</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-sm">Objectives:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {challenge.objectives.slice(0, 3).map((objective, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Target className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                            <span>{objective}</span>
                          </li>
                        ))}
                        {challenge.objectives.length > 3 && (
                          <li className="text-gray-400">+{challenge.objectives.length - 3} more...</li>
                        )}
                      </ul>
                    </div>

                    {joined ? (
                      <div className="space-y-3">
                        {completed ? (
                          <Button disabled className="w-full bg-green-500">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </Button>
                        ) : (
                          <>
                            <Progress value={Math.random() * 60 + 20} className="h-2" />
                            <Button disabled className="w-full">
                              <Clock className="h-4 w-4 mr-2" />
                              In Progress
                            </Button>
                          </>
                        )}
                      </div>
                    ) : (
                      <Button 
                        onClick={() => handleJoinChallenge(challenge.id)}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        {loading ? 'Joining...' : 'Join Challenge'}
                      </Button>
                    )}

                    {!user && (
                      <p className="text-xs text-center text-gray-500 mt-2">
                        <Link to="/auth" className="text-green-600 hover:underline">
                          Log in
                        </Link>
                        {' '}to track your progress
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="p-8 shadow-lg border-0 bg-gradient-to-r from-green-600 to-blue-600">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join our community of eco-warriors and start your sustainable journey today. 
              Every small action counts towards a bigger impact!
            </p>
            {!user ? (
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Link to="/auth">Get Started</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Link to="/community">Join Community</Link>
              </Button>
            )}
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChallengesPage;
