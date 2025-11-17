import React, { useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import './GameScene.css'; // Importar el archivo CSS

import mainThemeAudio from '../assets/audio/main-theme.wav'; // 1. Importar el audio
import { ExpeditionId, ActiveExpedition, DroneType } from '../types/gameState';
import { useGameState, useGameDispatch } from '../context/GameContext';
import ResourceBar from './ResourceBar';
import CollectionButton from './CollectionButton';
import ModulesPanel from './ModulesPanel';
// import Workshop from './Workshop'; // Lazy loaded
// import EnergyView from './EnergyView'; // Lazy loaded
// import StorageView from './StorageView'; // Lazy loaded
// import MissionsPanel from './MissionsPanel'; // Lazy loaded
// import Laboratory from './Laboratory'; // Lazy loaded
// import FoundryView from './FoundryView'; // Lazy loaded
// import ShipyardView from './ShipyardView'; // Lazy loaded
// import ExpeditionView from './ExpeditionView'; // Lazy loaded
import SettingsMenu from './SettingsMenu';
import NotificationToast from './NotificationToast';
import FloatingTextHandler from './FloatingTextHandler';

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
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = gameState.settings.volume / 100;
    }
  }, [gameState.settings.volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => console.log("La reproducción automática fue bloqueada. Se requiere interacción del usuario."));
    }
  }, []);

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
  const onDismissNotification = useCallback(() => {
    dispatch({ type: 'DISMISS_NOTIFICATION' });
  }, [dispatch]);

    const onModuleSelect = useCallback((module: string) => {
    if (module === 'goToPhase2') {
      dispatch({ type: 'GO_TO_PHASE_2' });
    } else {
      dispatch({ type: 'SET_CURRENT_VIEW', payload: module });
    }
  }, [dispatch]);

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
    const onDismantleDrone = useCallback((droneType: string, amount: number | 'max') => {
    dispatch({ type: 'DISMANTLE_DRONE', payload: { droneType, amount } });
  }, [dispatch]);
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
    const onStartExpedition = useCallback((expeditionId: ExpeditionId) => {
    dispatch({ type: 'START_EXPEDITION', payload: { expeditionId } });
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

  const renderActiveModule = () => {
    switch (currentView) {
                  case 'workshop':
        return (
          <Workshop
            resources={resources}
            bodegaResources={gameState.vindicator.bodegaResources}
            drones={drones}
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
          />
        );
            case 'expeditions':
        return (
          <ExpeditionView
            resources={resources}
            drones={drones}
            activeExpeditions={activeExpeditions}
            onStartExpedition={onStartExpedition}
            onClaimReward={onClaimExpeditionReward}
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
  };

    return (
    <div className="game-scene-container" style={{ backgroundImage: `url(${getBackgroundUrl()})` }}>
      <ResourceBar />

      {resources.energy <= 0 && resources.energyProduction < resources.energyConsumption && (
        <div className="energy-warning">
          <strong>Advertencia:</strong> Balance energético negativo. La producción de recursos está detenida.
        </div>
      )}

                                    <div className="main-content">
        <div className="module-container">
          <Suspense fallback={<div className="loading-module">Cargando Módulo...</div>}>
            {renderActiveModule()}
          </Suspense>
        </div>

                <ModulesPanel
          workshopUnlocked={modules.workshop} // <-- CORREGIDO
          energyUnlocked={modules.energy}
          storageUnlocked={modules.storage}
          laboratoryUnlocked={modules.techCenter}
          foundryUnlocked={modules.foundry}
          expeditionsUnlocked={modules.expeditions}
          shipyardUnlocked={modules.shipyard}
          phase2Unlocked={phase2Unlocked}
          currentView={currentView}
          onModuleSelect={onModuleSelect}
          scrapForUnlock={resources.scrap}
          mediumDronesForUnlock={drones.medium}
          advancedSolarForUnlock={energy.advancedSolar}
          foundryProtocolsUpgrade={techCenter.upgrades.foundryProtocols}
        />
      </div>

      <SettingsMenu />
            <NotificationToast
        notification={notificationQueue && notificationQueue.length > 0 ? notificationQueue[0] : null}
        onDismiss={onDismissNotification}
      />
      <FloatingTextHandler />
      <audio ref={audioRef} src={mainThemeAudio} loop />
    </div>
  );
};

export default GameScene;