import React, { useState, useEffect } from 'react';
import { GameState, ExpeditionId, ActiveExpedition } from '../types/gameState';
import { allExpeditionsData } from '../data/expeditionsData';
import { formatNumber } from '../utils/formatNumber';

interface ExpeditionViewProps {
  resources: GameState['resources'];
  drones: GameState['drones'];
  activeExpeditions: ActiveExpedition[];
  onStartExpedition: (expeditionId: ExpeditionId) => void;
  onClaimReward: (expedition: ActiveExpedition) => void;
  onClose: () => void;
}

const ExpeditionTimer: React.FC<{ completionTimestamp: number }> = ({ completionTimestamp }) => {
  const [remainingTime, setRemainingTime] = useState(completionTimestamp - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);

  return <span>{minutes}m {seconds}s</span>;
};




// Objeto para mapear los IDs de recursos a nombres e iconos amigables
const rewardDisplayMap: Record<string, { name: string; icon: string }> = {
  scrap: { name: 'Chatarra', icon: '💰' },
  metalRefinado: { name: 'Metal Refinado', icon: '🔩' },
  aceroEstructural: { name: 'Acero Estructural', icon: '🏗️' },
  fragmentosPlaca: { name: 'Fragmentos de Placa', icon: '🧱' },
  circuitosDañados: { name: 'Circuitos Dañados', icon: '🔌' },
  aleacionReforzada: { name: 'Aleación Reforzada', icon: '🛡️' },
  neuroChipCorrupto: { name: 'Neuro-Chip Corrupto', icon: '🧠' },
};

const ExpeditionView: React.FC<ExpeditionViewProps> = React.memo(({ 
  resources,
  drones,
  activeExpeditions,
  onStartExpedition,
  onClaimReward,
  onClose 
}) => {

  const dronesInUse = {
    expeditionDrone: activeExpeditions
      .filter(exp => allExpeditionsData.find(e => e.id === exp.id)?.droneType === 'expeditionDrone')
      .reduce((sum, exp) => sum + exp.dronesSent, 0),
    expeditionV2Drone: activeExpeditions
      .filter(exp => allExpeditionsData.find(e => e.id === exp.id)?.droneType === 'expeditionV2Drone')
      .reduce((sum, exp) => sum + exp.dronesSent, 0),
  };

  const availableDrones = {
    expeditionDrone: drones.expeditionDrone - dronesInUse.expeditionDrone,
    expeditionV2Drone: drones.expeditionV2Drone - dronesInUse.expeditionV2Drone,
  };
  
  return (
    <div style={{
      backgroundColor: '#111827',
      color: '#E5E7EB',
      minHeight: '100vh',
      padding: '1rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>🗺️ MÓDULO DE EXPEDICIONES</h2>
        <button onClick={onClose} style={{ padding: '0.5rem 1rem', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cerrar
        </button>
      </div>

      <div style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3>Estado de la Flota de Expedición</h3>
        <p>Drones de Expedición (DE-1) Disponibles: <strong style={{color: '#22C55E'}}>{availableDrones.expeditionDrone}</strong> / {drones.expeditionDrone}</p>
        <p>Drones de Expedición (DE-2) Disponibles: <strong style={{color: '#10B981'}}>{availableDrones.expeditionV2Drone}</strong> / {drones.expeditionV2Drone}</p>
      </div>

      {/* EXPEDICIONES ACTIVAS */}
      {activeExpeditions.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>Expediciones en Curso</h3>
          {activeExpeditions.map(activeExp => {
            const data = allExpeditionsData.find(e => e.id === activeExp.id);
            if (!data) return null;
            const isComplete = activeExp.completionTimestamp <= Date.now();
            return (
              <div key={activeExp.id} style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <h4>{data.title}</h4>
                <p>{activeExp.dronesSent} {data.droneType === 'expeditionV2Drone' ? 'Drones (DE-2)' : 'Drones (DE-1)'} enviados.</p>
                {isComplete ? (
                  <div>
                    <p style={{color: '#22C55E'}}>¡Expedición Completada!</p>
                    <button 
                      onClick={() => onClaimReward(activeExp)}
                      style={{ padding: '0.75rem 1.5rem', backgroundColor: '#F59E0B', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      Reclamar Recompensa
                    </button>
                  </div>
                ) : (
                  <p>Tiempo Restante: <ExpeditionTimer completionTimestamp={activeExp.completionTimestamp} /></p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* EXPEDICIONES DISPONIBLES */}
      <div>
        <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>Destinos Disponibles</h3>
        {allExpeditionsData.map(exp => {
          const isActive = activeExpeditions.some(active => active.id === exp.id);
          if (isActive) return null;

          const droneType = exp.droneType;
          const dronesRequired = exp.costs.drones;
          const currentAvailableDrones = availableDrones[droneType];

          let canAfford = currentAvailableDrones >= dronesRequired;
          for (const [resource, cost] of Object.entries(exp.costs)) {
            if (resource === 'drones') continue;
            if ((resources as any)[resource] < cost) {
              canAfford = false;
              break;
            }
          }

          return (
            <div key={exp.id} style={{ 
              backgroundColor: '#1F2937', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '1rem',
              opacity: canAfford ? 1 : 0.6,
              border: `2px solid ${canAfford ? '#374151' : '#EF4444'}`
            }}>
              <h4>{exp.title}</h4>
              <p>{exp.description}</p>
              <p><strong>Duración:</strong> {exp.duration / 60} minutos</p>
              
              <div>
                <strong>Requisitos:</strong>
                <ul style={{listStyle: 'none', paddingLeft: '1rem', margin: '0.5rem 0'}}>
                  <li style={{color: currentAvailableDrones >= dronesRequired ? '#E5E7EB' : '#EF4444'}}>
                    {droneType === 'expeditionV2Drone' ? 'Drones (DE-2):' : 'Drones (DE-1):'} {dronesRequired}
                  </li>
                  {Object.entries(exp.costs).map(([resource, cost]) => {
                    if (resource === 'drones') return null;
                    const hasEnough = (resources as any)[resource] >= cost;
                    const display = rewardDisplayMap[resource] || { name: resource, icon: '❓' };
                    return (
                      <li key={resource} style={{color: hasEnough ? '#E5E7EB' : '#EF4444'}}>
                        {display.icon} {display.name}: {formatNumber(cost)}
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div>
                <strong>Posibles Recompensas:</strong>
                <ul style={{listStyle: 'none', paddingLeft: '1rem', margin: '0.5rem 0'}}>
                  {Object.entries(exp.rewards).map(([key, value]) => {
                    const display = rewardDisplayMap[key];
                    if (!display) return null;
                    const [min, max] = value;
                    return (
                      <li key={key}>
                        {display.icon} {display.name}: {formatNumber(min)} - {formatNumber(max)}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <p><strong>Riesgo:</strong> {exp.risk.chance * 100}% de posibilidad de perder el dron.</p>
              
              <button
                onClick={() => onStartExpedition(exp.id)}
                disabled={!canAfford}
                style={{ 
                  width: '100%',
                  padding: '0.75rem 1.5rem', 
                  marginTop: '1rem',
                  backgroundColor: canAfford ? '#22C55E' : '#9CA3AF', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: canAfford ? 'pointer' : 'not-allowed'
                }}
              >
                Enviar {dronesRequired} {droneType === 'expeditionV2Drone' ? 'Dron (DE-2)' : 'Dron (DE-1)'}
              </button>

            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ExpeditionView;
