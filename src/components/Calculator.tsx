
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    
    // Prepare chart data
    const chartData = [
      { name: 'Electricity', value: electricityEmissions, color: '#fbbf24' },
      { name: 'Water', value: waterEmissions, color: '#3b82f6' },
      { name: 'Transport', value: transportEmissions, color: '#ef4444' }
    ].filter(item => item.value > 0);

    const barData = [
      { category: 'Electricity', emissions: electricityEmissions },
      { category: 'Water', emissions: waterEmissions },
      { category: 'Transport', emissions: transportEmissions }
    ];
    
    setResults({
      totalEmissions,
      treesNeeded,
      waterSaved,
      costSavings,
      chartData,
      barData,
      electricityEmissions,
      waterEmissions,
      transportEmissions
    });
  };

  const resetCalculator = () => {
    setElectricity(0);
    setWater(0);
    setDistance(0);
    setTransportType('car');
    setResults(null);
  };

  const getImpactLevel = (emissions: number) => {
    if (emissions < 50) return { level: 'Low', color: 'bg-green-500', percentage: 25 };
    if (emissions < 150) return { level: 'Medium', color: 'bg-yellow-500', percentage: 50 };
    if (emissions < 300) return { level: 'High', color: 'bg-orange-500', percentage: 75 };
    return { level: 'Very High', color: 'bg-red-500', percentage: 100 };
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

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 bg-green-600">
              <h3 className="text-2xl font-bold text-white mb-8">Enter Your Usage</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-white mb-3 text-lg">Monthly Electricity (kWh)</label>
                  <input 
                    type="number" 
                    value={electricity}
                    onChange={(e) => setElectricity(Number(e.target.value))} 
                    className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
                    placeholder="e.g. 300"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-3 text-lg">Monthly Water Usage (Liters)</label>
                  <input 
                    type="number" 
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))} 
                    className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
                    placeholder="e.g. 5000"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-3 text-lg">Daily Travel Distance (km)</label>
                  <input 
                    type="number" 
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))} 
                    className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
                    placeholder="e.g. 20"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-3 text-lg">Transportation Type</label>
                  <select 
                    value={transportType}
                    onChange={(e) => setTransportType(e.target.value)}
                    className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
                  >
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                    <option value="train">Train</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="walking">Walking</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleCalculate}
                  className="bg-white text-green-600 hover:bg-green-50 py-3 px-8 text-lg"
                >
                  Calculate Impact
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={resetCalculator}
                  className="border-white text-white hover:bg-white/10 py-3 px-8 text-lg"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Your Environmental Impact</h3>
              
              {results ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Impact Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-8 rounded-xl">
                      <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-500 text-lg">Total CO2 Emissions</p>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getImpactLevel(results.totalEmissions).color} text-white`}>
                          {getImpactLevel(results.totalEmissions).level}
                        </span>
                      </div>
                      <p className="text-4xl font-bold text-gray-800 mb-6">{formatNumber(results.totalEmissions)} kg</p>
                      <Progress 
                        value={getImpactLevel(results.totalEmissions).percentage} 
                        className="h-3"
                      />
                    </div>
                    
                    <div className="bg-green-50 p-8 rounded-xl">
                      <p className="text-gray-500 mb-3 text-lg">Trees Needed to Offset</p>
                      <p className="text-4xl font-bold text-green-600 mb-6">{formatNumber(results.treesNeeded)} trees</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>🌳 Each tree absorbs ~25kg CO2/year</span>
                      </div>
                    </div>
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Pie Chart */}
                    <div className="bg-white border rounded-xl p-8">
                      <h4 className="text-xl font-semibold mb-6">Emissions Breakdown</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={results.chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {results.chartData.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => [`${formatNumber(value)} kg`, 'CO2 Emissions']} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex justify-center space-x-6 mt-4">
                        {results.chartData.map((entry: any, index: number) => (
                          <div key={index} className="flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-2`} style={{ backgroundColor: entry.color }}></div>
                            <span className="text-sm text-gray-600 font-medium">{entry.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white border rounded-xl p-8">
                      <h4 className="text-xl font-semibold mb-6">Category Comparison</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={results.barData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip formatter={(value: any) => [`${formatNumber(value)} kg`, 'CO2 Emissions']} />
                          <Bar dataKey="emissions" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <p className="text-gray-500 text-sm mb-2">Water Conservation Potential</p>
                      <p className="text-3xl font-bold text-blue-600 mb-2">{formatNumber(results.waterSaved)} L</p>
                      <p className="text-xs text-gray-600">30% reduction estimate</p>
                    </div>
                    
                    <div className="bg-orange-50 p-6 rounded-xl">
                      <p className="text-gray-500 text-sm mb-2">Potential Annual Savings</p>
                      <p className="text-3xl font-bold text-orange-600 mb-2">${formatNumber(results.costSavings * 12)}</p>
                      <p className="text-xs text-gray-600">Through efficiency improvements</p>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-xl">
                      <p className="text-gray-500 text-sm mb-2">Environmental Score</p>
                      <p className="text-3xl font-bold text-purple-600 mb-2">{Math.max(100 - Math.round(results.totalEmissions / 5), 0)}/100</p>
                      <p className="text-xs text-gray-600">Lower emissions = higher score</p>
                    </div>
                  </div>

                  {/* Action Recommendations */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl">
                    <h4 className="text-xl font-semibold mb-6">💡 Recommendations to Reduce Your Impact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {results.electricityEmissions > 50 && (
                        <div className="flex items-start space-x-4">
                          <span className="text-yellow-500 text-xl">⚡</span>
                          <span className="text-sm">Switch to LED bulbs and unplug devices when not in use</span>
                        </div>
                      )}
                      {results.transportEmissions > 50 && (
                        <div className="flex items-start space-x-4">
                          <span className="text-blue-500 text-xl">🚲</span>
                          <span className="text-sm">Consider cycling, walking, or public transport for short trips</span>
                        </div>
                      )}
                      {results.waterEmissions > 20 && (
                        <div className="flex items-start space-x-4">
                          <span className="text-blue-400 text-xl">💧</span>
                          <span className="text-sm">Take shorter showers and fix any water leaks</span>
                        </div>
                      )}
                      <div className="flex items-start space-x-4">
                        <span className="text-green-500 text-xl">🌱</span>
                        <span className="text-sm">Join our challenges to make sustainable changes step by step</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500 py-16">
                  <svg className="h-20 w-20 text-gray-300 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <p className="text-xl mb-3">Ready to Calculate Your Impact?</p>
                  <p className="text-gray-400">Enter your usage data and click Calculate to see detailed insights</p>
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
