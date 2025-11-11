import React, { useState } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
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
  const { techCenter, workshop: { drones }, resources } = gameState;
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
    // === TIER 1: PUNTOS DE PARTIDA ===
    { id: 'collectionEfficiency', tier: 1, category: 'Drones', title: 'Recolección Mejorada', description: 'Aumenta la chatarra recolectada por los drones.', effect: (level: number) => `+${level * 10}% Prod. Chatarra`, cost: 100, maxLevel: 5, requirements: [] },
    { id: 'powerOptimization', tier: 1, category: 'Energia', title: 'Optimización Energética', description: 'Reduce el consumo de energía de los drones.', effect: (level: number) => `-${level * 5}% Consumo Energía`, cost: 120, maxLevel: 5, requirements: [] },
    { id: 'researchEfficiency', tier: 1, category: 'Investigacion', title: 'Protocolos de Datos', description: 'Aumenta la generación base de RP.', effect: (level: number) => `+${level * 20}% RP Base`, cost: 150, maxLevel: 5, requirements: [] },
    { id: 'storageOptimization', tier: 1, category: 'Almacenamiento', title: 'Logística Mejorada', description: 'Aumenta la capacidad de almacenamiento de chatarra.', effect: (level: number) => `+${level * 15}% Cap. Chatarra`, cost: 80, maxLevel: 5, requirements: [] },
    { id: 'foundryProtocols', tier: 1, category: 'Fundicion', title: 'Protocolos de Fundición', description: 'Desbloquea la Fundición para crear Metal Refinado.', effect: () => 'Desbloquea la Fundición', cost: 50, maxLevel: 1, requirements: [] },

    // === TIER 2: PRIMERAS RAMIFICACIONES ===
    // --- Drones ---
    { id: 'droneAssembly', tier: 2, category: 'Drones', title: 'Línea de Ensamblaje', description: 'Acelera la construcción de todo tipo de drones.', effect: (level: number) => `-${level * 5}% Tiempo Constr.`, cost: 150, maxLevel: 5, requirements: ['collectionEfficiency'] },
    { id: 'reassignProtocols', tier: 2, category: 'Drones', title: 'Protocolos de Reasignación', description: 'Desbloquea la capacidad de desmantelar drones.', effect: () => 'Desbloquea Desmantelamiento', cost: 300, maxLevel: 1, requirements: ['collectionEfficiency'] },
    // --- Energía ---
    { id: 'energyCalibration', tier: 2, category: 'Energia', title: 'Calibración de Componentes', description: 'Acelera la construcción de unidades de energía.', effect: (level: number) => `-${level * 5}% Tiempo Constr.`, cost: 180, maxLevel: 5, requirements: ['powerOptimization'] },
    { id: 'batteryTech', tier: 2, category: 'Energia', title: 'Tecnología de Baterías', description: 'Aumenta la capacidad máxima de energía.', effect: (level: number) => `+${level * 15}% Cap. Energía`, cost: 300, maxLevel: 5, requirements: ['powerOptimization'] },
    // --- Investigación ---
    { id: 'advancedAnalysis', tier: 2, category: 'Investigacion', title: 'Análisis de Flota', description: 'Los drones generan más RP.', effect: (level: number) => `+${level * 10}% RP por Dron`, cost: 300, maxLevel: 4, requirements: ['researchEfficiency'] },
    { id: 'quantumComputing', tier: 2, category: 'Investigacion', title: 'Computación Cuántica', description: 'Reduce el coste de todas las investigaciones.', effect: (level: number) => `-${level * 5}% Coste Investigación`, cost: 1500, maxLevel: 3, requirements: ['researchEfficiency'] },
    // --- Almacenamiento ---
    { id: 'storageConstruction', tier: 2, category: 'Almacenamiento', title: 'Logística Eficiente', description: 'Acelera la construcción de unidades de almacenamiento.', effect: (level: number) => `-${level * 5}% Tiempo Constr.`, cost: 130, maxLevel: 5, requirements: ['storageOptimization'] },
    // --- Fundición ---
    { id: 'metalSmeltingSpeed', tier: 2, category: 'Fundicion', title: 'Fundición Eficiente', description: 'Reduce el tiempo de crafteo del Metal Refinado.', effect: (level: number) => `-${level * 5}% Tiempo Crafteo`, cost: 200, maxLevel: 5, requirements: ['foundryProtocols'] },
    { id: 'smeltingEfficiency', tier: 2, category: 'Fundicion', title: 'Eficiencia de Costes I', description: 'Reduce el coste de chatarra para crear Metal Refinado.', effect: (level: number) => `-${level * 5}% Coste Chatarra`, cost: 400, maxLevel: 4, requirements: ['foundryProtocols'] },

    // === TIER 3: ESPECIALIZACIÓN ===
    // --- Drones ---
    { id: 'reinforcedBasicDrones', tier: 3, category: 'Drones', title: 'Drones Reforzados I', description: 'Desbloquea drones básicos reforzados.', effect: () => 'Desbloquea DBR-F', cost: 250, maxLevel: 1, requirements: ['droneAssembly'] },
    { id: 'geologicalScanners', tier: 3, category: 'Drones', title: 'Scanners Geológicos', description: 'Los drones tienen una pequeña probabilidad de encontrar recursos raros.', effect: (level: number) => `+${level * 0.01}% Prob.`, cost: 3000, maxLevel: 5, requirements: ['reassignProtocols'] },
    // --- Energía ---
    { id: 'energyEfficiency', tier: 3, category: 'Energia', title: 'Eficiencia de Paneles', description: 'Aumenta la producción de los paneles solares.', effect: (level: number) => `+${level * 10}% Prod. Paneles`, cost: 200, maxLevel: 4, requirements: ['energyCalibration'] },
    { id: 'energyStorage', tier: 3, category: 'Almacenamiento', title: 'Almacenamiento Energético', description: 'Aumenta la capacidad de las baterías.', effect: (level: number) => `+${level * 10}% Bono Baterías`, cost: 350, maxLevel: 4, requirements: ['batteryTech', 'storageConstruction'] }, // INTERCONEXIÓN
    // --- Investigación ---
    { id: 'algorithmOptimization', tier: 3, category: 'Investigacion', title: 'Algoritmos Predictivos', description: 'La energía sobrante genera más RP.', effect: (level: number) => `+${level * 15}% RP por Energía Excedente`, cost: 450, maxLevel: 4, requirements: ['advancedAnalysis'] },
    // --- Almacenamiento ---
    { id: 'cargoDrones', tier: 3, category: 'Almacenamiento', title: 'Drones de Carga', description: 'Aumenta la capacidad de las unidades de almacenamiento.', effect: (level: number) => `+${level * 10}% Bono Almacenamiento`, cost: 220, maxLevel: 4, requirements: ['storageConstruction'] },
    // --- Fundición ---
    { id: 'steelProductionSpeed', tier: 3, category: 'Fundicion', title: 'Producción de Acero', description: 'Reduce el tiempo de crafteo del Acero Estructural.', effect: (level: number) => `-${level * 5}% Tiempo Crafteo`, cost: 400, maxLevel: 5, requirements: ['metalSmeltingSpeed'] },
    { id: 'foundryEnergy', tier: 3, category: 'Fundicion', title: 'Eficiencia de Costes II', description: 'Reduce el coste de energía para crear Metal Refinado.', effect: (level: number) => `-${level * 5}% Coste Energía`, cost: 400, maxLevel: 4, requirements: ['smeltingEfficiency'] },

    // === TIER 4: JUEGO MEDIO ===
    // --- Drones ---
    { id: 'reinforcedMediumDrones', tier: 4, category: 'Drones', title: 'Drones Reforzados II', description: 'Desbloquea drones medios reforzados.', effect: () => 'Desbloquea DMR-F', cost: 500, maxLevel: 1, requirements: ['reinforcedBasicDrones'] },
    // --- Energía ---
    { id: 'powerGrid', tier: 4, category: 'Energia', title: 'Red Eléctrica Mejorada', description: 'Aumenta la producción de todas las fuentes de energía.', effect: (level: number) => `+${level * 5}% Prod. Global`, cost: 400, maxLevel: 5, requirements: ['energyEfficiency'] },
    // --- Investigación ---
    { id: 'constructionEfficiency', tier: 4, category: 'Investigacion', title: 'Eficiencia de Construcción', description: 'Reduce el tiempo de construcción de todas las unidades.', effect: (level: number) => `-${level * 5}% Tiempo de Construcción`, cost: 600, maxLevel: 5, requirements: ['algorithmOptimization', 'quantumComputing'] }, // INTERCONEXIÓN
    // --- Fundición ---
    { id: 'hullPlateProduction', tier: 4, category: 'Fundicion', title: 'Producción de Placas', description: 'Reduce el tiempo de crafteo de las Placas de Casco.', effect: (level: number) => `-${level * 5}% Tiempo Crafteo`, cost: 600, maxLevel: 5, requirements: ['steelProductionSpeed'] },

    // === TIER 5: JUEGO AVANZADO ===
    // --- Drones ---
    { id: 'reinforcedAdvancedDrones', tier: 5, category: 'Drones', title: 'Drones Reforzados III', description: 'Desbloquea drones avanzados reforzados.', effect: () => 'Desbloquea DAR-F', cost: 1000, maxLevel: 1, requirements: ['reinforcedMediumDrones'] },
    // --- Energía ---
    { id: 'coreEfficiency', tier: 5, category: 'Energia', title: 'Eficiencia de Núcleos', description: 'Aumenta la producción de los Núcleos Energéticos.', effect: (level: number) => `+${level * 10}% Prod. Núcleos`, cost: 800, maxLevel: 3, requirements: ['powerGrid'] },
    // --- Fundición ---
    { id: 'wiringProduction', tier: 5, category: 'Fundicion', title: 'Cableado Avanzado', description: 'Reduce el tiempo de crafteo del Cableado Superconductor.', effect: (level: number) => `-${level * 5}% Tiempo Crafteo`, cost: 800, maxLevel: 5, requirements: ['hullPlateProduction'] },
    { id: 'matterCompression', tier: 5, category: 'Almacenamiento', title: 'Compresión de Materia', description: 'Reduce el coste de construcción de unidades de almacenamiento.', effect: (level: number) => `-${level * 5}% Coste Almacenamiento`, cost: 1200, maxLevel: 3, requirements: ['energyStorage'] },

    // === TIER 6: TECNOLOGÍAS DE ÉLITE ===
    { id: 'golemChassis', tier: 6, category: 'Drones', title: 'Chasis Golem', description: 'Desbloquea los poderosos Drones Golem.', effect: () => 'Desbloquea DG-1', cost: 2500, maxLevel: 1, requirements: ['reinforcedAdvancedDrones'] },

    { id: 'fuelRodProduction', tier: 6, category: 'Fundicion', title: 'Síntesis de Combustible', description: 'Reduce el tiempo de crafteo de las Barras de Combustible.', effect: (level: number) => `-${level * 5}% Tiempo Crafteo`, cost: 1000, maxLevel: 5, requirements: ['wiringProduction'] },
    
    // === TIER 7: FIN DEL JUEGO ===
    { id: 'swarmAI', tier: 7, category: 'Drones', title: 'IA de Enjambre', description: 'Por cada 50 drones, +1% a la producción global de chatarra (máx 10%).', effect: (level: number) => `Actualmente: +${level}%`, cost: 5000, maxLevel: 10, requirements: ['golemChassis'] },
    { id: 'fusionTech', tier: 7, category: 'Energia', title: 'Reactores de Fusión', description: 'Desbloquea el Reactor de Fusión.', effect: () => 'Desbloquea Reactor', cost: 5000, maxLevel: 1, requirements: ['coreEfficiency'] },
    

    // === TECNOLOGÍAS ESPECIALES (se muestran aparte) ===
    { id: 'globalEfficiency', category: 'Investigacion', title: 'Eficiencia Global (Infinita)', description: 'Aumenta permanentemente toda la producción de chatarra.', effect: (level: number) => `+${level}% Prod. Chatarra`, cost: 10000, maxLevel: Infinity, requirements: [], isInfinite: true },
    
    // Tecnologías que podrían requerir revisión o ser interconectadas de forma distinta
    { id: 'poweredFabricators', tier: 8, category: 'Energia', title: 'Fabricadores Potenciados', description: 'Si la energía está por encima del 90%, la construcción y crafteo es un 10% más rápida.', effect: (level: number) => `+${level * 10}% Velocidad (Bono)`, cost: 2000, maxLevel: 3, requirements: ['fusionTech'] },
    
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
          <h2>LABORATORIO</h2>
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
        <h2>LABORATORIO</h2>
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
      
                                          <div className="tech-tree-scroll-container">
        <div className="tech-tree-container">
          <Xwrapper>
            {/* 1. RENDERIZAR LAS FILAS Y TARJETAS */}
            {categories.map(category => (
              <div key={category} className="tech-row">
                <h3 className="tech-row-title">{category.toUpperCase()}</h3>
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

            {/* 2. RENDERIZAR LAS FLECHAS */}
            {techTree.map(tech =>
              tech.requirements.map(reqId => (
                <Xarrow
                  key={`${reqId}-${tech.id}`}
                  start={reqId}
                  end={tech.id}
                  strokeWidth={2}
                  color="#4B5563" // Un gris más visible
                  path="smooth"   // "smooth" suele ser más robusto que "grid"
                  startAnchor="right"
                  endAnchor="left"
                  dashness={true}
                  headSize={0}
                  zIndex={-1}     // Dibuja las flechas por detrás de las tarjetas
                />
              ))
            )}
          </Xwrapper>
        </div>
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
      fontSize: '1.4rem', // <-- AUMENTADO
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
    <div id={tech.id} className={className}>
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

