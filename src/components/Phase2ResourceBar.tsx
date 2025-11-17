import React from 'react';
import './Phase2ResourceBar.css'; // Importar el archivo CSS
import { formatNumber } from '../utils/formatNumber';
import { useGame } from '../context/GameContext';

// Importar iconos
import fuelRodIconSm from '../assets/images/ui/fuel-rod-icon_sm.png';
import attackIcon from '../assets/images/ui/attack-icon.png';
import healthIcon from '../assets/images/ui/health-icon.png';
import shieldIcon from '../assets/images/ui/shield-icon.png';
import scrapIcon from '../assets/images/ui/scrap-icon.png';


const Phase2ResourceBar: React.FC = () => {
  const { gameState } = useGame();
  const { vindicator, resources } = gameState;
  const { bodegaResources } = vindicator;

  return (
    <div className="phase2-resource-bar">
      {/* Recursos - Parte izquierda */}
      <div className="resource-group">
        {/* Chatarra */}
        <div className="resource-item" title="Chatarra">
          <img src={scrapIcon} alt="Chatarra" className="resource-icon-img" />
          <span>{formatNumber(resources.scrap)}</span>
        </div>
        
        {/* Separador Visual */}
        <div className="separator"></div>

        {/* Barras de Combustible */}
        <div className="resource-item" title="Barras de Combustible">
          <img src={fuelRodIconSm} alt="Barras de Combustible" className="resource-icon-img" />
          <span>{formatNumber(bodegaResources.barraCombustible)}</span>
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
