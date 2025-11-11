import React from 'react';
import './EnergyView.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';
import QueueControls from './QueueControls';

// Importar imágenes de producción
import solarPanelBasicImg from '../assets/images/ui/energy-solar-panel-basic.png';
import solarPanelMediumImg from '../assets/images/ui/energy-solar-panel-medium.png';
import solarPanelAdvancedImg from '../assets/images/ui/energy-solar-panel-advanced.png';
import energyCoreDamagedImg from '../assets/images/ui/energy-core-damaged.png';
import energyCoreStabilizedImg from '../assets/images/ui/energy-core-stabilized.png';
import energyCoreEmpoweredImg from '../assets/images/ui/energy-core-empowered.png';
import fusionReactorImg from '../assets/images/ui/fusion-reactor.png';

interface EnergyViewProps {
  scrap: number;
  currentEnergy: number;
  maxEnergy: number;
  energyConsumption: number;
  solarPanels: number;
  mediumSolarPanels: number;
  advancedSolar: number;
  energyCores: number;
  stabilizedEnergyCores: number;
  empoweredEnergyCores: number;
  fusionReactors: number;
  solarPanelsQueue: { progress: number; queue: number; time: number };
  mediumSolarPanelsQueue: { progress: number; queue: number; time: number };
  advancedSolarQueue: { progress: number; queue: number; time: number };
  energyCoresQueue: { progress: number; queue: number; time: number };
  stabilizedEnergyCoresQueue: { progress: number; queue: number; time: number };
  empoweredEnergyCoresQueue: { progress: number; queue: number; time: number };
  fusionReactorQueue: { progress: number; queue: number; time: number };
  onBuildSolarPanel: () => void;
  onBuildMediumSolar: () => void;
  onBuildAdvancedSolar: () => void;
  onBuildEnergyCore: () => void;
  onBuildStabilizedEnergyCore: () => void;
  onBuildEmpoweredEnergyCore: () => void;
  onBuildFusionReactor: () => void;
  buyAmount: number | 'max';
  onSetBuyAmount: (amount: number | 'max') => void;
  onClose: () => void;
  onCancel: (itemName: string, amount: number | 'all') => void;
  upgrades: GameState['techCenter']['upgrades'];
  metalRefinado: number;
}

const EnergyView: React.FC<EnergyViewProps> = React.memo(({ 
  scrap, currentEnergy, maxEnergy, energyConsumption,
  solarPanels, mediumSolarPanels, advancedSolar, energyCores, stabilizedEnergyCores, empoweredEnergyCores, fusionReactors,
  solarPanelsQueue, mediumSolarPanelsQueue, advancedSolarQueue, energyCoresQueue, stabilizedEnergyCoresQueue, empoweredEnergyCoresQueue, fusionReactorQueue,
  onBuildSolarPanel, onBuildMediumSolar, onBuildAdvancedSolar, onBuildEnergyCore, onBuildStabilizedEnergyCore, onBuildEmpoweredEnergyCore, onBuildFusionReactor,
  buyAmount, onSetBuyAmount, onClose, onCancel,
  upgrades, metalRefinado
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
  const stabilizedEnergyCoreCost = 10000;
  const empoweredEnergyCoreCost = 20000;
  const fusionReactorCost = { scrap: 10000, metalRefinado: 25 };

  const getMaxAffordable = (cost: number) => {
    return Math.floor(scrap / cost);
  }

  const solarPanelMax = getMaxAffordable(solarPanelCost);
  const mediumSolarMax = getMaxAffordable(mediumSolarCost);
  const advancedSolarMax = getMaxAffordable(advancedSolarCost);
  const energyCoreMax = getMaxAffordable(energyCoreCost);
  const stabilizedEnergyCoreMax = getMaxAffordable(stabilizedEnergyCoreCost);
  const empoweredEnergyCoreMax = getMaxAffordable(empoweredEnergyCoreCost);
  const fusionReactorMax = Math.min(
    Math.floor(scrap / fusionReactorCost.scrap),
    Math.floor(metalRefinado / fusionReactorCost.metalRefinado)
  );

  const totalEnergyProduction = 
    solarPanels * 3 + 
    mediumSolarPanels * 10 +
    advancedSolar * 30 + 
    energyCores * 50 +
    stabilizedEnergyCores * 75 +
    empoweredEnergyCores * 150 +
    fusionReactors * 250;

  return (
    <div className="energy-view-container">
      <div className="energy-view-header">
        <h2>MÓDULO DE ENERGÍA</h2>
        <button 
          onClick={onClose}
          className="close-button"
        >
          Cerrar
        </button>
      </div>

      {/* Resumen Energético */}
      <div className="energy-summary">
        <h3 style={{ color: '#06B6D4' }}>RESUMEN ENERGÉTICO</h3>
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
        <div className="energy-item-content">
          <h3 style={{ color: '#F59E0B' }}>Panel Solar Básico</h3>
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
        <img src={solarPanelBasicImg} alt="Panel Solar Básico" className="energy-item-image" />
      </div>

      {/* Panel Solar Medio */}
      <div className={`energy-item ${scrap >= mediumSolarCost && solarPanels >= 5 ? 'unlocked' : ''} ${solarPanels >= 5 ? '' : 'locked'}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#F59E0B' }}>Panel Solar Medio</h3>
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
        <img src={solarPanelMediumImg} alt="Panel Solar Medio" className="energy-item-image" />
      </div>

      {/* Panel Solar Avanzado */}
      <div className={`energy-item ${scrap >= advancedSolarCost && mediumSolarPanels >= 1 ? 'unlocked' : ''} ${mediumSolarPanels >= 1 ? '' : 'locked'}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#06B6D4' }}>Panel Solar Avanzado</h3>
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
        <img src={solarPanelAdvancedImg} alt="Panel Solar Avanzado" className="energy-item-image" />
      </div>

      {/* Núcleo Energético Averiado */}
      <div className={`energy-item ${scrap >= energyCoreCost && advancedSolar >= 3 ? 'unlocked' : ''} ${advancedSolar >= 3 ? '' : 'locked'}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#F87171' }}>Núcleo Energético Averiado</h3>
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
            Encargar Núcleo Averiado {buyAmount === 'max' && `(${energyCoreMax})`}
          </BotonConTooltip>
          {advancedSolar < 3 && <p className="requirement-warning">⚠️ Necesitas 3 Paneles Solares Avanzados</p>}
        </div>
        <img src={energyCoreDamagedImg} alt="Núcleo Energético Averiado" className="energy-item-image" />
      </div>

      {/* Núcleo Energético Estabilizado */}
      <div className={`energy-item ${scrap >= stabilizedEnergyCoreCost && energyCores >= 3 ? 'unlocked' : ''} ${energyCores >= 3 ? '' : 'locked'}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#4ADE80' }}>Núcleo Energético Estabilizado</h3>
          <p>⚡ Producción: +{formatNumber(75)} energía/segundo</p>
          <p>🔋 Capacidad: +{formatNumber(150)} energía máxima</p>
          <p>💰 Coste: {formatNumber(stabilizedEnergyCoreCost)} chatarra</p>
          <p>🏗️ Instalados: {stabilizedEnergyCores} | 📦 En cola: {stabilizedEnergyCoresQueue.queue}</p>
          <QueueControls queue={stabilizedEnergyCoresQueue} itemName='stabilizedEnergyCores' onCancel={onCancel} />
          <p>📋 Requisitos: 3 Núcleos Averiados</p>
          <BotonConTooltip
            onClick={onBuildStabilizedEnergyCore}
            disabled={scrap < stabilizedEnergyCoreCost || energyCores < 3}
            tooltipText={getTooltipText([
              { amount: stabilizedEnergyCoreCost, current: scrap, text: 'Chatarra' },
              { amount: 3, current: energyCores, text: 'Núcleos Averiados' }
            ])}
            className={`build-button ${scrap >= stabilizedEnergyCoreCost && energyCores >= 3 ? 'unlocked' : ''}`}
          >
            Encargar Núcleo Estabilizado {buyAmount === 'max' && `(${stabilizedEnergyCoreMax})`}
          </BotonConTooltip>
          {energyCores < 3 && <p className="requirement-warning">⚠️ Necesitas 3 Núcleos Averiados</p>}
        </div>
        <img src={energyCoreStabilizedImg} alt="Núcleo Energético Estabilizado" className="energy-item-image" />
      </div>

      {/* Núcleo Energético Potenciado */}
      <div className={`energy-item ${scrap >= empoweredEnergyCoreCost && stabilizedEnergyCores >= 3 ? 'unlocked' : ''} ${stabilizedEnergyCores >= 3 ? '' : 'locked'}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#22C55E' }}>Núcleo Energético Potenciado</h3>
          <p>⚡ Producción: +{formatNumber(150)} energía/segundo</p>
          <p>🔋 Capacidad: +{formatNumber(300)} energía máxima</p>
          <p>💰 Coste: {formatNumber(empoweredEnergyCoreCost)} chatarra</p>
          <p>🏗️ Instalados: {empoweredEnergyCores} | 📦 En cola: {empoweredEnergyCoresQueue.queue}</p>
          <QueueControls queue={empoweredEnergyCoresQueue} itemName='empoweredEnergyCores' onCancel={onCancel} />
          <p>📋 Requisitos: 3 Núcleos Estabilizados</p>
          <BotonConTooltip
            onClick={onBuildEmpoweredEnergyCore}
            disabled={scrap < empoweredEnergyCoreCost || stabilizedEnergyCores < 3}
            tooltipText={getTooltipText([
              { amount: empoweredEnergyCoreCost, current: scrap, text: 'Chatarra' },
              { amount: 3, current: stabilizedEnergyCores, text: 'Núcleos Estabilizados' }
            ])}
            className={`build-button ${scrap >= empoweredEnergyCoreCost && stabilizedEnergyCores >= 3 ? 'unlocked' : ''}`}
          >
            Encargar Núcleo Potenciado {buyAmount === 'max' && `(${empoweredEnergyCoreMax})`}
          </BotonConTooltip>
          {stabilizedEnergyCores < 3 && <p className="requirement-warning">⚠️ Necesitas 3 Núcleos Estabilizados</p>}
        </div>
        <img src={energyCoreEmpoweredImg} alt="Núcleo Energético Potenciado" className="energy-item-image" />En 
      </div>

            {/* Reactor de Fusión (Condicional) */}
      {(upgrades as any).fusionTech > 0 && (
        <div className={`energy-item ${scrap >= fusionReactorCost.scrap && metalRefinado >= fusionReactorCost.metalRefinado && empoweredEnergyCores >= 1 ? 'unlocked' : ''} ${empoweredEnergyCores >= 1 ? '' : 'locked'}`}>
          <div className="energy-item-content">
            <h3 style={{ color: '#8B5CF6' }}>Reactor de Fusión</h3>
            <p>⚡ Producción: +{formatNumber(250)} energía/segundo</p>
            <p>🔋 Capacidad: +{formatNumber(1000)} energía máxima</p>
            <p>💰 Coste: {formatNumber(fusionReactorCost.scrap)} Chatarra + {formatNumber(fusionReactorCost.metalRefinado)} Metal Refinado</p>
            <p>🏗️ Construidos: {fusionReactors} | 📦 En cola: {fusionReactorQueue.queue}</p>
            <QueueControls queue={fusionReactorQueue} itemName='fusionReactor' onCancel={onCancel} />
            <p>📋 Requisitos: 1 Núcleo Potenciado (anteriormente 10 averiados)</p>
            <BotonConTooltip
              onClick={onBuildFusionReactor}
              disabled={scrap < fusionReactorCost.scrap || metalRefinado < fusionReactorCost.metalRefinado || empoweredEnergyCores < 1}
              tooltipText={getTooltipText([
                { amount: fusionReactorCost.scrap, current: scrap, text: 'Chatarra' },
                { amount: fusionReactorCost.metalRefinado, current: metalRefinado, text: 'Metal Refinado' },
                { amount: 1, current: empoweredEnergyCores, text: 'Núcleos Potenciados' }
              ])}
                          className={`build-button ${scrap >= fusionReactorCost.scrap && metalRefinado < fusionReactorCost.metalRefinado && empoweredEnergyCores >= 1 ? 'unlocked' : ''}`}
          >
              Encargar Reactor de Fusión {buyAmount === 'max' && `(${fusionReactorMax})`}
            </BotonConTooltip>
            {empoweredEnergyCores < 1 && (
              <p className="requirement-warning">
                ⚠️ Necesitas 1 Núcleo Potenciado
              </p>
            )}
          </div>
          <img src={fusionReactorImg} alt="Reactor de Fusión" className="energy-item-image" />
        </div>
      )}
    </div>
  );
});

export default EnergyView;