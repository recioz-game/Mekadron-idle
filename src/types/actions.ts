import { ExpeditionId } from './gameState';

// src/types/actions.ts

// Define los tipos de acciones que se pueden dispatchar
export type ActionType =
  | { type: 'START_GAME' }
  | { type: 'SHOW_MAIN_SCENE' }
  | { type: 'RESET_GAME' }
  | { type: 'COLLECT_SCRAP' }
  | { type: 'SET_CURRENT_VIEW'; payload: string }
  | { type: 'CLOSE_CURRENT_VIEW' }
  | { type: 'CLOSE_AURORA_MESSAGE' }
  | { type: 'ADD_AURORA_MESSAGE'; payload: { message: string; messageKey: string } }
  | { type: 'GAME_TICK' }
    | { type: 'UPDATE_MISSION_PROGRESS' }
  | { type: 'CLAIM_REWARD'; payload: string }
  | { type: 'RESEARCH_UPGRADE'; payload: { upgradeName: string; cost: number } }
  | { type: 'SET_WORKSHOP_BUY_AMOUNT'; payload: number | 'max' }
  | { type: 'SET_ENERGY_BUY_AMOUNT'; payload: number | 'max' }
  | { type: 'SET_STORAGE_BUY_AMOUNT'; payload: number | 'max' }
  | { type: 'SET_FOUNDRY_BUY_AMOUNT'; payload: number | 'max' }
  | { type: 'BUILD_BASIC_DRONE' }
  | { type: 'BUILD_MEDIUM_DRONE' }
  | { type: 'BUILD_ADVANCED_DRONE' }
  | { type: 'BUILD_REINFORCED_BASIC' }
  | { type: 'BUILD_REINFORCED_MEDIUM' }
  | { type: 'BUILD_REINFORCED_ADVANCED' }
  | { type: 'BUILD_GOLEM_DRONE' }
  | { type: 'BUILD_EXPEDITION_DRONE' }
  | { type: 'BUILD_WYRM' }
  | { type: 'BUILD_SOLAR_PANEL' }
  | { type: 'BUILD_MEDIUM_SOLAR' }
  | { type: 'BUILD_ADVANCED_SOLAR' }
  | { type: 'BUILD_ENERGY_CORE' }
  | { type: 'BUILD_BASIC_STORAGE' }
  | { type: 'BUILD_MEDIUM_STORAGE' }
  | { type: 'BUILD_ADVANCED_STORAGE' }
  | { type: 'BUILD_QUANTUM_HOARD_UNIT' }
  | { type: 'BUILD_LITHIUM_ION_BATTERY' }
  | { type: 'BUILD_PLASMA_ACCUMULATOR' }
  | { type: 'BUILD_HARMONIC_CONTAINMENT_FIELD' }
  | { type: 'ACTIVATE_FOUNDRY' }
  | { type: 'CRAFT_REFINED_METAL' }
  | { type: 'CRAFT_STRUCTURAL_STEEL' }
  | { type: 'CRAFT_HULL_PLATE' }
  | { type: 'CRAFT_SUPERCONDUCTOR_WIRING' }
  | { type: 'START_EXPEDITION'; payload: { expeditionId: ExpeditionId; droneCount: number } }
  | { type: 'CLAIM_EXPEDITION_REWARDS'; payload: ExpeditionId }
  | { type: 'DONATE_TO_SHIPYARD'; payload: { component: string; resource: string; amount: number } }
  | { type: 'DISMISS_NOTIFICATION' }
  | { type: 'DEBUG_UNLOCK_TECH_CENTER' }
    | { type: 'DEBUG_COMPLETE_VINDICATOR' }
  | { type: 'DEBUG_FINISH_EXPEDITIONS' }
    | { type: 'PROCESS_OFFLINE_PROGRESS'; payload: { secondsOffline: number } }
  | { type: 'START_PHASE_2' }
  | { type: 'RETURN_TO_PHASE_1' }
  | { type: 'GO_TO_PHASE_2' }
  | { type: 'SELECT_BATTLE_DESTINATION'; payload: number }
  | { type: 'START_BATTLE' }
  | { type: 'PLAYER_ATTACK' }
  | { type: 'CANCEL_QUEUE_ITEM'; payload: { category: string; itemName: string; amount: number | 'all' } };

