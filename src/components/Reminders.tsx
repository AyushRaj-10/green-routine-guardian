
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const Reminders = () => {
  const { user } = useAuth();
  const [reminderType, setReminderType] = useState<string>('water');
  const [time, setTime] = useState<string>('08:00');
  const [frequency, setFrequency] = useState<string>('daily');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [savedReminders, setSavedReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchReminders();
    }
  }, [user]);

  const fetchReminders = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedReminders(data || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const getReminderMessage = (type: string) => {
    if (customMessage.trim()) {
      return customMessage.trim();
    }
    
    switch (type) {
      case 'water':
        return 'Remember to turn off the tap while brushing teeth';
      case 'energy':
        return 'Don\'t forget to turn off lights and appliances';
      case 'waste':
        return 'Remember to properly sort your recycling';
      default:
        return 'Environmental reminder';
    }
  };

  const handleSaveReminder = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create reminders",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Create reminder time for today at the specified time
      const today = new Date();
      const [hours, minutes] = time.split(':');
      const reminderTime = new Date(today);
      reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      // If the time has already passed today, set it for tomorrow
      if (reminderTime <= new Date()) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }

      const { error } = await supabase
        .from('reminders')
        .insert([
          {
            user_id: user.id,
            title: getReminderMessage(reminderType),
            description: `${reminderType} reminder - ${frequency}`,
            reminder_time: reminderTime.toISOString()
          }
        ]);

      if (error) throw error;

      toast({
        title: "Reminder created!",
        description: "Your eco-friendly reminder has been saved",
      });
      
      // Reset form
      setReminderType('water');
      setTime('08:00');
      setFrequency('daily');
      setCustomMessage('');
      
      // Refresh reminders
      fetchReminders();
    } catch (error) {
      console.error('Error creating reminder:', error);
      toast({
        title: "Error",
        description: "Failed to create reminder",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReminder = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Reminder deleted",
        description: "Your reminder has been removed"
      });
      
      fetchReminders();
    } catch (error) {
      console.error('Error deleting reminder:', error);
      toast({
        title: "Error",
        description: "Failed to delete reminder",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="reminders" className="section bg-green-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fadeInUp">Set Eco Reminders</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fadeInUp">
            Create customized reminders to help you develop sustainable habits.
            {!user && " Please log in to save your reminders!"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Create New Reminder</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Reminder Type</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setReminderType('water')}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                      reminderType === 'water' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <svg className="h-8 w-8 text-blue-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v6M12 22v-6M4.93 10.93l4.24 4.24M14.83 8.83l4.24 4.24M19.07 10.93l-4.24 4.24M9.17 8.83L4.93 13.07M22 12h-6M8 12H2"></path>
                    </svg>
                    <span>Water</span>
                  </button>
                  
                  <button
                    onClick={() => setReminderType('energy')}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                      reminderType === 'energy' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <svg className="h-8 w-8 text-yellow-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                    <span>Energy</span>
                  </button>
                  
                  <button
                    onClick={() => setReminderType('waste')}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                      reminderType === 'waste' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <svg className="h-8 w-8 text-green-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    <span>Waste</span>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="customMessage" className="block text-gray-700 mb-2">Custom Reminder Message (Optional)</label>
                <textarea 
                  id="customMessage"
                  value={customMessage} 
                  onChange={(e) => setCustomMessage(e.target.value)} 
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Write your own reminder message..."
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Leave empty to use default message for selected type
                </p>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-gray-700 mb-2">Reminder Time</label>
                <input 
                  type="time" 
                  id="time"
                  value={time} 
                  onChange={(e) => setTime(e.target.value)} 
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Frequency</label>
                <select 
                  value={frequency} 
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              
              <Button 
                onClick={handleSaveReminder} 
                className="w-full"
                disabled={loading || !user}
              >
                {loading ? 'Saving...' : 'Save Reminder'}
              </Button>
              
              {!user && (
                <p className="text-center text-sm text-red-600">
                  Please <a href="/auth" className="underline">log in</a> to save reminders
                </p>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6">
              {user ? 'Your Reminders' : 'Sample Reminders'}
            </h3>
            
            {user ? (
              savedReminders.length > 0 ? (
                <div className="space-y-4">
                  {savedReminders.map((reminder) => (
                    <div 
                      key={reminder.id} 
                      className="p-4 rounded-lg border border-gray-200 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{reminder.title}</p>
                        <div className="flex text-sm text-gray-500 mt-1">
                          <span className="mr-3">{new Date(reminder.reminder_time).toLocaleTimeString()}</span>
                          <span>{new Date(reminder.reminder_time).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <svg className="h-16 w-16 mx-auto mb-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 6v6l4 2"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  <p>No reminders yet. Create one to get started!</p>
                </div>
              )
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-400">Sample: Turn off lights when leaving</p>
                  <div className="flex text-sm text-gray-400 mt-1">
                    <span className="mr-3">08:00</span>
                    <span>Daily</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-400">Sample: Check water usage</p>
                  <div className="flex text-sm text-gray-400 mt-1">
                    <span className="mr-3">19:00</span>
                    <span>Weekly</span>
                  </div>
                </div>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 mb-2">Log in to see your actual reminders</p>
                  <Button variant="outline" onClick={() => window.location.href = '/auth'}>
                    Sign In
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reminders;
