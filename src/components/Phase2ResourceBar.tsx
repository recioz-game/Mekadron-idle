import React from 'react';
import './Phase2ResourceBar.css'; // Importar el archivo CSS
import { formatNumber } from '../utils/formatNumber';
import { useGame } from '../context/GameContext';

interface Phase2ResourceBarProps {
  metalRefinado: number;
  aceroEstructural: number;
  placasCasco: number;
  cableadoSuperconductor: number;
  aleacionReforzada: number;
  neuroChipCorrupto: number;
  barraCombustible: number;
}

const Phase2ResourceBar: React.FC<Phase2ResourceBarProps> = ({
  metalRefinado,
  aceroEstructural,
  placasCasco,
  cableadoSuperconductor,
  aleacionReforzada,
  neuroChipCorrupto,
  barraCombustible,
}) => {
  const { gameState } = useGame();
  const { vindicator } = gameState;

  return (
    <div className="phase2-resource-bar">
      {/* Recursos - Parte izquierda */}
      <div className="resource-group">
        {/* Materiales Industriales (Fase 1) */}
        <div className="resource-item" title="Metal Refinado">
          <span className="icon" style={{ color: '#F59E0B' }}>🔩</span>
          <span>{formatNumber(metalRefinado)}</span>
        </div>
        <div className="resource-item" title="Acero Estructural">
          <span className="icon" style={{ color: '#94A3B8' }}>🏗️</span>
          <span>{formatNumber(aceroEstructural)}</span>
        </div>
        <div className="resource-item" title="Placas de Casco">
            <span className="icon">🧱</span>
            <span>{formatNumber(placasCasco)}</span>
        </div>
        <div className="resource-item" title="Cableado Superconductor">
            <span className="icon">🔌</span>
            <span>{formatNumber(cableadoSuperconductor)}</span>
        </div>
        
        {/* Separador Visual */}
        <div className="separator"></div>

        {/* Materiales de Combate (Fase 2) */}
        <div className="resource-item" title="Aleación Reforzada">
          <span className="icon">🛡️</span>
          <span>{formatNumber(aleacionReforzada)}</span>
        </div>
        <div className="resource-item" title="Neuro-Chip Corrupto">
          <span className="icon">🧠</span>
          <span>{formatNumber(neuroChipCorrupto)}</span>
        </div>
        <div className="resource-item" title="Barras de Combustible">
          <span className="icon">⛽</span>
          <span>{formatNumber(barraCombustible)}</span>
        </div>
      </div>

      {/* Stats de la Nave Vindicator - Parte derecha */}
      <div className="vindicator-stats">
        {/* Salud */}
        <div className="stat-item" title="Salud">
          <span className="icon" style={{ color: '#EF4444' }}>❤️</span>
          <span className="value">
            {formatNumber(vindicator.currentHealth)}/{formatNumber(vindicator.maxHealth)}
          </span>
        </div>

        {/* Escudo */}
        <div className="stat-item" title="Escudo">
          <span className="icon" style={{ color: '#3B82F6' }}>🛡️</span>
          <span className="value">
            {formatNumber(vindicator.currentShield)}/{formatNumber(vindicator.maxShield)}
          </span>
        </div>

        {/* Daño */}
        <div className="stat-item" title="Daño">
          <span className="icon" style={{ color: '#F59E0B' }}>⚔️</span>
          <span className="value">
            {formatNumber(vindicator.damage)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Phase2ResourceBar;
