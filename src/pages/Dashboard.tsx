
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
    totalPoints: 0
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
      const totalPoints = completedCount * 10 + (posts || []).length * 25;

      setUserStats({
        totalReminders: (reminders || []).length,
        completedReminders: completedCount,
        totalPosts: (posts || []).length,
        totalPoints
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
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <p>Loading...</p>
        </div>
        <Footer />
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <header className="mb-10 fadeInDown">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}!
          </h1>
          <p className="text-gray-600">Your sustainable journey continues. Today is a new opportunity to make a positive impact!</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 shadow-md fadeInUp">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Impact Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-100 rounded-lg">
                <p className="text-green-600 text-2xl font-bold">{userStats.totalPoints}</p>
                <p className="text-sm text-gray-600">Total Points</p>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-600 text-2xl font-bold">{userStats.totalReminders}</p>
                <p className="text-sm text-gray-600">Total Reminders</p>
              </div>
              <div className="text-center p-3 bg-yellow-100 rounded-lg">
                <p className="text-yellow-600 text-2xl font-bold">{userStats.completedReminders}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center p-3 bg-purple-100 rounded-lg">
                <p className="text-purple-600 text-2xl font-bold">{userStats.totalPosts}</p>
                <p className="text-sm text-gray-600">Stories Shared</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-md md:col-span-2 fadeInUp">
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
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-md fadeInUp">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Reminders</h2>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/reminders'}>
                Manage
              </Button>
            </div>
            {upcomingReminders.length > 0 ? (
              <div className="space-y-3">
                {upcomingReminders.map(reminder => (
                  <div key={reminder.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>{new Date(reminder.reminder_time).toLocaleDateString()}</span>
                      <span>{new Date(reminder.reminder_time).toLocaleTimeString()}</span>
                    </div>
                    <p className="font-medium">{reminder.title}</p>
                  </div>
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
          </Card>
          
          <Card className="p-6 shadow-md fadeInUp">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Today's Eco Tip</h2>
              <Button variant="outline" size="sm">Share</Button>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-bold text-green-700 mb-2">Energy Conservation</h3>
              <p className="text-gray-700">
                Use natural light whenever possible and turn off lights when leaving a room. 
                Unplug electronic devices when not in use to save energy.
              </p>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Try This Today</Button>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
