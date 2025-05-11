
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  calculateElectricityEmissions, 
  calculateWaterEmissions,
  calculateTransportEmissions,
  formatNumber,
  calculateTreesNeeded,
  calculateWaterSaved,
  calculateCostSavings
} from '../utils/calculatorUtils';

const Calculator = () => {
  const [electricity, setElectricity] = useState<number>(0);
  const [water, setWater] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [transportType, setTransportType] = useState<string>('car');
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    // Calculate emissions
    const electricityEmissions = calculateElectricityEmissions(electricity);
    const waterEmissions = calculateWaterEmissions(water);
    const transportEmissions = calculateTransportEmissions(distance, transportType);
    const totalEmissions = electricityEmissions + waterEmissions + transportEmissions;
    
    // Calculate environmental impact
    const treesNeeded = calculateTreesNeeded(totalEmissions);
    const waterSaved = calculateWaterSaved(water);
    const costSavings = calculateCostSavings(electricity, water);
    
    setResults({
      totalEmissions,
      treesNeeded,
      waterSaved,
      costSavings,
    });
  };

  const resetCalculator = () => {
    setElectricity(0);
    setWater(0);
    setDistance(0);
    setTransportType('car');
    setResults(null);
  };

  return (
    <section id="calculator" className="section bg-green-50 py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fadeInUp">Calculate Your Impact</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fadeInUp">
            Understand how your daily habits affect the environment and what you can do to reduce your footprint.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 bg-green-600">
              <h3 className="text-2xl font-bold text-white mb-6">Enter Your Usage</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Monthly Electricity (kWh)</label>
                  <input 
                    type="number" 
                    value={electricity}
                    onChange={(e) => setElectricity(Number(e.target.value))} 
                    className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="e.g. 300"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Monthly Water Usage (Liters)</label>
                  <input 
                    type="number" 
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))} 
                    className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="e.g. 5000"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Daily Travel Distance (km)</label>
                  <input 
                    type="number" 
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))} 
                    className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="e.g. 20"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Transportation Type</label>
                  <select 
                    value={transportType}
                    onChange={(e) => setTransportType(e.target.value)}
                    className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                    <option value="train">Train</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="walking">Walking</option>
                  </select>
                </div>
                
                <div className="pt-4 flex space-x-4">
                  <Button 
                    onClick={handleCalculate}
                    className="bg-white text-green-600 hover:bg-green-50"
                  >
                    Calculate
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={resetCalculator}
                    className="border-white text-white hover:bg-white/10"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Impact</h3>
              
              {results ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-500">CO2 Emissions</p>
                    <p className="text-2xl font-bold text-gray-800">{formatNumber(results.totalEmissions)} kg</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-500">Trees Needed to Offset</p>
                    <p className="text-2xl font-bold text-green-600">{formatNumber(results.treesNeeded)} trees</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-500">Water That Could Be Saved</p>
                    <p className="text-2xl font-bold text-blue-600">{formatNumber(results.waterSaved)} liters</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-gray-500">Potential Cost Savings</p>
                    <p className="text-2xl font-bold text-orange-600">${formatNumber(results.costSavings)}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <svg className="h-16 w-16 text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <p>Enter your usage data and click Calculate to see your environmental impact</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
