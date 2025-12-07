import React from 'react';
import './ResourceBar.css'; // Importar el archivo CSS
import { useResources, useWorkshop, useRates, useVindicator } from '../hooks/useSelectors';
import { useGame } from '../context/GameContext'; // Importar el hook principal
import { formatNumber } from '../utils/formatNumber';

// Importar los nuevos iconos de recursos
import scrapIcon from '../assets/images/ui/scrap-icon.png';
import energyIcon from '../assets/images/ui/energy-icon.png';
import researchIcon from '../assets/images/ui/resources/plano.png';
import refinedMetalIconSm from '../assets/images/ui/refined-metal-icon_sm.png';
import structuralSteelIconSm from '../assets/images/ui/structural-steel-icon_sm.png';
import hullPlateIconSm from '../assets/images/ui/hull-plate-icon_sm.png';
import plateFragmentsIcon from '../assets/images/ui/plate-fragments-icon.png';
import fuelRodIconSm from '../assets/images/ui/fuel-rod-icon_sm.png';
import TooltipWrapper from './TooltipWrapper';

const ResourceBar: React.FC = React.memo(() => {
  const { gameState } = useGame(); // Obtener gameState para los ajustes
  const rates = useRates();
    const workshop = useWorkshop();
  const { drones } = workshop;
  const resources = useResources();
  const vindicator = useVindicator();

      const {
    scrap, maxScrap, energy, maxEnergy,
    energyProduction, energyConsumption
  } = resources;

  const { bodegaResources } = vindicator;

  const scrapPerSecond = rates.scrapPerSecond;

  const tier1Drones = drones.basic + drones.reinforcedBasic;
  const tier2Drones = drones.medium + drones.reinforcedMedium;
  const tier3Drones = drones.advanced + drones.reinforcedAdvanced + drones.golem + drones.wyrm;

  return (
        <div className="resource-bar">
            {/* CONTENEDOR IZQUIERDA: Recursos principales */}
      <div className="resource-group">
        <TooltipWrapper tooltipText="Chatarra">
          <div className="resource-item">
            <img src={scrapIcon} alt="Chatarra" className="resource-icon-img" />
            <span>{formatNumber(scrap, gameState.settings.numberFormat)} / {formatNumber(maxScrap, gameState.settings.numberFormat)}</span>
          </div>
        </TooltipWrapper>
        <TooltipWrapper tooltipText="Energía">
          <div className="resource-item">
            <img src={energyIcon} alt="Energía" className="resource-icon-img" />
            <span>{formatNumber(energy, gameState.settings.numberFormat)} / {formatNumber(maxEnergy, gameState.settings.numberFormat)}</span>
          </div>
        </TooltipWrapper>

        {/* RECURSOS DE BODEGA - SIEMPRE VISIBLES SI HAN SIDO DESBLOQUEADOS */}
        {'metalRefinado' in bodegaResources && (
          <TooltipWrapper tooltipText="Metal Refinado">
            <div className="resource-item">
              <img src={refinedMetalIconSm} alt="Metal Refinado" className="resource-icon-img" />
              <span>{formatNumber(bodegaResources.metalRefinado ?? 0, gameState.settings.numberFormat)}</span>
            </div>
          </TooltipWrapper>
        )}
        {'aceroEstructural' in bodegaResources && (
          <TooltipWrapper tooltipText="Acero Estructural">
            <div className="resource-item">
              <img src={structuralSteelIconSm} alt="Acero Estructural" className="resource-icon-img" />
              <span>{formatNumber(bodegaResources.aceroEstructural ?? 0, gameState.settings.numberFormat)}</span>
            </div>
          </TooltipWrapper>
        )}
        {'placasCasco' in bodegaResources && (
          <TooltipWrapper tooltipText="Placas de Casco">
            <div className="resource-item">
              <img src={hullPlateIconSm} alt="Placas de Casco" className="resource-icon-img" />
              <span>{formatNumber(bodegaResources.placasCasco ?? 0, gameState.settings.numberFormat)}</span>
            </div>
          </TooltipWrapper>
        )}
        {'fragmentosPlaca' in bodegaResources && (
          <TooltipWrapper tooltipText="Fragmentos de Placa">
            <div className="resource-item">
              <img src={plateFragmentsIcon} alt="Fragmentos de Placa" className="resource-icon-img" />
              <span>{formatNumber(bodegaResources.fragmentosPlaca ?? 0, gameState.settings.numberFormat)}</span>
            </div>
          </TooltipWrapper>
        )}
        {'barraCombustible' in bodegaResources && (
          <TooltipWrapper tooltipText="Barras de Combustible">
            <div className="resource-item">
              <img src={fuelRodIconSm} alt="Barras de Combustible" className="resource-icon-img" />
              <span>{formatNumber(bodegaResources.barraCombustible ?? 0, gameState.settings.numberFormat)}</span>
            </div>
          </TooltipWrapper>
        )}

        {/* Puntos de Investigación (si el módulo está desbloqueado) */}
        {gameState.modules.techCenter && (
          <TooltipWrapper tooltipText="Puntos de Investigación">
            <div className="resource-item">
              <img src={researchIcon} alt="Investigación" className="resource-icon-img" />
              <span>{formatNumber(gameState.techCenter.researchPoints, gameState.settings.numberFormat)}</span>
            </div>
          </TooltipWrapper>
        )}
      </div>

      {/* CONTENEDOR CENTRO: Drones */}
      <div className="drones-group">
        <TooltipWrapper tooltipText="Drones Tier 1">
          <div className="drones-item">
            <span>T1:</span>
            <strong>{tier1Drones}</strong>
          </div>
        </TooltipWrapper>
        <TooltipWrapper tooltipText="Drones Tier 2">
          <div className="drones-item">
            <span>T2:</span>
            <strong>{tier2Drones}</strong>
          </div>
        </TooltipWrapper>
        <TooltipWrapper tooltipText="Drones Tier 3">
          <div className="drones-item">
            <span>T3:</span>
            <strong>{tier3Drones}</strong>
          </div>
        </TooltipWrapper>
        {drones.expeditionDrone > 0 && (
          <TooltipWrapper tooltipText="Drones de Expedición">
            <div className="drones-item">
              <span>Exp:</span>
              <strong>{drones.expeditionDrone}</strong>
            </div>
          </TooltipWrapper>
        )}
      </div>

      {/* CONTENEDOR DERECHA: Producciones */}
      <div className="rates-group">
                <TooltipWrapper tooltipText="Producción de Chatarra">
          <div className="rates-item">
            <img src={scrapIcon} alt="Chatarra/s" className="resource-icon-img" />
            <span className={rates.scrapPerSecond >= 0 ? 'positive-rate' : 'negative-rate'}>
              {rates.scrapPerSecond.toFixed(1)}
            </span>
          </div>
        </TooltipWrapper>
        {(rates.metalPerSecond > 0 || rates.steelPerSecond > 0) && (
          <>
            <TooltipWrapper tooltipText="Producción de Metal Refinado">
              <div className="rates-item">
                <img src={refinedMetalIconSm} alt="Metal/s" className="resource-icon-img" />
                <span className={rates.metalPerSecond >= 0 ? 'positive-rate' : 'negative-rate'}>
                  {rates.metalPerSecond.toFixed(1)}
                </span>
              </div>
            </TooltipWrapper>
            <TooltipWrapper tooltipText="Producción de Acero Estructural">
              <div className="rates-item">
                <img src={structuralSteelIconSm} alt="Acero/s" className="resource-icon-img" />
                <span className="positive-rate">
                  {rates.steelPerSecond.toFixed(1)}
                </span>
              </div>
            </TooltipWrapper>
          </>
        )}
                <TooltipWrapper tooltipText="Balance Energético">
          <div className="rates-item">
            <img src={energyIcon} alt="Energía/s" className="resource-icon-img" />
            <span className={(energyProduction - energyConsumption) >= 0 ? 'positive-rate' : 'negative-rate'}>
              {(energyProduction - energyConsumption).toFixed(1)}
            </span>
          </div>
        </TooltipWrapper>
      </div>
    </div>
  );
});

export default ResourceBar;