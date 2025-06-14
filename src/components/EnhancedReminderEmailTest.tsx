import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const EnhancedReminderEmailTest = () => {
  const { user } = useAuth();
  const [sending, setSending] = useState(false);
  const [lastSent, setLastSent] = useState<Date | null>(null);

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
        
        // Check if it's a Resend API key issue
        if (error.message?.includes('invalid') || error.message?.includes('API key')) {
          toast({
            title: "API Key Issue 🔑",
            description: "Please verify your Resend API key is correct and has permission to send emails.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error ❌",
            description: "Failed to send test email. Please check the function logs for details.",
            variant: "destructive"
          });
        }
        return;
      }

      console.log('Test email sent successfully:', data);
      setLastSent(new Date());

      toast({
        title: "Test email sent! 📧",
        description: `A sample reminder email has been sent to ${user.email}`,
      });

    } catch (error: any) {
      console.error('Error sending test reminder email:', error);
      toast({
        title: "Error ❌",
        description: "Failed to send test email. Please check your Resend API key and try again.",
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-8 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Mail className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Email Reminder Test
          </h3>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-muted-foreground">
            Test the email reminder system by sending a sample reminder to your email address.
          </p>
          
          {lastSent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg"
            >
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">
                Last test sent: {lastSent.toLocaleTimeString()}
              </span>
            </motion.div>
          )}
          
          <p className="text-sm text-muted-foreground bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            💡 Make sure you have a valid Resend API key configured in your project settings.
          </p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={sendTestReminderEmail} 
            disabled={sending}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
          >
            {sending ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Sending Test Email...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Test Reminder Email ✨
              </div>
            )}
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default EnhancedReminderEmailTest;