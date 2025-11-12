import { GameState, Mission } from '../types/gameState';
import { ActionType } from '../types/actions';
import { allMissions } from '../data/missionsData';
import { allShipyardProjects } from '../data/shipyardData';

export const missionsReducer = (state: GameState, action: ActionType): GameState => {
  switch (action.type) {
    case 'UPDATE_MISSION_PROGRESS': {
      const { resources, workshop, energy, storage, techCenter, modules, shipyard, missions, rates } = state;
      const { drones } = workshop;
      let vindicatorCompletedThisTick = false;

      const missionsWithUpdatedProgress = missions.activeMissions.map(mission => {
        if (mission.completed) return mission;

        let currentProgress = mission.current;
        
        switch (mission.id) {
          case 'main_1_unlock_tech':
            currentProgress = (techCenter.unlocked ? 1 : 0) + (modules.foundry ? 1 : 0);
            break;
          case 'main_2_produce_alloys':
            currentProgress = resources.metalRefinado + resources.aceroEstructural;
            break;
          case 'main_3_expeditions':
            currentProgress = state.activeExpeditions.filter(exp => exp.completionTimestamp > 0).length;
            break;
          case 'main_4_fabricate_components':
            currentProgress = resources.placasCasco + resources.cableadoSuperconductor;
            break;
          case 'main_5_final_assembly': {
            const currentProject = allShipyardProjects[shipyard.currentProjectIndex];
            if (!currentProject) {
              currentProgress = 0;
              break;
            }

            const componentKeys = Object.keys(currentProject.costs);
            const isComplete = componentKeys.every(key => {
              const costSpec = currentProject.costs[key];
              const progressSpec = shipyard.progress[key] || {};
              const resourceKeys = Object.keys(costSpec);
              return resourceKeys.every(resourceKey => 
                (progressSpec[resourceKey] || 0) >= costSpec[resourceKey]
              );
            });
            currentProgress = isComplete ? 1 : 0;

            if (isComplete && !mission.completed) {
              vindicatorCompletedThisTick = true;
            }
            break;
          }
          
          case 'sec_1_1_basic_fleet':
            currentProgress = drones.basic;
            break;
          case 'sec_1_2_scrap_engine_i':
            currentProgress = rates.scrapPerSecond;
            break;
          case 'sec_1_3_power_surplus_i':
            if (resources.energyProduction - resources.energyConsumption >= 20) {
              currentProgress = (mission.current || 0) + 1;
            } else {
              currentProgress = 0;
            }
            break;
          case 'sec_1_4_scrap_reserves':
            currentProgress = resources.maxScrap;
            break;
          case 'sec_1_5_charged_batteries':
            currentProgress = resources.maxEnergy;
            break;
          case 'sec_1_6_expanding_force':
            currentProgress = drones.medium > 0 ? 1 : 0;
            break;
          case 'sec_1_7_continuous_operation':
            if (resources.energy > 0) {
              currentProgress = (mission.current || 0) + 1;
            } else {
              currentProgress = 0;
            }
            break;
          case 'sec_1_8_scrap_engine_ii':
            currentProgress = rates.scrapPerSecond;
            break;
          case 'sec_1_9_first_gigawatt':
            currentProgress = energy.solarPanels + energy.mediumSolarPanels + energy.advancedSolar;
            break;
          case 'sec_1_10_self_sufficiency':
            currentProgress = (drones.basic > 0 ? 1 : 0) + (drones.medium > 0 ? 1 : 0) + (energy.solarPanels > 0 ? 1 : 0) + (storage.basicStorage > 0 ? 1 : 0);
            break;

          case 'sec_2_1_collective_mind_i':
            currentProgress = techCenter.researchPoints;
            break;
          case 'sec_2_2_first_alloy':
            currentProgress = resources.metalRefinado > 0 ? 1 : 0;
            break;
          case 'sec_2_3_always_optimizing':
            currentProgress = Object.values(techCenter.upgrades).filter(level => level > 0).length;
            break;
          case 'sec_2_4_balanced_fleet':
            if (drones.basic >= 20 && drones.medium >= 10 && drones.advanced >= 5) {
              currentProgress = 35;
            } else {
              currentProgress = 0;
            }
            break;
          case 'sec_2_5_basic_metallurgy':
            currentProgress = resources.metalRefinado;
            break;
          case 'sec_2_6_one_step_ahead':
            currentProgress = drones.advanced > 0 ? 1 : 0;
            break;
          case 'sec_2_7_efficiency_master':
            currentProgress = Math.max(0, ...Object.values(techCenter.upgrades));
            break;
          case 'sec_2_8_front_line':
            currentProgress = drones.reinforcedBasic + drones.reinforcedMedium + drones.reinforcedAdvanced;
            break;
          case 'sec_2_9_advanced_siderurgy':
            currentProgress = resources.aceroEstructural;
            break;
          case 'sec_2_10_collective_mind_ii':
            currentProgress = techCenter.researchPoints;
            break;

          case 'sec_3_1_rookie_explorer':
            break;
          case 'sec_3_2_a_titan_is_born':
            currentProgress = drones.golem > 0 ? 1 : 0;
            break;
          case 'sec_3_3_seasoned_adventurer':
            break;
          case 'sec_3_4_dragons_hoard':
            currentProgress = resources.scrap;
            break;
          case 'sec_3_5_final_preparations':
            if(resources.metalRefinado >= 500 && resources.aceroEstructural >= 100){
              currentProgress = 600;
            } else {
              currentProgress = 0;
            }
            break;
          case 'sec_3_6_steel_army':
            currentProgress = Object.values(drones).reduce((a, b) => a + b, 0);
            break;
          case 'sec_3_7_the_great_wyrm':
            currentProgress = drones.wyrm > 0 ? 1 : 0;
            break;
          case 'sec_3_8_legendary_treasure_hunter':
            break;
          case 'sec_3_9_mass_production':
            currentProgress = resources.metalRefinado + resources.aceroEstructural;
            break;
          case 'sec_3_10_industrial_empire':
            currentProgress = rates.scrapPerSecond;
            break;
        }
        
        const newCurrent = Math.min(currentProgress, mission.target);
        if (newCurrent !== mission.current) {
            return { ...mission, current: newCurrent };
        }
        return mission;
      });

      if (vindicatorCompletedThisTick) {
        return {
          ...state,
          currentScene: 'phase2Intro',
          phase2Unlocked: true,
          missions: {
            ...state.missions,
            activeMissions: missionsWithUpdatedProgress.filter(m => m.id !== 'main_5_final_assembly'),
            completedMissions: [...state.missions.completedMissions, 'main_5_final_assembly'],
          }
        };
      }
      
      return {
        ...state,
        missions: {
          ...state.missions,
          activeMissions: missionsWithUpdatedProgress,
        }
      };
    }
    
    case 'CLAIM_REWARD': {
      const missionId = action.payload;
      const mission = state.missions.activeMissions.find(m => m.id === missionId);

      if (!mission || mission.current < mission.target) {
        return state;
      }

      let canClaim = true;
      switch (mission.reward.type) {
        case 'scrap':
          canClaim = state.resources.scrap + mission.reward.value <= state.resources.maxScrap;
          break;
        case 'energy':
          canClaim = state.resources.energy + mission.reward.value <= state.resources.maxEnergy;
          break;
        default:
          canClaim = true;
      }

      if (!canClaim) {
        return state;
      }

      let newResources = { ...state.resources };
      let newWorkshop = { 
        ...state.workshop,
        drones: { ...state.workshop.drones } // <-- Crear una copia del objeto drones
      };
      switch (mission.reward.type) {
        case 'scrap':
          newResources.scrap += mission.reward.value;
          break;
        case 'energy':
          newResources.energy += mission.reward.value;
          break;
        case 'nucleoSingularidad':
          newResources.nucleoSingularidad += mission.reward.value;
          break;
        case 'drone':
          // Lógica para añadir un dron básico
          newWorkshop.drones.basic += 1;
          break;
      }

      const updatedActiveMissions = state.missions.activeMissions.filter(m => m.id !== missionId);
      const newCompletedMissions = [...state.missions.completedMissions, missionId];
      const missionsToAdd: Mission[] = [];

      if (mission.isMain) {
        const missionIndex = allMissions.findIndex(m => m.id === missionId);
        if (missionIndex !== -1 && missionIndex + 1 < allMissions.length) {
          const nextMission = allMissions[missionIndex + 1];
          if (!state.missions.activeMissions.some(m => m.id === nextMission.id) && !state.missions.completedMissions.includes(nextMission.id)) {
            missionsToAdd.push({ ...nextMission, current: 0, completed: false });
          }
        }
      }

      const finalActiveMissions = [...updatedActiveMissions, ...missionsToAdd];

      let newState = {
        ...state,
        resources: newResources,
        workshop: newWorkshop,
        missions: {
          ...state.missions,
          activeMissions: finalActiveMissions,
          completedMissions: newCompletedMissions,
        }
      };

      if (mission.isMain) {
        newState.aurora.pendingMessages.push({
          message: `Misión principal completada: ${mission.title}. Nuevos objetivos disponibles.`,
          key: `mission_complete_${mission.id}`
        });
      }

      return newState;
    }

    default:
      return state;
  }
};
