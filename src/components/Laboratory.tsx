import React, { useState, useEffect } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import './Laboratory.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import { formatNumber } from '../utils/formatNumber';
import { useDragToScroll } from '../hooks/useDragToScroll';

interface LaboratoryProps {
  gameState: GameState; // Le pasamos el estado completo
  onResearchUpgrade: (upgradeName: string, cost: number) => void;
  onClose: () => void;
}

// --- 1. Definición de Ramas y Colores ---
const branches = {
  production: { name: 'Producción', color: '#22C55E', gridRowStart: 2 },
  research: { name: 'Investigación', color: '#06B6D4', gridRowStart: 6 },
  foundry: { name: 'Fundición', color: '#F97316', gridRowStart: 9 },
  logistics: { name: 'Logística', color: '#F59E0B', gridRowStart: 12 },
};

// --- 2. Reestructuración del Árbol Tecnológico con Coordenadas (tier, row) ---
const newTechTree = [
  // === RAMA DE PRODUCCIÓN (VERDE) ===
  { id: 'collectionEfficiency', branch: 'production', tier: 1, row: 1, title: 'Recolección Mejorada', description: 'Aumenta la chatarra recolectada por los drones.', effect: (l: number) => `+${l * 10}% Prod. Chatarra`, cost: 100, maxLevel: 5, requirements: [] },
  { id: 'droneAssembly', branch: 'production', tier: 2, row: 1, title: 'Línea de Ensamblaje', description: 'Acelera la construcción de todo tipo de drones.', effect: (l: number) => `-${l * 5}% Tiempo Constr.`, cost: 150, maxLevel: 5, requirements: ['collectionEfficiency'] },
  { id: 'droneScrapCost', branch: 'production', tier: 3, row: 1, title: 'Geometría Optimizada', description: 'Reduce el coste de chatarra de todos los drones.', effect: (l: number) => `-${l * 5}% Coste Chatarra`, cost: 250, maxLevel: 4, requirements: ['droneAssembly'] },
  { id: 'droneSelfRepair', branch: 'production', tier: 4, row: 1, title: 'Autómatas de Auto-Reparación', description: 'Otorga a los drones una probabilidad de sobrevivir a una expedición fallida.', effect: (l: number) => `${l * 10}% Prob. Supervivencia`, cost: 500, maxLevel: 5, requirements: ['droneScrapCost'] },
  { id: 'reassignProtocols', branch: 'production', tier: 2, row: 2, title: 'Protocolos de Reasignación', description: 'Desbloquea la capacidad de desmantelar drones.', effect: () => 'Desbloquea Desmantelamiento', cost: 300, maxLevel: 1, requirements: ['collectionEfficiency'] },
  { id: 'droneRetrofitting', branch: 'production', tier: 3, row: 3, title: 'Reacondicionamiento de Chasis', description: 'Permite mejorar drones a un tier superior a un coste reducido.', effect: () => 'Desbloquea Reacondicionamiento', cost: 400, maxLevel: 1, requirements: ['reassignProtocols'] },
  { id: 'powerOptimization', branch: 'production', tier: 3, row: 2, title: 'Optimización Energética', description: 'Reduce el consumo de energía de los drones.', effect: (l: number) => `-${l * 5}% Consumo Energía`, cost: 120, maxLevel: 5, requirements: ['reassignProtocols'] },
  { id: 'energyCalibration', branch: 'production', tier: 4, row: 2, title: 'Calibración de Componentes', description: 'Acelera la construcción de unidades de energía.', effect: (l: number) => `-${l * 5}% Tiempo Constr.`, cost: 180, maxLevel: 5, requirements: ['powerOptimization'] },
  { id: 'energyEfficiency', branch: 'production', tier: 5, row: 2, title: 'Eficiencia de Paneles', description: 'Aumenta la producción de los paneles solares.', effect: (l: number) => `+${l * 10}% Prod. Paneles`, cost: 200, maxLevel: 4, requirements: ['energyCalibration'] },
  { id: 'powerGrid', branch: 'production', tier: 6, row: 2, title: 'Red Eléctrica Mejorada', description: 'Aumenta la producción de todas las fuentes de energía.', effect: (l: number) => `+${l * 5}% Prod. Global`, cost: 400, maxLevel: 5, requirements: ['energyEfficiency'] },
  { id: 'coreEfficiency', branch: 'production', tier: 7, row: 2, title: 'Eficiencia de Núcleos', description: 'Aumenta la producción de los Núcleos Energéticos.', effect: (l: number) => `+${l * 10}% Prod. Núcleos`, cost: 800, maxLevel: 3, requirements: ['powerGrid'] },
  { id: 'fusionTech', branch: 'production', tier: 8, row: 2, title: 'Reactores de Fusión', description: 'Desbloquea el Reactor de Fusión.', effect: () => 'Desbloquea Reactor', cost: 5000, maxLevel: 1, requirements: ['coreEfficiency'] },
  { id: 'poweredFabricators', branch: 'production', tier: 9, row: 2, title: 'Fabricadores Potenciados', description: 'Si la energía está por encima del 90%, la construcción y crafteo es un 10% más rápida.', effect: (l: number) => `+${l * 10}% Velocidad (Bono)`, cost: 2000, maxLevel: 3, requirements: ['fusionTech'] },

  // === RAMA DE INVESTIGACIÓN (AZUL CIAN) ===
  { id: 'researchEfficiency', branch: 'research', tier: 1, row: 1, title: 'Protocolos de Datos', description: 'Aumenta la generación base de RP.', effect: (l: number) => `+${l * 20}% RP Base`, cost: 150, maxLevel: 5, requirements: [] },
  { id: 'advancedAnalysis', branch: 'research', tier: 2, row: 1, title: 'Análisis de Flota', description: 'Los drones generan más RP.', effect: (l: number) => `+${l * 10}% RP por Dron`, cost: 300, maxLevel: 4, requirements: ['researchEfficiency'] },
  { id: 'reinforcedBasicDrones', branch: 'research', tier: 3, row: 1, title: 'Drones Reforzados I', description: 'Desbloquea drones básicos reforzados.', effect: () => 'Desbloquea DBR-F', cost: 250, maxLevel: 1, requirements: ['advancedAnalysis'] },
  { id: 'reinforcedMediumDrones', branch: 'research', tier: 4, row: 1, title: 'Drones Reforzados II', description: 'Desbloquea drones medios reforzados.', effect: () => 'Desbloquea DMR-F', cost: 500, maxLevel: 1, requirements: ['reinforcedBasicDrones'] },
  { id: 'reinforcedAdvancedDrones', branch: 'research', tier: 5, row: 1, title: 'Drones Reforzados III', description: 'Desbloquea drones avanzados reforzados.', effect: () => 'Desbloquea DAR-F', cost: 1000, maxLevel: 1, requirements: ['reinforcedMediumDrones'] },
  { id: 'golemChassis', branch: 'research', tier: 6, row: 1, title: 'Chasis Golem', description: 'Desbloquea los poderosos Drones Golem.', effect: () => 'Desbloquea DG-1', cost: 2500, maxLevel: 1, requirements: ['reinforcedAdvancedDrones'] },
  { id: 'algorithmOptimization', branch: 'research', tier: 2, row: 2, title: 'Algoritmos Predictivos', description: 'La energía sobrante genera más RP.', effect: (l: number) => `+${l * 15}% RP por Energía Excedente`, cost: 450, maxLevel: 4, requirements: ['advancedAnalysis'] },
  { id: 'quantumComputing', branch: 'research', tier: 3, row: 2, title: 'Computación Cuántica', description: 'Reduce el coste de todas las investigaciones.', effect: (l: number) => `-${l * 5}% Coste Investigación`, cost: 1500, maxLevel: 3, requirements: ['algorithmOptimization'] },
  { id: 'constructionEfficiency', branch: 'research', tier: 4, row: 2, title: 'Eficiencia de Construcción', description: 'Reduce el tiempo de construcción de todas las unidades.', effect: (l: number) => `-${l * 5}% Tiempo de Construcción`, cost: 600, maxLevel: 5, requirements: ['quantumComputing'] },
  { id: 'swarmAI', branch: 'research', tier: 7, row: 1, title: 'IA de Enjambre', description: 'Por cada 50 drones, +1% a la producción global de chatarra (máx 10%).', effect: (l: number) => `Actualmente: +${l}%`, cost: 5000, maxLevel: 10, requirements: ['golemChassis'] },
  { id: 'globalEfficiency', branch: 'research', tier: 8, row: 1, title: 'Eficiencia Global (Infinita)', description: 'Aumenta permanentemente toda la producción de chatarra.', effect: (l: number) => `+${l}% Prod. Chatarra`, cost: 10000, maxLevel: Infinity, requirements: ['swarmAI'], isInfinite: true },

  // === RAMA DE FUNDICIÓN (ROJO COBRE) ===
  { id: 'foundryProtocols', branch: 'foundry', tier: 1, row: 1, title: 'Protocolos de Fundición', description: 'Desbloquea la Fundición.', effect: () => 'Desbloquea la Fundición', cost: 50, maxLevel: 1, requirements: [] },
  { id: 'metalSmeltingSpeed', branch: 'foundry', tier: 2, row: 1, title: 'Fundición Eficiente', description: 'Reduce el tiempo de crafteo del Metal Refinado.', effect: (l: number) => `-${l * 5}% Tiempo Crafteo`, cost: 200, maxLevel: 5, requirements: ['foundryProtocols'] },
  { id: 'smeltingEfficiency', branch: 'foundry', tier: 2, row: 2, title: 'Eficiencia de Costes I', description: 'Reduce el coste de chatarra para crear Metal Refinado.', effect: (l: number) => `-${l * 5}% Coste Chatarra`, cost: 400, maxLevel: 4, requirements: ['foundryProtocols'] },
  { id: 'steelProductionSpeed', branch: 'foundry', tier: 3, row: 1, title: 'Producción de Acero', description: 'Reduce el tiempo de crafteo del Acero Estructural.', effect: (l: number) => `-${l * 5}% Tiempo Crafteo`, cost: 400, maxLevel: 5, requirements: ['metalSmeltingSpeed'] },
  { id: 'foundryEnergy', branch: 'foundry', tier: 3, row: 2, title: 'Eficiencia de Costes II', description: 'Reduce el coste de energía para crear Metal Refinado.', effect: (l: number) => `-${l * 5}% Coste Energía`, cost: 400, maxLevel: 4, requirements: ['smeltingEfficiency'] },
  { id: 'hullPlateProduction', branch: 'foundry', tier: 4, row: 1, title: 'Producción de Placas', description: 'Reduce el tiempo de crafteo de las Placas de Casco.', effect: (l: number) => `-${l * 5}% Tiempo Crafteo`, cost: 600, maxLevel: 5, requirements: ['steelProductionSpeed'] },
  { id: 'slagRecycling', branch: 'foundry', tier: 4, row: 2, title: 'Reciclaje de Escoria', description: 'Pequeña probabilidad de recuperar parte del coste de un crafteo.', effect: (l: number) => `${l * 2}% Prob. de Recuperación`, cost: 700, maxLevel: 5, requirements: ['foundryEnergy'] },
  { id: 'wiringProduction', branch: 'foundry', tier: 5, row: 1, title: 'Cableado Avanzado', description: 'Reduce el tiempo de crafteo del Cableado Superconductor.', effect: (l: number) => `-${l * 5}% Tiempo Crafteo`, cost: 800, maxLevel: 5, requirements: ['hullPlateProduction'] },
  { id: 'lightweightAlloys', branch: 'foundry', tier: 5, row: 2, title: 'Aleaciones Ligeras', description: 'Reduce el coste de metal de los drones reforzados.', effect: (l: number) => `-${l * 5}% Coste Metal Drones-F`, cost: 1200, maxLevel: 4, requirements: ['slagRecycling'] },
  { id: 'fuelRodProduction', branch: 'foundry', tier: 6, row: 1, title: 'Síntesis de Combustible', description: 'Reduce el tiempo de crafteo de las Barras de Combustible.', effect: (l: number) => `-${l * 5}% Tiempo Crafteo`, cost: 1000, maxLevel: 5, requirements: ['wiringProduction'] },
  
  // === RAMA DE LOGÍSTICA (NARANJA) ===
  { id: 'storageOptimization', branch: 'logistics', tier: 1, row: 1, title: 'Logística Mejorada', description: 'Aumenta la capacidad de almacenamiento de chatarra.', effect: (l: number) => `+${l * 15}% Cap. Chatarra`, cost: 80, maxLevel: 5, requirements: [] },
  { id: 'storageConstruction', branch: 'logistics', tier: 2, row: 1, title: 'Logística Eficiente', description: 'Acelera la construcción de unidades de almacenamiento.', effect: (l: number) => `-${l * 5}% Tiempo Constr.`, cost: 130, maxLevel: 5, requirements: ['storageOptimization'] },
  { id: 'cargoDrones', branch: 'logistics', tier: 3, row: 1, title: 'Drones de Carga', description: 'Aumenta la capacidad de las unidades de almacenamiento.', effect: (l: number) => `+${l * 10}% Bono Almacenamiento`, cost: 220, maxLevel: 4, requirements: ['storageConstruction'] },
  { id: 'batteryTech', branch: 'logistics', tier: 2, row: 2, title: 'Tecnología de Baterías', description: 'Aumenta la capacidad máxima de energía.', effect: (l: number) => `+${l * 15}% Cap. Energía`, cost: 300, maxLevel: 5, requirements: ['storageOptimization'] },
  { id: 'energyStorage', branch: 'logistics', tier: 3, row: 2, title: 'Almacenamiento Energético', description: 'Aumenta la capacidad de las baterías.', effect: (l: number) => `+${l * 10}% Bono Baterías`, cost: 350, maxLevel: 4, requirements: ['batteryTech'] },
      { id: 'automatedDistribution', branch: 'logistics', tier: 4, row: 1, title: 'Logística de Enjambre', description: 'Los drones de carga se comunican para optimizar rutas, aumentando la capacidad de almacenamiento de chatarra y energía.', effect: (l: number) => `+${l * 5}% Cap. Chatarra y Energía`, cost: 800, maxLevel: 3, requirements: ['cargoDrones'] },
  { id: 'matterCompression', branch: 'logistics', tier: 4, row: 2, title: 'Compresión de Materia', description: 'Reduce el coste de construcción de unidades de almacenamiento.', effect: (l: number) => `-${l * 5}% Coste Almacenamiento`, cost: 1200, maxLevel: 3, requirements: ['energyStorage'] },
];

const Laboratory: React.FC<LaboratoryProps> = ({ gameState, onResearchUpgrade, onClose }) => {
  const { techCenter, workshop, resources } = gameState;
  const { unlocked, researchPoints, upgrades } = techCenter;
  const scrollRef = useDragToScroll<HTMLDivElement>(); // Hook para el scroll
  const [showTooltip, setShowTooltip] = useState(false);
  const [recentlyResearched, setRecentlyResearched] = useState<string | null>(null);

  // Efecto para limpiar el estado de "recién investigado" después de un tiempo
  useEffect(() => {
    if (recentlyResearched) {
      const timer = setTimeout(() => setRecentlyResearched(null), 1500); // Duración del brillo
      return () => clearTimeout(timer);
    }
  }, [recentlyResearched]);

  // Calcular el número máximo de tiers para que los banners se expandan correctamente
  const maxTier = Math.max(...newTechTree.map(t => t.tier));

  // --- 3. Lógica de Cálculo de RP (movida adentro para acceso a gameState) ---
  const baseResearch = 0.1 * (1 + (upgrades.researchEfficiency * 0.20));
  const totalDrones = Object.values(workshop.drones).reduce((sum, count) => sum + count, 0);
  const droneResearch = (totalDrones * 0.01) * (1 + (upgrades.advancedAnalysis * 0.10));
  const energySurplus = Math.max(0, resources.energy - resources.energyConsumption);
  const energyResearch = (energySurplus * 0.005) * (1 + (upgrades.algorithmOptimization * 0.15));
  const totalResearchPerSecond = (baseResearch + droneResearch + energyResearch) / (1 - (upgrades.quantumComputing * 0.05));

  // --- 4. Lógica de Disponibilidad de Tecnología (movida adentro) ---
  const isTechAvailable = (tech: any) => {
    if (tech.requirements.length === 0) return true;
    return tech.requirements.every((reqId: string) => {
      const reqTech = newTechTree.find(t => t.id === reqId);
      if (!reqTech) return false;
      const currentLevel = (upgrades[reqId as keyof typeof upgrades] as number) || 0;
      // Para tecnologías con maxLevel > 1, necesitamos que esté al menos en nivel 1
      // Para tecnologías con maxLevel = 1, necesitamos que esté completada (nivel 1)
      return currentLevel >= 1;
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
      
      <div className="tech-tree-scroll-container" ref={scrollRef}>
        <Xwrapper>
          <div className="tech-tree-grid-container">
                        {/* Renderizar Banners de Ramas */}
            {Object.values(branches).map(branch => (
              <div 
                key={branch.name} 
                className="branch-banner" 
                style={{ 
                  gridRow: branch.gridRowStart - 1, 
                  gridColumn: `1 / ${maxTier + 1}`, // Hacer que el banner ocupe todas las columnas
                  color: branch.color, 
                  borderColor: branch.color 
                }}
              >
                {branch.name.toUpperCase()}
              </div>
            ))}

            {/* Renderizar Tarjetas de Tecnología */}
                        {newTechTree.map(tech => (
              <TechCard
                key={tech.id}
                tech={tech}
                researchPoints={researchPoints}
                upgrades={upgrades}
                onResearchUpgrade={(id, cost) => {
                  onResearchUpgrade(id, cost);
                  setRecentlyResearched(id);
                }}
                isAvailable={isTechAvailable(tech)}
                color={branches[tech.branch as keyof typeof branches].color}
                // Posicionamiento en la cuadrícula
                style={{
                  gridColumn: tech.tier,
                  gridRow: branches[tech.branch as keyof typeof branches].gridRowStart + tech.row - 1,
                }}
              />
            ))}
          </div>

                    {/* Renderizar Flechas de Conexión */}
                    {newTechTree.map(tech =>
            tech.requirements.map(reqId => {
              // Asegurarse de que el requisito existe para evitar errores
              const reqExists = newTechTree.some(t => t.id === reqId);
              if (!reqExists) return null;

              const isResearched = (upgrades[tech.id as keyof typeof upgrades] || 0) > 0;
              const isRecent = recentlyResearched === reqId;
              const lineColor = branches[tech.branch as keyof typeof branches].color;

              return (
                <Xarrow
                  key={`${reqId}-${tech.id}`}
                  start={reqId}
                  end={tech.id}
                  strokeWidth={isRecent ? 4 : (isResearched ? 3 : 2)}
                  color={isRecent ? '#FFFFFF' : (isResearched ? lineColor : "#4B5563")}
                  path="smooth"
                  startAnchor="right"
                  endAnchor="left"
                  dashness={!isResearched && !isRecent}
                  headSize={4}
                  zIndex={isRecent ? 2 : 1}
                  animateDrawing={isRecent ? 0.7 : false}
                />
              );
            })
          )}
        </Xwrapper>
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
  color: string;
  style: React.CSSProperties;
}> = ({ tech, researchPoints, upgrades, onResearchUpgrade, isAvailable, color, style }) => {
  const currentLevel = (upgrades[tech.id as keyof typeof upgrades] as number) || 0;
  const canResearch = isAvailable && researchPoints >= tech.cost && currentLevel < tech.maxLevel;
  const effect = typeof tech.effect === 'function' ? tech.effect(currentLevel) : tech.effect;
  const className = `tech-card ${!isAvailable ? 'locked' : canResearch ? 'available' : currentLevel > 0 ? 'researched' : ''}`;

  return (
    <div id={tech.id} className={className} style={{ ...style, borderLeftColor: color }}>
      <h4>{tech.title}</h4>
      <p className="tech-card-description">{tech.description}</p>
      <p className="tech-card-effect">{effect}</p>
      <div className="tech-card-footer">
        <span>Nivel: {currentLevel}/{tech.maxLevel === Infinity ? '∞' : tech.maxLevel}</span>
        <button
          onClick={() => onResearchUpgrade(tech.id, tech.cost)}
          disabled={!canResearch}
          className={`research-button ${canResearch ? 'can-research' : ''}`}
          style={{ backgroundColor: canResearch ? color : '' }}
        >
          {currentLevel > 0 ? 'Mejorar' : 'Investigar'} ({formatNumber(tech.cost)} RP)
        </button>
      </div>
    </div>
  );
};

export default React.memo(Laboratory);

