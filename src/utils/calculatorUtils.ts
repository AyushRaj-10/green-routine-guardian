
// Calculate CO2 emissions for different activities
export const calculateElectricityEmissions = (kWh: number): number => {
  // Average CO2 emission factor for electricity: 0.5 kg per kWh
  return kWh * 0.5;
};

export const calculateWaterEmissions = (liters: number): number => {
  // CO2 emissions from water usage: 0.001 kg per liter
  return liters * 0.001;
};

export const calculateTransportEmissions = (
  distance: number,
  transportType: string
): number => {
  // CO2 emission factors for different transport types (kg per km)
  const emissionFactors: Record<string, number> = {
    car: 0.2,
    bus: 0.1,
    train: 0.05,
    bicycle: 0,
    walking: 0,
    plane: 0.25,
  };

  return distance * (emissionFactors[transportType] || emissionFactors.car);
};

export const calculateFoodEmissions = (
  meatConsumption: number,
  dairyConsumption: number,
  vegetableConsumption: number
): number => {
  // CO2 emission factors for food (kg per kg of food)
  const meatFactor = 13.3;
  const dairyFactor = 4.5;
  const vegetableFactor = 0.5;

  return (
    meatConsumption * meatFactor +
    dairyConsumption * dairyFactor +
    vegetableConsumption * vegetableFactor
  );
};

// Convert CO2 emissions to ecological impact
export const calculateTreesNeeded = (co2Emissions: number): number => {
  // Average tree absorbs about 25 kg of CO2 per year
  return co2Emissions / 25;
};

export const calculateWaterSaved = (waterUsage: number): number => {
  // Estimate water saved by reducing consumption (liters)
  return waterUsage * 0.3;
};

export const calculateCostSavings = (
  electricityUsage: number,
  waterUsage: number
): number => {
  // Estimate cost savings ($)
  const electricityCost = 0.15; // $ per kWh
  const waterCost = 0.002; // $ per liter

  return electricityUsage * electricityCost + waterUsage * waterCost;
};

// Format numbers for display
export const formatNumber = (num: number): string => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
