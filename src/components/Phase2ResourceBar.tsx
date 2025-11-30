import React, { useMemo } from 'react';
import './Phase2ResourceBar.css'; // Importar el archivo CSS
import { formatNumber } from '../utils/formatNumber';
import { useGame } from '../context/GameContext';
import { resourceMetadata } from '../data/resourceMetadata'; // Importar metadatos
import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import { allArmoryMK2Modules } from '../data/armoryMK2Data';

// Importar iconos básicos
import scrapIcon from '../assets/images/ui/scrap-icon.png';
import attackIcon from '../assets/images/ui/attack-icon.png';
import healthIcon from '../assets/images/ui/health-icon.png';
import shieldIcon from '../assets/images/ui/shield-icon.png';

const Phase2ResourceBar: React.FC = () => {
  const { gameState } = useGame();
  const { vindicator, resources, vindicatorUpgrades, vindicatorMK2Upgrades, vindicatorMK3Upgrades, vindicatorMK4Upgrades, vindicatorMK5Upgrades, vindicatorMK6Upgrades, vindicatorMK7Upgrades, vindicatorMK8Upgrades, vindicatorMK9Upgrades } = gameState;
  const { bodegaResources, vindicatorType } = vindicator;

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
        <div className="resource-item" title="Chatarra">
          <img src={scrapIcon} alt="Chatarra" className="resource-icon-img" />
          <span>{formatNumber(resources.scrap)}</span>
        </div>
        
        <div className="separator"></div>
        
        {/* Recursos Dinámicos */}
        {requiredResources.map(resourceKey => {
          const meta = resourceMetadata[resourceKey];
          if (!meta) return null; // O manejar un ícono por defecto

          const amount = bodegaResources[resourceKey as keyof typeof bodegaResources] || 0;

          return (
            <div className="resource-item" title={meta.name} key={resourceKey}>
              <img src={meta.icon} alt={meta.name} className="resource-icon-img" />
              <span>{formatNumber(amount)}</span>
            </div>
          );
        })}
      </div>

      {/* Stats de la Nave Vindicator - Parte derecha */}
      <div className="vindicator-stats">
        <div className="stat-item" title="Salud">
          <img src={healthIcon} alt="Salud" className="resource-icon-img" />
          <span className="value">
            {formatNumber(vindicator.currentHealth)}/{formatNumber(vindicator.maxHealth)}
          </span>
        </div>
        <div className="stat-item" title="Escudo">
          <img src={shieldIcon} alt="Escudo" className="resource-icon-img" />
          <span className="value">
            {formatNumber(vindicator.currentShield)}/{formatNumber(vindicator.maxShield)}
          </span>
        </div>
        <div className="stat-item" title="Daño">
          <img src={attackIcon} alt="Ataque" className="resource-icon-img" />
          <span className="value">{formatNumber(vindicator.damage)}</span>
        </div>
      </div>
    </div>
  );
};

export default Phase2ResourceBar;
