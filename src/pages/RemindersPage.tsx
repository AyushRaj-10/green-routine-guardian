import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReminderEmailTest from '@/components/ReminderEmailTest';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, AlertCircle, Check, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';

type Reminder = {
  id: string;
  title: string;
  description: string;
  reminder_time: string;
  is_completed: boolean;
  created_at: string;
}

const RemindersPage = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('12:00');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchReminders();
    }
  }, [user]);

  const fetchReminders = async () => {
    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user?.id)
        .order('reminder_time', { ascending: true });

      if (error) throw error;
      setReminders(data || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      toast({
        title: "Error",
        description: "Failed to load reminders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !date || !time) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create reminders",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const reminderDateTime = new Date(date);
      const [hours, minutes] = time.split(':');
      reminderDateTime.setHours(parseInt(hours), parseInt(minutes));

      const { data, error } = await supabase
        .from('reminders')
        .insert([
          {
            user_id: user.id,
            title,
            description,
            reminder_time: reminderDateTime.toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Reminder created!",
        description: "Your eco-friendly reminder has been set",
        action: (
          <Check className="h-4 w-4 text-green-500" />
        ),
      });

      // Send immediate email notification about the reminder creation
      if (data) {
        try {
          await supabase.functions.invoke('send-reminder-email', {
            body: {
              reminderId: data.id,
              userEmail: user.email,
              userName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
              reminderTitle: title,
              reminderDescription: description,
              reminderTime: reminderDateTime.toISOString()
            }
          });
          
          toast({
            title: "Email sent! 📧",
            description: "A confirmation email has been sent to your inbox",
          });
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
          // Don't show error to user as the reminder was still created successfully
        }
      }
      
      // Reset form
      setTitle('');
      setDescription('');
      setDate(new Date());
      setTime('12:00');
      
      // Refresh reminders
      fetchReminders();
    } catch (error) {
      console.error('Error creating reminder:', error);
      toast({
        title: "Error",
        description: "Failed to create reminder",
        variant: "destructive"
      });
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id);

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

  const toggleComplete = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .update({ is_completed: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      fetchReminders();
    } catch (error) {
      console.error('Error updating reminder:', error);
      toast({
        title: "Error",
        description: "Failed to update reminder",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">Eco-Friendly Reminders</h1>
          <p className="text-xl text-gray-600 mb-10 text-center max-w-2xl mx-auto">
            Create custom reminders to help you maintain sustainable habits in your daily routine
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Create Reminder Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-green-700">Create New Reminder</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Reminder Title*
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Turn off lights when leaving"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add more details about this reminder"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Date*
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium mb-1">
                        Time*
                      </label>
                      <div className="flex">
                        <div className="relative w-full">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 mt-4">
                    Create Reminder
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Reminders List */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-green-700">Your Reminders</h2>
              
              {loading ? (
                <div className="text-center py-12">
                  <p>Loading your reminders...</p>
                </div>
              ) : reminders.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No reminders yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Create your first eco-friendly reminder to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className={`border border-gray-200 rounded-lg p-4 transition-colors ${
                      reminder.is_completed ? 'bg-green-50' : 'hover:bg-green-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleComplete(reminder.id, reminder.is_completed)}
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                reminder.is_completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {reminder.is_completed && <Check className="w-3 h-3 text-white" />}
                            </button>
                            <h3 className={`font-medium ${reminder.is_completed ? 'line-through text-gray-500' : ''}`}>
                              {reminder.title}
                            </h3>
                          </div>
                          {reminder.description && (
                            <p className="text-sm text-gray-600 mt-1 ml-6">{reminder.description}</p>
                          )}
                          <div className="flex items-center mt-2 text-sm text-gray-500 ml-6">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                            <span>{format(new Date(reminder.reminder_time), 'PPP')}</span>
                            <Clock className="h-3.5 w-3.5 ml-3 mr-1" />
                            <span>{format(new Date(reminder.reminder_time), 'HH:mm')}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteReminder(reminder.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Email Test Component */}
          <div className="max-w-md mx-auto">
            <ReminderEmailTest />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RemindersPage;
