// src/components/Bodega.tsx
import React from 'react';
import { useGame } from '../context/GameContext';
import './Bodega.css';
import { formatNumber } from '../utils/formatNumber';
import { bodegaData } from '../data/bodegaData';
import { resourceCategories, ResourceCategory } from '../data/categoryData';

// Importa las imágenes de los recursos que necesites
// (Se mantienen las mismas importaciones de iconos)
import metalRefinadoIcon from '../assets/images/ui/refined-metal-icon.png';
import aceroEstructuralIcon from '../assets/images/ui/structural-steel-icon.png';
import fragmentosPlacaIcon from '../assets/images/ui/plate-fragments-icon.png';
import circuitosDañadosIcon from '../assets/images/ui/damaged-circuits-icon.png';
import nucleoSingularidadIcon from '../assets/images/ui/singularity-core-icon.png';
import placasCascoIcon from '../assets/images/ui/hull-plate-icon.png';
import cableadoSuperconductorIcon from '../assets/images/ui/superconductor-wiring-icon.png';
import aleacionReforzadaIcon from '../assets/images/ui/reinforced-alloy-icon.png';
import neuroChipCorruptoIcon from '../assets/images/ui/corrupt-neurochip-icon.png';
import barraCombustibleIcon from '../assets/images/ui/fuel-rod-icon.png';
import matrizCristalinaIcon from '../assets/images/ui/health-icon.png';
import iaFragmentadaIcon from '../assets/images/ui/shield-icon.png';
import planosMk2Icon from '../assets/images/ui/attack-icon.png';


import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import { allArmoryMK2Modules } from '../data/armoryMK2Data';

const resourceMetadata: Record<string, { name: string; icon: string }> = {
  // Capítulo 1
  metalRefinado: { name: 'Metal Refinado', icon: metalRefinadoIcon },
  aceroEstructural: { name: 'Acero Estructural', icon: aceroEstructuralIcon },
  placasCasco: { name: 'Placas de Casco', icon: placasCascoIcon },
  cableadoSuperconductor: { name: 'Cableado Superconductor', icon: cableadoSuperconductorIcon },
  barraCombustible: { name: 'Barra de Combustible', icon: barraCombustibleIcon },
  aleacionReforzada: { name: 'Aleación Reforzada', icon: aleacionReforzadaIcon },
  neuroChipCorrupto: { name: 'Neuro-Chip Corrupto', icon: neuroChipCorruptoIcon },
  nucleoSingularidad: { name: 'Núcleo de Singularidad', icon: nucleoSingularidadIcon },
  fragmentosPlaca: { name: 'Fragmentos de Placa', icon: fragmentosPlacaIcon },
  circuitosDañados: { name: 'Circuitos Dañados', icon: circuitosDañadosIcon },
  // Capítulo 2
  matrizCristalina: { name: 'Matriz Cristalina', icon: matrizCristalinaIcon },
  IA_Fragmentada: { name: 'I.A. Fragmentada', icon: iaFragmentadaIcon },
  planosMK2: { name: 'Planos MK2', icon: planosMk2Icon },
  // Capítulo 3
  matrizDeManiobra: { name: 'Matriz de Maniobra', icon: '' }, // Añadir icono
  placasDeSigilo: { name: 'Placas de Sigilo', icon: '' }, // Añadir icono
  planosDeInterceptor: { name: 'Planos de Interceptor', icon: '' }, // Añadir icono
  // Capítulo 4
  nucleoDatosArcano: { name: 'Núcleo de Datos Arcano', icon: '' },
  placasAdamantioReforzado: { name: 'Placas de Adamantio', icon: '' },
  planosMK3: { name: 'Planos MK3', icon: '' },
  // Capítulo 5
  tejidoEspaciotemporal: { name: 'Tejido Espaciotemporal', icon: '' },
  singularidadEmbotellada: { name: 'Singularidad Embotellada', icon: '' },
  planosMK4: { name: 'Planos MK4', icon: '' },
  // Capítulo 6
  esquirlasDeReliquia: { name: 'Esquirlas de Reliquia', icon: '' },
  codexAncestral: { name: 'Codex Ancestral', icon: '' },
  planosMK5: { name: 'Planos MK5', icon: '' },
  // Capítulo 7
  fragmentoHorizonteSucesos: { name: 'Fragmento de Horizonte', icon: '' },
  energiaPuntoCero: { name: 'Energía del Punto Cero', icon: '' },
  planosMK6: { name: 'Planos MK6', icon: '' },
  // Capítulo 8
  esenciaDelVacio: { name: 'Esencia del Vacío', icon: '' },
  reliquiaCorrupta: { name: 'Reliquia Corrupta', icon: '' },
  planosMK7: { name: 'Planos MK7', icon: '' },
  // Capítulo 9
  nucleoEspectral: { name: 'Núcleo Espectral', icon: '' },
  conexionFantasmal: { name: 'Conexión Fantasmal', icon: '' },
  planosMK8: { name: 'Planos MK8', icon: '' },
  // Capítulo 10
  fragmentoDeCiudadela: { name: 'Fragmento de Ciudadela', icon: '' },
  matrizDeOverlord: { name: 'Matriz de Overlord', icon: '' },
  planosMK9: { name: 'Planos MK9', icon: '' },
};

const categoryDisplayOrder: ResourceCategory[] = ['materialesIndustriales', 'componentesBatalla', 'materialesExoticos'];
const categoryNames: Record<ResourceCategory, string> = {
  materialesIndustriales: 'Materiales Industriales',
  componentesBatalla: 'Componentes de Batalla',
  materialesExoticos: 'Materiales Exóticos',
};

export const Bodega: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const { vindicator, vindicatorUpgrades, vindicatorMK2Upgrades, vindicatorMK3Upgrades, vindicatorMK4Upgrades, vindicatorMK5Upgrades } = gameState;
  const { bodegaResources, vindicatorType } = vindicator;

  // Determinar la configuración de la bodega actual de forma segura
  let currentBodega;
  let type: 'base' | 'mk1' | 'mk2' | 'mk3' | 'mk4' | 'mk5' | 'mk6' | 'mk7' | 'mk8' | 'mk9';
  const resourcesToDisplaySet = new Set<string>();

  if (vindicatorType === 'mk1') {
    currentBodega = vindicator.bodegaMK1;
    type = 'mk1';
    allArmoryMK1Modules.forEach(module => {
      Object.keys(module.costs).forEach(resource => resourcesToDisplaySet.add(resource));
    });

  } else if (vindicatorType === 'mk2_interceptor') {
    currentBodega = vindicator.bodegaMK2;
    type = 'mk2';
    Object.values(vindicatorMK2Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    allArmoryMK2Modules.forEach(module => {
      Object.keys(module.costs).forEach(resource => resourcesToDisplaySet.add(resource));
    });

  } else if (vindicatorType === 'mk3_devastator') {
    currentBodega = vindicator.bodegaMK3;
    type = 'mk3';
    Object.values(vindicatorMK3Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK3');
  
  } else if (vindicatorType === 'mk4_reaper') {
    currentBodega = vindicator.bodegaMK4;
    type = 'mk4';
    Object.values(vindicatorMK4Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK4');
  
  } else if (vindicatorType === 'mk5_aegis') {
    currentBodega = vindicator.bodegaMK5;
    type = 'mk5';
    Object.values(vindicatorMK5Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK5');
  
  } else if (vindicatorType === 'mk6_tempest') {
    currentBodega = vindicator.bodegaMK6;
    type = 'mk6';
    Object.values(gameState.vindicatorMK6Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK6');

  } else if (vindicatorType === 'mk7_wraith') {
    currentBodega = vindicator.bodegaMK7;
    type = 'mk7';
    Object.values(gameState.vindicatorMK7Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK7');

  } else if (vindicatorType === 'mk8_phantom') {
    currentBodega = vindicator.bodegaMK8;
    type = 'mk8';
    Object.values(gameState.vindicatorMK8Upgrades).forEach(upgrade => {
      Object.keys(upgrade.costPerStar.phase1Resources).forEach(resource => resourcesToDisplaySet.add(resource));
      Object.keys(upgrade.costPerStar.phase2Resources).forEach(resource => resourcesToDisplaySet.add(resource));
    });
    resourcesToDisplaySet.add('planosMK8');

  } else if (vindicatorType === 'mk9_apex') {
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
    <div className="bodega-view">
      <div className="bodega-view-header">
        <h2>BODEGA DEL VINDICATOR {type !== 'base' ? type.toUpperCase() : ''}</h2>
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
                <span>{formatNumber(currentAmount)}</span>
                <span>/</span>
                <span>{formatNumber(currentBodega.capacities[resourceCategories[resourceKey]])}</span>
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
                <p>+ {formatNumber(bodegaConfig.capacityIncrease)} capacidad</p>
                <div className="upgrade-cost">
                  <img src={resourceMeta.icon} alt={resourceMeta.name} className="cost-icon-img" />
                  <span className="cost-amount">{formatNumber(cost)}</span>
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
