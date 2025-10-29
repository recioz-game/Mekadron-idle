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
  upgrades: { [key: string]: number }; // Para el desmantelamiento
  onBuildBasicDrone: () => void;
  onBuildMediumDrone: () => void;
  onBuildAdvancedDrone: () => void;
  onBuildReinforcedBasic: () => void;
  onBuildReinforcedMedium: () => void;
  onBuildReinforcedAdvanced: () => void;
  onBuildGolemDrone: () => void;
  onBuildExpeditionDrone: () => void;
  onBuildWyrm: () => void;
  onDismantle: (droneType: string, amount: number | 'max') => void; // Nueva acción
  buyAmount: number | 'max';
  onSetBuyAmount: (amount: number | 'max') => void;
  onClose: () => void;
  onCancel: (itemName: string, amount: number | 'all') => void;
}

const Workshop: React.FC<WorkshopProps> = React.memo(({ 
  scrap, metalRefinado, aceroEstructural,
  basicDrones, mediumDrones, advancedDrones, reinforcedBasicDrones, reinforcedMediumDrones, reinforcedAdvancedDrones, golemDrones, expeditionDrones, wyrmDrones,
  basicDroneQueue, mediumDroneQueue, advancedDroneQueue, reinforcedBasicDroneQueue, reinforcedMediumDroneQueue, reinforcedAdvancedDroneQueue, golemDroneQueue, expeditionDroneQueue, wyrmDroneQueue,
  upgrades,
  onBuildBasicDrone, onBuildMediumDrone, onBuildAdvancedDrone, onBuildReinforcedBasic, onBuildReinforcedMedium, onBuildReinforcedAdvanced, onBuildGolemDrone, onBuildExpeditionDrone, onBuildWyrm, onDismantle,
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
        
        {/* Dron Básico */}
        <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '4px', marginBottom: '1rem', border: scrap >= basicDroneCost ? '2px solid #22C55E' : '2px solid #374151' }}>
          <h4 style={{ color: '#F59E0B', marginTop: 0 }}>🤖 Dron Básico de Reciclado (DBR)</h4>
          <p>📊 Producción: +{formatNumber(1)} chatarra/segundo</p>
          <p>⚡ Consumo: {formatNumber(1)} energía</p>
                    <p>💰 Coste: {formatNumber(basicDroneCost)} chatarra</p>
                    <p>🏗️ Flota: {basicDrones} | 📦 En cola: {basicDroneQueue.queue}</p>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <QueueControls queue={basicDroneQueue} itemName='basic' onCancel={onCancel} />
            <DismantleControls upgrades={upgrades} droneType='basic' onDismantle={onDismantle} droneCount={basicDrones} buyAmount={buyAmount} />
          </div>
          <BotonConTooltip onClick={onBuildBasicDrone} disabled={scrap < basicDroneCost} tooltipText={getTooltipText([{ resource: 'scrap', amount: basicDroneCost, current: scrap, text: 'Chatarra' }])} style={{ padding: '0.75rem 1.5rem', backgroundColor: scrap >= basicDroneCost ? '#22C55E' : '#9CA3AF', color: '#0F172A', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '0.5rem', width: '100%' }}>
            Encargar Dron Básico {buyAmount === 'max' && `(${basicDroneMax})`}
          </BotonConTooltip>
        </div>

        {/* Dron Medio */}
        <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '4px', marginBottom: '1rem', border: scrap >= mediumDroneCost && basicDrones >= 5 ? '2px solid #22C55E' : '2px solid #374151', opacity: basicDrones >= 5 ? 1 : 0.6 }}>
          <h4 style={{ color: '#06B6D4', marginTop: 0 }}>🔧 Dron Medio de Reciclado (DMR)</h4>
          <p>📊 Producción: +{formatNumber(5)} chatarra/segundo</p>
          <p>⚡ Consumo: {formatNumber(3)} energía</p>
          <p>💰 Coste: {formatNumber(mediumDroneCost)} chatarra</p>
                    <p>🏗️ Flota: {mediumDrones} | 📦 En cola: {mediumDroneQueue.queue}</p>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <QueueControls queue={mediumDroneQueue} itemName='medium' onCancel={onCancel} />
            <DismantleControls upgrades={upgrades} droneType='medium' onDismantle={onDismantle} droneCount={mediumDrones} buyAmount={buyAmount} />
          </div>
          <p>📋 Requisitos: 5 Drones Básicos</p>
          <BotonConTooltip onClick={onBuildMediumDrone} disabled={scrap < mediumDroneCost || basicDrones < 5} tooltipText={getTooltipText([{ amount: mediumDroneCost, current: scrap, text: 'Chatarra' }, { amount: 5, current: basicDrones, text: 'Drones Básicos' }])} style={{ padding: '0.75rem 1.5rem', backgroundColor: scrap >= mediumDroneCost && basicDrones >= 5 ? '#22C55E' : '#9CA3AF', color: '#0F172A', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '0.5rem', width: '100%' }}>
            Encargar Dron Medio {buyAmount === 'max' && `(${mediumDroneMax})`}
          </BotonConTooltip>
          {basicDrones < 5 && <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>⚠️ Necesitas 5 Drones Básicos para desbloquear</p>}
        </div>

        {/* Dron Avanzado */}
        <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '4px', marginBottom: '1rem', border: scrap >= advancedDroneCost && mediumDrones >= 3 ? '2px solid #22C55E' : '2px solid #374151', opacity: mediumDrones >= 3 ? 1 : 0.6 }}>
          <h4 style={{ color: '#22C55E', marginTop: 0 }}>🚀 Dron Avanzado de Reciclado (DAR)</h4>
          <p>📊 Producción: +{formatNumber(20)} chatarra/segundo</p>
          <p>⚡ Consumo: {formatNumber(5)} energía</p>
          <p>💰 Coste: {formatNumber(advancedDroneCost)} chatarra</p>
                    <p>🏗️ Flota: {advancedDrones} | 📦 En cola: {advancedDroneQueue.queue}</p>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <QueueControls queue={advancedDroneQueue} itemName='advanced' onCancel={onCancel} />
            <DismantleControls upgrades={upgrades} droneType='advanced' onDismantle={onDismantle} droneCount={advancedDrones} buyAmount={buyAmount} />
          </div>
          <p>📋 Requisitos: 3 Drones Medios</p>
          <BotonConTooltip onClick={onBuildAdvancedDrone} disabled={scrap < advancedDroneCost || mediumDrones < 3} tooltipText={getTooltipText([{ amount: advancedDroneCost, current: scrap, text: 'Chatarra' }, { amount: 3, current: mediumDrones, text: 'Drones Medios' }])} style={{ padding: '0.75rem 1.5rem', backgroundColor: scrap >= advancedDroneCost && mediumDrones >= 3 ? '#22C55E' : '#9CA3AF', color: '#0F172A', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '0.5rem', width: '100%' }}>
            Encargar Dron Avanzado {buyAmount === 'max' && `(${advancedDroneMax})`}
          </BotonConTooltip>
          {mediumDrones < 3 && <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>⚠️ Necesitas 3 Drones Medios para desbloquear</p>}
                </div>
      </div>

      {/* --- DRONES REFORZADOS --- */}
      {(upgrades.reinforcedBasicDrones > 0 || upgrades.reinforcedMediumDrones > 0 || upgrades.reinforcedAdvancedDrones > 0) && (
        <div style={{ padding: '1rem', backgroundColor: '#1F2937', borderRadius: '4px', marginBottom: '2rem', border: '2px solid #8B5CF6' }}>
            <h3 style={{ color: '#8B5CF6', marginTop: 0, textAlign: 'center' }}>🛡️ DRONES REFORZADOS</h3>

                        {/* Dron Básico Reforzado */}
            {upgrades.reinforcedBasicDrones > 0 && (
                <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '4px', marginBottom: '1rem', border: scrap >= reinforcedBasicCost.scrap && metalRefinado >= reinforcedBasicCost.metal ? '2px solid #22C55E' : '2px solid #374151' }}>
                    <h4 style={{ color: '#A78BFA', marginTop: 0 }}>🛡️ Dron Básico Reforzado (DBR-F)</h4>
                    <p>📊 Producción: +{formatNumber(8)} chatarra/segundo</p>
                    <p>⚡ Consumo: {formatNumber(3)} energía</p>
                    <p>💰 Coste: {formatNumber(reinforcedBasicCost.scrap)} chatarra, {formatNumber(reinforcedBasicCost.metal)} metal refinado</p>
                    <p>🏗️ Flota: {reinforcedBasicDrones} | 📦 En cola: {reinforcedBasicDroneQueue.queue}</p>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                        <QueueControls queue={reinforcedBasicDroneQueue} itemName='reinforcedBasic' onCancel={onCancel} />
                        <DismantleControls upgrades={upgrades} droneType='reinforcedBasic' onDismantle={onDismantle} droneCount={reinforcedBasicDrones} buyAmount={buyAmount} />
                    </div>
                    <BotonConTooltip 
                        onClick={onBuildReinforcedBasic} 
                        disabled={scrap < reinforcedBasicCost.scrap || metalRefinado < reinforcedBasicCost.metal} 
                        tooltipText={getTooltipText([
                            { amount: reinforcedBasicCost.scrap, current: scrap, text: 'Chatarra' }, 
                            { amount: reinforcedBasicCost.metal, current: metalRefinado, text: 'Metal Refinado' }
                        ])} 
                        style={{ padding: '0.75rem 1.5rem', backgroundColor: scrap >= reinforcedBasicCost.scrap && metalRefinado >= reinforcedBasicCost.metal ? '#22C55E' : '#9CA3AF', color: '#0F172A', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '0.5rem', width: '100%' }}
                    >
                        Encargar Dron Básico Reforzado {buyAmount === 'max' && `(${reinforcedBasicMax})`}
                    </BotonConTooltip>
                </div>
            )}

            {/* Dron Medio Reforzado */}
            {upgrades.reinforcedMediumDrones > 0 && (
                <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '4px', marginBottom: '1rem', border: scrap >= reinforcedMediumCost.scrap && metalRefinado >= reinforcedMediumCost.metal ? '2px solid #22C55E' : '2px solid #374151' }}>
                    <h4 style={{ color: '#A78BFA', marginTop: 0 }}>🛡️ Dron Medio Reforzado (DMR-F)</h4>
                    <p>📊 Producción: +{formatNumber(25)} chatarra/segundo</p>
                    <p>⚡ Consumo: {formatNumber(6)} energía</p>
                    <p>💰 Coste: {formatNumber(reinforcedMediumCost.scrap)} chatarra, {formatNumber(reinforcedMediumCost.metal)} metal refinado</p>
                    <p>🏗️ Flota: {reinforcedMediumDrones} | 📦 En cola: {reinforcedMediumDroneQueue.queue}</p>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                        <QueueControls queue={reinforcedMediumDroneQueue} itemName='reinforcedMedium' onCancel={onCancel} />
                        <DismantleControls upgrades={upgrades} droneType='reinforcedMedium' onDismantle={onDismantle} droneCount={reinforcedMediumDrones} buyAmount={buyAmount} />
                    </div>
                    <BotonConTooltip 
                        onClick={onBuildReinforcedMedium} 
                        disabled={scrap < reinforcedMediumCost.scrap || metalRefinado < reinforcedMediumCost.metal} 
                        tooltipText={getTooltipText([
                            { amount: reinforcedMediumCost.scrap, current: scrap, text: 'Chatarra' }, 
                            { amount: reinforcedMediumCost.metal, current: metalRefinado, text: 'Metal Refinado' }
                        ])} 
                        style={{ padding: '0.75rem 1.5rem', backgroundColor: scrap >= reinforcedMediumCost.scrap && metalRefinado >= reinforcedMediumCost.metal ? '#22C55E' : '#9CA3AF', color: '#0F172A', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '0.5rem', width: '100%' }}
                    >
                        Encargar Dron Medio Reforzado {buyAmount === 'max' && `(${reinforcedMediumMax})`}
                    </BotonConTooltip>
                </div>
            )}

            {/* Dron Avanzado Reforzado */}
            {upgrades.reinforcedAdvancedDrones > 0 && (
                <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '4px', marginBottom: '1rem', border: scrap >= reinforcedAdvancedCost.scrap && metalRefinado >= reinforcedAdvancedCost.metal ? '2px solid #22C55E' : '2px solid #374151' }}>
                    <h4 style={{ color: '#A78BFA', marginTop: 0 }}>🛡️ Dron Avanzado Reforzado (DAR-F)</h4>
                    <p>📊 Producción: +{formatNumber(80)} chatarra/segundo</p>
                    <p>⚡ Consumo: {formatNumber(12)} energía</p>
                    <p>💰 Coste: {formatNumber(reinforcedAdvancedCost.scrap)} chatarra, {formatNumber(reinforcedAdvancedCost.metal)} metal refinado</p>
                    <p>🏗️ Flota: {reinforcedAdvancedDrones} | 📦 En cola: {reinforcedAdvancedDroneQueue.queue}</p>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                        <QueueControls queue={reinforcedAdvancedDroneQueue} itemName='reinforcedAdvanced' onCancel={onCancel} />
                        <DismantleControls upgrades={upgrades} droneType='reinforcedAdvanced' onDismantle={onDismantle} droneCount={reinforcedAdvancedDrones} buyAmount={buyAmount} />
                    </div>
                    <BotonConTooltip 
                        onClick={onBuildReinforcedAdvanced} 
                        disabled={scrap < reinforcedAdvancedCost.scrap || metalRefinado < reinforcedAdvancedCost.metal} 
                        tooltipText={getTooltipText([
                            { amount: reinforcedAdvancedCost.scrap, current: scrap, text: 'Chatarra' }, 
                            { amount: reinforcedAdvancedCost.metal, current: metalRefinado, text: 'Metal Refinado' }
                        ])} 
                        style={{ padding: '0.75rem 1.5rem', backgroundColor: scrap >= reinforcedAdvancedCost.scrap && metalRefinado >= reinforcedAdvancedCost.metal ? '#22C55E' : '#9CA3AF', color: '#0F172A', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '0.5rem', width: '100%' }}
                    >
                        Encargar Dron Avanzado Reforzado {buyAmount === 'max' && `(${reinforcedAdvancedMax})`}
                    </BotonConTooltip>
                </div>
            )}
        </div>
      )}

      {/* Sección para drones especiales */}
      {(upgrades.golemChassis > 0 || upgrades.wyrm > 0 ) && (
        <div style={{ padding: '1rem', backgroundColor: '#1F2937', borderRadius: '4px', marginBottom: '2rem', border: '2px solid #F43F5E' }}>
          <h3 style={{ color: '#F43F5E', marginTop: 0, textAlign: 'center' }}>⚔️ DRONES DE ÉLITE</h3>

            {/* Dron Golem */}
            {upgrades.golemChassis > 0 && (
                <div style={{ padding: '1rem', backgroundColor: '#111827', borderRadius: '4px', marginBottom: '1rem', opacity: reinforcedAdvancedDrones >= 5 ? 1 : 0.6, border: scrap >= golemCost.scrap && aceroEstructural >= golemCost.steel && reinforcedAdvancedDrones >= 5 ? '2px solid #22C55E' : '2px solid #374151' }}>
                    <h4 style={{ color: '#F43F5E', marginTop: 0 }}>🗿 Dron Golem (DG-1)</h4>
                    <p>📊 Producción: +{formatNumber(500)} chatarra/segundo</p>
                    <p>⚡ Consumo: {formatNumber(50)} energía</p>
                    <p>💰 Coste: {formatNumber(golemCost.scrap)} chatarra, {formatNumber(golemCost.steel)} acero estructural</p>
                    <p>📋 Requisitos: 5 Drones Avanzados Reforzados</p>
                    <p>🏗️ Flota: {golemDrones} | 📦 En cola: {golemDroneQueue.queue}</p>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                        <QueueControls queue={golemDroneQueue} itemName='golem' onCancel={onCancel} />
                        <DismantleControls upgrades={upgrades} droneType='golem' onDismantle={onDismantle} droneCount={golemDrones} buyAmount={buyAmount} />
                    </div>
                    <BotonConTooltip 
                        onClick={onBuildGolemDrone} 
                        disabled={scrap < golemCost.scrap || aceroEstructural < golemCost.steel || reinforcedAdvancedDrones < 5} 
                        tooltipText={getTooltipText([
                            { amount: golemCost.scrap, current: scrap, text: 'Chatarra' }, 
                            { amount: golemCost.steel, current: aceroEstructural, text: 'Acero Estructural' },
                            { amount: 5, current: reinforcedAdvancedDrones, text: 'Drones Avanzados Reforzados'}
                        ])} 
                        style={{ padding: '0.75rem 1.5rem', backgroundColor: scrap >= golemCost.scrap && aceroEstructural >= golemCost.steel && reinforcedAdvancedDrones >= 5 ? '#22C55E' : '#9CA3AF', color: '#0F172A', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '0.5rem', width: '100%' }}
                    >
                        Encargar Dron Golem {buyAmount === 'max' && `(${golemMax})`}
                    </BotonConTooltip>
                </div>
            )}
        </div>
      )}
    </div>
  );
});

// Nuevo componente para los controles de desmantelamiento
const DismantleControls: React.FC<{
  upgrades: { [key: string]: number },
  droneType: string,
  droneCount: number,
  buyAmount: number | 'max',
  onDismantle: (droneType: string, amount: number | 'max') => void
}> = ({ upgrades, droneType, droneCount, buyAmount, onDismantle }) => {
  // Corregir el typo: reaasignProtocols -> reassignProtocols
  if (!upgrades.reassignProtocols) {
    return null;
  }

  return (
    <button
      onClick={() => onDismantle(droneType, buyAmount)}
      disabled={droneCount <= 0}
      style={{
        padding: '0.5rem',
        backgroundColor: droneCount > 0 ? '#EF4444' : '#374151',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: droneCount > 0 ? 'pointer' : 'not-allowed',
        fontSize: '0.8rem',
        width: '100px'
      }}
    >
      Desmantelar
    </button>
  );
};

export default Workshop;

