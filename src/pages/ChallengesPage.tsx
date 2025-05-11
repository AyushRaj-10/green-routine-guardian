
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Check } from 'lucide-react';

const ChallengesPage = () => {
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);

  const challenges = [
    {
      id: '1',
      title: 'Plastic-Free Week',
      description: 'Eliminate single-use plastics from your daily routine for 7 days',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
      participants: 1240,
      duration: '7 days',
      difficulty: 'Medium',
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
      impact: 'Reduce ~75kg CO2 emissions'
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
          <h1 className="text-4xl font-bold mb-2 text-center">Environmental Challenges</h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Join challenges with our community to make a bigger impact together
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
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
                      <p className="text-sm text-gray-500">Impact</p>
                      <p className="font-medium text-green-600">{challenge.impact}</p>
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
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChallengesPage;
