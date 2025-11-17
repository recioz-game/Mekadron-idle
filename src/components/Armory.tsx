import React from 'react';
import { useGame } from '../context/GameContext';
import { vindicatorLevelData, vindicatorMK2LevelData, vindicatorMK3LevelData, vindicatorMK4LevelData, vindicatorMK5LevelData, vindicatorMK6LevelData, vindicatorMK7LevelData, vindicatorMK8LevelData, vindicatorMK9LevelData } from '../data/battleData';
import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import { allArmoryMK2Modules } from '../data/armoryMK2Data';
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
  const { vindicator, resources, blueprints, vindicatorLevel, vindicatorUpgrades, vindicatorMK2Upgrades, vindicatorMK3Upgrades, vindicatorMK4Upgrades, vindicatorMK5Upgrades, vindicatorMK6Upgrades } = gameState;
  const { bodegaResources } = vindicator;

  // --- Lógica Dinámica ---
  const isMK1 = vindicator.vindicatorType === 'mk1';
  const isMK2 = vindicator.vindicatorType === 'mk2_interceptor';
  const isMK3 = vindicator.vindicatorType === 'mk3_devastator';
  const isMK4 = vindicator.vindicatorType === 'mk4_reaper';
  const isMK5 = vindicator.vindicatorType === 'mk5_aegis';
  const isMK6 = vindicator.vindicatorType === 'mk6_tempest';
  const isMK7 = vindicator.vindicatorType === 'mk7_wraith';
  const isMK8 = vindicator.vindicatorType === 'mk8_phantom';
  const isMK9 = vindicator.vindicatorType === 'mk9_apex';

  let upgradesToDisplay: any = {};
  let upgradeActionType: 'UPGRADE_VINDICATOR_STAR' | 'UPGRADE_VINDICATOR_MK1_STAR' | 'UPGRADE_VINDICATOR_MK2_STAR' | 'UPGRADE_VINDICATOR_MK3_STAR' | 'UPGRADE_VINDICATOR_MK4_STAR' | 'UPGRADE_VINDICATOR_MK5_STAR' | 'UPGRADE_VINDICATOR_MK6_STAR' | 'UPGRADE_VINDICATOR_MK7_STAR' | 'UPGRADE_VINDICATOR_MK8_STAR' | 'UPGRADE_VINDICATOR_MK9_STAR' = 'UPGRADE_VINDICATOR_STAR';
  
  if (isMK9) {
    upgradesToDisplay = gameState.vindicatorMK9Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK9_STAR';
  } else if (isMK8) {
    upgradesToDisplay = gameState.vindicatorMK8Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK8_STAR';
  } else if (isMK7) {
    upgradesToDisplay = gameState.vindicatorMK7Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK7_STAR';
  } else if (isMK6) {
    upgradesToDisplay = vindicatorMK6Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK6_STAR';
  } else if (isMK5) {
    upgradesToDisplay = vindicatorMK5Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK5_STAR';
  } else if (isMK4) {
    upgradesToDisplay = vindicatorMK4Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK4_STAR';
  } else if (isMK3) {
    upgradesToDisplay = vindicatorMK3Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK3_STAR';
  } else if (isMK2) {
    upgradesToDisplay = vindicatorMK2Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK2_STAR';
  } else if (!isMK1) { // Solo mostrar para base
    upgradesToDisplay = vindicatorUpgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_STAR';
  }

  // Sistema de Niveles
  let levelData = vindicatorLevelData;
  let levelUpActionType: 'LEVEL_UP_VINDICATOR' | 'LEVEL_UP_VINDICATOR_MK2' | 'LEVEL_UP_VINDICATOR_MK3' | 'LEVEL_UP_VINDICATOR_MK4' | 'LEVEL_UP_VINDICATOR_MK5' | 'LEVEL_UP_VINDICATOR_MK6' | 'LEVEL_UP_VINDICATOR_MK7' | 'LEVEL_UP_VINDICATOR_MK8' | 'LEVEL_UP_VINDICATOR_MK9' = 'LEVEL_UP_VINDICATOR';
  let blueprintResource = blueprints;
  let blueprintLabel = 'Planos';

  if (isMK2) {
    levelData = vindicatorMK2LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK2';
    blueprintResource = bodegaResources.planosDeInterceptor;
    blueprintLabel = 'Planos de Interceptor';
  } else if (isMK3) {
    levelData = vindicatorMK3LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK3';
    blueprintResource = bodegaResources.planosMK3;
    blueprintLabel = 'Planos MK3';
  } else if (isMK4) {
    levelData = vindicatorMK4LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK4';
    blueprintResource = bodegaResources.planosMK4;
    blueprintLabel = 'Planos MK4';
  } else if (isMK5) {
    levelData = vindicatorMK5LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK5';
    blueprintResource = bodegaResources.planosMK5;
    blueprintLabel = 'Planos MK5';
  } else if (isMK6) {
    levelData = vindicatorMK6LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK6';
    blueprintResource = bodegaResources.planosMK6;
    blueprintLabel = 'Planos MK6';
  } else if (isMK7) {
    levelData = vindicatorMK7LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK7';
    blueprintResource = bodegaResources.planosMK7;
    blueprintLabel = 'Planos MK7';
  } else if (isMK8) {
    levelData = vindicatorMK8LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK8';
    blueprintResource = bodegaResources.planosMK8;
    blueprintLabel = 'Planos MK8';
  } else if (isMK9) {
    levelData = vindicatorMK9LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK9';
    blueprintResource = bodegaResources.planosMK9;
    blueprintLabel = 'Planos MK9';
  }

  // Sistema de Módulos
  const showModules = isMK1 || isMK2 || isMK3 || isMK4 || isMK5 || isMK6 || isMK7 || isMK8 || isMK9;
  const moduleList = isMK1 ? allArmoryMK1Modules : allArmoryMK2Modules; // Necesitará Módulos MK3/4/5
  const armoryTitle = isMK1 ? 'Armería del Vindicator MK.I' : isMK2 ? 'Armería del Vindicator MK.II' : isMK3 ? 'Armería del Vindicator MK.III' : 'Armería del Vindicator';

  const handleCraftModule = (moduleId: string) => {
    dispatch({ type: 'CRAFT_VINDICATOR_MODULE', payload: { moduleId } });
  };
    
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

  // --- Lógica de Reparación ---
  const HEALTH_REPAIR_COST_PER_POINT = 50;
  const SHIELD_REPAIR_COST_PER_POINT = 0.2;

  let repairCostMultiplier = 1;
  if (isMK1) {
    repairCostMultiplier = 1.25; // 25% más caro
  } else if (isMK2) {
    repairCostMultiplier = 1.5; // 50% más caro
  }

  const calculateHealthRepairCost = () => {
    const missingHealth = vindicator.maxHealth - vindicator.currentHealth;
    return Math.floor(missingHealth * HEALTH_REPAIR_COST_PER_POINT * repairCostMultiplier);
  };

  const calculateShieldRepairCost = () => {
    const missingShield = vindicator.maxShield - vindicator.currentShield;
    return Math.floor(missingShield * SHIELD_REPAIR_COST_PER_POINT * repairCostMultiplier * 10) / 10;
  };

  const repairHealth = () => {
    const missingHealth = vindicator.maxHealth - vindicator.currentHealth;
    const cost = calculateHealthRepairCost();
    
    if (missingHealth > 0 && resources.scrap >= cost) {
      dispatch({ type: 'REPAIR_VINDICATOR_HEALTH', payload: { healthAmount: missingHealth, scrapCost: cost } });
    }
  };

  const repairShield = () => {
    const missingShield = vindicator.maxShield - vindicator.currentShield;
    const cost = calculateShieldRepairCost();
    
    if (missingShield > 0 && bodegaResources.barraCombustible >= cost) {
      dispatch({ type: 'REPAIR_VINDICATOR_SHIELD', payload: { shieldAmount: missingShield, fuelCost: cost } });
    }
  };

  const missingHealth = vindicator.maxHealth - vindicator.currentHealth;
  const missingShield = vindicator.maxShield - vindicator.currentShield;
  const healthRepairCost = calculateHealthRepairCost();
  const shieldRepairCost = calculateShieldRepairCost();

  const canRepairHealth = missingHealth > 0 && resources.scrap >= healthRepairCost;
  const canRepairShield = missingShield > 0 && bodegaResources.barraCombustible >= shieldRepairCost;

  const healthCostPerPoint = (HEALTH_REPAIR_COST_PER_POINT * repairCostMultiplier);
  const shieldCostPerPoint = (SHIELD_REPAIR_COST_PER_POINT * repairCostMultiplier);

  const armoryHeaderTitle = isMK1 ? 'ARMERÍA - VINDICATOR MK.I' : isMK2 ? 'ARMERÍA - VINDICATOR MK.II' : isMK3 ? 'ARMERÍA - VINDICATOR MK.III' : isMK4 ? 'ARMERÍA - VINDICATOR MK.IV' : isMK5 ? 'ARMERÍA - VINDICATOR MK.V' : isMK6 ? 'ARMERÍA - VINDICATOR MK.VI' : isMK7 ? 'ARMERÍA - VINDICATOR MK.VII' : isMK8 ? 'ARMERÍA - VINDICATOR MK.VIII' : isMK9 ? 'ARMERÍA - VINDICATOR MK.IX' : 'ARMERÍA - VINDICATOR';

  return (
    <div className="armory-view">
      <div className="armory-view-header">
        <h2>{armoryHeaderTitle}</h2>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>

      <div className="armory-content">
        <div className="armory-top-section">
          <div className="vindicator-status">
            <h3>Estado Actual</h3>
            <div className="status-bars">
              <div className="status-bar">
                <span>Vida: {formatNumber(vindicator.currentHealth)} / {formatNumber(vindicator.maxHealth)}</span>
                <div className="bar-container"><div className="health-fill" style={{ width: `${(vindicator.currentHealth / vindicator.maxHealth) * 100}%` }}></div></div>
              </div>
              <div className="status-bar">
                <span>Escudo: {formatNumber(vindicator.currentShield)} / {formatNumber(vindicator.maxShield)}</span>
                <div className="bar-container"><div className="shield-fill" style={{ width: `${(vindicator.currentShield / vindicator.maxShield) * 100}%` }}></div></div>
              </div>
            </div>
          </div>
          <div className="repair-section">
            <h3>SISTEMA DE REPARACIÓN</h3>
            <div className="repair-option">
              <div className="repair-info">
                <h4 title={`Coste: ${healthCostPerPoint.toFixed(0)} Chatarra por punto`}>Reparar Vida</h4>
                <p>Repara {formatNumber(missingHealth)} puntos de vida faltantes</p>
                <div className="repair-cost">
                  <img src={scrapIcon} alt="Chatarra" className="cost-icon-img" />
                  <span className="cost-amount">{formatNumber(healthRepairCost)}</span>
                  <span className="cost-name">Chatarra</span>
                </div>
              </div>
              <button className={`repair-button ${canRepairHealth ? '' : 'disabled'}`} onClick={repairHealth} disabled={!canRepairHealth}>
                {canRepairHealth ? 'REPARAR VIDA' : 'RECURSOS INSUFICIENTES'}
              </button>
            </div>
            <div className="repair-option">
              <div className="repair-info">
                <h4 title={`Coste: ${shieldCostPerPoint.toFixed(2)} Barras de Combustible por punto`}>Reparar Escudo</h4>
                <p>Repara {formatNumber(missingShield)} puntos de escudo faltantes</p>
                <div className="repair-cost">
                  <img src={fuelRodIcon} alt="Combustible" className="cost-icon-img" />
                  <span className="cost-amount">{shieldRepairCost.toFixed(1)}</span>
                  <span className="cost-name">Barras de Combustible</span>
                </div>
              </div>
              <button className={`repair-button ${canRepairShield ? '' : 'disabled'}`} onClick={repairShield} disabled={!canRepairShield}>
                {canRepairShield ? 'REPARAR ESCUDO' : 'RECURSOS INSUFICIENTES'}
              </button>
            </div>
          </div>
        </div>

                {/* --- SECCIÓN DE MEJORAS DE COMPONENTES Y NIVEL (Vindicator Base) --- */}
        {vindicator.vindicatorType === 'base' && (
          <>
            <div className="upgrades-section">
              <h3>MEJORAS DE COMPONENTES</h3>
              {Object.entries(upgradesToDisplay).map(([upgradeId, upgrade]: [string, any]) => {
                  if (!upgrade) return null;
                  const { phase1Resources, phase2Resources } = upgrade.costPerStar;
                  const hasEnoughPhase1 = (Object.entries(phase1Resources) as [string, number][]).every(([res, cost]) => (bodegaResources as any)[res] >= cost);
                  const hasEnoughPhase2 = (Object.entries(phase2Resources) as [string, number][]).every(([res, cost]) => (bodegaResources as any)[res] >= cost);
                  const isMaxLevel = upgrade.currentStars >= upgrade.maxStars;
                  const canUpgrade = hasEnoughPhase1 && hasEnoughPhase2 && !isMaxLevel;
                  const handleUpgrade = () => {
                      if (canUpgrade) {
                          dispatch({ type: upgradeActionType, payload: { upgradeId } });
                      }
                  };
                  return (
                      <div key={upgradeId} className="upgrade-card">
                          <div className="upgrade-card-header">
                              <h4>{upgrade.name}</h4>
                              <div className="stars-container">{upgrade.currentStars} / {upgrade.maxStars}</div>
                          </div>
                          <p>{upgrade.description}</p>
                          {isMaxLevel ? <p className="max-level">NIVEL MÁXIMO ALCANZADO</p> : (
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
                                          {(Object.entries(phase1Resources) as [string, number][]).map(([res, cost]) => <li key={res} className={(bodegaResources as any)[res] >= cost ? 'has-enough' : 'not-enough'}><img src={resourceIcons[res]} alt={resourceLabels[res]} className="cost-icon-img" /><span>{resourceLabels[res] || res}:</span><span>{formatNumber((bodegaResources as any)[res])} / {formatNumber(cost)}</span></li>)}
                                          {(Object.entries(phase2Resources) as [string, number][]).map(([res, cost]) => <li key={res} className={(bodegaResources as any)[res] >= cost ? 'has-enough' : 'not-enough'}><img src={resourceIcons[res]} alt={resourceLabels[res]} className="cost-icon-img" /><span>{resourceLabels[res] || res}:</span><span>{formatNumber((bodegaResources as any)[res])} / {formatNumber(cost)}</span></li>)}
                                      </ul>
                                  </div>
                                  <button className={`upgrade-button ${canUpgrade ? '' : 'disabled'}`} onClick={handleUpgrade} disabled={!canUpgrade}>
                                      {canUpgrade ? 'MEJORAR' : 'RECURSOS INSUFICIENTES'}
                                  </button>
                              </>
                          )}
                      </div>
                  );
              })}
            </div>
            <div className="vindicator-level-up-section">
                <h3>NIVEL DEL VINDICATOR (Base)</h3>
                <div className="level-up-card">
                    <div className="level-display">NIVEL ACTUAL: <span>{vindicatorLevel}</span></div>
                    {(() => {
                        const nextLevel = levelData.find(level => level.level === vindicatorLevel + 1);
                        if (!nextLevel) {
                            return <p className="max-level">MÁXIMO NIVEL ALCANZADO</p>;
                        }
                        const hasEnoughBlueprints = blueprintResource >= nextLevel.blueprintCost;
                        const handleLevelUp = () => {
                            if (hasEnoughBlueprints) {
                                dispatch({ type: levelUpActionType });
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
                                    <ul><li className={hasEnoughBlueprints ? 'has-enough' : 'not-enough'}>{blueprintLabel}: {formatNumber(blueprintResource)} / {formatNumber(nextLevel.blueprintCost)}</li></ul>
                                </div>
                                <button className={`level-up-button ${hasEnoughBlueprints ? '' : 'disabled'}`} onClick={handleLevelUp} disabled={!hasEnoughBlueprints}>
                                    {hasEnoughBlueprints ? 'SUBIR DE NIVEL' : 'PLANOS INSUFICIENTES'}
                                </button>
                            </>
                        );
                    })()}
                </div>
            </div>
          </>
        )}

        {/* --- SECCIÓN DE MÓDULOS Y NIVEL (MK.I y MK.II) --- */}
        {showModules && (
          <>
            <div className="module-slots-section">
              <h3>MÓDULOS EQUIPADOS</h3>
              <div className="module-slot-display"><strong>Ofensivo:</strong><span>{vindicator.modules.offensive || 'Ninguno'}</span></div>
              <div className="module-slot-display"><strong>Defensivo:</strong><span>{vindicator.modules.defensive || 'Ninguno'}</span></div>
              <div className="module-slot-display"><strong>Táctico:</strong><span>{vindicator.modules.tactical || 'Ninguno'}</span></div>
            </div>
            <div className="module-fabrication-section">
              <h3>{armoryTitle}</h3>
              <div className="module-list">
                {moduleList.map(module => {
                  const costs = module.costs;
                  const isMK2Costs = 'matrizDeManiobra' in costs;
                  const canAfford = isMK2Costs
                    ? (bodegaResources.matrizDeManiobra >= costs.matrizDeManiobra && bodegaResources.placasDeSigilo >= costs.placasDeSigilo && bodegaResources.planosDeInterceptor >= costs.planosDeInterceptor)
                    : (bodegaResources.matrizCristalina >= costs.matrizCristalina && bodegaResources.IA_Fragmentada >= costs.IA_Fragmentada && bodegaResources.planosMK2 >= costs.planosMK2);
                  const isEquipped = Object.values(vindicator.modules).includes(module.id);
                  return (
                    <div key={module.id} className="module-card">
                      <div className="upgrade-card-header"><h4>{module.name} ({module.slot})</h4></div>
                      <p>{module.description}</p>
                      <div className="upgrade-cost">
                        <h5>Coste:</h5>
                        {isMK2Costs ? (
                          <ul>
                            <li className={bodegaResources.matrizDeManiobra < costs.matrizDeManiobra ? 'not-enough' : ''}>Matriz de Maniobra: {costs.matrizDeManiobra}</li>
                            <li className={bodegaResources.placasDeSigilo < costs.placasDeSigilo ? 'not-enough' : ''}>Placas de Sigilo: {costs.placasDeSigilo}</li>
                            <li className={bodegaResources.planosDeInterceptor < costs.planosDeInterceptor ? 'not-enough' : ''}>Planos de Interceptor: {costs.planosDeInterceptor}</li>
                          </ul>
                        ) : (
                          <ul>
                            <li className={bodegaResources.matrizCristalina < costs.matrizCristalina ? 'not-enough' : ''}>Matriz Cristalina: {costs.matrizCristalina}</li>
                            <li className={bodegaResources.IA_Fragmentada < costs.IA_Fragmentada ? 'not-enough' : ''}>IA Fragmentada: {costs.IA_Fragmentada}</li>
                            <li className={bodegaResources.planosMK2 < costs.planosMK2 ? 'not-enough' : ''}>Planos MK2: {costs.planosMK2}</li>
                          </ul>
                        )}
                      </div>
                      <button className={`upgrade-button ${isEquipped ? 'disabled' : ''}`} onClick={() => handleCraftModule(module.id)} disabled={!canAfford || isEquipped}>
                        {isEquipped ? 'Equipado' : 'Fabricar'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="vindicator-level-up-section">
                <h3>NIVEL DEL VINDICATOR {isMK1 ? '(MK.I)' : isMK2 ? '(MK.II)' : isMK3 ? '(MK.III)' : isMK4 ? '(MK.IV)' : isMK5 ? '(MK.V)' : isMK6 ? '(MK.VI)' : isMK7 ? '(MK.VII)' : isMK8 ? '(MK.VIII)' : isMK9 ? '(MK.IX)' : ''}</h3>
                <div className="level-up-card">
                    <div className="level-display">NIVEL ACTUAL: <span>{vindicatorLevel}</span></div>
                    {(() => {
                        const nextLevel = levelData.find(level => level.level === vindicatorLevel + 1);
                        if (!nextLevel) {
                            return <p className="max-level">MÁXIMO NIVEL ALCANZADO</p>;
                        }
                        const hasEnoughBlueprints = blueprintResource >= nextLevel.blueprintCost;
                        const handleLevelUp = () => {
                            if (hasEnoughBlueprints) {
                                dispatch({ type: levelUpActionType });
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
                                    <ul><li className={hasEnoughBlueprints ? 'has-enough' : 'not-enough'}>{blueprintLabel}: {formatNumber(blueprintResource)} / {formatNumber(nextLevel.blueprintCost)}</li></ul>
                                </div>
                                <button className={`level-up-button ${hasEnoughBlueprints ? '' : 'disabled'}`} onClick={handleLevelUp} disabled={!hasEnoughBlueprints}>
                                    {hasEnoughBlueprints ? 'SUBIR DE NIVEL' : 'PLANOS INSUFICIENTES'}
                                </button>
                            </>
                        );
                    })()}
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Armory;
