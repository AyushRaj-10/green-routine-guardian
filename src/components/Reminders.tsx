
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Reminders = () => {
  const [reminderType, setReminderType] = useState<string>('water');
  const [time, setTime] = useState<string>('08:00');
  const [frequency, setFrequency] = useState<string>('daily');
  const [savedReminders, setSavedReminders] = useState<any[]>([
    {
      id: 1,
      type: 'water',
      time: '07:45',
      message: 'Remember to turn off the tap while brushing teeth',
      frequency: 'daily',
    },
    {
      id: 2,
      type: 'energy',
      time: '09:45',
      message: 'Don\'t forget to turn off lights before leaving',
      frequency: 'weekdays',
    },
  ]);

  const getReminderMessage = (type: string) => {
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

  const handleSaveReminder = () => {
    const newReminder = {
      id: Date.now(),
      type: reminderType,
      time,
      message: getReminderMessage(reminderType),
      frequency,
    };
    
    setSavedReminders([...savedReminders, newReminder]);
    
    // Reset form
    setReminderType('water');
    setTime('08:00');
    setFrequency('daily');
  };

  const handleDeleteReminder = (id: number) => {
    setSavedReminders(savedReminders.filter(reminder => reminder.id !== id));
  };

  return (
    <section id="reminders" className="section bg-green-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fadeInUp">Set Eco Reminders</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fadeInUp">
            Create customized reminders to help you develop sustainable habits.
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
              
              <Button onClick={handleSaveReminder} className="w-full">
                Save Reminder
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Your Reminders</h3>
            
            {savedReminders.length > 0 ? (
              <div className="space-y-4">
                {savedReminders.map((reminder) => (
                  <div 
                    key={reminder.id} 
                    className="p-4 rounded-lg border border-gray-200 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-4 ${
                        reminder.type === 'water' ? 'bg-blue-100 text-blue-500' :
                        reminder.type === 'energy' ? 'bg-yellow-100 text-yellow-500' :
                        'bg-green-100 text-green-500'
                      }`}>
                        {reminder.type === 'water' && (
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v6M12 22v-6M4.93 10.93l4.24 4.24M14.83 8.83l4.24 4.24M19.07 10.93l-4.24 4.24M9.17 8.83L4.93 13.07M22 12h-6M8 12H2"></path>
                          </svg>
                        )}
                        {reminder.type === 'energy' && (
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                          </svg>
                        )}
                        {reminder.type === 'waste' && (
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{reminder.message}</p>
                        <div className="flex text-sm text-gray-500 mt-1">
                          <span className="mr-3">{reminder.time}</span>
                          <span className="capitalize">{reminder.frequency}</span>
                        </div>
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
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reminders;
