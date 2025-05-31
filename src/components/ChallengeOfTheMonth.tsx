
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Users, Trophy, Target } from 'lucide-react';

const ChallengeOfTheMonth = () => {
  const currentChallenge = {
    title: "Plastic-Free December",
    description: "Join thousands in eliminating single-use plastics for the entire month. Make sustainable swaps and track your impact.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    participants: 12847,
    daysLeft: 18,
    progress: 65,
    rewards: "500 points + Eco-friendly starter kit",
    startDate: "December 1, 2025",
    endDate: "December 31, 2025"
  };

  const highlights = [
    { icon: Users, label: "Participants", value: "12,847" },
    { icon: Calendar, label: "Days Left", value: "18" },
    { icon: Target, label: "Completion", value: "65%" },
    { icon: Trophy, label: "Rewards", value: "500 pts" }
  ];

  return (
    <section id="challenge-of-month" className="section bg-gradient-to-br from-green-900 to-blue-900 text-white">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Challenge of the Month
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-green-100 max-w-2xl mx-auto"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-bold">{currentChallenge.progress}%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full transition-all duration-1000"
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
              <h3 className="text-3xl font-bold mb-4">{currentChallenge.title}</h3>
              <p className="text-lg text-green-100 mb-6">{currentChallenge.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <highlight.icon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-xl font-bold">{highlight.value}</div>
                  <div className="text-sm text-green-100">{highlight.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2">This Month's Reward</h4>
              <p className="text-green-100">{currentChallenge.rewards}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 flex-1" asChild>
                <Link to="/challenges">Join Challenge</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900 flex-1" asChild>
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
