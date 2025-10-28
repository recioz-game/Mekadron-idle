import React from 'react';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';
import QueueControls from './QueueControls';

interface WorkshopProps {
  scrap: number;
  metalRefinado: number;
  aceroEstructural: number;
  basicDrones: number;
  mediumDrones: number;
  advancedDrones: number;
  reinforcedBasicDrones: number;
  reinforcedMediumDrones: number;
  reinforcedAdvancedDrones: number;
  golemDrones: number;
  expeditionDrones: number;
  wyrmDrones: number;
  basicDroneQueue: { progress: number; queue: number; time: number };
  mediumDroneQueue: { progress: number; queue: number; time: number };
  advancedDroneQueue: { progress: number; queue: number; time: number };
  reinforcedBasicDroneQueue: { progress: number; queue: number; time: number };
  reinforcedMediumDroneQueue: { progress: number; queue: number; time: number };
  reinforcedAdvancedDroneQueue: { progress: number; queue: number; time: number };
  golemDroneQueue: { progress: number; queue: number; time: number };
  expeditionDroneQueue: { progress: number; queue: number; time: number };
  wyrmDroneQueue: { progress: number; queue: number; time: number };
  reinforcedBasicDronesUpgrade: number;
  reinforcedMediumDronesUpgrade: number;
  reinforcedAdvancedDronesUpgrade: number;
  golemChassisUpgrade: number;
  onBuildBasicDrone: () => void;
  onBuildMediumDrone: () => void;
  onBuildAdvancedDrone: () => void;
  onBuildReinforcedBasic: () => void;
  onBuildReinforcedMedium: () => void;
  onBuildReinforcedAdvanced: () => void;
  onBuildGolemDrone: () => void;
  onBuildExpeditionDrone: () => void;
  onBuildWyrm: () => void;
  buyAmount: number | 'max';
  onSetBuyAmount: (amount: number | 'max') => void;
  onClose: () => void;
  onCancel: (itemName: string, amount: number | 'all') => void;
}

const Workshop: React.FC<WorkshopProps> = React.memo(({ 
  scrap, metalRefinado, aceroEstructural,
  basicDrones, mediumDrones, advancedDrones, reinforcedBasicDrones, reinforcedMediumDrones, reinforcedAdvancedDrones, golemDrones, expeditionDrones, wyrmDrones,
  basicDroneQueue, mediumDroneQueue, advancedDroneQueue, reinforcedBasicDroneQueue, reinforcedMediumDroneQueue, reinforcedAdvancedDroneQueue, golemDroneQueue, expeditionDroneQueue, wyrmDroneQueue,
  reinforcedBasicDronesUpgrade, reinforcedMediumDronesUpgrade, reinforcedAdvancedDronesUpgrade, golemChassisUpgrade,
  onBuildBasicDrone, onBuildMediumDrone, onBuildAdvancedDrone, onBuildReinforcedBasic, onBuildReinforcedMedium, onBuildReinforcedAdvanced, onBuildGolemDrone, onBuildExpeditionDrone, onBuildWyrm,
  buyAmount, onSetBuyAmount, onClose, onCancel 
}) => {

  const basicDroneCost = 15;
  const mediumDroneCost = 250;
  const advancedDroneCost = 1500;
  const reinforcedBasicCost = { scrap: 600, metal: 5 };
  const reinforcedMediumCost = { scrap: 2500, metal: 15 };
  const reinforcedAdvancedCost = { scrap: 7000, metal: 30 };
  const expeditionDroneCost = { scrap: 3000, metal: 20 };
  const golemCost = { scrap: 75000, steel: 5 };
  const wyrmCost = { scrap: 250000, steel: 25 };
  
  const getMaxAffordable = (cost: { scrap: number, metal?: number, steel?: number }) => {
    const maxByScrap = cost.scrap > 0 ? Math.floor(scrap / cost.scrap) : Infinity;
    const maxByMetal = cost.metal && cost.metal > 0 ? Math.floor(metalRefinado / cost.metal) : Infinity;
    const maxBySteel = cost.steel && cost.steel > 0 ? Math.floor(aceroEstructural / cost.steel) : Infinity;
    return Math.min(maxByScrap, maxByMetal, maxBySteel);
  };

  const basicDroneMax = getMaxAffordable({ scrap: basicDroneCost });
  const mediumDroneMax = getMaxAffordable({ scrap: mediumDroneCost });
  const advancedDroneMax = getMaxAffordable({ scrap: advancedDroneCost });
  const reinforcedBasicMax = getMaxAffordable(reinforcedBasicCost);
  const reinforcedMediumMax = getMaxAffordable(reinforcedMediumCost);
  const reinforcedAdvancedMax = getMaxAffordable(reinforcedAdvancedCost);
  const expeditionDroneMax = getMaxAffordable(expeditionDroneCost);
  const golemMax = getMaxAffordable(golemCost);
  const wyrmMax = getMaxAffordable(wyrmCost);
  
  const getTooltipText = (requirements: { resource?: string, amount: number, current: number, text: string }[]): string => {
    const missing = requirements.filter(req => req.current < req.amount);
    if (missing.length === 0) return '';
    return 'Requiere: ' + missing.map(req => `${req.text} (${formatNumber(req.amount)})`).join(', ');
  };

  const ProgressBar = ({ progress, time }: { progress: number; time: number }) => (
    <div style={{ width: '100%', backgroundColor: '#374151', borderRadius: '4px', marginTop: '0.5rem' }}>
      <div style={{ width: `${(progress / time) * 100}%`, backgroundColor: '#22C55E', height: '5px', borderRadius: '4px' }} />
    </div>
  );

  return (
    <div style={{ backgroundColor: '#111827', color: '#E5E7EB', minHeight: '100vh', padding: '1rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>🏭 TALLER DE DRONES</h2>
        <button onClick={onClose} style={{ padding: '0.5rem 1rem', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cerrar
        </button>
      </div>

      <div style={{ padding: '1rem', backgroundColor: '#1F2937', borderRadius: '4px', marginBottom: '2rem', border: '2px solid #F59E0B' }}>
        <h3 style={{ color: '#F59E0B', marginTop: 0, textAlign: 'center' }}>🔄 DRONES DE RECICLADO</h3>
        <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />
        
        <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '4px', marginBottom: '1rem', border: scrap >= basicDroneCost ? '2px solid #22C55E' : '2px solid #374151' }}>
          <h4 style={{ color: '#F59E0B', marginTop: 0 }}>🤖 Dron Básico de Reciclado (DBR)</h4>
          <p>📊 Producción: +{formatNumber(1)} chatarra/segundo</p>
          <p>⚡ Consumo: {formatNumber(1)} energía</p>
                    <p>💰 Coste: {formatNumber(basicDroneCost)} chatarra</p>
          <p>🏗️ Flota: {basicDrones} | 📦 En cola: {basicDroneQueue.queue}</p>
          <QueueControls queue={basicDroneQueue} itemName='basic' onCancel={onCancel} />
          <BotonConTooltip onClick={onBuildBasicDrone} disabled={scrap < basicDroneCost} tooltipText={getTooltipText([{ resource: 'scrap', amount: basicDroneCost, current: scrap, text: 'Chatarra' }])} style={{ padding: '0.75rem 1.5rem', backgroundColor: scrap >= basicDroneCost ? '#22C55E' : '#9CA3AF', color: '#0F172A', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '0.5rem', width: '100%' }}>
            Encargar Dron Básico {buyAmount === 'max' && `(${basicDroneMax})`}
          </BotonConTooltip>
        </div>

        <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '4px', marginBottom: '1rem', border: scrap >= mediumDroneCost && basicDrones >= 5 ? '2px solid #22C55E' : '2px solid #374151', opacity: basicDrones >= 5 ? 1 : 0.6 }}>
          <h4 style={{ color: '#06B6D4', marginTop: 0 }}>🔧 Dron Medio de Reciclado (DMR)</h4>
          <p>📊 Producción: +{formatNumber(5)} chatarra/segundo</p>
          <p>⚡ Consumo: {formatNumber(3)} energía</p>
          <p>💰 Coste: {formatNumber(mediumDroneCost)} chatarra</p>
          <p>🏗️ Flota: {mediumDrones} | 📦 En cola: {mediumDroneQueue.queue}</p>
          <QueueControls queue={mediumDroneQueue} itemName='medium' onCancel={onCancel} />
          <p>📋 Requisitos: 5 Drones Básicos</p>
          <BotonConTooltip onClick={onBuildMediumDrone} disabled={scrap < mediumDroneCost || basicDrones < 5} tooltipText={getTooltipText([{ amount: mediumDroneCost, current: scrap, text: 'Chatarra' }, { amount: 5, current: basicDrones, text: 'Drones Básicos' }])} style={{ padding: '0.75rem 1.5rem', backgroundColor: scrap >= mediumDroneCost && basicDrones >= 5 ? '#22C55E' : '#9CA3AF', color: '#0F172A', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '0.5rem', width: '100%' }}>
            Encargar Dron Medio {buyAmount === 'max' && `(${mediumDroneMax})`}
          </BotonConTooltip>
          {basicDrones < 5 && <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>⚠️ Necesitas 5 Drones Básicos para desbloquear</p>}
        </div>

        <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '4px', marginBottom: '1rem', border: scrap >= advancedDroneCost && mediumDrones >= 3 ? '2px solid #22C55E' : '2px solid #374151', opacity: mediumDrones >= 3 ? 1 : 0.6 }}>
          <h4 style={{ color: '#22C55E', marginTop: 0 }}>🚀 Dron Avanzado de Reciclado (DAR)</h4>
          <p>📊 Producción: +{formatNumber(20)} chatarra/segundo</p>
          <p>⚡ Consumo: {formatNumber(5)} energía</p>
          <p>💰 Coste: {formatNumber(advancedDroneCost)} chatarra</p>
          <p>🏗️ Flota: {advancedDrones} | 📦 En cola: {advancedDroneQueue.queue}</p>
          <QueueControls queue={advancedDroneQueue} itemName='advanced' onCancel={onCancel} />
          <p>📋 Requisitos: 3 Drones Medios</p>
          <BotonConTooltip onClick={onBuildAdvancedDrone} disabled={scrap < advancedDroneCost || mediumDrones < 3} tooltipText={getTooltipText([{ amount: advancedDroneCost, current: scrap, text: 'Chatarra' }, { amount: 3, current: mediumDrones, text: 'Drones Medios' }])} style={{ padding: '0.75rem 1.5rem', backgroundColor: scrap >= advancedDroneCost && mediumDrones >= 3 ? '#22C55E' : '#9CA3AF', color: '#0F172A', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '0.5rem', width: '100%' }}>
            Encargar Dron Avanzado {buyAmount === 'max' && `(${advancedDroneMax})`}
          </BotonConTooltip>
          {mediumDrones < 3 && <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>⚠️ Necesitas 3 Drones Medios para desbloquear</p>}
        </div>
      </div>
    </div>
  );
});

export default Workshop;
