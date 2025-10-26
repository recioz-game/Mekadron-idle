import React from 'react';
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
      <div style={{
        backgroundColor: '#111827',
        padding: '1rem',
        borderRadius: '8px',
        border: isCompleted ? '2px solid #22C55E' : '2px solid #374151',
        marginBottom: '1rem'
      }}>
        <h3 style={{ color: '#F59E0B', marginTop: 0 }}>{title} {isCompleted && '✅'}</h3>
        {Object.keys(costs).map(resourceKey => {
          const resource = resourceKey as keyof typeof resourcesForDonation;
          const label = resourceLabels[resource] || resource;
          const currentAmount = (progress as any)[resource];
          const requiredAmount = (costs as any)[resource];

          return (
            <div key={resource} style={{ marginBottom: '1rem' }}>
              <p style={{ textTransform: 'capitalize' }}>{label}: {formatNumber(currentAmount)} / {formatNumber(requiredAmount)}</p>
              <div style={{ width: '100%', backgroundColor: '#374151', borderRadius: '4px' }}>
                <div style={{
                  width: `${Math.min((currentAmount / requiredAmount) * 100, 100)}%`,
                  backgroundColor: '#06B6D4',
                  height: '10px',
                  borderRadius: '4px'
                }} />
              </div>
              {!isCompleted && (
                <div style={{marginTop: '0.5rem'}}>
                  <button 
                    onClick={() => handleDonate(componentKey, resource)}
                    disabled={resourcesForDonation[resource] < 1}
                    style={{
                      marginRight: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: resourcesForDonation[resource] >= 1 ? '#22C55E' : '#9CA3AF',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: resourcesForDonation[resource] >= 1 ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Donar 1
                  </button>
                  <button 
                    onClick={() => handleDonateMax(componentKey, resource)}
                    disabled={resourcesForDonation[resource] <= 0}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: resourcesForDonation[resource] > 0 ? '#F59E0B' : '#9CA3AF',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: resourcesForDonation[resource] > 0 ? 'pointer' : 'not-allowed'
                    }}
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
    <div style={{
      backgroundColor: '#111827',
      color: '#E5E7EB',
      minHeight: '100vh',
      padding: '1rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>🛠️ ASTILLERO - PROYECTO "VINDICATOR"</h2>
        <button onClick={onClose} style={{ padding: '0.5rem 1rem', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cerrar
        </button>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '2rem',
        border: '2px solid #06B6D4'
      }}>
        <p style={{textAlign: 'center', color: '#9CA3AF'}}>
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
