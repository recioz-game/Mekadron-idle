import React from 'react';
import './UnlockRequirements.css';

interface UnlockRequirementsProps {
  workshopUnlocked: boolean;
  energyUnlocked: boolean;
  storageUnlocked: boolean;
  laboratoryUnlocked: boolean;
  foundryUnlocked: boolean;
  expeditionsUnlocked: boolean;
  shipyardUnlocked: boolean;
  scrapForUnlock: number;
  mediumDronesForUnlock: number;
  advancedSolarForUnlock: number;
  foundryProtocolsUpgrade: number;
}

const UnlockRequirements: React.FC<UnlockRequirementsProps> = ({
  workshopUnlocked,
  energyUnlocked,
  storageUnlocked,
  laboratoryUnlocked,
  foundryUnlocked,
  expeditionsUnlocked,
  shipyardUnlocked,
  scrapForUnlock,
  mediumDronesForUnlock,
  advancedSolarForUnlock,
  foundryProtocolsUpgrade,
}) => {
  const allUnlocked = workshopUnlocked && energyUnlocked && storageUnlocked && laboratoryUnlocked && foundryUnlocked && expeditionsUnlocked && shipyardUnlocked;

  if (allUnlocked) {
    return null; // No renderizar nada si todo está desbloqueado
  }

  return (
    <div className="unlock-requirements">
      <strong className="unlock-title">Requisitos de Desbloqueo:</strong>
      <ul>
        {!energyUnlocked && (
          <li className={scrapForUnlock >= 50 ? 'completed' : 'incomplete'}>
            {scrapForUnlock >= 50 ? '✅' : '❌'} 50 <span className="highlight-resource">Chatarra</span> para desbloquear Energía
          </li>
        )}
        {!workshopUnlocked && (
          <li className={scrapForUnlock >= 75 ? 'completed' : 'incomplete'}>
            {scrapForUnlock >= 75 ? '✅' : '❌'} 75 <span className="highlight-resource">Chatarra</span> para desbloquear Taller
          </li>
        )}
        {!storageUnlocked && (
          <li className={scrapForUnlock >= 100 ? 'completed' : 'incomplete'}>
            {scrapForUnlock >= 100 ? '✅' : '❌'} 100 <span className="highlight-resource">Chatarra</span> para desbloquear Almacén
          </li>
        )}
        {!laboratoryUnlocked && (
          <>
            <li className={mediumDronesForUnlock >= 3 ? 'completed' : 'incomplete'}>
              {mediumDronesForUnlock >= 3 ? '✅' : '❌'} 3 <span className="highlight-resource">Drones Medios</span> para desbloquear Laboratorio
            </li>
            <li className={advancedSolarForUnlock >= 1 ? 'completed' : 'incomplete'}>
              {advancedSolarForUnlock >= 1 ? '✅' : '❌'} 1 <span className="highlight-resource">Panel Solar Avanzado</span> para desbloquear Laboratorio
            </li>
            <li className={scrapForUnlock >= 1000 ? 'completed' : 'incomplete'}>
              {scrapForUnlock >= 1000 ? '✅' : '❌'} 1000 <span className="highlight-resource">Chatarra</span> para desbloquear Laboratorio
            </li>
          </>
        )}
        {!foundryUnlocked && (
          <li className={foundryProtocolsUpgrade > 0 ? 'completed' : 'incomplete'}>
            {foundryProtocolsUpgrade > 0 ? '✅' : '❌'} Investigar <span className="highlight-resource">"Protocolos de Fundición"</span> para desbloquear Fundición
          </li>
        )}
        {!expeditionsUnlocked && (
          <li className="incomplete">
            ❌ Construye 1 <span className="highlight-resource">Dron de Expedición</span> para desbloquear Expediciones
          </li>
        )}
        {!shipyardUnlocked && (
          <li className="incomplete">
            ❌ Construye 1 <span className="highlight-resource">Dron Golem</span> para desbloquear Astillero
          </li>
        )}
      </ul>
    </div>
  );
};

export default UnlockRequirements;