import React from 'react';
import './FoundryView.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import QueueControls from './QueueControls';

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
}



const FoundryView: React.FC<FoundryViewProps> = React.memo(({ 
  scrap, energy, metalRefinado, aceroEstructural, fragmentosPlaca, circuitosDañados, placasCasco, cableadoSuperconductor, barraCombustible,
  metalRefinadoQueue, aceroEstructuralQueue, placasCascoQueue, cableadoSuperconductorQueue, barraCombustibleQueue,
  onCraftRefinedMetal, onCraftStructuralSteel, onCraftHullPlate, onCraftSuperconductorWiring, onCraftFuelRod, onCraftPurifiedMetal,
  upgrades, buyAmount, onSetBuyAmount, onClose, onCancel 
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

  return (
    <div className="foundry-view-container">
      <div className="foundry-view-header">
        <h2>FUNDICIÓN</h2>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>

      <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />

                                                                              {/* Metal Refinado */}
      <div className={`foundry-item ${maxMetal > 0 ? 'available' : ''}`}>
        <div className="foundry-item-content">
          <h4 style={{ color: '#F59E0B' }}>Metal Refinado</h4>
          <p>Coste: {formatNumber(metalCost.scrap)} Chatarra + {formatNumber(metalCost.energy)} Energía</p>
          <p>En Posesión: {formatNumber(metalRefinado)}</p>
          <QueueControls queue={metalRefinadoQueue} itemName='metalRefinado' onCancel={onCancel} />
          <button 
            onClick={onCraftRefinedMetal} 
            disabled={maxMetal <= 0}
            className={`craft-button ${maxMetal > 0 ? 'available' : ''}`}
          >
            Encargar {buyAmount === 'max' && `(${maxMetal})`}
          </button>
        </div>
        <img src={refinedMetalIcon} alt="Metal Refinado" className="foundry-item-image" />
      </div>

      {/* Acero Estructural */}
      <div className={`foundry-item ${maxSteel > 0 ? 'available' : ''}`}>
        <div className="foundry-item-content">
          <h4 style={{ color: '#06B6D4' }}>Acero Estructural</h4>
          <p>Coste: {formatNumber(steelCost.scrap)} Chatarra + {steelCost.metal} Metal + {steelCost.energy} Energía</p>
          <p>En Posesión: {formatNumber(aceroEstructural)}</p>
          <QueueControls queue={aceroEstructuralQueue} itemName='aceroEstructural' onCancel={onCancel} />
          <button 
            onClick={onCraftStructuralSteel} 
            disabled={maxSteel <= 0}
            className={`craft-button ${maxSteel > 0 ? 'available' : ''}`}
          >
            Encargar {buyAmount === 'max' && `(${maxSteel})`}
          </button>
        </div>
        <img src={structuralSteelIcon} alt="Acero Estructural" className="foundry-item-image" />
      </div>

      <h3 className="section-title">Componentes de Nave</h3>
      
      {/* Placas de Casco */}
      <div className={`foundry-item ${maxPlate > 0 ? 'available' : ''}`}>
        <div className="foundry-item-content">
          <h4 style={{ color: '#F59E0B' }}>Placa de Casco Reforzado</h4>
          <p>Coste: {plateCost.fragmentos} Fragmentos + {plateCost.acero} Acero + {plateCost.energy} Energía</p>
          <p>En Posesión: {formatNumber(placasCasco)}</p>
          <QueueControls queue={placasCascoQueue} itemName='placasCasco' onCancel={onCancel} />
          <button 
            onClick={onCraftHullPlate} 
            disabled={maxPlate <= 0}
            className={`craft-button ${maxPlate > 0 ? 'available' : ''}`}
          >
            Encargar {buyAmount === 'max' && `(${maxPlate})`}
          </button>
        </div>
        <img src={hullPlateIcon} alt="Placa de Casco" className="foundry-item-image" />
      </div>

      {/* Cableado de Superconductores */}
      <div className={`foundry-item ${maxWiring > 0 ? 'available' : ''}`}>
        <div className="foundry-item-content">
          <h4 style={{ color: '#06B6D4' }}>Cableado de Superconductores</h4>
          <p>Coste: {wiringCost.circuitos} Circuitos + {wiringCost.metal} Metal + {wiringCost.energy} Energía</p>
          <p>En Posesión: {formatNumber(cableadoSuperconductor)}</p>
          <QueueControls queue={cableadoSuperconductorQueue} itemName='cableadoSuperconductor' onCancel={onCancel} />
          <button 
            onClick={onCraftSuperconductorWiring} 
            disabled={maxWiring <= 0}
            className={`craft-button ${maxWiring > 0 ? 'available' : ''}`}
          >
            Encargar {buyAmount === 'max' && `(${maxWiring})`}
          </button>
        </div>
        <img src={superconductorWiringIcon} alt="Cableado" className="foundry-item-image" />
      </div>

      {/* Barra de Combustible */}
      <div className={`foundry-item ${maxFuelRod > 0 ? 'available' : ''}`}>
        <div className="foundry-item-content">
          <h4 style={{ color: '#FCD34D' }}>Barra de Combustible</h4>
          <p>Coste: {fuelRodCost.metal} Metal + {fuelRodCost.acero} Acero + {fuelRodCost.energy} Energía</p>
          <p>En Posesión: {formatNumber(barraCombustible)}</p>
          <QueueControls queue={barraCombustibleQueue} itemName='barraCombustible' onCancel={onCancel} />
          <button 
            onClick={onCraftFuelRod} 
            disabled={maxFuelRod <= 0}
            className={`craft-button ${maxFuelRod > 0 ? 'available' : ''}`}
          >
            Encargar {buyAmount === 'max' && `(${maxFuelRod})`}
          </button>
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
              <p>💰 Coste: {formatNumber(purificationCost.scrap)} Chatarra + {formatNumber(purificationCost.energy)} Energía</p>
            </div>
            <button 
              onClick={onCraftPurifiedMetal} 
              disabled={maxPurified <= 0}
              className={`craft-button ${maxPurified > 0 ? 'available' : ''}`}
              style={{ backgroundColor: maxPurified > 0 ? '#A855F7' : '', color: maxPurified > 0 ? 'white' : '' }}
            >
              Purificar Chatarra {buyAmount === 'max' && `(${maxPurified})`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default FoundryView;
