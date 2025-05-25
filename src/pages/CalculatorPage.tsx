
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Calculator from '@/components/Calculator';
import WaterUsageForm from '@/components/WaterUsageForm';

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">Environmental Impact Calculator</h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Measure your environmental footprint and track the positive impact of your daily habits
          </p>
          
          <div className="space-y-12">
            <Calculator />
            <WaterUsageForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
