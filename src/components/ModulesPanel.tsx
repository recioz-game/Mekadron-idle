import React from 'react';

interface ModulesPanelProps {
  energyUnlocked: boolean;
  storageUnlocked: boolean;
  techCenterUnlocked: boolean;
  foundryUnlocked: boolean;
  expeditionsUnlocked: boolean;
  shipyardUnlocked: boolean;
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
  currentView,
  onModuleSelect,
    scrapForUnlock,
  mediumDronesForUnlock,
  advancedSolarForUnlock,
  foundryProtocolsUpgrade
}) => {
  
  

  return (
    <div style={{
      backgroundColor: '#1F2937',
      color: '#E5E7EB',
      padding: '1rem',
      minHeight: '100vh',
      width: '300px',
      borderLeft: '2px solid #374151',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h3 style={{ 
        color: '#F59E0B', 
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        MÓDULOS
      </h3>

      {/* ORDEN CORREGIDO: Misiones primero */}

      {/* Misiones - SIEMPRE DISPONIBLE - PRIMERA */}
      <button 
        onClick={() => onModuleSelect('missions')}
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: currentView === 'missions' ? '#F59E0B' : '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '0.5rem',
          width: '100%',
          textAlign: 'left'
        }}
      >
        🎯 Misiones
      </button>

      {/* Taller - SIEMPRE DISPONIBLE - SEGUNDA */}
      <button 
        onClick={() => onModuleSelect('workshop')}
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: currentView === 'workshop' ? '#F59E0B' : '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '0.5rem',
          width: '100%',
          textAlign: 'left'
        }}
      >
        🏭 Taller
      </button>

      {/* Energía - Se desbloquea con 50 chatarra - TERCERA */}
      <button 
        onClick={() => onModuleSelect('energy')}
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: currentView === 'energy' ? '#F59E0B' : '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: energyUnlocked ? 'pointer' : 'not-allowed',
          marginBottom: '0.5rem',
          width: '100%',
          textAlign: 'left',
          opacity: energyUnlocked ? 1 : 0.5
        }}
        disabled={!energyUnlocked}
      >
        ⚡ Energía {!energyUnlocked && '(🔒)'}
      </button>

      {/* Almacén - Se desbloquea con 75 chatarra - CUARTA */}
      <button 
        onClick={() => onModuleSelect('storage')}
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: currentView === 'storage' ? '#F59E0B' : '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: storageUnlocked ? 'pointer' : 'not-allowed',
          marginBottom: '0.5rem',
          width: '100%',
          textAlign: 'left',
          opacity: storageUnlocked ? 1 : 0.5
        }}
        disabled={!storageUnlocked}
      >
        📦 Almacén {!storageUnlocked && '(🔒)'}
      </button>

      {/* Centro Técnico - Se desbloquea con requisitos avanzados - QUINTA */}
      <button 
        onClick={() => onModuleSelect('techCenter')}
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: currentView === 'techCenter' ? '#06B6D4' : '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: techCenterUnlocked ? 'pointer' : 'not-allowed',
          marginBottom: '0.5rem',
          width: '100%',
          textAlign: 'left',
          opacity: techCenterUnlocked ? 1 : 0.5
        }}
        disabled={!techCenterUnlocked}
      >
        🔬 Centro Técnico {!techCenterUnlocked && '(🔒)'}
      </button>

      {/* Fundición - Se desbloquea con 100k de chatarra */}
      {foundryUnlocked && (
        <button 
          onClick={() => onModuleSelect('foundry')}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: currentView === 'foundry' ? '#F59E0B' : '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            width: '100%',
            textAlign: 'left',
          }}
        >
          🔥 Fundición
        </button>
      )}

      {/* Expediciones - Se desbloquea con el primer Dron de Expedición */}
      {expeditionsUnlocked && (
        <button 
          onClick={() => onModuleSelect('expeditions')}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: currentView === 'expeditions' ? '#D946EF' : '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            width: '100%',
            textAlign: 'left',
          }}
        >
          🗺️ Expediciones
        </button>
      )}

      {/* Astillero - Se desbloquea con el primer Golem */}
      {shipyardUnlocked && (
        <button 
          onClick={() => onModuleSelect('shipyard')}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: currentView === 'shipyard' ? '#06B6D4' : '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            width: '100%',
            textAlign: 'left',
          }}
        >
          🛠️ Astillero
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