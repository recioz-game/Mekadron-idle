import React from 'react';
import './StorageView.css'; // Importar el archivo CSS
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';
import { gameData } from '../data/gameData';

// Importar imágenes de almacenamiento
import storageBasicImg from '../assets/images/ui/storage-basic.png';
import storageMediumImg from '../assets/images/ui/storage-medium.png';
import storageAdvancedImg from '../assets/images/ui/storage-advanced.png';
import storageQuantumImg from '../assets/images/ui/storage-quantum.png';

// Importar imágenes de almacenamiento de energía
import batteryLithiumIonImg from '../assets/images/ui/battery-lithium-ion.png';
import accumulatorPlasmaImg from '../assets/images/ui/accumulator-plasma.png';
import harmonicContainmentFieldImg from '../assets/images/ui/harmonic-containment-field.png';

interface StorageViewProps {
  // Resources
  scrap: number;
  metalRefinado: number;

  // Storage Units
  basicStorage: number;
  mediumStorage: number;
  advancedStorage: number;
  quantumHoardUnit: number;
  lithiumIonBattery: number;
  plasmaAccumulator: number;
  harmonicContainmentField: number;

  
  // Storage Queues
  basicStorageQueue: { progress: number; queue: number; time: number };
  mediumStorageQueue: { progress: number; queue: number; time: number };
  advancedStorageQueue: { progress: number; queue: number; time: number };
  quantumHoardUnitQueue: { progress: number; queue: number; time: number };
  lithiumIonBatteryQueue: { progress: number; queue: number; time: number };
  plasmaAccumulatorQueue: { progress: number; queue: number; time: number };
  harmonicContainmentFieldQueue: { progress: number; queue: number; time: number };

  // Callbacks
  onBuildBasicStorage: () => void;
  onBuildMediumStorage: () => void;
  onBuildAdvancedStorage: () => void;
  onBuildQuantumHoardUnit: () => void;
  onBuildLithiumIonBattery: () => void;
  onBuildPlasmaAccumulator: () => void;
  onBuildHarmonicContainmentField: () => void;

  // Others
  buyAmount: number | 'max';
    onSetBuyAmount: (amount: number | 'max') => void;
  onClose: () => void;
  onCancel: (itemName: string, amount: number | 'all') => void;
}

const ProgressBar = ({ progress, time }: { progress: number; time: number }) => (
    <div className="progress-bar-container">
      <div 
        className="progress-bar"
        style={{ width: `${(progress / time) * 100}%` }} 
      />
    </div>
  );

const StorageView: React.FC<StorageViewProps> = React.memo(({ 
  scrap, metalRefinado,
  basicStorage, mediumStorage, advancedStorage, quantumHoardUnit, lithiumIonBattery, plasmaAccumulator, harmonicContainmentField,
  basicStorageQueue, mediumStorageQueue, advancedStorageQueue, quantumHoardUnitQueue, lithiumIonBatteryQueue, plasmaAccumulatorQueue, harmonicContainmentFieldQueue,
  onBuildBasicStorage, onBuildMediumStorage, onBuildAdvancedStorage, onBuildQuantumHoardUnit, onBuildLithiumIonBattery, onBuildPlasmaAccumulator, onBuildHarmonicContainmentField,
  buyAmount, onSetBuyAmount, onClose, onCancel 
}) => {

  const getTooltipText = (requirements: { resource?: string, amount: number, current: number, text: string }[]): string => {
    const missing = requirements.filter(req => req.current < req.amount);
    if (missing.length === 0) return '';
        return 'Requiere: ' + missing.map(req => `${req.text} (${formatNumber(req.amount)})`).join(', ');
  };

  const basicStorageCost = gameData.storage.basicStorage.costs.scrap!;
  const mediumStorageCost = gameData.storage.mediumStorage.costs.scrap!;
  const advancedStorageCost = gameData.storage.advancedStorage.costs.scrap!;
  const quantumHoardUnitScrapCost = gameData.storage.quantumHoardUnit.costs.scrap!;
  const quantumHoardUnitMetalCost = gameData.storage.quantumHoardUnit.costs.metalRefinado!;
  const lithiumIonBatteryCost = gameData.storage.lithiumIonBattery.costs.scrap!;
  const plasmaAccumulatorCost = gameData.storage.plasmaAccumulator.costs.scrap!;
  const harmonicContainmentFieldScrapCost = gameData.storage.harmonicContainmentField.costs.scrap!;
  const harmonicContainmentFieldMetalCost = gameData.storage.harmonicContainmentField.costs.metalRefinado!;
  
  const getMaxAffordable = (cost: number | { scrap: number, metal: number }) => {
    if (typeof cost === 'number') {
      return Math.floor(scrap / cost);
    }
    const maxByScrap = cost.scrap > 0 ? Math.floor(scrap / cost.scrap) : Infinity;
    const maxByMetal = cost.metal > 0 ? Math.floor(metalRefinado / cost.metal) : Infinity;
    return Math.min(maxByScrap, maxByMetal);
  };

  const basicStorageMax = getMaxAffordable(basicStorageCost);
  const mediumStorageMax = getMaxAffordable(mediumStorageCost);
  const advancedStorageMax = getMaxAffordable(advancedStorageCost);
  const quantumHoardUnitMax = getMaxAffordable({ scrap: quantumHoardUnitScrapCost, metal: quantumHoardUnitMetalCost });
  const lithiumIonBatteryMax = getMaxAffordable(lithiumIonBatteryCost);
  const plasmaAccumulatorMax = getMaxAffordable(plasmaAccumulatorCost);
  
  const harmonicContainmentFieldMax = getMaxAffordable({ scrap: harmonicContainmentFieldScrapCost, metal: harmonicContainmentFieldMetalCost });

  return (
    <div className="storage-view-container">
      <div className="storage-view-header">
        <h2>MÓDULO DE ALMACÉN</h2>
        <button 
          onClick={onClose}
          className="close-button"
        >
          Cerrar
        </button>
      </div>

            <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />

            <div className={`storage-item ${scrap >= basicStorageCost ? 'unlocked' : ''}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#F59E0B' }}>Almacén Básico</h3>
          <p>Capacidad: +{formatNumber(50)} chatarra máxima</p>
          <p>Coste: {formatNumber(basicStorageCost)} chatarra</p>
          <p>Construidos: {basicStorage} | En cola: {basicStorageQueue.queue}</p>
          {basicStorageQueue.queue > 0 && (
            <div className="queue-controls">
              <button onClick={() => onCancel('basicStorage', 1)}>Cancelar 1</button>
              <button onClick={() => onCancel('basicStorage', 'all')}>Cancelar Todo</button>
            </div>
          )}
          <p>T/U: {basicStorageQueue.time}s</p>
          
          {basicStorageQueue.queue > 0 && <ProgressBar progress={basicStorageQueue.progress} time={basicStorageQueue.time} />}
          
          <BotonConTooltip
            onClick={onBuildBasicStorage}
            disabled={scrap < basicStorageCost}
            tooltipText={getTooltipText([{ amount: basicStorageCost, current: scrap, text: 'Chatarra' }])}
            className={`build-button ${scrap >= basicStorageCost ? 'unlocked' : ''}`}
          >
            Encargar Almacén Básico {buyAmount === 'max' && `(${basicStorageMax})`}
          </BotonConTooltip>
        </div>
        <img src={storageBasicImg} alt="Almacén Básico" className="storage-item-image" />
      </div>

            {/* Almacén Medio */}
            <div className={`storage-item ${scrap >= mediumStorageCost && basicStorage >= 3 ? 'unlocked' : ''} ${basicStorage >= 3 ? '' : 'locked'}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#22C55E' }}>Almacén Medio</h3>
          <p>Capacidad: +{formatNumber(500)} chatarra máxima</p>
          <p>Coste: {formatNumber(mediumStorageCost)} chatarra</p>
          <p>Construidos: {mediumStorage} | En cola: {mediumStorageQueue.queue}</p>
          {mediumStorageQueue.queue > 0 && (
            <div className="queue-controls">
              <button onClick={() => onCancel('mediumStorage', 1)}>Cancelar 1</button>
              <button onClick={() => onCancel('mediumStorage', 'all')}>Cancelar Todo</button>
            </div>
          )}
          <p>T/U: {mediumStorageQueue.time}s</p>
          <p>Requisitos: 3 Almacenes Básicos</p>

          {mediumStorageQueue.queue > 0 && <ProgressBar progress={mediumStorageQueue.progress} time={mediumStorageQueue.time} />}
          
          <BotonConTooltip
            onClick={onBuildMediumStorage}
            disabled={scrap < mediumStorageCost || basicStorage < 3}
            tooltipText={getTooltipText([
              { amount: mediumStorageCost, current: scrap, text: 'Chatarra' },
              { amount: 3, current: basicStorage, text: 'Almacenes Básicos' }
            ])}
            className={`build-button ${scrap >= mediumStorageCost && basicStorage >= 3 ? 'unlocked' : ''}`}
          >
            Encargar Almacén Medio {buyAmount === 'max' && `(${mediumStorageMax})`}
          </BotonConTooltip>
          {basicStorage < 3 && (
            <p className="requirement-warning">
              ⚠️ Necesitas 3 Almacenes Básicos
            </p>
          )}
        </div>
        <img src={storageMediumImg} alt="Almacén Medio" className="storage-item-image" />
      </div>

            {/* Almacén Avanzado */}
            <div className={`storage-item ${scrap >= advancedStorageCost && mediumStorage >= 1 ? 'unlocked' : ''} ${mediumStorage >= 1 ? '' : 'locked'}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#D946EF' }}>Almacén Avanzado</h3>
          <p>Capacidad: +{formatNumber(5000)} chatarra máxima</p>
          <p>Coste: {formatNumber(advancedStorageCost)} chatarra</p>
          <p>Construidos: {advancedStorage} | En cola: {advancedStorageQueue.queue}</p>
          {advancedStorageQueue.queue > 0 && (
            <div className="queue-controls">
              <button onClick={() => onCancel('advancedStorage', 1)}>Cancelar 1</button>
              <button onClick={() => onCancel('advancedStorage', 'all')}>Cancelar Todo</button>
            </div>
          )}
          <p>T/U: {advancedStorageQueue.time}s</p>
          <p>Requisitos: 1 Almacén Medio</p>

          {advancedStorageQueue.queue > 0 && <ProgressBar progress={advancedStorageQueue.progress} time={advancedStorageQueue.time} />}
          
          <BotonConTooltip
            onClick={onBuildAdvancedStorage}
            disabled={scrap < advancedStorageCost || mediumStorage < 1}
            tooltipText={getTooltipText([
              { amount: advancedStorageCost, current: scrap, text: 'Chatarra' },
              { amount: 1, current: mediumStorage, text: 'Almacenes Medios' }
            ])}
            className={`build-button ${scrap >= advancedStorageCost && mediumStorage >= 1 ? 'unlocked' : ''}`}
            style={{ backgroundColor: scrap >= advancedStorageCost && mediumStorage >= 1 ? '#D946EF' : '#9CA3AF' }}
          >
            Encargar Almacén Avanzado {buyAmount === 'max' && `(${advancedStorageMax})`}
          </BotonConTooltip>
          {mediumStorage < 1 && (
            <p className="requirement-warning">
              ⚠️ Necesitas 1 Almacén Medio
            </p>
          )}
        </div>
        <img src={storageAdvancedImg} alt="Almacén Avanzado" className="storage-item-image" />
      </div>

            {/* Unidad de Acopio Cuántico */}
            <div className={`storage-item ${scrap >= quantumHoardUnitScrapCost && metalRefinado >= quantumHoardUnitMetalCost && advancedStorage >= 3 ? 'unlocked' : ''} ${advancedStorage >= 3 ? '' : 'locked'}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#D946EF' }}>Unidad de Acopio Cuántico</h3>
          <p>Capacidad: +{formatNumber(50000)} chatarra máxima</p>
          <p>Coste: {formatNumber(quantumHoardUnitScrapCost)} chatarra y {formatNumber(quantumHoardUnitMetalCost)} metal refinado</p>
          <p>Construidos: {quantumHoardUnit} | En cola: {quantumHoardUnitQueue.queue}</p>
          {quantumHoardUnitQueue.queue > 0 && (
            <div className="queue-controls">
              <button onClick={() => onCancel('quantumHoardUnit', 1)}>Cancelar 1</button>
              <button onClick={() => onCancel('quantumHoardUnit', 'all')}>Cancelar Todo</button>
            </div>
          )}
          <p>T/U: {quantumHoardUnitQueue.time}s</p>
          <p>Requisitos: 3 Almacenes Avanzados</p>
          
          {quantumHoardUnitQueue.queue > 0 && <ProgressBar progress={quantumHoardUnitQueue.progress} time={quantumHoardUnitQueue.time} />}
          
          <BotonConTooltip
            onClick={onBuildQuantumHoardUnit}
            disabled={scrap < quantumHoardUnitScrapCost || metalRefinado < quantumHoardUnitMetalCost || advancedStorage < 3}
            tooltipText={getTooltipText([
              { amount: quantumHoardUnitScrapCost, current: scrap, text: 'Chatarra' },
              { amount: quantumHoardUnitMetalCost, current: metalRefinado, text: 'Metal Refinado' },
              { amount: 3, current: advancedStorage, text: 'Almacenes Avanzados' }
            ])}
            className={`build-button ${scrap >= quantumHoardUnitScrapCost && metalRefinado >= quantumHoardUnitMetalCost && advancedStorage >= 3 ? 'unlocked' : ''}`}
            style={{ backgroundColor: scrap >= quantumHoardUnitScrapCost && metalRefinado >= quantumHoardUnitMetalCost && advancedStorage >= 3 ? '#D946EF' : '#9CA3AF' }}
          >
            Encargar Acopio Cuántico {buyAmount === 'max' && `(${quantumHoardUnitMax})`}
          </BotonConTooltip>
          {advancedStorage < 3 && (
            <p className="requirement-warning">
              ⚠️ Necesitas 3 Almacenes Avanzados
            </p>
          )}
        </div>
        <img src={storageQuantumImg} alt="Unidad de Acopio Cuántico" className="storage-item-image" />
      </div>

      {/* --- ALMACENAMIENTO DE ENERGÍA --- */}
      <h3 style={{ borderBottom: '2px solid #06B6D4', paddingBottom: '0.5rem', marginTop: '3rem' }}>Almacenamiento de Energía</h3>

            {/* Batería de Iones de Litio */}
            <div className={`storage-item ${scrap >= lithiumIonBatteryCost ? 'unlocked' : ''}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#06B6D4' }}>Batería de Iones de Litio</h3>
          <p>Capacidad: +{formatNumber(50)} energía máxima</p>
          <p>Coste: {formatNumber(lithiumIonBatteryCost)} chatarra</p>
          <p>Construidos: {lithiumIonBattery} | En cola: {lithiumIonBatteryQueue.queue}</p>
          {lithiumIonBatteryQueue.queue > 0 && (
            <div className="queue-controls">
              <button onClick={() => onCancel('lithiumIonBattery', 1)}>Cancelar 1</button>
              <button onClick={() => onCancel('lithiumIonBattery', 'all')}>Cancelar Todo</button>
            </div>
          )}
          <p>T/U: {lithiumIonBatteryQueue.time}s</p>

          {lithiumIonBatteryQueue.queue > 0 && <ProgressBar progress={lithiumIonBatteryQueue.progress} time={lithiumIonBatteryQueue.time} />}
          
          <BotonConTooltip
            onClick={onBuildLithiumIonBattery}
            disabled={scrap < lithiumIonBatteryCost}
            tooltipText={getTooltipText([{ amount: lithiumIonBatteryCost, current: scrap, text: 'Chatarra' }])}
            className={`build-button ${scrap >= lithiumIonBatteryCost ? 'unlocked' : ''}`}
          >
                        Encargar Batería {buyAmount === 'max' && `(${lithiumIonBatteryMax})`}
          </BotonConTooltip>
        </div>
        <img src={batteryLithiumIonImg} alt="Batería de Iones de Litio" className="storage-item-image" />
      </div>

            {/* Acumulador de Plasma */}
            <div className={`storage-item ${scrap >= plasmaAccumulatorCost && lithiumIonBattery >= 5 ? 'unlocked' : ''} ${lithiumIonBattery >= 5 ? '' : 'locked'}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#06B6D4' }}>Acumulador de Plasma</h3>
          <p>Capacidad: +{formatNumber(250)} energía máxima</p>
          <p>Coste: {formatNumber(plasmaAccumulatorCost)} chatarra</p>
          <p>Construidos: {plasmaAccumulator} | En cola: {plasmaAccumulatorQueue.queue}</p>
          {plasmaAccumulatorQueue.queue > 0 && (
            <div className="queue-controls">
              <button onClick={() => onCancel('plasmaAccumulator', 1)}>Cancelar 1</button>
              <button onClick={() => onCancel('plasmaAccumulator', 'all')}>Cancelar Todo</button>
            </div>
          )}
          <p>T/U: {plasmaAccumulatorQueue.time}s</p>
          <p>Requisitos: 5 Baterías de Iones de Litio</p>

          {plasmaAccumulatorQueue.queue > 0 && <ProgressBar progress={plasmaAccumulatorQueue.progress} time={plasmaAccumulatorQueue.time} />}
          
          <BotonConTooltip
            onClick={onBuildPlasmaAccumulator}
            disabled={scrap < plasmaAccumulatorCost || lithiumIonBattery < 5}
            tooltipText={getTooltipText([
              { amount: plasmaAccumulatorCost, current: scrap, text: 'Chatarra' },
              { amount: 5, current: lithiumIonBattery, text: 'Baterías de Iones de Litio' }
            ])}
            className={`build-button ${scrap >= plasmaAccumulatorCost && lithiumIonBattery >= 5 ? 'unlocked' : ''}`}
          >
            Encargar Acumulador {buyAmount === 'max' && `(${plasmaAccumulatorMax})`}
          </BotonConTooltip>
          {lithiumIonBattery < 5 && (
            <p className="requirement-warning">
                            ⚠️ Necesitas 5 Baterías de Iones de Litio
            </p>
          )}
        </div>
        <img src={accumulatorPlasmaImg} alt="Acumulador de Plasma" className="storage-item-image" />
      </div>

            {/* Campo de Contención Armónico */}
            <div className={`storage-item ${scrap >= harmonicContainmentFieldScrapCost && metalRefinado >= harmonicContainmentFieldMetalCost && plasmaAccumulator >= 3 ? 'unlocked' : ''} ${plasmaAccumulator >= 3 ? '' : 'locked'}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#D946EF' }}>Campo de Contención Armónico</h3>
          <p>Capacidad: +{formatNumber(1200)} energía máxima</p>
          <p>Coste: {formatNumber(harmonicContainmentFieldScrapCost)} chatarra y {formatNumber(harmonicContainmentFieldMetalCost)} metal refinado</p>
          <p>Construidos: {harmonicContainmentField} | En cola: {harmonicContainmentFieldQueue.queue}</p>
          {harmonicContainmentFieldQueue.queue > 0 && (
            <div className="queue-controls">
              <button onClick={() => onCancel('harmonicContainmentField', 1)}>Cancelar 1</button>
              <button onClick={() => onCancel('harmonicContainmentField', 'all')}>Cancelar Todo</button>
            </div>
          )}
          <p>T/U: {harmonicContainmentFieldQueue.time}s</p>
          <p>Requisitos: 3 Acumuladores de Plasma</p>
          
          {harmonicContainmentFieldQueue.queue > 0 && <ProgressBar progress={harmonicContainmentFieldQueue.progress} time={harmonicContainmentFieldQueue.time} />}
          
          <BotonConTooltip
            onClick={onBuildHarmonicContainmentField}
            disabled={scrap < harmonicContainmentFieldScrapCost || metalRefinado < harmonicContainmentFieldMetalCost || plasmaAccumulator < 3}
            tooltipText={getTooltipText([
              { amount: harmonicContainmentFieldScrapCost, current: scrap, text: 'Chatarra' },
              { amount: harmonicContainmentFieldMetalCost, current: metalRefinado, text: 'Metal Refinado' },
              { amount: 3, current: plasmaAccumulator, text: 'Acumuladores de Plasma' }
            ])}
            className={`build-button ${scrap >= harmonicContainmentFieldScrapCost && metalRefinado >= harmonicContainmentFieldMetalCost && plasmaAccumulator >= 3 ? 'unlocked' : ''}`}
            style={{ backgroundColor: scrap >= harmonicContainmentFieldScrapCost && metalRefinado >= harmonicContainmentFieldMetalCost && plasmaAccumulator >= 3 ? '#D946EF' : '#9CA3AF' }}
          >
            Encargar Campo de Contención {buyAmount === 'max' && `(${harmonicContainmentFieldMax})`}
          </BotonConTooltip>
          {plasmaAccumulator < 3 && (
            <p className="requirement-warning">
                            ⚠️ Necesitas 3 Acumuladores de Plasma
            </p>
          )}
        </div>
        <img src={harmonicContainmentFieldImg} alt="Campo de Contención Armónico" className="storage-item-image" />
      </div>
    </div>
  );
});

export default StorageView;