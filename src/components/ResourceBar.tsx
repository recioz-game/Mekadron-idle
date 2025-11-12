import React from 'react';
import './ResourceBar.css'; // Importar el archivo CSS
import { useResources, useWorkshop, useModules, useRates, useShipyard } from '../hooks/useSelectors';
import { formatNumber } from '../utils/formatNumber';

// Importar los nuevos iconos de recursos
import scrapIcon from '../assets/images/ui/scrap-icon.png';
import energyIcon from '../assets/images/ui/energy-icon.png';
import plateFragmentsIcon from '../assets/images/ui/plate-fragments-icon.png';
import damagedCircuitsIcon from '../assets/images/ui/damaged-circuits-icon.png';
import singularityCoreIcon from '../assets/images/ui/singularity-core-icon.png';
import refinedMetalIconSm from '../assets/images/ui/refined-metal-icon_sm.png';
import structuralSteelIconSm from '../assets/images/ui/structural-steel-icon_sm.png';
import fuelRodIconSm from '../assets/images/ui/fuel-rod-icon_sm.png';


const ResourceBar: React.FC = React.memo(() => {
  const rates = useRates();
  const shipyard = useShipyard();
  const workshop = useWorkshop();
  const modules = useModules();
  const { drones } = workshop;
  const resources = useResources();

    const {
    scrap, maxScrap, energy, maxEnergy, metalRefinado, aceroEstructural,
    fragmentosPlaca, circuitosDañados, nucleoSingularidad,
    barraCombustible,
    energyProduction, energyConsumption
  } = resources;

  const scrapPerSecond = rates.scrapPerSecond;
  const shipyardUnlocked = shipyard.unlocked;

  const tier1Drones = drones.basic + drones.reinforcedBasic;
  const tier2Drones = drones.medium + drones.reinforcedMedium;
  const tier3Drones = drones.advanced + drones.reinforcedAdvanced + drones.golem + drones.wyrm;

  return (
        <div className="resource-bar">
      {/* CONTENEDOR IZQUIERDA: Recursos principales */}
            <div className="resource-group">
        <div className="resource-item" title="Chatarra">
          <img src={scrapIcon} alt="Chatarra" className="resource-icon-img" />
          <span>{formatNumber(scrap)} / {formatNumber(maxScrap)}</span>
        </div>
        <div className="resource-item" title="Energía">
          <img src={energyIcon} alt="Energía" className="resource-icon-img" />
          <span>{formatNumber(energy)} / {formatNumber(maxEnergy)}</span>
        </div>
        {modules.foundry && (
          <>
            <div className="resource-item" title="Metal Refinado">
              <img src={refinedMetalIconSm} alt="Metal Refinado" className="resource-icon-img" />
              <span>{formatNumber(metalRefinado)}</span>
            </div>
            <div className="resource-item" title="Acero Estructural">
              <img src={structuralSteelIconSm} alt="Acero Estructural" className="resource-icon-img" />
              <span>{formatNumber(aceroEstructural)}</span>
            </div>
            <div className="resource-item" title="Barras de Combustible">
              <img src={fuelRodIconSm} alt="Barras de Combustible" className="resource-icon-img" />
              <span>{formatNumber(barraCombustible)}</span>
            </div>
          </>
        )}
        {modules.expeditions && (
          <>
            <div className="resource-item" title="Fragmentos de Placa">
              <img src={plateFragmentsIcon} alt="Fragmentos de Placa" className="resource-icon-img" />
              <span>{formatNumber(fragmentosPlaca)}</span>
            </div>
            <div className="resource-item" title="Circuitos Dañados">
              <img src={damagedCircuitsIcon} alt="Circuitos Dañados" className="resource-icon-img" />
              <span>{formatNumber(circuitosDañados)}</span>
            </div>
          </>
        )}
        {shipyardUnlocked && (
          <div className="resource-item" title="Núcleo de Singularidad">
            <img src={singularityCoreIcon} alt="Núcleo de Singularidad" className="resource-icon-img" />
            <span>{formatNumber(nucleoSingularidad)}</span>
          </div>
        )}
      </div>

      {/* CONTENEDOR CENTRO: Drones */}
      <div className="drones-group">
        <div className="drones-item" title="Drones Tier 1">
          <span>T1:</span>
          <strong>{tier1Drones}</strong>
        </div>
        <div className="drones-item" title="Drones Tier 2">
          <span>T2:</span>
          <strong>{tier2Drones}</strong>
        </div>
        <div className="drones-item" title="Drones Tier 3">
          <span>T3:</span>
          <strong>{tier3Drones}</strong>
        </div>
        {modules.expeditions && (
          <div className="drones-item" title="Drones de Expedición">
            <span>Exp:</span>
            <strong>{drones.expeditionDrone}</strong>
          </div>
        )}
      </div>

      {/* CONTENEDOR DERECHA: Producciones */}
            <div className="rates-group">
                    <div className="rates-item" title="Producción de Chatarra">
              <img src={scrapIcon} alt="Chatarra/s" className="resource-icon-img" />
              <span className={((scrapPerSecond - (drones.golem * 500) - (drones.wyrm * 1000)) >= 0) ? 'positive-rate' : 'negative-rate'}>
                {(scrapPerSecond - (drones.golem * 500) - (drones.wyrm * 1000)).toFixed(1)}
              </span>
            </div>
        {(drones.golem > 0 || drones.wyrm > 0) && (
          <>
            <div className="rates-item" title="Producción de Metal Refinado">
              <img src={refinedMetalIconSm} alt="Metal/s" className="resource-icon-img" />
              <span className={((drones.golem * 0.5) - (drones.wyrm * 1)) >= 0 ? 'positive-rate' : 'negative-rate'}>
                {((drones.golem * 0.5) - (drones.wyrm * 1)).toFixed(1)}
              </span>
            </div>
            <div className="rates-item" title="Producción de Acero Estructural">
              <img src={structuralSteelIconSm} alt="Acero/s" className="resource-icon-img" />
              <span className="positive-rate">
                {(drones.wyrm * 0.1).toFixed(1)}
              </span>
            </div>
          </>
        )}
        <div className="rates-item" title="Balance Energético">
          <img src={energyIcon} alt="Energía/s" className="resource-icon-img" />
          <span className={(energyProduction - energyConsumption) >= 0 ? 'positive-rate' : 'negative-rate'}>
            {(energyProduction - energyConsumption).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default ResourceBar;