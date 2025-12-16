import React, { useState, useEffect } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import './Laboratory.css';
import { GameState } from '../types/gameState';
import { formatNumber } from '../utils/formatNumber';
import { useDragToScroll } from '../hooks/useDragToScroll';
import { researchData, calculateResearchCost, ResearchItem } from '../data/researchData'; // <-- IMPORTAMOS

interface LaboratoryProps {
  gameState: GameState;
  onResearchUpgrade: (upgradeName: string) => void; // <-- MODIFICADO: ya no pasa el coste
  onClose: () => void;
}

// --- 1. Definición de Ramas y Colores (se mantiene) ---
const branches = {
  production: { name: 'Producción', color: '#22C55E', gridRowStart: 2 },
  research: { name: 'Investigación', color: '#06B6D4', gridRowStart: 6 },
  foundry: { name: 'Fundición', color: '#F97316', gridRowStart: 9 },
  logistics: { name: 'Logística', color: '#F59E0B', gridRowStart: 12 },
};

// --- 2. ELIMINAMOS 'newTechTree' ---
// Ya no es necesario, usaremos researchData directamente

const Laboratory: React.FC<LaboratoryProps> = ({ gameState, onResearchUpgrade, onClose }) => {
  const { techCenter } = gameState;
  const { unlocked, researchPoints, upgrades } = techCenter;
  const scrollRef = useDragToScroll<HTMLDivElement>();
  const [showTooltip, setShowTooltip] = useState(false);
  const [recentlyResearched, setRecentlyResearched] = useState<string | null>(null);

  useEffect(() => {
    if (recentlyResearched) {
      const timer = setTimeout(() => setRecentlyResearched(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [recentlyResearched]);

  const allTechs = Object.values(researchData);
  const maxTier = Math.max(...allTechs.map(t => t.tier));
  const totalResearchPerSecond = gameState.rates.researchPerSecond;

  const isTechAvailable = (tech: ResearchItem) => {
    if (tech.requirements.length === 0) return true;
    return tech.requirements.every((reqId: string) => {
      const currentLevel = (upgrades[reqId as keyof typeof upgrades] as number) || 0;
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
    <div className="laboratory-container">
      <div className="laboratory-content-area" ref={scrollRef}>
        <button onClick={onClose} className="close-button">
          &times;
        </button>
        
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
            <ResearchTooltip total={totalResearchPerSecond} />
          )}
        </div>
        
        <Xwrapper>
          <div className="tech-tree-grid-container">
            {Object.values(branches).map(branch => (
              <div 
                key={branch.name} 
                className="branch-banner" 
                style={{ 
                  gridRow: branch.gridRowStart - 1, 
                  gridColumn: `1 / ${maxTier + 2}`,
                  color: branch.color, 
                  borderColor: branch.color 
                }}
              >
                {branch.name.toUpperCase()}
              </div>
            ))}

            {allTechs.map(tech => (
              <TechCard
                key={tech.id}
                tech={tech}
                researchPoints={researchPoints}
                upgrades={upgrades}
                onResearchUpgrade={(id) => { // <-- MODIFICADO
                  onResearchUpgrade(id); // <-- MODIFICADO
                  setRecentlyResearched(id);
                }}
                isAvailable={isTechAvailable(tech)}
                color={branches[tech.branch].color}
                style={{
                  gridColumn: tech.tier,
                  gridRow: branches[tech.branch].gridRowStart + tech.row - 1,
                }}
              />
            ))}
          </div>

          {allTechs.map(tech =>
            tech.requirements.map(reqId => {
              const reqExists = allTechs.some(t => t.id === reqId);
              if (!reqExists) return null;

              const isResearched = (upgrades[tech.id as keyof typeof upgrades] || 0) > 0;
              const isRecent = recentlyResearched === reqId;
              const lineColor = branches[tech.branch].color;

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


const ResearchTooltip: React.FC<{total: number}> = 
({ total }) => {
  return (
        <div style={{
      position: 'absolute',
      top: '100%',
      marginTop: '0.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#111827',
      border: '1px solid #374151',
      borderRadius: '8px',
      padding: '1rem',
      width: '300px',
      textAlign: 'left',
      fontSize: '1.4rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      zIndex: 10,
    }}>
      <h4 style={{ margin: 0, color: '#06B6D4' }}>Generación de Investigación</h4>
      <p style={{ margin: '0.5rem 0', fontSize: '1.2rem', color: '#9CA3AF' }}>La tasa de investigación se basa en tu tasa base, el número de drones y tu superávit energético.</p>
      
      <hr style={{ borderColor: '#374151', margin: '0.5rem 0' }} />
      <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>Total: <strong>+{total.toFixed(2)} /s</strong></p>
    </div>
  );
};

const TechCard: React.FC<{
  tech: ResearchItem; // <-- USAMOS LA INTERFAZ IMPORTADA
  researchPoints: number;
  upgrades: { [key: string]: number };
  onResearchUpgrade: (id: string) => void; // <-- MODIFICADO
  isAvailable: boolean;
  color: string;
  style: React.CSSProperties;
}> = ({ tech, researchPoints, upgrades, onResearchUpgrade, isAvailable, color, style }) => {
  const currentLevel = (upgrades[tech.id as keyof typeof upgrades] as number) || 0;
  
  // Usamos la función importada para calcular el coste
  const cost = calculateResearchCost(tech.id, currentLevel);

  const canResearch = isAvailable && researchPoints >= cost && currentLevel < tech.maxLevel;
  const effect = tech.description(currentLevel); // Usamos la descripción del objeto de datos
  const className = `tech-card ${!isAvailable ? 'locked' : canResearch ? 'available' : currentLevel > 0 ? 'researched' : ''}`;

  return (
    <div id={tech.id} className={className} style={{ ...style, borderLeftColor: color }}>
      <h4>{tech.name}</h4>
      <p className="tech-card-description">{tech.baseDescription || tech.description(0).split('+')[0].split('-')[0].split('D')[0]}</p> {/* Pequeño truco para obtener la desc base */}
      <p className="tech-card-effect">{effect}</p>
      <div className="tech-card-footer">
        <span>Nivel: {currentLevel}/{tech.maxLevel === Infinity ? '∞' : tech.maxLevel}</span>
        <button
          onClick={() => onResearchUpgrade(tech.id)} // <-- MODIFICADO
          disabled={!canResearch}
          className={`research-button ${canResearch ? 'can-research' : ''}`}
          style={{ backgroundColor: canResearch ? color : '' }}
        >
          {currentLevel > 0 ? 'Mejorar' : 'Investigar'} ({formatNumber(cost)} RP)
        </button>
      </div>
    </div>
  );
};


export default React.memo(Laboratory);

