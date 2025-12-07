import React from 'react';
import './FoundryView.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber, formatTime } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';
import { useDragToScroll } from '../hooks/useDragToScroll';
import QueueControls from './QueueControls';

const ProgressBar = ({ progress, time }: { progress: number; time: number }) => (
  <div className="progress-bar-container">
    <div 
      className="progress-bar"
      style={{ width: `${(progress / time) * 100}%` }} 
    />
  </div>
);

// Importar los nuevos iconos
import refinedMetalIcon from '../assets/images/ui/refined-metal-icon.png';
import structuralSteelIcon from '../assets/images/ui/structural-steel-icon.png';
import hullPlateIcon from '../assets/images/ui/hull-plate-icon.png';
import superconductorWiringIcon from '../assets/images/ui/superconductor-wiring-icon.png';
import fuelRodIcon from '../assets/images/ui/fuel-rod-icon.png';

interface FoundryViewProps {
  scrap: number;
  energy: number;
  metalRefinado: number;
  aceroEstructural: number;
  fragmentosPlaca: number;
  circuitosDañados: number;
    placasCasco: number;
  cableadoSuperconductor: number;
  barraCombustible: number;
  
  metalRefinadoQueue: { progress: number; queue: number; time: number };
  aceroEstructuralQueue: { progress: number; queue: number; time: number };
  placasCascoQueue: { progress: number; queue: number; time: number };
  cableadoSuperconductorQueue: { progress: number; queue: number; time: number };
  barraCombustibleQueue: { progress: number; queue: number; time: number };

  onCraftRefinedMetal: () => void;
  onCraftStructuralSteel: () => void;
  onCraftHullPlate: () => void;
  onCraftSuperconductorWiring: () => void;
  onCraftFuelRod: () => void;
  onCraftPurifiedMetal: () => void; // Nueva acción
  upgrades: GameState['techCenter']['upgrades']; // Para saber si la receta está desbloqueada
  buyAmount: number | 'max';
    onSetBuyAmount: (amount: number | 'max') => void;
    onClose: () => void;
  onCancel: (itemName: string, amount: number | 'all') => void;
  numberFormat: 'full' | 'abbreviated' | 'scientific';
}



const FoundryView: React.FC<FoundryViewProps> = React.memo(({ 
  scrap, energy, metalRefinado, aceroEstructural, fragmentosPlaca, circuitosDañados, placasCasco, cableadoSuperconductor, barraCombustible,
  metalRefinadoQueue, aceroEstructuralQueue, placasCascoQueue, cableadoSuperconductorQueue, barraCombustibleQueue,
  onCraftRefinedMetal, onCraftStructuralSteel, onCraftHullPlate, onCraftSuperconductorWiring, onCraftFuelRod, onCraftPurifiedMetal,
  upgrades, buyAmount, onSetBuyAmount, onClose, onCancel, numberFormat
}) => {

  // Costes y máximos
  const metalCost = { scrap: 1000, energy: 100 };
  const steelCost = { scrap: 1000, metal: 10, energy: 250 };
    const plateCost = { fragmentos: 10, acero: 5, energy: 500 };
  const wiringCost = { circuitos: 10, metal: 25, energy: 1000 };
  const fuelRodCost = { metal: 10, acero: 5, energy: 1500 };
  const purificationCost = { scrap: 5000, energy: 500 };

  const maxMetal = Math.min(Math.floor(scrap / metalCost.scrap), Math.floor(energy / metalCost.energy));
  const maxSteel = Math.min(Math.floor(scrap / steelCost.scrap), Math.floor(metalRefinado / steelCost.metal), Math.floor(energy / steelCost.energy));
  const maxPlate = Math.min(Math.floor(fragmentosPlaca / plateCost.fragmentos), Math.floor(aceroEstructural / plateCost.acero), Math.floor(energy / plateCost.energy));
  const maxWiring = Math.min(Math.floor(circuitosDañados / wiringCost.circuitos), Math.floor(metalRefinado / wiringCost.metal), Math.floor(energy / wiringCost.energy));
  const maxFuelRod = Math.min(Math.floor(metalRefinado / fuelRodCost.metal), Math.floor(aceroEstructural / fuelRodCost.acero), Math.floor(energy / fuelRodCost.energy));
    const maxPurified = Math.min(Math.floor(scrap / purificationCost.scrap), Math.floor(energy / purificationCost.energy));

    const scrollRef = useDragToScroll<HTMLDivElement>();

        const getTooltipText = (requirements: { resource?: string, amount: number, current: number, text: string }[], format: 'full' | 'abbreviated' | 'scientific'): string => {
      const missing = requirements.filter(req => req.current < req.amount);
      if (missing.length === 0) return '';
      return 'Requiere: ' + missing.map(req => `${req.text} (${formatNumber(req.amount, format)})`).join(', ');
    };

    return (
    <div className="foundry-view-container">
      <div className="foundry-content-area" ref={scrollRef}>
        <button onClick={onClose} className="close-button">
          &times;
        </button>

                        <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />

                                                                                      {/* Metal Refinado */}
        <div className={`foundry-item ${maxMetal > 0 ? 'unlocked' : ''}`}>
          <div className="foundry-item-content">
                        <h4 style={{ color: '#F59E0B' }}>Metal Refinado</h4>
            <p>Coste: {formatNumber(metalCost.scrap, numberFormat)} Chatarra + {formatNumber(metalCost.energy, numberFormat)} Energía</p>
            <p>En Posesión: {formatNumber(metalRefinado, numberFormat)} | En cola: {metalRefinadoQueue.queue} {metalRefinadoQueue.queue > 0 ? `| Tiempo: ~${formatTime(metalRefinadoQueue.queue * metalRefinadoQueue.time)}` : ''}</p>
            
            {metalRefinadoQueue.queue > 0 && (
              <div>
                <p className="time-info">T/U: {metalRefinadoQueue.time}s</p>
                <ProgressBar progress={metalRefinadoQueue.progress} time={metalRefinadoQueue.time} />
              </div>
            )}
            
                        <div className="build-actions">
              <BotonConTooltip
                onClick={onCraftRefinedMetal} 
                disabled={maxMetal <= 0}
                                tooltipText={getTooltipText([
                  { amount: metalCost.scrap, current: scrap, text: 'Chatarra' },
                  { amount: metalCost.energy, current: energy, text: 'Energía' }
                ], numberFormat)}
                className={`build-button ${maxMetal > 0 ? 'unlocked' : ''}`}
              >
                Encargar {buyAmount === 'max' && `(${maxMetal})`}
              </BotonConTooltip>
              {metalRefinadoQueue.queue > 0 && (
                <QueueControls itemName='metalRefinado' onCancel={onCancel} />
              )}
            </div>
          </div>
          <img src={refinedMetalIcon} alt="Metal Refinado" className="foundry-item-image" />
        </div>

                {/* Acero Estructural */}
        <div className={`foundry-item ${maxSteel > 0 ? 'unlocked' : ''}`}>
          <div className="foundry-item-content">
                        <h4 style={{ color: '#06B6D4' }}>Acero Estructural</h4>
            <p>Coste: {formatNumber(steelCost.scrap, numberFormat)} Chatarra + {steelCost.metal} Metal + {steelCost.energy} Energía</p>
            <p>En Posesión: {formatNumber(aceroEstructural, numberFormat)} | En cola: {aceroEstructuralQueue.queue} {aceroEstructuralQueue.queue > 0 ? `| Tiempo: ~${formatTime(aceroEstructuralQueue.queue * aceroEstructuralQueue.time)}` : ''}</p>
            
            {aceroEstructuralQueue.queue > 0 && (
              <div>
                <p className="time-info">T/U: {aceroEstructuralQueue.time}s</p>
                <ProgressBar progress={aceroEstructuralQueue.progress} time={aceroEstructuralQueue.time} />
              </div>
            )}
            
                        <div className="build-actions">
              <BotonConTooltip
                onClick={onCraftStructuralSteel} 
                disabled={maxSteel <= 0}
                                tooltipText={getTooltipText([
                  { amount: steelCost.scrap, current: scrap, text: 'Chatarra' },
                  { amount: steelCost.metal, current: metalRefinado, text: 'Metal' },
                  { amount: steelCost.energy, current: energy, text: 'Energía' }
                ], numberFormat)}
                className={`build-button ${maxSteel > 0 ? 'unlocked' : ''}`}
              >
                Encargar {buyAmount === 'max' && `(${maxSteel})`}
              </BotonConTooltip>
              {aceroEstructuralQueue.queue > 0 && (
                <QueueControls itemName='aceroEstructural' onCancel={onCancel} />
              )}
            </div>
          </div>
          <img src={structuralSteelIcon} alt="Acero Estructural" className="foundry-item-image" />
        </div>

        <h3 className="section-title">Componentes de Nave</h3>
        
                {/* Placas de Casco */}
        <div className={`foundry-item ${maxPlate > 0 ? 'unlocked' : ''}`}>
          <div className="foundry-item-content">
                        <h4 style={{ color: '#F59E0B' }}>Placa de Casco Reforzado</h4>
            <p>Coste: {plateCost.fragmentos} Fragmentos + {plateCost.acero} Acero + {plateCost.energy} Energía</p>
            <p>En Posesión: {formatNumber(placasCasco, numberFormat)} | En cola: {placasCascoQueue.queue} {placasCascoQueue.queue > 0 ? `| Tiempo: ~${formatTime(placasCascoQueue.queue * placasCascoQueue.time)}` : ''}</p>
            
            {placasCascoQueue.queue > 0 && (
              <div>
                <p className="time-info">T/U: {placasCascoQueue.time}s</p>
                <ProgressBar progress={placasCascoQueue.progress} time={placasCascoQueue.time} />
              </div>
            )}

                        <div className="build-actions">
              <BotonConTooltip
                onClick={onCraftHullPlate} 
                disabled={maxPlate <= 0}
                                tooltipText={getTooltipText([
                  { amount: plateCost.fragmentos, current: fragmentosPlaca, text: 'Fragmentos' },
                  { amount: plateCost.acero, current: aceroEstructural, text: 'Acero' },
                  { amount: plateCost.energy, current: energy, text: 'Energía' }
                ], numberFormat)}
                className={`build-button ${maxPlate > 0 ? 'unlocked' : ''}`}
              >
                Encargar {buyAmount === 'max' && `(${maxPlate})`}
              </BotonConTooltip>
              {placasCascoQueue.queue > 0 && (
                <QueueControls itemName='placasCasco' onCancel={onCancel} />
              )}
            </div>
          </div>
          <img src={hullPlateIcon} alt="Placa de Casco" className="foundry-item-image" />
        </div>

                {/* Cableado de Superconductores */}
        <div className={`foundry-item ${maxWiring > 0 ? 'unlocked' : ''}`}>
          <div className="foundry-item-content">
                        <h4 style={{ color: '#06B6D4' }}>Cableado de Superconductores</h4>
            <p>Coste: {wiringCost.circuitos} Circuitos + {wiringCost.metal} Metal + {wiringCost.energy} Energía</p>
            <p>En Posesión: {formatNumber(cableadoSuperconductor, numberFormat)} | En cola: {cableadoSuperconductorQueue.queue} {cableadoSuperconductorQueue.queue > 0 ? `| Tiempo: ~${formatTime(cableadoSuperconductorQueue.queue * cableadoSuperconductorQueue.time)}` : ''}</p>
            
            {cableadoSuperconductorQueue.queue > 0 && (
              <div>
                <p className="time-info">T/U: {cableadoSuperconductorQueue.time}s</p>
                <ProgressBar progress={cableadoSuperconductorQueue.progress} time={cableadoSuperconductorQueue.time} />
              </div>
            )}

                        <div className="build-actions">
              <BotonConTooltip
                onClick={onCraftSuperconductorWiring} 
                disabled={maxWiring <= 0}
                                tooltipText={getTooltipText([
                  { amount: wiringCost.circuitos, current: circuitosDañados, text: 'Circuitos' },
                  { amount: wiringCost.metal, current: metalRefinado, text: 'Metal' },
                  { amount: wiringCost.energy, current: energy, text: 'Energía' }
                ], numberFormat)}
                className={`build-button ${maxWiring > 0 ? 'unlocked' : ''}`}
              >
                Encargar {buyAmount === 'max' && `(${maxWiring})`}
              </BotonConTooltip>
              {cableadoSuperconductorQueue.queue > 0 && (
                <QueueControls itemName='cableadoSuperconductor' onCancel={onCancel} />
              )}
            </div>
          </div>
          <img src={superconductorWiringIcon} alt="Cableado" className="foundry-item-image" />
        </div>

                {/* Barra de Combustible */}
        <div className={`foundry-item ${maxFuelRod > 0 ? 'unlocked' : ''}`}>
          <div className="foundry-item-content">
                        <h4 style={{ color: '#FCD34D' }}>Barra de Combustible</h4>
            <p>Coste: {fuelRodCost.metal} Metal + {fuelRodCost.acero} Acero + {fuelRodCost.energy} Energía</p>
            <p>En Posesión: {formatNumber(barraCombustible, numberFormat)} | En cola: {barraCombustibleQueue.queue} {barraCombustibleQueue.queue > 0 ? `| Tiempo: ~${formatTime(barraCombustibleQueue.queue * barraCombustibleQueue.time)}` : ''}</p>
            
            {barraCombustibleQueue.queue > 0 && (
              <div>
                <p className="time-info">T/U: {barraCombustibleQueue.time}s</p>
                <ProgressBar progress={barraCombustibleQueue.progress} time={barraCombustibleQueue.time} />
              </div>
            )}

                        <div className="build-actions">
              <BotonConTooltip
                onClick={onCraftFuelRod} 
                disabled={maxFuelRod <= 0}
                                tooltipText={getTooltipText([
                  { amount: fuelRodCost.metal, current: metalRefinado, text: 'Metal' },
                  { amount: fuelRodCost.acero, current: aceroEstructural, text: 'Acero' },
                  { amount: fuelRodCost.energy, current: energy, text: 'Energía' }
                ], numberFormat)}
                className={`build-button ${maxFuelRod > 0 ? 'unlocked' : ''}`}
              >
                Encargar {buyAmount === 'max' && `(${maxFuelRod})`}
              </BotonConTooltip>
              {barraCombustibleQueue.queue > 0 && (
                <QueueControls itemName='barraCombustible' onCancel={onCancel} />
              )}
            </div>
          </div>
          <img src={fuelRodIcon} alt="Barra de Combustible" className="foundry-item-image" />
        </div>

              {/* Purificación de Chatarra (Condicional) */}
        {(upgrades as any).scrapPurification > 0 && (
          <div className={`crafting-item ${maxPurified > 0 ? 'available' : ''}`} style={{ borderColor: maxPurified > 0 ? '#A855F7' : '' }}>
            <div className="crafting-item-content full-width">
              <div className="crafting-item-info">
                <h4 style={{ color: '#A855F7' }}>Purificación de Chatarra</h4>
                <p>Convierte una gran cantidad de recursos básicos en Metal Refinado. Es ineficiente, pero útil en emergencias.</p>
                <p>Coste: {formatNumber(purificationCost.scrap, numberFormat)} Chatarra + {formatNumber(purificationCost.energy, numberFormat)} Energía</p>
              </div>
                                          <BotonConTooltip
                onClick={onCraftPurifiedMetal} 
                disabled={maxPurified <= 0}
                                tooltipText={getTooltipText([
                  { amount: purificationCost.scrap, current: scrap, text: 'Chatarra' },
                  { amount: purificationCost.energy, current: energy, text: 'Energía' }
                ], numberFormat)}
                className={`build-button ${maxPurified > 0 ? 'unlocked' : ''}`}
                style={{ backgroundColor: maxPurified > 0 ? '#A855F7' : '', color: maxPurified > 0 ? 'white' : '' }}
              >
                Purificar Chatarra {buyAmount === 'max' && `(${maxPurified})`}
              </BotonConTooltip>
      </div>
      </div>
        )}
      </div>
    </div>
  );
});

export default FoundryView;
