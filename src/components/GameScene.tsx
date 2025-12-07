import React, { useCallback, useEffect, useRef, lazy, Suspense, useState } from 'react';
import './GameScene.css'; // Importar el archivo CSS

import energyWarningAudio from '../assets/audio/aurora/aurora_message_004.mp3'; // <-- AUDIO AÑADIDO
import { ExpeditionId, ActiveExpedition, DroneType } from '../types/gameState';
import { useGameState, useGameDispatch } from '../context/GameContext';
import ResourceBar from './ResourceBar';
import CollectionButton from './CollectionButton';
import ModulesPanel from './ModulesPanel';
import SettingsMenu from './SettingsMenu';

import FloatingTextHandler from './FloatingTextHandler';
import UnlockRequirements from './UnlockRequirements';

// Lazy load components
  const Workshop = lazy(() => import('./Workshop.tsx'));
  const EnergyView = lazy(() => import('./EnergyView.tsx'));
  const StorageView = lazy(() => import('./StorageView.tsx'));
  const MissionsPanel = lazy(() => import('./MissionsPanel.tsx'));
  const Laboratory = lazy(() => import('./Laboratory.tsx'));
  const FoundryView = lazy(() => import('./FoundryView.tsx'));
  const ShipyardView = lazy(() => import('./ShipyardView.tsx'));
  const ExpeditionView = lazy(() => import('./ExpeditionView.tsx'));

const GameScene: React.FC = () => {
        const gameState = useGameState();
    // Guarda robusta para asegurar que las partes críticas del estado están listas.
    if (!gameState || !gameState.workshop?.drones || !gameState.techCenter) {
      return <div>Cargando...</div>;
    }
        const dispatch = useGameDispatch();
  const {  
    currentView, 
    workshopBuyAmount, 
    energyBuyAmount, 
    storageBuyAmount, 
    foundryBuyAmount, 
    modules, 
    resources, 
    workshop, 
    energy, 
    techCenter,
    storage,
    activeExpeditions,
        shipyard,
    foundry,
    rates,
    notificationQueue,
    phase2Unlocked, // <-- OBTENER EL NUEVO ESTADO
                currentBackground // <-- NUEVO: Obtener el fondo actual
  } = gameState;
  const { drones, queues: workshopQueues } = workshop;

      const [isViewVisible, setIsViewVisible] = useState(false);
  const hasPlayedEnergyWarning = useRef(false);

    // --- NUEVO: Texto flotante para la producción automática ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameState.settings.floatingTextEnabled) return;

      const createFloatingText = (text: string, xPosition: number, type: 'scrap' | 'metal' | 'steel' | 'research') => {
        const mockMouseEvent = {
          clientX: window.innerWidth * xPosition,
          clientY: window.innerHeight * 0.05
        };
        const event = new CustomEvent('showFloatingText', {
          detail: { text, originalEvent: mockMouseEvent, type }
        });
        document.dispatchEvent(event);
      };

                  // Chatarra
      if (gameState.rates.scrapPerSecond !== 0) {
        const sign = gameState.rates.scrapPerSecond > 0 ? '+' : '';
        createFloatingText(`${sign}${gameState.rates.scrapPerSecond.toFixed(1)}`, 0.88, 'scrap');
      }

      // Metal Refinado
      if (gameState.rates.metalPerSecond > 0) {
        createFloatingText(`+${gameState.rates.metalPerSecond.toFixed(1)}`, 0.2, 'metal');
      }
      
            // Acero Estructural
      if (gameState.rates.steelPerSecond > 0) {
        createFloatingText(`+${gameState.rates.steelPerSecond.toFixed(1)}`, 0.25, 'steel');
      }

            // Puntos de Investigación
      if (gameState.rates.researchPerSecond > 0) {
        createFloatingText(`+${gameState.rates.researchPerSecond.toFixed(2)}`, 0.35, 'research');
      }

    }, 1000); // Se ejecuta cada segundo

        return () => clearInterval(interval);
  }, [
    gameState.settings.floatingTextEnabled, 
        gameState.rates.scrapPerSecond, 
    gameState.rates.metalPerSecond, 
    gameState.rates.steelPerSecond,
    gameState.rates.researchPerSecond
  ]);


  // Efecto para el audio de advertencia de energía
  useEffect(() => {
    const isEnergyNegative = gameState.resources.energy <= 0 && gameState.resources.energyProduction < gameState.resources.energyConsumption;

        if (isEnergyNegative && !hasPlayedEnergyWarning.current && !gameState.settings.voicesMuted) {
      const audio = new Audio(energyWarningAudio);
      const finalSfxVolume = (gameState.settings.masterVolume / 100) * (gameState.settings.sfxVolume / 100);
      audio.volume = finalSfxVolume;
      audio.play();
      hasPlayedEnergyWarning.current = true; // Marcar como reproducido
    } else if (!isEnergyNegative && hasPlayedEnergyWarning.current) {
      hasPlayedEnergyWarning.current = false; // Resetear cuando la energía vuelva a ser positiva
    }
  }, [gameState.resources.energy, gameState.resources.energyProduction, gameState.resources.energyConsumption, gameState.settings.masterVolume, gameState.settings.sfxVolume, gameState.settings.voicesMuted]);

  useEffect(() => {
    // Para la animación de entrada de los módulos
    if (currentView) {
      setIsViewVisible(false); // Primero lo ocultamos para reiniciar la animación
      const timer = setTimeout(() => setIsViewVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsViewVisible(false);
    }
    }, [currentView]);
  const onDismissNotification = useCallback(() => {
    dispatch({ type: 'DISMISS_NOTIFICATION' });
  }, [dispatch]);

        const onModuleSelect = useCallback((module: string) => {
    if (module === 'goToPhase2') {
      dispatch({ type: 'GO_TO_PHASE_2' });
    } else if (module === gameState.currentView) {
      dispatch({ type: 'CLOSE_CURRENT_VIEW' });
    } else {
      dispatch({ type: 'SET_CURRENT_VIEW', payload: module });
    }
  }, [dispatch, gameState.currentView]);

  const onClose = useCallback(() => dispatch({ type: 'CLOSE_CURRENT_VIEW' }), [dispatch]);

  // Workshop Callbacks
  const onBuildBasicDrone = useCallback(() => dispatch({ type: 'BUILD_BASIC_DRONE' }), [dispatch]);
  const onBuildMediumDrone = useCallback(() => dispatch({ type: 'BUILD_MEDIUM_DRONE' }), [dispatch]);
  const onBuildAdvancedDrone = useCallback(() => dispatch({ type: 'BUILD_ADVANCED_DRONE' }), [dispatch]);
  const onBuildReinforcedBasic = useCallback(() => dispatch({ type: 'BUILD_REINFORCED_BASIC' }), [dispatch]);
  const onBuildReinforcedMedium = useCallback(() => dispatch({ type: 'BUILD_REINFORCED_MEDIUM' }), [dispatch]);
  const onBuildReinforcedAdvanced = useCallback(() => dispatch({ type: 'BUILD_REINFORCED_ADVANCED' }), [dispatch]);
  const onBuildGolemDrone = useCallback(() => dispatch({ type: 'BUILD_GOLEM_DRONE' }), [dispatch]);
  const onBuildExpeditionDrone = useCallback(() => dispatch({ type: 'BUILD_EXPEDITION_DRONE' }), [dispatch]);
  const onBuildExpeditionV2Drone = useCallback(() => dispatch({ type: 'BUILD_EXPEDITION_V2_DRONE' }), [dispatch]);
  const onBuildWyrm = useCallback(() => dispatch({ type: 'BUILD_WYRM' }), [dispatch]);
    const onSetWorkshopBuyAmount = useCallback((amount: number | 'max') => dispatch({ type: 'SET_WORKSHOP_BUY_AMOUNT', payload: amount }), [dispatch]);
  const onCancelWorkshopItem = useCallback((itemName: string, amount: number | 'all') => {
    dispatch({ type: 'CANCEL_QUEUE_ITEM', payload: { category: 'workshop', itemName, amount } });
  }, [dispatch]);
        const onDismantleDrone = useCallback((droneType: DroneType, amount: number | 'max') => {
    if (gameState.settings.actionConfirmationsEnabled) {
      if (!window.confirm(`¿Estás seguro de que quieres desmantelar ${amount === 'max' ? 'todos los' : amount} drones de tipo ${droneType}?`)) {
        return; // El usuario canceló la acción
      }
    }
    dispatch({ type: 'DISMANTLE_DRONE', payload: { droneType, amount } });
  }, [dispatch, gameState.settings.actionConfirmationsEnabled]);
    const onRetrofitDrone = useCallback((fromDrone: DroneType, toDrone: DroneType) => {
    dispatch({ type: 'RETROFIT_DRONE', payload: { fromDrone, toDrone } });
  }, [dispatch]);

  // Energy Callbacks
  const onBuildSolarPanel = useCallback(() => dispatch({ type: 'BUILD_SOLAR_PANEL' }), [dispatch]);
  const onBuildMediumSolar = useCallback(() => dispatch({ type: 'BUILD_MEDIUM_SOLAR' }), [dispatch]);
  const onBuildAdvancedSolar = useCallback(() => dispatch({ type: 'BUILD_ADVANCED_SOLAR' }), [dispatch]);
    const onBuildEnergyCore = useCallback(() => dispatch({ type: 'BUILD_ENERGY_CORE' }), [dispatch]);
  const onBuildStabilizedEnergyCore = useCallback(() => dispatch({ type: 'BUILD_STABILIZED_ENERGY_CORE' }), [dispatch]);
  const onBuildEmpoweredEnergyCore = useCallback(() => dispatch({ type: 'BUILD_EMPOWERED_ENERGY_CORE' }), [dispatch]);
  const onBuildFusionReactor = useCallback(() => dispatch({ type: 'BUILD_FUSION_REACTOR' }), [dispatch]);
  const onSetEnergyBuyAmount = useCallback((amount: number | 'max') => dispatch({ type: 'SET_ENERGY_BUY_AMOUNT', payload: amount }), [dispatch]);
  const onCancelEnergyItem = useCallback((itemName: string, amount: number | 'all') => {
    dispatch({ type: 'CANCEL_QUEUE_ITEM', payload: { category: 'energy', itemName, amount } });
  }, [dispatch]);

  // Storage Callbacks
  const onBuildBasicStorage = useCallback(() => dispatch({ type: 'BUILD_BASIC_STORAGE' }), [dispatch]);
  const onBuildMediumStorage = useCallback(() => dispatch({ type: 'BUILD_MEDIUM_STORAGE' }), [dispatch]);
  const onBuildAdvancedStorage = useCallback(() => dispatch({ type: 'BUILD_ADVANCED_STORAGE' }), [dispatch]);
  const onBuildQuantumHoardUnit = useCallback(() => dispatch({ type: 'BUILD_QUANTUM_HOARD_UNIT' }), [dispatch]);
  const onBuildLithiumIonBattery = useCallback(() => dispatch({ type: 'BUILD_LITHIUM_ION_BATTERY' }), [dispatch]);
  const onBuildPlasmaAccumulator = useCallback(() => dispatch({ type: 'BUILD_PLASMA_ACCUMULATOR' }), [dispatch]);
  const onBuildHarmonicContainmentField = useCallback(() => dispatch({ type: 'BUILD_HARMONIC_CONTAINMENT_FIELD' }), [dispatch]);
  const onSetStorageBuyAmount = useCallback((amount: number | 'max') => dispatch({ type: 'SET_STORAGE_BUY_AMOUNT', payload: amount }), [dispatch]);
  const onCancelStorageItem = useCallback((itemName: string, amount: number | 'all') => {
    dispatch({ type: 'CANCEL_QUEUE_ITEM', payload: { category: 'storage', itemName, amount } });
  }, [dispatch]);

  
  const onCloseView = useCallback(() => dispatch({ type: 'CLOSE_CURRENT_VIEW' }), [dispatch]);

  // Expedition Callbacks
        const onStartExpedition = useCallback((expeditionId: ExpeditionId, amount: number | 'max') => {
    dispatch({ type: 'START_EXPEDITION', payload: { expeditionId, amount } });
  }, [dispatch]);
  const onClaimExpeditionReward = useCallback((expedition: ActiveExpedition) => {
    dispatch({ type: 'CLAIM_EXPEDITION_REWARDS', payload: expedition });
  }, [dispatch]);

  // Foundry Callbacks
  const onCraftRefinedMetal = useCallback(() => dispatch({ type: 'CRAFT_REFINED_METAL' }), [dispatch]);
  const onCraftStructuralSteel = useCallback(() => dispatch({ type: 'CRAFT_STRUCTURAL_STEEL' }), [dispatch]);
  const onCraftHullPlate = useCallback(() => dispatch({ type: 'CRAFT_HULL_PLATE' }), [dispatch]);
    const onCraftSuperconductorWiring = useCallback(() => dispatch({ type: 'CRAFT_SUPERCONDUCTOR_WIRING' }), [dispatch]);
  const onCraftFuelRod = useCallback(() => dispatch({ type: 'CRAFT_FUEL_ROD' }), [dispatch]);
  const onSetFoundryBuyAmount = useCallback((amount: number | 'max') => dispatch({ type: 'SET_FOUNDRY_BUY_AMOUNT', payload: amount }), [dispatch]);
  const onCancelFoundryItem = useCallback((itemName: string, amount: number | 'all') => {
    dispatch({ type: 'CANCEL_QUEUE_ITEM', payload: { category: 'foundry', itemName, amount } });
  }, [dispatch]);
  const onCraftPurifiedMetal = useCallback(() => dispatch({ type: 'CRAFT_PURIFIED_METAL' }), [dispatch]);

  // Función para obtener la URL del fondo según el estado actual
            const getBackgroundUrl = () => {
    return new URL(`../assets/images/backgrounds/Phase${currentBackground - 1}-background.png`, import.meta.url).href
  };

    const renderActiveModule = useCallback(() => {
    switch (currentView) {
                  case 'workshop':
        return (
                    <Workshop
            resources={resources}
            bodegaResources={gameState.vindicator.bodegaResources}
                        drones={drones}
            hasBuilt={workshop.hasBuilt}
            queues={workshopQueues}
            upgrades={techCenter.upgrades}
            onBuildBasicDrone={onBuildBasicDrone}
            onBuildMediumDrone={onBuildMediumDrone}
            onBuildAdvancedDrone={onBuildAdvancedDrone}
            onBuildReinforcedBasic={onBuildReinforcedBasic}
            onBuildReinforcedMedium={onBuildReinforcedMedium}
            onBuildReinforcedAdvanced={onBuildReinforcedAdvanced}
            onBuildGolemDrone={onBuildGolemDrone}
            onBuildExpeditionDrone={onBuildExpeditionDrone}
            onBuildExpeditionV2Drone={onBuildExpeditionV2Drone}
            onBuildWyrm={onBuildWyrm}
            onDismantle={onDismantleDrone}
            onRetrofit={onRetrofitDrone}
            buyAmount={workshopBuyAmount}
            onSetBuyAmount={onSetWorkshopBuyAmount}
            onClose={onClose}
            onCancel={onCancelWorkshopItem}
            numberFormat={gameState.settings.numberFormat}
          />
        );
      case 'energy':
        return (
                                        <EnergyView
            scrap={resources.scrap}
            currentEnergy={resources.energy}
            maxEnergy={resources.maxEnergy}
            energyConsumption={resources.energyConsumption}
                        solarPanels={energy.solarPanels}
            mediumSolarPanels={energy.mediumSolarPanels}
            advancedSolar={energy.advancedSolar}
            energyCores={energy.energyCores}
            stabilizedEnergyCores={energy.stabilizedEnergyCores}
                        empoweredEnergyCores={energy.empoweredEnergyCores}
            fusionReactors={energy.fusionReactor}
            hasBuilt={energy.hasBuilt}
            solarPanelsQueue={energy.queues.solarPanels}
            mediumSolarPanelsQueue={energy.queues.mediumSolarPanels}
            advancedSolarQueue={energy.queues.advancedSolar}
            energyCoresQueue={energy.queues.energyCores}
            stabilizedEnergyCoresQueue={energy.queues.stabilizedEnergyCores}
            empoweredEnergyCoresQueue={energy.queues.empoweredEnergyCores}
            fusionReactorQueue={(energy.queues as any).fusionReactor}
            onBuildSolarPanel={onBuildSolarPanel}
            onBuildMediumSolar={onBuildMediumSolar}
            onBuildAdvancedSolar={onBuildAdvancedSolar}
            onBuildEnergyCore={onBuildEnergyCore}
            onBuildStabilizedEnergyCore={onBuildStabilizedEnergyCore}
            onBuildEmpoweredEnergyCore={onBuildEmpoweredEnergyCore}
            onBuildFusionReactor={onBuildFusionReactor}
            buyAmount={energyBuyAmount}
            onSetBuyAmount={onSetEnergyBuyAmount}
            onClose={onClose}
            onCancel={onCancelEnergyItem}
            upgrades={techCenter.upgrades}
            metalRefinado={gameState.vindicator.bodegaResources.metalRefinado}
            numberFormat={gameState.settings.numberFormat}
          />
        );
            case 'storage':
        return (
                                        <StorageView
            // Resources
            scrap={resources.scrap}
            metalRefinado={gameState.vindicator.bodegaResources.metalRefinado}
            aceroEstructural={gameState.vindicator.bodegaResources.aceroEstructural}

            // Storage Units
            basicStorage={storage.basicStorage}
            mediumStorage={storage.mediumStorage}
            advancedStorage={storage.advancedStorage}
            quantumHoardUnit={storage.quantumHoardUnit}
                        lithiumIonBattery={storage.lithiumIonBattery}
            plasmaAccumulator={storage.plasmaAccumulator}
            harmonicContainmentField={storage.harmonicContainmentField}
            hasBuilt={storage.hasBuilt}

            // Storage Queues
            basicStorageQueue={storage.queues.basicStorage}
            mediumStorageQueue={storage.queues.mediumStorage}
            advancedStorageQueue={storage.queues.advancedStorage}
                        quantumHoardUnitQueue={storage.queues.quantumHoardUnit}
            lithiumIonBatteryQueue={storage.queues.lithiumIonBattery}
            plasmaAccumulatorQueue={storage.queues.plasmaAccumulator}
            harmonicContainmentFieldQueue={storage.queues.harmonicContainmentField}

            // Callbacks
            onBuildBasicStorage={onBuildBasicStorage}
            onBuildMediumStorage={onBuildMediumStorage}
            onBuildAdvancedStorage={onBuildAdvancedStorage}
            onBuildQuantumHoardUnit={onBuildQuantumHoardUnit}
            onBuildLithiumIonBattery={onBuildLithiumIonBattery}
            onBuildPlasmaAccumulator={onBuildPlasmaAccumulator}
            onBuildHarmonicContainmentField={onBuildHarmonicContainmentField}

            // Others
                                    buyAmount={storageBuyAmount}
            onSetBuyAmount={onSetStorageBuyAmount}
            onClose={onClose}
            onCancel={onCancelStorageItem}
            numberFormat={gameState.settings.numberFormat}
          />
        );
      case 'missions':
                return (
          <MissionsPanel
            onClose={onCloseView}
          />
        );
                  case 'laboratory':
        return (
          <Laboratory
            gameState={gameState}
            onResearchUpgrade={(upgradeName, cost) => dispatch({ type: 'RESEARCH_UPGRADE', payload: { upgradeName, cost } })}
            onClose={() => dispatch({ type: 'CLOSE_CURRENT_VIEW' })}
          />
        );
            case 'foundry':
        return (
                    <FoundryView
            scrap={resources.scrap}
            energy={resources.energy}
            metalRefinado={gameState.vindicator.bodegaResources.metalRefinado}
            aceroEstructural={gameState.vindicator.bodegaResources.aceroEstructural}
            fragmentosPlaca={gameState.vindicator.bodegaResources.fragmentosPlaca}
            circuitosDañados={gameState.vindicator.bodegaResources.circuitosDañados}
            placasCasco={gameState.vindicator.bodegaResources.placasCasco}
            cableadoSuperconductor={gameState.vindicator.bodegaResources.cableadoSuperconductor}
            barraCombustible={gameState.vindicator.bodegaResources.barraCombustible}

            metalRefinadoQueue={foundry?.queues?.metalRefinado}
            aceroEstructuralQueue={foundry?.queues?.aceroEstructural}
            placasCascoQueue={foundry?.queues?.placasCasco}
            cableadoSuperconductorQueue={foundry?.queues?.cableadoSuperconductor}
            barraCombustibleQueue={foundry?.queues?.barraCombustible}

            onCraftRefinedMetal={onCraftRefinedMetal}
            onCraftStructuralSteel={onCraftStructuralSteel}
            onCraftHullPlate={onCraftHullPlate}
            onCraftSuperconductorWiring={onCraftSuperconductorWiring}
            onCraftFuelRod={onCraftFuelRod}
            onCraftPurifiedMetal={onCraftPurifiedMetal}
            upgrades={techCenter.upgrades}
                        buyAmount={foundryBuyAmount}
            onSetBuyAmount={onSetFoundryBuyAmount}
            onClose={onClose}
            onCancel={onCancelFoundryItem}
            numberFormat={gameState.settings.numberFormat}
          />
        );
            case 'expeditions':
        return (
                    <ExpeditionView
            resources={resources}
            drones={drones}
            activeExpeditions={activeExpeditions}
            buyAmount={gameState.expeditionBuyAmount}
            onStartExpedition={onStartExpedition}
            onClaimReward={onClaimExpeditionReward}
            onSetBuyAmount={(amount) => dispatch({ type: 'SET_EXPEDITION_BUY_AMOUNT', payload: amount })}
            onClose={onClose}
          />
        );
                        case 'shipyard':
        return (
                                        <ShipyardView
                        shipyard={shipyard}
            vindicator={gameState.vindicator}
            resources={resources}
            researchPoints={techCenter.researchPoints}
            blueprints={gameState.blueprints}
            onClose={() => dispatch({ type: 'CLOSE_CURRENT_VIEW' })}
          />
        );
      case '': // Añadido: Manejar explícitamente la vista por defecto
      default:
        return (
                    <div className="collection-button-container">
            <CollectionButton
              onCollectScrap={() => dispatch({ type: 'COLLECT_SCRAP' })}
              scrapPerClick={rates.scrapPerClick}
                        />
          </div>
        );
    }
  }, [currentView, gameState, workshopBuyAmount, energyBuyAmount, storageBuyAmount, foundryBuyAmount, onClose, onCloseView, onBuildBasicDrone, onBuildMediumDrone, onBuildAdvancedDrone, onBuildReinforcedBasic, onBuildReinforcedMedium, onBuildReinforcedAdvanced, onBuildGolemDrone, onBuildExpeditionDrone, onBuildExpeditionV2Drone, onBuildWyrm, onDismantleDrone, onRetrofitDrone, onSetWorkshopBuyAmount, onCancelWorkshopItem, onBuildSolarPanel, onBuildMediumSolar, onBuildAdvancedSolar, onBuildEnergyCore, onBuildStabilizedEnergyCore, onBuildEmpoweredEnergyCore, onBuildFusionReactor, onSetEnergyBuyAmount, onCancelEnergyItem, onBuildBasicStorage, onBuildMediumStorage, onBuildAdvancedStorage, onBuildQuantumHoardUnit, onBuildLithiumIonBattery, onBuildPlasmaAccumulator, onBuildHarmonicContainmentField, onSetStorageBuyAmount, onCancelStorageItem, onStartExpedition, onClaimExpeditionReward, onCraftRefinedMetal, onCraftStructuralSteel, onCraftHullPlate, onCraftSuperconductorWiring, onCraftFuelRod, onCraftPurifiedMetal, onSetFoundryBuyAmount, onCancelFoundryItem]);

            return (
    <div className="game-scene-container" style={{ backgroundImage: `url(${getBackgroundUrl()})` }}>
      <ResourceBar />

      {resources.energy <= 0 && resources.energyProduction < resources.energyConsumption && (
        <div className="energy-warning">
          <strong>Advertencia:</strong> Balance energético negativo. La producción de recursos está detenida.
        </div>
            )}

                                    <div className="main-content">
        {/* Contenedor para toda la columna izquierda */}
                <div className="main-view-wrapper">
          <Suspense fallback={<div className="loading-module">Cargando...</div>}>
            {/* El panel de desbloqueos solo se muestra si no hay una vista activa */}
            {currentView === '' && <UnlockRequirements
              workshopUnlocked={modules.workshop}
              energyUnlocked={modules.energy}
              storageUnlocked={modules.storage}
              laboratoryUnlocked={modules.techCenter}
              foundryUnlocked={modules.foundry}
              expeditionsUnlocked={modules.expeditions}
              shipyardUnlocked={modules.shipyard}
              scrapForUnlock={resources.scrap}
              mediumDronesForUnlock={drones.medium}
              advancedSolarForUnlock={energy.advancedSolar}
              foundryProtocolsUpgrade={techCenter.upgrades.foundryProtocols}
            />}
            <div className={`module-container ${currentView && gameState.settings.uiAnimationsEnabled ? `view-fade-in ${isViewVisible ? 'visible' : ''}` : ''}`} key={currentView}>
                {renderActiveModule()}
            </div>
          </Suspense>
        </div>

        {/* El panel de módulos ahora es el segundo hijo directo, forzándolo a la derecha */}
        <ModulesPanel
          workshopUnlocked={modules.workshop}
          energyUnlocked={modules.energy}
          storageUnlocked={modules.storage}
          laboratoryUnlocked={modules.techCenter}
          foundryUnlocked={modules.foundry}
          expeditionsUnlocked={modules.expeditions}
          shipyardUnlocked={modules.shipyard}
          phase2Unlocked={phase2Unlocked}
          currentView={currentView}
          onModuleSelect={onModuleSelect}
                />
      </div>

            <SettingsMenu />
    </div>
  );
};

export default GameScene;