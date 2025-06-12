
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Mail } from 'lucide-react';

const ReminderEmailTest = () => {
  const { user } = useAuth();
  const [sending, setSending] = useState(false);

  const sendTestReminderEmail = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to test email reminders",
        variant: "destructive"
      });
      return;
    }

    setSending(true);
    
    try {
      const testReminderData = {
        reminderId: 'test-' + Date.now(),
        userEmail: user.email,
        userName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        reminderTitle: 'Turn off lights when leaving the room',
        reminderDescription: 'Remember to switch off all lights and electrical appliances when you leave a room to save energy and reduce your carbon footprint.',
        reminderTime: new Date().toISOString()
      };

      console.log('Sending test reminder email with data:', testReminderData);

      const { data, error } = await supabase.functions.invoke('send-reminder-email', {
        body: testReminderData
      });

      if (error) {
        console.error('Error sending test email:', error);
        throw error;
      }

      console.log('Test email sent successfully:', data);

      toast({
        title: "Test email sent! 📧",
        description: `A sample reminder email has been sent to ${user.email}`,
      });

    } catch (error: any) {
      console.error('Error sending test reminder email:', error);
      toast({
        title: "Error",
        description: "Failed to send test email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="p-6 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">Email Reminder Test</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Test the email reminder system by sending a sample reminder to your email address.
      </p>
      <Button 
        onClick={sendTestReminderEmail} 
        disabled={sending}
        className="w-full"
      >
        {sending ? 'Sending...' : 'Send Test Reminder Email'}
      </Button>
    </Card>
  );
};

export default ReminderEmailTest;
