import React from 'react';
import './ModulesPanel.css'; // Importar el archivo CSS
import missionsButtonUrl from '../assets/images/ui/buttons/missions-button.png';
import workshopButtonUrl from '../assets/images/ui/buttons/workshop-button.png';
import storageButtonUrl from '../assets/images/ui/buttons/storage-button.png';
import energyButtonUrl from '../assets/images/ui/buttons/energy-button.png';
import laboratoryButtonUrl from '../assets/images/ui/buttons/tech-center-button.png';
import foundryButtonUrl from '../assets/images/ui/buttons/foundry-button.png';
import expeditionsButtonUrl from '../assets/images/ui/buttons/expeditions-button.png';
import shipyardButtonUrl from '../assets/images/ui/buttons/shipyard-button.png';
import vindicatorButtonUrl from '../assets/images/ui/buttons/Vindicator-button.png';

interface ModulesPanelProps {
  workshopUnlocked: boolean;
  energyUnlocked: boolean;
  storageUnlocked: boolean;
  laboratoryUnlocked: boolean;
  foundryUnlocked: boolean;
  expeditionsUnlocked: boolean;
  shipyardUnlocked: boolean;
  phase2Unlocked: boolean;
  currentView: string;
  onModuleSelect: (module: string) => void;
}

const ModulesPanel: React.FC<ModulesPanelProps> = React.memo(({ 
  workshopUnlocked,
  energyUnlocked,
  storageUnlocked,
  laboratoryUnlocked,
  foundryUnlocked,
  expeditionsUnlocked,
  shipyardUnlocked,
  phase2Unlocked,
  currentView,
  onModuleSelect,
}) => {
  return (
    <div className="modules-panel">
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
    </div>
  );
});

export default ModulesPanel;
