import React from 'react';
import { GameState } from '../types/gameState';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';

interface EnergyViewProps {
  scrap: number;
  currentEnergy: number;
  maxEnergy: number;
  energyConsumption: number;
  solarPanels: number;
  mediumSolarPanels: number;
  advancedSolar: number;
  energyCores: number;
  solarPanelsQueue: { progress: number; queue: number; time: number };
  mediumSolarPanelsQueue: { progress: number; queue: number; time: number };
  advancedSolarQueue: { progress: number; queue: number; time: number };
  energyCoresQueue: { progress: number; queue: number; time: number };
  onBuildSolarPanel: () => void;
  onBuildMediumSolar: () => void;
  onBuildAdvancedSolar: () => void;
  onBuildEnergyCore: () => void;
  buyAmount: number | 'max';
  onSetBuyAmount: (amount: number | 'max') => void;
  onClose: () => void;
}

const ProgressBar = ({ progress, time }: { progress: number; time: number }) => (
  <div style={{ width: '100%', backgroundColor: '#374151', borderRadius: '4px', marginTop: '0.5rem' }}>
    <div style={{ 
      width: `${(progress / time) * 100}%`, 
      backgroundColor: '#22C55E', 
      height: '5px', 
      borderRadius: '4px' 
    }} />
  </div>
);

const EnergyView: React.FC<EnergyViewProps> = React.memo(({ 
  scrap, currentEnergy, maxEnergy, energyConsumption,
  solarPanels, mediumSolarPanels, advancedSolar, energyCores,
  solarPanelsQueue, mediumSolarPanelsQueue, advancedSolarQueue, energyCoresQueue,
  onBuildSolarPanel, onBuildMediumSolar, onBuildAdvancedSolar, onBuildEnergyCore,
  buyAmount, onSetBuyAmount, onClose 
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

  const getMaxAffordable = (cost: number) => {
    return Math.floor(scrap / cost);
  }

  const solarPanelMax = getMaxAffordable(solarPanelCost);
  const mediumSolarMax = getMaxAffordable(mediumSolarCost);
  const advancedSolarMax = getMaxAffordable(advancedSolarCost);
  const energyCoreMax = getMaxAffordable(energyCoreCost);

  const totalEnergyProduction = 
    solarPanels * 3 + 
    mediumSolarPanels * 10 +
    advancedSolar * 30 + 
    energyCores * 50;

  return (
    <div style={{
      backgroundColor: '#111827',
      color: '#E5E7EB',
      minHeight: '100vh',
      padding: '1rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2>⚡ MÓDULO DE ENERGÍA</h2>
        <button 
          onClick={onClose}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cerrar
        </button>
      </div>

      {/* Resumen Energético */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '2rem',
        border: '2px solid #06B6D4'
      }}>
                <h3 style={{ color: '#06B6D4', marginTop: 0 }}>📊 RESUMEN ENERGÉTICO</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <span>🔋 {formatNumber(currentEnergy)} / {formatNumber(maxEnergy)}</span>
          <span>⚡ +{formatNumber(totalEnergyProduction)}/s</span>
          <span>🔌 {formatNumber(energyConsumption)}/s</span>
          <span style={{ color: totalEnergyProduction >= energyConsumption ? '#22C55E' : '#EF4444' }}>
            📈 {(totalEnergyProduction - energyConsumption).toFixed(1)}/s
          </span>
        </div>
      </div>

      <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />

            <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= solarPanelCost ? '2px solid #22C55E' : '2px solid #374151'
      }}>
        <h3 style={{ color: '#F59E0B', marginTop: 0 }}>☀️ Panel Solar Básico</h3>
        <p>⚡ Producción: +{formatNumber(3)} energía/segundo</p>
        <p>💰 Coste: {formatNumber(solarPanelCost)} chatarra</p>
        <p>🏗️ Instalados: {solarPanels} | 📦 En cola: {solarPanelsQueue.queue}</p>
        <p>⏱️ T/U: {solarPanelsQueue.time}s</p>
        
        {solarPanelsQueue.queue > 0 && <ProgressBar progress={solarPanelsQueue.progress} time={solarPanelsQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildSolarPanel}
          disabled={scrap < solarPanelCost}
          tooltipText={getTooltipText([{ amount: solarPanelCost, current: scrap, text: 'Chatarra' }])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= solarPanelCost ? '#22C55E' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Panel Solar {buyAmount === 'max' && `(${solarPanelMax})`}
        </BotonConTooltip>
      </div>

      {/* Panel Solar Medio */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= mediumSolarCost && solarPanels >= 5 ? '2px solid #22C55E' : '2px solid #374151',
        opacity: solarPanels >= 5 ? 1 : 0.6
      }}>
        <h3 style={{ color: '#F59E0B', marginTop: 0 }}>☀️ Panel Solar Medio</h3>
        <p>⚡ Producción: +{formatNumber(10)} energía/segundo</p>
        <p>💰 Coste: {formatNumber(mediumSolarCost)} chatarra</p>
        <p>🏗️ Instalados: {mediumSolarPanels} | 📦 En cola: {mediumSolarPanelsQueue.queue}</p>
        <p>⏱️ T/U: {mediumSolarPanelsQueue.time}s</p>
        <p>📋 Requisitos: 5 Paneles Solares Básicos</p>
        
        {mediumSolarPanelsQueue.queue > 0 && <ProgressBar progress={mediumSolarPanelsQueue.progress} time={mediumSolarPanelsQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildMediumSolar}
          disabled={scrap < mediumSolarCost || solarPanels < 5}
          tooltipText={getTooltipText([
            { amount: mediumSolarCost, current: scrap, text: 'Chatarra' },
            { amount: 5, current: solarPanels, text: 'Paneles Solares Básicos' }
          ])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= mediumSolarCost && solarPanels >= 5 ? '#22C55E' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Panel Medio {buyAmount === 'max' && `(${mediumSolarMax})`}
        </BotonConTooltip>
        {solarPanels < 5 && (
          <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            ⚠️ Necesitas 5 Paneles Solares Básicos
          </p>
        )}
      </div>

      {/* Panel Solar Avanzado */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= advancedSolarCost && mediumSolarPanels >= 1 ? '2px solid #22C55E' : '2px solid #374151',
        opacity: mediumSolarPanels >= 1 ? 1 : 0.6
      }}>
        <h3 style={{ color: '#06B6D4', marginTop: 0 }}>🔆 Panel Solar Avanzado</h3>
        <p>⚡ Producción: +{formatNumber(30)} energía/segundo</p>
        <p>💰 Coste: {formatNumber(advancedSolarCost)} chatarra</p>
        <p>🏗️ Instalados: {advancedSolar} | 📦 En cola: {advancedSolarQueue.queue}</p>
        <p>⏱️ T/U: {advancedSolarQueue.time}s</p>
        <p>📋 Requisitos: 1 Panel Solar Medio</p>
        
        {advancedSolarQueue.queue > 0 && <ProgressBar progress={advancedSolarQueue.progress} time={advancedSolarQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildAdvancedSolar}
          disabled={scrap < advancedSolarCost || mediumSolarPanels < 1}
          tooltipText={getTooltipText([
            { amount: advancedSolarCost, current: scrap, text: 'Chatarra' },
            { amount: 1, current: mediumSolarPanels, text: 'Paneles Solares Medios' }
          ])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= advancedSolarCost && mediumSolarPanels >= 1 ? '#22C55E' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Panel Avanzado {buyAmount === 'max' && `(${advancedSolarMax})`}
        </BotonConTooltip>
        {mediumSolarPanels < 1 && (
          <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            ⚠️ Necesitas 1 Panel Solar Medio
          </p>
        )}
      </div>

      {/* Núcleo Energético */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= energyCoreCost && advancedSolar >= 3 ? '2px solid #22C55E' : '2px solid #374151',
        opacity: advancedSolar >= 3 ? 1 : 0.6
      }}>
        <h3 style={{ color: '#22C55E', marginTop: 0 }}>🔷 Núcleo Energético</h3>
        <p>⚡ Producción: +{formatNumber(50)} energía/segundo</p>
        <p>🔋 Capacidad: +{formatNumber(100)} energía máxima</p>
        <p>💰 Coste: {formatNumber(energyCoreCost)} chatarra</p>
        <p>🏗️ Instalados: {energyCores} | 📦 En cola: {energyCoresQueue.queue}</p>
        <p>⏱️ T/U: {energyCoresQueue.time}s</p>
        <p>📋 Requisitos: 3 Paneles Solares Avanzados</p>
        
        {energyCoresQueue.queue > 0 && <ProgressBar progress={energyCoresQueue.progress} time={energyCoresQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildEnergyCore}
          disabled={scrap < energyCoreCost || advancedSolar < 3}
          tooltipText={getTooltipText([
            { amount: energyCoreCost, current: scrap, text: 'Chatarra' },
            { amount: 3, current: advancedSolar, text: 'Paneles Solares Avanzados' }
          ])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= energyCoreCost && advancedSolar >= 3 ? '#22C55E' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Núcleo Energético {buyAmount === 'max' && `(${energyCoreMax})`}
        </BotonConTooltip>
                {advancedSolar < 3 && (
                    <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            ⚠️ Necesitas 3 Paneles Solares Avanzados
          </p>
        )}
      </div>
    </div>
  );
});

export default EnergyView;