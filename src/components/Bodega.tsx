// src/components/Bodega.tsx
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import './Bodega.css';
import { formatNumber } from '../utils/formatNumber';
import { bodegaData } from '../data/bodegaData';
import { resourceCategories, ResourceCategory } from '../data/categoryData';

import { resourceMetadata } from '../data/resourceMetadata';
import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import { allArmoryMK2Modules } from '../data/armoryMK2Data';

interface BodegaProps {
  onClose: () => void;
}

const categoryDisplayOrder: ResourceCategory[] = ['materialesIndustriales', 'componentesBatalla', 'materialesExoticos'];
const categoryNames: Record<ResourceCategory, string> = {
  materialesIndustriales: 'Materiales Industriales',
  componentesBatalla: 'Componentes de Batalla',
  materialesExoticos: 'Materiales Exóticos',
};

export const Bodega: React.FC<BodegaProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { gameState, dispatch } = useGame();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);
  const { vindicator, vindicatorUpgrades, vindicatorMK2Upgrades, vindicatorMK3Upgrades, vindicatorMK4Upgrades, vindicatorMK5Upgrades } = gameState;
  const { bodegaResources, vindicatorType } = vindicator;

  // Determinar la configuración de la bodega actual de forma segura
  let currentBodega;
  let type: 'base' | 'mk1' | 'mk2' | 'mk3' | 'mk4' | 'mk5' | 'mk6' | 'mk7' | 'mk8' | 'mk9';
  const resourcesToDisplaySet = new Set<string>();

  if (vindicatorType === 'vm01_origin') {
    currentBodega = vindicator.bodegaMK1;
    type = 'mk1';
    allArmoryMK1Modules.forEach(module => {
      Object.keys(module.costs).forEach(resource => resourcesToDisplaySet.add(resource));
    });

  } else if (vindicatorType === 'vm02_interceptor') {
    currentBodega = vindicator.bodegaMK2;
    type = 'mk2';
    Object.values(vindicatorMK2Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    allArmoryMK2Modules.forEach(module => {
      Object.keys(module.costs).forEach(resource => resourcesToDisplaySet.add(resource));
    });

  } else if (vindicatorType === 'vm03_devastator') {
    currentBodega = vindicator.bodegaMK3;
    type = 'mk3';
    Object.values(vindicatorMK3Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK3');
  
  } else if (vindicatorType === 'vm04_reaper') {
    currentBodega = vindicator.bodegaMK4;
    type = 'mk4';
    Object.values(vindicatorMK4Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK4');
  
  } else if (vindicatorType === 'vm05_aegis') {
    currentBodega = vindicator.bodegaMK5;
    type = 'mk5';
    Object.values(vindicatorMK5Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK5');
  
  } else if (vindicatorType === 'vm06_tempest') {
    currentBodega = vindicator.bodegaMK6;
    type = 'mk6';
    Object.values(gameState.vindicatorMK6Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK6');

  } else if (vindicatorType === 'vm07_wraith') {
    currentBodega = vindicator.bodegaMK7;
    type = 'mk7';
    Object.values(gameState.vindicatorMK7Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK7');

  } else if (vindicatorType === 'vm08_phantom') {
    currentBodega = vindicator.bodegaMK8;
    type = 'mk8';
    Object.values(gameState.vindicatorMK8Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK8');

  } else if (vindicatorType === 'vm09_apex') {
    currentBodega = vindicator.bodegaMK9;
    type = 'mk9';
    Object.values(gameState.vindicatorMK9Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK9');

  } else { // 'base'
    currentBodega = vindicator.bodegaBase;
    type = 'base';
    Object.values(vindicatorUpgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
  }
  
  const resourcesToDisplay = Array.from(resourcesToDisplaySet);

  const handleUpgrade = (category: ResourceCategory) => {
    dispatch({ type: 'UPGRADE_BODEGA_CATEGORY', payload: { category } });
  };

  return (
    <div className={`bodega-view ${gameState.settings.uiAnimationsEnabled ? 'view-fade-in' : ''} ${isVisible ? 'visible' : ''}`}>
      <div className="bodega-view-header">
        <h2>BODEGA DEL VINDICATOR {type !== 'base' ? type.toUpperCase() : ''}</h2>
        <button onClick={onClose} className="view-close-button">×</button>
      </div>

      <div className="bodega-top-section">
        {resourcesToDisplay.map(resourceKey => {
          const resourceInfo = resourceMetadata[resourceKey];
          const currentAmount = bodegaResources[resourceKey as keyof typeof bodegaResources];
          if (!resourceInfo) return null;

          return (
            <div className="resource-card" key={resourceKey}>
              <img src={resourceInfo.icon} alt={resourceInfo.name} className="resource-card-icon" />
              <span className="resource-card-name">{resourceInfo.name}</span>
              <div className="resource-card-amount">
                <span>{formatNumber(currentAmount, gameState.settings.numberFormat)}</span>
                <span>/</span>
                <span>{formatNumber(currentBodega.capacities[resourceCategories[resourceKey]], gameState.settings.numberFormat)}</span>
              </div>
        </div>
          );
        })}
      </div>

      <div className="bodega-bottom-section">
        <h3>MEJORAS DE BODEGA</h3>
        {categoryDisplayOrder.map(category => {
          const level = currentBodega.levels[category];
          const bodegaConfig = bodegaData[type]?.[category];
          if (!bodegaConfig) return null;

          const cost = Math.floor(bodegaConfig.baseCost * Math.pow(bodegaConfig.costIncreaseFactor, level - 1));
          const resourceNeeded = bodegaConfig.resource as keyof typeof bodegaResources;
          const canAfford = bodegaResources[resourceNeeded] >= cost;

          const resourceMeta = resourceMetadata[resourceNeeded];
          if (!resourceMeta) {
            console.error(`Error: Metadata not found for resource key: '${resourceNeeded}'`);
            return null;
          }

          return (
            <div className="upgrade-option" key={category}>
              <div className="upgrade-info">
                <h4>{categoryNames[category]} (Nivel {level})</h4>
                <p>+ {formatNumber(bodegaConfig.capacityIncrease, gameState.settings.numberFormat)} capacidad</p>
                <div className="upgrade-cost">
                  <img src={resourceMeta.icon} alt={resourceMeta.name} className="cost-icon-img" />
                  <span className="cost-amount">{formatNumber(cost, gameState.settings.numberFormat)}</span>
                </div>
              </div>
              <button className={`upgrade-button ${!canAfford ? 'disabled' : ''}`} onClick={() => handleUpgrade(category)} disabled={!canAfford}>
                Mejorar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
