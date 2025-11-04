import React, { useState } from 'react';
import './Laboratory.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import { formatNumber } from '../utils/formatNumber';

interface LaboratoryProps {
  gameState: GameState; // Le pasamos el estado completo
  onResearchUpgrade: (upgradeName: string, cost: number) => void;
  onClose: () => void;
}

const Laboratory: React.FC<LaboratoryProps> = ({ 
  gameState,
  onResearchUpgrade, 
  onClose 
}) => {
  const { techCenter, drones, resources } = gameState;
  const { unlocked, researchPoints, upgrades } = techCenter;

  // --- NUEVA LÓGICA PARA EL TOOLTIP ---
  const [showTooltip, setShowTooltip] = useState(false);

  // Replicamos la lógica de cálculo de `tickLogic.ts` para mostrarla
  const baseResearch = 0.1 * (1 + ((upgrades.researchEfficiency || 0) * 0.20));
  const totalDrones = Object.values(drones).reduce((sum, count) => sum + count, 0);
  const droneResearch = (totalDrones * 0.01) * (1 + ((upgrades.advancedAnalysis || 0) * 0.10));
  const energySurplus = Math.max(0, resources.energyProduction - resources.energyConsumption);
  const energyResearch = (energySurplus * 0.005) * (1 + ((upgrades.algorithmOptimization || 0) * 0.15));
  const totalResearchPerSecond = (baseResearch + droneResearch + energyResearch) / (1 - ((upgrades.quantumComputing || 0) * 0.05));
  // --- FIN DE LA NUEVA LÓGICA ---
  
  const techTree = [
    // --- COLUMNA: DRONES ---
        { id: 'collectionEfficiency', category: 'Drones', title: 'Recolección Mejorada', description: 'Aumenta la chatarra recolectada por los drones.', effect: (level: number) => `+${level * 10}% Prod. Chatarra`, cost: 100, maxLevel: 5, requirements: [] },
    { id: 'droneAssembly', category: 'Drones', title: 'Línea de Ensamblaje', description: 'Acelera la construcción de todo tipo de drones.', effect: (level: number) => `-${level * 5}% Tiempo Constr.`, cost: 150, maxLevel: 5, requirements: ['collectionEfficiency'] },
    { id: 'reinforcedBasicDrones', category: 'Drones', title: 'Drones Reforzados I', description: 'Desbloquea drones básicos reforzados.', effect: () => 'Desbloquea DBR-F', cost: 250, maxLevel: 1, requirements: ['droneAssembly'] },
    { id: 'reinforcedMediumDrones', category: 'Drones', title: 'Drones Reforzados II', description: 'Desbloquea drones medios reforzados.', effect: () => 'Desbloquea DMR-F', cost: 500, maxLevel: 1, requirements: ['reinforcedBasicDrones'] },
    { id: 'reinforcedAdvancedDrones', category: 'Drones', title: 'Drones Reforzados III', description: 'Desbloquea drones avanzados reforzados.', effect: () => 'Desbloquea DAR-F', cost: 1000, maxLevel: 1, requirements: ['reinforcedMediumDrones'] },
    { id: 'golemChassis', category: 'Drones', title: 'Chasis Golem', description: 'Desbloquea los poderosos Drones Golem.', effect: () => 'Desbloquea DG-1', cost: 2500, maxLevel: 1, requirements: ['reinforcedAdvancedDrones'] },
        { id: 'swarmAI', category: 'Drones', title: 'IA de Enjambre', description: 'Por cada 50 drones, +1% a la producción global de chatarra (máx 10%).', effect: (level: number) => `Actualmente: +${level}%`, cost: 5000, maxLevel: 10, requirements: ['golemChassis'] },
    { id: 'reassignProtocols', category: 'Drones', title: 'Protocolos de Reasignación', description: 'Desbloquea la capacidad de desmantelar drones en el Taller para recuperar el 75% de sus costes.', effect: () => 'Desbloquea Desmantelamiento', cost: 1200, maxLevel: 1, requirements: ['swarmAI'] },
    { id: 'geologicalScanners', category: 'Drones', title: 'Scanners Geológicos', description: 'Los drones tienen una pequeña probabilidad de encontrar recursos raros al recolectar chatarra.', effect: (level: number) => `+${level * 0.01}% Prob. Recursos Raros`, cost: 3000, maxLevel: 5, requirements: ['reaasignProtocols'] },

    // --- COLUMNA: ENERGÍA ---
        { id: 'powerOptimization', category: 'Energia', title: 'Optimización Energética', description: 'Reduce el consumo de energía de los drones.', effect: (level: number) => `-${level * 5}% Consumo Energía`, cost: 120, maxLevel: 5, requirements: [] },
    { id: 'energyCalibration', category: 'Energia', title: 'Calibración de Componentes', description: 'Acelera la construcción de unidades de energía.', effect: (level: number) => `-${level * 5}% Tiempo Constr.`, cost: 180, maxLevel: 5, requirements: ['powerOptimization'] },
        { id: 'energyEfficiency', category: 'Energia', title: 'Eficiencia de Paneles', description: 'Aumenta la producción de los paneles solares.', effect: (level: number) => `+${level * 10}% Prod. Paneles`, cost: 200, maxLevel: 4, requirements: ['energyCalibration'] },
    { id: 'powerGrid', category: 'Energia', title: 'Red Eléctrica Mejorada', description: 'Aumenta la producción de todas las fuentes de energía.', effect: (level: number) => `+${level * 5}% Prod. Global`, cost: 400, maxLevel: 5, requirements: ['energyEfficiency'] },
    { id: 'batteryTech', category: 'Energia', title: 'Tecnología de Baterías', description: 'Aumenta la capacidad máxima de energía.', effect: (level: number) => `+${level * 15}% Cap. Energía`, cost: 300, maxLevel: 5, requirements: ['powerGrid'] },
    { id: 'coreEfficiency', category: 'Energia', title: 'Eficiencia de Núcleos', description: 'Aumenta la producción de los Núcleos Energéticos.', effect: (level: number) => `+${level * 10}% Prod. Núcleos`, cost: 800, maxLevel: 3, requirements: ['batteryTech'] },
    { id: 'geothermalEnergy', category: 'Energia', title: 'Energía Geotérmica', description: 'Desbloquea el Generador Geotérmico (Próximamente).', effect: () => 'Desbloqueo', cost: 3000, maxLevel: 1, requirements: ['coreEfficiency'] },
        { id: 'fusionTech', category: 'Energia', title: 'Reactores de Fusión', description: 'Desbloquea el Reactor de Fusión, una fuente de energía masiva.', effect: () => 'Desbloquea Reactor', cost: 5000, maxLevel: 1, requirements: ['geothermalEnergy'] },
    { id: 'poweredFabricators', category: 'Energia', title: 'Fabricadores Potenciados', description: 'Si la energía está por encima del 90%, la construcción y crafteo es un 10% más rápida.', effect: (level: number) => `+${level * 10}% Velocidad (Bono)`, cost: 2000, maxLevel: 3, requirements: ['fusionTech'] },

    // --- COLUMNA: INVESTIGACIÓN ---
    { id: 'researchEfficiency', category: 'Investigacion', title: 'Protocolos de Datos', description: 'Aumenta la generación base de Puntos de Investigación (RP).', effect: (level: number) => `+${level * 20}% RP Base`, cost: 150, maxLevel: 5, requirements: [] },
    { id: 'advancedAnalysis', category: 'Investigacion', title: 'Análisis de Flota', description: 'Los drones generan más RP.', effect: (level: number) => `+${level * 10}% RP por Dron`, cost: 300, maxLevel: 4, requirements: ['researchEfficiency'] },
        { id: 'algorithmOptimization', category: 'Investigacion', title: 'Algoritmos Predictivos', description: 'La energía sobrante genera más RP.', effect: (level: number) => `+${level * 15}% RP por Energía Excedente`, cost: 450, maxLevel: 4, requirements: ['advancedAnalysis'] },
    { id: 'constructionEfficiency', category: 'Investigacion', title: 'Eficiencia de Construcción', description: 'Reduce el tiempo de construcción de todas las unidades.', effect: (level: number) => `-${level * 5}% Tiempo de Construcción`, cost: 600, maxLevel: 5, requirements: ['algorithmOptimization'] },
    { id: 'quantumComputing', category: 'Investigacion', title: 'Computación Cuántica', description: 'Reduce el coste de todas las investigaciones.', effect: (level: number) => `-${level * 5}% Coste Investigación`, cost: 1500, maxLevel: 3, requirements: ['constructionEfficiency'] },
    { id: 'singularity', category: 'Investigacion', title: 'Singularidad (Próximamente)', description: 'Trascendencia tecnológica.', effect: () => 'Próximamente', cost: 10000, maxLevel: 1, requirements: ['quantumComputing'] },
    { id: 'globalEfficiency', category: 'Investigacion', title: 'Eficiencia Global (Infinita)', description: 'Aumenta permanentemente toda la producción de chatarra.', effect: (level: number) => `+${level}% Prod. Chatarra`, cost: 10000, maxLevel: Infinity, requirements: [], isInfinite: true }, // La infinita
    
    // --- COLUMNA: ALMACENAMIENTO ---
        { id: 'storageOptimization', category: 'Almacenamiento', title: 'Logística Mejorada', description: 'Aumenta la capacidad de almacenamiento de chatarra.', effect: (level: number) => `+${level * 15}% Cap. Chatarra`, cost: 80, maxLevel: 5, requirements: [] },
    { id: 'storageConstruction', category: 'Almacenamiento', title: 'Logística Eficiente', description: 'Acelera la construcción de unidades de almacenamiento.', effect: (level: number) => `-${level * 5}% Tiempo Constr.`, cost: 130, maxLevel: 5, requirements: ['storageOptimization'] },
    { id: 'cargoDrones', category: 'Almacenamiento', title: 'Drones de Carga', description: 'Aumenta la capacidad de las unidades de almacenamiento.', effect: (level: number) => `+${level * 10}% Bono Almacenamiento`, cost: 220, maxLevel: 4, requirements: ['storageConstruction'] },
    { id: 'energyStorage', category: 'Almacenamiento', title: 'Almacenamiento Energético', description: 'Aumenta la capacidad de las baterías.', effect: (level: number) => `+${level * 10}% Bono Baterías`, cost: 350, maxLevel: 4, requirements: ['cargoDrones'] },
    { id: 'matterCompression', category: 'Almacenamiento', title: 'Compresión de Materia', description: 'Reduce el coste de construcción de unidades de almacenamiento.', effect: (level: number) => `-${level * 5}% Coste Almacenamiento`, cost: 1200, maxLevel: 3, requirements: ['energyStorage'] },
    { id: 'pocketDimension', category: 'Almacenamiento', title: 'Dimensión de Bolsillo (Próximamente)', description: 'Almacenamiento casi infinito.', effect: () => 'Próximamente', cost: 6000, maxLevel: 1, requirements: ['matterCompression'] },

    // --- COLUMNA: FUNDICIÓN ---
    { id: 'foundryProtocols', category: 'Fundicion', title: 'Protocolos de Fundición', description: 'Desbloquea la Fundición para crear Metal Refinado.', effect: () => 'Desbloquea la Fundición', cost: 50, maxLevel: 1, requirements: [] },
    { id: 'metalSmeltingSpeed', category: 'Fundicion', title: 'Fundición Eficiente', description: 'Reduce el tiempo de crafteo del Metal Refinado.', effect: (level: number) => `-${level * 5}% Tiempo Crafteo`, cost: 200, maxLevel: 5, requirements: ['foundryProtocols'] },
        { id: 'steelProductionSpeed', category: 'Fundicion', title: 'Producción de Acero', description: 'Reduce el tiempo de crafteo del Acero Estructural.', effect: (level: number) => `-${level * 5}% Tiempo Crafteo`, cost: 400, maxLevel: 5, requirements: ['metalSmeltingSpeed'] },
    { id: 'automatedFabrication', category: 'Fundicion', title: 'Fabricación Automatizada', description: 'Desbloquea la automatización en la Fundición (Próximamente).', effect: () => 'Desbloqueo', cost: 2000, maxLevel: 1, requirements: ['steelProductionSpeed'] },
    { id: 'smeltingEfficiency', category: 'Fundicion', title: 'Eficiencia de Costes I', description: 'Reduce el coste de chatarra para crear Metal Refinado.', effect: (level: number) => `-${level * 5}% Coste Chatarra`, cost: 400, maxLevel: 4, requirements: ['foundryProtocols'] },
    { id: 'foundryEnergy', category: 'Fundicion', title: 'Eficiencia de Costes II', description: 'Reduce el coste de energía para crear Metal Refinado.', effect: (level: number) => `-${level * 5}% Coste Energía`, cost: 400, maxLevel: 4, requirements: ['smeltingEfficiency'] },
    { id: 'alloyCreation', category: 'Fundicion', title: 'Creación de Aleaciones (Próximamente)', description: 'Permite crear nuevos materiales.', effect: () => 'Próximamente', cost: 1800, maxLevel: 1, requirements: ['foundryEnergy'] },
    { id: 'selfReplication', category: 'Fundicion', title: 'Auto-Replicación (Próximamente)', description: 'La fundición genera sus propios recursos.', effect: () => 'Próximamente', cost: 7500, maxLevel: 1, requirements: ['alloyCreation'] },
    { id: 'scrapPurification', category: 'Fundicion', title: 'Purificación de Chatarra', description: 'Desbloquea una receta ineficiente para convertir chatarra en Metal Refinado.', effect: () => 'Desbloquea Receta', cost: 1000, maxLevel: 1, requirements: ['selfReplication'] },
  ];

  const categories = ['Drones', 'Energia', 'Investigacion', 'Almacenamiento', 'Fundicion'];
  
  const isTechAvailable = (tech: any) => {
    if (tech.requirements.length === 0) return true;
    return tech.requirements.every((reqId: string) => {
            const reqTech = techTree.find(t => t.id === reqId);
      if (!reqTech) return false;
      const currentLevel = upgrades[reqId as keyof typeof upgrades] as number;
      return currentLevel >= reqTech.maxLevel;
    });
  };

  if (!unlocked) {
    return (
      <div style={{
        backgroundColor: '#111827',
        color: '#E5E7EB',
        minHeight: '100vh',
        padding: '1rem',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2>🔬 LABORATORIO</h2>
          <button onClick={onClose} style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Cerrar
          </button>
        </div>
        
        <div style={{
          padding: '2rem',
          backgroundColor: '#1F2737',
          borderRadius: '4px',
          textAlign: 'center',
          border: '2px solid #F59E0B'
        }}>
          <h3 style={{ color: '#F59E0B' }}>🔒 LABORATORIO BLOQUEADO</h3>
          <p>Para desbloquear el Laboratorio, necesitas:</p>
          <ul style={{ textAlign: 'left', display: 'inline-block', margin: '1rem 0' }}>
            <li>✅ 3 Drones Medios</li>
            <li>✅ 1 Generador Solar Avanzado</li>
            <li>✅ 1000 Chatarra</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="tech-center-container">
      <div className="tech-center-header">
        <h2>🔬 LABORATORIO</h2>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>
        
      <div className="research-points-summary">
        <h3 
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span>🧪 Puntos de Investigación: {formatNumber(researchPoints)}</span>
          <span className="info-icon">
            ⓘ
          </span>
        </h3>
        {showTooltip && (
          <ResearchTooltip
            base={baseResearch}
            fromDrones={droneResearch}
            fromEnergy={energyResearch}
            total={totalResearchPerSecond}
            quantumComputingLevel={upgrades.quantumComputing || 0}
          />
        )}
      </div>
      
      <div className="tech-tree-container">
        {categories.map(category => (
          <div key={category} className="tech-category">
            <h3>{category.toUpperCase()}</h3>
            <div className="tech-cards-container">
              {techTree.filter(tech => tech.category === category).map(tech => (
                <TechCard
                  key={tech.id}
                  tech={tech}
                  researchPoints={researchPoints}
                  upgrades={upgrades}
                  onResearchUpgrade={onResearchUpgrade}
                  isAvailable={isTechAvailable(tech)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- NUEVO COMPONENTE TOOLTIP ---
const ResearchTooltip: React.FC<{base: number, fromDrones: number, fromEnergy: number, total: number, quantumComputingLevel: number}> = 
({ base, fromDrones, fromEnergy, total, quantumComputingLevel }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#111827',
      border: '1px solid #374151',
      borderRadius: '8px',
      padding: '1rem',
      width: '300px',
      textAlign: 'left',
      fontSize: '0.9rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      zIndex: 10,
    }}>
      <h4 style={{ margin: 0, color: '#06B6D4' }}>Generación de Investigación</h4>
      <hr style={{ borderColor: '#374151', margin: '0.5rem 0' }} />
      <p style={{ margin: '0.5rem 0' }}>Tasa Base: <strong>+{base.toFixed(2)} /s</strong></p>
      <p style={{ margin: '0.5rem 0' }}>Análisis de Drones: <strong>+{fromDrones.toFixed(2)} /s</strong></p>
      <p style={{ margin: '0.5rem 0' }}>Superávit Energético: <strong>+{fromEnergy.toFixed(2)} /s</strong></p>
      {quantumComputingLevel > 0 && (
         <p style={{ margin: '0.5rem 0', color: '#22C55E' }}>
           Multiplicador Cuántico: <strong>x{(1 / (1 - (quantumComputingLevel * 0.05))).toFixed(2)}</strong>
         </p>
      )}
      <hr style={{ borderColor: '#374151', margin: '0.5rem 0' }} />
      <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>Total: <strong>+{total.toFixed(2)} /s</strong></p>
    </div>
  );
};

const TechCard: React.FC<{
  tech: any;
  researchPoints: number;
  upgrades: { [key: string]: number };
  onResearchUpgrade: (id: string, cost: number) => void;
  isAvailable: boolean;
}> = ({ tech, researchPoints, upgrades, onResearchUpgrade, isAvailable }) => {
  const currentLevel = (upgrades[tech.id as keyof typeof upgrades] as number) || 0;
  const canResearch = isAvailable && researchPoints >= tech.cost && currentLevel < tech.maxLevel;
    const effect = typeof tech.effect === 'function' ? tech.effect(currentLevel) : tech.effect;
  const className = `tech-card ${!isAvailable ? 'locked' : canResearch ? 'available' : currentLevel > 0 ? 'researched' : ''}`;

  return (
    <div className={className}>
      <h4>{tech.title}</h4>
      <p className="tech-card-description">{tech.description}</p>
      <p className="tech-card-effect">{effect}</p>
      <div className="tech-card-footer">
        <span>Nivel: {currentLevel}/{tech.maxLevel}</span>
        <button
          onClick={() => onResearchUpgrade(tech.id, tech.cost)}
          disabled={!canResearch}
          className={`research-button ${canResearch ? 'can-research' : ''}`}
        >
          {currentLevel > 0 ? 'Mejorar' : 'Investigar'} ({tech.cost} RP)
        </button>
      </div>
    </div>
  );
};

export default React.memo(Laboratory);
