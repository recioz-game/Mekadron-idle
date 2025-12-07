import React from 'react';
import { GameState } from '../types/gameState';
import './StorageView.css'; // Importar el archivo CSS
import BuyAmountSelector from './BuyAmountSelector';
import { formatNumber, formatTime } from '../utils/formatNumber';
import BotonConTooltip from './BotonConTooltip';
import QueueControls from './QueueControls';
import { gameData } from '../data/gameData';
import { useDragToScroll } from '../hooks/useDragToScroll';

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
  aceroEstructural: number;

  // Storage Units
  basicStorage: number;
  mediumStorage: number;
  advancedStorage: number;
  quantumHoardUnit: number;
  lithiumIonBattery: number;
  plasmaAccumulator: number;
    harmonicContainmentField: number;
  hasBuilt: GameState['storage']['hasBuilt'];

  
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
  numberFormat: 'full' | 'abbreviated' | 'scientific';
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
  scrap, metalRefinado, aceroEstructural,
  basicStorage, mediumStorage, advancedStorage, quantumHoardUnit, lithiumIonBattery, plasmaAccumulator, harmonicContainmentField,
  hasBuilt,
  basicStorageQueue, mediumStorageQueue, advancedStorageQueue, quantumHoardUnitQueue, lithiumIonBatteryQueue, plasmaAccumulatorQueue, harmonicContainmentFieldQueue,
    onBuildBasicStorage, onBuildMediumStorage, onBuildAdvancedStorage, onBuildQuantumHoardUnit, onBuildLithiumIonBattery, onBuildPlasmaAccumulator, onBuildHarmonicContainmentField,
  buyAmount, onSetBuyAmount, onClose, onCancel, numberFormat
}) => {
  const scrollRef = useDragToScroll<HTMLDivElement>();

    const getTooltipText = (requirements: { resource?: string, amount: number, current: number, text: string }[], format: 'full' | 'abbreviated' | 'scientific'): string => {
    const missing = requirements.filter(req => req.current < req.amount);
    if (missing.length === 0) return '';
        return 'Requiere: ' + missing.map(req => `${req.text} (${formatNumber(req.amount, format)})`).join(', ');
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
  
    const getMaxAffordable = (cost: { scrap?: number, metalRefinado?: number }) => {
    const maxByScrap = cost.scrap ? Math.floor(scrap / cost.scrap) : Infinity;
    const maxByMetal = cost.metalRefinado ? Math.floor(metalRefinado / cost.metalRefinado) : Infinity;
    return Math.min(maxByScrap, maxByMetal);
  };

  const basicStorageMax = getMaxAffordable({ scrap: basicStorageCost });
  const mediumStorageMax = getMaxAffordable({ scrap: mediumStorageCost });
  const advancedStorageMax = getMaxAffordable({ scrap: advancedStorageCost });
  const quantumHoardUnitMax = getMaxAffordable({ scrap: quantumHoardUnitScrapCost, metalRefinado: quantumHoardUnitMetalCost });
  const lithiumIonBatteryMax = getMaxAffordable({ scrap: lithiumIonBatteryCost });
  const plasmaAccumulatorMax = getMaxAffordable({ scrap: plasmaAccumulatorCost });
  const harmonicContainmentFieldMax = getMaxAffordable({ scrap: harmonicContainmentFieldScrapCost, metalRefinado: harmonicContainmentFieldMetalCost });

        return (
    <div className="storage-view-container">
      <div className="storage-content-area" ref={scrollRef}>
        <button 
          onClick={onClose}
          className="close-button"
        >
          &times;
        </button>

            <BuyAmountSelector buyAmount={buyAmount} onSetBuyAmount={onSetBuyAmount} />

            <div className={`storage-item ${scrap >= basicStorageCost ? 'unlocked' : ''}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#F59E0B' }}>Almacén Básico</h3>
                              <p>Capacidad: +{formatNumber(50, numberFormat)} chatarra máxima</p>
          <p>Coste: {formatNumber(basicStorageCost, numberFormat)} chatarra</p>
          <p>Construidos: {basicStorage} | En cola: {basicStorageQueue.queue} {basicStorageQueue.queue > 0 ? `| Tiempo: ~${formatTime(basicStorageQueue.queue * basicStorageQueue.time)}` : ''}</p>

          {basicStorageQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {basicStorageQueue.time}s | En cola: {basicStorageQueue.queue}</p>
              <ProgressBar progress={basicStorageQueue.progress} time={basicStorageQueue.time} />
            </div>
          )}

          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildBasicStorage}
              disabled={scrap < basicStorageCost}
              tooltipText={getTooltipText([{ amount: basicStorageCost, current: scrap, text: 'Chatarra' }], numberFormat)}
              className={`build-button ${scrap >= basicStorageCost ? 'unlocked' : ''}`}
            >
              Encargar Almacén Básico {buyAmount === 'max' && `(${basicStorageMax})`}
            </BotonConTooltip>
            {basicStorageQueue.queue > 0 && (
              <QueueControls itemName='basicStorage' onCancel={onCancel} />
            )}
          </div>
        </div>
        <img src={storageBasicImg} alt="Almacén Básico" className="storage-item-image" />
      </div>

                        {/* Almacén Medio */}
            <div className={`storage-item ${scrap >= mediumStorageCost && (basicStorage >= 3 || hasBuilt.mediumStorage) ? 'unlocked' : ''} ${basicStorage >= 3 || hasBuilt.mediumStorage ? '' : 'locked'}`}>
        <div className="storage-item-content">
                    <h3 style={{ color: '#22C55E' }}>Almacén Medio</h3>
                    <p>Capacidad: +{formatNumber(500, numberFormat)} chatarra máxima</p>
          <p>Coste: {formatNumber(mediumStorageCost, numberFormat)} chatarra</p>
          <p>Construidos: {mediumStorage} | En cola: {mediumStorageQueue.queue} {mediumStorageQueue.queue > 0 ? `| Tiempo: ~${formatTime(mediumStorageQueue.queue * mediumStorageQueue.time)}` : ''}</p>
          <p>Requisitos: 3 Almacenes Básicos (solo para el primero)</p>

          {mediumStorageQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {mediumStorageQueue.time}s | En cola: {mediumStorageQueue.queue}</p>
              <ProgressBar progress={mediumStorageQueue.progress} time={mediumStorageQueue.time} />
            </div>
          )}

          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildMediumStorage}
              disabled={scrap < mediumStorageCost || (basicStorage < 3 && !hasBuilt.mediumStorage)}
              tooltipText={getTooltipText([
                { amount: mediumStorageCost, current: scrap, text: 'Chatarra' },
                { amount: 3, current: basicStorage, text: 'Almacenes Básicos' }
              ], numberFormat)}
              className={`build-button ${scrap >= mediumStorageCost && (basicStorage >= 3 || hasBuilt.mediumStorage) ? 'unlocked' : ''}`}
            >
              Encargar Almacén Medio {buyAmount === 'max' && `(${mediumStorageMax})`}
            </BotonConTooltip>
            {mediumStorageQueue.queue > 0 && (
              <QueueControls itemName='mediumStorage' onCancel={onCancel} />
            )}
          </div>
          {basicStorage < 3 && !hasBuilt.mediumStorage && (
            <p className="requirement-warning">
              ⚠️ Necesitas 3 Almacenes Básicos
            </p>
          )}
        </div>
        <img src={storageMediumImg} alt="Almacén Medio" className="storage-item-image" />
      </div>

                        {/* Almacén Avanzado */}
            <div className={`storage-item ${scrap >= advancedStorageCost && (mediumStorage >= 1 || hasBuilt.advancedStorage) ? 'unlocked' : ''} ${mediumStorage >= 1 || hasBuilt.advancedStorage ? '' : 'locked'}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#D946EF' }}>Almacén Avanzado</h3>
                    <p>Capacidad: +{formatNumber(5000, numberFormat)} chatarra máxima</p>
                    <p>Coste: {formatNumber(advancedStorageCost, numberFormat)} chatarra</p>
          <p>Construidos: {advancedStorage} | En cola: {advancedStorageQueue.queue} {advancedStorageQueue.queue > 0 ? `| Tiempo: ~${formatTime(advancedStorageQueue.queue * advancedStorageQueue.time)}` : ''}</p>
          <p>Requisitos: 1 Almacén Medio (solo para el primero)</p>

          {advancedStorageQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {advancedStorageQueue.time}s | En cola: {advancedStorageQueue.queue}</p>
              <ProgressBar progress={advancedStorageQueue.progress} time={advancedStorageQueue.time} />
            </div>
          )}

          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildAdvancedStorage}
              disabled={scrap < advancedStorageCost || (mediumStorage < 1 && !hasBuilt.advancedStorage)}
              tooltipText={getTooltipText([
                { amount: advancedStorageCost, current: scrap, text: 'Chatarra' },
                { amount: 1, current: mediumStorage, text: 'Almacenes Medios' }
              ], numberFormat)}
              className={`build-button ${scrap >= advancedStorageCost && (mediumStorage >= 1 || hasBuilt.advancedStorage) ? 'unlocked' : ''}`}
              style={{ backgroundColor: scrap >= advancedStorageCost && (mediumStorage >= 1 || hasBuilt.advancedStorage) ? '#D946EF' : '#9CA3AF' }}
            >
              Encargar Almacén Avanzado {buyAmount === 'max' && `(${advancedStorageMax})`}
            </BotonConTooltip>
            {advancedStorageQueue.queue > 0 && (
              <QueueControls itemName='advancedStorage' onCancel={onCancel} />
            )}
          </div>
          {mediumStorage < 1 && !hasBuilt.advancedStorage && (
            <p className="requirement-warning">
              ⚠️ Necesitas 1 Almacén Medio
            </p>
          )}
        </div>
        <img src={storageAdvancedImg} alt="Almacén Avanzado" className="storage-item-image" />
      </div>

                        {/* Unidad de Acopio Cuántico */}
            <div className={`storage-item ${scrap >= quantumHoardUnitScrapCost && metalRefinado >= quantumHoardUnitMetalCost && (advancedStorage >= 3 || hasBuilt.quantumHoardUnit) ? 'unlocked' : ''} ${advancedStorage >= 3 || hasBuilt.quantumHoardUnit ? '' : 'locked'}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#D946EF' }}>Unidad de Acopio Cuántico</h3>
                    <p>Capacidad: +{formatNumber(50000, numberFormat)} chatarra máxima</p>
                    <p>Coste: {formatNumber(quantumHoardUnitScrapCost, numberFormat)} chatarra y {formatNumber(quantumHoardUnitMetalCost, numberFormat)} metal refinado</p>
          <p>Construidos: {quantumHoardUnit} | En cola: {quantumHoardUnitQueue.queue} {quantumHoardUnitQueue.queue > 0 ? `| Tiempo: ~${formatTime(quantumHoardUnitQueue.queue * quantumHoardUnitQueue.time)}` : ''}</p>
          <p>Requisitos: 3 Almacenes Avanzados (solo para el primero)</p>
          
          {quantumHoardUnitQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {quantumHoardUnitQueue.time}s | En cola: {quantumHoardUnitQueue.queue}</p>
              <ProgressBar progress={quantumHoardUnitQueue.progress} time={quantumHoardUnitQueue.time} />
            </div>
          )}
          
          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildQuantumHoardUnit}
              disabled={scrap < quantumHoardUnitScrapCost || metalRefinado < quantumHoardUnitMetalCost || (advancedStorage < 3 && !hasBuilt.quantumHoardUnit)}
              tooltipText={getTooltipText([
                { amount: quantumHoardUnitScrapCost, current: scrap, text: 'Chatarra' },
                { amount: quantumHoardUnitMetalCost, current: metalRefinado, text: 'Metal Refinado' },
                { amount: 3, current: advancedStorage, text: 'Almacenes Avanzados' }
              ], numberFormat)}
              className={`build-button ${scrap >= quantumHoardUnitScrapCost && metalRefinado >= quantumHoardUnitMetalCost && (advancedStorage >= 3 || hasBuilt.quantumHoardUnit) ? 'unlocked' : ''}`}
              style={{ backgroundColor: scrap >= quantumHoardUnitScrapCost && metalRefinado >= quantumHoardUnitMetalCost && (advancedStorage >= 3 || hasBuilt.quantumHoardUnit) ? '#D946EF' : '#9CA3AF' }}
            >
              Encargar Acopio Cuántico {buyAmount === 'max' && `(${quantumHoardUnitMax})`}
            </BotonConTooltip>
            {quantumHoardUnitQueue.queue > 0 && (
              <QueueControls itemName='quantumHoardUnit' onCancel={onCancel} />
            )}
          </div>
          {advancedStorage < 3 && !hasBuilt.quantumHoardUnit && (
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
                    <p>Capacidad: +{formatNumber(50, numberFormat)} energía máxima</p>
                    <p>Coste: {formatNumber(lithiumIonBatteryCost, numberFormat)} chatarra</p>
          <p>Construidos: {lithiumIonBattery} | En cola: {lithiumIonBatteryQueue.queue} {lithiumIonBatteryQueue.queue > 0 ? `| Tiempo: ~${formatTime(lithiumIonBatteryQueue.queue * lithiumIonBatteryQueue.time)}` : ''}</p>

          {lithiumIonBatteryQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {lithiumIonBatteryQueue.time}s | En cola: {lithiumIonBatteryQueue.queue}</p>
              <ProgressBar progress={lithiumIonBatteryQueue.progress} time={lithiumIonBatteryQueue.time} />
            </div>
          )}

          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildLithiumIonBattery}
              disabled={scrap < lithiumIonBatteryCost}
              tooltipText={getTooltipText([{ amount: lithiumIonBatteryCost, current: scrap, text: 'Chatarra' }], numberFormat)}
              className={`build-button ${scrap >= lithiumIonBatteryCost ? 'unlocked' : ''}`}
            >
              Encargar Batería {buyAmount === 'max' && `(${lithiumIonBatteryMax})`}
            </BotonConTooltip>
            {lithiumIonBatteryQueue.queue > 0 && (
              <QueueControls itemName='lithiumIonBattery' onCancel={onCancel} />
            )}
          </div>
        </div>
        <img src={batteryLithiumIonImg} alt="Batería de Iones de Litio" className="storage-item-image" />
      </div>

                        {/* Acumulador de Plasma */}
            <div className={`storage-item ${scrap >= plasmaAccumulatorCost && (lithiumIonBattery >= 5 || hasBuilt.plasmaAccumulator) ? 'unlocked' : ''} ${lithiumIonBattery >= 5 || hasBuilt.plasmaAccumulator ? '' : 'locked'}`}>
        <div className="storage-item-content">
          <h3 style={{ color: '#06B6D4' }}>Acumulador de Plasma</h3>
                    <p>Capacidad: +{formatNumber(250, numberFormat)} energía máxima</p>
                    <p>Coste: {formatNumber(plasmaAccumulatorCost, numberFormat)} chatarra</p>
          <p>Construidos: {plasmaAccumulator} | En cola: {plasmaAccumulatorQueue.queue} {plasmaAccumulatorQueue.queue > 0 ? `| Tiempo: ~${formatTime(plasmaAccumulatorQueue.queue * plasmaAccumulatorQueue.time)}` : ''}</p>
          <p>Requisitos: 5 Baterías de Iones de Litio (solo para el primero)</p>

          {plasmaAccumulatorQueue.queue > 0 && (
            <div>
              <p className="time-info">T/U: {plasmaAccumulatorQueue.time}s | En cola: {plasmaAccumulatorQueue.queue}</p>
              <ProgressBar progress={plasmaAccumulatorQueue.progress} time={plasmaAccumulatorQueue.time} />
            </div>
          )}
          
          <div className="build-actions">
            <BotonConTooltip
              onClick={onBuildPlasmaAccumulator}
              disabled={scrap < plasmaAccumulatorCost || (lithiumIonBattery < 5 && !hasBuilt.plasmaAccumulator)}
              tooltipText={getTooltipText([
                { amount: plasmaAccumulatorCost, current: scrap, text: 'Chatarra' },
                { amount: 5, current: lithiumIonBattery, text: 'Baterías de Iones de Litio' }
              ], numberFormat)}
              className={`build-button ${scrap >= plasmaAccumulatorCost && (lithiumIonBattery >= 5 || hasBuilt.plasmaAccumulator) ? 'unlocked' : ''}`}
            >
              Encargar Acumulador {buyAmount === 'max' && `(${plasmaAccumulatorMax})`}
            </BotonConTooltip>
            {plasmaAccumulatorQueue.queue > 0 && (
              <QueueControls itemName='plasmaAccumulator' onCancel={onCancel} />
            )}
          </div>
          {lithiumIonBattery < 5 && !hasBuilt.plasmaAccumulator && (
            <p className="requirement-warning">
                            ⚠️ Necesitas 5 Baterías de Iones de Litio
            </p>
          )}
        </div>
        <img src={accumulatorPlasmaImg} alt="Acumulador de Plasma" className="storage-item-image" />
      </div>

                                                {/* Campo de Contención Armónico */}
            <div className={`storage-item ${scrap >= harmonicContainmentFieldScrapCost && metalRefinado >= harmonicContainmentFieldMetalCost && (plasmaAccumulator >= 3 || hasBuilt.harmonicContainmentField) ? 'unlocked' : ''} ${plasmaAccumulator >= 3 || hasBuilt.harmonicContainmentField ? '' : 'locked'}`}>
              <div className="storage-item-content">
                <h3 style={{ color: '#D946EF' }}>Campo de Contención Armónico</h3>
                                <p>Capacidad: +{formatNumber(1200, numberFormat)} energía máxima</p>
                                <p>Coste: {formatNumber(harmonicContainmentFieldScrapCost, numberFormat)} chatarra y {formatNumber(harmonicContainmentFieldMetalCost, numberFormat)} metal refinado</p>
                <p>Construidos: {harmonicContainmentField} | En cola: {harmonicContainmentFieldQueue.queue} {harmonicContainmentFieldQueue.queue > 0 ? `| Tiempo: ~${formatTime(harmonicContainmentFieldQueue.queue * harmonicContainmentFieldQueue.time)}` : ''}</p>
                <p>Requisitos: 3 Acumuladores de Plasma (solo para el primero)</p>
                
                {harmonicContainmentFieldQueue.queue > 0 && (
                  <div>
                    <p className="time-info">T/U: {harmonicContainmentFieldQueue.time}s | En cola: {harmonicContainmentFieldQueue.queue}</p>
                    <ProgressBar progress={harmonicContainmentFieldQueue.progress} time={harmonicContainmentFieldQueue.time} />
                  </div>
                )}
                
                <div className="build-actions">
                  <BotonConTooltip
                    onClick={onBuildHarmonicContainmentField}
                    disabled={scrap < harmonicContainmentFieldScrapCost || metalRefinado < harmonicContainmentFieldMetalCost || (plasmaAccumulator < 3 && !hasBuilt.harmonicContainmentField)}
                    tooltipText={getTooltipText([
                      { amount: harmonicContainmentFieldScrapCost, current: scrap, text: 'Chatarra' },
                      { amount: harmonicContainmentFieldMetalCost, current: metalRefinado, text: 'Metal Refinado' },
                      { amount: 3, current: plasmaAccumulator, text: 'Acumuladores de Plasma' }
                    ], numberFormat)}
                    className={`build-button ${scrap >= harmonicContainmentFieldScrapCost && metalRefinado >= harmonicContainmentFieldMetalCost && (plasmaAccumulator >= 3 || hasBuilt.harmonicContainmentField) ? 'unlocked' : ''}`}
                    style={{ backgroundColor: scrap >= harmonicContainmentFieldScrapCost && metalRefinado >= harmonicContainmentFieldMetalCost && (plasmaAccumulator >= 3 || hasBuilt.harmonicContainmentField) ? '#D946EF' : '#9CA3AF' }}
                  >
                    Encargar Campo de Contención {buyAmount === 'max' && `(${harmonicContainmentFieldMax})`}
                  </BotonConTooltip>
                  {harmonicContainmentFieldQueue.queue > 0 && (
                    <QueueControls itemName='harmonicContainmentField' onCancel={onCancel} />
                  )}
                </div>
                {plasmaAccumulator < 3 && !hasBuilt.harmonicContainmentField && (
                  <p className="requirement-warning">
                                  ⚠️ Necesitas 3 Acumuladores de Plasma
                  </p>
                )}
              </div>
              <img src={harmonicContainmentFieldImg} alt="Campo de Contención Armónico" className="storage-item-image" />
            </div>
          </div>
        </div>
    );
});

export default StorageView;