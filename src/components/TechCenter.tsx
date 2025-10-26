import React from 'react';

interface TechCenterProps {
  unlocked: boolean;
  researchPoints: number;
  upgrades: { [key: string]: number };
  onResearchUpgrade: (upgradeName: string, cost: number) => void;
  onClose: () => void;
}

const TechCenter: React.FC<TechCenterProps> = ({ 
  unlocked,
  researchPoints,
  upgrades,
  onResearchUpgrade, 
  onClose 
}) => {

  const techTree = [
    // --- COLUMNA: DRONES ---
        { id: 'collectionEfficiency', category: 'Drones', title: 'Recolección Mejorada', description: 'Aumenta la chatarra recolectada por los drones.', effect: (level: number) => `+${level * 10}% Prod. Chatarra`, cost: 100, maxLevel: 5, requirements: [] },
    { id: 'droneAssembly', category: 'Drones', title: 'Línea de Ensamblaje', description: 'Acelera la construcción de todo tipo de drones.', effect: (level: number) => `-${level * 5}% Tiempo Constr.`, cost: 150, maxLevel: 5, requirements: ['collectionEfficiency'] },
    { id: 'reinforcedBasicDrones', category: 'Drones', title: 'Drones Reforzados I', description: 'Desbloquea drones básicos reforzados.', effect: () => 'Desbloquea DBR-F', cost: 250, maxLevel: 1, requirements: ['droneAssembly'] },
    { id: 'reinforcedMediumDrones', category: 'Drones', title: 'Drones Reforzados II', description: 'Desbloquea drones medios reforzados.', effect: () => 'Desbloquea DMR-F', cost: 500, maxLevel: 1, requirements: ['reinforcedBasicDrones'] },
    { id: 'reinforcedAdvancedDrones', category: 'Drones', title: 'Drones Reforzados III', description: 'Desbloquea drones avanzados reforzados.', effect: () => 'Desbloquea DAR-F', cost: 1000, maxLevel: 1, requirements: ['reinforcedMediumDrones'] },
    { id: 'golemChassis', category: 'Drones', title: 'Chasis Golem', description: 'Desbloquea los poderosos Drones Golem.', effect: () => 'Desbloquea DG-1', cost: 2500, maxLevel: 1, requirements: ['reinforcedAdvancedDrones'] },
    { id: 'swarmAI', category: 'Drones', title: 'IA de Enjambre', description: 'Por cada 50 drones, +1% a la producción global de chatarra (máx 10%).', effect: (level: number) => `Actualmente: +${level}%`, cost: 5000, maxLevel: 10, requirements: ['golemChassis'] },

    // --- COLUMNA: ENERGÍA ---
        { id: 'powerOptimization', category: 'Energia', title: 'Optimización Energética', description: 'Reduce el consumo de energía de los drones.', effect: (level: number) => `-${level * 5}% Consumo Energía`, cost: 120, maxLevel: 5, requirements: [] },
    { id: 'energyCalibration', category: 'Energia', title: 'Calibración de Componentes', description: 'Acelera la construcción de unidades de energía.', effect: (level: number) => `-${level * 5}% Tiempo Constr.`, cost: 180, maxLevel: 5, requirements: ['powerOptimization'] },
        { id: 'energyEfficiency', category: 'Energia', title: 'Eficiencia de Paneles', description: 'Aumenta la producción de los paneles solares.', effect: (level: number) => `+${level * 10}% Prod. Paneles`, cost: 200, maxLevel: 4, requirements: ['energyCalibration'] },
    { id: 'powerGrid', category: 'Energia', title: 'Red Eléctrica Mejorada', description: 'Aumenta la producción de todas las fuentes de energía.', effect: (level: number) => `+${level * 5}% Prod. Global`, cost: 400, maxLevel: 5, requirements: ['energyEfficiency'] },
    { id: 'batteryTech', category: 'Energia', title: 'Tecnología de Baterías', description: 'Aumenta la capacidad máxima de energía.', effect: (level: number) => `+${level * 15}% Cap. Energía`, cost: 300, maxLevel: 5, requirements: ['powerGrid'] },
    { id: 'coreEfficiency', category: 'Energia', title: 'Eficiencia de Núcleos', description: 'Aumenta la producción de los Núcleos Energéticos.', effect: (level: number) => `+${level * 10}% Prod. Núcleos`, cost: 800, maxLevel: 3, requirements: ['batteryTech'] },
    { id: 'geothermalEnergy', category: 'Energia', title: 'Energía Geotérmica', description: 'Desbloquea el Generador Geotérmico (Próximamente).', effect: () => 'Desbloqueo', cost: 3000, maxLevel: 1, requirements: ['coreEfficiency'] },
    { id: 'fusionTech', category: 'Energia', title: 'Reactores de Fusión (Próximamente)', description: 'Desbloquea una nueva fuente de energía.', effect: () => 'Próximamente', cost: 5000, maxLevel: 1, requirements: ['geothermalEnergy'] },

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
          <h2>🔬 CENTRO TÉCNICO</h2>
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
          <h3 style={{ color: '#F59E0B' }}>🔒 CENTRO TÉCNICO BLOQUEADO</h3>
          <p>Para desbloquear el Centro Técnico, necesitas:</p>
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
        <h2>🔬 CENTRO TÉCNICO</h2>
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
        padding: '1rem',
        backgroundColor: '#1F2737',
        borderRadius: '4px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
                <h3 style={{ color: '#06B6D4', marginTop: 0 }}>
          🧪 Puntos de Investigación: {Math.floor(researchPoints)}
        </h3>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {categories.map(category => (
          <div key={category} style={{
            flex: 1,
            backgroundColor: '#1F2737',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <h3 style={{ textAlign: 'center', color: '#F59E0B', marginTop: 0 }}>{category.toUpperCase()}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#111827',
      borderRadius: '8px',
      border: canResearch ? '2px solid #22C55E' : currentLevel > 0 ? '2px solid #F59E0B' : '2px solid #374151',
      opacity: isAvailable ? 1 : 0.5,
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>{tech.title}</h4>
      <p style={{ fontSize: '0.8rem', color: '#9CA3AF', margin: '0 0 0.5rem 0' }}>{tech.description}</p>
      <p style={{ fontSize: '0.9rem', color: '#22C55E', margin: '0 0 1rem 0', fontWeight: 'bold' }}>{effect}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Nivel: {currentLevel}/{tech.maxLevel}</span>
        <button
          onClick={() => onResearchUpgrade(tech.id, tech.cost)}
          disabled={!canResearch}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: canResearch ? '#22C55E' : '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: canResearch ? 'pointer' : 'not-allowed'
          }}
        >
          {currentLevel > 0 ? 'Mejorar' : 'Investigar'} ({tech.cost} RP)
                </button>
      </div>
    </div>
  );
};

export default React.memo(TechCenter);
