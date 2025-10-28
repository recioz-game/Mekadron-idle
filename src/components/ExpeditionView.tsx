import React, { useState, useEffect } from 'react';
import { GameState, ExpeditionId, ActiveExpedition } from '../types/gameState';
import { expeditionsData } from '../data/expeditions';
import { formatNumber } from '../utils/formatNumber';

interface ExpeditionViewProps {
  metalRefinado: number;
  aceroEstructural: number;
  expeditionDrones: number;
  activeExpeditions: ActiveExpedition[];
  onStartExpedition: (expeditionId: ExpeditionId, droneCount: number) => void;
  onClaimReward: (expeditionId: ExpeditionId) => void;
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

// Nuevo componente para seleccionar drones
const DroneSelector: React.FC<{
  minDrones: number;
  maxDrones: number;
  availableDrones: number;
  onStart: (droneCount: number) => void;
  canStart: boolean;
}> = ({ minDrones, maxDrones, availableDrones, onStart, canStart }) => {
  const [droneCount, setDroneCount] = useState(minDrones);

  useEffect(() => {
    setDroneCount(minDrones);
  }, [minDrones]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDroneCount(Number(e.target.value));
  };

  const effectiveMax = Math.min(maxDrones, availableDrones);

  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input 
          type="range" 
          min={minDrones} 
          max={effectiveMax} 
          value={droneCount} 
          onChange={handleSliderChange}
          disabled={!canStart || minDrones >= effectiveMax}
          style={{ flexGrow: 1 }}
        />
        <input 
          type="number" 
          value={droneCount} 
          min={minDrones} 
          max={effectiveMax} 
          onChange={e => setDroneCount(Number(e.target.value))}
          disabled={!canStart}
          style={{ width: '60px', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', borderRadius: '4px' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button onClick={() => setDroneCount(minDrones)} disabled={!canStart}>MIN</button>
        <button onClick={() => setDroneCount(effectiveMax)} disabled={!canStart}>MAX</button>
      </div>
      <button
        onClick={() => onStart(droneCount)}
        disabled={!canStart || droneCount < minDrones || droneCount > availableDrones}
        style={{ 
          width: '100%',
          padding: '0.75rem 1.5rem', 
          marginTop: '1rem',
          backgroundColor: canStart ? '#22C55E' : '#9CA3AF', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: canStart ? 'pointer' : 'not-allowed'
        }}
      >
        Enviar {droneCount} Drones
      </button>
    </div>
  );
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
  metalRefinado,
  aceroEstructural,
  expeditionDrones,
  activeExpeditions,
  onStartExpedition,
  onClaimReward,
  onClose 
}) => {

  const totalExpeditionDronesInUse = activeExpeditions.reduce((sum, exp) => sum + exp.dronesSent, 0);
  const availableDrones = expeditionDrones - totalExpeditionDronesInUse;
  
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
        <p>Drones Disponibles: <strong style={{color: '#22C55E'}}>{availableDrones}</strong> / {expeditionDrones}</p>
      </div>

      {/* EXPEDICIONES ACTIVAS */}
      {activeExpeditions.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>Expediciones en Curso</h3>
          {activeExpeditions.map(activeExp => {
            const data = expeditionsData[activeExp.id];
            const isComplete = activeExp.completionTimestamp <= Date.now();
            return (
              <div key={activeExp.id} style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <h4>{data.title}</h4>
                <p>{activeExp.dronesSent} drones enviados.</p>
                {isComplete ? (
                  <div>
                    <p style={{color: '#22C55E'}}>¡Expedición Completada!</p>
                    <button 
                      onClick={() => onClaimReward(activeExp.id)}
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
        {Object.values(expeditionsData).map(exp => {
          const costDrones = exp.costs.drones;
          const costMetal = exp.costs.metalRefinado ?? 0;
          const costAcero = exp.costs.aceroEstructural ?? 0;
          
          const hasEnoughMetal = metalRefinado >= costMetal;
          const hasEnoughAcero = aceroEstructural >= costAcero;
          // La validación de drones ahora solo comprueba el mínimo
          const canAffordMinimum = availableDrones >= costDrones && hasEnoughMetal && hasEnoughAcero;

          return (
            <div key={exp.id} style={{ 
              backgroundColor: '#1F2937', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '1rem',
              opacity: canAffordMinimum ? 1 : 0.6,
              border: `2px solid ${canAffordMinimum ? '#374151' : '#EF4444'}`
            }}>
              <h4>{exp.title}</h4>
              <p>{exp.description}</p>
              <p><strong>Duración:</strong> {exp.duration / 60} minutos</p>
              
              <div>
                <strong>Requisitos Mínimos:</strong>
                <ul style={{listStyle: 'none', paddingLeft: '1rem', margin: '0.5rem 0'}}>
                  <li style={{color: availableDrones >= costDrones ? '#E5E7EB' : '#EF4444'}}>Drones de Expedición: {costDrones}</li>
                  {costMetal > 0 && <li style={{color: hasEnoughMetal ? '#E5E7EB' : '#EF4444'}}>Metal Refinado: {formatNumber(costMetal)}</li>}
                  {costAcero > 0 && <li style={{color: hasEnoughAcero ? '#E5E7EB' : '#EF4444'}}>Acero Estructural: {formatNumber(costAcero)}</li>}
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

              <p><strong>Riesgo:</strong> {exp.risk.chance * 100}% de posibilidad de perder {exp.risk.droneLossPercentage * 100}% de los drones.</p>
              
              <DroneSelector 
                minDrones={costDrones}
                maxDrones={expeditionDrones} // Pasamos el total como máximo teórico
                availableDrones={availableDrones}
                onStart={(droneCount) => onStartExpedition(exp.id, droneCount)}
                canStart={canAffordMinimum}
              />

            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ExpeditionView;
