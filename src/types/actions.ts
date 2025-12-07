import { ActiveExpedition, GameState, DroneType } from '../types/gameState';
import { ResourceCategory } from '../data/categoryData';

export type ActionType =
  | { type: 'LOAD_STATE'; payload: GameState }
  | { type: 'SET_WORKSHOP_BUY_AMOUNT'; payload: number | 'max' }
  | { type: 'GAME_TICK' }
  | { type: 'COLLECT_SCRAP' }
  | { type: 'SET_CURRENT_VIEW'; payload: string }
  | { type: 'CLOSE_CURRENT_VIEW' }
  | { type: 'RESEARCH_UPGRADE'; payload: { upgradeName: string; cost: number } }
  | { type: 'START_EXPEDITION'; payload: { expeditionId: string; amount: number | 'max' } }
  | { type: 'CLAIM_EXPEDITION_REWARDS'; payload: ActiveExpedition }
  | { type: 'RESET_GAME' }
  | { type: 'DISMISS_NOTIFICATION' }
  | { type: 'SET_ENERGY_BUY_AMOUNT'; payload: number | 'max' }
  | { type: 'SET_STORAGE_BUY_AMOUNT'; payload: number | 'max' }
  | { type: 'SET_FOUNDRY_BUY_AMOUNT'; payload: number | 'max' }
  | { type: 'SET_EXPEDITION_BUY_AMOUNT'; payload: number | 'max' }
  | { type: 'ACTIVATE_FOUNDRY' }
  | { type: 'START_GAME' }
  | { type: 'SHOW_MAIN_SCENE' }
  | { type: 'RETURN_TO_PHASE_1' }
  | { type: 'GO_TO_PHASE_2' }
  | { type: 'GO_TO_PHASE_2_VIEW'; payload: string }
  | { type: 'ADD_AURORA_MESSAGE'; payload: { message: string; messageKey: string; audioId?: number } }
  | { type: 'REMOVE_AURORA_MESSAGE'; payload: { messageId: number } }
  | { type: 'PROCESS_AURORA_QUEUE' }
  | { type: 'DEBUG_UNLOCK_TECH_CENTER' }
  | { type: 'DEBUG_COMPLETE_VINDICATOR' }
  | { type: 'DEBUG_FINISH_EXPEDITIONS' }
  | { type: 'DEBUG_UNLOCK_VINDICATOR_MK1' }
  | { type: 'DEBUG_UNLOCK_VINDICATOR_MK2' }
  | { type: 'DEBUG_UNLOCK_VINDICATOR_MK3' }
  | { type: 'DEBUG_UNLOCK_VINDICATOR_MK4' }
  | { type: 'DEBUG_UNLOCK_VINDICATOR_MK5' }
  | { type: 'DEBUG_UNLOCK_VINDICATOR_MK6' }
  | { type: 'DEBUG_UNLOCK_VINDICATOR_MK7' }
  | { type: 'DEBUG_UNLOCK_VINDICATOR_MK8' }
  | { type: 'DEBUG_UNLOCK_VINDICATOR_MK9' }
  | { type: 'DONATE_TO_SHIPYARD'; payload: { component: string; resource: string; amount: number } }
  | { type: 'REPAIR_VINDICATOR_HEALTH'; payload: { scrapCost: number } }
  | { type: 'REPAIR_VINDICATOR_SHIELD'; payload: { fuelCost: number } }
  | { type: 'UPGRADE_VINDICATOR_STAR'; payload: { upgradeId: string } }
  | { type: 'UPGRADE_VINDICATOR_MK2_STAR'; payload: { upgradeId: string } }
  | { type: 'UPGRADE_VINDICATOR_MK3_STAR'; payload: { upgradeId: string } }
  | { type: 'UPGRADE_VINDICATOR_MK4_STAR'; payload: { upgradeId: string } }
  | { type: 'UPGRADE_VINDICATOR_MK5_STAR'; payload: { upgradeId: string } }
  | { type: 'UPGRADE_VINDICATOR_MK6_STAR'; payload: { upgradeId: string } }
  | { type: 'UPGRADE_VINDICATOR_MK7_STAR'; payload: { upgradeId: string } }
  | { type: 'UPGRADE_VINDICATOR_MK8_STAR'; payload: { upgradeId: string } }
  | { type: 'UPGRADE_VINDICATOR_MK9_STAR'; payload: { upgradeId: string } }
  | { type: 'LEVEL_UP_VINDICATOR' }
  | { type: 'LEVEL_UP_VINDICATOR_MK2' }
  | { type: 'LEVEL_UP_VINDICATOR_MK3' }
  | { type: 'LEVEL_UP_VINDICATOR_MK4' }
  | { type: 'LEVEL_UP_VINDICATOR_MK5' }
  | { type: 'LEVEL_UP_VINDICATOR_MK6' }
  | { type: 'LEVEL_UP_VINDICATOR_MK7' }
  | { type: 'LEVEL_UP_VINDICATOR_MK8' }
  | { type: 'LEVEL_UP_VINDICATOR_MK9' }
  | { type: 'SET_MASTER_VOLUME'; payload: number }
  | { type: 'SET_MUSIC_VOLUME'; payload: number }
  | { type: 'SET_SFX_VOLUME'; payload: number }
  | { type: 'SET_VOICE_VOLUME'; payload: number }
  | { type: 'TOGGLE_VOICES_MUTED' }
  | { type: 'TOGGLE_UI_ANIMATIONS' }
  | { type: 'TOGGLE_FLOATING_TEXT' }
  | { type: 'SET_NUMBER_FORMAT'; payload: 'full' | 'abbreviated' | 'scientific' }
  | { type: 'TOGGLE_AURORA_NOTIFICATIONS' }
  | { type: 'TOGGLE_ACTION_CONFIRMATIONS' }
  | { type: 'ENABLE_DEV_TOOLS' }
  | { type: 'SHOW_CREDITS' }
  | { type: 'CLOSE_CREDITS' }
  | { type: 'SELECT_CHAPTER'; payload: number }
  | { type: 'BACK_TO_CHAPTER_SELECT' }
  | { type: 'SELECT_DESTINATION'; payload: any }
  | { type: 'START_BATTLE' }
  | { type: 'PLAYER_ATTACK' }
  | { type: 'ENEMY_ATTACK'; payload: number }
  | { type: 'BATTLE_WON' }
  | { type: 'BATTLE_LOST' }
  | { type: 'EXIT_BATTLE' }
  | { type: 'COLLECT_BATTLE_REWARDS' }
  | { type: 'START_ENEMY_TURN' }
  | { type: 'UPDATE_MISSION_PROGRESS'; payload?: any }
  | { type: 'CRAFT_VINDICATOR_MODULE'; payload: { moduleId: string } }
  | { type: 'RETROFIT_DRONE'; payload: { fromDrone: DroneType; toDrone: DroneType } }
  | { type: 'UPGRADE_BODEGA_CATEGORY'; payload: { category: ResourceCategory } }
  | { type: 'TOGGLE_GOD_MODE' }
  // Construction Actions
  | { type: 'BUILD_BASIC_DRONE' }
  | { type: 'BUILD_MEDIUM_DRONE' }
  | { type: 'BUILD_ADVANCED_DRONE' }
  | { type: 'BUILD_REINFORCED_BASIC' }
  | { type: 'BUILD_REINFORCED_MEDIUM' }
  | { type: 'BUILD_REINFORCED_ADVANCED' }
  | { type: 'BUILD_GOLEM_DRONE' }
  | { type: 'BUILD_EXPEDITION_DRONE' }
  | { type: 'BUILD_EXPEDITION_V2_DRONE' }
  | { type: 'BUILD_WYRM' }
  | { type: 'BUILD_SOLAR_PANEL' }
  | { type: 'BUILD_MEDIUM_SOLAR' }
  | { type: 'BUILD_ADVANCED_SOLAR' }
  | { type: 'BUILD_ENERGY_CORE' }
  | { type: 'BUILD_STABILIZED_ENERGY_CORE' }
  | { type: 'BUILD_EMPOWERED_ENERGY_CORE' }
  | { type: 'BUILD_FUSION_REACTOR' }
  | { type: 'BUILD_BASIC_STORAGE' }
  | { type: 'BUILD_MEDIUM_STORAGE' }
  | { type: 'BUILD_ADVANCED_STORAGE' }
  | { type: 'BUILD_QUANTUM_HOARD_UNIT' }
  | { type: 'BUILD_LITHIUM_ION_BATTERY' }
  | { type: 'BUILD_PLASMA_ACCUMULATOR' }
  | { type: 'BUILD_HARMONIC_CONTAINMENT_FIELD' }
  | { type: 'CRAFT_REFINED_METAL' }
  | { type: 'CRAFT_STRUCTURAL_STEEL' }
  | { type: 'CRAFT_HULL_PLATE' }
  | { type: 'CRAFT_SUPERCONDUCTOR_WIRING' }
  | { type: 'CRAFT_FUEL_ROD' }
  | { type: 'CRAFT_PURIFIED_METAL' }
  | { type: 'DISMANTLE_DRONE'; payload: { droneType: DroneType; amount: number | 'max' } }
  | { type: 'CANCEL_QUEUE_ITEM'; payload: { category: string; itemName: string; amount: number | 'all' } }
  // Combat Actions
  | { type: 'SELECT_BATTLE_DESTINATION'; payload: number }
  | { type: 'ENEMY_RESPONSE' }
  | { type: 'ADVANCE_TO_NEXT_BATTLE' }
  | { type: 'ESCAPE_COMBAT' }
  // Mission Actions
  | { type: 'CLAIM_REWARD'; payload: string };



   


    
