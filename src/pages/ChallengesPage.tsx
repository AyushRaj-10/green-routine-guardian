
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Check, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const ChallengesPage = () => {
  const { user } = useAuth();
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  // Regular challenges with normal points
  const challenges = [
    {
      id: '1',
      title: 'Plastic-Free Week',
      description: 'Eliminate single-use plastics from your daily routine for 7 days',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
      participants: 1240,
      duration: '7 days',
      difficulty: 'Medium',
      points: 300,
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
      points: 250,
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
      points: 500,
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
      points: 350,
      impact: 'Reduce ~75kg CO2 emissions'
    },
    {
      id: '5',
      title: 'Eco-Friendly Transportation Week',
      description: 'Use only eco-friendly transportation methods for one week',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      participants: 756,
      duration: '7 days',
      difficulty: 'Medium',
      points: 275,
      impact: 'Reduce ~25kg CO2 emissions'
    },
    {
      id: '6',
      title: 'Energy Efficient Home',
      description: 'Reduce your home energy consumption by 20% in one month',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80',
      participants: 432,
      duration: '30 days',
      difficulty: 'Hard',
      points: 450,
      impact: 'Save ~200kWh of energy'
    }
  ];

  // Special Challenge of the Month with higher points
  const challengeOfTheMonth = [
    {
      id: 'cotm-1',
      title: 'Plant a Tree',
      description: 'Plant a tree in your community and share a photo of your contribution',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
      participants: 287,
      duration: '1 day',
      difficulty: 'Medium',
      points: 750,
      impact: 'Absorb ~20kg CO2 per year',
      isSpecial: true
    },
    {
      id: 'cotm-2',
      title: 'Help at a Local Shelter',
      description: 'Volunteer at a local animal shelter or old age home for a day',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80',
      participants: 156,
      duration: '1 day',
      difficulty: 'Hard',
      points: 900,
      impact: 'Improve community well-being',
      isSpecial: true
    },
    {
      id: 'cotm-3',
      title: 'Community Park Cleanup',
      description: 'Organize or join a community cleanup event in your local park',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
      participants: 342,
      duration: '1 day',
      difficulty: 'Easy',
      points: 650,
      impact: 'Clean 1-2 hectares of park area',
      isSpecial: true
    }
  ];

  useEffect(() => {
    if (user) {
      fetchUserChallenges();
      fetchUserPoints();
    }
  }, [user]);

  const fetchUserChallenges = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_challenges')
        .select('challenge_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setJoinedChallenges(data?.map(c => c.challenge_id) || []);
    } catch (error) {
      console.error('Error fetching user challenges:', error);
    }
  };

  const fetchUserPoints = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_points')
        .select('total_points')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setUserPoints(data?.total_points || 0);
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  const toggleJoinChallenge = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to join challenges",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      if (joinedChallenges.includes(id)) {
        // Leave challenge
        const { error } = await supabase
          .from('user_challenges')
          .delete()
          .eq('user_id', user.id)
          .eq('challenge_id', id);

        if (error) throw error;

        setJoinedChallenges(joinedChallenges.filter(c => c !== id));
        
        toast({
          title: "Challenge left",
          description: "You have left this challenge"
        });
      } else {
        // Join challenge
        const challenge = [...challenges, ...challengeOfTheMonth].find(c => c.id === id);
        if (!challenge) return;

        const { error } = await supabase
          .from('user_challenges')
          .insert([{
            user_id: user.id,
            challenge_id: id
          }]);

        if (error) throw error;

        // Award points
        const { error: pointsError } = await supabase
          .from('user_points')
          .upsert({
            user_id: user.id,
            total_points: userPoints + challenge.points
          });

        if (pointsError) throw pointsError;

        setJoinedChallenges([...joinedChallenges, id]);
        setUserPoints(userPoints + challenge.points);
        
        toast({
          title: "Challenge joined! 🎉",
          description: `You earned ${challenge.points} points for joining "${challenge.title}"`
        });
      }
    } catch (error) {
      console.error('Error toggling challenge:', error);
      toast({
        title: "Error",
        description: "Failed to update challenge status",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderChallengeCard = (challenge: any) => (
    <motion.div 
      key={challenge.id} 
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-48 w-full overflow-hidden relative">
        <img 
          src={challenge.image} 
          alt={challenge.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        {challenge.isSpecial && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-1 px-3 rounded-full text-xs font-bold">
            Challenge of the Month
          </div>
        )}
        <div className={`absolute top-4 right-4 p-1 px-3 rounded-full text-sm font-medium ${
          challenge.isSpecial 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
            : 'bg-white/90 text-gray-800'
        }`}>
          {challenge.points} points
        </div>
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
            <p className="text-sm text-gray-500">Impact</p>
            <p className="font-medium text-green-600 text-xs">{challenge.impact}</p>
          </div>
        </div>
        
        <Button 
          className={joinedChallenges.includes(challenge.id) ? 
            "bg-green-100 text-green-800 hover:bg-green-200 border border-green-500" : 
            challenge.isSpecial 
              ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }
          onClick={() => toggleJoinChallenge(challenge.id)}
          disabled={loading}
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
  );

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">Environmental Challenges</h1>
          <p className="text-xl text-gray-600 mb-4 text-center max-w-2xl mx-auto">
            Join challenges to make a bigger impact and earn points for your contributions
          </p>
          
          {user && (
            <div className="text-center mb-8">
              <motion.div 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-6 py-3 rounded-full border border-yellow-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Leaf className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Your Points: {userPoints}</span>
              </motion.div>
            </div>
          )}

          {/* Challenge of the Month Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <Leaf className="w-6 h-6 text-yellow-500" />
              Challenge of the Month - Bonus Points!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {challengeOfTheMonth.map(renderChallengeCard)}
            </div>
          </div>

          {/* Regular Challenges Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Regular Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {challenges.map(renderChallengeCard)}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChallengesPage;
