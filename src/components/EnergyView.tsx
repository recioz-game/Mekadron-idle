import React from 'react';
import './EnergyView.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';
import QueueControls from './QueueControls';

interface EnergyViewProps {
  scrap: number;
  currentEnergy: number;
  maxEnergy: number;
  energyConsumption: number;
  solarPanels: number;
  mediumSolarPanels: number;
  advancedSolar: number;
    energyCores: number;
  fusionReactors: number; // Nuevo
  solarPanelsQueue: { progress: number; queue: number; time: number };
  mediumSolarPanelsQueue: { progress: number; queue: number; time: number };
  advancedSolarQueue: { progress: number; queue: number; time: number };
  energyCoresQueue: { progress: number; queue: number; time: number };
  fusionReactorQueue: { progress: number; queue: number; time: number }; // Nuevo
  onBuildSolarPanel: () => void;
  onBuildMediumSolar: () => void;
  onBuildAdvancedSolar: () => void;
  onBuildEnergyCore: () => void;
  onBuildFusionReactor: () => void; // Nuevo
  buyAmount: number | 'max';
    onSetBuyAmount: (amount: number | 'max') => void;
  onClose: () => void;
  onCancel: (itemName: string, amount: number | 'all') => void;
  upgrades: GameState['techCenter']['upgrades']; // Nuevo
  energyCoresCount: number; // Nuevo
  metalRefinado: number; // Nuevo
}



const EnergyView: React.FC<EnergyViewProps> = React.memo(({ 
  scrap, currentEnergy, maxEnergy, energyConsumption,
  solarPanels, mediumSolarPanels, advancedSolar, energyCores, fusionReactors,
  solarPanelsQueue, mediumSolarPanelsQueue, advancedSolarQueue, energyCoresQueue, fusionReactorQueue,
  onBuildSolarPanel, onBuildMediumSolar, onBuildAdvancedSolar, onBuildEnergyCore, onBuildFusionReactor,
  buyAmount, onSetBuyAmount, onClose, onCancel,
  upgrades, energyCoresCount, metalRefinado
}) => {

  const getTooltipText = (requirements: { resource?: string, amount: number, current: number, text: string }[]): string => {
    const missing = requirements.filter(req => req.current < req.amount);
    if (missing.length === 0) return '';
    return 'Requiere: ' + missing.map(req => `${req.text} (${formatNumber(req.amount)})`).join(', ');
  };

  const solarPanelCost = 50;
  const mediumSolarCost = 200;
    const advancedSolarCost = 500;
  const energyCoreCost = 2000;
  const fusionReactorCost = { scrap: 10000, metalRefinado: 25 };

  const getMaxAffordable = (cost: number) => {
    return Math.floor(scrap / cost);
  }

  const solarPanelMax = getMaxAffordable(solarPanelCost);
    const mediumSolarMax = getMaxAffordable(mediumSolarCost);
  const advancedSolarMax = getMaxAffordable(advancedSolarCost);
  const energyCoreMax = getMaxAffordable(energyCoreCost);
  const fusionReactorMax = Math.min(
    Math.floor(scrap / fusionReactorCost.scrap),
    Math.floor(metalRefinado / fusionReactorCost.metalRefinado)
  );

  const totalEnergyProduction = 
    solarPanels * 3 + 
    mediumSolarPanels * 10 +
    advancedSolar * 30 + 
    energyCores * 50 +
    fusionReactors * 250;

  return (
    <div className="energy-view-container">
      <div className="energy-view-header">
        <h2>⚡ MÓDULO DE ENERGÍA</h2>
        <button 
          onClick={onClose}
          className="close-button"
        >
          Cerrar
        </button>
      </div>

      {/* Resumen Energético */}
      <div className="energy-summary">
        <h3 style={{ color: '#06B6D4' }}>📊 RESUMEN ENERGÉTICO</h3>
        <div className="energy-summary-content">
          <span>🔋 {formatNumber(currentEnergy)} / {formatNumber(maxEnergy)}</span>
          <span>⚡ +{formatNumber(totalEnergyProduction)}/s</span>
          <span>🔌 {formatNumber(energyConsumption)}/s</span>
          <span style={{ color: totalEnergyProduction >= energyConsumption ? '#22C55E' : '#EF4444' }}>
            📈 {(totalEnergyProduction - energyConsumption).toFixed(1)}/s
          </span>
        </div>
      </div>

      <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />

      {/* Panel Solar Básico */}
      <div className={`energy-item ${scrap >= solarPanelCost ? 'unlocked' : ''}`}>
        <h3 style={{ color: '#F59E0B' }}>☀️ Panel Solar Básico</h3>
        <p>⚡ Producción: +{formatNumber(3)} energía/segundo</p>
        <p>💰 Coste: {formatNumber(solarPanelCost)} chatarra</p>
        <p>🏗️ Instalados: {solarPanels} | 📦 En cola: {solarPanelsQueue.queue}</p>
        <QueueControls queue={solarPanelsQueue} itemName='solarPanels' onCancel={onCancel} />
        <BotonConTooltip
          onClick={onBuildSolarPanel}
          disabled={scrap < solarPanelCost}
          tooltipText={getTooltipText([{ amount: solarPanelCost, current: scrap, text: 'Chatarra' }])}
          className={`build-button ${scrap >= solarPanelCost ? 'unlocked' : ''}`}
        >
          Encargar Panel Solar {buyAmount === 'max' && `(${solarPanelMax})`}
        </BotonConTooltip>
      </div>

      {/* Panel Solar Medio */}
      <div className={`energy-item ${scrap >= mediumSolarCost && solarPanels >= 5 ? 'unlocked' : ''} ${solarPanels >= 5 ? '' : 'locked'}`}>
        <h3 style={{ color: '#F59E0B' }}>☀️ Panel Solar Medio</h3>
        <p>⚡ Producción: +{formatNumber(10)} energía/segundo</p>
        <p>💰 Coste: {formatNumber(mediumSolarCost)} chatarra</p>
        <p>🏗️ Instalados: {mediumSolarPanels} | 📦 En cola: {mediumSolarPanelsQueue.queue}</p>
        <QueueControls queue={mediumSolarPanelsQueue} itemName='mediumSolarPanels' onCancel={onCancel} />
        <p>📋 Requisitos: 5 Paneles Solares Básicos</p>
        <BotonConTooltip
          onClick={onBuildMediumSolar}
          disabled={scrap < mediumSolarCost || solarPanels < 5}
          tooltipText={getTooltipText([
            { amount: mediumSolarCost, current: scrap, text: 'Chatarra' },
            { amount: 5, current: solarPanels, text: 'Paneles Solares Básicos' }
          ])}
          className={`build-button ${scrap >= mediumSolarCost && solarPanels >= 5 ? 'unlocked' : ''}`}
        >
          Encargar Panel Medio {buyAmount === 'max' && `(${mediumSolarMax})`}
        </BotonConTooltip>
        {solarPanels < 5 && (
          <p className="requirement-warning">
            ⚠️ Necesitas 5 Paneles Solares Básicos
          </p>
        )}
      </div>

      {/* Panel Solar Avanzado */}
      <div className={`energy-item ${scrap >= advancedSolarCost && mediumSolarPanels >= 1 ? 'unlocked' : ''} ${mediumSolarPanels >= 1 ? '' : 'locked'}`}>
        <h3 style={{ color: '#06B6D4' }}>🔆 Panel Solar Avanzado</h3>
        <p>⚡ Producción: +{formatNumber(30)} energía/segundo</p>
        <p>💰 Coste: {formatNumber(advancedSolarCost)} chatarra</p>
        <p>🏗️ Instalados: {advancedSolar} | 📦 En cola: {advancedSolarQueue.queue}</p>
        <QueueControls queue={advancedSolarQueue} itemName='advancedSolar' onCancel={onCancel} />
        <p>📋 Requisitos: 1 Panel Solar Medio</p>
        <BotonConTooltip
          onClick={onBuildAdvancedSolar}
          disabled={scrap < advancedSolarCost || mediumSolarPanels < 1}
          tooltipText={getTooltipText([
            { amount: advancedSolarCost, current: scrap, text: 'Chatarra' },
            { amount: 1, current: mediumSolarPanels, text: 'Paneles Solares Medios' }
          ])}
          className={`build-button ${scrap >= advancedSolarCost && mediumSolarPanels >= 1 ? 'unlocked' : ''}`}
        >
          Encargar Panel Avanzado {buyAmount === 'max' && `(${advancedSolarMax})`}
        </BotonConTooltip>
        {mediumSolarPanels < 1 && (
          <p className="requirement-warning">
            ⚠️ Necesitas 1 Panel Solar Medio
          </p>
        )}
      </div>

      {/* Núcleo Energético */}
      <div className={`energy-item ${scrap >= energyCoreCost && advancedSolar >= 3 ? 'unlocked' : ''} ${advancedSolar >= 3 ? '' : 'locked'}`}>
        <h3 style={{ color: '#22C55E' }}>🔷 Núcleo Energético</h3>
        <p>⚡ Producción: +{formatNumber(50)} energía/segundo</p>
        <p>🔋 Capacidad: +{formatNumber(100)} energía máxima</p>
        <p>💰 Coste: {formatNumber(energyCoreCost)} chatarra</p>
        <p>🏗️ Instalados: {energyCores} | 📦 En cola: {energyCoresQueue.queue}</p>
        <QueueControls queue={energyCoresQueue} itemName='energyCores' onCancel={onCancel} />
        <p>📋 Requisitos: 3 Paneles Solares Avanzados</p>
        <BotonConTooltip
          onClick={onBuildEnergyCore}
          disabled={scrap < energyCoreCost || advancedSolar < 3}
          tooltipText={getTooltipText([
            { amount: energyCoreCost, current: scrap, text: 'Chatarra' },
            { amount: 3, current: advancedSolar, text: 'Paneles Solares Avanzados' }
          ])}
          className={`build-button ${scrap >= energyCoreCost && advancedSolar >= 3 ? 'unlocked' : ''}`}
        >
          Encargar Núcleo Energético {buyAmount === 'max' && `(${energyCoreMax})`}
        </BotonConTooltip>
        {advancedSolar < 3 && (
          <p className="requirement-warning">
            ⚠️ Necesitas 3 Paneles Solares Avanzados
          </p>
        )}
      </div>

      {/* Reactor de Fusión (Condicional) */}
      {(upgrades as any).fusionTech > 0 && (
        <div className={`energy-item ${scrap >= fusionReactorCost.scrap && metalRefinado >= fusionReactorCost.metalRefinado && energyCoresCount >= 10 ? 'unlocked' : ''} ${energyCoresCount >= 10 ? '' : 'locked'}`}>
          <h3 style={{ color: '#8B5CF6' }}>⚛️ Reactor de Fusión</h3>
          <p>⚡ Producción: +{formatNumber(250)} energía/segundo</p>
          <p>🔋 Capacidad: +{formatNumber(1000)} energía máxima</p>
          <p>💰 Coste: {formatNumber(fusionReactorCost.scrap)} Chatarra + {formatNumber(fusionReactorCost.metalRefinado)} Metal Refinado</p>
          <p>🏗️ Construidos: {fusionReactors} | 📦 En cola: {fusionReactorQueue.queue}</p>
          <QueueControls queue={fusionReactorQueue} itemName='fusionReactor' onCancel={onCancel} />
          <p>📋 Requisitos: 10 Núcleos Energéticos</p>
          <BotonConTooltip
            onClick={onBuildFusionReactor}
            disabled={scrap < fusionReactorCost.scrap || metalRefinado < fusionReactorCost.metalRefinado || energyCoresCount < 10}
            tooltipText={getTooltipText([
              { amount: fusionReactorCost.scrap, current: scrap, text: 'Chatarra' },
              { amount: fusionReactorCost.metalRefinado, current: metalRefinado, text: 'Metal Refinado' },
              { amount: 10, current: energyCoresCount, text: 'Núcleos Energéticos' }
            ])}
                        className={`build-button ${scrap >= fusionReactorCost.scrap && metalRefinado >= fusionReactorCost.metalRefinado && energyCoresCount >= 10 ? 'unlocked' : ''}`
        
        
        }
           
          >
            Encargar Reactor de Fusión {buyAmount === 'max' && `(${fusionReactorMax})`}
          </BotonConTooltip>
          {energyCoresCount < 10 && (
            <p className="requirement-warning">
              ⚠️ Necesitas 10 Núcleos Energéticos
            </p>
          )}
        </div>
      )}
    </div>
  );
});

export default EnergyView;