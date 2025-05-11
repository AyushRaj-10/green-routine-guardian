
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is GreenRoutine?",
          answer: "GreenRoutine is a platform designed to help you build sustainable habits through reminders, impact tracking, and community challenges. Our goal is to make it easy and engaging to reduce your environmental footprint."
        },
        {
          question: "Is GreenRoutine free to use?",
          answer: "Yes! GreenRoutine's core features are completely free. We believe sustainable living should be accessible to everyone. We may introduce premium features in the future, but the basic functionality will always remain free."
        },
        {
          question: "Do I need to create an account?",
          answer: "Creating an account allows you to save your preferences, track your progress over time, and participate in community challenges. However, you can explore many features without signing up."
        }
      ]
    },
    {
      category: "Reminders",
      questions: [
        {
          question: "How do the reminders work?",
          answer: "You can create customized reminders for eco-friendly actions like turning off lights, reducing water usage, or reducing plastic consumption. Set the frequency and timing that works best for your routine."
        },
        {
          question: "Will I get notifications?",
          answer: "Yes, you can choose to receive notifications via email, browser notifications, or through our mobile app (coming soon). You can customize which reminders trigger notifications and when."
        },
        {
          question: "Can I share reminders with family members?",
          answer: "Yes! You can create household groups and share environmental reminders with family members or roommates to build sustainable habits together."
        }
      ]
    },
    {
      category: "Challenges",
      questions: [
        {
          question: "What kinds of challenges can I participate in?",
          answer: "We offer weekly and monthly challenges like Plastic-Free Week, Zero-Waste Month, or 30-Day Energy Reduction. Join with friends to make a bigger impact together and track your collective progress."
        },
        {
          question: "How do leaderboards work?",
          answer: "Challenge leaderboards rank participants based on their reported activities and achievements. Some challenges use point systems, while others track specific metrics like water saved or waste reduced."
        },
        {
          question: "Can I create my own challenge?",
          answer: "Currently, only pre-set challenges are available, but we're working on a feature to allow users to create and invite others to custom challenges. Stay tuned for this feature coming soon!"
        }
      ]
    },
    {
      category: "Impact Calculation",
      questions: [
        {
          question: "How is my environmental impact calculated?",
          answer: "Our calculator uses scientific data to estimate water savings, energy conservation, and carbon reduction based on your reported activities. The measurements are approximate but provide a good sense of your positive impact."
        },
        {
          question: "Is the data accurate?",
          answer: "Our calculations are based on peer-reviewed research and industry standards, but individual results may vary based on specific circumstances. We continuously update our formulas to improve accuracy."
        },
        {
          question: "Can I see my historical impact?",
          answer: "Yes, registered users can view their impact history through graphs and statistics in the Dashboard section, showing daily, weekly, monthly, and yearly environmental contributions."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Find answers to common questions about using GreenRoutine
          </p>

          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, idx) => (
              <div key={idx} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-green-700">{category.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, i) => (
                    <AccordionItem key={i} value={`${idx}-item-${i}`} className="bg-white mb-4 rounded-lg border border-gray-200 overflow-hidden">
                      <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:bg-green-50">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-gray-700">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
