import React, { useState } from 'react';
import './EnergyView.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber, formatTime } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';
import QueueControls from './QueueControls';
import { useDragToScroll } from '../hooks/useDragToScroll';

const ProgressBar = ({ progress, time }: { progress: number; time: number }) => (
  <div className="progress-bar-container">
    <div 
      className="progress-bar"
      style={{ width: `${(progress / time) * 100}%` }} 
    />
  </div>
);

// Importar imágenes de producción
import solarPanelBasicImg from '../assets/images/ui/energy-solar-panel-basic.png';
import solarPanelMediumImg from '../assets/images/ui/energy-solar-panel-medium.png';
import solarPanelAdvancedImg from '../assets/images/ui/energy-solar-panel-advanced.png';
import energyCoreDamagedImg from '../assets/images/ui/energy-core-damaged.png';
import energyCoreStabilizedImg from '../assets/images/ui/energy-core-stabilized.png';
import energyCoreEmpoweredImg from '../assets/images/ui/energy-core-empowered.png';
import fusionReactorImg from '../assets/images/ui/fusion-reactor.png';

interface EnergyViewProps {
  resources: GameState['resources'];
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
  hasBuilt: GameState['energy']['hasBuilt'];
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
  numberFormat: 'full' | 'abbreviated' | 'scientific';
}

const EnergyView: React.FC<EnergyViewProps> = React.memo(({ 
  resources, currentEnergy, maxEnergy, energyConsumption,
  solarPanels, mediumSolarPanels, advancedSolar, energyCores, stabilizedEnergyCores, empoweredEnergyCores, fusionReactors,
  hasBuilt,
  solarPanelsQueue, mediumSolarPanelsQueue, advancedSolarQueue, energyCoresQueue, stabilizedEnergyCoresQueue, empoweredEnergyCoresQueue, fusionReactorQueue,
  onBuildSolarPanel, onBuildMediumSolar, onBuildAdvancedSolar, onBuildEnergyCore,   onBuildStabilizedEnergyCore, onBuildEmpoweredEnergyCore, onBuildFusionReactor,
  buyAmount, onSetBuyAmount, onClose, onCancel,
  upgrades, numberFormat
}) => {
  const { scrap, metalRefinado } = resources;
  const scrollRef = useDragToScroll<HTMLDivElement>();

    const getTooltipText = (requirements: { resource?: string, amount: number, current: number, text: string }[], format: 'full' | 'abbreviated' | 'scientific'): string => {
    const missing = requirements.filter(req => req.current < req.amount);
    if (missing.length === 0) return '';
    return 'Requiere: ' + missing.map(req => `${req.text} (${formatNumber(req.amount, format)})`).join(', ');
  };

    const solarPanelCost = 75;
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
  const solarPanelAmount = buyAmount === 'max' ? solarPanelMax : Math.min(buyAmount, solarPanelMax);
  
  const mediumSolarMax = getMaxAffordable(mediumSolarCost);
  const mediumSolarAmount = buyAmount === 'max' ? mediumSolarMax : Math.min(buyAmount, mediumSolarMax);

  const advancedSolarMax = getMaxAffordable(advancedSolarCost);
  const advancedSolarAmount = buyAmount === 'max' ? advancedSolarMax : Math.min(buyAmount, advancedSolarMax);

  const energyCoreMax = getMaxAffordable(energyCoreCost);
  const energyCoreAmount = buyAmount === 'max' ? energyCoreMax : Math.min(buyAmount, energyCoreMax);

  const stabilizedEnergyCoreMax = getMaxAffordable(stabilizedEnergyCoreCost);
  const stabilizedEnergyCoreAmount = buyAmount === 'max' ? stabilizedEnergyCoreMax : Math.min(buyAmount, stabilizedEnergyCoreMax);

  const empoweredEnergyCoreMax = getMaxAffordable(empoweredEnergyCoreCost);
  const empoweredEnergyCoreAmount = buyAmount === 'max' ? empoweredEnergyCoreMax : Math.min(buyAmount, empoweredEnergyCoreMax);

  const fusionReactorMax = Math.min(
    Math.floor(scrap / fusionReactorCost.scrap),
    Math.floor(metalRefinado / fusionReactorCost.metalRefinado)
  );
  const fusionReactorAmount = buyAmount === 'max' ? fusionReactorMax : Math.min(buyAmount, fusionReactorMax);

    const [isSummaryOpen, setIsSummaryOpen] = useState(true);

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
      <div className="energy-content-area" ref={scrollRef}>
        <button 
          onClick={onClose}
          className="close-button"
        >
          &times;
        </button>

                                    {/* Resumen Energético */}
      <div className="energy-summary">
        <div className="summary-header" onClick={() => setIsSummaryOpen(!isSummaryOpen)}>
          <h3 style={{ color: '#06B6D4' }}>RESUMEN ENERGÉTICO</h3>
          <span className={`collapse-arrow ${isSummaryOpen ? 'open' : ''}`}>▶</span>
        </div>
                {isSummaryOpen && (
          <div className="energy-summary-content">
            <div className="summary-item">
              <span className="summary-label">Almacenado:</span>
              <span className="summary-value">{formatNumber(currentEnergy, numberFormat)} / {formatNumber(maxEnergy, numberFormat)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Balance:</span>
              <span className="summary-value" style={{ color: totalEnergyProduction >= energyConsumption ? '#22C55E' : '#EF4444' }}>
                {(totalEnergyProduction - energyConsumption).toFixed(1)}/s
              </span>
            </div>
            <div className="summary-details">
              (Producción: +{formatNumber(totalEnergyProduction, numberFormat)}/s | Consumo: -{formatNumber(energyConsumption, numberFormat)}/s)
            </div>
          </div>
        )}
      </div>

            <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />

            {/* Panel Solar Básico */}
            <div className={`energy-item ${scrap >= solarPanelCost ? 'unlocked' : ''}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#F59E0B' }}>Panel Solar Básico</h3>
                    <p>Producción: +{formatNumber(3, numberFormat)} energía/segundo</p>
          <p>Coste: {formatNumber(solarPanelCost, numberFormat)} chatarra</p>
          <p>Instalados: {solarPanels} {solarPanelsQueue.queue > 0 ? `| En cola: ${solarPanelsQueue.queue} | Tiempo: ~${formatTime(solarPanelsQueue.queue * solarPanelsQueue.time)}` : ''}</p>
          
          {solarPanelsQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {formatTime(solarPanelsQueue.time)}</p>
              <ProgressBar progress={solarPanelsQueue.progress} time={solarPanelsQueue.time} />
            </div>
          )}
          
          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildSolarPanel}
              disabled={scrap < solarPanelCost}
              tooltipText={getTooltipText([{ amount: solarPanelCost, current: scrap, text: 'Chatarra' }], numberFormat)}
              className={`build-button ${scrap >= solarPanelCost ? 'unlocked' : ''}`}
            >
              Encargar Panel Solar {solarPanelAmount > 0 && `(${solarPanelAmount})`}
            </BotonConTooltip>
            {solarPanelsQueue.queue > 0 && (
              <QueueControls itemName='solarPanels' onCancel={onCancel} />
            )}
          </div>
        </div>
        <img src={solarPanelBasicImg} alt="Panel Solar Básico" className="energy-item-image" />
      </div>

            {/* Panel Solar Medio */}
            <div className={`energy-item ${scrap >= mediumSolarCost && (solarPanels >= 5 || hasBuilt.mediumSolarPanels) ? 'unlocked' : ''} ${solarPanels >= 5 || hasBuilt.mediumSolarPanels ? '' : 'locked'}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#F59E0B' }}>Panel Solar Medio</h3>
                    <p>Producción: +{formatNumber(10, numberFormat)} energía/segundo</p>
          <p>Coste: {formatNumber(mediumSolarCost, numberFormat)} chatarra</p>
          <p>Instalados: {mediumSolarPanels} {mediumSolarPanelsQueue.queue > 0 ? `| En cola: ${mediumSolarPanelsQueue.queue} | Tiempo: ~${formatTime(mediumSolarPanelsQueue.queue * mediumSolarPanelsQueue.time)}` : ''}</p>
          <p>Requisitos: 5 Paneles Solares Básicos (solo para el primero)</p>

          {mediumSolarPanelsQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {formatTime(mediumSolarPanelsQueue.time)}</p>
              <ProgressBar progress={mediumSolarPanelsQueue.progress} time={mediumSolarPanelsQueue.time} />
            </div>
          )}
          
          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildMediumSolar}
              disabled={scrap < mediumSolarCost || (solarPanels < 5 && !hasBuilt.mediumSolarPanels)}
              tooltipText={getTooltipText([
                { amount: mediumSolarCost, current: scrap, text: 'Chatarra' },
                { amount: 5, current: solarPanels, text: 'Paneles Solares Básicos' }
              ], numberFormat)}
              className={`build-button ${scrap >= mediumSolarCost && (solarPanels >= 5 || hasBuilt.mediumSolarPanels) ? 'unlocked' : ''}`}
            >
              Encargar Panel Medio {mediumSolarAmount > 0 && `(${mediumSolarAmount})`}
            </BotonConTooltip>
            {mediumSolarPanelsQueue.queue > 0 && (
              <QueueControls itemName='mediumSolarPanels' onCancel={onCancel} />
            )}
          </div>
          {solarPanels < 5 && !hasBuilt.mediumSolarPanels && (
            <p className="requirement-warning">
              ⚠️ Necesitas 5 Paneles Solares Básicos
            </p>
          )}
        </div>
        <img src={solarPanelMediumImg} alt="Panel Solar Medio" className="energy-item-image" />
      </div>

                        {/* Panel Solar Avanzado */}
      <div className={`energy-item ${scrap >= advancedSolarCost && (mediumSolarPanels >= 1 || hasBuilt.advancedSolar) ? 'unlocked' : ''} ${mediumSolarPanels >= 1 || hasBuilt.advancedSolar ? '' : 'locked'}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#06B6D4' }}>Panel Solar Avanzado</h3>
                    <p>Producción: +{formatNumber(30, numberFormat)} energía/segundo</p>
          <p>Coste: {formatNumber(advancedSolarCost, numberFormat)} chatarra</p>
          <p>Instalados: {advancedSolar} {advancedSolarQueue.queue > 0 ? `| En cola: ${advancedSolarQueue.queue} | Tiempo: ~${formatTime(advancedSolarQueue.queue * advancedSolarQueue.time)}` : ''}</p>
          <p>Requisitos: 1 Panel Solar Medio (solo para el primero)</p>
          
          {advancedSolarQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {formatTime(advancedSolarQueue.time)}</p>
              <ProgressBar progress={advancedSolarQueue.progress} time={advancedSolarQueue.time} />
            </div>
          )}

          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildAdvancedSolar}
              disabled={scrap < advancedSolarCost || (mediumSolarPanels < 1 && !hasBuilt.advancedSolar)}
              tooltipText={getTooltipText([
                { amount: advancedSolarCost, current: scrap, text: 'Chatarra' },
                { amount: 1, current: mediumSolarPanels, text: 'Paneles Solares Medios' }
              ], numberFormat)}
              className={`build-button ${scrap >= advancedSolarCost && (mediumSolarPanels >= 1 || hasBuilt.advancedSolar) ? 'unlocked' : ''}`}
            >
              Encargar Panel Avanzado {advancedSolarAmount > 0 && `(${advancedSolarAmount})`}
            </BotonConTooltip>
            {advancedSolarQueue.queue > 0 && (
              <QueueControls itemName='advancedSolar' onCancel={onCancel} />
            )}
          </div>
          {mediumSolarPanels < 1 && !hasBuilt.advancedSolar && (
            <p className="requirement-warning">
              ⚠️ Necesitas 1 Panel Solar Medio
            </p>
          )}
        </div>
        <img src={solarPanelAdvancedImg} alt="Panel Solar Avanzado" className="energy-item-image" />
      </div>

            {/* Núcleo Energético Averiado */}
      <div className={`energy-item ${scrap >= energyCoreCost && (advancedSolar >= 3 || hasBuilt.energyCores) ? 'unlocked' : ''} ${advancedSolar >= 3 || hasBuilt.energyCores ? '' : 'locked'}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#F87171' }}>Núcleo Energético Averiado</h3>
          <p>Producción: +{formatNumber(50, numberFormat)} energía/segundo</p>
                    <p>Capacidad: +{formatNumber(100, numberFormat)} energía máxima</p>
          <p>Coste: {formatNumber(energyCoreCost, numberFormat)} chatarra</p>
          <p>Instalados: {energyCores} {energyCoresQueue.queue > 0 ? `| En cola: ${energyCoresQueue.queue} | Tiempo: ~${formatTime(energyCoresQueue.queue * energyCoresQueue.time)}` : ''}</p>
          <p>Requisitos: 3 Paneles Solares Avanzados (solo para el primero)</p>
          
          {energyCoresQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {formatTime(energyCoresQueue.time)}</p>
              <ProgressBar progress={energyCoresQueue.progress} time={energyCoresQueue.time} />
            </div>
          )}

          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildEnergyCore}
              disabled={scrap < energyCoreCost || (advancedSolar < 3 && !hasBuilt.energyCores)}
              tooltipText={getTooltipText([
                { amount: energyCoreCost, current: scrap, text: 'Chatarra' },
                { amount: 3, current: advancedSolar, text: 'Paneles Solares Avanzados' }
              ], numberFormat)}
              className={`build-button ${scrap >= energyCoreCost && (advancedSolar >= 3 || hasBuilt.energyCores) ? 'unlocked' : ''}`}
            >
              Encargar Núcleo Averiado {energyCoreAmount > 0 && `(${energyCoreAmount})`}
            </BotonConTooltip>
            {energyCoresQueue.queue > 0 && (
              <QueueControls itemName='energyCores' onCancel={onCancel} />
            )}
          </div>
          {advancedSolar < 3 && !hasBuilt.energyCores && <p className="requirement-warning">⚠️ Necesitas 3 Paneles Solares Avanzados</p>}
        </div>
        <img src={energyCoreDamagedImg} alt="Núcleo Energético Averiado" className="energy-item-image" />
      </div>

            {/* Núcleo Energético Estabilizado */}
      <div className={`energy-item ${scrap >= stabilizedEnergyCoreCost && (energyCores >= 3 || hasBuilt.stabilizedEnergyCores) ? 'unlocked' : ''} ${energyCores >= 3 || hasBuilt.stabilizedEnergyCores ? '' : 'locked'}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#4ADE80' }}>Núcleo Energético Estabilizado</h3>
          <p>Producción: +{formatNumber(75, numberFormat)} energía/segundo</p>
                    <p>Capacidad: +{formatNumber(150, numberFormat)} energía máxima</p>
          <p>Coste: {formatNumber(stabilizedEnergyCoreCost, numberFormat)} chatarra</p>
          <p>Instalados: {stabilizedEnergyCores} {stabilizedEnergyCoresQueue.queue > 0 ? `| En cola: ${stabilizedEnergyCoresQueue.queue} | Tiempo: ~${formatTime(stabilizedEnergyCoresQueue.queue * stabilizedEnergyCoresQueue.time)}` : ''}</p>
          <p>Requisitos: 3 Núcleos Averiados (solo para el primero)</p>
          
          {stabilizedEnergyCoresQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {formatTime(stabilizedEnergyCoresQueue.time)}</p>
              <ProgressBar progress={stabilizedEnergyCoresQueue.progress} time={stabilizedEnergyCoresQueue.time} />
            </div>
          )}

          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildStabilizedEnergyCore}
              disabled={scrap < stabilizedEnergyCoreCost || (energyCores < 3 && !hasBuilt.stabilizedEnergyCores)}
              tooltipText={getTooltipText([
                { amount: stabilizedEnergyCoreCost, current: scrap, text: 'Chatarra' },
                { amount: 3, current: energyCores, text: 'Núcleos Averiados' }
              ], numberFormat)}
              className={`build-button ${scrap >= stabilizedEnergyCoreCost && (energyCores >= 3 || hasBuilt.stabilizedEnergyCores) ? 'unlocked' : ''}`}
            >
              Encargar Núcleo Estabilizado {stabilizedEnergyCoreAmount > 0 && `(${stabilizedEnergyCoreAmount})`}
            </BotonConTooltip>
            {stabilizedEnergyCoresQueue.queue > 0 && (
              <QueueControls itemName='stabilizedEnergyCores' onCancel={onCancel} />
            )}
          </div>
          {energyCores < 3 && !hasBuilt.stabilizedEnergyCores && <p className="requirement-warning">⚠️ Necesitas 3 Núcleos Averiados</p>}
        </div>
        <img src={energyCoreStabilizedImg} alt="Núcleo Energético Estabilizado" className="energy-item-image" />
      </div>

            {/* Núcleo Energético Potenciado */}
      <div className={`energy-item ${scrap >= empoweredEnergyCoreCost && (stabilizedEnergyCores >= 3 || hasBuilt.empoweredEnergyCores) ? 'unlocked' : ''} ${stabilizedEnergyCores >= 3 || hasBuilt.empoweredEnergyCores ? '' : 'locked'}`}>
        <div className="energy-item-content">
          <h3 style={{ color: '#22C55E' }}>Núcleo Energético Potenciado</h3>
          <p>Producción: +{formatNumber(150, numberFormat)} energía/segundo</p>
                    <p>Capacidad: +{formatNumber(300, numberFormat)} energía máxima</p>
          <p>Coste: {formatNumber(empoweredEnergyCoreCost, numberFormat)} chatarra</p>
          <p>Instalados: {empoweredEnergyCores} {empoweredEnergyCoresQueue.queue > 0 ? `| En cola: ${empoweredEnergyCoresQueue.queue} | Tiempo: ~${formatTime(empoweredEnergyCoresQueue.queue * empoweredEnergyCoresQueue.time)}` : ''}</p>
          <p>Requisitos: 3 Núcleos Estabilizados (solo para el primero)</p>
          
          {empoweredEnergyCoresQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {formatTime(empoweredEnergyCoresQueue.time)}</p>
              <ProgressBar progress={empoweredEnergyCoresQueue.progress} time={empoweredEnergyCoresQueue.time} />
            </div>
          )}

          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildEmpoweredEnergyCore}
              disabled={scrap < empoweredEnergyCoreCost || (stabilizedEnergyCores < 3 && !hasBuilt.empoweredEnergyCores)}
              tooltipText={getTooltipText([
                { amount: empoweredEnergyCoreCost, current: scrap, text: 'Chatarra' },
                { amount: 3, current: stabilizedEnergyCores, text: 'Núcleos Estabilizados' }
              ], numberFormat)}
              className={`build-button ${scrap >= empoweredEnergyCoreCost && (stabilizedEnergyCores >= 3 || hasBuilt.empoweredEnergyCores) ? 'unlocked' : ''}`}
            >
              Encargar Núcleo Potenciado {empoweredEnergyCoreAmount > 0 && `(${empoweredEnergyCoreAmount})`}
            </BotonConTooltip>
            {empoweredEnergyCoresQueue.queue > 0 && (
              <QueueControls itemName='empoweredEnergyCores' onCancel={onCancel} />
            )}
          </div>
          {stabilizedEnergyCores < 3 && !hasBuilt.empoweredEnergyCores && <p className="requirement-warning">⚠️ Necesitas 3 Núcleos Estabilizados</p>}
        </div>
                  <img src={energyCoreEmpoweredImg} alt="Núcleo Energético Potenciado" className="energy-item-image" />
        </div>

            {/* Reactor de Fusión (Condicional) */}
      {(upgrades as any).fusionTech > 0 && (
        <div className={`energy-item ${scrap >= fusionReactorCost.scrap && metalRefinado >= fusionReactorCost.metalRefinado && empoweredEnergyCores >= 1 ? 'unlocked' : ''} ${empoweredEnergyCores >= 1 ? '' : 'locked'}`}>
          <div className="energy-item-content">
            <h3 style={{ color: '#8B5CF6' }}>Reactor de Fusión</h3>
                        <p>Producción: +{formatNumber(250, numberFormat)} energía/segundo</p>
            <p>Capacidad: +{formatNumber(1000, numberFormat)} energía máxima</p>
            <p>Coste: {formatNumber(fusionReactorCost.scrap, numberFormat)} Chatarra + {formatNumber(fusionReactorCost.metalRefinado, numberFormat)} Metal Refinado</p>
            <p>Construidos: {fusionReactors} {fusionReactorQueue.queue > 0 ? `| En cola: ${fusionReactorQueue.queue} | Tiempo: ~${formatTime(fusionReactorQueue.queue * fusionReactorQueue.time)}` : ''}</p>
            <p>Requisitos: 1 Núcleo Potenciado (anteriormente 10 averiados)</p>
            
            {fusionReactorQueue.queue > 0 && (
              <div>
                <p className="time-info">T/U: {formatTime(fusionReactorQueue.time)}</p>
                <ProgressBar progress={fusionReactorQueue.progress} time={fusionReactorQueue.time} />
              </div>
            )}

            <div className="build-actions">
              <BotonConTooltip
                onClick={onBuildFusionReactor}
                disabled={scrap < fusionReactorCost.scrap || metalRefinado < fusionReactorCost.metalRefinado || empoweredEnergyCores < 1}
                tooltipText={getTooltipText([
                  { amount: fusionReactorCost.scrap, current: scrap, text: 'Chatarra' },
                  { amount: fusionReactorCost.metalRefinado, current: metalRefinado, text: 'Metal Refinado' },
                  { amount: 1, current: empoweredEnergyCores, text: 'Núcleos Potenciados' }
                ], numberFormat)}
                className={`build-button ${scrap >= fusionReactorCost.scrap && metalRefinado >= fusionReactorCost.metalRefinado && empoweredEnergyCores >= 1 ? 'unlocked' : ''}`}
              >
                Encargar Reactor de Fusión {fusionReactorAmount > 0 && `(${fusionReactorAmount})`}
              </BotonConTooltip>
              {fusionReactorQueue.queue > 0 && (
                <QueueControls itemName='fusionReactor' onCancel={onCancel} />
              )}
            </div>
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
    </div>
  );
});

export default EnergyView;