import React from 'react';
import './ShipyardView.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import { formatNumber } from '../utils/formatNumber';
import { ActionType } from '../types/actions';

interface ShipyardViewProps {
  shipyardProgress: GameState['shipyard']['progress'];
  shipyardCosts: GameState['shipyard']['costs'];
  placasCasco: number;
  cableadoSuperconductor: number;
  nucleoSingularidad: number;
  researchPoints: number;
  dispatch: React.Dispatch<ActionType>;
  onClose: () => void;
}

const ShipyardView: React.FC<ShipyardViewProps> = ({ 
  shipyardProgress, 
  shipyardCosts,
  placasCasco,
  cableadoSuperconductor,
  nucleoSingularidad,
  researchPoints,
  dispatch, 
  onClose 
}) => {
  const resourcesForDonation = {
    placasCasco,
    cableadoSuperconductor,
    nucleoSingularidad,
    researchPoints
  };

  const resourceLabels: { [key: string]: string } = {
    placasCasco: 'Placas de Casco',
    cableadoSuperconductor: 'Cableado de Superconductores',
    nucleoSingularidad: 'Núcleo de Singularidad',
    researchPoints: 'Puntos de Investigación',
  };

  const handleDonate = (component: keyof GameState['shipyard']['progress'], resource: keyof typeof resourcesForDonation) => {
    const amountToDonate = 1; // Simplificamos a donar de 1 en 1 por ahora
    if (resourcesForDonation[resource] >= amountToDonate) {
      dispatch({
        type: 'DONATE_TO_SHIPYARD',
        payload: { component, resource, amount: amountToDonate },
      });
    }
  };
  
  const handleDonateMax = (component: keyof GameState['shipyard']['progress'], resource: keyof typeof resourcesForDonation) => {
    const amountToDonate = resourcesForDonation[resource];
    if (amountToDonate > 0) {
      dispatch({
        type: 'DONATE_TO_SHIPYARD',
        payload: { component, resource, amount: amountToDonate },
      });
    }
  };

  const renderComponentProgress = (
    title: string,
    componentKey: keyof typeof shipyardProgress
  ) => {
    const progress = shipyardProgress[componentKey];
    const costs = shipyardCosts[componentKey];
    
    const isCompleted = Object.keys(costs).every(
      key => (progress as any)[key] >= (costs as any)[key]
    );

    return (
      <div className={`component-progress ${isCompleted ? 'completed' : ''}`}>
        <h3 className="component-title">{title} {isCompleted && '✅'}</h3>
        {Object.keys(costs).map(resourceKey => {
          const resource = resourceKey as keyof typeof resourcesForDonation;
          const label = resourceLabels[resource] || resource;
          const currentAmount = (progress as any)[resource];
          const requiredAmount = (costs as any)[resource];

          return (
            <div key={resource} className="resource-progress">
              <p>{label}: {formatNumber(currentAmount)} / {formatNumber(requiredAmount)}</p>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar"
                  style={{ width: `${Math.min((currentAmount / requiredAmount) * 100, 100)}%` }} 
                />
              </div>
              {!isCompleted && (
                <div className="donation-buttons">
                  <button 
                    onClick={() => handleDonate(componentKey, resource)}
                    disabled={resourcesForDonation[resource] < 1}
                    className="donate-button"
                  >
                    Donar 1
                  </button>
                  <button 
                    onClick={() => handleDonateMax(componentKey, resource)}
                    disabled={resourcesForDonation[resource] <= 0}
                    className="donate-max-button"
                  >
                    Donar MAX ({formatNumber(resourcesForDonation[resource as keyof typeof resourcesForDonation])})
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    );
  };

  return (
    <div className="shipyard-view-container">
      <div className="shipyard-view-header">
        <h2>🛠️ ASTILLERO - PROYECTO "VINDICATOR"</h2>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>

      <div className="shipyard-intro">
        <p>
          Aurora: "Reconstruir el acorazado 'Vindicator' es nuestra única opción. Los componentes clave solo se pueden recuperar de los restos de antiguas batallas. Envía expediciones para encontrarlos."
        </p>
      </div>
      
      {renderComponentProgress('Estructura del Casco', 'hull')}
      {renderComponentProgress('Núcleo de Energía', 'powerCore')}
      {renderComponentProgress('Sistemas de Puntería', 'targetingSystem')}
      {renderComponentProgress('Motor de Curvatura', 'warpDrive')}
    </div>
  );
};

export default React.memo(ShipyardView);
