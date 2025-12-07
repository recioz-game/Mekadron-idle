import React, { useState, useEffect } from 'react';
import './ExpeditionView.css'; // Importar el archivo CSS
import { GameState, ExpeditionId, ActiveExpedition } from '../types/gameState';
import { allExpeditionsData } from '../data/expeditionsData';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';
import { useDragToScroll } from '../hooks/useDragToScroll';

interface ExpeditionViewProps {
  resources: GameState['resources'];
  drones: GameState['workshop']['drones'];
  activeExpeditions: ActiveExpedition[];
  buyAmount: number | 'max';
  onStartExpedition: (expeditionId: ExpeditionId, amount: number | 'max') => void;
  onClaimReward: (expedition: ActiveExpedition) => void;
  onSetBuyAmount: (amount: number | 'max') => void;
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




// Objeto para mapear los IDs de recursos a nombres amigables
const rewardDisplayMap: Record<string, { name: string }> = {
  scrap: { name: 'Chatarra' },
  metalRefinado: { name: 'Metal Refinado' },
  aceroEstructural: { name: 'Acero Estructural' },
  fragmentosPlaca: { name: 'Fragmentos de Placa' },
  circuitosDañados: { name: 'Circuitos Dañados' },
  aleacionReforzada: { name: 'Aleación Reforzada' },
  neuroChipCorrupto: { name: 'Neuro-Chip Corrupto' },
};

const ExpeditionView: React.FC<ExpeditionViewProps> = React.memo(({ 
  resources,
  drones,
  activeExpeditions,
  buyAmount,
  onStartExpedition,
  onClaimReward,
  onSetBuyAmount,
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
  
    const scrollRef = useDragToScroll<HTMLDivElement>();

    return (
    <div className="expedition-view-container">
      <div className="expedition-content-area" ref={scrollRef}>
        <button onClick={onClose} className="close-button">
          &times;
        </button>

                <div className="fleet-status">
          <h3>Estado de la Flota de Expedición</h3>
          <p>Drones de Expedición (DE-1) Disponibles: <strong style={{color: '#22C55E'}}>{availableDrones.expeditionDrone}</strong> / {drones.expeditionDrone}</p>
          <p>Drones de Expedición (DE-2) Disponibles: <strong style={{color: '#10B981'}}>{availableDrones.expeditionV2Drone}</strong> / {drones.expeditionV2Drone}</p>
        </div>

        <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />

        {/* EXPEDICIONES ACTIVAS */}
        {activeExpeditions.length > 0 && (
          <div className="active-expeditions">
            <h3 className="section-title">Expediciones en Curso</h3>
                      {activeExpeditions.map(activeExp => {
              const data = allExpeditionsData.find(e => e.id === activeExp.id);
              if (!data) return null;
              const isComplete = activeExp.completionTimestamp <= Date.now();
              return (
                <div key={activeExp.instanceId} className="expedition-item">
                  <h4>{data.title}</h4>
                  <p>{activeExp.dronesSent} {data.droneType === 'expeditionV2Drone' ? 'Drones (DE-2)' : 'Drones (DE-1)'} enviados.</p>
                                    {isComplete ? (
                    <div>
                      <p style={{color: '#22C55E'}}>¡Expedición Completada!</p>
                                            <BotonConTooltip
                        onClick={() => onClaimReward(activeExp)}
                        className="claim-button"
                        disabled={false}
                        tooltipText=""
                      >
                        Reclamar Recompensa
                      </BotonConTooltip>
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
        <div className="available-expeditions">
          <h3 className="section-title">Destinos Disponibles</h3>
          {allExpeditionsData.map(exp => {
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
              <div key={exp.id} className={`expedition-item ${!canAfford ? 'unavailable' : ''}`}>
                <h4>{exp.title}</h4>
                <p>{exp.description}</p>
                <p><strong>Duración:</strong> {exp.duration / 60} minutos</p>
                
                <div>
                  <strong>Requisitos:</strong>
                  <ul>
                    <li className={currentAvailableDrones >= dronesRequired ? 'requirement met' : 'requirement unmet'}>
                      {droneType === 'expeditionV2Drone' ? 'Drones (DE-2):' : 'Drones (DE-1):'} {dronesRequired}
                    </li>
                    {Object.entries(exp.costs).map(([resource, cost]) => {
                      if (resource === 'drones') return null;
                                          const hasEnough = (resources as any)[resource] >= cost;
                      const display = rewardDisplayMap[resource] || { name: resource };
                      return (
                        <li key={resource} className={hasEnough ? 'requirement met' : 'requirement unmet'}>
                          {display.name}: {formatNumber(cost)}
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div>
                  <strong>Posibles Recompensas:</strong>
                  <ul>
                                      {Object.entries(exp.rewards).map(([key, value]) => {
                      const display = rewardDisplayMap[key];
                      if (!display) return null;
                      const [min, max] = value;
                      return (
                        <li key={key}>
                          {display.name}: {formatNumber(min)} - {formatNumber(max)}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <p><strong>Riesgo:</strong> {exp.risk.chance * 100}% de posibilidad de perder el dron.</p>
                
                                <button
                  onClick={() => onStartExpedition(exp.id, buyAmount)}
                  disabled={!canAfford}
                  className="send-button"
                >
                  Enviar {buyAmount === 'max' ? `MAX (${Math.floor(currentAvailableDrones / dronesRequired)})` : buyAmount} {dronesRequired > 1 ? 'grupos' : 'grupo'}
                </button>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default ExpeditionView;
