
import { User } from "lucide-react";

// Create consistent founder information to use across the site
export const founderData = [
  {
    name: "Ayush Raj",
    role: "Co-founder & CEO",
    image: "/public/Ayush.png",
    bio: "Ayush is an 18-year-old Computer Science student at Dayananda Sagar College of Engineering. He founded GreenRoutine as a college project to make sustainable living accessible and engaging for everyone.",
    gender: "male"
  },
  {
    name: "Arpita Pai",
    role: "Co-founder & CTO",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Arpita is an 18-year-old Computer Science student who brings technical expertise to GreenRoutine. Her vision drives the platform's interactive features and seamless user experience.",
    gender: "female"
  },
  {
    name: "Astuti Singh",
    role: "Co-founder & COO",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Astuti is an 18-year-old Computer Science student who oversees operations for GreenRoutine. Her passion for environmental science informs our impact metrics and sustainability goals.",
    gender: "female"
  },
  {
    name: "Arti Pikhan",
    role: "Co-founder & Design Lead",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Arti is an 18-year-old Computer Science student whose creativity shapes the visual identity and user interface of GreenRoutine. She is passionate about making sustainability attractive.",
    gender: "female"
  }
];

export const Founders = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {founderData.map((founder, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              {founder.image ? (
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  className="w-full h-full object-cover aspect-square"
                />
              ) : (
                <div className="w-full h-full bg-green-100 flex items-center justify-center aspect-square">
                  <User className="h-16 w-16 text-green-500" />
                </div>
              )}
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-bold mb-1">{founder.name}</h3>
              <p className="text-green-600 font-medium mb-4">{founder.role}</p>
              <p className="text-gray-600">{founder.bio}</p>
              <div className="mt-4 flex items-center">
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Dayananda Sagar College of Engineering
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="col-span-1 md:col-span-2 bg-green-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Our Story</h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          The founders met at Dayananda Sagar College of Engineering where they are all 18-year-old Computer Science students. 
          What started as a college project quickly evolved into a mission to create a platform that would make sustainable living accessible, 
          engaging, and rewarding for everyone. Today, GreenRoutine is empowering thousands of users to build greener habits and collectively 
          make a significant positive impact on our planet.
        </p>
      </div>
    </div>
  );
};
