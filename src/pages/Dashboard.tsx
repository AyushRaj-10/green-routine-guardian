
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { initSmoothScroll, initScrollAnimations } from '@/utils/scrollUtils';

const Dashboard = () => {
  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    return () => {
      lenis.destroy();
    };
  }, []);

  const activities = [
    { id: 1, date: '2025-05-10', activity: 'Planted a tree', impact: '+50 points' },
    { id: 2, date: '2025-05-09', activity: 'Used public transport', impact: '+20 points' },
    { id: 3, date: '2025-05-08', activity: 'Reduced water usage', impact: '+25 points' },
    { id: 4, date: '2025-05-07', activity: 'Recycled waste', impact: '+15 points' },
    { id: 5, date: '2025-05-06', activity: 'Used reusable bags', impact: '+10 points' },
  ];

  const upcomingReminders = [
    { id: 1, date: '2025-05-12', time: '08:00', task: 'Turn off unused electronics' },
    { id: 2, date: '2025-05-13', time: '19:00', task: 'Separate recyclable waste' },
    { id: 3, date: '2025-05-15', time: '10:00', task: 'Water plants with collected rainwater' },
  ];

  const leaderboardUsers = [
    { id: 1, name: 'Jennifer L.', points: 3450, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'Robert W.', points: 3280, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, name: 'Ashley T.', points: 3105, avatar: 'https://randomuser.me/api/portraits/women/67.jpg' },
    { id: 4, name: 'Mark D.', points: 2890, avatar: 'https://randomuser.me/api/portraits/men/81.jpg' },
    { id: 5, name: 'Sophia L.', points: 2745, avatar: 'https://randomuser.me/api/portraits/women/38.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <header className="mb-10 fadeInDown">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back, User</h1>
          <p className="text-gray-600">Your sustainable journey continues. Today is a new opportunity to make a positive impact!</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 shadow-md fadeInUp">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Impact Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-100 rounded-lg">
                <p className="text-green-600 text-2xl font-bold">120</p>
                <p className="text-sm text-gray-600">Points This Week</p>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-600 text-2xl font-bold">1,850</p>
                <p className="text-sm text-gray-600">Total Points</p>
              </div>
              <div className="text-center p-3 bg-yellow-100 rounded-lg">
                <p className="text-yellow-600 text-2xl font-bold">5</p>
                <p className="text-sm text-gray-600">Challenges Completed</p>
              </div>
              <div className="text-center p-3 bg-purple-100 rounded-lg">
                <p className="text-purple-600 text-2xl font-bold">12th</p>
                <p className="text-sm text-gray-600">Global Rank</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-md md:col-span-2 fadeInUp">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map(activity => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.activity}</TableCell>
                    <TableCell className="text-green-500 font-medium">{activity.impact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-md fadeInUp">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Leaderboard</h2>
              <Button variant="outline" size="sm">Full Board</Button>
            </div>
            <div className="space-y-4">
              {leaderboardUsers.map((user, index) => (
                <div key={user.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <div className="mr-3 font-bold text-lg text-gray-500 w-6 text-center">
                    {index + 1}
                  </div>
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
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
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 shadow-md fadeInUp">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Reminders</h2>
              <Button variant="outline" size="sm">Add New</Button>
            </div>
            <div className="space-y-3">
              {upcomingReminders.map(reminder => (
                <div key={reminder.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{reminder.date}</span>
                    <span>{reminder.time}</span>
                  </div>
                  <p className="font-medium">{reminder.task}</p>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 shadow-md fadeInUp">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Daily Tips</h2>
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
