// src/components/ArmoryMK1.tsx
import React from 'react';
import { useGame } from '../context/GameContext';
import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import './Armory.css'; // <-- REUTILIZANDO EL CSS ORIGINAL

interface ArmoryMK1Props {
  onClose: () => void;
}

const ArmoryMK1: React.FC<ArmoryMK1Props> = ({ onClose }) => {
  const { gameState, dispatch } = useGame();
  const { vindicator } = gameState;

  const handleCraftModule = (moduleId: string) => {
    dispatch({ type: 'CRAFT_VINDICATOR_MODULE', payload: { moduleId } });
  };

  return (
    <div className="armory-view">
      <div className="armory-view-header">
        <h2>Armería del Vindicator MK.I</h2>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>

      <div className="armory-content">
        <div className="module-slots-section">
           <h3>Módulos Equipados</h3>
           <div className="module-slot-display">
             <strong>Ofensivo:</strong>
             <span>{vindicator.modules.offensive || 'Ninguno'}</span>
           </div>
           <div className="module-slot-display">
             <strong>Defensivo:</strong>
             <span>{vindicator.modules.defensive || 'Ninguno'}</span>
           </div>
           <div className="module-slot-display">
             <strong>Táctico:</strong>
             <span>{vindicator.modules.tactical || 'Ninguno'}</span>
           </div>
        </div>
        
        <div className="module-fabrication-section">
          <h3>Módulos Fabricables</h3>
                    <div className="module-list">
            {allArmoryMK1Modules.map(module => {
              const { resources } = gameState;
              const costs = module.costs;
              const canAfford = 
                (resources.matrizCristalina >= costs.matrizCristalina) &&
                (resources.IA_Fragmentada >= costs.IA_Fragmentada) &&
                (resources.planosMK2 >= costs.planosMK2);

              const isEquipped = Object.values(vindicator.modules).includes(module.id);

              return (
                <div key={module.id} className="module-card">
                  <div className="upgrade-card-header">
                    <h4>{module.name} ({module.slot})</h4>
                  </div>
                  <p>{module.description}</p>
                  <div className="upgrade-cost">
                    <h5>Coste:</h5>
                    <ul>
                      <li className={resources.matrizCristalina < costs.matrizCristalina ? 'not-enough' : ''}>
                        Matriz Cristalina: {costs.matrizCristalina}
                      </li>
                      <li className={resources.IA_Fragmentada < costs.IA_Fragmentada ? 'not-enough' : ''}>
                        IA Fragmentada: {costs.IA_Fragmentada}
                      </li>
                      <li className={resources.planosMK2 < costs.planosMK2 ? 'not-enough' : ''}>
                        Planos MK2: {costs.planosMK2}
                      </li>
                    </ul>
                  </div>
                  <button 
                    className={`upgrade-button ${isEquipped ? 'disabled' : ''}`} 
                    onClick={() => handleCraftModule(module.id)}
                    disabled={!canAfford || isEquipped}
                  >
                    {isEquipped ? 'Equipado' : 'Fabricar'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmoryMK1;
