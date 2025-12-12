
export const calculateResearchCost = (upgradeId: string, currentLevel: number): number => {
  const researchItem = researchData[upgradeId];
  if (!researchItem) {
    console.error(`[calculateResearchCost] No se encontró la mejora con ID: ${upgradeId}`);
    return Infinity;
  }

  const rawCost = researchItem.baseCost * Math.pow(researchItem.costMultiplier, currentLevel);

  // Redondeamos al múltiplo de 5 más cercano para tener números más limpios
  return Math.round(rawCost / 5) * 5;
};
export interface ResearchItem {
  id: string;
  name: string;
  description: (level: number) => string;
  maxLevel: number;
  baseCost: number;
  costMultiplier: number;
  branch: 'production' | 'research' | 'foundry' | 'logistics';
  tier: number;
  row: number;
  requirements: string[];
  isInfinite?: boolean;
}

export const researchData: Record<string, ResearchItem> = {
  // === RAMA DE PRODUCCIÓN (VERDE) ===
  collectionEfficiency: { id: 'collectionEfficiency', name: 'Recolección Mejorada', description: (l: number) => `+${l * 10}% Prod. Chatarra`, baseCost: 100, costMultiplier: 1.2, maxLevel: 5, branch: 'production', tier: 1, row: 1, requirements: [] },
  droneAssembly: { id: 'droneAssembly', name: 'Línea de Ensamblaje', description: (l: number) => `-${l * 5}% Tiempo Constr. Drones`, baseCost: 150, costMultiplier: 1.25, maxLevel: 5, branch: 'production', tier: 2, row: 1, requirements: ['collectionEfficiency'] },
  droneScrapCost: { id: 'droneScrapCost', name: 'Geometría Optimizada', description: (l: number) => `-${l * 5}% Coste Chatarra Drones`, baseCost: 250, costMultiplier: 1.3, maxLevel: 4, branch: 'production', tier: 3, row: 1, requirements: ['droneAssembly'] },
  droneSelfRepair: { id: 'droneSelfRepair', name: 'Autómatas de Auto-Reparación', description: (l: number) => `${l * 10}% Prob. Supervivencia`, baseCost: 500, costMultiplier: 1.4, maxLevel: 5, branch: 'production', tier: 4, row: 1, requirements: ['droneScrapCost'] },
  reassignProtocols: { id: 'reassignProtocols', name: 'Protocolos de Reasignación', description: () => 'Desbloquea Desmantelamiento', baseCost: 300, costMultiplier: 1, maxLevel: 1, branch: 'production', tier: 2, row: 2, requirements: ['collectionEfficiency'] },
  droneRetrofitting: { id: 'droneRetrofitting', name: 'Reacondicionamiento de Chasis', description: () => 'Desbloquea Reacondicionamiento', baseCost: 400, costMultiplier: 1, maxLevel: 1, branch: 'production', tier: 3, row: 3, requirements: ['reassignProtocols'] },
  powerOptimization: { id: 'powerOptimization', name: 'Optimización Energética', description: (l: number) => `-${l * 5}% Consumo Energía Drones`, baseCost: 120, costMultiplier: 1.25, maxLevel: 5, branch: 'production', tier: 3, row: 2, requirements: ['reassignProtocols'] },
  energyCalibration: { id: 'energyCalibration', name: 'Calibración de Componentes', description: (l: number) => `-${l * 5}% Tiempo Constr. Energía`, baseCost: 180, costMultiplier: 1.3, maxLevel: 5, branch: 'production', tier: 4, row: 2, requirements: ['powerOptimization'] },
  energyEfficiency: { id: 'energyEfficiency', name: 'Eficiencia de Paneles', description: (l: number) => `+${l * 10}% Prod. Paneles Solares`, baseCost: 200, costMultiplier: 1.35, maxLevel: 4, branch: 'production', tier: 5, row: 2, requirements: ['energyCalibration'] },
  powerGrid: { id: 'powerGrid', name: 'Red Eléctrica Mejorada', description: (l: number) => `+${l * 5}% Prod. Global Energía`, baseCost: 400, costMultiplier: 1.4, maxLevel: 5, branch: 'production', tier: 6, row: 2, requirements: ['energyEfficiency'] },
  coreEfficiency: { id: 'coreEfficiency', name: 'Eficiencia de Núcleos', description: (l: number) => `+${l * 10}% Prod. Núcleos Energéticos`, baseCost: 800, costMultiplier: 1.5, maxLevel: 3, branch: 'production', tier: 7, row: 2, requirements: ['powerGrid'] },
  fusionTech: { id: 'fusionTech', name: 'Reactores de Fusión', description: () => 'Desbloquea Reactor de Fusión', baseCost: 5000, costMultiplier: 1, maxLevel: 1, branch: 'production', tier: 8, row: 2, requirements: ['coreEfficiency'] },
  poweredFabricators: { id: 'poweredFabricators', name: 'Fabricadores Potenciados', description: (l: number) => `+${l * 10}% Velocidad si Energía > 90%`, baseCost: 2000, costMultiplier: 1.6, maxLevel: 3, branch: 'production', tier: 9, row: 2, requirements: ['fusionTech'] },

  // === RAMA DE INVESTIGACIÓN (AZUL CIAN) ===
  researchEfficiency: { id: 'researchEfficiency', name: 'Protocolos de Datos', description: (l: number) => `+${l * 20}% RP Base`, baseCost: 150, costMultiplier: 1.2, maxLevel: 5, branch: 'research', tier: 1, row: 1, requirements: [] },
  advancedAnalysis: { id: 'advancedAnalysis', name: 'Análisis de Flota', description: (l: number) => `+${l * 10}% RP por Dron`, baseCost: 300, costMultiplier: 1.25, maxLevel: 4, branch: 'research', tier: 2, row: 1, requirements: ['researchEfficiency'] },
  reinforcedBasicDrones: { id: 'reinforcedBasicDrones', name: 'Drones Reforzados I', description: () => 'Desbloquea Drones Básicos Reforzados', baseCost: 250, costMultiplier: 1, maxLevel: 1, branch: 'research', tier: 3, row: 1, requirements: ['advancedAnalysis'] },
  reinforcedMediumDrones: { id: 'reinforcedMediumDrones', name: 'Drones Reforzados II', description: () => 'Desbloquea Drones Medios Reforzados', baseCost: 500, costMultiplier: 1, maxLevel: 1, branch: 'research', tier: 4, row: 1, requirements: ['reinforcedBasicDrones'] },
  reinforcedAdvancedDrones: { id: 'reinforcedAdvancedDrones', name: 'Drones Reforzados III', description: () => 'Desbloquea Drones Avanzados Reforzados', baseCost: 1000, costMultiplier: 1, maxLevel: 1, branch: 'research', tier: 5, row: 1, requirements: ['reinforcedMediumDrones'] },
  golemChassis: { id: 'golemChassis', name: 'Chasis Golem', description: () => 'Desbloquea Drones Golem', baseCost: 2500, costMultiplier: 1, maxLevel: 1, branch: 'research', tier: 6, row: 1, requirements: ['reinforcedAdvancedDrones'] },
  algorithmOptimization: { id: 'algorithmOptimization', name: 'Algoritmos Predictivos', description: (l: number) => `+${l * 15}% RP por Energía Excedente`, baseCost: 450, costMultiplier: 1.3, maxLevel: 4, branch: 'research', tier: 2, row: 2, requirements: ['advancedAnalysis'] },
  quantumComputing: { id: 'quantumComputing', name: 'Computación Cuántica', description: (l: number) => `-${l * 5}% Coste Investigación`, baseCost: 1500, costMultiplier: 1.5, maxLevel: 3, branch: 'research', tier: 3, row: 2, requirements: ['algorithmOptimization'] },
  constructionEfficiency: { id: 'constructionEfficiency', name: 'Eficiencia de Construcción', description: (l: number) => `-${l * 5}% Tiempo Construcción Global`, baseCost: 600, costMultiplier: 1.4, maxLevel: 5, branch: 'research', tier: 4, row: 2, requirements: ['quantumComputing'] },
  swarmAI: { id: 'swarmAI', name: 'IA de Enjambre', description: (l: number) => `+${l}% Prod. Chatarra (máx 10%)`, baseCost: 5000, costMultiplier: 1, maxLevel: 10, branch: 'research', tier: 7, row: 1, requirements: ['golemChassis'] },
  globalEfficiency: { id: 'globalEfficiency', name: 'Eficiencia Global (Infinita)', description: (l: number) => `+${(l * 0.1).toFixed(1)}% Prod. Chatarra Global`, baseCost: 10000, costMultiplier: 1.15, maxLevel: Infinity, branch: 'research', tier: 8, row: 1, requirements: ['swarmAI'], isInfinite: true },

  // === RAMA DE FUNDICIÓN (ROJO COBRE) ===
  foundryProtocols: { id: 'foundryProtocols', name: 'Protocolos de Fundición', description: () => 'Desbloquea la Fundición', baseCost: 50, costMultiplier: 1, maxLevel: 1, branch: 'foundry', tier: 1, row: 1, requirements: [] },
  metalSmeltingSpeed: { id: 'metalSmeltingSpeed', name: 'Fundición Eficiente', description: (l: number) => `-${l * 5}% Tiempo Crafteo Metal`, baseCost: 200, costMultiplier: 1.25, maxLevel: 5, branch: 'foundry', tier: 2, row: 1, requirements: ['foundryProtocols'] },
  smeltingEfficiency: { id: 'smeltingEfficiency', name: 'Eficiencia de Costes I', description: (l: number) => `-${l * 5}% Coste Chatarra Metal`, baseCost: 400, costMultiplier: 1.3, maxLevel: 4, branch: 'foundry', tier: 2, row: 2, requirements: ['foundryProtocols'] },
  steelProductionSpeed: { id: 'steelProductionSpeed', name: 'Producción de Acero', description: (l: number) => `-${l * 5}% Tiempo Crafteo Acero`, baseCost: 400, costMultiplier: 1.3, maxLevel: 5, branch: 'foundry', tier: 3, row: 1, requirements: ['metalSmeltingSpeed'] },
  foundryEnergy: { id: 'foundryEnergy', name: 'Eficiencia de Costes II', description: (l: number) => `-${l * 5}% Coste Energía Metal`, baseCost: 400, costMultiplier: 1.3, maxLevel: 4, branch: 'foundry', tier: 3, row: 2, requirements: ['smeltingEfficiency'] },
  hullPlateProduction: { id: 'hullPlateProduction', name: 'Producción de Placas', description: (l: number) => `-${l * 5}% Tiempo Crafteo Placas`, baseCost: 600, costMultiplier: 1.35, maxLevel: 5, branch: 'foundry', tier: 4, row: 1, requirements: ['steelProductionSpeed'] },
  slagRecycling: { id: 'slagRecycling', name: 'Reciclaje de Escoria', description: (l: number) => `${l * 2}% Prob. Recuperar Coste`, baseCost: 700, costMultiplier: 1.4, maxLevel: 5, branch: 'foundry', tier: 4, row: 2, requirements: ['foundryEnergy'] },
  wiringProduction: { id: 'wiringProduction', name: 'Cableado Avanzado', description: (l: number) => `-${l * 5}% Tiempo Crafteo Cableado`, baseCost: 800, costMultiplier: 1.4, maxLevel: 5, branch: 'foundry', tier: 5, row: 1, requirements: ['hullPlateProduction'] },
  lightweightAlloys: { id: 'lightweightAlloys', name: 'Aleaciones Ligeras', description: (l: number) => `-${l * 5}% Coste Metal Drones-F`, baseCost: 1200, costMultiplier: 1.5, maxLevel: 4, branch: 'foundry', tier: 5, row: 2, requirements: ['slagRecycling'] },
  fuelRodProduction: { id: 'fuelRodProduction', name: 'Síntesis de Combustible', description: (l: number) => `-${l * 5}% Tiempo Crafteo Barras`, baseCost: 1000, costMultiplier: 1.45, maxLevel: 5, branch: 'foundry', tier: 6, row: 1, requirements: ['wiringProduction'] },
  
  // === RAMA DE LOGÍSTICA (NARANJA) ===
  storageOptimization: { id: 'storageOptimization', name: 'Logística Mejorada', description: (l: number) => `+${l * 15}% Cap. Chatarra`, baseCost: 80, costMultiplier: 1.2, maxLevel: 5, branch: 'logistics', tier: 1, row: 1, requirements: [] },
  storageConstruction: { id: 'storageConstruction', name: 'Logística Eficiente', description: (l: number) => `-${l * 5}% Tiempo Constr. Almacenes`, baseCost: 130, costMultiplier: 1.25, maxLevel: 5, branch: 'logistics', tier: 2, row: 1, requirements: ['storageOptimization'] },
  cargoDrones: { id: 'cargoDrones', name: 'Drones de Carga', description: (l: number) => `+${l * 10}% Bono Almacenamiento`, baseCost: 220, costMultiplier: 1.3, maxLevel: 4, branch: 'logistics', tier: 3, row: 1, requirements: ['storageConstruction'] },
  batteryTech: { id: 'batteryTech', name: 'Tecnología de Baterías', description: (l: number) => `+${l * 15}% Cap. Energía`, baseCost: 300, costMultiplier: 1.3, maxLevel: 5, branch: 'logistics', tier: 2, row: 2, requirements: ['storageOptimization'] },
  energyStorage: { id: 'energyStorage', name: 'Almacenamiento Energético', description: (l: number) => `+${l * 10}% Bono Baterías`, baseCost: 350, costMultiplier: 1.35, maxLevel: 4, branch: 'logistics', tier: 3, row: 2, requirements: ['batteryTech'] },
  automatedDistribution: { id: 'automatedDistribution', name: 'Logística de Enjambre', description: (l: number) => `+${l * 5}% Cap. Chatarra y Energía`, baseCost: 800, costMultiplier: 1.4, maxLevel: 3, branch: 'logistics', tier: 4, row: 1, requirements: ['cargoDrones'] },
  matterCompression: { id: 'matterCompression', name: 'Compresión de Materia', description: (l: number) => `-${l * 5}% Coste Almacenamiento`, baseCost: 1200, costMultiplier: 1.5, maxLevel: 3, branch: 'logistics', tier: 4, row: 2, requirements: ['energyStorage'] },
};

