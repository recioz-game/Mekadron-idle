import React from 'react';
import { GameState, DroneType } from '../types/gameState';
import './Workshop.css'; // Importar el archivo CSS
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';
import QueueControls from './QueueControls';
import { droneData } from '../data/droneData';
import { useDragToScroll } from '../hooks/useDragToScroll';

const ProgressBar = ({ progress, time }: { progress: number; time: number }) => (
  <div className="progress-bar-container">
    <div 
      className="progress-bar"
      style={{ width: `${(progress / time) * 100}%` }} 
    />
  </div>
);

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
  resources: GameState['resources'];
  bodegaResources: GameState['vindicator']['bodegaResources'];
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
    onDismantle: (droneType: DroneType, amount: number | 'max') => void;
  onRetrofit: (fromDrone: DroneType, toDrone: DroneType) => void;
  buyAmount: number | 'max';
  onSetBuyAmount: (amount: number | 'max') => void;
    onClose: () => void;
  onCancel: (itemName: string, amount: number | 'all') => void;
  numberFormat: 'full' | 'abbreviated' | 'scientific';
}

const Workshop: React.FC<WorkshopProps> = React.memo(({ 
  resources,
  bodegaResources,
  drones, queues,
  upgrades,
  onBuildBasicDrone, onBuildMediumDrone, onBuildAdvancedDrone, onBuildReinforcedBasic, onBuildReinforcedMedium, onBuildReinforcedAdvanced, onBuildGolemDrone, onBuildExpeditionDrone, onBuildExpeditionV2Drone, onBuildWyrm,
        onDismantle, onRetrofit,
  buyAmount, onSetBuyAmount, onClose, onCancel, numberFormat
}) => {
    const { scrap } = resources;
  const { metalRefinado, aceroEstructural } = bodegaResources || {};
    const scrollRef = useDragToScroll<HTMLDivElement>();

  const basicDroneCost = 20;
  const mediumDroneCost = 300;
  const advancedDroneCost = 1500;
  const reinforcedBasicCost = { scrap: 600, metal: 5 };
  const reinforcedMediumCost = { scrap: 2500, metal: 15 };
  const reinforcedAdvancedCost = { scrap: 7000, metal: 30 };
  const expeditionDroneCost = { scrap: 3000, metal: 20 };
  const expeditionV2DroneCost = { scrap: 15000, metal: 100 }; // 5x el costo original
  const golemCost = { scrap: 75000, steel: 5 };
  const wyrmCost = { scrap: 200000, steel: 15 };
  
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
  
      const getTooltipText = (requirements: { resource?: string, amount: number, current: number, text: string }[], format: 'full' | 'abbreviated' | 'scientific'): string => {
    const missing = requirements.filter(req => req.current < req.amount);
    if (missing.length === 0) return '';
    return 'Requiere: ' + missing.map(req => `${req.text} (${formatNumber(req.amount, format)})`).join(', ');
  };

  

            return (
    <div className="workshop-container">
      <div className="workshop-content-area" ref={scrollRef}>
        <button onClick={onClose} className="close-button">
          &times;
        </button>
              <div className="drone-category" style={{ borderColor: '#F59E0B' }}>
        <h3 style={{ color: '#F59E0B' }}>DRONES DE RECICLADO</h3>
        <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />
        
                                                        {/* Dron Básico */}
        <div className={`drone-item ${scrap >= basicDroneCost ? 'unlocked' : ''}`}>
          <div className="drone-item-content">
            <div className="drone-info">
                            <h4 className="drone-title" style={{ color: '#F59E0B' }}>Dron Básico de Reciclado (DBR)</h4>
              <p>Producción: +{formatNumber(1, numberFormat)} chatarra/segundo</p>
              <p>Consumo: {formatNumber(1, numberFormat)} energía</p>
              <p>Coste: {formatNumber(basicDroneCost, numberFormat)} chatarra</p>
              <p>Flota: {drones.basic} | En cola: {queues.basic.queue}</p>
            </div>
            <div className="controls-container">
              <DismantleControls upgrades={upgrades} droneType='basic' onDismantle={onDismantle} droneCount={drones.basic} buyAmount={buyAmount} />
              <RetrofitControls resources={resources} bodegaResources={bodegaResources} upgrades={upgrades} droneType='basic' toDrone='medium' onRetrofit={onRetrofit} droneCount={drones.basic} numberFormat={numberFormat} />
            </div>
            
            {/* Barra de progreso y tiempo (si hay cola) */}
            {queues.basic.queue > 0 && (
              <div>
                <p className="time-info">T/U: {queues.basic.time}s | En cola: {queues.basic.queue}</p>
                <ProgressBar progress={queues.basic.progress} time={queues.basic.time} />
              </div>
            )}
            
            <div className="build-actions">
              <BotonConTooltip 
                onClick={onBuildBasicDrone} 
                disabled={scrap < basicDroneCost} 
                tooltipText={getTooltipText([{ resource: 'scrap', amount: basicDroneCost, current: scrap, text: 'Chatarra' }], numberFormat)} 
                className={`build-button ${scrap >= basicDroneCost ? 'unlocked' : ''}`}
              >
                Encargar Dron Básico {buyAmount === 'max' && `(${basicDroneMax})`}
              </BotonConTooltip>
              {queues.basic.queue > 0 && (
                <QueueControls itemName='basic' onCancel={onCancel} />
              )}
            </div>
          </div>
          <img src={droneBasicImg} alt="Dron Básico" className="drone-item-image" />
        </div>

                        {/* Dron Medio */}
        <div className={`drone-item ${scrap >= mediumDroneCost && drones.basic >= 10 ? 'unlocked' : ''} ${drones.basic >= 10 ? '' : 'locked'}`}>
          <div className="drone-item-content">
                        <div className="drone-info">
              <h4 className="drone-title" style={{ color: '#06B6D4' }}>Dron Medio de Reciclado (DMR)</h4>
              <p>Producción: +{formatNumber(5, numberFormat)} chatarra/segundo</p>
              <p>Consumo: {formatNumber(3, numberFormat)} energía</p>
              <p>Coste: {formatNumber(mediumDroneCost, numberFormat)} chatarra</p>
              <p>Flota: {drones.medium} | En cola: {queues.medium.queue}</p>
              <p>Requisitos: 10 Drones Básicos</p>
            </div>
            <div className="controls-container">
              <DismantleControls upgrades={upgrades} droneType='medium' onDismantle={onDismantle} droneCount={drones.medium} buyAmount={buyAmount} />
              <RetrofitControls resources={resources} bodegaResources={bodegaResources} upgrades={upgrades} droneType='medium' toDrone='advanced' onRetrofit={onRetrofit} droneCount={drones.medium} numberFormat={numberFormat} />
            </div>
            
            {/* Barra de progreso y tiempo (si hay cola) */}
            {queues.medium.queue > 0 && (
              <div>
                <p className="time-info">T/U: {queues.medium.time}s | En cola: {queues.medium.queue}</p>
                <ProgressBar progress={queues.medium.progress} time={queues.medium.time} />
              </div>
            )}

            <div className="build-actions">
              <BotonConTooltip 
                onClick={onBuildMediumDrone} 
                disabled={scrap < mediumDroneCost || drones.basic < 10} 
                tooltipText={getTooltipText([{ amount: mediumDroneCost, current: scrap, text: 'Chatarra' }, { amount: 10, current: drones.basic, text: 'Drones Básicos' }], numberFormat)} 
                className={`build-button ${scrap >= mediumDroneCost && drones.basic >= 10 ? 'unlocked' : ''}`}
              >
                Encargar Dron Medio {buyAmount === 'max' && `(${mediumDroneMax})`}
              </BotonConTooltip>
              {queues.medium.queue > 0 && (
                <QueueControls itemName='medium' onCancel={onCancel} />
              )}
            </div>
            {drones.basic < 10 && <p className="requirement-warning">⚠️ Necesitas 10 Drones Básicos para desbloquear</p>}
          </div>
          <img src={droneMediumImg} alt="Dron Medio" className="drone-item-image" />
        </div>

        {/* Dron Avanzado */}
        <div className={`drone-item ${scrap >= advancedDroneCost && drones.medium >= 3 ? 'unlocked' : ''} ${drones.medium >= 3 ? '' : 'locked'}`}>
          <div className="drone-item-content">
            <div className="drone-info">
                            <h4 className="drone-title" style={{ color: '#22C55E' }}>Dron Avanzado de Reciclado (DAR)</h4>
              <p>Producción: +{formatNumber(20, numberFormat)} chatarra/segundo</p>
              <p>Consumo: {formatNumber(5, numberFormat)} energía</p>
              <p>Coste: {formatNumber(advancedDroneCost, numberFormat)} chatarra</p>
              <p>Flota: {drones.advanced} | En cola: {queues.advanced.queue}</p>
              <p>Requisitos: 3 Drones Medios</p>
            </div>
            <div className="controls-container">
              <DismantleControls upgrades={upgrades} droneType='advanced' onDismantle={onDismantle} droneCount={drones.advanced} buyAmount={buyAmount} />
            </div>
            
            {/* Barra de progreso y tiempo (si hay cola) */}
            {queues.advanced.queue > 0 && (
              <div>
                <p className="time-info">T/U: {queues.advanced.time}s | En cola: {queues.advanced.queue}</p>
                <ProgressBar progress={queues.advanced.progress} time={queues.advanced.time} />
              </div>
            )}

            <div className="build-actions">
              <BotonConTooltip 
                onClick={onBuildAdvancedDrone} 
                disabled={scrap < advancedDroneCost || drones.medium < 3} 
                tooltipText={getTooltipText([{ amount: advancedDroneCost, current: scrap, text: 'Chatarra' }, { amount: 3, current: drones.medium, text: 'Drones Medios' }], numberFormat)} 
                className={`build-button ${scrap >= advancedDroneCost && drones.medium >= 3 ? 'unlocked' : ''}`}
              >
                Encargar Dron Avanzado {buyAmount === 'max' && `(${advancedDroneMax})`}
              </BotonConTooltip>
              {queues.advanced.queue > 0 && (
                <QueueControls itemName='advanced' onCancel={onCancel} />
              )}
            </div>
            {drones.medium < 3 && <p className="requirement-warning">⚠️ Necesitas 3 Drones Medios para desbloquear</p>}
          </div>
          <img src={droneAdvancedImg} alt="Dron Avanzado" className="drone-item-image" />
        </div>
      </div>

      {/* DRONES DE EXPEDICIÓN */}
      <div className="drone-category" style={{ borderColor: '#10B981' }}>
        <h3 style={{ color: '#10B981' }}>DRONES DE EXPEDICIÓN</h3>
        
                        {/* Dron de Expedición */}
        <div className={`drone-item ${scrap >= expeditionDroneCost.scrap && metalRefinado >= expeditionDroneCost.metal && drones.advanced >= 2 ? 'unlocked' : ''} ${drones.advanced >= 2 ? '' : 'locked'}`}>
          <div className="drone-item-content">
            <div className="drone-info">
                            <h4 className="drone-title" style={{ color: '#10B981' }}>Dron de Expedición (DE-1)</h4>
              <p>Función: Realiza expediciones para obtener recursos especiales</p>
              <p>Consumo: {formatNumber(2, numberFormat)} energía (en expediciones)</p>
              <p>Coste: {formatNumber(expeditionDroneCost.scrap, numberFormat)} chatarra, {formatNumber(expeditionDroneCost.metal, numberFormat)} metal refinado</p>
              <p>Requisitos: 2 Drones Avanzados</p>
              <p>Flota: {drones.expeditionDrone} | En cola: {queues.expeditionDrone.queue}</p>
            </div>
            <div className="controls-container">
              <DismantleControls upgrades={upgrades} droneType='expeditionDrone' onDismantle={onDismantle} droneCount={drones.expeditionDrone} buyAmount={buyAmount} />
            </div>
            
            {/* Barra de progreso y tiempo (si hay cola) */}
            {queues.expeditionDrone.queue > 0 && (
              <div>
                <p className="time-info">T/U: {queues.expeditionDrone.time}s | En cola: {queues.expeditionDrone.queue}</p>
                <ProgressBar progress={queues.expeditionDrone.progress} time={queues.expeditionDrone.time} />
              </div>
            )}

            <div className="build-actions">
                            <BotonConTooltip 
                onClick={onBuildExpeditionDrone}
                disabled={scrap < expeditionDroneCost.scrap || metalRefinado < expeditionDroneCost.metal || drones.advanced < 2}
                tooltipText={getTooltipText([
                  { amount: expeditionDroneCost.scrap, current: scrap, text: 'Chatarra' },
                  { amount: expeditionDroneCost.metal, current: metalRefinado, text: 'Metal Refinado' },
                  { amount: 2, current: drones.advanced, text: 'Drones Avanzados' }
                ], numberFormat)} 
                className={`build-button ${scrap >= expeditionDroneCost.scrap && metalRefinado >= expeditionDroneCost.metal && drones.advanced >= 2 ? 'unlocked' : ''}`}
              >
                Encargar Dron de Expedición {buyAmount === 'max' && `(${expeditionDroneMax})`}
              </BotonConTooltip>
              {queues.expeditionDrone.queue > 0 && (
                <QueueControls itemName='expeditionDrone' onCancel={onCancel} />
              )}
            </div>
            {drones.advanced < 2 && <p className="requirement-warning">⚠️ Necesitas 2 Drones Avanzados para desbloquear</p>}
          </div>
          <img src={droneExpeditionImg} alt="Dron de Expedición" className="drone-item-image" />
        </div>

        {/* Dron de Expedición v2 */}
        <div className={`drone-item ${scrap >= expeditionV2DroneCost.scrap && metalRefinado >= expeditionV2DroneCost.metal && drones.expeditionDrone >= 5 ? 'unlocked' : ''} ${drones.expeditionDrone >= 5 ? '' : 'locked'}`}>
          <div className="drone-item-content">
            <div className="drone-info">
                            <h4 className="drone-title" style={{ color: '#059669' }}>Dron de Expedición v2 (DE-2)</h4>
              <p>Función: Realiza expediciones avanzadas para obtener recursos raros</p>
              <p>Consumo: {formatNumber(5, numberFormat)} energía (en expediciones)</p>
              <p>Coste: {formatNumber(expeditionV2DroneCost.scrap, numberFormat)} chatarra, {formatNumber(expeditionV2DroneCost.metal, numberFormat)} metal refinado</p>
              <p>Requisitos: 5 Drones de Expedición</p>
              <p>Flota: {drones.expeditionV2Drone} | En cola: {queues.expeditionV2Drone.queue}</p>
            </div>
            <div className="controls-container">
              <DismantleControls upgrades={upgrades} droneType='expeditionV2Drone' onDismantle={onDismantle} droneCount={drones.expeditionV2Drone} buyAmount={buyAmount} />
            </div>
            
            {/* Barra de progreso y tiempo (si hay cola) */}
            {queues.expeditionV2Drone.queue > 0 && (
              <div>
                <p className="time-info">T/U: {queues.expeditionV2Drone.time}s | En cola: {queues.expeditionV2Drone.queue}</p>
                <ProgressBar progress={queues.expeditionV2Drone.progress} time={queues.expeditionV2Drone.time} />
              </div>
            )}

            <div className="build-actions">
                            <BotonConTooltip
                onClick={onBuildExpeditionV2Drone}
                disabled={scrap < expeditionV2DroneCost.scrap || metalRefinado < expeditionV2DroneCost.metal || drones.expeditionDrone < 5}
                tooltipText={getTooltipText([
                  { amount: expeditionV2DroneCost.scrap, current: scrap, text: 'Chatarra' },
                  { amount: expeditionV2DroneCost.metal, current: metalRefinado, text: 'Metal Refinado' },
                  { amount: 5, current: drones.expeditionDrone, text: 'Drones de Expedición' }
                ], numberFormat)}
                className={`build-button ${scrap >= expeditionV2DroneCost.scrap && metalRefinado >= expeditionV2DroneCost.metal && drones.expeditionDrone >= 5 ? 'unlocked' : ''}`}
              >
                Encargar Dron de Expedición v2 {buyAmount === 'max' && `(${expeditionV2DroneMax})`}
              </BotonConTooltip>
              {queues.expeditionV2Drone.queue > 0 && (
                <QueueControls itemName='expeditionV2Drone' onCancel={onCancel} />
              )}
            </div>
                        {drones.expeditionDrone < 5 && <p className="requirement-warning">⚠️ Necesitas 5 Drones de Expedición para desbloquear</p>}
          </div>
          <img src={droneExpeditionV2Img} alt="Dron de Expedición v2" className="drone-item-image" />
        </div>
      </div>
      
      {/* DRONES REFORZADOS */}
      {(upgrades.reinforcedBasicDrones > 0 || upgrades.reinforcedMediumDrones > 0 || upgrades.reinforcedAdvancedDrones > 0) && (
        <div className="drone-category" style={{ borderColor: '#8B5CF6' }}>
          <h3 style={{ color: '#8B5CF6' }}>DRONES REFORZADOS</h3>
          
                              {/* Dron Básico Reforzado */}
          {upgrades.reinforcedBasicDrones > 0 && (
            <div className={`drone-item ${scrap >= reinforcedBasicCost.scrap && metalRefinado >= reinforcedBasicCost.metal ? 'unlocked' : ''}`}>
              <div className="drone-item-content">
                <div className="drone-info">
                                    <h4 className="drone-title" style={{ color: '#A78BFA' }}>Dron Básico Reforzado (DBR-F)</h4>
                  <p>Producción: +{formatNumber(8, numberFormat)} chatarra/segundo</p>
                  <p>Consumo: {formatNumber(3, numberFormat)} energía</p>
                  <p>Coste: {formatNumber(reinforcedBasicCost.scrap, numberFormat)} chatarra, {formatNumber(reinforcedBasicCost.metal, numberFormat)} metal refinado</p>
                  <p>Flota: {drones.reinforcedBasic} | En cola: {queues.reinforcedBasic.queue}</p>
                </div>
                <div className="controls-container">
                  <DismantleControls upgrades={upgrades} droneType='reinforcedBasic' onDismantle={onDismantle} droneCount={drones.reinforcedBasic} buyAmount={buyAmount} />
                </div>
                
                {/* Barra de progreso y tiempo (si hay cola) */}
                {queues.reinforcedBasic.queue > 0 && (
                  <div>
                    <p className="time-info">T/U: {queues.reinforcedBasic.time}s | En cola: {queues.reinforcedBasic.queue}</p>
                    <ProgressBar progress={queues.reinforcedBasic.progress} time={queues.reinforcedBasic.time} />
                  </div>
                )}

                <div className="build-actions">
                  <BotonConTooltip
                    onClick={onBuildReinforcedBasic}
                    disabled={scrap < reinforcedBasicCost.scrap || metalRefinado < reinforcedBasicCost.metal}
                                      tooltipText={getTooltipText([
                    { amount: reinforcedBasicCost.scrap, current: scrap, text: 'Chatarra' },
                    { amount: reinforcedBasicCost.metal, current: metalRefinado, text: 'Metal Refinado' }
                  ], numberFormat)}
                    className={`build-button ${scrap >= reinforcedBasicCost.scrap && metalRefinado >= reinforcedBasicCost.metal ? 'unlocked' : ''}`}
                  >
                    Encargar Dron Básico Reforzado {buyAmount === 'max' && `(${reinforcedBasicMax})`}
                  </BotonConTooltip>
                  {queues.reinforcedBasic.queue > 0 && (
                    <QueueControls itemName='reinforcedBasic' onCancel={onCancel} />
                  )}
                </div>
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
                  <p>Producción: +{formatNumber(25, numberFormat)} chatarra/segundo</p>
                  <p>Consumo: {formatNumber(6, numberFormat)} energía</p>
                  <p>Coste: {formatNumber(reinforcedMediumCost.scrap, numberFormat)} chatarra, {formatNumber(reinforcedMediumCost.metal, numberFormat)} metal refinado</p>
                  <p>Flota: {drones.reinforcedMedium} | En cola: {queues.reinforcedMedium.queue}</p>
                </div>
                <div className="controls-container">
                  <DismantleControls upgrades={upgrades} droneType='reinforcedMedium' onDismantle={onDismantle} droneCount={drones.reinforcedMedium} buyAmount={buyAmount} />
                </div>
                
                {/* Barra de progreso y tiempo (si hay cola) */}
                {queues.reinforcedMedium.queue > 0 && (
                  <div>
                    <p className="time-info">T/U: {queues.reinforcedMedium.time}s | En cola: {queues.reinforcedMedium.queue}</p>
                    <ProgressBar progress={queues.reinforcedMedium.progress} time={queues.reinforcedMedium.time} />
                  </div>
                )}

                <div className="build-actions">
                  <BotonConTooltip
                    onClick={onBuildReinforcedMedium}
                    disabled={scrap < reinforcedMediumCost.scrap || metalRefinado < reinforcedMediumCost.metal}
                                      tooltipText={getTooltipText([
                    { amount: reinforcedMediumCost.scrap, current: scrap, text: 'Chatarra' },
                    { amount: reinforcedMediumCost.metal, current: metalRefinado, text: 'Metal Refinado' }
                  ], numberFormat)}
                    className={`build-button ${scrap >= reinforcedMediumCost.scrap && metalRefinado >= reinforcedMediumCost.metal ? 'unlocked' : ''}`}
                  >
                    Encargar Dron Medio Reforzado {buyAmount === 'max' && `(${reinforcedMediumMax})`}
                  </BotonConTooltip>
                  {queues.reinforcedMedium.queue > 0 && (
                    <QueueControls itemName='reinforcedMedium' onCancel={onCancel} />
                  )}
                </div>
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
                  <p>Producción: +{formatNumber(80, numberFormat)} chatarra/segundo</p>
                  <p>Consumo: {formatNumber(12, numberFormat)} energía</p>
                  <p>Coste: {formatNumber(reinforcedAdvancedCost.scrap, numberFormat)} chatarra, {formatNumber(reinforcedAdvancedCost.metal, numberFormat)} metal refinado</p>
                  <p>Flota: {drones.reinforcedAdvanced} | En cola: {queues.reinforcedAdvanced.queue}</p>
                </div>
                <div className="controls-container">
                  <DismantleControls upgrades={upgrades} droneType='reinforcedAdvanced' onDismantle={onDismantle} droneCount={drones.reinforcedAdvanced} buyAmount={buyAmount} />
                </div>
                
                {/* Barra de progreso y tiempo (si hay cola) */}
                {queues.reinforcedAdvanced.queue > 0 && (
                  <div>
                    <p className="time-info">T/U: {queues.reinforcedAdvanced.time}s | En cola: {queues.reinforcedAdvanced.queue}</p>
                    <ProgressBar progress={queues.reinforcedAdvanced.progress} time={queues.reinforcedAdvanced.time} />
                  </div>
                )}

                <div className="build-actions">
                  <BotonConTooltip
                    onClick={onBuildReinforcedAdvanced}
                    disabled={scrap < reinforcedAdvancedCost.scrap || metalRefinado < reinforcedAdvancedCost.metal}
                                      tooltipText={getTooltipText([
                    { amount: reinforcedAdvancedCost.scrap, current: scrap, text: 'Chatarra' },
                    { amount: reinforcedAdvancedCost.metal, current: metalRefinado, text: 'Metal Refinado' }
                  ], numberFormat)}
                    className={`build-button ${scrap >= reinforcedAdvancedCost.scrap && metalRefinado >= reinforcedAdvancedCost.metal ? 'unlocked' : ''}`}
                  >
                    Encargar Dron Avanzado Reforzado {buyAmount === 'max' && `(${reinforcedAdvancedMax})`}
                  </BotonConTooltip>
                  {queues.reinforcedAdvanced.queue > 0 && (
                    <QueueControls itemName='reinforcedAdvanced' onCancel={onCancel} />
                  )}
                </div>
              </div>
              <img src={droneReinforcedAdvancedImg} alt="Dron Avanzado Reforzado" className="drone-item-image" />
            </div>
          )}
        </div>
      )}
      
      {/* DRONES DE ÉLITE */}
      {(upgrades.golemChassis > 0 || (upgrades as any).wyrm > 0) && (
        <div className="drone-category" style={{ borderColor: '#F43F5E' }}>
          <h3 style={{ color: '#F43F5E' }}>DRONES DE ÉLITE</h3>
          
                    {/* Dron Golem */}
          {upgrades.golemChassis > 0 && (
            <div className={`drone-item ${scrap >= golemCost.scrap && aceroEstructural >= golemCost.steel && drones.reinforcedAdvanced >= 5 ? 'unlocked' : ''} ${drones.reinforcedAdvanced >= 5 ? '' : 'locked'}`}>
              <div className="drone-item-content">
                <div className="drone-info">
                                    <h4 className="drone-title" style={{ color: '#F43F5E' }}>Dron Golem (DG-1)</h4>
                                                      <p><strong>Descripción:</strong> Un chasis masivo diseñado para procesar chatarra. Consume Chatarra para producir Metal Refinado de forma pasiva.</p>
                  <p>Consumo: {formatNumber(50, numberFormat)} energía/segundo</p>
                  <p>Consume: {formatNumber(500, numberFormat)} Chatarra/s | Produce: {formatNumber(0.5, numberFormat)} Metal Refinado/s</p>
                  <p>Coste: {formatNumber(golemCost.scrap, numberFormat)} chatarra, {formatNumber(golemCost.steel, numberFormat)} acero estructural</p>
                  <p>Requisitos: 5 Drones Avanzados Reforzados Y la investigación "Chasis Golem"</p>
                  <p>Flota: {drones.golem} | En cola: {queues.golem.queue}</p>
                </div>
                <div className="controls-container">
                  <DismantleControls upgrades={upgrades} droneType='golem' onDismantle={onDismantle} droneCount={drones.golem} buyAmount={buyAmount} />
                </div>
                
                {/* Barra de progreso y tiempo (si hay cola) */}
                {queues.golem.queue > 0 && (
                  <div>
                    <p className="time-info">T/U: {queues.golem.time}s | En cola: {queues.golem.queue}</p>
                    <ProgressBar progress={queues.golem.progress} time={queues.golem.time} />
                  </div>
                )}

                <div className="build-actions">
                  <BotonConTooltip
                    onClick={onBuildGolemDrone}
                    disabled={scrap < golemCost.scrap || aceroEstructural < golemCost.steel || drones.reinforcedAdvanced < 5 || upgrades.golemChassis === 0}
                                      tooltipText={getTooltipText([
                    { amount: golemCost.scrap, current: scrap, text: 'Chatarra' },
                    { amount: golemCost.steel, current: aceroEstructural, text: 'Acero Estructural' },
                    { amount: 5, current: drones.reinforcedAdvanced, text: 'Drones Avanzados Reforzados'},
                    { amount: 1, current: upgrades.golemChassis, text: 'Investigación: Chasis Golem'}
                  ], numberFormat)}
                    className={`build-button ${scrap >= golemCost.scrap && aceroEstructural >= golemCost.steel && drones.reinforcedAdvanced >= 5 && upgrades.golemChassis > 0 ? 'unlocked' : ''}`}
                  >
                                      Encargar Dron Golem {buyAmount === 'max' && `(${golemMax})`}
                  </BotonConTooltip>
                  {queues.golem.queue > 0 && (
                    <QueueControls itemName='golem' onCancel={onCancel} />
                  )}
                </div>
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
              <p><strong>Descripción:</strong> Una maravilla de la ingeniería. Consume Chatarra para sintetizar Acero Estructural de forma pasiva.</p>
              <p>Consumo: {formatNumber(200, numberFormat)} energía/segundo</p>
                            <p>Consume: {formatNumber(1000, numberFormat)} Chatarra/s | Produce: {formatNumber(0.25, numberFormat)} Acero Estructural/s</p>
              <p>Coste: {formatNumber(wyrmCost.scrap, numberFormat)} chatarra, {formatNumber(wyrmCost.steel, numberFormat)} acero estructural</p>
              <p>Requisitos: 1 Dron Golem</p>
              <p>Flota: {drones.wyrm} | En cola: {queues.wyrm.queue}</p>
            </div>
            <div className="controls-container">
              <DismantleControls upgrades={upgrades} droneType='wyrm' onDismantle={onDismantle} droneCount={drones.wyrm} buyAmount={buyAmount} />
            </div>
            
            {/* Barra de progreso y tiempo (si hay cola) */}
            {queues.wyrm.queue > 0 && (
              <div>
                <p className="time-info">T/U: {queues.wyrm.time}s | En cola: {queues.wyrm.queue}</p>
                <ProgressBar progress={queues.wyrm.progress} time={queues.wyrm.time} />
              </div>
            )}

            <div className="build-actions">
              <BotonConTooltip
                onClick={onBuildWyrm}
                disabled={scrap < wyrmCost.scrap || aceroEstructural < wyrmCost.steel || drones.golem < 1}
                              tooltipText={getTooltipText([
                { amount: wyrmCost.scrap, current: scrap, text: 'Chatarra' },
                { amount: wyrmCost.steel, current: aceroEstructural, text: 'Acero' },
                { amount: 1, current: drones.golem, text: 'Drones Golem' }
              ], numberFormat)}
                className={`build-button ${scrap >= wyrmCost.scrap && aceroEstructural >= wyrmCost.steel && drones.golem >= 1 ? 'unlocked' : ''}`}
              >
                                          Encargar Dron Wyrm {buyAmount === 'max' && `(${wyrmMax})`}
              </BotonConTooltip>
              {queues.wyrm.queue > 0 && (
                <QueueControls itemName='wyrm' onCancel={onCancel} />
              )}
            </div>
          </div>
          <img src={droneWyrmImg} alt="Dron Wyrm" className="drone-item-image" />
        </div>
      )}
      </div>
    </div>
  );
});

// Nuevo componente para los controles de desmantelamiento
const DismantleControls: React.FC<{
  upgrades: { [key: string]: number },
  droneType: DroneType,
  droneCount: number,
  buyAmount: number | 'max',
  onDismantle: (droneType: DroneType, amount: number | 'max') => void
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

// --- NUEVO COMPONENTE ---
const RetrofitControls: React.FC<{
  resources: GameState['resources'];
  bodegaResources: GameState['vindicator']['bodegaResources'];
  upgrades: { [key: string]: number };
    droneType: DroneType;
  toDrone: DroneType;
  droneCount: number;
  onRetrofit: (fromDrone: DroneType, toDrone: DroneType) => void;
  numberFormat: 'full' | 'abbreviated' | 'scientific';
}> = ({ resources, bodegaResources, upgrades, droneType, toDrone, droneCount, onRetrofit, numberFormat }) => {
  if (!upgrades.droneRetrofitting) {
    return <div style={{ width: '100px' }}/>; // Espaciador para mantener la alineación
  }

  const fromCost = droneData[droneType]?.cost || {};
  const toCost = droneData[toDrone]?.cost || {};
  
  const retrofitCost: Partial<Record<keyof GameState['resources'] | keyof GameState['vindicator']['bodegaResources'], number>> = {};
  let canAfford = true;
    let tooltipText = 'Reacondicionar: ';

  const allResources = { ...resources, ...bodegaResources };
  const costEntries = Object.entries(toCost) as [keyof typeof allResources, number][];

  for (const [resource, cost] of costEntries) {
    const fromResourceCost = fromCost[resource as keyof typeof fromCost] || 0;
    const diff = cost - fromResourceCost;
    if (diff > 0) {
      retrofitCost[resource] = diff;
      if (allResources[resource] < diff) {
        canAfford = false;
      }
      tooltipText += `${formatNumber(diff, numberFormat)} ${resource}, `;
    }
  }
  
  if (Object.keys(retrofitCost).length === 0) {
    tooltipText = "Mejora gratuita";
  } else {
    tooltipText = tooltipText.slice(0, -2);
  }

  const canRetrofit = droneCount > 0 && canAfford;

  return (
    <BotonConTooltip
      onClick={() => onRetrofit(droneType, toDrone)}
      disabled={!canRetrofit}
      tooltipText={droneCount > 0 ? tooltipText : 'No hay drones para reacondicionar'}
      className={`build-button retrofit-button ${canRetrofit ? 'unlocked' : ''}`}
    >
      Mejorar
    </BotonConTooltip>
  );
};

export default Workshop;

