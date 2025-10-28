import React from 'react';
import { GameState } from '../types/gameState';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';

interface StorageViewProps {
  // Resources
  scrap: number;
  metalRefinado: number;

  // Storage Units
  basicStorage: number;
  mediumStorage: number;
  advancedStorage: number;
  quantumHoardUnit: number;
  lithiumIonBattery: number;
  plasmaAccumulator: number;
  harmonicContainmentField: number;

  // Storage Queues
  basicStorageQueue: { progress: number; queue: number; time: number };
  mediumStorageQueue: { progress: number; queue: number; time: number };
  advancedStorageQueue: { progress: number; queue: number; time: number };
  quantumHoardUnitQueue: { progress: number; queue: number; time: number };
  lithiumIonBatteryQueue: { progress: number; queue: number; time: number };
  plasmaAccumulatorQueue: { progress: number; queue: number; time: number };
  harmonicContainmentFieldQueue: { progress: number; queue: number; time: number };

  // Energy Units for calculation
  energyCores: number;

  // Callbacks
  onBuildBasicStorage: () => void;
  onBuildMediumStorage: () => void;
  onBuildAdvancedStorage: () => void;
  onBuildQuantumHoardUnit: () => void;
  onBuildLithiumIonBattery: () => void;
  onBuildPlasmaAccumulator: () => void;
  onBuildHarmonicContainmentField: () => void;

  // Others
  buyAmount: number | 'max';
    onSetBuyAmount: (amount: number | 'max') => void;
  onClose: () => void;
  onCancel: (itemName: string, amount: number | 'all') => void;
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

const StorageView: React.FC<StorageViewProps> = React.memo(({ 
  scrap, metalRefinado,
  basicStorage, mediumStorage, advancedStorage, quantumHoardUnit, lithiumIonBattery, plasmaAccumulator, harmonicContainmentField,
  basicStorageQueue, mediumStorageQueue, advancedStorageQueue, quantumHoardUnitQueue, lithiumIonBatteryQueue, plasmaAccumulatorQueue, harmonicContainmentFieldQueue,
  energyCores,
  onBuildBasicStorage, onBuildMediumStorage, onBuildAdvancedStorage, onBuildQuantumHoardUnit, onBuildLithiumIonBattery, onBuildPlasmaAccumulator, onBuildHarmonicContainmentField,
  buyAmount, onSetBuyAmount, onClose, onCancel 
}) => {

  const getTooltipText = (requirements: { resource?: string, amount: number, current: number, text: string }[]): string => {
    const missing = requirements.filter(req => req.current < req.amount);
    if (missing.length === 0) return '';
    return 'Requiere: ' + missing.map(req => `${req.text} (${formatNumber(req.amount)})`).join(', ');
  };

  const basicStorageCost = 100;
  const mediumStorageCost = 1000;
  const advancedStorageCost = 10000;
  const quantumHoardUnitScrapCost = 75000;
  const quantumHoardUnitMetalCost = 50;
  const lithiumIonBatteryCost = 150;
  const plasmaAccumulatorCost = 750;
  const harmonicContainmentFieldScrapCost = 3000;
  const harmonicContainmentFieldMetalCost = 10;
  
  const getMaxAffordable = (cost: number | { scrap: number, metal: number }) => {
    if (typeof cost === 'number') {
      return Math.floor(scrap / cost);
    }
    const maxByScrap = cost.scrap > 0 ? Math.floor(scrap / cost.scrap) : Infinity;
    const maxByMetal = cost.metal > 0 ? Math.floor(metalRefinado / cost.metal) : Infinity;
    return Math.min(maxByScrap, maxByMetal);
  };

  const basicStorageMax = getMaxAffordable(basicStorageCost);
  const mediumStorageMax = getMaxAffordable(mediumStorageCost);
  const advancedStorageMax = getMaxAffordable(advancedStorageCost);
  const quantumHoardUnitMax = getMaxAffordable({ scrap: quantumHoardUnitScrapCost, metal: quantumHoardUnitMetalCost });
  const lithiumIonBatteryMax = getMaxAffordable(lithiumIonBatteryCost);
  const plasmaAccumulatorMax = getMaxAffordable(plasmaAccumulatorCost);
  const harmonicContainmentFieldMax = getMaxAffordable({ scrap: harmonicContainmentFieldScrapCost, metal: harmonicContainmentFieldMetalCost });

  
  // Calcular capacidades máximas
  const baseMaxScrap = 150;
  const baseMaxEnergy = 50;
  const basicStorageBonus = basicStorage * 50;
  const mediumStorageBonus = mediumStorage * 500;
  const advancedStorageBonus = advancedStorage * 5000;
  const quantumHoardBonus = quantumHoardUnit * 50000;
  const energyStorageBonus = 
    lithiumIonBattery * 50 +
    plasmaAccumulator * 250 +
    harmonicContainmentField * 1200;
  const energyCoreBonus = energyCores * 100;
  
  const totalMaxScrap = baseMaxScrap + basicStorageBonus + mediumStorageBonus + advancedStorageBonus + quantumHoardBonus;
  const totalMaxEnergy = baseMaxEnergy + energyCoreBonus + energyStorageBonus;

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
        <h2>📦 MÓDULO DE ALMACÉN</h2>
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

                  <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />

            <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= basicStorageCost ? '2px solid #22C55E' : '2px solid #374151'
      }}>
        <h3 style={{ color: '#F59E0B', marginTop: 0 }}>📦 Almacén Básico</h3>
        <p>📈 Capacidad: +{formatNumber(50)} chatarra máxima</p>
        <p>💰 Coste: {formatNumber(basicStorageCost)} chatarra</p>
        <p>🏗️ Construidos: {basicStorage} | 📦 En cola: {basicStorageQueue.queue}</p>
        {basicStorageQueue.queue > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => onCancel('basicStorage', 1)} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar 1</button>
            <button onClick={() => onCancel('basicStorage', 'all')} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar Todo</button>
          </div>
        )}
        <p>⏱️ T/U: {basicStorageQueue.time}s</p>
        
        {basicStorageQueue.queue > 0 && <ProgressBar progress={basicStorageQueue.progress} time={basicStorageQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildBasicStorage}
          disabled={scrap < basicStorageCost}
          tooltipText={getTooltipText([{ amount: basicStorageCost, current: scrap, text: 'Chatarra' }])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= basicStorageCost ? '#22C55E' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Almacén Básico {buyAmount === 'max' && `(${basicStorageMax})`}
        </BotonConTooltip>
      </div>

      {/* Almacén Medio */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= mediumStorageCost && basicStorage >= 3 ? '2px solid #22C55E' : '2px solid #374151',
        opacity: basicStorage >= 3 ? 1 : 0.6
      }}>
        <h3 style={{ color: '#22C55E', marginTop: 0 }}>- Almacén Medio</h3>
        <p>📈 Capacidad: +{formatNumber(500)} chatarra máxima</p>
        <p>💰 Coste: {formatNumber(mediumStorageCost)} chatarra</p>
        <p>🏗️ Construidos: {mediumStorage} | 📦 En cola: {mediumStorageQueue.queue}</p>
        {mediumStorageQueue.queue > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => onCancel('mediumStorage', 1)} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar 1</button>
            <button onClick={() => onCancel('mediumStorage', 'all')} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar Todo</button>
          </div>
        )}
        <p>⏱️ T/U: {mediumStorageQueue.time}s</p>
        <p>📋 Requisitos: 3 Almacenes Básicos</p>

        {mediumStorageQueue.queue > 0 && <ProgressBar progress={mediumStorageQueue.progress} time={mediumStorageQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildMediumStorage}
          disabled={scrap < mediumStorageCost || basicStorage < 3}
          tooltipText={getTooltipText([
            { amount: mediumStorageCost, current: scrap, text: 'Chatarra' },
            { amount: 3, current: basicStorage, text: 'Almacenes Básicos' }
          ])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= mediumStorageCost && basicStorage >= 3 ? '#22C55E' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Almacén Medio {buyAmount === 'max' && `(${mediumStorageMax})`}
        </BotonConTooltip>
        {basicStorage < 3 && (
          <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            ⚠️ Necesitas 3 Almacenes Básicos
          </p>
        )}
      </div>

      {/* Almacén Avanzado */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= advancedStorageCost && mediumStorage >= 1 ? '2px solid #D946EF' : '2px solid #374151',
        opacity: mediumStorage >= 1 ? 1 : 0.6
      }}>
        <h3 style={{ color: '#D946EF', marginTop: 0 }}>🚀 Almacén Avanzado</h3>
        <p>📈 Capacidad: +{formatNumber(5000)} chatarra máxima</p>
        <p>💰 Coste: {formatNumber(advancedStorageCost)} chatarra</p>
        <p>🏗️ Construidos: {advancedStorage} | 📦 En cola: {advancedStorageQueue.queue}</p>
        {advancedStorageQueue.queue > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => onCancel('advancedStorage', 1)} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar 1</button>
            <button onClick={() => onCancel('advancedStorage', 'all')} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar Todo</button>
          </div>
        )}
        <p>⏱️ T/U: {advancedStorageQueue.time}s</p>
        <p>📋 Requisitos: 1 Almacén Medio</p>

        {advancedStorageQueue.queue > 0 && <ProgressBar progress={advancedStorageQueue.progress} time={advancedStorageQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildAdvancedStorage}
          disabled={scrap < advancedStorageCost || mediumStorage < 1}
          tooltipText={getTooltipText([
            { amount: advancedStorageCost, current: scrap, text: 'Chatarra' },
            { amount: 1, current: mediumStorage, text: 'Almacenes Medios' }
          ])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= advancedStorageCost && mediumStorage >= 1 ? '#D946EF' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Almacén Avanzado {buyAmount === 'max' && `(${advancedStorageMax})`}
        </BotonConTooltip>
        {mediumStorage < 1 && (
          <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            ⚠️ Necesitas 1 Almacén Medio
          </p>
        )}
      </div>

      {/* Unidad de Acopio Cuántico */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= quantumHoardUnitScrapCost && metalRefinado >= quantumHoardUnitMetalCost && advancedStorage >= 3 ? '2px solid #D946EF' : '2px solid #374151',
        opacity: advancedStorage >= 3 ? 1 : 0.6
      }}>
        <h3 style={{ color: '#D946EF', marginTop: 0 }}>🌌 Unidad de Acopio Cuántico</h3>
        <p>📈 Capacidad: +{formatNumber(50000)} chatarra máxima</p>
        <p>💰 Coste: {formatNumber(quantumHoardUnitScrapCost)} chatarra y {formatNumber(quantumHoardUnitMetalCost)} metal refinado</p>
        <p>🏗️ Construidos: {quantumHoardUnit} | 📦 En cola: {quantumHoardUnitQueue.queue}</p>
        {quantumHoardUnitQueue.queue > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => onCancel('quantumHoardUnit', 1)} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar 1</button>
            <button onClick={() => onCancel('quantumHoardUnit', 'all')} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar Todo</button>
          </div>
        )}
        <p>⏱️ T/U: {quantumHoardUnitQueue.time}s</p>
        <p>📋 Requisitos: 3 Almacenes Avanzados</p>
        
        {quantumHoardUnitQueue.queue > 0 && <ProgressBar progress={quantumHoardUnitQueue.progress} time={quantumHoardUnitQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildQuantumHoardUnit}
          disabled={scrap < quantumHoardUnitScrapCost || metalRefinado < quantumHoardUnitMetalCost || advancedStorage < 3}
          tooltipText={getTooltipText([
            { amount: quantumHoardUnitScrapCost, current: scrap, text: 'Chatarra' },
            { amount: quantumHoardUnitMetalCost, current: metalRefinado, text: 'Metal Refinado' },
            { amount: 3, current: advancedStorage, text: 'Almacenes Avanzados' }
          ])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= quantumHoardUnitScrapCost && metalRefinado >= quantumHoardUnitMetalCost && advancedStorage >= 3 ? '#D946EF' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Acopio Cuántico {buyAmount === 'max' && `(${quantumHoardUnitMax})`}
        </BotonConTooltip>
        {advancedStorage < 3 && (
          <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            ⚠️ Necesitas 3 Almacenes Avanzados
          </p>
        )}
      </div>

      {/* --- ALMACENAMIENTO DE ENERGÍA --- */}
      <h3 style={{ borderBottom: '2px solid #06B6D4', paddingBottom: '0.5rem', marginTop: '3rem' }}>Almacenamiento de Energía</h3>

      {/* Batería de Iones de Litio */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= lithiumIonBatteryCost ? '2px solid #06B6D4' : '2px solid #374151'
      }}>
        <h3 style={{ color: '#06B6D4', marginTop: 0 }}>🔋 Batería de Iones de Litio</h3>
        <p>📈 Capacidad: +{formatNumber(50)} energía máxima</p>
        <p>💰 Coste: {formatNumber(lithiumIonBatteryCost)} chatarra</p>
        <p>🏗️ Construidos: {lithiumIonBattery} | 📦 En cola: {lithiumIonBatteryQueue.queue}</p>
        {lithiumIonBatteryQueue.queue > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => onCancel('lithiumIonBattery', 1)} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar 1</button>
            <button onClick={() => onCancel('lithiumIonBattery', 'all')} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar Todo</button>
          </div>
        )}
        <p>⏱️ T/U: {lithiumIonBatteryQueue.time}s</p>

        {lithiumIonBatteryQueue.queue > 0 && <ProgressBar progress={lithiumIonBatteryQueue.progress} time={lithiumIonBatteryQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildLithiumIonBattery}
          disabled={scrap < lithiumIonBatteryCost}
          tooltipText={getTooltipText([{ amount: lithiumIonBatteryCost, current: scrap, text: 'Chatarra' }])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= lithiumIonBatteryCost ? '#22C55E' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Batería {buyAmount === 'max' && `(${lithiumIonBatteryMax})`}
        </BotonConTooltip>
      </div>

      {/* Acumulador de Plasma */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= plasmaAccumulatorCost && lithiumIonBattery >= 5 ? '2px solid #06B6D4' : '2px solid #374151',
        opacity: lithiumIonBattery >= 5 ? 1 : 0.6
      }}>
        <h3 style={{ color: '#06B6D4', marginTop: 0 }}>🔋 Acumulador de Plasma</h3>
        <p>📈 Capacidad: +{formatNumber(250)} energía máxima</p>
        <p>💰 Coste: {formatNumber(plasmaAccumulatorCost)} chatarra</p>
        <p>🏗️ Construidos: {plasmaAccumulator} | 📦 En cola: {plasmaAccumulatorQueue.queue}</p>
        {plasmaAccumulatorQueue.queue > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => onCancel('plasmaAccumulator', 1)} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar 1</button>
            <button onClick={() => onCancel('plasmaAccumulator', 'all')} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar Todo</button>
          </div>
        )}
        <p>⏱️ T/U: {plasmaAccumulatorQueue.time}s</p>
        <p>📋 Requisitos: 5 Baterías de Iones de Litio</p>

        {plasmaAccumulatorQueue.queue > 0 && <ProgressBar progress={plasmaAccumulatorQueue.progress} time={plasmaAccumulatorQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildPlasmaAccumulator}
          disabled={scrap < plasmaAccumulatorCost || lithiumIonBattery < 5}
          tooltipText={getTooltipText([
            { amount: plasmaAccumulatorCost, current: scrap, text: 'Chatarra' },
            { amount: 5, current: lithiumIonBattery, text: 'Baterías de Iones de Litio' }
          ])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= plasmaAccumulatorCost && lithiumIonBattery >= 5 ? '#22C55E' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Acumulador {buyAmount === 'max' && `(${plasmaAccumulatorMax})`}
        </BotonConTooltip>
        {lithiumIonBattery < 5 && (
          <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            ⚠️ Necesitas 5 Baterías de Iones de Litio
          </p>
        )}
      </div>

      {/* Campo de Contención Armónico */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '1rem',
        border: scrap >= harmonicContainmentFieldScrapCost && metalRefinado >= harmonicContainmentFieldMetalCost && plasmaAccumulator >= 3 ? '2px solid #D946EF' : '2px solid #374151',
        opacity: plasmaAccumulator >= 3 ? 1 : 0.6
      }}>
        <h3 style={{ color: '#D946EF', marginTop: 0 }}>🔋 Campo de Contención Armónico</h3>
        <p>📈 Capacidad: +{formatNumber(1200)} energía máxima</p>
        <p>💰 Coste: {formatNumber(harmonicContainmentFieldScrapCost)} chatarra y {formatNumber(harmonicContainmentFieldMetalCost)} metal refinado</p>
        <p>🏗️ Construidos: {harmonicContainmentField} | 📦 En cola: {harmonicContainmentFieldQueue.queue}</p>
        {harmonicContainmentFieldQueue.queue > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => onCancel('harmonicContainmentField', 1)} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar 1</button>
            <button onClick={() => onCancel('harmonicContainmentField', 'all')} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar Todo</button>
          </div>
        )}
        <p>⏱️ T/U: {harmonicContainmentFieldQueue.time}s</p>
        <p>📋 Requisitos: 3 Acumuladores de Plasma</p>
        
        {harmonicContainmentFieldQueue.queue > 0 && <ProgressBar progress={harmonicContainmentFieldQueue.progress} time={harmonicContainmentFieldQueue.time} />}
        
                <BotonConTooltip
          onClick={onBuildHarmonicContainmentField}
          disabled={scrap < harmonicContainmentFieldScrapCost || metalRefinado < harmonicContainmentFieldMetalCost || plasmaAccumulator < 3}
          tooltipText={getTooltipText([
            { amount: harmonicContainmentFieldScrapCost, current: scrap, text: 'Chatarra' },
            { amount: harmonicContainmentFieldMetalCost, current: metalRefinado, text: 'Metal Refinado' },
            { amount: 3, current: plasmaAccumulator, text: 'Acumuladores de Plasma' }
          ])}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: scrap >= harmonicContainmentFieldScrapCost && metalRefinado >= harmonicContainmentFieldMetalCost && plasmaAccumulator >= 3 ? '#D946EF' : '#9CA3AF',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '0.5rem',
            width: '100%'
          }}
        >
          Encargar Campo de Contención {buyAmount === 'max' && `(${harmonicContainmentFieldMax})`}
        </BotonConTooltip>
        {plasmaAccumulator < 3 && (
                    <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            ⚠️ Necesitas 3 Acumuladores de Plasma
          </p>
        )}
      </div>
    </div>
  );
});

export default StorageView;