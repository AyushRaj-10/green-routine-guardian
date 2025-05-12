
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export const Story = () => {
  const timeline = [
    {
      year: "2021",
      title: "The Idea",
      content: "Four passionate students from Dayananda Sagar College of Engineering came together with a shared vision of making sustainability accessible to everyone.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800"
    },
    {
      year: "2022",
      title: "First Prototype",
      content: "What started as a college project quickly evolved into a full-fledged application. The team worked tirelessly to develop the core features: reminders, challenges, and impact tracking.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800"
    },
    {
      year: "2023",
      title: "Growing Community",
      content: "GreenRoutine launched publicly and quickly attracted a community of environmentally conscious users. The platform helped save thousands of liters of water and reduce carbon emissions significantly.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800"
    },
    {
      year: "2024",
      title: "Impact & Recognition",
      content: "The app gained recognition for its innovative approach to sustainability. Several environmental organizations and educational institutions partnered with GreenRoutine to promote eco-friendly habits.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbafc3efd?auto=format&fit=crop&w=800"
    },
    {
      year: "2025",
      title: "Looking Forward",
      content: "With a growing user base and expanding features, GreenRoutine continues its mission to create a more sustainable future, one habit at a time.",
      image: "https://images.unsplash.com/photo-1516900448138-f5491c34e232?auto=format&fit=crop&w=800"
    }
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-300 z-0"></div>
      
      {/* Timeline entries */}
      {timeline.map((event, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className={`flex flex-col md:flex-row items-center mb-16 relative z-10 ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Year bubble */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none flex-shrink-0">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white font-bold shadow-lg">
              {event.year}
            </div>
          </div>
          
          {/* Content card */}
          <div className={`w-full md:w-5/12 mt-8 md:mt-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-green-700">{event.title}</h3>
              <p className="text-gray-600">{event.content}</p>
            </div>
          </div>
          
          {/* Image */}
          <div className={`w-full md:w-5/12 mt-6 md:mt-0 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
            <img 
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </motion.div>
      ))}
      
      <div className="text-center mt-16 relative z-10">
        <div className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-full shadow-md">
          <BookOpen className="mr-2" />
          <span>Continue Reading Our Blog</span>
        </div>
      </div>
    </div>
  );
};
