import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { vindicatorLevelData, vindicatorMK2LevelData, vindicatorMK3LevelData, vindicatorMK4LevelData, vindicatorMK5LevelData, vindicatorMK6LevelData, vindicatorMK7LevelData, vindicatorMK8LevelData, vindicatorMK9LevelData } from '../data/battleData';
import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import { allArmoryMK2Modules } from '../data/armoryMK2Data';
import { formatNumber } from '../utils/formatNumber';
import './Armory.css';
import { gameConfig } from '../data/gameConfig';
import { resourceMetadata } from '../data/resourceMetadata';


interface ArmoryProps {
  onClose: () => void;
}

const Armory: React.FC<ArmoryProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { gameState, dispatch } = useGame();
  const { vindicator, resources, blueprints, vindicatorLevel, vindicatorUpgrades, vindicatorMK2Upgrades, vindicatorMK3Upgrades, vindicatorMK4Upgrades, vindicatorMK5Upgrades, vindicatorMK6Upgrades, techCenter } = gameState;
  const { bodegaResources } = vindicator;
  const allResources = { ...resources, ...bodegaResources };
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const vindicatorNameMap: Record<string, string> = {
    base: 'VINDICATOR',
    vm01_origin: 'VM01 — ORIGIN',
    vm02_interceptor: 'VM02 — INTERCEPTOR',
    vm03_devastator: 'VM03 — DEVASTATOR',
    vm04_reaper: 'VM04 — REAPER',
    vm05_aegis: 'VM05 — AEGIS',
    vm06_tempest: 'VM06 — TEMPEST',
    vm07_wraith: 'VM07 — WRAITH',
    vm08_phantom: 'VM08 — PHANTOM',
    vm09_apex: 'VM09 — APEX',
  };
  
  const isVM01 = vindicator.vindicatorType === 'vm01_origin';
  const isVM02 = vindicator.vindicatorType === 'vm02_interceptor';
  const isVM03 = vindicator.vindicatorType === 'vm03_devastator';
  const isVM04 = vindicator.vindicatorType === 'vm04_reaper';
  const isVM05 = vindicator.vindicatorType === 'vm05_aegis';
  const isVM06 = vindicator.vindicatorType === 'vm06_tempest';
  const isVM07 = vindicator.vindicatorType === 'vm07_wraith';
  const isVM08 = vindicator.vindicatorType === 'vm08_phantom';
  const isVM09 = vindicator.vindicatorType === 'vm09_apex';

  let upgradesToDisplay: any = {};
  let upgradeActionType: 'UPGRADE_VINDICATOR_STAR' | 'UPGRADE_VINDICATOR_MK1_STAR' | 'UPGRADE_VINDICATOR_MK2_STAR' | 'UPGRADE_VINDICATOR_MK3_STAR' | 'UPGRADE_VINDICATOR_MK4_STAR' | 'UPGRADE_VINDICATOR_MK5_STAR' | 'UPGRADE_VINDICATOR_MK6_STAR' | 'UPGRADE_VINDICATOR_MK7_STAR' | 'UPGRADE_VINDICATOR_MK8_STAR' | 'UPGRADE_VINDICATOR_MK9_STAR' = 'UPGRADE_VINDICATOR_STAR';
  
  if (isVM09) {
    upgradesToDisplay = gameState.vindicatorMK9Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK9_STAR';
  } else if (isVM08) {
    upgradesToDisplay = gameState.vindicatorMK8Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK8_STAR';
  } else if (isVM07) {
    upgradesToDisplay = gameState.vindicatorMK7Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK7_STAR';
  } else if (isVM06) {
    upgradesToDisplay = vindicatorMK6Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK6_STAR';
  } else if (isVM05) {
    upgradesToDisplay = vindicatorMK5Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK5_STAR';
  } else if (isVM04) {
    upgradesToDisplay = vindicatorMK4Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK4_STAR';
  } else if (isVM03) {
    upgradesToDisplay = vindicatorMK3Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK3_STAR';
  } else if (isVM02) {
    upgradesToDisplay = vindicatorMK2Upgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_MK2_STAR';
  } else if (!isVM01) { 
    upgradesToDisplay = vindicatorUpgrades;
    upgradeActionType = 'UPGRADE_VINDICATOR_STAR';
  }

  let levelData = vindicatorLevelData;
  let levelUpActionType: 'LEVEL_UP_VINDICATOR' | 'LEVEL_UP_VINDICATOR_MK2' | 'LEVEL_UP_VINDICATOR_MK3' | 'LEVEL_UP_VINDICATOR_MK4' | 'LEVEL_UP_VINDICATOR_MK5' | 'LEVEL_UP_VINDICATOR_MK6' | 'LEVEL_UP_VINDICATOR_MK7' | 'LEVEL_UP_VINDICATOR_MK8' | 'LEVEL_UP_VINDICATOR_MK9' = 'LEVEL_UP_VINDICATOR';
  let blueprintResource = blueprints;
  let blueprintLabel = 'Planos';

  if (isVM02) {
    levelData = vindicatorMK2LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK2';
    blueprintResource = bodegaResources.planosDeInterceptor;
    blueprintLabel = 'Planos de Interceptor';
  } else if (isVM03) {
    levelData = vindicatorMK3LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK3';
    blueprintResource = bodegaResources.planosMK3;
    blueprintLabel = 'Planos MK3';
  } else if (isVM04) {
    levelData = vindicatorMK4LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK4';
    blueprintResource = bodegaResources.planosMK4;
    blueprintLabel = 'Planos MK4';
  } else if (isVM05) {
    levelData = vindicatorMK5LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK5';
    blueprintResource = bodegaResources.planosMK5;
    blueprintLabel = 'Planos MK5';
  } else if (isVM06) {
    levelData = vindicatorMK6LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK6';
    blueprintResource = bodegaResources.planosMK6;
    blueprintLabel = 'Planos MK6';
  } else if (isVM07) {
    levelData = vindicatorMK7LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK7';
    blueprintResource = bodegaResources.planosMK7;
    blueprintLabel = 'Planos MK7';
  } else if (isVM08) {
    levelData = vindicatorMK8LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK8';
    blueprintResource = bodegaResources.planosMK8;
    blueprintLabel = 'Planos MK8';
  } else if (isVM09) {
    levelData = vindicatorMK9LevelData;
    levelUpActionType = 'LEVEL_UP_VINDICATOR_MK9';
    blueprintResource = bodegaResources.planosMK9;
    blueprintLabel = 'Planos MK9';
  }

  const showModules = isVM01 || isVM02 || isVM03 || isVM04 || isVM05 || isVM06 || isVM07 || isVM08 || isVM09;
  const moduleList = isVM01 ? allArmoryMK1Modules : allArmoryMK2Modules;
  const armoryTitle = `Armería del ${vindicatorNameMap[vindicator.vindicatorType] || 'Vindicator'}`;

  const handleCraftModule = (moduleId: string) => {
    dispatch({ type: 'CRAFT_VINDICATOR_MODULE', payload: { moduleId } });
  };
    
  const repairCostMultiplier = (gameConfig.repair.repairCostMultipliers as any)[vindicator.vindicatorType] || 1;

  const calculateHealthRepairCost = () => {
    const missingHealth = vindicator.maxHealth - vindicator.currentHealth;
    return Math.floor(missingHealth * gameConfig.repair.healthCostPerPoint * repairCostMultiplier);
  };

  const calculateShieldRepairCost = () => {
    const missingShield = vindicator.maxShield - vindicator.currentShield;
    return Math.floor(missingShield * gameConfig.repair.shieldCostPerPoint * repairCostMultiplier * 10) / 10;
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

  const healthCostPerPoint = (gameConfig.repair.healthCostPerPoint * repairCostMultiplier);
  const shieldCostPerPoint = (gameConfig.repair.shieldCostPerPoint * repairCostMultiplier);

  const armoryHeaderTitle = `ARMERÍA - ${vindicatorNameMap[vindicator.vindicatorType] || 'VINDICATOR'}`;

  return (
    <div className={`armory-view ${gameState.settings.uiAnimationsEnabled ? 'view-fade-in' : ''} ${isVisible ? 'visible' : ''}`}>
      <div className="armory-view-header">
        <h2>{armoryHeaderTitle}</h2>
        <button onClick={onClose} className="view-close-button red">×</button>
      </div>

      <div className="armory-content">
        <div className="armory-top-section">
          <div className="vindicator-status">
            <h3>Estado Actual</h3>
            <div className="status-bars">
              <div className="status-bar">
                <span>Vida: {formatNumber(vindicator.currentHealth, gameState.settings.numberFormat)} / {formatNumber(vindicator.maxHealth, gameState.settings.numberFormat)}</span>
                <div className="bar-container"><div className="health-fill" style={{ width: `${(vindicator.currentHealth / vindicator.maxHealth) * 100}%` }}></div></div>
              </div>
              <div className="status-bar">
                <span>Escudo: {formatNumber(vindicator.currentShield, gameState.settings.numberFormat)} / {formatNumber(vindicator.maxShield, gameState.settings.numberFormat)}</span>
                <div className="bar-container"><div className="shield-fill" style={{ width: `${(vindicator.currentShield / vindicator.maxShield) * 100}%` }}></div></div>
              </div>
            </div>
          </div>
          <div className="repair-section">
            <h3>SISTEMA DE REPARACIÓN</h3>
            <div className="repair-option">
              <div className="repair-info">
                <h4 title={`Coste: ${healthCostPerPoint.toFixed(0)} Chatarra por punto`}>Reparar Vida</h4>
                <p>Repara {formatNumber(missingHealth, gameState.settings.numberFormat)} puntos de vida faltantes</p>
                <div className="repair-cost">
                  <img src='/src/assets/images/ui/scrap-icon.png' alt="Chatarra" className="cost-icon-img" />
                  <span className="cost-amount">{formatNumber(healthRepairCost, gameState.settings.numberFormat)}</span>
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
                <p>Repara {formatNumber(missingShield, gameState.settings.numberFormat)} puntos de escudo faltantes</p>
                <div className="repair-cost">
                  <img src='/src/assets/images/ui/fuel-rod-icon.png' alt="Combustible" className="cost-icon-img" />
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

        {vindicator.vindicatorType === 'base' && (
          <>
            <div className="upgrades-section">
              <h3>MEJORAS DE COMPONENTES</h3>
              {Object.entries(upgradesToDisplay).map(([upgradeId, upgrade]: [string, any]) => {
                  if (!upgrade) return null;
                  const allCosts = { ...upgrade.costPerStar.phase1Resources, ...upgrade.costPerStar.phase2Resources };
                  const isMaxLevel = upgrade.currentStars >= upgrade.maxStars;
                  const canUpgrade = Object.entries(allCosts).every(([res, cost]) => (allResources[res as keyof typeof allResources] || 0) >= (cost as number)) && !isMaxLevel;
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
                                          {upgrade.statIncreasePerStar.health && <li className="stat-bonus">+{upgrade.statIncreasePerStar.health} Vida Máxima</li>}
                                          {upgrade.statIncreasePerStar.shield && <li className="stat-bonus">+{upgrade.statIncreasePerStar.shield} Escudo Máximo</li>}
                                          {upgrade.statIncreasePerStar.damage && <li className="stat-bonus">+{upgrade.statIncreasePerStar.damage} Daño</li>}
                                      </ul>
                                  </div>
                                  <div className="upgrade-cost">
                                      <h5>COSTE PRÓXIMA MEJORA:</h5>
                                      <ul className="cost-list">
                                        {Object.entries(allCosts).map(([res, cost]) => {
                                          const meta = resourceMetadata[res];
                                          if (!meta) return null;
                                          return (
                                            <li key={res} className={(allResources[res as keyof typeof allResources] || 0) >= (cost as number) ? 'has-enough' : 'not-enough'}>
                                              <img src={meta.icon} alt={meta.name} className="cost-icon-img" />
                                              <span>{meta.name}:</span>
                                              <span>{formatNumber(allResources[res as keyof typeof allResources] || 0, gameState.settings.numberFormat)} / {formatNumber(cost as number, gameState.settings.numberFormat)}</span>
                                            </li>
                                          );
                                        })}
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
                <h3>NIVEL DEL VINDICATOR ({vindicatorNameMap[vindicator.vindicatorType].split('—')[1] || 'Base'})</h3>
                <div className="level-up-card">
                    <div className="level-display">NIVEL ACTUAL: <span>{vindicatorLevel}</span></div>
                    {(() => {
                        const nextLevel = levelData.find(level => level.level === vindicatorLevel + 1);
                        if (!nextLevel) {
                            return <p className="max-level">MÁXIMO NIVEL ALCANZADO</p>;
                        }
                        const hasEnoughBlueprints = blueprintResource >= nextLevel.blueprintCost;
                        const hasEnoughResearchPoints = techCenter.researchPoints >= (nextLevel.researchPointsCost || 0);
                        const canLevelUp = hasEnoughBlueprints && hasEnoughResearchPoints;
                        const handleLevelUp = () => {
                            if (canLevelUp) {
                                dispatch({ type: levelUpActionType });
                            }
                        };
                        return (
                            <>
                                <div className="level-up-bonus">
                                    <h5>BONIFICACIÓN AL SUBIR DE NIVEL:</h5>
                                    <ul>
                                        <li className="stat-bonus">+{nextLevel.statBonus.health} Vida Máxima</li>
                                        <li className="stat-bonus">+{nextLevel.statBonus.shield} Escudo Máximo</li>
                                        <li className="stat-bonus">+{nextLevel.statBonus.damage} Daño</li>
                                    </ul>
                                </div>
                                <div className="upgrade-cost">
                                    <h5>COSTE PARA NIVEL {nextLevel.level}:</h5>
                                    <ul className="cost-list">
                                        <li className={hasEnoughBlueprints ? 'has-enough' : 'not-enough'}>
                                            <img src='/src/assets/images/ui/resources/plano.png' alt={blueprintLabel} className="cost-icon-img" />
                                            <span>{blueprintLabel}:</span>
                                            <span>{formatNumber(blueprintResource, gameState.settings.numberFormat)} / {formatNumber(nextLevel.blueprintCost, gameState.settings.numberFormat)}</span>
                                        </li>
                                        {nextLevel.researchPointsCost && (
                                          <li className={hasEnoughResearchPoints ? 'has-enough' : 'not-enough'}>
                                            
                                            <span>Puntos de Investigación:</span>
                                            <span>{formatNumber(techCenter.researchPoints, gameState.settings.numberFormat)} / {formatNumber(nextLevel.researchPointsCost, gameState.settings.numberFormat)}</span>
                                          </li>
                                        )}
                                    </ul>
                                </div>
                                <button className={`level-up-button ${canLevelUp ? '' : 'disabled'}`} onClick={handleLevelUp} disabled={!canLevelUp}>
                                    {canLevelUp ? 'SUBIR DE NIVEL' : (!hasEnoughBlueprints ? 'PLANOS INSUFICIENTES' : 'P. INVESTIGACIÓN INSUFICIENTES')}
                                </button>
                            </>
                        );
                    })()}
                </div>
            </div>
          </>
        )}

        {showModules && (
          <>
            <div className="module-slots-section">
              <h3>MÓdulos EQUIPADOS</h3>
              <div className="module-slot-display"><strong>Ofensivo:</strong><span>{vindicator.modules.offensive || 'Ninguno'}</span></div>
              <div className="module-slot-display"><strong>Defensivo:</strong><span>{vindicator.modules.defensive || 'Ninguno'}</span></div>
              <div className="module-slot-display"><strong>Táctico:</strong><span>{vindicator.modules.tactical || 'Ninguno'}</span></div>
            </div>
            <div className="module-fabrication-section">
              <h3>{armoryTitle}</h3>
              <div className="module-list">
                {moduleList.map(module => {
                  const costs = module.costs;
                  const canAfford = Object.entries(costs).every(([resource, cost]) => {
                    const resourceKey = resource as keyof typeof allResources;
                    return (allResources[resourceKey] || 0) >= (cost as number);
                  });
                  const isEquipped = Object.values(vindicator.modules).includes(module.id);
                  return (
                    <div key={module.id} className="module-card">
                      <div className="upgrade-card-header"><h4>{module.name} ({module.slot})</h4></div>
                      <p>{module.description}</p>
                      <div className="upgrade-cost">
                        <h5>Coste:</h5>
                        <ul className="cost-list">
                          {Object.entries(costs).map(([resource, cost]) => {
                            const meta = resourceMetadata[resource as keyof typeof resourceMetadata];
                            if (!meta) return null;
                            const hasEnough = (allResources[resource as keyof typeof allResources] || 0) >= (cost as number);
                            return (
                              <li key={resource} className={hasEnough ? 'has-enough' : 'not-enough'}>
                                <img src={meta.icon} alt={meta.name} className="cost-icon-img" />
                                <span>{meta.name}:</span>
                                <span>{formatNumber((allResources as any)[resource] || 0, gameState.settings.numberFormat)} / {formatNumber(cost as number, gameState.settings.numberFormat)}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <button className={`upgrade-button ${isEquipped ? 'disabled' : ''}`} onClick={() => handleCraftModule(module.id)} disabled={!canAfford || isEquipped}>
                        {isEquipped ? 'Equipado' : (canAfford ? 'Fabricar' : 'Recursos Insuficientes')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="vindicator-level-up-section">
                <h3>NIVEL DEL VINDICATOR ({vindicatorNameMap[vindicator.vindicatorType].split('—')[1] || ''})</h3>
                <div className="level-up-card">
                    <div className="level-display">NIVEL ACTUAL: <span>{vindicatorLevel}</span></div>
                    {(() => {
                        const nextLevel = levelData.find(level => level.level === vindicatorLevel + 1);
                        if (!nextLevel) {
                            return <p className="max-level">MÁXIMO NIVEL ALCANZADO</p>;
                        }
                        const hasEnoughBlueprints = blueprintResource >= nextLevel.blueprintCost;
                        const hasEnoughResearchPoints = techCenter.researchPoints >= (nextLevel.researchPointsCost || 0);
                        const canLevelUp = hasEnoughBlueprints && hasEnoughResearchPoints;
                        const handleLevelUp = () => {
                            if (canLevelUp) {
                                dispatch({ type: levelUpActionType });
                            }
                        };
                        return (
                            <>
                                <div className="level-up-bonus">
                                    <h5>BONIFICACIÓN AL SUBIR DE NIVEL:</h5>
                                    <ul>
                                        <li className="stat-bonus">+{nextLevel.statBonus.health} Vida Máxima</li>
                                        <li className="stat-bonus">+{nextLevel.statBonus.shield} Escudo Máximo</li>
                                        <li className="stat-bonus">+{nextLevel.statBonus.damage} Daño</li>
                                    </ul>
                                </div>
                                <div className="upgrade-cost">
                                    <h5>COSTE PARA NIVEL {nextLevel.level}:</h5>
                                    <ul className="cost-list">
                                        <li className={hasEnoughBlueprints ? 'has-enough' : 'not-enough'}>
                                            <img src='/src/assets/images/ui/resources/plano.png' alt={blueprintLabel} className="cost-icon-img" />
                                            <span>{blueprintLabel}:</span>
                                            <span>{formatNumber(blueprintResource, gameState.settings.numberFormat)} / {formatNumber(nextLevel.blueprintCost, gameState.settings.numberFormat)}</span>
                                        </li>
                                        {nextLevel.researchPointsCost && (
                                          <li className={hasEnoughResearchPoints ? 'has-enough' : 'not-enough'}>
                                            <span>Puntos de Investigación:</span>
                                            <span>{formatNumber(techCenter.researchPoints, gameState.settings.numberFormat)} / {formatNumber(nextLevel.researchPointsCost, gameState.settings.numberFormat)}</span>
                                          </li>
                                        )}
                                    </ul>
                                </div>
                                <button className={`level-up-button ${canLevelUp ? '' : 'disabled'}`} onClick={handleLevelUp} disabled={!canLevelUp}>
                                    {canLevelUp ? 'SUBIR DE NIVEL' : (!hasEnoughBlueprints ? 'PLANOS INSUFICIENTES' : 'P. INVESTIGACIÓN INSUFICIENTES')}
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