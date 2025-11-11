import React from 'react';
import './ShipyardView.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import { formatNumber } from '../utils/formatNumber';
import { ActionType } from '../types/actions';
import { allShipyardProjects } from '../data/shipyardData';

interface ShipyardViewProps {
  shipyard: GameState['shipyard'];
  vindicator: GameState['vindicator'];
  resources: GameState['resources'];
  researchPoints: number;
  blueprints: number;
  dispatch: React.Dispatch<ActionType>;
  onClose: () => void;
}

const ShipyardView: React.FC<ShipyardViewProps> = ({ 
  shipyard,
  vindicator,
  resources,
  researchPoints,
  blueprints,
  dispatch, 
  onClose 
}) => {
  const currentProject = allShipyardProjects[shipyard.currentProjectIndex];
  const allResources = { ...resources, researchPoints, blueprints };

  const resourceLabels: { [key: string]: string } = {
    scrap: 'Chatarra',
    metalRefinado: 'Metal Refinado',
    aceroEstructural: 'Acero Estructural',
    placasCasco: 'Placas de Casco',
    cableadoSuperconductor: 'Cableado de Superconductores',
    nucleoSingularidad: 'Núcleo de Singularidad',
    researchPoints: 'Puntos de Investigación',
    aleacionReforzada: 'Aleación Reforzada',
    neuroChipCorrupto: 'Neuro-Chip Corrupto',
    blueprints: 'Planos',
  };
  
  const componentLabels: { [key: string]: string } = {
    hull: 'Estructura del Casco',
    powerCore: 'Núcleo de Energía',
    targetingSystem: 'Sistemas de Puntería',
    warpDrive: 'Motor de Curvatura',
    chasisReforzado: 'Chasis Reforzado',
    nucleoSingularidad: 'Núcleo de Singularidad Avanzado',
    sistemaArmamento: 'Sistema de Armamento "Devastator"',
    ensamblajeFinal: 'Ensamblaje Final',
  };

  const handleDonate = (component: string, resource: string) => {
    dispatch({ type: 'DONATE_TO_SHIPYARD', payload: { component, resource, amount: 1 } });
  };
  
  const handleDonateMax = (component: string, resource: string) => {
    const amountToDonate = (allResources as any)[resource] || 0;
    if (amountToDonate > 0) {
      dispatch({ type: 'DONATE_TO_SHIPYARD', payload: { component, resource, amount: amountToDonate } });
    }
  };

  const renderComponentProgress = (
    componentId: string,
    componentData: Record<string, number>
  ) => {
    const progress = shipyard.progress[componentId] || {};
    const isCompleted = Object.keys(componentData).every(
      resourceId => (progress[resourceId] || 0) >= componentData[resourceId]
    );

    const title = componentLabels[componentId] || componentId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    return (
      <div className={`component-progress ${isCompleted ? 'completed' : ''}`} key={componentId}>
        <h3 className="component-title">{title} {isCompleted && '✅'}</h3>
        {Object.keys(componentData).map(resourceId => {
          const requiredAmount = componentData[resourceId];
          const currentAmount = progress[resourceId] || 0;
          const userHasAmount = (allResources as any)[resourceId] || 0;
          const label = resourceLabels[resourceId] || resourceId;

          return (
            <div key={resourceId} className="resource-progress">
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
                    onClick={() => handleDonate(componentId, resourceId)}
                    disabled={userHasAmount < 1}
                    className="donate-button"
                  >
                    Donar 1
                  </button>
                  <button 
                    onClick={() => handleDonateMax(componentId, resourceId)}
                    disabled={userHasAmount <= 0}
                    className="donate-max-button"
                  >
                    Donar MAX ({formatNumber(userHasAmount)})
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="shipyard-view-container">
      {vindicator.vindicatorType === 'mk1' ? (
        // --- VISTA PARA CUANDO EL MK1 YA ESTÁ CONSTRUIDO ---
        <>
          <div className="shipyard-view-header">
            <h2>ESTADO DEL VINDICATOR</h2>
            <button onClick={onClose} className="close-button">Cerrar</button>
          </div>
          <div className="shipyard-intro">
            <h3>VINDICATOR MK.I "ACORAZADO"</h3>
            <p>Aurora: "El nuevo chasis está operativo. Todos los sistemas de combate han sido mejorados a un nuevo estándar. La antigua armería ya no es compatible; he preparado un nuevo sistema de módulos de especialización."</p>
          </div>
          <div className="mk1-stats-panel">
            <h4>Estadísticas Base:</h4>
            <p>Vida del Casco: {formatNumber(vindicator.maxHealth)}</p>
            <p>Escudo de Energía: {formatNumber(vindicator.maxShield)}</p>
            <p>Potencia de Fuego: {formatNumber(vindicator.damage)}</p>
            <p>Habilidad Pasiva: <strong>Sobrecarga Reactiva</strong></p>
          </div>
          <div className="mk1-actions">
            <button 
              className="mk1-action-button"
              onClick={() => {
                dispatch({ type: 'GO_TO_PHASE_2_VIEW', payload: 'armory' });
              }}
            >
              Ir a la Armería MK.I
            </button>
            <button 
              className="mk1-action-button"
              onClick={() => {
                dispatch({ type: 'GO_TO_PHASE_2_VIEW', payload: 'battleRoom' });
              }}
            >
              Ir a la Sala de Batalla
            </button>
          </div>
        </>
      ) : (
        // --- VISTA DE CONSTRUCCIÓN (LÓGICA ANTERIOR) ---
        currentProject ? (
          <>
            <div className="shipyard-view-header">
              <h2>ASTILLERO - PROYECTO "{currentProject.name.toUpperCase()}"</h2>
              <button onClick={onClose} className="close-button">
                Cerrar
              </button>
            </div>
            <div className="shipyard-intro">
              <p>
                {currentProject.id === 'vindicator_base'
                  ? "Aurora: \"Reconstruir el 'Vindicator' es nuestra única opción. Necesitaremos los materiales avanzados de las expediciones para ensamblar los componentes principales.\""
                  : `Aurora: "Es hora de mejorar el Vindicator a la versión Mk.I. Necesitaremos los materiales que hemos conseguido en nuestras batallas para reforzarlo."`
                }
              </p>
            </div>
            {Object.entries(currentProject.costs).map(([componentId, componentData]) => 
              renderComponentProgress(componentId, componentData)
            )}
          </>
        ) : (
          // Vista para cuando no hay más proyectos
          <div className="shipyard-view-container">
            <div className="shipyard-view-header">
              <h2>ASTILLERO</h2>
              <button onClick={onClose} className="close-button">Cerrar</button>
            </div>
            <div className="shipyard-intro">
              <p>¡Todos los proyectos del astillero han sido completados!</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default React.memo(ShipyardView);
