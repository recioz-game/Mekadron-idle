import React from 'react';
import './ShipyardView.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import { formatNumber } from '../utils/formatNumber';
import { allShipyardProjects } from '../data/shipyardData';
import { resourceMetadata } from '../data/resourceMetadata'; // <-- AÑADIDO
import { useGameDispatch } from '../context/GameContext';
import { useDragToScroll } from '../hooks/useDragToScroll';

interface ShipyardViewProps {
  shipyard: GameState['shipyard'];
  resources: GameState['resources'];
  researchPoints: number;
  blueprints: number;
  onClose: () => void;
}

const ShipyardView: React.FC<ShipyardViewProps> = ({ 
  shipyard,
  resources,
  researchPoints,
  blueprints,
  onClose 
}) => {
    const dispatch = useGameDispatch();
  const scrollRef = useDragToScroll<HTMLDivElement>();
  const currentProject = allShipyardProjects[shipyard.currentProjectIndex];
  const allResources = { ...resources, researchPoints, blueprints };

  const componentLabels: { [key: string]: string } = {
    // --- Base ---
    hull: 'Estructura del Casco',
    powerCore: 'Núcleo de Energía',
    targetingSystem: 'Sistemas de Puntería',
    warpDrive: 'Motor de Curvatura',
    // --- MK1 ---
    chasisReforzado: 'Chasis Reforzado',
    nucleoSingularidad: 'Núcleo de Singularidad Avanzado',
    sistemaArmamento: 'Sistema de Armamento "Devastator"',
    ensamblajeFinal: 'Ensamblaje Final',
        // --- MK2 ---
    chasisDeSigilo: 'Chasis de Sigilo',
    motorDeManiobraAvanzado: 'Motor de Maniobra Avanzado',
    sistemaDeCamuflajeEspectral: 'Sistema de Camuflaje Espectral',
    // --- MK7 ---
        cascoDeEspectro: 'Casco de Espectro',
    nucleoDelVacio: 'Núcleo del Vacío',
    modulosDeCorrupcion: 'Módulos de Corrupción',
    // --- MK8 ---
    chasisEspectral: 'Chasis Espectral',
        sincronizadorFantasmal: 'Sincronizador Fantasmal',
    armamentoDeFase: 'Armamento de Fase',
    // --- MK9 ---
    blindajeDeCiudadela: 'Blindaje de Ciudadela',
    matrizDeOverlord: 'Matriz de Overlord',
    sistemasDeArmasDefinitivos: 'Sistemas de Armas Definitivos',
  };

  const projectDescriptions: { [key: string]: string } = {
    vindicator_base: "Aurora: \"Reconstruir el 'Vindicator' es nuestra única opción. Necesitaremos los materiales avanzados de las expediciones para ensamblar los componentes principales.\"",
    vindicator_mk1: "Aurora: \"Es hora de mejorar el Vindicator a la versión Mk.I. Necesitaremos los materiales que hemos conseguido en nuestras batallas para reforzarlo.\"",
        vindicator_mk2_interceptor: "Aurora: \"Hemos conseguido los planos del Interceptor. Con esta tecnología de sigilo y maniobra, seremos imparables.\"",
        vindicator_mk7_wraith: "Aurora: \"Esta tecnología es... diferente. Parece alimentarse del vacío mismo. El 'Wraith' será una leyenda, o nuestra perdición.\"",
    vindicator_mk8_phantom: "Aurora: \"Si el 'Wraith' caminaba por el vacío, el 'Phantom' es el vacío mismo. Esta nave podría ser la clave para acabar con las flotas fantasma.\"",
    vindicator_mk9_apex: "Aurora: \"Hemos llegado al final. La tecnología de la Ciudadela es nuestra. Con el 'Apex', reclamaremos el futuro. Por todos nosotros.\"",
  };


  const handleDonate = (component: string, resource: string) => {
    dispatch({ type: 'DONATE_TO_SHIPYARD', payload: { component, resource, amount: 1 } });
  };
  
  const handleDonateMax = (component: string, resource: string, amountToDonate: number) => {
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
          const label = resourceMetadata[resourceId]?.name || resourceId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());


          // Calcular la cantidad real que se puede donar con "MAX"
          const neededAmount = requiredAmount - currentAmount;
          const maxDonationAmount = Math.min(userHasAmount, neededAmount);

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
                    onClick={() => handleDonateMax(componentId, resourceId, maxDonationAmount)}
                    disabled={userHasAmount <= 0}
                    className="donate-max-button"
                  >
                    Donar MAX ({formatNumber(maxDonationAmount)})
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
      <div className="shipyard-content-area" ref={scrollRef}>
        <button onClick={onClose} className="close-button">
          &times;
        </button>
        {currentProject ? (
          <>
            <div className="shipyard-intro">
              <h2 className="shipyard-project-title">ASTILLERO - PROYECTO "{currentProject.name.toUpperCase()}"</h2>
              <p>{projectDescriptions[currentProject.id] || "Iniciando nuevo proyecto..."}</p>
            </div>
            {Object.entries(currentProject.costs).map(([componentId, componentData]) => 
              renderComponentProgress(componentId, componentData)
            )}
          </>
        ) : (
          <>
            <div className="shipyard-intro">
              <h2 className="shipyard-project-title">ASTILLERO</h2>
              <p>¡Todos los proyectos del astillero han sido completados!</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(ShipyardView);
