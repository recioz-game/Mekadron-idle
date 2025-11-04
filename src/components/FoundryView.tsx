import React from 'react';
import './FoundryView.css'; // Importar el archivo CSS
import { GameState } from '../types/gameState';
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import QueueControls from './QueueControls';

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
        <h2>🔥 FUNDICIÓN</h2>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>

      <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />

      {/* Metal Refinado */}
      <div className={`crafting-item ${maxMetal > 0 ? 'available' : ''}`}>
        <h4 style={{ color: '#F59E0B' }}>🔩 Metal Refinado</h4>
        <p>💰 Coste: {formatNumber(metalCost.scrap)} Chatarra + {formatNumber(metalCost.energy)} Energía</p>
        <p>🏗️ En Posesión: {formatNumber(metalRefinado)}</p>
        <p>📦 En cola: {metalRefinadoQueue.queue}</p>
        <QueueControls queue={metalRefinadoQueue} itemName='metalRefinado' onCancel={onCancel} />
        <button 
          onClick={onCraftRefinedMetal} 
          disabled={maxMetal <= 0}
          className={`craft-button ${maxMetal > 0 ? 'available' : ''}`}
        >
          Encargar Metal {buyAmount === 'max' && `(${maxMetal})`}
        </button>
      </div>

      {/* Acero Estructural */}
      <div className={`crafting-item ${maxSteel > 0 ? 'available' : ''}`}>
        <h4 style={{ color: '#06B6D4' }}>🏗️ Acero Estructural</h4>
        <p>💰 Coste: {formatNumber(steelCost.scrap)} Chatarra + {steelCost.metal} Metal + {steelCost.energy} Energía</p>
        <p>🏗️ En Posesión: {formatNumber(aceroEstructural)}</p>
        <p>📦 En cola: {aceroEstructuralQueue.queue}</p>
        <QueueControls queue={aceroEstructuralQueue} itemName='aceroEstructural' onCancel={onCancel} />
        <button 
          onClick={onCraftStructuralSteel} 
          disabled={maxSteel <= 0}
          className={`craft-button ${maxSteel > 0 ? 'available' : ''}`}
        >
          Encargar Acero {buyAmount === 'max' && `(${maxSteel})`}
        </button>
      </div>

      <h3 className="section-title">Componentes de Nave</h3>
      
      {/* Placas de Casco */}
      <div className={`crafting-item ${maxPlate > 0 ? 'available' : ''}`}>
        <h4 style={{ color: '#F59E0B' }}>🛡️ Placa de Casco Reforzado</h4>
        <p>💰 Coste: {plateCost.fragmentos} Fragmentos de Placa + {plateCost.acero} Acero + {plateCost.energy} Energía</p>
        <p>ℹ️ Fragmentos: {formatNumber(fragmentosPlaca)}</p>
        <p>🏗️ En Posesión: {formatNumber(placasCasco)}</p>
        <p>📦 En cola: {placasCascoQueue.queue}</p>
        <QueueControls queue={placasCascoQueue} itemName='placasCasco' onCancel={onCancel} />
        <button 
          onClick={onCraftHullPlate} 
          disabled={maxPlate <= 0}
          className={`craft-button ${maxPlate > 0 ? 'available' : ''}`}
        >
          Encargar Placa {buyAmount === 'max' && `(${maxPlate})`}
        </button>
      </div>

      {/* Cableado de Superconductores */}
      <div className={`crafting-item ${maxWiring > 0 ? 'available' : ''}`}>
        <h4 style={{ color: '#06B6D4' }}>⚡ Cableado de Superconductores</h4>
        <p>💰 Coste: {wiringCost.circuitos} Circuitos Dañados + {wiringCost.metal} Metal + {wiringCost.energy} Energía</p>
        <p>ℹ️ Circuitos: {formatNumber(circuitosDañados)}</p>
        <p>🏗️ En Posesión: {formatNumber(cableadoSuperconductor)}</p>
        <p>📦 En cola: {cableadoSuperconductorQueue.queue}</p>
        <QueueControls queue={cableadoSuperconductorQueue} itemName='cableadoSuperconductor' onCancel={onCancel} />
        <button 
          onClick={onCraftSuperconductorWiring} 
          disabled={maxWiring <= 0}
          className={`craft-button ${maxWiring > 0 ? 'available' : ''}`}
        >
          Encargar Cableado {buyAmount === 'max' && `(${maxWiring})`}
        </button>
      </div>

      {/* Barra de Combustible */}
      <div className={`crafting-item ${maxFuelRod > 0 ? 'available' : ''}`}>
        <h4 style={{ color: '#FCD34D' }}>⛽ Barra de Combustible</h4>
        <p>💰 Coste: {fuelRodCost.metal} Metal + {fuelRodCost.acero} Acero + {fuelRodCost.energy} Energía</p>
        <p>🏗️ En Posesión: {formatNumber(barraCombustible)}</p>
        <p>📦 En cola: {barraCombustibleQueue.queue}</p>
        <QueueControls queue={barraCombustibleQueue} itemName='barraCombustible' onCancel={onCancel} />
        <button 
          onClick={onCraftFuelRod} 
          disabled={maxFuelRod <= 0}
          className={`craft-button ${maxFuelRod > 0 ? 'available' : ''}`}
        >
          Encargar Barra {buyAmount === 'max' && `(${maxFuelRod})`}
        </button>
      </div>

      {/* Purificación de Chatarra (Condicional) */}
      {(upgrades as any).scrapPurification > 0 && (
        <div className={`crafting-item ${maxPurified > 0 ? 'available' : ''}`} style={{ borderColor: maxPurified > 0 ? '#A855F7' : '' }}>
          <h4 style={{ color: '#A855F7' }}>⚛️ Purificación de Chatarra</h4>
          <p>Convierte una gran cantidad de recursos básicos en Metal Refinado. Es ineficiente, pero útil en emergencias.</p>
          <p>💰 Coste: {formatNumber(purificationCost.scrap)} Chatarra + {formatNumber(purificationCost.energy)} Energía</p>
          <button 
            onClick={onCraftPurifiedMetal} 
            disabled={maxPurified <= 0}
            className={`craft-button ${maxPurified > 0 ? 'available' : ''}`}
            style={{ backgroundColor: maxPurified > 0 ? '#A855F7' : '', color: maxPurified > 0 ? 'white' : '' }}
          >
            Purificar Chatarra {buyAmount === 'max' && `(${maxPurified})`}
          </button>
        </div>
      )}
    </div>
  );
});

export default FoundryView;
