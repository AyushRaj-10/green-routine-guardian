
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Users, Trophy, Target } from 'lucide-react';

const ChallengeOfTheMonth = () => {
  const currentChallenge = {
    title: "Plant a Tree Challenge",
    description: "Join thousands in planting trees to combat climate change. Each tree planted helps absorb CO2 and creates a greener future for all.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    participants: 15000,
    daysLeft: 12,
    progress: 78,
    rewards: "750 points + Tree planting certificate",
    startDate: "December 1, 2025",
    endDate: "December 31, 2025"
  };

  const highlights = [
    { icon: Users, label: "Participants", value: "15,000" },
    { icon: Calendar, label: "Days Left", value: "12" },
    { icon: Target, label: "Completion", value: "78%" },
    { icon: Trophy, label: "Rewards", value: "750 pts" }
  ];

  return (
    <section id="challenge-of-month" className="section bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            Challenge of the Month
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Take on our featured monthly challenge and make a real impact with thousands of others
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={currentChallenge.image} 
                alt={currentChallenge.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/25 backdrop-blur-sm rounded-lg p-3 mb-4 border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">Progress</span>
                    <span className="text-sm font-bold text-white">{currentChallenge.progress}%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div 
                      className="bg-green-300 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${currentChallenge.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4 text-gray-800">{currentChallenge.title}</h3>
              <p className="text-lg text-gray-600 mb-6">{currentChallenge.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-200 shadow-md">
                  <highlight.icon className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-800">{highlight.value}</div>
                  <div className="text-sm text-gray-600">{highlight.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-md">
              <h4 className="font-semibold mb-2 text-gray-800">This Month's Reward</h4>
              <p className="text-gray-600">{currentChallenge.rewards}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white border-0 flex-1" asChild>
                <Link to="/challenges">Join Challenge</Link>
              </Button>
              <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-700 border-0 flex-1" asChild>
                <Link to="/challenges">View All Challenges</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeOfTheMonth;
