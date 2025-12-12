import React, { useMemo } from 'react';
import './Phase2ResourceBar.css'; // Importar el archivo CSS
import { formatNumber } from '../utils/formatNumber';
import { useGame, useGameDispatch } from '../context/GameContext'; // <-- dispatch
import { resourceMetadata } from '../data/resourceMetadata'; // Importar metadatos
import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import { allArmoryMK2Modules } from '../data/armoryMK2Data';
import scrapIcon from '../assets/images/ui/scrap-icon.png';
import healthIcon from '../assets/images/ui/health-icon.png';
import shieldIcon from '../assets/images/ui/shield-icon.png';
import attackIcon from '../assets/images/ui/attack-icon.png';



const Phase2ResourceBar: React.FC = () => {
  const { gameState } = useGame();
  const dispatch = useGameDispatch(); // <-- dispatch
  const { vindicator, resources, vindicatorUpgrades, vindicatorMK2Upgrades, vindicatorMK3Upgrades, vindicatorMK4Upgrades, vindicatorMK5Upgrades, vindicatorMK6Upgrades, vindicatorMK7Upgrades, vindicatorMK8Upgrades, vindicatorMK9Upgrades } = gameState;
  const { bodegaResources, vindicatorType } = vindicator;

  const handleResourceClick = (resourceId: string) => {
    dispatch({ type: 'OPEN_CODEX_VIEW', payload: resourceId });
  };

  // Memoizar el cálculo de los recursos necesarios para evitar recalcular en cada render
  const requiredResources = useMemo(() => {
    const resourceSet = new Set<string>(['barraCombustible']); // Siempre mostrar barras de combustible

    let upgrades: any = {};
    if (vindicatorType === 'base') upgrades = vindicatorUpgrades;
    else if (vindicatorType === 'vm01_origin') {
        allArmoryMK1Modules.forEach(module => Object.keys(module.costs).forEach(res => resourceSet.add(res)));
    }
    else if (vindicatorType === 'vm02_interceptor') {
        upgrades = vindicatorMK2Upgrades;
        allArmoryMK2Modules.forEach(module => Object.keys(module.costs).forEach(res => resourceSet.add(res)));
    }
    else if (vindicatorType === 'vm03_devastator') upgrades = vindicatorMK3Upgrades;
    else if (vindicatorType === 'vm04_reaper') upgrades = vindicatorMK4Upgrades;
    else if (vindicatorType === 'vm05_aegis') upgrades = vindicatorMK5Upgrades;
    else if (vindicatorType === 'vm06_tempest') upgrades = vindicatorMK6Upgrades;
    else if (vindicatorType === 'vm07_wraith') upgrades = vindicatorMK7Upgrades;
    else if (vindicatorType === 'vm08_phantom') upgrades = vindicatorMK8Upgrades;
    else if (vindicatorType === 'vm09_apex') upgrades = vindicatorMK9Upgrades;

    // Recolectar recursos de las mejoras
    Object.values(upgrades).forEach((upgrade: any) => {
      if (upgrade.costPerStar) {
        Object.keys(upgrade.costPerStar.phase1Resources).forEach(res => resourceSet.add(res));
        Object.keys(upgrade.costPerStar.phase2Resources).forEach(res => resourceSet.add(res));
      }
    });
    
    // Convertir el Set a un Array
    return Array.from(resourceSet);
  }, [vindicatorType, vindicatorUpgrades, vindicatorMK2Upgrades, vindicatorMK3Upgrades, vindicatorMK4Upgrades, vindicatorMK5Upgrades, vindicatorMK6Upgrades, vindicatorMK7Upgrades, vindicatorMK8Upgrades, vindicatorMK9Upgrades]);


  return (
    <div className="phase2-resource-bar">
      {/* Recursos - Parte izquierda */}
      <div className="resource-group">
        {/* Chatarra (siempre visible) */}
        <div className="resource-item clickable" title="Chatarra (clic para más detalles)" onClick={() => handleResourceClick('scrap')}>
          <img src={scrapIcon} alt="Chatarra" className="resource-icon-img" />
          <span>{formatNumber(resources.scrap)}</span>
        </div>
        
        <div className="separator"></div>
        
        {/* Recursos Dinámicos */}
        {requiredResources.map(resourceKey => {
          const meta = resourceMetadata[resourceKey];
          if (!meta) return null; // O manejar un ícono por defecto

          const amount = (bodegaResources[resourceKey as keyof typeof bodegaResources] || resources[resourceKey as keyof typeof resources]) || 0;

          return (
            <div className="resource-item clickable" title={`${meta.name} (clic para más detalles)`} key={resourceKey} onClick={() => handleResourceClick(resourceKey)}>
              <img src={meta.icon} alt={meta.name} className="resource-icon-img" />
              <span>{formatNumber(amount)}</span>
            </div>
          );
        })}
      </div>

      {/* Stats de la Nave Vindicator - Parte derecha */}
      <div className="vindicator-stats">
        <div className="stat-item clickable" title="Salud (clic para más detalles)" onClick={() => handleResourceClick('vindicatorHealth')}>
          <img src={healthIcon} alt="Salud" className="resource-icon-img" />
          <span className="value">
            {formatNumber(vindicator.currentHealth)}/{formatNumber(vindicator.maxHealth)}
          </span>
        </div>
        <div className="stat-item clickable" title="Escudo (clic para más detalles)" onClick={() => handleResourceClick('vindicatorShield')}>
          <img src={shieldIcon} alt="Escudo" className="resource-icon-img" />
          <span className="value">
            {formatNumber(vindicator.currentShield)}/{formatNumber(vindicator.maxShield)}
          </span>
        </div>
        <div className="stat-item clickable" title="Daño (clic para más detalles)" onClick={() => handleResourceClick('vindicatorDamage')}>
          <img src={attackIcon} alt="Ataque" className="resource-icon-img" />
          <span className="value">{formatNumber(vindicator.damage)}</span>
        </div>
      </div>
    </div>
  );
};

export default Phase2ResourceBar;
