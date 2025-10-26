import React from 'react';
import { GameState } from '../types/gameState';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';

interface WorkshopProps {
  // Resources
  scrap: number;
  metalRefinado: number;
  aceroEstructural: number;

  // Drones
  basicDrones: number;
  mediumDrones: number;
  advancedDrones: number;
  reinforcedBasicDrones: number;
  reinforcedMediumDrones: number;
  reinforcedAdvancedDrones: number;
  golemDrones: number;
  expeditionDrones: number;
  wyrmDrones: number;
  
  // Queues
  basicDroneQueue: { progress: number; queue: number; time: number };
  mediumDroneQueue: { progress: number; queue: number; time: number };
  advancedDroneQueue: { progress: number; queue: number; time: number };
  reinforcedBasicDroneQueue: { progress: number; queue: number; time: number };
  reinforcedMediumDroneQueue: { progress: number; queue: number; time: number };
  reinforcedAdvancedDroneQueue: { progress: number; queue: number; time: number };
  golemDroneQueue: { progress: number; queue: number; time: number };
  expeditionDroneQueue: { progress: number; queue: number; time: number };
  wyrmDroneQueue: { progress: number; queue: number; time: number };

  // Upgrades
  reinforcedBasicDronesUpgrade: number;
  reinforcedMediumDronesUpgrade: number;
  reinforcedAdvancedDronesUpgrade: number;
  golemChassisUpgrade: number;

  // Callbacks
  onBuildBasicDrone: () => void;
  onBuildMediumDrone: () => void;
  onBuildAdvancedDrone: () => void;
  onBuildReinforcedBasic: () => void;
  onBuildReinforcedMedium: () => void;
  onBuildReinforcedAdvanced: () => void;
  onBuildGolemDrone: () => void;
  onBuildExpeditionDrone: () => void;
  onBuildWyrm: () => void;

  // Others
  buyAmount: number | 'max';
  onSetBuyAmount: (amount: number | 'max') => void;
  onClose: () => void;
}

const Workshop: React.FC<WorkshopProps> = React.memo(({ 
  scrap, metalRefinado, aceroEstructural,
  basicDrones, mediumDrones, advancedDrones, reinforcedBasicDrones, reinforcedMediumDrones, reinforcedAdvancedDrones, golemDrones, expeditionDrones, wyrmDrones,
  basicDroneQueue, mediumDroneQueue, advancedDroneQueue, reinforcedBasicDroneQueue, reinforcedMediumDroneQueue, reinforcedAdvancedDroneQueue, golemDroneQueue, expeditionDroneQueue, wyrmDroneQueue,
  reinforcedBasicDronesUpgrade, reinforcedMediumDronesUpgrade, reinforcedAdvancedDronesUpgrade, golemChassisUpgrade,
  onBuildBasicDrone, onBuildMediumDrone, onBuildAdvancedDrone, onBuildReinforcedBasic, onBuildReinforcedMedium, onBuildReinforcedAdvanced, onBuildGolemDrone, onBuildExpeditionDrone, onBuildWyrm,
  buyAmount, onSetBuyAmount, onClose 
}) => {

  // Costes
  const basicDroneCost = 15;
  const mediumDroneCost = 250;
  const advancedDroneCost = 1500;
  const reinforcedBasicCost = { scrap: 600, metal: 5 };
  const reinforcedMediumCost = { scrap: 2500, metal: 15 };
  const reinforcedAdvancedCost = { scrap: 7000, metal: 30 };
  const expeditionDroneCost = { scrap: 3000, metal: 20 };
  const golemCost = { scrap: 75000, steel: 5 };
  const wyrmCost = { scrap: 250000, steel: 25 };
  
  // --- Funciones para calcular el máximo construible ---
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
      <div style={{ 
        width: `${(progress / time) * 100}%`, 
        backgroundColor: '#22C55E', 
        height: '5px', 
        borderRadius: '4px' 
      }} />
    </div>
  );

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
        <h2>🏭 TALLER DE DRONES</h2>
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

      {/* SECCIÓN: DRONES DE RECICLADO BÁSICOS */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#1F2937',
        borderRadius: '4px',
        marginBottom: '2rem',
        border: '2px solid #F59E0B'
      }}>
        <h3 style={{ color: '#F59E0B', marginTop: 0, textAlign: 'center' }}>
          🔄 DRONES DE RECICLADO
        </h3>

        <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />
        
        <div style={{
          padding: '1rem',
          backgroundColor: '#111827',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: scrap >= basicDroneCost ? '2px solid #22C55E' : '2px solid #374151'
        }}>
          <h4 style={{ color: '#F59E0B', marginTop: 0 }}>🤖 Dron Básico de Reciclado (DBR)</h4>
          <p>📊 Producción: +{formatNumber(1)} chatarra/segundo</p>
          <p>⚡ Consumo: {formatNumber(1)} energía</p>
          <p>💰 Coste: {formatNumber(basicDroneCost)} chatarra</p>
          <p>🏗️ Flota: {basicDrones} | 📦 En cola: {basicDroneQueue.queue}</p>
          <p>⏱️ T/U: {basicDroneQueue.time}s</p>
          
          {basicDroneQueue.queue > 0 && <ProgressBar progress={basicDroneQueue.progress} time={basicDroneQueue.time} />}

          <BotonConTooltip
            onClick={onBuildBasicDrone}
            disabled={scrap < basicDroneCost}
            tooltipText={getTooltipText([{ resource: 'scrap', amount: basicDroneCost, current: scrap, text: 'Chatarra' }])}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: scrap >= basicDroneCost ? '#22C55E' : '#9CA3AF',
              color: '#0F172A',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              marginTop: '0.5rem',
              width: '100%'
            }}
          >
            Encargar Dron Básico {buyAmount === 'max' && `(${basicDroneMax})`}
          </BotonConTooltip>
        </div>

        {/* Dron Medio */}
        <div style={{
          padding: '1rem',
          backgroundColor: '#111827',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: scrap >= mediumDroneCost && basicDrones >= 5 ? '2px solid #22C55E' : '2px solid #374151',
          opacity: basicDrones >= 5 ? 1 : 0.6
        }}>
          <h4 style={{ color: '#06B6D4', marginTop: 0 }}>🔧 Dron Medio de Reciclado (DMR)</h4>
          <p>📊 Producción: +{formatNumber(5)} chatarra/segundo</p>
          <p>⚡ Consumo: {formatNumber(3)} energía</p>
          <p>💰 Coste: {formatNumber(mediumDroneCost)} chatarra</p>
          <p>🏗️ Flota: {mediumDrones} | 📦 En cola: {mediumDroneQueue.queue}</p>
          <p>⏱️ T/U: {mediumDroneQueue.time}s</p>
          <p>📋 Requisitos: 5 Drones Básicos</p>

          {mediumDroneQueue.queue > 0 && <ProgressBar progress={mediumDroneQueue.progress} time={mediumDroneQueue.time} />}
          
          <BotonConTooltip
            onClick={onBuildMediumDrone}
            disabled={scrap < mediumDroneCost || basicDrones < 5}
            tooltipText={getTooltipText([
              { amount: mediumDroneCost, current: scrap, text: 'Chatarra' },
              { amount: 5, current: basicDrones, text: 'Drones Básicos' }
            ])}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: scrap >= mediumDroneCost && basicDrones >= 5 ? '#22C55E' : '#9CA3AF',
              color: '#0F172A',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              marginTop: '0.5rem',
              width: '100%'
            }}
          >
            Encargar Dron Medio {buyAmount === 'max' && `(${mediumDroneMax})`}
          </BotonConTooltip>
          {basicDrones < 5 && (
            <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              ⚠️ Necesitas 5 Drones Básicos para desbloquear
            </p>
          )}
        </div>

        {/* Dron Avanzado */}
        <div style={{
          padding: '1rem',
          backgroundColor: '#111827',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: scrap >= advancedDroneCost && mediumDrones >= 3 ? '2px solid #22C55E' : '2px solid #374151',
          opacity: mediumDrones >= 3 ? 1 : 0.6
        }}>
          <h4 style={{ color: '#22C55E', marginTop: 0 }}>🚀 Dron Avanzado de Reciclado (DAR)</h4>
          <p>📊 Producción: +{formatNumber(20)} chatarra/segundo</p>
          <p>⚡ Consumo: {formatNumber(5)} energía</p>
          <p>💰 Coste: {formatNumber(advancedDroneCost)} chatarra</p>
          <p>🏗️ Flota: {advancedDrones} | 📦 En cola: {advancedDroneQueue.queue}</p>
          <p>⏱️ T/U: {advancedDroneQueue.time}s</p>
          <p>📋 Requisitos: 3 Drones Medios</p>

          {advancedDroneQueue.queue > 0 && <ProgressBar progress={advancedDroneQueue.progress} time={advancedDroneQueue.time} />}
          
          <BotonConTooltip
            onClick={onBuildAdvancedDrone}
            disabled={scrap < advancedDroneCost || mediumDrones < 3}
            tooltipText={getTooltipText([
              { amount: advancedDroneCost, current: scrap, text: 'Chatarra' },
              { amount: 3, current: mediumDrones, text: 'Drones Medios' }
            ])}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: scrap >= advancedDroneCost && mediumDrones >= 3 ? '#22C55E' : '#9CA3AF',
              color: '#0F172A',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              marginTop: '0.5rem',
              width: '100%'
            }}
          >
            Encargar Dron Avanzado {buyAmount === 'max' && `(${advancedDroneMax})`}
          </BotonConTooltip>
          {mediumDrones < 3 && (
            <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              ⚠️ Necesitas 3 Drones Medios para desbloquear
            </p>
          )}
        </div>
      </div>

      {/* SECCIÓN: DRONES REFORZADOS */}
      {(reinforcedBasicDronesUpgrade > 0 || 
        reinforcedMediumDronesUpgrade > 0 || 
        reinforcedAdvancedDronesUpgrade > 0) && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#1F2937',
          borderRadius: '4px',
          marginBottom: '2rem',
          border: '2px solid #06B6D4'
        }}>
          <h3 style={{ color: '#06B6D4', marginTop: 0, textAlign: 'center' }}>
            🛡️ DRONES REFORZADOS
          </h3>

          {/* Dron Reforzado Básico */}
          {reinforcedBasicDronesUpgrade > 0 && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#111827',
              borderRadius: '4px',
              marginBottom: '1rem',
              border: scrap >= reinforcedBasicCost.scrap && metalRefinado >= reinforcedBasicCost.metal ? '2px solid #22C55E' : '2px solid #374151'
            }}>
              <h4 style={{ color: '#F59E0B', marginTop: 0 }}>🛡️ Dron Reforzado Básico (DBR-F)</h4>
              <p>📊 Producción: +{formatNumber(8)} chatarra/segundo</p>
              <p>⚡ Consumo: {formatNumber(3)} energía</p>
              <p>💰 Coste: {formatNumber(reinforcedBasicCost.scrap)} chatarra y {formatNumber(reinforcedBasicCost.metal)} metal</p>
              <p>🏗️ Flota: {reinforcedBasicDrones} | 📦 En cola: {reinforcedBasicDroneQueue.queue}</p>
              <p>⏱️ T/U: {reinforcedBasicDroneQueue.time}s</p>
              
              {reinforcedBasicDroneQueue.queue > 0 && <ProgressBar progress={reinforcedBasicDroneQueue.progress} time={reinforcedBasicDroneQueue.time} />}
              
              <BotonConTooltip
                onClick={onBuildReinforcedBasic}
                disabled={scrap < reinforcedBasicCost.scrap || metalRefinado < reinforcedBasicCost.metal}
                tooltipText={getTooltipText([
                  { amount: reinforcedBasicCost.scrap, current: scrap, text: 'Chatarra' },
                  { amount: reinforcedBasicCost.metal, current: metalRefinado, text: 'Metal Refinado' }
                ])}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: scrap >= reinforcedBasicCost.scrap && metalRefinado >= reinforcedBasicCost.metal ? '#22C55E' : '#9CA3AF',
                  color: '#0F172A',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  marginTop: '0.5rem',
                  width: '100%'
                }}
              >
                Encargar Dron Reforzado Básico {buyAmount === 'max' && `(${reinforcedBasicMax})`}
              </BotonConTooltip>
            </div>
          )}

          {/* Dron Reforzado Medio */}
          {reinforcedMediumDronesUpgrade > 0 && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#111827',
              borderRadius: '4px',
              marginBottom: '1rem',
              border: scrap >= reinforcedMediumCost.scrap && metalRefinado >= reinforcedMediumCost.metal ? '2px solid #22C55E' : '2px solid #374151'
            }}>
              <h4 style={{ color: '#06B6D4', marginTop: 0 }}>⚡ Dron Reforzado Medio (DMR-F)</h4>
              <p>📊 Producción: +{formatNumber(25)} chatarra/segundo</p>
              <p>⚡ Consumo: {formatNumber(6)} energía</p>
              <p>💰 Coste: {formatNumber(reinforcedMediumCost.scrap)} chatarra y {formatNumber(reinforcedMediumCost.metal)} metal</p>
              <p>🏗️ Flota: {reinforcedMediumDrones} | 📦 En cola: {reinforcedMediumDroneQueue.queue}</p>
              <p>⏱️ T/U: {reinforcedMediumDroneQueue.time}s</p>
              
              {reinforcedMediumDroneQueue.queue > 0 && <ProgressBar progress={reinforcedMediumDroneQueue.progress} time={reinforcedMediumDroneQueue.time} />}
              
              <BotonConTooltip
                onClick={onBuildReinforcedMedium}
                disabled={scrap < reinforcedMediumCost.scrap || metalRefinado < reinforcedMediumCost.metal}
                tooltipText={getTooltipText([
                  { amount: reinforcedMediumCost.scrap, current: scrap, text: 'Chatarra' },
                  { amount: reinforcedMediumCost.metal, current: metalRefinado, text: 'Metal Refinado' }
                ])}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: scrap >= reinforcedMediumCost.scrap && metalRefinado >= reinforcedMediumCost.metal ? '#22C55E' : '#9CA3AF',
                  color: '#0F172A',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  marginTop: '0.5rem',
                  width: '100%'
                }}
              >
                Encargar Dron Reforzado Medio {buyAmount === 'max' && `(${reinforcedMediumMax})`}
              </BotonConTooltip>
            </div>
          )}

          {/* Dron Reforzado Avanzado */}
          {reinforcedAdvancedDronesUpgrade > 0 && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#111827',
              borderRadius: '4px',
              marginBottom: '1rem',
              border: scrap >= reinforcedAdvancedCost.scrap && metalRefinado >= reinforcedAdvancedCost.metal ? '2px solid #22C55E' : '2px solid #374151'
            }}>
              <h4 style={{ color: '#22C55E', marginTop: 0 }}>🚀 Dron Reforzado Avanzado (DAR-F)</h4>
              <p>📊 Producción: +{formatNumber(80)} chatarra/segundo</p>
              <p>⚡ Consumo: {formatNumber(12)} energía</p>
              <p>💰 Coste: {formatNumber(reinforcedAdvancedCost.scrap)} chatarra y {formatNumber(reinforcedAdvancedCost.metal)} metal</p>
              <p>🏗️ Flota: {reinforcedAdvancedDrones} | 📦 En cola: {reinforcedAdvancedDroneQueue.queue}</p>
              <p>⏱️ T/U: {reinforcedAdvancedDroneQueue.time}s</p>

              {reinforcedAdvancedDroneQueue.queue > 0 && <ProgressBar progress={reinforcedAdvancedDroneQueue.progress} time={reinforcedAdvancedDroneQueue.time} />}
              
              <BotonConTooltip
                onClick={onBuildReinforcedAdvanced}
                disabled={scrap < reinforcedAdvancedCost.scrap || metalRefinado < reinforcedAdvancedCost.metal}
                tooltipText={getTooltipText([
                  { amount: reinforcedAdvancedCost.scrap, current: scrap, text: 'Chatarra' },
                  { amount: reinforcedAdvancedCost.metal, current: metalRefinado, text: 'Metal Refinado' }
                ])}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: scrap >= reinforcedAdvancedCost.scrap && metalRefinado >= reinforcedAdvancedCost.metal ? '#22C55E' : '#9CA3AF',
                  color: '#0F172A',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  marginTop: '0.5rem',
                  width: '100%'
                }}
              >
                Encargar Dron Reforzado Avanzado {buyAmount === 'max' && `(${reinforcedAdvancedMax})`}
              </BotonConTooltip>
            </div>
          )}
        </div>
      )}

      {/* SECCIÓN: DRONES DE EXPEDICIÓN */}
      {reinforcedMediumDronesUpgrade > 0 && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#1F2937',
          borderRadius: '4px',
          marginBottom: '2rem',
          border: '2px solid #A78BFA' // Color cambiado
        }}>
          <h3 style={{ color: '#A78BFA', marginTop: 0, textAlign: 'center' }}>
            🗺️ DRONES DE EXPEDICIÓN
          </h3>

          <div style={{
            padding: '1rem',
            backgroundColor: '#111827',
            borderRadius: '4px',
            marginBottom: '1rem',
            border: scrap >= expeditionDroneCost.scrap && metalRefinado >= expeditionDroneCost.metal && reinforcedMediumDrones >= 3 ? '2px solid #22C55E' : '2px solid #374151',
            opacity: reinforcedMediumDrones >= 3 ? 1 : 0.6
          }}>
            <h4 style={{ color: '#A78BFA', marginTop: 0 }}>🧭 Dron de Expedición (DE-1)</h4>
            <p>Unidad autónoma diseñada para incursiones de largo alcance. No produce recursos pasivamente.</p>
            <p>⚡ Consumo: 0 (Inactivo) / 10 (En Expedición)</p>
            <p>💰 Coste: {formatNumber(expeditionDroneCost.scrap)} Chatarra + {formatNumber(expeditionDroneCost.metal)} Metal Refinado</p>
            <p>🏗️ Flota: {expeditionDrones} | 📦 En cola: {expeditionDroneQueue.queue}</p>
            <p>⏱️ T/U: {expeditionDroneQueue.time}s</p>
            <p>📋 Requisitos: 3 Drones Reforzados Medios</p>

            {expeditionDroneQueue.queue > 0 && <ProgressBar progress={expeditionDroneQueue.progress} time={expeditionDroneQueue.time} />}
            
            <BotonConTooltip
              onClick={onBuildExpeditionDrone}
              disabled={scrap < expeditionDroneCost.scrap || metalRefinado < expeditionDroneCost.metal || reinforcedMediumDrones < 3}
              tooltipText={getTooltipText([
                { amount: expeditionDroneCost.scrap, current: scrap, text: 'Chatarra' },
                { amount: expeditionDroneCost.metal, current: metalRefinado, text: 'Metal Refinado' },
                { amount: 3, current: reinforcedMediumDrones, text: 'Drones Reforzados Medios' }
              ])}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: scrap >= expeditionDroneCost.scrap && metalRefinado >= expeditionDroneCost.metal && reinforcedMediumDrones >= 3 ? '#22C55E' : '#9CA3AF',
                color: '#0F172A',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                marginTop: '0.5rem',
                width: '100%'
              }}
            >
              Encargar Dron de Expedición {buyAmount === 'max' && `(${expeditionDroneMax})`}
            </BotonConTooltip>
            {reinforcedMediumDrones < 3 && (
              <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                ⚠️ Necesitas 3 Drones Reforzados Medios
              </p>
            )}
          </div>
        </div>
      )}

      {/* SECCIÓN: DRONES DE ÉLITE (TIER 3) */}
      {golemChassisUpgrade > 0 && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#1F2937',
          borderRadius: '4px',
          marginBottom: '2rem',
          border: '2px solid #F472B6'
        }}>
          <h3 style={{ color: '#F472B6', marginTop: 0, textAlign: 'center' }}>
            💥 DRONES DE ÉLITE
          </h3>

          {/* DRON GOLEM */}
          <div style={{
            padding: '1rem',
            backgroundColor: '#111827',
            borderRadius: '4px',
            marginBottom: '1rem',
            border: scrap >= golemCost.scrap && aceroEstructural >= golemCost.steel && reinforcedAdvancedDrones >= 5 ? '2px solid #22C55E' : '2px solid #374151',
            opacity: reinforcedAdvancedDrones >= 5 ? 1 : 0.6
          }}>
            <h4 style={{ color: '#D946EF', marginTop: 0 }}>💥 Dron Golem (DG-1)</h4>
            <p>Recolector masivo de Tier 3. Produce grandes cantidades de chatarra.</p>
            <p>📊 Producción: +{formatNumber(500)} chatarra/segundo</p>
            <p>⚡ Consumo: {formatNumber(50)} energía</p>
            <p>💰 Coste: {formatNumber(golemCost.scrap)} Chatarra + {formatNumber(golemCost.steel)} Acero Estructural</p>
            <p>🏗️ Flota: {golemDrones} | 📦 En cola: {golemDroneQueue.queue}</p>
            <p>⏱️ T/U: {golemDroneQueue.time}s</p>
            <p>📋 Requisitos: 5 Drones Reforzados Avanzados</p>

            {golemDroneQueue.queue > 0 && <ProgressBar progress={golemDroneQueue.progress} time={golemDroneQueue.time} />}
            
            <BotonConTooltip
              onClick={onBuildGolemDrone}
              disabled={scrap < golemCost.scrap || aceroEstructural < golemCost.steel || reinforcedAdvancedDrones < 5}
              tooltipText={getTooltipText([
                { amount: golemCost.scrap, current: scrap, text: 'Chatarra' },
                { amount: golemCost.steel, current: aceroEstructural, text: 'Acero Estructural' },
                { amount: 5, current: reinforcedAdvancedDrones, text: 'Drones Reforzados Avanzados' }
              ])}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: scrap >= golemCost.scrap && aceroEstructural >= golemCost.steel && reinforcedAdvancedDrones >= 5 ? '#22C55E' : '#9CA3AF',
                color: '#0F172A',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                marginTop: '0.5rem',
                width: '100%'
              }}
            >
              Encargar Dron Golem {buyAmount === 'max' && `(${golemMax})`}
            </BotonConTooltip>
            {reinforcedAdvancedDrones < 5 && (
              <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                ⚠️ Necesitas 5 Drones Reforzados Avanzados
              </p>
            )}
          </div>
          
          {/* COSECHADOR WYRM */}
          <div style={{
            padding: '1rem',
            backgroundColor: '#111827',
            borderRadius: '4px',
            marginBottom: '1rem',
            border: scrap >= wyrmCost.scrap && aceroEstructural >= wyrmCost.steel && golemDrones >= 1 ? '2px solid #22C55E' : '2px solid #374151',
            opacity: golemDrones >= 1 ? 1 : 0.6
          }}>
            <h4 style={{ color: '#F472B6', marginTop: 0 }}>🐉 Cosechador Wyrm (CW-1)</h4>
            <p>Recolector de élite. Genera materiales avanzados directamente.</p>
            <p>📊 Producción: +1 Metal Refinado/s, +0.1 Acero Estructural/s</p>
            <p>⚡ Consumo: {formatNumber(200)} energía</p>
            <p>💰 Coste: {formatNumber(wyrmCost.scrap)} Chatarra + {formatNumber(wyrmCost.steel)} Acero Estructural</p>
            <p>🏗️ Flota: {wyrmDrones} | 📦 En cola: {wyrmDroneQueue.queue}</p>
            <p>⏱️ T/U: {wyrmDroneQueue.time}s</p>
            <p>📋 Requisitos: 1 Dron Golem</p>

            {wyrmDroneQueue.queue > 0 && <ProgressBar progress={wyrmDroneQueue.progress} time={wyrmDroneQueue.time} />}
            
            <BotonConTooltip
              onClick={onBuildWyrm}
              disabled={scrap < wyrmCost.scrap || aceroEstructural < wyrmCost.steel || golemDrones < 1}
              tooltipText={getTooltipText([
                { amount: wyrmCost.scrap, current: scrap, text: 'Chatarra' },
                { amount: wyrmCost.steel, current: aceroEstructural, text: 'Acero Estructural' },
                { amount: 1, current: golemDrones, text: 'Drones Golem' }
              ])}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: scrap >= wyrmCost.scrap && aceroEstructural >= wyrmCost.steel && golemDrones >= 1 ? '#22C55E' : '#9CA3AF',
                color: '#0F172A',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                marginTop: '0.5rem',
                width: '100%'
              }}
            >
              Encargar Cosechador Wyrm {buyAmount === 'max' && `(${wyrmMax})`}
            </BotonConTooltip>
            {golemDrones < 1 && (
              <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                ⚠️ Necesitas 1 Dron Golem
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Workshop;