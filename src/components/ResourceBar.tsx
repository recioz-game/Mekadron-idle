import React from 'react';
import './ResourceBar.css'; // Importar el archivo CSS
import { useGameState } from '../context/GameContext';
import { useResources } from '../hooks/useSelectors';
import { formatNumber } from '../utils/formatNumber';

const ResourceBar: React.FC = React.memo(() => {
  const { workshop, modules, shipyard, rates } = useGameState();
  const { drones } = workshop;
  const resources = useResources();

  const {
    scrap, maxScrap, energy, maxEnergy, metalRefinado, aceroEstructural,
    fragmentosPlaca, circuitosDañados, nucleoSingularidad,
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
          <span className="icon">⚙️</span>
          <span>{formatNumber(scrap)} / {formatNumber(maxScrap)}</span>
        </div>
        <div className="resource-item" title="Energía">
          <span className="icon" style={{ color: '#06B6D4' }}>⚡</span>
          <span>{formatNumber(energy)} / {formatNumber(maxEnergy)}</span>
        </div>
        {modules.foundry && (
          <>
            <div className="resource-item" title="Metal Refinado">
              <span className="icon" style={{ color: '#F59E0B' }}>🔩</span>
              <span>{formatNumber(metalRefinado)}</span>
            </div>
            <div className="resource-item" title="Acero Estructural">
              <span className="icon" style={{ color: '#94A3B8' }}>🏗️</span>
              <span>{formatNumber(aceroEstructural)}</span>
            </div>
          </>
        )}
        {shipyardUnlocked && (
          <>
            <div className="resource-item" title="Fragmentos de Placa">
              <span className="icon">🧱</span>
              <span>{formatNumber(fragmentosPlaca)}</span>
            </div>
            <div className="resource-item" title="Circuitos Dañados">
              <span className="icon">🔌</span>
              <span>{formatNumber(circuitosDañados)}</span>
            </div>
            <div className="resource-item" title="Núcleo de Singularidad">
              <span className="icon">💥</span>
              <span>{formatNumber(nucleoSingularidad)}</span>
            </div>
          </>
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
          <span className="icon" style={{ color: '#22C55E' }}>⚙️/s</span>
          <span>{scrapPerSecond.toFixed(1)}</span>
        </div>
        <div className="rates-item" title="Balance Energético">
          <span className="icon" style={{ color: '#F59E0B' }}>⚡/s</span>
          <span className={(energyProduction - energyConsumption) >= 0 ? 'positive-rate' : 'negative-rate'}>
            {(energyProduction - energyConsumption).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default ResourceBar;