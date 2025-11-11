import React from 'react';
import './ModulesPanel.css'; // Importar el archivo CSS
import missionsButtonUrl from '../assets/images/ui/missions-button.png';
import workshopButtonUrl from '../assets/images/ui/workshop-button.png';
import storageButtonUrl from '../assets/images/ui/storage-button.png';
import energyButtonUrl from '../assets/images/ui/energy-button.png';
import laboratoryButtonUrl from '../assets/images/ui/tech-center-button.png'; // <-- ACTUALIZADO: Laboratorio
import foundryButtonUrl from '../assets/images/ui/foundry-button.png';
import expeditionsButtonUrl from '../assets/images/ui/expeditions-button.png';
import shipyardButtonUrl from '../assets/images/ui/shipyard-button.png';
import vindicatorButtonUrl from '../assets/images/ui/Vindicator-button.png';

interface ModulesPanelProps {
  workshopUnlocked: boolean;
  energyUnlocked: boolean;
  storageUnlocked: boolean;
  laboratoryUnlocked: boolean; // <-- ACTUALIZADO: Laboratorio
  foundryUnlocked: boolean;
  expeditionsUnlocked: boolean;
  shipyardUnlocked: boolean;
  phase2Unlocked: boolean;
  currentView: string;
  onModuleSelect: (module: string) => void;
    scrapForUnlock: number;
  mediumDronesForUnlock: number;
  advancedSolarForUnlock: number;
  foundryProtocolsUpgrade: number;
}

const ModulesPanel: React.FC<ModulesPanelProps> = React.memo(({ 
  workshopUnlocked,
  energyUnlocked,
  storageUnlocked,
  laboratoryUnlocked, // <-- ACTUALIZADO: Laboratorio
  foundryUnlocked,
  expeditionsUnlocked,
  shipyardUnlocked,
  phase2Unlocked,
  currentView,
  onModuleSelect,
    scrapForUnlock,
  mediumDronesForUnlock,
  advancedSolarForUnlock,
  foundryProtocolsUpgrade
}) => {
  
  

  return (
        <div className="modules-panel">

      {/* Misiones */}
      <button 
        onClick={() => onModuleSelect('missions')}
        className="module-button"
      >
        <img
          src={missionsButtonUrl}
          alt="Misiones"
          className={currentView === 'missions' ? 'active' : ''}
        />
      </button>

      {/* Energía */}
      <button 
        onClick={() => energyUnlocked && onModuleSelect('energy')}
        className="module-button"
        disabled={!energyUnlocked}
      >
        <img
          src={energyButtonUrl}
          alt="Energía"
          className={currentView === 'energy' ? 'active' : ''}
        />
      </button>

      {/* Taller */}
      <button 
        onClick={() => workshopUnlocked && onModuleSelect('workshop')}
        className="module-button"
        disabled={!workshopUnlocked}
      >
        <img
          src={workshopButtonUrl}
          alt="Taller"
          className={currentView === 'workshop' ? 'active' : ''}
        />
      </button>

      {/* Almacén */}
      <button 
        onClick={() => storageUnlocked && onModuleSelect('storage')}
        className="module-button"
        disabled={!storageUnlocked}
      >
        <img
          src={storageButtonUrl}
          alt="Almacén"
          className={currentView === 'storage' ? 'active' : ''}
        />
      </button>

      {/* Laboratorio */}
      <button
        onClick={() => laboratoryUnlocked && onModuleSelect('laboratory')}
          className="module-button"
        disabled={!laboratoryUnlocked}
        >
          <img
          src={laboratoryButtonUrl}
          alt="Laboratorio"
          className={currentView === 'laboratory' ? 'active' : ''}
          />
        </button>
      {/* Fundición */}
      {foundryUnlocked && (
        <button
          onClick={() => onModuleSelect('foundry')}
          className="module-button"
        >
          <img
            src={foundryButtonUrl}
            alt="Fundición"
            className={currentView === 'foundry' ? 'active' : ''}
          />
        </button>
      )}

      {/* Expediciones */}
      {expeditionsUnlocked && (
        <button
          onClick={() => onModuleSelect('expeditions')}
          className="module-button"
        >
          <img
            src={expeditionsButtonUrl}
            alt="Expediciones"
            className={currentView === 'expeditions' ? 'active' : ''}
          />
        </button>
      )}
      
      {/* Astillero */}
      {shipyardUnlocked && (
        <button
          onClick={() => onModuleSelect('shipyard')}
          className="module-button"
        >
          <img
            src={shipyardButtonUrl}
            alt="Astillero"
            className={currentView === 'shipyard' ? 'active' : ''}
          />
        </button>
      )}

      {/* Vindicator */}
      {phase2Unlocked && (
        <button
          onClick={() => onModuleSelect('goToPhase2')}
          className="module-button"
        >
          <img
            src={vindicatorButtonUrl}
            alt="Vindicator"
            className={currentView === 'goToPhase2' ? 'active' : ''}
          />
        </button>
            )}

      {/* Información de requisitos */}
      {(!workshopUnlocked || !energyUnlocked || !storageUnlocked || !laboratoryUnlocked || !foundryUnlocked || !expeditionsUnlocked || !shipyardUnlocked) && (
        <div className="unlock-requirements">
          <strong>Requisitos de Desbloqueo:</strong>
                    <ul>
            {!energyUnlocked && (
              <li className={scrapForUnlock >= 50 ? 'completed' : 'incomplete'}>
                {scrapForUnlock >= 50 ? '✅' : '❌'} 50 Chatarra para desbloquear Energía
              </li>
            )}
            {!workshopUnlocked && (
              <li className={scrapForUnlock >= 75 ? 'completed' : 'incomplete'}>
                {scrapForUnlock >= 75 ? '✅' : '❌'} 75 Chatarra para desbloquear Taller
              </li>
            )}
            {!storageUnlocked && (
              <li className={scrapForUnlock >= 100 ? 'completed' : 'incomplete'}>
                {scrapForUnlock >= 100 ? '✅' : '❌'} 100 Chatarra para desbloquear Almacén
                </li>
            )}
            {!laboratoryUnlocked && (
              <>
                <li className={mediumDronesForUnlock >= 3 ? 'completed' : 'incomplete'}>
                  {mediumDronesForUnlock >= 3 ? '✅' : '❌'} 3 Drones Medios para desbloquear Laboratorio
                </li>
                <li className={advancedSolarForUnlock >= 1 ? 'completed' : 'incomplete'}>
                  {advancedSolarForUnlock >= 1 ? '✅' : '❌'} 1 Panel Solar Avanzado para desbloquear Laboratorio
              </li>
                <li className={scrapForUnlock >= 1000 ? 'completed' : 'incomplete'}>
                  {scrapForUnlock >= 1000 ? '✅' : '❌'} 1000 Chatarra para desbloquear Laboratorio
                </li>
              </>
            )}
            {!foundryUnlocked && (
              <li className={foundryProtocolsUpgrade > 0 ? 'completed' : 'incomplete'}>
                {foundryProtocolsUpgrade > 0 ? '✅' : '❌'} Investigar "Protocolos de Fundición" para desbloquear Fundición
              </li>
            )}
            {!expeditionsUnlocked && (
              <li className="incomplete">
                ❌ Construye 1 Dron de Expedición para desbloquear Expediciones
              </li>
      )}
            {!shipyardUnlocked && (
              <li className="incomplete">
                ❌ Construye 1 Dron Golem para desbloquear Astillero
              </li>
            )}
          </ul>
    </div>
      )}
    </div>
  );
});

export default ModulesPanel;

