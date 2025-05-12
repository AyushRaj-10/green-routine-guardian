
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Founders } from '@/components/Founders';

const FoundersPage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">Our Founders</h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Meet the brilliant minds behind GreenRoutine
          </p>
          
          <Founders />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FoundersPage;
