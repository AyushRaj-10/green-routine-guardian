
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReminderEmailRequest {
  reminderId: string;
  userEmail: string;
  userName: string;
  reminderTitle: string;
  reminderDescription?: string;
  reminderTime: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if RESEND_API_KEY is available
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ 
          error: "Email service not configured. Please set up RESEND_API_KEY." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resend = new Resend(resendApiKey);

    const { 
      reminderId, 
      userEmail, 
      userName, 
      reminderTitle, 
      reminderDescription, 
      reminderTime 
    }: ReminderEmailRequest = await req.json();

    console.log(`Sending reminder email to ${userEmail} for reminder: ${reminderTitle}`);

    const emailResponse = await resend.emails.send({
      from: "EcoReminder <onboarding@resend.dev>",
      to: [userEmail],
      subject: `🌱 Eco Reminder: ${reminderTitle}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🌱 Your Eco Reminder</h1>
          </div>
          
          <div style="background: #f8fffe; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${userName}!</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
              <h3 style="color: #059669; margin-top: 0;">${reminderTitle}</h3>
              ${reminderDescription ? `<p style="color: #4b5563; line-height: 1.6;">${reminderDescription}</p>` : ''}
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
                <strong>Reminder Time:</strong> ${new Date(reminderTime).toLocaleString()}
              </p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              This is your eco-friendly reminder to help you maintain sustainable habits. 
              Every small action counts towards creating a better environment for everyone! 🌍
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://okbvrklpvkepeskznqyk.lovable.app/reminders" 
                 style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                Manage My Reminders
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
              You're receiving this because you set up an eco reminder. 
              <br>Keep up the great work in making the world a greener place! 💚
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email send response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: `Email sending failed: ${emailResponse.error.message}` 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Reminder email sent successfully:", emailResponse.data);

    // Update the reminder to mark email as sent (only if it's not a test)
    if (!reminderId.startsWith('test-')) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        const { error: updateError } = await supabase
          .from('reminders')
          .update({ email_sent: true })
          .eq('id', reminderId);

        if (updateError) {
          console.error('Error updating reminder:', updateError);
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reminder-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
