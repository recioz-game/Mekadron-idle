import React from 'react';
import { useGameState } from '../context/GameContext';
import { useResources } from '../hooks/useSelectors';
import { formatNumber } from '../utils/formatNumber';

const ResourceBar: React.FC = React.memo(() => {
  const { drones, modules, shipyard, rates } = useGameState();
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
    <div style={{
      backgroundColor: '#111827',
      color: '#E5E7EB',
      padding: '1rem',
      borderBottom: '2px solid #1F2937',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* CONTENEDOR IZQUIERDA: Recursos principales */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Chatarra">
          <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>⚙️</span>
          <span>{formatNumber(scrap)} / {formatNumber(maxScrap)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Energía">
          <span style={{ fontSize: '1.2rem', color: '#06B6D4', marginRight: '0.5rem' }}>⚡</span>
          <span>{formatNumber(energy)} / {formatNumber(maxEnergy)}</span>
        </div>
        {modules.foundry && (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }} title="Metal Refinado">
              <span style={{ fontSize: '1.2rem', color: '#F59E0B', marginRight: '0.5rem' }}>🔩</span>
              <span>{formatNumber(metalRefinado)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }} title="Acero Estructural">
              <span style={{ fontSize: '1.2rem', color: '#94A3B8', marginRight: '0.5rem' }}>🏗️</span>
              <span>{formatNumber(aceroEstructural)}</span>
            </div>
          </>
        )}
                {shipyardUnlocked && (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }} title="Fragmentos de Placa">
              <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🧱</span>
              <span>{formatNumber(fragmentosPlaca)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }} title="Circuitos Dañados">
              <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🔌</span>
              <span>{formatNumber(circuitosDañados)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }} title="Núcleo de Singularidad">
              <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>💥</span>
              <span>{formatNumber(nucleoSingularidad)}</span>
            </div>
          </>
        )}
      </div>

      {/* CONTENEDOR CENTRO: Drones */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Drones Tier 1">
          <span style={{ marginRight: '0.5rem' }}>T1:</span>
          <strong>{tier1Drones}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Drones Tier 2">
          <span style={{ marginRight: '0.5rem' }}>T2:</span>
          <strong>{tier2Drones}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Drones Tier 3">
          <span style={{ marginRight: '0.5rem' }}>T3:</span>
          <strong>{tier3Drones}</strong>
        </div>
        {modules.expeditions && (
          <div style={{ display: 'flex', alignItems: 'center' }} title="Drones de Expedición">
            <span style={{ marginRight: '0.5rem' }}>Exp:</span>
            <strong>{drones.expeditionDrone}</strong>
          </div>
        )}
      </div>

      {/* CONTENEDOR DERECHA: Producciones */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Producción de Chatarra">
          <span style={{ color: '#22C55E', marginRight: '0.5rem' }}>⚙️/s</span>
          <span>{scrapPerSecond.toFixed(1)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Balance Energético">
          <span style={{ color: '#F59E0B', marginRight: '0.5rem' }}>⚡/s</span>
                    <span style={{color: (energyProduction - energyConsumption) >= 0 ? '#22C55E' : '#EF4444'}}>
            {(energyProduction - energyConsumption).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default ResourceBar;