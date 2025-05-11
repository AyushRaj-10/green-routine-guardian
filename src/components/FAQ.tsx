
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is GreenRoutine?",
      answer: "GreenRoutine is a platform designed to help you build sustainable habits through reminders, impact tracking, and community challenges. Our goal is to make it easy and engaging to reduce your environmental footprint."
    },
    {
      question: "How do the reminders work?",
      answer: "You can create customized reminders for eco-friendly actions like turning off lights, reducing water usage, or reducing plastic consumption. Set the frequency and timing that works best for your routine."
    },
    {
      question: "What kinds of challenges can I participate in?",
      answer: "We offer weekly and monthly challenges like Plastic-Free Week, Zero-Waste Month, or 30-Day Energy Reduction. Join with friends to make a bigger impact together and track your collective progress."
    },
    {
      question: "How is my environmental impact calculated?",
      answer: "Our calculator uses scientific data to estimate water savings, energy conservation, and carbon reduction based on your reported activities. The measurements are approximate but provide a good sense of your positive impact."
    },
    {
      question: "Is GreenRoutine free to use?",
      answer: "Yes! GreenRoutine's core features are completely free. We believe sustainable living should be accessible to everyone. We may introduce premium features in the future, but the basic functionality will always remain free."
    }
  ];

  return (
    <section id="faq" className="section bg-green-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about how GreenRoutine works? We've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
