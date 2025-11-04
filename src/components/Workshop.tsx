import React from 'react';
import './Workshop.css'; // Importar el archivo CSS
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
  expeditionV2Drones: number; // Nuevo dron
  wyrmDrones: number;
  basicDroneQueue: { progress: number; queue: number; time: number };
  mediumDroneQueue: { progress: number; queue: number; time: number };
  advancedDroneQueue: { progress: number; queue: number; time: number };
  reinforcedBasicDroneQueue: { progress: number; queue: number; time: number };
  reinforcedMediumDroneQueue: { progress: number; queue: number; time: number };
    reinforcedAdvancedDroneQueue: { progress: number; queue: number; time: number };
  golemDroneQueue: { progress: number; queue: number; time: number };
  expeditionDroneQueue: { progress: number; queue: number; time: number };
  expeditionV2DroneQueue: { progress: number; queue: number; time: number }; // Nueva cola
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
  onBuildExpeditionV2Drone: () => void; // Nueva acción
  onBuildWyrm: () => void;
  onDismantle: (droneType: string, amount: number | 'max') => void; // Nueva acción
  buyAmount: number | 'max';
  onSetBuyAmount: (amount: number | 'max') => void;
  onClose: () => void;
  onCancel: (itemName: string, amount: number | 'all') => void;
}

const Workshop: React.FC<WorkshopProps> = React.memo(({ 
  scrap, metalRefinado, aceroEstructural,
  basicDrones, mediumDrones, advancedDrones, reinforcedBasicDrones, reinforcedMediumDrones, reinforcedAdvancedDrones, golemDrones, expeditionDrones, expeditionV2Drones, wyrmDrones,
  basicDroneQueue, mediumDroneQueue, advancedDroneQueue, reinforcedBasicDroneQueue, reinforcedMediumDroneQueue, reinforcedAdvancedDroneQueue, golemDroneQueue, expeditionDroneQueue, expeditionV2DroneQueue, wyrmDroneQueue,
  upgrades,
  onBuildBasicDrone, onBuildMediumDrone, onBuildAdvancedDrone, onBuildReinforcedBasic, onBuildReinforcedMedium, onBuildReinforcedAdvanced, onBuildGolemDrone, onBuildExpeditionDrone, onBuildExpeditionV2Drone, onBuildWyrm, onDismantle,
  buyAmount, onSetBuyAmount, onClose, onCancel 
}) => {

  const basicDroneCost = 15;
  const mediumDroneCost = 250;
  const advancedDroneCost = 1500;
  const reinforcedBasicCost = { scrap: 600, metal: 5 };
  const reinforcedMediumCost = { scrap: 2500, metal: 15 };
  const reinforcedAdvancedCost = { scrap: 7000, metal: 30 };
  const expeditionDroneCost = { scrap: 3000, metal: 20 };
  const expeditionV2DroneCost = { scrap: 15000, metal: 100 }; // 5x el costo original
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
  const expeditionV2DroneMax = getMaxAffordable(expeditionV2DroneCost); // Nuevo máximo
  const golemMax = getMaxAffordable(golemCost);
  const wyrmMax = getMaxAffordable(wyrmCost);
  
    const getTooltipText = (requirements: { resource?: string, amount: number, current: number, text: string }[]): string => {
    const missing = requirements.filter(req => req.current < req.amount);
    if (missing.length === 0) return '';
    return 'Requiere: ' + missing.map(req => `${req.text} (${formatNumber(req.amount)})`).join(', ');
  };

  

  return (
    <div className="workshop-container">
      <div className="workshop-header">
        <h2>🏭 TALLER DE DRONES</h2>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>

      <div className="drone-category" style={{ borderColor: '#F59E0B' }}>
        <h3 style={{ color: '#F59E0B' }}>🔄 DRONES DE RECICLADO</h3>
        <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />
        
        {/* Dron Básico */}
        <div className={`drone-item ${scrap >= basicDroneCost ? 'unlocked' : ''}`}>
          <div className="drone-info">
            <h4 style={{ color: '#F59E0B' }}>🤖 Dron Básico de Reciclado (DBR)</h4>
            <p>📊 Producción: +{formatNumber(1)} chatarra/segundo</p>
            <p>⚡ Consumo: {formatNumber(1)} energía</p>
            <p>💰 Coste: {formatNumber(basicDroneCost)} chatarra</p>
            <p>🏗️ Flota: {basicDrones} | 📦 En cola: {basicDroneQueue.queue}</p>
          </div>
          <div className="controls-container">
            <QueueControls queue={basicDroneQueue} itemName='basic' onCancel={onCancel} />
            <DismantleControls upgrades={upgrades} droneType='basic' onDismantle={onDismantle} droneCount={basicDrones} buyAmount={buyAmount} />
          </div>
          <BotonConTooltip 
            onClick={onBuildBasicDrone} 
            disabled={scrap < basicDroneCost} 
            tooltipText={getTooltipText([{ resource: 'scrap', amount: basicDroneCost, current: scrap, text: 'Chatarra' }])} 
            className={`build-button ${scrap >= basicDroneCost ? 'unlocked' : ''}`}
          >
            Encargar Dron Básico {buyAmount === 'max' && `(${basicDroneMax})`}
          </BotonConTooltip>
        </div>

        {/* Dron Medio */}
        <div className={`drone-item ${scrap >= mediumDroneCost && basicDrones >= 5 ? 'unlocked' : ''} ${basicDrones >= 5 ? '' : 'locked'}`}>
          <div className="drone-info">
            <h4 style={{ color: '#06B6D4' }}>🔧 Dron Medio de Reciclado (DMR)</h4>
            <p>📊 Producción: +{formatNumber(5)} chatarra/segundo</p>
            <p>⚡ Consumo: {formatNumber(3)} energía</p>
            <p>💰 Coste: {formatNumber(mediumDroneCost)} chatarra</p>
            <p>🏗️ Flota: {mediumDrones} | 📦 En cola: {mediumDroneQueue.queue}</p>
            <p>📋 Requisitos: 5 Drones Básicos</p>
          </div>
          <div className="controls-container">
            <QueueControls queue={mediumDroneQueue} itemName='medium' onCancel={onCancel} />
            <DismantleControls upgrades={upgrades} droneType='medium' onDismantle={onDismantle} droneCount={mediumDrones} buyAmount={buyAmount} />
          </div>
          <BotonConTooltip 
            onClick={onBuildMediumDrone} 
            disabled={scrap < mediumDroneCost || basicDrones < 5} 
            tooltipText={getTooltipText([{ amount: mediumDroneCost, current: scrap, text: 'Chatarra' }, { amount: 5, current: basicDrones, text: 'Drones Básicos' }])} 
            className={`build-button ${scrap >= mediumDroneCost && basicDrones >= 5 ? 'unlocked' : ''}`}
          >
            Encargar Dron Medio {buyAmount === 'max' && `(${mediumDroneMax})`}
          </BotonConTooltip>
          {basicDrones < 5 && <p className="requirement-warning">⚠️ Necesitas 5 Drones Básicos para desbloquear</p>}
        </div>

        {/* Dron Avanzado */}
        <div className={`drone-item ${scrap >= advancedDroneCost && mediumDrones >= 3 ? 'unlocked' : ''} ${mediumDrones >= 3 ? '' : 'locked'}`}>
          <div className="drone-info">
            <h4 style={{ color: '#22C55E' }}>🚀 Dron Avanzado de Reciclado (DAR)</h4>
            <p>📊 Producción: +{formatNumber(20)} chatarra/segundo</p>
            <p>⚡ Consumo: {formatNumber(5)} energía</p>
            <p>💰 Coste: {formatNumber(advancedDroneCost)} chatarra</p>
            <p>🏗️ Flota: {advancedDrones} | 📦 En cola: {advancedDroneQueue.queue}</p>
            <p>📋 Requisitos: 3 Drones Medios</p>
          </div>
          <div className="controls-container">
            <QueueControls queue={advancedDroneQueue} itemName='advanced' onCancel={onCancel} />
            <DismantleControls upgrades={upgrades} droneType='advanced' onDismantle={onDismantle} droneCount={advancedDrones} buyAmount={buyAmount} />
          </div>
          <BotonConTooltip 
            onClick={onBuildAdvancedDrone} 
            disabled={scrap < advancedDroneCost || mediumDrones < 3} 
            tooltipText={getTooltipText([{ amount: advancedDroneCost, current: scrap, text: 'Chatarra' }, { amount: 3, current: mediumDrones, text: 'Drones Medios' }])} 
            className={`build-button ${scrap >= advancedDroneCost && mediumDrones >= 3 ? 'unlocked' : ''}`}
          >
            Encargar Dron Avanzado {buyAmount === 'max' && `(${advancedDroneMax})`}
          </BotonConTooltip>
          {mediumDrones < 3 && <p className="requirement-warning">⚠️ Necesitas 3 Drones Medios para desbloquear</p>}
        </div>
      </div>

      {/* DRONES DE EXPEDICIÓN */}
      <div className="drone-category" style={{ borderColor: '#10B981' }}>
        <h3 style={{ color: '#10B981' }}>🧭 DRONES DE EXPEDICIÓN</h3>
        
        {/* Dron de Expedición */}
        <div className={`drone-item ${scrap >= expeditionDroneCost.scrap && metalRefinado >= expeditionDroneCost.metal && advancedDrones >= 2 ? 'unlocked' : ''} ${advancedDrones >= 2 ? '' : 'locked'}`}>
          <div className="drone-info">
            <h4 style={{ color: '#10B981' }}>🧭 Dron de Expedición (DE-1)</h4>
            <p>📊 Función: Realiza expediciones para obtener recursos especiales</p>
            <p>⚡ Consumo: {formatNumber(2)} energía (en expediciones)</p>
            <p>💰 Coste: {formatNumber(expeditionDroneCost.scrap)} chatarra, {formatNumber(expeditionDroneCost.metal)} metal refinado</p>
            <p>📋 Requisitos: 2 Drones Avanzados</p>
            <p>🏗️ Flota: {expeditionDrones} | 📦 En cola: {expeditionDroneQueue.queue}</p>
          </div>
          <div className="controls-container">
            <QueueControls queue={expeditionDroneQueue} itemName='expedition' onCancel={onCancel} />
            <DismantleControls upgrades={upgrades} droneType='expedition' onDismantle={onDismantle} droneCount={expeditionDrones} buyAmount={buyAmount} />
          </div>
          <BotonConTooltip 
            onClick={onBuildExpeditionDrone}
            disabled={scrap < expeditionDroneCost.scrap || metalRefinado < expeditionDroneCost.metal || advancedDrones < 2}
            tooltipText={getTooltipText([
              { amount: expeditionDroneCost.scrap, current: scrap, text: 'Chatarra' },
              { amount: expeditionDroneCost.metal, current: metalRefinado, text: 'Metal Refinado' },
              { amount: 2, current: advancedDrones, text: 'Drones Avanzados' }
            ])} 
            className={`build-button ${scrap >= expeditionDroneCost.scrap && metalRefinado >= expeditionDroneCost.metal && advancedDrones >= 2 ? 'unlocked' : ''}`}
          >
            Encargar Dron de Expedición {buyAmount === 'max' && `(${expeditionDroneMax})`}
          </BotonConTooltip>
          {advancedDrones < 2 && <p className="requirement-warning">⚠️ Necesitas 2 Drones Avanzados para desbloquear</p>}
        </div>

        {/* Dron de Expedición v2 */}
        <div className={`drone-item ${scrap >= expeditionV2DroneCost.scrap && metalRefinado >= expeditionV2DroneCost.metal && expeditionDrones >= 5 ? 'unlocked' : ''} ${expeditionDrones >= 5 ? '' : 'locked'}`}>
          <div className="drone-info">
            <h4 style={{ color: '#059669' }}>🧭 Dron de Expedición v2 (DE-2)</h4>
            <p>📊 Función: Realiza expediciones avanzadas para obtener recursos raros</p>
            <p>⚡ Consumo: {formatNumber(5)} energía (en expediciones)</p>
            <p>💰 Coste: {formatNumber(expeditionV2DroneCost.scrap)} chatarra, {formatNumber(expeditionV2DroneCost.metal)} metal refinado</p>
            <p>📋 Requisitos: 5 Drones de Expedición</p>
            <p>🏗️ Flota: {expeditionV2Drones} | 📦 En cola: {expeditionV2DroneQueue.queue}</p>
          </div>
          <div className="controls-container">
            <QueueControls queue={expeditionV2DroneQueue} itemName='expeditionV2' onCancel={onCancel} />
            <DismantleControls upgrades={upgrades} droneType='expeditionV2' onDismantle={onDismantle} droneCount={expeditionV2Drones} buyAmount={buyAmount} />
          </div>
          <BotonConTooltip
            onClick={onBuildExpeditionV2Drone}
            disabled={scrap < expeditionV2DroneCost.scrap || metalRefinado < expeditionV2DroneCost.metal || expeditionDrones < 5}
            tooltipText={getTooltipText([
              { amount: expeditionV2DroneCost.scrap, current: scrap, text: 'Chatarra' },
              { amount: expeditionV2DroneCost.metal, current: metalRefinado, text: 'Metal Refinado' },
              { amount: 5, current: expeditionDrones, text: 'Drones de Expedición' }
            ])}
            className={`build-button ${scrap >= expeditionV2DroneCost.scrap && metalRefinado >= expeditionV2DroneCost.metal && expeditionDrones >= 5 ? 'unlocked' : ''}`}
          >
            Encargar Dron de Expedición v2 {buyAmount === 'max' && `(${expeditionV2DroneMax})`}
          </BotonConTooltip>
          {expeditionDrones < 5 && <p className="requirement-warning">⚠️ Necesitas 5 Drones de Expedición para desbloquear</p>}
        </div>
      </div>
      
      {/* DRONES REFORZADOS */}
      {(upgrades.reinforcedBasicDrones > 0 || upgrades.reinforcedMediumDrones > 0 || upgrades.reinforcedAdvancedDrones > 0) && (
        <div className="drone-category" style={{ borderColor: '#8B5CF6' }}>
          <h3 style={{ color: '#8B5CF6' }}>🛡️ DRONES REFORZADOS</h3>
          
          {/* Dron Básico Reforzado */}
          {upgrades.reinforcedBasicDrones > 0 && (
            <div className={`drone-item ${scrap >= reinforcedBasicCost.scrap && metalRefinado >= reinforcedBasicCost.metal ? 'unlocked' : ''}`}>
              <div className="drone-info">
                <h4 style={{ color: '#A78BFA' }}>🛡️ Dron Básico Reforzado (DBR-F)</h4>
                <p>📊 Producción: +{formatNumber(8)} chatarra/segundo</p>
                <p>⚡ Consumo: {formatNumber(3)} energía</p>
                <p>💰 Coste: {formatNumber(reinforcedBasicCost.scrap)} chatarra, {formatNumber(reinforcedBasicCost.metal)} metal refinado</p>
                <p>🏗️ Flota: {reinforcedBasicDrones} | 📦 En cola: {reinforcedBasicDroneQueue.queue}</p>
              </div>
              <div className="controls-container">
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
                className={`build-button ${scrap >= reinforcedBasicCost.scrap && metalRefinado >= reinforcedBasicCost.metal ? 'unlocked' : ''}`}
              >
                Encargar Dron Básico Reforzado {buyAmount === 'max' && `(${reinforcedBasicMax})`}
              </BotonConTooltip>
            </div>
          )}

          {/* Dron Medio Reforzado */}
          {upgrades.reinforcedMediumDrones > 0 && (
            <div className={`drone-item ${scrap >= reinforcedMediumCost.scrap && metalRefinado >= reinforcedMediumCost.metal ? 'unlocked' : ''}`}>
              <div className="drone-info">
                <h4 style={{ color: '#A78BFA' }}>🛡️ Dron Medio Reforzado (DMR-F)</h4>
                <p>📊 Producción: +{formatNumber(25)} chatarra/segundo</p>
                <p>⚡ Consumo: {formatNumber(6)} energía</p>
                <p>💰 Coste: {formatNumber(reinforcedMediumCost.scrap)} chatarra, {formatNumber(reinforcedMediumCost.metal)} metal refinado</p>
                <p>🏗️ Flota: {reinforcedMediumDrones} | 📦 En cola: {reinforcedMediumDroneQueue.queue}</p>
              </div>
              <div className="controls-container">
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
                className={`build-button ${scrap >= reinforcedMediumCost.scrap && metalRefinado >= reinforcedMediumCost.metal ? 'unlocked' : ''}`}
              >
                Encargar Dron Medio Reforzado {buyAmount === 'max' && `(${reinforcedMediumMax})`}
              </BotonConTooltip>
            </div>
          )}

          {/* Dron Avanzado Reforzado */}
          {upgrades.reinforcedAdvancedDrones > 0 && (
            <div className={`drone-item ${scrap >= reinforcedAdvancedCost.scrap && metalRefinado >= reinforcedAdvancedCost.metal ? 'unlocked' : ''}`}>
              <div className="drone-info">
                <h4 style={{ color: '#A78BFA' }}>🛡️ Dron Avanzado Reforzado (DAR-F)</h4>
                <p>📊 Producción: +{formatNumber(80)} chatarra/segundo</p>
                <p>⚡ Consumo: {formatNumber(12)} energía</p>
                <p>💰 Coste: {formatNumber(reinforcedAdvancedCost.scrap)} chatarra, {formatNumber(reinforcedAdvancedCost.metal)} metal refinado</p>
                <p>🏗️ Flota: {reinforcedAdvancedDrones} | 📦 En cola: {reinforcedAdvancedDroneQueue.queue}</p>
              </div>
              <div className="controls-container">
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
                className={`build-button ${scrap >= reinforcedAdvancedCost.scrap && metalRefinado >= reinforcedAdvancedCost.metal ? 'unlocked' : ''}`}
              >
                Encargar Dron Avanzado Reforzado {buyAmount === 'max' && `(${reinforcedAdvancedMax})`}
              </BotonConTooltip>
            </div>
          )}
        </div>
      )}
      
      {/* DRONES DE ÉLITE */}
      {(upgrades.golemChassis > 0 || upgrades.wyrm > 0) && (
        <div className="drone-category" style={{ borderColor: '#F43F5E' }}>
          <h3 style={{ color: '#F43F5E' }}>⚔️ DRONES DE ÉLITE</h3>
          
          {/* Dron Golem */}
          {upgrades.golemChassis > 0 && (
            <div className={`drone-item ${scrap >= golemCost.scrap && aceroEstructural >= golemCost.steel && reinforcedAdvancedDrones >= 5 ? 'unlocked' : ''} ${reinforcedAdvancedDrones >= 5 ? '' : 'locked'}`}>
              <div className="drone-info">
                <h4 style={{ color: '#F43F5E' }}>🗿 Dron Golem (DG-1)</h4>
                <p>📊 Producción: +{formatNumber(500)} chatarra/segundo</p>
                <p>⚡ Consumo: {formatNumber(50)} energía</p>
                <p>💰 Coste: {formatNumber(golemCost.scrap)} chatarra, {formatNumber(golemCost.steel)} acero estructural</p>
                <p>📋 Requisitos: 5 Drones Avanzados Reforzados</p>
                <p>🏗️ Flota: {golemDrones} | 📦 En cola: {golemDroneQueue.queue}</p>
              </div>
              <div className="controls-container">
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
                className={`build-button ${scrap >= golemCost.scrap && aceroEstructural >= golemCost.steel && reinforcedAdvancedDrones >= 5 ? 'unlocked' : ''}`}
              >
                Encargar Dron Golem {buyAmount === 'max' && `(${golemMax})`}
              </BotonConTooltip>
            </div>
          )}
        </div>
      )}

      {/* Dron Wyrm */}
      {upgrades.golemChassis > 0 && golemDrones >= 1 && (
        <div className={`drone-item ${scrap >= wyrmCost.scrap && aceroEstructural >= wyrmCost.steel && golemDrones >= 1 ? 'unlocked' : ''} ${golemDrones >= 1 ? '' : 'locked'}`}>
          <div className="drone-info">
            <h4 style={{ color: '#F43F5E' }}>🐲 Dron Wyrm (DW-1)</h4>
            <p>📊 Producción: +{formatNumber(1)} metal refinado/s, +{formatNumber(0.1)} acero/s</p>
            <p>⚡ Consumo: {formatNumber(200)} energía</p>
            <p>💰 Coste: {formatNumber(wyrmCost.scrap)} chatarra, {formatNumber(wyrmCost.steel)} acero</p>
            <p>📋 Requisitos: 1 Dron Golem</p>
            <p>🏗️ Flota: {wyrmDrones} | 📦 En cola: {wyrmDroneQueue.queue}</p>
          </div>
          <div className="controls-container">
            <QueueControls queue={wyrmDroneQueue} itemName='wyrm' onCancel={onCancel} />
            <DismantleControls upgrades={upgrades} droneType='wyrm' onDismantle={onDismantle} droneCount={wyrmDrones} buyAmount={buyAmount} />
          </div>
          <BotonConTooltip
            onClick={onBuildWyrm}
            disabled={scrap < wyrmCost.scrap || aceroEstructural < wyrmCost.steel || golemDrones < 1}
            tooltipText={getTooltipText([
              { amount: wyrmCost.scrap, current: scrap, text: 'Chatarra' },
              { amount: wyrmCost.steel, current: aceroEstructural, text: 'Acero' },
              { amount: 1, current: golemDrones, text: 'Drones Golem' }
            ])}
            className={`build-button ${scrap >= wyrmCost.scrap && aceroEstructural >= wyrmCost.steel && golemDrones >= 1 ? 'unlocked' : ''}`}
          >
            Encargar Dron Wyrm {buyAmount === 'max' && `(${wyrmMax})`}
          </BotonConTooltip>
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

