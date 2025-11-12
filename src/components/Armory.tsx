import React from 'react';
import { useGame } from '../context/GameContext';
import { vindicatorLevelData } from '../data/battleData';
import { formatNumber } from '../utils/formatNumber';
import './Armory.css';
import fuelRodIcon from '../assets/images/ui/fuel-rod-icon.png';
import scrapIcon from '../assets/images/ui/scrap-icon.png';
import reinforcedAlloyIcon from '../assets/images/ui/reinforced-alloy-icon.png';
import corruptNeurochipIcon from '../assets/images/ui/corrupt-neurochip-icon.png';
import plateFragmentsIcon from '../assets/images/ui/plate-fragments-icon.png';
import damagedCircuitsIcon from '../assets/images/ui/damaged-circuits-icon.png';

interface ArmoryProps {
  onClose: () => void;
}

const Armory: React.FC<ArmoryProps> = ({ onClose }) => {
  const { gameState, dispatch } = useGame();
  const { vindicator, resources, vindicatorUpgrades, blueprints, vindicatorLevel } = gameState;

  // Mapa de nombres para mostrar en la UI
  const resourceLabels: { [key: string]: string } = {
    aleacionReforzada: 'Aleación Reforzada',
    neuroChipCorrupto: 'Neuro-Chip Corrupto',
    fragmentosPlaca: 'Fragmentos de Placa',
    circuitosDañados: 'Circuitos Dañados',
  };

  const resourceIcons: { [key: string]: string } = {
    aleacionReforzada: reinforcedAlloyIcon,
    neuroChipCorrupto: corruptNeurochipIcon,
    fragmentosPlaca: plateFragmentsIcon,
    circuitosDañados: damagedCircuitsIcon,
  };

  // Costos de reparación
  const HEALTH_REPAIR_COST_PER_POINT = 50; // 50 chatarra por punto de vida (ajustado de 100)
  const SHIELD_REPAIR_COST_PER_POINT = 0.2; // 0.2 barras de combustible por punto de escudo (ajustado de 0.1)

  const calculateHealthRepairCost = () => {
    const missingHealth = vindicator.maxHealth - vindicator.currentHealth;
    return Math.floor(missingHealth * HEALTH_REPAIR_COST_PER_POINT);
  };

  const calculateShieldRepairCost = () => {
    const missingShield = vindicator.maxShield - vindicator.currentShield;
    return Math.floor(missingShield * SHIELD_REPAIR_COST_PER_POINT * 10) / 10; // Redondear a 1 decimal
  };

  const repairHealth = () => {
    const missingHealth = vindicator.maxHealth - vindicator.currentHealth;
    const cost = calculateHealthRepairCost();
    
    if (missingHealth > 0 && resources.scrap >= cost) {
      dispatch({ 
        type: 'REPAIR_VINDICATOR_HEALTH',
        payload: { 
          healthAmount: missingHealth,
          scrapCost: cost 
        }
      });
    }
  };

  const repairShield = () => {
    const missingShield = vindicator.maxShield - vindicator.currentShield;
    const cost = calculateShieldRepairCost();
    
    if (missingShield > 0 && resources.barraCombustible >= cost) {
      dispatch({ 
        type: 'REPAIR_VINDICATOR_SHIELD',
        payload: { 
          shieldAmount: missingShield,
          fuelCost: cost 
        }
      });
    }
  };

  const missingHealth = vindicator.maxHealth - vindicator.currentHealth;
  const missingShield = vindicator.maxShield - vindicator.currentShield;
  const healthRepairCost = calculateHealthRepairCost();
  const shieldRepairCost = calculateShieldRepairCost();

  const canRepairHealth = missingHealth > 0 && resources.scrap >= healthRepairCost;
  const canRepairShield = missingShield > 0 && resources.barraCombustible >= shieldRepairCost;

  return (
    <div className="armory-view">
      <div className="armory-view-header">
        <h2>ARMERÍA - VINDICATOR</h2>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>

      <div className="armory-content">
        {/* NUEVA SECCIÓN SUPERIOR DE DOS COLUMNAS */}
        <div className="armory-top-section">
          {/* Estado Actual del Vindicator */}
          <div className="vindicator-status">
            <h3>Estado Actual</h3>
            <div className="status-bars">
              <div className="status-bar">
                <span>Vida: {formatNumber(vindicator.currentHealth)} / {formatNumber(vindicator.maxHealth)}</span>
                <div className="bar-container">
                  <div 
                    className="health-fill" 
                    style={{ width: `${(vindicator.currentHealth / vindicator.maxHealth) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="status-bar">
                <span>Escudo: {formatNumber(vindicator.currentShield)} / {formatNumber(vindicator.maxShield)}</span>
                <div className="bar-container">
                  <div 
                    className="shield-fill" 
                    style={{ width: `${(vindicator.currentShield / vindicator.maxShield) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sistema de Reparación */}
          <div className="repair-section">
            <h3>SISTEMA DE REPARACIÓN</h3>
            
            {/* Reparación de Vida */}
            <div className="repair-option">
              <div className="repair-info">
                <h4>Reparar Vida</h4>
                <p>Repara {formatNumber(missingHealth)} puntos de vida faltantes</p>
                <div className="repair-cost">
                  <img src={scrapIcon} alt="Chatarra" className="cost-icon-img" />
                  <span className="cost-amount">{formatNumber(healthRepairCost)}</span>
                  <span className="cost-name">Chatarra</span>
                </div>
              </div>
              <button 
                className={`repair-button ${canRepairHealth ? '' : 'disabled'}`}
                onClick={repairHealth}
                disabled={!canRepairHealth}
              >
                {canRepairHealth ? 'REPARAR VIDA' : 'RECURSOS INSUFICIENTES'}
              </button>
            </div>

            {/* Reparación de Escudo */}
            <div className="repair-option">
              <div className="repair-info">
                <h4>Reparar Escudo</h4>
                <p>Repara {formatNumber(missingShield)} puntos de escudo faltantes</p>
                <div className="repair-cost">
                  <img src={fuelRodIcon} alt="Combustible" className="cost-icon-img" />
                  <span className="cost-amount">{shieldRepairCost.toFixed(1)}</span>
                  <span className="cost-name">Barras de Combustible</span>
                </div>
              </div>
              <button 
                className={`repair-button ${canRepairShield ? '' : 'disabled'}`}
                onClick={repairShield}
                disabled={!canRepairShield}
              >
                {canRepairShield ? 'REPARAR ESCUDO' : 'RECURSOS INSUFICIENTES'}
              </button>
            </div>
          </div>
        </div>

        {/* Sistema de Mejoras de Componentes (Ahora primero) */}
        <div className="upgrades-section">
            <h3>MEJORAS DE COMPONENTES</h3>
            {Object.entries(vindicatorUpgrades).map(([upgradeId, upgrade]) => {
                if (!upgrade) return null;

                const { phase1Resources, phase2Resources } = upgrade.costPerStar;
                const hasEnoughPhase1 = Object.entries(phase1Resources).every(([res, cost]) => (resources as any)[res] >= cost);
                const hasEnoughPhase2 = Object.entries(phase2Resources).every(([res, cost]) => (resources as any)[res] >= cost);
                const isMaxLevel = upgrade.currentStars >= upgrade.maxStars;
                const canUpgrade = hasEnoughPhase1 && hasEnoughPhase2 && !isMaxLevel;

                const handleUpgrade = () => {
                    if (canUpgrade) {
                        dispatch({ type: 'UPGRADE_VINDICATOR_STAR', payload: { upgradeId } });
                    }
                };

                return (
                    <div key={upgradeId} className="upgrade-card">
                        <div className="upgrade-card-header">
                            <h4>{upgrade.name}</h4>
                            <div className="stars-container">
                                {upgrade.currentStars} / {upgrade.maxStars}
                            </div>
                        </div>
                        <p>{upgrade.description}</p>
                        
                        {isMaxLevel ? (
                            <p className="max-level">NIVEL MÁXIMO ALCANZADO</p>
                        ) : (
                            <>
                                <div className="level-up-bonus">
                                    <h5>BONIFICACIÓN PRÓXIMA MEJORA:</h5>
                                    <ul>
                                        {upgrade.statIncreasePerStar.health && <li>+{upgrade.statIncreasePerStar.health} Vida Máxima</li>}
                                        {upgrade.statIncreasePerStar.shield && <li>+{upgrade.statIncreasePerStar.shield} Escudo Máximo</li>}
                                        {upgrade.statIncreasePerStar.damage && <li>+{upgrade.statIncreasePerStar.damage} Daño</li>}
                                    </ul>
                                </div>
                                <div className="upgrade-cost">
                                    <h5>COSTE PRÓXIMA MEJORA:</h5>
                                    <ul className="cost-list">
                                        {Object.entries(phase1Resources).map(([res, cost]) => 
                                            <li key={res} className={(resources as any)[res] >= cost ? 'has-enough' : 'not-enough'}>
                                                <img src={resourceIcons[res]} alt={resourceLabels[res]} className="cost-icon-img" />
                                                <span>{resourceLabels[res] || res}:</span>
                                                <span>{formatNumber((resources as any)[res])} / {formatNumber(cost)}</span>
                                            </li>
                                        )}
                                        {Object.entries(phase2Resources).map(([res, cost]) => 
                                            <li key={res} className={(resources as any)[res] >= cost ? 'has-enough' : 'not-enough'}>
                                                <img src={resourceIcons[res]} alt={resourceLabels[res]} className="cost-icon-img" />
                                                <span>{resourceLabels[res] || res}:</span>
                                                <span>{formatNumber((resources as any)[res])} / {formatNumber(cost)}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <button
                                    className={`upgrade-button ${canUpgrade ? '' : 'disabled'}`}
                                    onClick={handleUpgrade}
                                    disabled={!canUpgrade}
                                >
                                    {canUpgrade ? 'MEJORAR' : 'RECURSOS INSUFICIENTES'}
                                </button>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
        
        {/* Nivel del Vindicator (Ahora segundo) */}
        <div className="vindicator-level-up-section">
            <h3>NIVEL DEL VINDICATOR</h3>
            <div className="level-up-card">
                <div className="level-display">
                    NIVEL ACTUAL: <span>{vindicatorLevel}</span>
                </div>
                {(() => {
                    const nextLevel = vindicatorLevelData.find(level => level.level === vindicatorLevel + 1);
                    if (!nextLevel) {
                        return <p className="max-level">MÁXIMO NIVEL ALCANZADO</p>;
                    }

                    const hasEnoughBlueprints = blueprints >= nextLevel.blueprintCost;
                    const handleLevelUp = () => {
                        if (hasEnoughBlueprints) {
                            dispatch({ type: 'LEVEL_UP_VINDICATOR' });
                        }
                    };

                    return (
                        <>
                            <div className="level-up-bonus">
                                <h5>BONIFICACIÓN AL SUBIR DE NIVEL:</h5>
                                <ul>
                                    <li>+{nextLevel.statBonus.health} Vida Máxima</li>
                                    <li>+{nextLevel.statBonus.shield} Escudo Máximo</li>
                                    <li>+{nextLevel.statBonus.damage} Daño</li>
                                </ul>
                            </div>
                            <div className="upgrade-cost">
                                <h5>COSTE PARA NIVEL {nextLevel.level}:</h5>
                                <ul>
                                    <li className={hasEnoughBlueprints ? 'has-enough' : 'not-enough'}>
                                        Planos: {formatNumber(blueprints)} / {formatNumber(nextLevel.blueprintCost)}
                                    </li>
                                </ul>
                            </div>
                            <button
                                className={`level-up-button ${hasEnoughBlueprints ? '' : 'disabled'}`}
                                onClick={handleLevelUp}
                                disabled={!hasEnoughBlueprints}
                            >
                                {hasEnoughBlueprints ? 'SUBIR DE NIVEL' : 'PLANOS INSUFICIENTES'}
                            </button>
                        </>
                    );
                })()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Armory;
