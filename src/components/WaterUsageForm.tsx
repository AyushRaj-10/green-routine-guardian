
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const WaterUsageForm = () => {
  const [step, setStep] = useState<number>(1);
  const [showerTime, setShowerTime] = useState<number>(10);
  const [brushTeethTap, setBrushTeethTap] = useState<boolean>(true);
  const [dishwasherUse, setDishwasherUse] = useState<string>('efficient');
  const [wateringMethod, setWateringMethod] = useState<string>('sprinkler');
  const [results, setResults] = useState<any>(null);

  const calculateWaterUsage = () => {
    // Calculate water usage based on inputs
    // Shower: average 10 liters per minute
    const showerUsage = showerTime * 10;
    
    // Brushing teeth: leaving tap on wastes ~20 liters, turning off uses ~1 liter
    const brushingUsage = brushTeethTap ? 20 : 1;
    
    // Dishwasher: standard uses ~20 liters, efficient uses ~10 liters, hand washing ~40 liters
    const dishwasherUsage = 
      dishwasherUse === 'standard' ? 20 : 
      dishwasherUse === 'efficient' ? 10 : 40;
    
    // Watering garden: sprinkler uses ~1000 liters/hour, drip irrigation ~300 liters/hour
    const wateringUsage = wateringMethod === 'sprinkler' ? 1000 : 300;
    
    const totalDailyUsage = showerUsage + (brushingUsage * 2) + dishwasherUsage;
    const totalWeeklyUsage = (totalDailyUsage * 7) + wateringUsage;
    const totalYearlyUsage = totalDailyUsage * 365 + (wateringUsage * 52);
    
    setResults({
      daily: totalDailyUsage,
      weekly: totalWeeklyUsage,
      yearly: totalYearlyUsage,
      savingPotential: 
        (brushTeethTap ? 38 : 0) + 
        (dishwasherUse === 'hand' ? 30 : 0) + 
        (wateringMethod === 'sprinkler' ? 700 : 0)
    });
    
    setStep(5);
  };

  const getQuestionForStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">How long is your average shower?</h3>
            <div className="mb-6">
              <input 
                type="range" 
                min="1" 
                max="30"
                value={showerTime} 
                onChange={(e) => setShowerTime(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                <span>1 min</span>
                <span className="font-bold">{showerTime} min</span>
                <span>30 min</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Do you leave the tap running while brushing teeth?</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setBrushTeethTap(true)}
                className={`flex-1 py-3 rounded-lg border-2 ${
                  brushTeethTap ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setBrushTeethTap(false)}
                className={`flex-1 py-3 rounded-lg border-2 ${
                  !brushTeethTap ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">How do you wash your dishes?</h3>
            <div className="space-y-3">
              <button
                onClick={() => setDishwasherUse('efficient')}
                className={`w-full py-3 px-4 text-left rounded-lg border-2 ${
                  dishwasherUse === 'efficient' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                Efficient dishwasher
              </button>
              <button
                onClick={() => setDishwasherUse('standard')}
                className={`w-full py-3 px-4 text-left rounded-lg border-2 ${
                  dishwasherUse === 'standard' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                Standard dishwasher
              </button>
              <button
                onClick={() => setDishwasherUse('hand')}
                className={`w-full py-3 px-4 text-left rounded-lg border-2 ${
                  dishwasherUse === 'hand' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                Hand washing
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">How do you water your garden?</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setWateringMethod('sprinkler')}
                className={`flex-1 py-3 rounded-lg border-2 ${
                  wateringMethod === 'sprinkler' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                Sprinkler
              </button>
              <button
                onClick={() => setWateringMethod('drip')}
                className={`flex-1 py-3 rounded-lg border-2 ${
                  wateringMethod === 'drip' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                Drip irrigation
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      calculateWaterUsage();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setShowerTime(10);
    setBrushTeethTap(true);
    setDishwasherUse('efficient');
    setWateringMethod('sprinkler');
    setResults(null);
  };

  return (
    <section className="section bg-blue-50" id="water-usage">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fadeInUp">Water Usage Calculator</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fadeInUp">
            Discover how much water you use and learn ways to conserve this precious resource.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {step <= 4 ? (
              <>
                {/* Progress indicator */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {[1, 2, 3, 4].map((s) => (
                      <div 
                        key={s} 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          s === step 
                            ? 'bg-blue-500 text-white' 
                            : s < step 
                              ? 'bg-blue-200 text-blue-800' 
                              : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300" 
                      style={{ width: `${(step - 1) * 33.33}%` }}
                    ></div>
                  </div>
                </div>

                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  {getQuestionForStep()}
                </motion.div>

                <div className="flex justify-between">
                  {step > 1 && (
                    <Button variant="outline" onClick={handlePrevious}>
                      Previous
                    </Button>
                  )}
                  <Button onClick={handleNext} className="ml-auto">
                    {step === 4 ? 'Calculate' : 'Next'}
                  </Button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Your Water Usage Results</h3>
                  <p className="text-gray-600">Here's how much water you're using based on your habits.</p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
                    <span className="text-gray-700">Daily Usage:</span>
                    <span className="text-xl font-bold text-blue-600">{results.daily} liters</span>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
                    <span className="text-gray-700">Weekly Usage:</span>
                    <span className="text-xl font-bold text-blue-600">{results.weekly} liters</span>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
                    <span className="text-gray-700">Yearly Usage:</span>
                    <span className="text-xl font-bold text-blue-600">{results.yearly} liters</span>
                  </div>
                  
                  {results.savingPotential > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="font-bold text-green-600 mb-2">Saving Opportunity!</p>
                      <p className="text-gray-700">
                        You could save approximately <span className="font-bold">{results.savingPotential} liters</span> of 
                        water per week by making simple changes to your habits.
                      </p>
                    </div>
                  )}
                </div>

                <Button onClick={handleReset} className="w-full">
                  Start Over
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaterUsageForm;
