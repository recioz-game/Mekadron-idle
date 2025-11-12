import React from 'react';
import './Phase2ResourceBar.css'; // Importar el archivo CSS
import { formatNumber } from '../utils/formatNumber';
import { useGame } from '../context/GameContext';

// Importar iconos
import refinedMetalIconSm from '../assets/images/ui/refined-metal-icon_sm.png';
import structuralSteelIconSm from '../assets/images/ui/structural-steel-icon_sm.png';
import fuelRodIconSm from '../assets/images/ui/fuel-rod-icon_sm.png';
import hullPlateIconSm from '../assets/images/ui/hull-plate-icon_sm.png';
import superconductorWiringIconSm from '../assets/images/ui/superconductor-wiring-icon_sm.png';
import reinforcedAlloyIcon from '../assets/images/ui/reinforced-alloy-icon.png';
import corruptNeurochipIcon from '../assets/images/ui/corrupt-neurochip-icon.png';
import healthIcon from '../assets/images/ui/health-icon.png';
import shieldIcon from '../assets/images/ui/shield-icon.png';
import attackIcon from '../assets/images/ui/attack-icon.png';


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
          <img src={refinedMetalIconSm} alt="Metal Refinado" className="resource-icon-img" />
          <span>{formatNumber(metalRefinado)}</span>
        </div>
        <div className="resource-item" title="Acero Estructural">
          <img src={structuralSteelIconSm} alt="Acero Estructural" className="resource-icon-img" />
          <span>{formatNumber(aceroEstructural)}</span>
        </div>
        <div className="resource-item" title="Placas de Casco">
            <img src={hullPlateIconSm} alt="Placas de Casco" className="resource-icon-img" />
            <span>{formatNumber(placasCasco)}</span>
        </div>
        <div className="resource-item" title="Cableado Superconductor">
            <img src={superconductorWiringIconSm} alt="Cableado Superconductor" className="resource-icon-img" />
            <span>{formatNumber(cableadoSuperconductor)}</span>
        </div>
        
        {/* Separador Visual */}
        <div className="separator"></div>

        {/* Materiales de Combate (Fase 2) */}
        <div className="resource-item" title="Aleación Reforzada">
          <img src={reinforcedAlloyIcon} alt="Aleación Reforzada" className="resource-icon-img" />
          <span>{formatNumber(aleacionReforzada)}</span>
        </div>
        <div className="resource-item" title="Neuro-Chip Corrupto">
          <img src={corruptNeurochipIcon} alt="Neuro-Chip Corrupto" className="resource-icon-img" />
          <span>{formatNumber(neuroChipCorrupto)}</span>
        </div>
        <div className="resource-item" title="Barras de Combustible">
          <img src={fuelRodIconSm} alt="Barras de Combustible" className="resource-icon-img" />
          <span>{formatNumber(barraCombustible)}</span>
        </div>
      </div>

      {/* Stats de la Nave Vindicator - Parte derecha */}
      <div className="vindicator-stats">
        {/* Salud */}
        <div className="stat-item" title="Salud">
          <img src={healthIcon} alt="Salud" className="resource-icon-img" />
          <span className="value">
            {formatNumber(vindicator.currentHealth)}/{formatNumber(vindicator.maxHealth)}
          </span>
        </div>

        {/* Escudo */}
        <div className="stat-item" title="Escudo">
          <img src={shieldIcon} alt="Escudo" className="resource-icon-img" />
          <span className="value">
            {formatNumber(vindicator.currentShield)}/{formatNumber(vindicator.maxShield)}
          </span>
        </div>

        {/* Daño */}
        <div className="stat-item" title="Daño">
          <img src={attackIcon} alt="Ataque" className="resource-icon-img" />
          <span className="value">
            {formatNumber(vindicator.damage)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Phase2ResourceBar;
