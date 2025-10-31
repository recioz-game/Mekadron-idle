import React from 'react';
import missionsButtonUrl from '../assets/missions-button.png';
import workshopButtonUrl from '../assets/workshop-button.png';
import storageButtonUrl from '../assets/storage-button.png';
import energyButtonUrl from '../assets/energy-button.png';
import techCenterButtonUrl from '../assets/tech-center-button.png';
import foundryButtonUrl from '../assets/foundry-button.png';
import expeditionsButtonUrl from '../assets/expeditions-button.png';
import shipyardButtonUrl from '../assets/shipyard-button.png';
import vindicatorButtonUrl from '../assets/Vindicator-button.png';

interface ModulesPanelProps {
  energyUnlocked: boolean;
  storageUnlocked: boolean;
  techCenterUnlocked: boolean;
  foundryUnlocked: boolean;
  expeditionsUnlocked: boolean;
  shipyardUnlocked: boolean;
  phase2Unlocked: boolean; // <-- NUEVA PROP
  currentView: string;
  onModuleSelect: (module: string) => void;
    scrapForUnlock: number;
  mediumDronesForUnlock: number;
  advancedSolarForUnlock: number;
  foundryProtocolsUpgrade: number;
}

const ModulesPanel: React.FC<ModulesPanelProps> = React.memo(({ 
  energyUnlocked,
  storageUnlocked,
  techCenterUnlocked,
  foundryUnlocked,
  expeditionsUnlocked,
  shipyardUnlocked,
  phase2Unlocked, // <-- NUEVA PROP
  currentView,
  onModuleSelect,
    scrapForUnlock,
  mediumDronesForUnlock,
  advancedSolarForUnlock,
  foundryProtocolsUpgrade
}) => {
  
  

  return (
        <div style={{
      backgroundColor: 'rgba(31, 41, 55, 0.8)',
      backdropFilter: 'blur(5px)',
      color: '#E5E7EB',
      padding: '1rem',
      minHeight: '100vh',
      width: '300px',
      borderLeft: '2px solid #374151',
      fontFamily: 'Inter, sans-serif'
        }}>

      {/* Misiones - SIEMPRE DISPONIBLE - PRIMERA - AHORA CON IMAGEN */}
      <button 
        onClick={() => onModuleSelect('missions')}
        style={{
          padding: '0',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '0.5rem',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <img
          src={missionsButtonUrl}
          alt="Misiones"
                              style={{
          width: '80%',
            height: 'auto',
          borderRadius: '4px',
            filter: currentView === 'missions' ? 'brightness(1.2)' : 'brightness(1)',
            transition: 'filter 0.2s ease'
        }}
        />
      </button>

      {/* Taller - SIEMPRE DISPONIBLE - SEGUNDA - AHORA CON IMAGEN */}
      <button 
        onClick={() => onModuleSelect('workshop')}
        style={{
          padding: '0',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            width: '100%',
          textAlign: 'center'
          }}
        >
        <img
          src={workshopButtonUrl}
          alt="Taller"
                                        style={{
            width: '80%',
            height: 'auto',
            borderRadius: '4px',
            filter: currentView === 'workshop' ? 'brightness(1.2)' : 'brightness(1)',
            transition: 'filter 0.2s ease'
          }}
        />
        </button>

            {/* Energía - SE DESBLOQUEA - CON IMAGEN */}
      <button 
        onClick={() => energyUnlocked && onModuleSelect('energy')}
        style={{
          padding: '0',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '4px',
          cursor: energyUnlocked ? 'pointer' : 'not-allowed',
          marginBottom: '0.5rem',
          width: '100%',
          textAlign: 'center'
        }}
        disabled={!energyUnlocked}
      >
        <img
          src={energyButtonUrl}
          alt="Energía"
                                        style={{
          width: '80%',
            height: 'auto',
          borderRadius: '4px',
            filter: currentView === 'energy' ? 'brightness(1.2)' : energyUnlocked ? 'brightness(1)' : 'brightness(0.5)',
            transition: 'filter 0.2s ease',
            opacity: energyUnlocked ? 1 : 0.6
        }}
        />
      </button>

            {/* Almacén - SE DESBLOQUEA - CON IMAGEN */}
      <button 
        onClick={() => storageUnlocked && onModuleSelect('storage')}
        style={{
          padding: '0',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '4px',
          cursor: storageUnlocked ? 'pointer' : 'not-allowed',
          marginBottom: '0.5rem',
          width: '100%',
          textAlign: 'center'
        }}
        disabled={!storageUnlocked}
      >
        <img
          src={storageButtonUrl}
          alt="Almacén"
                                        style={{
          width: '80%',
            height: 'auto',
          borderRadius: '4px',
            filter: currentView === 'storage' ? 'brightness(1.2)' : storageUnlocked ? 'brightness(1)' : 'brightness(0.5)',
            transition: 'filter 0.2s ease',
            opacity: storageUnlocked ? 1 : 0.6
        }}
        />
      </button>

            {/* Centro Técnico - SE DESBLOQUEA - CON IMAGEN */}
      <button 
        onClick={() => techCenterUnlocked && onModuleSelect('techCenter')}
        style={{
          padding: '0',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '4px',
          cursor: techCenterUnlocked ? 'pointer' : 'not-allowed',
          marginBottom: '0.5rem',
          width: '100%',
          textAlign: 'center'
        }}
        disabled={!techCenterUnlocked}
      >
        <img
          src={techCenterButtonUrl}
          alt="Centro Técnico"
                                        style={{
          width: '80%',
            height: 'auto',
          borderRadius: '4px',
            filter: currentView === 'techCenter' ? 'brightness(1.2)' : techCenterUnlocked ? 'brightness(1)' : 'brightness(0.5)',
            transition: 'filter 0.2s ease',
            opacity: techCenterUnlocked ? 1 : 0.6
        }}
        />
      </button>

            {/* Fundición - SE DESBLOQUEA - CON IMAGEN */}
      {foundryUnlocked && (
        <button
          onClick={() => onModuleSelect('foundry')}
          style={{
            padding: '0',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <img
            src={foundryButtonUrl}
            alt="Fundición"
                                                style={{
              width: '80%',
              height: 'auto',
              borderRadius: '4px',
              filter: currentView === 'foundry' ? 'brightness(1.2)' : 'brightness(1)',
              transition: 'filter 0.2s ease'
            }}
          />
        </button>
      )}

            {/* Expediciones - SE DESBLOQUEA - CON IMAGEN */}
      {expeditionsUnlocked && (
        <button
          onClick={() => onModuleSelect('expeditions')}
          style={{
            padding: '0',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <img
            src={expeditionsButtonUrl}
            alt="Expediciones"
                                                style={{
              width: '80%',
              height: 'auto',
              borderRadius: '4px',
              filter: currentView === 'expeditions' ? 'brightness(1.2)' : 'brightness(1)',
              transition: 'filter 0.2s ease'
            }}
          />
        </button>
      )}

                                    {/* Astillero - SE DESBLOQUEA - CON IMAGEN */}
      {shipyardUnlocked && (
        <button
          onClick={() => onModuleSelect('shipyard')}
          style={{
            padding: '0',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <img
            src={shipyardButtonUrl}
            alt="Astillero"
            style={{
              width: '80%',
              height: 'auto',
              borderRadius: '4px',
              filter: currentView === 'shipyard' ? 'brightness(1.2)' : 'brightness(1)',
              transition: 'filter 0.2s ease'
            }}
          />
        </button>
      )}

            {/* Vindicator - SE DESBLOQUEA - CON IMAGEN */}
      {phase2Unlocked && (
        <button
          onClick={() => onModuleSelect('goToPhase2')}
          style={{
            padding: '0',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <img
            src={vindicatorButtonUrl}
            alt="Vindicator"
            style={{
              width: '80%',
              height: 'auto',
              borderRadius: '4px',
              filter: currentView === 'goToPhase2' ? 'brightness(1.2)' : 'brightness(1)',
              transition: 'filter 0.2s ease'
            }}
          />
        </button>
      )}

      {/* Información de requisitos */}
            {(!energyUnlocked || !storageUnlocked || !techCenterUnlocked || !foundryUnlocked || !expeditionsUnlocked || !shipyardUnlocked) && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#111827',
          borderRadius: '4px',
          marginBottom: '1rem',
          fontSize: '0.8rem',
          color: '#9CA3AF',
          border: '1px solid #F59E0B'
        }}>
          <strong>Requisitos de Desbloqueo:</strong>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
            {!energyUnlocked && (
              <li style={{ color: scrapForUnlock >= 50 ? '#22C55E' : '#EF4444' }}>
                {scrapForUnlock >= 50 ? '✅' : '❌'} 50 Chatarra - Energía
              </li>
            )}
            {!storageUnlocked && (
              <li style={{ color: scrapForUnlock >= 75 ? '#22C55E' : '#EF4444' }}>
                {scrapForUnlock >= 75 ? '✅' : '❌'} 75 Chatarra - Almacén
              </li>
            )}
            {!techCenterUnlocked && (
              <>
                <li style={{ color: mediumDronesForUnlock >= 3 ? '#22C55E' : '#EF4444' }}>
                  {mediumDronesForUnlock >= 3 ? '✅' : '❌'} 3 Drones Medios
                </li>
                                <li style={{ color: advancedSolarForUnlock >= 1 ? '#22C55E' : '#EF4444' }}>
                  {advancedSolarForUnlock >= 1 ? '✅' : '❌'} 1 Panel Solar Avanzado
                </li>
                <li style={{ color: scrapForUnlock >= 1000 ? '#22C55E' : '#EF4444' }}>
                  {scrapForUnlock >= 1000 ? '✅' : '❌'} 1000 Chatarra (para Centro Técnico)
                </li>
              </>
      )}
            {!foundryUnlocked && (
              <li style={{ color: foundryProtocolsUpgrade > 0 ? '#22C55E' : '#EF4444' }}>
                {foundryProtocolsUpgrade > 0 ? '✅' : '❌'} Investigación: Protocolos de Fundición
              </li>
            )}
                        {!expeditionsUnlocked && (
              <li style={{ color: '#EF4444' }}>
                ❌ Construye 1 Dron de Expedición
              </li>
            )}
            {!shipyardUnlocked && (
              <li style={{ color: '#EF4444' }}>
                ❌ Construye 1 Dron Golem
              </li>
            )}
          </ul>
    </div>
      )}


    </div>
  );
});

export default ModulesPanel;




