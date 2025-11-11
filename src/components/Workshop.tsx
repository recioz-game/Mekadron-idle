import React from 'react';
import { GameState } from '../types/gameState';
import './Workshop.css'; // Importar el archivo CSS
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';
import QueueControls from './QueueControls';

// Importar imágenes de drones
import droneBasicImg from '../assets/images/ui/drone-basic.png';
import droneMediumImg from '../assets/images/ui/drone-medium.png';
import droneAdvancedImg from '../assets/images/ui/drone-advanced.png';
import droneExpeditionImg from '../assets/images/ui/drone-expedition.png';
import droneReinforcedBasicImg from '../assets/images/ui/drone-reinforced-basic.png';
import droneReinforcedMediumImg from '../assets/images/ui/drone-reinforced-medium.png';
import droneReinforcedAdvancedImg from '../assets/images/ui/drone-reinforced-advanced.png';
import droneExpeditionV2Img from '../assets/images/ui/drone-expedition-v2.png';
import droneGolemImg from '../assets/images/ui/drone-golem.png';
import droneWyrmImg from '../assets/images/ui/drone-wyrm.png';

interface WorkshopProps {
  scrap: number;
  metalRefinado: number;
  aceroEstructural: number;
  drones: GameState['workshop']['drones'];
  queues: GameState['workshop']['queues'];
  upgrades: { [key: string]: number };
  onBuildBasicDrone: () => void;
  onBuildMediumDrone: () => void;
  onBuildAdvancedDrone: () => void;
  onBuildReinforcedBasic: () => void;
  onBuildReinforcedMedium: () => void;
  onBuildReinforcedAdvanced: () => void;
  onBuildGolemDrone: () => void;
  onBuildExpeditionDrone: () => void;
  onBuildExpeditionV2Drone: () => void;
  onBuildWyrm: () => void;
  onDismantle: (droneType: string, amount: number | 'max') => void;
  buyAmount: number | 'max';
  onSetBuyAmount: (amount: number | 'max') => void;
  onClose: () => void;
  onCancel: (itemName: string, amount: number | 'all') => void;
}

const Workshop: React.FC<WorkshopProps> = React.memo(({ 
  scrap, metalRefinado, aceroEstructural,
  drones, queues,
  upgrades,
  onBuildBasicDrone, onBuildMediumDrone, onBuildAdvancedDrone, onBuildReinforcedBasic, onBuildReinforcedMedium, onBuildReinforcedAdvanced, onBuildGolemDrone, onBuildExpeditionDrone, onBuildExpeditionV2Drone, onBuildWyrm,
  onDismantle,
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
        <h2>TALLER DE DRONES</h2>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>

      <div className="drone-category" style={{ borderColor: '#F59E0B' }}>
        <h3 style={{ color: '#F59E0B' }}>DRONES DE RECICLADO</h3>
        <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />
        
                                                        {/* Dron Básico */}
        <div className={`drone-item ${scrap >= basicDroneCost ? 'unlocked' : ''}`}>
          <div className="drone-item-content">
            <div className="drone-info">
              <h4 className="drone-title" style={{ color: '#F59E0B' }}>Dron Básico de Reciclado (DBR)</h4>
              <p>📊 Producción: +{formatNumber(1)} chatarra/segundo</p>
              <p>⚡ Consumo: {formatNumber(1)} energía</p>
              <p>💰 Coste: {formatNumber(basicDroneCost)} chatarra</p>
              <p>🏗️ Flota: {drones.basic} | 📦 En cola: {queues.basic.queue}</p>
            </div>
            <div className="controls-container">
              <QueueControls queue={queues.basic} itemName='basic' onCancel={onCancel} />
              <DismantleControls upgrades={upgrades} droneType='basic' onDismantle={onDismantle} droneCount={drones.basic} buyAmount={buyAmount} />
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
          <img src={droneBasicImg} alt="Dron Básico" className="drone-item-image" />
        </div>

        {/* Dron Medio */}
        <div className={`drone-item ${scrap >= mediumDroneCost && drones.basic >= 5 ? 'unlocked' : ''} ${drones.basic >= 5 ? '' : 'locked'}`}>
          <div className="drone-item-content">
            <div className="drone-info">
              <h4 className="drone-title" style={{ color: '#06B6D4' }}>Dron Medio de Reciclado (DMR)</h4>
              <p>📊 Producción: +{formatNumber(5)} chatarra/segundo</p>
              <p>⚡ Consumo: {formatNumber(3)} energía</p>
              <p>💰 Coste: {formatNumber(mediumDroneCost)} chatarra</p>
              <p>🏗️ Flota: {drones.medium} | 📦 En cola: {queues.medium.queue}</p>
              <p>📋 Requisitos: 5 Drones Básicos</p>
            </div>
            <div className="controls-container">
              <QueueControls queue={queues.medium} itemName='medium' onCancel={onCancel} />
              <DismantleControls upgrades={upgrades} droneType='medium' onDismantle={onDismantle} droneCount={drones.medium} buyAmount={buyAmount} />
            </div>
            <BotonConTooltip 
              onClick={onBuildMediumDrone} 
              disabled={scrap < mediumDroneCost || drones.basic < 5} 
              tooltipText={getTooltipText([{ amount: mediumDroneCost, current: scrap, text: 'Chatarra' }, { amount: 5, current: drones.basic, text: 'Drones Básicos' }])} 
              className={`build-button ${scrap >= mediumDroneCost && drones.basic >= 5 ? 'unlocked' : ''}`}
            >
              Encargar Dron Medio {buyAmount === 'max' && `(${mediumDroneMax})`}
            </BotonConTooltip>
            {drones.basic < 5 && <p className="requirement-warning">⚠️ Necesitas 5 Drones Básicos para desbloquear</p>}
          </div>
          <img src={droneMediumImg} alt="Dron Medio" className="drone-item-image" />
        </div>

        {/* Dron Avanzado */}
        <div className={`drone-item ${scrap >= advancedDroneCost && drones.medium >= 3 ? 'unlocked' : ''} ${drones.medium >= 3 ? '' : 'locked'}`}>
          <div className="drone-item-content">
            <div className="drone-info">
              <h4 className="drone-title" style={{ color: '#22C55E' }}>Dron Avanzado de Reciclado (DAR)</h4>
              <p>📊 Producción: +{formatNumber(20)} chatarra/segundo</p>
              <p>⚡ Consumo: {formatNumber(5)} energía</p>
              <p>💰 Coste: {formatNumber(advancedDroneCost)} chatarra</p>
              <p>🏗️ Flota: {drones.advanced} | 📦 En cola: {queues.advanced.queue}</p>
              <p>📋 Requisitos: 3 Drones Medios</p>
            </div>
            <div className="controls-container">
              <QueueControls queue={queues.advanced} itemName='advanced' onCancel={onCancel} />
              <DismantleControls upgrades={upgrades} droneType='advanced' onDismantle={onDismantle} droneCount={drones.advanced} buyAmount={buyAmount} />
            </div>
            <BotonConTooltip 
              onClick={onBuildAdvancedDrone} 
              disabled={scrap < advancedDroneCost || drones.medium < 3} 
              tooltipText={getTooltipText([{ amount: advancedDroneCost, current: scrap, text: 'Chatarra' }, { amount: 3, current: drones.medium, text: 'Drones Medios' }])} 
              className={`build-button ${scrap >= advancedDroneCost && drones.medium >= 3 ? 'unlocked' : ''}`}
            >
              Encargar Dron Avanzado {buyAmount === 'max' && `(${advancedDroneMax})`}
            </BotonConTooltip>
            {drones.medium < 3 && <p className="requirement-warning">⚠️ Necesitas 3 Drones Medios para desbloquear</p>}
          </div>
          <img src={droneAdvancedImg} alt="Dron Avanzado" className="drone-item-image" />
        </div>
      </div>

      {/* DRONES DE EXPEDICIÓN */}
      <div className="drone-category" style={{ borderColor: '#10B981' }}>
        <h3 style={{ color: '#10B981' }}>🧭 DRONES DE EXPEDICIÓN</h3>
        
                        {/* Dron de Expedición */}
        <div className={`drone-item ${scrap >= expeditionDroneCost.scrap && metalRefinado >= expeditionDroneCost.metal && drones.advanced >= 2 ? 'unlocked' : ''} ${drones.advanced >= 2 ? '' : 'locked'}`}>
          <div className="drone-item-content">
            <div className="drone-info">
              <h4 className="drone-title" style={{ color: '#10B981' }}>Dron de Expedición (DE-1)</h4>
              <p>📊 Función: Realiza expediciones para obtener recursos especiales</p>
              <p>⚡ Consumo: {formatNumber(2)} energía (en expediciones)</p>
              <p>💰 Coste: {formatNumber(expeditionDroneCost.scrap)} chatarra, {formatNumber(expeditionDroneCost.metal)} metal refinado</p>
              <p>📋 Requisitos: 2 Drones Avanzados</p>
              <p>🏗️ Flota: {drones.expeditionDrone} | 📦 En cola: {queues.expeditionDrone.queue}</p>
            </div>
            <div className="controls-container">
              <QueueControls queue={queues.expeditionDrone} itemName='expedition' onCancel={onCancel} />
              <DismantleControls upgrades={upgrades} droneType='expedition' onDismantle={onDismantle} droneCount={drones.expeditionDrone} buyAmount={buyAmount} />
            </div>
            <BotonConTooltip 
              onClick={onBuildExpeditionDrone}
              disabled={scrap < expeditionDroneCost.scrap || metalRefinado < expeditionDroneCost.metal || drones.advanced < 2}
              tooltipText={getTooltipText([
                { amount: expeditionDroneCost.scrap, current: scrap, text: 'Chatarra' },
                { amount: expeditionDroneCost.metal, current: metalRefinado, text: 'Metal Refinado' },
                { amount: 2, current: drones.advanced, text: 'Drones Avanzados' }
              ])} 
              className={`build-button ${scrap >= expeditionDroneCost.scrap && metalRefinado >= expeditionDroneCost.metal && drones.advanced >= 2 ? 'unlocked' : ''}`}
            >
              Encargar Dron de Expedición {buyAmount === 'max' && `(${expeditionDroneMax})`}
            </BotonConTooltip>
            {drones.advanced < 2 && <p className="requirement-warning">⚠️ Necesitas 2 Drones Avanzados para desbloquear</p>}
          </div>
          <img src={droneExpeditionImg} alt="Dron de Expedición" className="drone-item-image" />
        </div>

        {/* Dron de Expedición v2 */}
        <div className={`drone-item ${scrap >= expeditionV2DroneCost.scrap && metalRefinado >= expeditionV2DroneCost.metal && drones.expeditionDrone >= 5 ? 'unlocked' : ''} ${drones.expeditionDrone >= 5 ? '' : 'locked'}`}>
          <div className="drone-item-content">
            <div className="drone-info">
              <h4 className="drone-title" style={{ color: '#059669' }}>Dron de Expedición v2 (DE-2)</h4>
              <p>📊 Función: Realiza expediciones avanzadas para obtener recursos raros</p>
              <p>⚡ Consumo: {formatNumber(5)} energía (en expediciones)</p>
              <p>💰 Coste: {formatNumber(expeditionV2DroneCost.scrap)} chatarra, {formatNumber(expeditionV2DroneCost.metal)} metal refinado</p>
              <p>📋 Requisitos: 5 Drones de Expedición</p>
              <p>🏗️ Flota: {drones.expeditionV2Drone} | 📦 En cola: {queues.expeditionV2Drone.queue}</p>
            </div>
            <div className="controls-container">
              <QueueControls queue={queues.expeditionV2Drone} itemName='expeditionV2' onCancel={onCancel} />
              <DismantleControls upgrades={upgrades} droneType='expeditionV2' onDismantle={onDismantle} droneCount={drones.expeditionV2Drone} buyAmount={buyAmount} />
            </div>
            <BotonConTooltip
              onClick={onBuildExpeditionV2Drone}
              disabled={scrap < expeditionV2DroneCost.scrap || metalRefinado < expeditionV2DroneCost.metal || drones.expeditionDrone < 5}
              tooltipText={getTooltipText([
                { amount: expeditionV2DroneCost.scrap, current: scrap, text: 'Chatarra' },
                { amount: expeditionV2DroneCost.metal, current: metalRefinado, text: 'Metal Refinado' },
                { amount: 5, current: drones.expeditionDrone, text: 'Drones de Expedición' }
              ])}
              className={`build-button ${scrap >= expeditionV2DroneCost.scrap && metalRefinado >= expeditionV2DroneCost.metal && drones.expeditionDrone >= 5 ? 'unlocked' : ''}`}
            >
              Encargar Dron de Expedición v2 {buyAmount === 'max' && `(${expeditionV2DroneMax})`}
            </BotonConTooltip>
                        {drones.expeditionDrone < 5 && <p className="requirement-warning">⚠️ Necesitas 5 Drones de Expedición para desbloquear</p>}
          </div>
          <img src={droneExpeditionV2Img} alt="Dron de Expedición v2" className="drone-item-image" />
        </div>
      </div>
      
      {/* DRONES REFORZADOS */}
      {(upgrades.reinforcedBasicDrones > 0 || upgrades.reinforcedMediumDrones > 0 || upgrades.reinforcedAdvancedDrones > 0) && (
        <div className="drone-category" style={{ borderColor: '#8B5CF6' }}>
          <h3 style={{ color: '#8B5CF6' }}>🛡️ DRONES REFORZADOS</h3>
          
                              {/* Dron Básico Reforzado */}
          {upgrades.reinforcedBasicDrones > 0 && (
            <div className={`drone-item ${scrap >= reinforcedBasicCost.scrap && metalRefinado >= reinforcedBasicCost.metal ? 'unlocked' : ''}`}>
              <div className="drone-item-content">
                <div className="drone-info">
                  <h4 className="drone-title" style={{ color: '#A78BFA' }}>Dron Básico Reforzado (DBR-F)</h4>
                  <p>📊 Producción: +{formatNumber(8)} chatarra/segundo</p>
                  <p>⚡ Consumo: {formatNumber(3)} energía</p>
                  <p>💰 Coste: {formatNumber(reinforcedBasicCost.scrap)} chatarra, {formatNumber(reinforcedBasicCost.metal)} metal refinado</p>
                  <p>🏗️ Flota: {drones.reinforcedBasic} | 📦 En cola: {queues.reinforcedBasic.queue}</p>
                </div>
                <div className="controls-container">
                  <QueueControls queue={queues.reinforcedBasic} itemName='reinforcedBasic' onCancel={onCancel} />
                  <DismantleControls upgrades={upgrades} droneType='reinforcedBasic' onDismantle={onDismantle} droneCount={drones.reinforcedBasic} buyAmount={buyAmount} />
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
              <img src={droneReinforcedBasicImg} alt="Dron Básico Reforzado" className="drone-item-image" />
            </div>
          )}

          {/* Dron Medio Reforzado */}
          {upgrades.reinforcedMediumDrones > 0 && (
            <div className={`drone-item ${scrap >= reinforcedMediumCost.scrap && metalRefinado >= reinforcedMediumCost.metal ? 'unlocked' : ''}`}>
              <div className="drone-item-content">
                <div className="drone-info">
                  <h4 className="drone-title" style={{ color: '#A78BFA' }}>Dron Medio Reforzado (DMR-F)</h4>
                  <p>📊 Producción: +{formatNumber(25)} chatarra/segundo</p>
                  <p>⚡ Consumo: {formatNumber(6)} energía</p>
                  <p>💰 Coste: {formatNumber(reinforcedMediumCost.scrap)} chatarra, {formatNumber(reinforcedMediumCost.metal)} metal refinado</p>
                  <p>🏗️ Flota: {drones.reinforcedMedium} | 📦 En cola: {queues.reinforcedMedium.queue}</p>
                </div>
                <div className="controls-container">
                  <QueueControls queue={queues.reinforcedMedium} itemName='reinforcedMedium' onCancel={onCancel} />
                  <DismantleControls upgrades={upgrades} droneType='reinforcedMedium' onDismantle={onDismantle} droneCount={drones.reinforcedMedium} buyAmount={buyAmount} />
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
              <img src={droneReinforcedMediumImg} alt="Dron Medio Reforzado" className="drone-item-image" />
            </div>
          )}

          {/* Dron Avanzado Reforzado */}
          {upgrades.reinforcedAdvancedDrones > 0 && (
            <div className={`drone-item ${scrap >= reinforcedAdvancedCost.scrap && metalRefinado >= reinforcedAdvancedCost.metal ? 'unlocked' : ''}`}>
              <div className="drone-item-content">
                <div className="drone-info">
                  <h4 className="drone-title" style={{ color: '#A78BFA' }}>Dron Avanzado Reforzado (DAR-F)</h4>
                  <p>📊 Producción: +{formatNumber(80)} chatarra/segundo</p>
                  <p>⚡ Consumo: {formatNumber(12)} energía</p>
                  <p>💰 Coste: {formatNumber(reinforcedAdvancedCost.scrap)} chatarra, {formatNumber(reinforcedAdvancedCost.metal)} metal refinado</p>
                  <p>🏗️ Flota: {drones.reinforcedAdvanced} | 📦 En cola: {queues.reinforcedAdvanced.queue}</p>
                </div>
                <div className="controls-container">
                  <QueueControls queue={queues.reinforcedAdvanced} itemName='reinforcedAdvanced' onCancel={onCancel} />
                  <DismantleControls upgrades={upgrades} droneType='reinforcedAdvanced' onDismantle={onDismantle} droneCount={drones.reinforcedAdvanced} buyAmount={buyAmount} />
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
              <img src={droneReinforcedAdvancedImg} alt="Dron Avanzado Reforzado" className="drone-item-image" />
            </div>
          )}
        </div>
      )}
      
      {/* DRONES DE ÉLITE */}
      {(upgrades.golemChassis > 0 || (upgrades as any).wyrm > 0) && (
        <div className="drone-category" style={{ borderColor: '#F43F5E' }}>
          <h3 style={{ color: '#F43F5E' }}>⚔️ DRONES DE ÉLITE</h3>
          
                    {/* Dron Golem */}
          {upgrades.golemChassis > 0 && (
            <div className={`drone-item ${scrap >= golemCost.scrap && aceroEstructural >= golemCost.steel && drones.reinforcedAdvanced >= 5 ? 'unlocked' : ''} ${drones.reinforcedAdvanced >= 5 ? '' : 'locked'}`}>
              <div className="drone-item-content">
                <div className="drone-info">
                                                      <p><strong>Descripción:</strong> Un chasis masivo diseñado para procesar chatarra. Consume Chatarra para producir Metal Refinado de forma pasiva.</p>
                  <p>⚡ Consumo: 50 energía/segundo</p>
                  <p>Consume: 500 Chatarra/s | Produce: 0.5 Metal Refinado/s</p>
                  <p>💰 Coste: {formatNumber(golemCost.scrap)} chatarra, {formatNumber(golemCost.steel)} acero estructural</p>
                  <p>📋 Requisitos: 5 Drones Avanzados Reforzados Y la investigación "Chasis Golem"</p>
                  <p>🏗️ Flota: {drones.golem} | 📦 En cola: {queues.golem.queue}</p>
                </div>
                <div className="controls-container">
                  <QueueControls queue={queues.golem} itemName='golem' onCancel={onCancel} />
                  <DismantleControls upgrades={upgrades} droneType='golem' onDismantle={onDismantle} droneCount={drones.golem} buyAmount={buyAmount} />
                </div>
                                <BotonConTooltip
                  onClick={onBuildGolemDrone}
                  disabled={scrap < golemCost.scrap || aceroEstructural < golemCost.steel || drones.reinforcedAdvanced < 5 || upgrades.golemChassis === 0}
                  tooltipText={getTooltipText([
                    { amount: golemCost.scrap, current: scrap, text: 'Chatarra' },
                    { amount: golemCost.steel, current: aceroEstructural, text: 'Acero Estructural' },
                    { amount: 5, current: drones.reinforcedAdvanced, text: 'Drones Avanzados Reforzados'},
                    { amount: 1, current: upgrades.golemChassis, text: 'Investigación: Chasis Golem'}
                  ])}
                  className={`build-button ${scrap >= golemCost.scrap && aceroEstructural >= golemCost.steel && drones.reinforcedAdvanced >= 5 && upgrades.golemChassis > 0 ? 'unlocked' : ''}`}
                >
                                    Encargar Dron Golem {buyAmount === 'max' && `(${golemMax})`}
                </BotonConTooltip>
              </div>
              <img src={droneGolemImg} alt="Dron Golem" className="drone-item-image" />
            </div>
          )}
        </div>
      )}

      {/* Dron Wyrm */}
      {upgrades.golemChassis > 0 && drones.golem >= 1 && (
        <div className={`drone-item ${scrap >= wyrmCost.scrap && aceroEstructural >= wyrmCost.steel && drones.golem >= 1 ? 'unlocked' : ''} ${drones.golem >= 1 ? '' : 'locked'}`}>
          <div className="drone-item-content">
            <div className="drone-info">
                            <h4 className="drone-title" style={{ color: '#F43F5E' }}>Dron Wyrm (DW-1)</h4>
              <p><strong>Descripción:</strong> Una maravilla de la ingeniería. Consume Chatarra y Metal Refinado para sintetizar Acero Estructural de forma pasiva.</p>
              <p>⚡ Consumo: 200 energía/segundo</p>
              <p>Consume: 1000 Chatarra/s y 1 Metal Refinado/s | Produce: 0.1 Acero Estructural/s</p>
              <p>💰 Coste: {formatNumber(wyrmCost.scrap)} chatarra, {formatNumber(wyrmCost.steel)} acero</p>
              <p>📋 Requisitos: 1 Dron Golem</p>
              <p>🏗️ Flota: {drones.wyrm} | 📦 En cola: {queues.wyrm.queue}</p>
            </div>
            <div className="controls-container">
              <QueueControls queue={queues.wyrm} itemName='wyrm' onCancel={onCancel} />
              <DismantleControls upgrades={upgrades} droneType='wyrm' onDismantle={onDismantle} droneCount={drones.wyrm} buyAmount={buyAmount} />
            </div>
            <BotonConTooltip
              onClick={onBuildWyrm}
              disabled={scrap < wyrmCost.scrap || aceroEstructural < wyrmCost.steel || drones.golem < 1}
              tooltipText={getTooltipText([
                { amount: wyrmCost.scrap, current: scrap, text: 'Chatarra' },
                { amount: wyrmCost.steel, current: aceroEstructural, text: 'Acero' },
                { amount: 1, current: drones.golem, text: 'Drones Golem' }
              ])}
              className={`build-button ${scrap >= wyrmCost.scrap && aceroEstructural >= wyrmCost.steel && drones.golem >= 1 ? 'unlocked' : ''}`}
            >
                            Encargar Dron Wyrm {buyAmount === 'max' && `(${wyrmMax})`}
            </BotonConTooltip>
          </div>
          <img src={droneWyrmImg} alt="Dron Wyrm" className="drone-item-image" />
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

