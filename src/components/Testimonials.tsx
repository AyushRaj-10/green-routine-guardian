
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Environmental Advocate",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "GreenRoutine has transformed my daily habits. The reminders help me stay consistent, and seeing my impact grow motivates me every day!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Sustainability Consultant",
      image: "https://randomuser.me/api/portraits/men/32.jpg", 
      quote: "The community challenges are amazing! I've reduced my water usage by 40% and inspired my whole family to join the movement.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "College Student",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      quote: "As a student, GreenRoutine makes sustainability simple and affordable. The impact calculator shows how small changes add up!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="section bg-green-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fadeInUp">What Our Community Says</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fadeInUp">
            Real stories from people making a difference with GreenRoutine
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-green-500 mb-2" />
              </div>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
