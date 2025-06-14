
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { initSmoothScroll, initScrollAnimations } from '@/utils/scrollUtils';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface UserActivity {
  id: string;
  title: string;
  created_at: string;
  type: 'reminder' | 'post';
}

interface UserReminder {
  id: string;
  title: string;
  reminder_time: string;
  is_completed: boolean;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [upcomingReminders, setUpcomingReminders] = useState<UserReminder[]>([]);
  const [userStats, setUserStats] = useState({
    totalReminders: 0,
    completedReminders: 0,
    totalPosts: 0,
    totalPoints: 0,
    joinedChallenges: 0,
    completedChallenges: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = initSmoothScroll();
    initScrollAnimations();
    
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchUserData();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  const fetchUserData = async () => {
    if (!user) {
      console.log('No user found');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching user data for:', user.id);

      // Fetch user reminders
      const { data: reminders, error: remindersError } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (remindersError) {
        console.error('Error fetching reminders:', remindersError);
      }

      // Fetch user posts
      const { data: posts, error: postsError } = await supabase
        .from('community_posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Error fetching posts:', postsError);
      }

      // Fetch user points
      const { data: pointsData, error: pointsError } = await supabase
        .from('user_points')
        .select('total_points')
        .eq('user_id', user.id)
        .single();

      if (pointsError && pointsError.code !== 'PGRST116') {
        console.error('Error fetching points:', pointsError);
      }

      // Fetch user challenges
      const { data: userChallenges, error: challengesError } = await supabase
        .from('user_challenges')
        .select('*')
        .eq('user_id', user.id);

      if (challengesError) {
        console.error('Error fetching challenges:', challengesError);
      }

      // Process activities
      const reminderActivities: UserActivity[] = (reminders || []).slice(0, 3).map(reminder => ({
        id: reminder.id,
        title: `Created reminder: ${reminder.title}`,
        created_at: reminder.created_at,
        type: 'reminder'
      }));

      const postActivities: UserActivity[] = (posts || []).slice(0, 2).map(post => ({
        id: post.id,
        title: `Shared story: ${post.title}`,
        created_at: post.created_at,
        type: 'post'
      }));

      const allActivities = [...reminderActivities, ...postActivities]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      setActivities(allActivities);

      // Set upcoming reminders
      const upcoming = (reminders || [])
        .filter(r => !r.is_completed && new Date(r.reminder_time) > new Date())
        .slice(0, 3);
      setUpcomingReminders(upcoming);

      // Calculate stats
      const completedCount = (reminders || []).filter(r => r.is_completed).length;
      const joinedChallengesCount = (userChallenges || []).length;
      const completedChallengesCount = (userChallenges || []).filter(c => c.is_completed).length;
      const totalPointsFromDB = pointsData?.total_points || 0;

      setUserStats({
        totalReminders: (reminders || []).length,
        completedReminders: completedCount,
        totalPosts: (posts || []).length,
        totalPoints: totalPointsFromDB,
        joinedChallenges: joinedChallengesCount,
        completedChallenges: completedChallengesCount
      });

      console.log('User data loaded successfully');

    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load your dashboard data. Please try refreshing the page.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-medium text-muted-foreground">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view your dashboard.</p>
          <Button onClick={() => window.location.href = '/auth'}>
            Go to Login
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <p>Loading your dashboard...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.header 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome Back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">Your sustainable journey continues. Today is a new opportunity to make a positive impact!</p>
        </motion.header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Impact Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="text-center p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl"
                whileHover={{ scale: 1.1 }}
              >
                <motion.p 
                  className="text-green-600 text-2xl font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {userStats.totalPoints}
                </motion.p>
                <p className="text-sm text-gray-600">Challenge Points</p>
              </motion.div>
              <motion.div 
                className="text-center p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl"
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-blue-600 text-2xl font-bold">{userStats.joinedChallenges}</p>
                <p className="text-sm text-gray-600">Joined Challenges</p>
              </motion.div>
              <motion.div 
                className="text-center p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl"
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-yellow-600 text-2xl font-bold">{userStats.totalReminders}</p>
                <p className="text-sm text-gray-600">Active Reminders</p>
              </motion.div>
              <motion.div 
                className="text-center p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl"
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-purple-600 text-2xl font-bold">{userStats.totalPosts}</p>
                <p className="text-sm text-gray-600">Stories Shared</p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-100 md:col-span-2 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Your Recent Activities</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            {activities.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map(activity => (
                    <TableRow key={activity.id}>
                      <TableCell>{new Date(activity.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{activity.title}</TableCell>
                      <TableCell className="capitalize">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          activity.type === 'reminder' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {activity.type}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No activities yet. Start by creating a reminder or sharing your story!</p>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Reminders</h2>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/reminders'}>
                Manage
              </Button>
            </div>
            {upcomingReminders.length > 0 ? (
              <div className="space-y-3">
                {upcomingReminders.map((reminder, index) => (
                  <motion.div 
                    key={reminder.id} 
                    className="p-3 border border-gray-200 rounded-lg bg-gradient-to-r from-green-50 to-blue-50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>{new Date(reminder.reminder_time).toLocaleDateString()}</span>
                      <span>{new Date(reminder.reminder_time).toLocaleTimeString()}</span>
                    </div>
                    <p className="font-medium">{reminder.title}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No upcoming reminders. Create one to stay on track!</p>
                <Button className="mt-4" onClick={() => window.location.href = '/reminders'}>
                  Create Reminder
                </Button>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Today's Eco Tip</h2>
              <Button variant="outline" size="sm">Share</Button>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-700 mb-2">Energy Conservation ⚡</h3>
              <p className="text-gray-700 mb-4">
                Use natural light whenever possible and turn off lights when leaving a room. 
                Unplug electronic devices when not in use to save energy.
              </p>
              <motion.button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Try This Today ✨
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
