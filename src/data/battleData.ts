export interface Battle {
  enemyName: string;
  assetFolder: string;
  assetFilename: string;
  health: number;
  shield: number;
  damage: number;
  reward: {
    scrap: number; 
    aleacionReforzadaRobada?: number;
    neuroChipCorrupto?: number;
    blueprints?: number;
    matrizQuitinaCristal?: number;
    nucleoSinapticoFracturado?: number;
    planosMK2?: number;
    moduloManiobrasTácticas?: number;
    placasCamuflajeActivo?: number;
    planosDeInterceptor?: number;
    // Capítulo 4
    placasDeAetherium?: number;
    nucleoPsionicoArmonico?: number;
    planosMK3?: number;
    // Capítulo 5
    tejidoAbisalRetorcido?: number;
    singularidadCorruptaContenida?: number;
    planosMK4?: number;
    // Capítulo 6
    esquirlasDeReliquia?: number;
    codexAncestral?: number;
    planosMK5?: number;
    // Capítulo 7
    fragmentoHorizonteSucesos?: number;
    energiaPuntoCero?: number;
    planosMK6?: number;
    // Capítulo 8
    esenciaDelVacio?: number;
    reliquiaCorrupta?: number;
    planosMK7?: number;
    // Capítulo 9
    nucleoEspectral?: number;
    conexionFantasmal?: number;
    planosMK8?: number;
    // Capítulo 10
    fragmentoDeCiudadela?: number;
    matrizDeOverlord?: number;
    planosMK9?: number;
        aleacionReforzadaElite?: number;
    neuroChipCorruptoElite?: number;
    matrizQuitinaCristalElite?: number;
    nucleoSinapticoFracturadoElite?: number;
    moduloManiobrasTácticasElite?: number;
    placasCamuflajeActivoElite?: number;
    placasDeAetheriumElite?: number;
    nucleoPsionicoArmonicoElite?: number;
    tejidoAbisalRetorcidoElite?: number;
    singularidadCorruptaContenidaElite?: number;
  };
  type?: 'regular' | 'mini-boss' | 'boss';
}

export interface Destination {
  name: string;
  description: string;
  battles: Battle[];
  isBoss?: boolean;
}

export interface VindicatorLevel {
  level: number;
  blueprintCost: number; // Costo en planos para ALCANZAR este nivel
  researchPointsCost?: number; // Coste en Puntos de Investigación
  statBonus: { // Bonificación de estadísticas FIJA que se añade al subir a este nivel
    health: number;
    shield: number;
    damage: number;
  };
}

// Datos de progresión para el nivel del Vindicator
export const vindicatorLevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, researchPointsCost: 10000, statBonus: { health: 100, shield: 50, damage: 10 } },
  { level: 3, blueprintCost: 15, researchPointsCost: 25000, statBonus: { health: 150, shield: 75, damage: 15 } },
  { level: 4, blueprintCost: 20, researchPointsCost: 75000, statBonus: { health: 200, shield: 100, damage: 20 } },
  { level: 5, blueprintCost: 30, researchPointsCost: 200000, statBonus: { health: 250, shield: 125, damage: 25 } },
  { level: 6, blueprintCost: 35, researchPointsCost: 500000, statBonus: { health: 300, shield: 150, damage: 30 } },
  { level: 7, blueprintCost: 40, researchPointsCost: 1250000, statBonus: { health: 350, shield: 175, damage: 35 } },
  { level: 8, blueprintCost: 45, researchPointsCost: 3000000, statBonus: { health: 400, shield: 200, damage: 40 } },
  { level: 9, blueprintCost: 50, researchPointsCost: 7500000, statBonus: { health: 450, shield: 225, damage: 45 } },
  { level: 10, blueprintCost: 60, researchPointsCost: 20000000, statBonus: { health: 500, shield: 250, damage: 50 } },
];

export const vindicatorMK2LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, researchPointsCost: 25000000, statBonus: { health: 250, shield: 125, damage: 25 } },
  { level: 3, blueprintCost: 15, researchPointsCost: 37500000, statBonus: { health: 300, shield: 150, damage: 30 } },
  { level: 4, blueprintCost: 20, researchPointsCost: 56250000, statBonus: { health: 350, shield: 175, damage: 35 } },
  { level: 5, blueprintCost: 25, researchPointsCost: 84375000, statBonus: { health: 400, shield: 200, damage: 40 } },
  { level: 6, blueprintCost: 30, researchPointsCost: 126562500, statBonus: { health: 450, shield: 225, damage: 45 } },
  { level: 7, blueprintCost: 35, researchPointsCost: 189843750, statBonus: { health: 500, shield: 250, damage: 50 } },
  { level: 8, blueprintCost: 40, researchPointsCost: 284765625, statBonus: { health: 550, shield: 275, damage: 55 } },
  { level: 9, blueprintCost: 45, researchPointsCost: 427148438, statBonus: { health: 600, shield: 300, damage: 60 } },
  { level: 10, blueprintCost: 50, researchPointsCost: 640722656, statBonus: { health: 650, shield: 325, damage: 65 } },
];

export const vindicatorMK3LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, researchPointsCost: 500000000, statBonus: { health: 500, shield: 250, damage: 50 } },
  { level: 3, blueprintCost: 15, researchPointsCost: 750000000, statBonus: { health: 550, shield: 275, damage: 55 } },
  { level: 4, blueprintCost: 20, researchPointsCost: 1125000000, statBonus: { health: 600, shield: 300, damage: 60 } },
  { level: 5, blueprintCost: 25, researchPointsCost: 1687500000, statBonus: { health: 650, shield: 325, damage: 65 } },
  { level: 6, blueprintCost: 30, researchPointsCost: 2531250000, statBonus: { health: 700, shield: 350, damage: 70 } },
  { level: 7, blueprintCost: 35, researchPointsCost: 3796875000, statBonus: { health: 750, shield: 375, damage: 75 } },
  { level: 8, blueprintCost: 40, researchPointsCost: 5695312500, statBonus: { health: 800, shield: 400, damage: 80 } },
  { level: 9, blueprintCost: 45, researchPointsCost: 8542968750, statBonus: { health: 850, shield: 425, damage: 85 } },
  { level: 10, blueprintCost: 50, researchPointsCost: 12814453125, statBonus: { health: 900, shield: 450, damage: 90 } },
];

export const vindicatorMK4LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, researchPointsCost: 15000000000, statBonus: { health: 750, shield: 125, damage: 125 } },
  { level: 3, blueprintCost: 15, researchPointsCost: 22500000000, statBonus: { health: 800, shield: 150, damage: 150 } },
  { level: 4, blueprintCost: 20, researchPointsCost: 33750000000, statBonus: { health: 850, shield: 175, damage: 175 } },
  { level: 5, blueprintCost: 25, researchPointsCost: 50625000000, statBonus: { health: 900, shield: 200, damage: 200 } },
  { level: 6, blueprintCost: 30, researchPointsCost: 75937500000, statBonus: { health: 950, shield: 225, damage: 225 } },
  { level: 7, blueprintCost: 35, researchPointsCost: 113906250000, statBonus: { health: 1000, shield: 250, damage: 250 } },
  { level: 8, blueprintCost: 40, researchPointsCost: 170859375000, statBonus: { health: 1050, shield: 275, damage: 275 } },
  { level: 9, blueprintCost: 45, researchPointsCost: 256289062500, statBonus: { health: 1100, shield: 300, damage: 300 } },
  { level: 10, blueprintCost: 50, researchPointsCost: 384433593750, statBonus: { health: 1200, shield: 325, damage: 325 } },
];

export const vindicatorMK5LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, researchPointsCost: 500000000000, statBonus: { health: 1500, shield: 750, damage: 75 } },
  { level: 3, blueprintCost: 15, researchPointsCost: 750000000000, statBonus: { health: 1600, shield: 800, damage: 80 } },
  { level: 4, blueprintCost: 20, researchPointsCost: 1125000000000, statBonus: { health: 1700, shield: 850, damage: 85 } },
  { level: 5, blueprintCost: 25, researchPointsCost: 1687500000000, statBonus: { health: 1800, shield: 900, damage: 90 } },
  { level: 6, blueprintCost: 30, researchPointsCost: 2531250000000, statBonus: { health: 1900, shield: 950, damage: 95 } },
  { level: 7, blueprintCost: 35, researchPointsCost: 3796875000000, statBonus: { health: 2000, shield: 1000, damage: 100 } },
  { level: 8, blueprintCost: 40, researchPointsCost: 5695312500000, statBonus: { health: 2100, shield: 1050, damage: 105 } },
  { level: 9, blueprintCost: 45, researchPointsCost: 8542968750000, statBonus: { health: 2200, shield: 1100, damage: 110 } },
  { level: 10, blueprintCost: 50, researchPointsCost: 12814453125000, statBonus: { health: 2300, shield: 1150, damage: 115 } },
];

export const vindicatorMK6LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, researchPointsCost: 1.5e13, statBonus: { health: 2500, shield: 1250, damage: 250 } },
  { level: 3, blueprintCost: 15, researchPointsCost: 2.25e13, statBonus: { health: 2750, shield: 1375, damage: 275 } },
  { level: 4, blueprintCost: 20, researchPointsCost: 3.375e13, statBonus: { health: 3000, shield: 1500, damage: 300 } },
  { level: 5, blueprintCost: 25, researchPointsCost: 5.0625e13, statBonus: { health: 3250, shield: 1625, damage: 325 } },
  { level: 6, blueprintCost: 30, researchPointsCost: 7.59375e13, statBonus: { health: 3500, shield: 1750, damage: 350 } },
  { level: 7, blueprintCost: 35, researchPointsCost: 1.1390625e14, statBonus: { health: 3750, shield: 1875, damage: 375 } },
  { level: 8, blueprintCost: 40, researchPointsCost: 1.70859375e14, statBonus: { health: 4000, shield: 2000, damage: 400 } },
  { level: 9, blueprintCost: 45, researchPointsCost: 2.562890625e14, statBonus: { health: 4250, shield: 2125, damage: 425 } },
  { level: 10, blueprintCost: 50, researchPointsCost: 3.8443359375e14, statBonus: { health: 4500, shield: 2250, damage: 450 } },
];

export const vindicatorMK7LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, researchPointsCost: 5e14, statBonus: { health: 5000, shield: 2500, damage: 500 } },
  { level: 3, blueprintCost: 15, researchPointsCost: 7.5e14, statBonus: { health: 5500, shield: 2750, damage: 550 } },
  { level: 4, blueprintCost: 20, researchPointsCost: 1.125e15, statBonus: { health: 6000, shield: 3000, damage: 600 } },
  { level: 5, blueprintCost: 25, researchPointsCost: 1.6875e15, statBonus: { health: 6500, shield: 3250, damage: 650 } },
  { level: 6, blueprintCost: 30, researchPointsCost: 2.53125e15, statBonus: { health: 7000, shield: 3500, damage: 700 } },
  { level: 7, blueprintCost: 35, researchPointsCost: 3.796875e15, statBonus: { health: 7500, shield: 3750, damage: 750 } },
  { level: 8, blueprintCost: 40, researchPointsCost: 5.6953125e15, statBonus: { health: 8000, shield: 4000, damage: 800 } },
  { level: 9, blueprintCost: 45, researchPointsCost: 8.54296875e15, statBonus: { health: 8500, shield: 4250, damage: 850 } },
  { level: 10, blueprintCost: 50, researchPointsCost: 1.2814453125e16, statBonus: { health: 9000, shield: 4500, damage: 900 } },
];

export const vindicatorMK8LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, researchPointsCost: 1.5e16, statBonus: { health: 10000, shield: 5000, damage: 1000 } },
  { level: 3, blueprintCost: 15, researchPointsCost: 2.25e16, statBonus: { health: 11000, shield: 5500, damage: 1100 } },
  { level: 4, blueprintCost: 20, researchPointsCost: 3.375e16, statBonus: { health: 12000, shield: 6000, damage: 1200 } },
  { level: 5, blueprintCost: 25, researchPointsCost: 5.0625e16, statBonus: { health: 13000, shield: 6500, damage: 1300 } },
  { level: 6, blueprintCost: 30, researchPointsCost: 7.59375e16, statBonus: { health: 14000, shield: 7000, damage: 1400 } },
  { level: 7, blueprintCost: 35, researchPointsCost: 1.1390625e17, statBonus: { health: 15000, shield: 7500, damage: 1500 } },
  { level: 8, blueprintCost: 40, researchPointsCost: 1.70859375e17, statBonus: { health: 16000, shield: 8000, damage: 1600 } },
  { level: 9, blueprintCost: 45, researchPointsCost: 2.562890625e17, statBonus: { health: 17000, shield: 8500, damage: 1700 } },
  { level: 10, blueprintCost: 50, researchPointsCost: 3.8443359375e17, statBonus: { health: 18000, shield: 9000, damage: 1800 } },
];

export const vindicatorMK9LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, researchPointsCost: 5e17, statBonus: { health: 20000, shield: 10000, damage: 2000 } },
  { level: 3, blueprintCost: 15, researchPointsCost: 7.5e17, statBonus: { health: 22000, shield: 11000, damage: 2200 } },
  { level: 4, blueprintCost: 20, researchPointsCost: 1.125e18, statBonus: { health: 24000, shield: 12000, damage: 2400 } },
  { level: 5, blueprintCost: 25, researchPointsCost: 1.6875e18, statBonus: { health: 26000, shield: 13000, damage: 2600 } },
  { level: 6, blueprintCost: 30, researchPointsCost: 2.53125e18, statBonus: { health: 28000, shield: 14000, damage: 2800 } },
  { level: 7, blueprintCost: 35, researchPointsCost: 3.796875e18, statBonus: { health: 30000, shield: 15000, damage: 3000 } },
  { level: 8, blueprintCost: 40, researchPointsCost: 5.6953125e18, statBonus: { health: 32000, shield: 16000, damage: 3200 } },
  { level: 9, blueprintCost: 45, researchPointsCost: 8.54296875e18, statBonus: { health: 34000, shield: 17000, damage: 3400 } },
  { level: 10, blueprintCost: 50, researchPointsCost: 1.2814453125e19, statBonus: { health: 36000, shield: 18000, damage: 3600 } },
];


export interface Chapter {
  name: string;
  lore: string;
  destinations: Destination[];
}


export const gameChapters: Chapter[] = [
  {
    name: "CAPÍTULO 1 — Hermandad del Vacío",
    lore: "Una alianza pirata controla las rutas olvidadas del sector. Operan entre escombros, estaciones destruidas y nebulosas cargadas de interferencias. Con cazas antiguos, brutalidad y tácticas sucias, la Hermandad del Vacío domina el contrabando y el saqueo. Para avanzar, debes desmantelar zona por zona su red criminal.",
    destinations: [
      {
        name: "Cinturón Khelar",
        description: "Un anillo de chatarra espacial lleno de restos de guerra. Pequeñas bandas se esconden entre montañas de metal oxidado.",
        battles: [
          { enemyName: "Desguazador Khelar", health: 100, shield: 25, damage: 15, reward: { scrap: 100, aleacionReforzadaRobada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Desguazador Khelar", health: 110, shield: 30, damage: 16, reward: { scrap: 120, aleacionReforzadaRobada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Desguazador Khelar", health: 125, shield: 50, damage: 20, reward: { scrap: 150, aleacionReforzadaRobada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Desguazador Khelar", health: 140, shield: 55, damage: 22, reward: { scrap: 180, aleacionReforzadaRobada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Triturador Óxido", health: 200, shield: 75, damage: 25, reward: { scrap: 250, aleacionReforzadaRobada: 2, neuroChipCorrupto: 1, blueprints: 1 }, type: 'mini-boss' },
          { enemyName: "Recolector Errante", health: 160, shield: 60, damage: 24, reward: { scrap: 22, aleacionReforzadaRobada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Recolector Errante", health: 180, shield: 70, damage: 26, reward: { scrap: 260, aleacionReforzadaRobada: 2, neuroChipCorrupto: 1 } },
          { enemyName: "Recolector Errante", health: 220, shield: 100, damage: 28, reward: { scrap: 300, aleacionReforzadaRobada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Recolector Errante", health: 250, shield: 120, damage: 30, reward: { scrap: 350, aleacionReforzadaRobada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Capataz Chatarra", health: 400, shield: 150, damage: 40, reward: { scrap: 1000, aleacionReforzadaRobada: 5, neuroChipCorrupto: 2, blueprints: 5 }, type: 'boss' },
        ],
      },
      {
        name: "Ancla Roja",
        description: "Asteroide hueco convertido en refugio pirata. Talleres clandestinos, torretas robadas y pilotos veteranos.",
        battles: [
          { enemyName: "Vigilante Carmesí", health: 150, shield: 50, damage: 25, reward: { scrap: 200, aleacionReforzadaRobada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Vigilante Carmesí", health: 165, shield: 55, damage: 27, reward: { scrap: 240, aleacionReforzadaRobada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Vigilante Carmesí", health: 200, shield: 100, damage: 30, reward: { scrap: 300, aleacionReforzadaRobada: 3, neuroChipCorrupto: 0 } },
          { enemyName: "Vigilante Carmesí", health: 220, shield: 110, damage: 32, reward: { scrap: 36, aleacionReforzadaRobada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Martillo Rojo", health: 300, shield: 75, damage: 35, reward: { scrap: 450, aleacionReforzadaRobada: 3, neuroChipCorrupto: 1, blueprints: 2 }, type: 'mini-boss' },
          { enemyName: "Garfio del Vacío", health: 260, shield: 80, damage: 34, reward: { scrap: 400, aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Garfio del Vacío", health: 280, shield: 90, damage: 36, reward: { scrap: 480, aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Garfio del Vacío", health: 350, shield: 150, damage: 38, reward: { scrap: 550, aleacionReforzadaRobada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Garfio del Vacío", health: 380, shield: 170, damage: 40, reward: { scrap: 650, aleacionReforzadaRobada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Contramaestre Sangrefría", health: 550, shield: 200, damage: 50, reward: { scrap: 1500, aleacionReforzadaRobada: 8, neuroChipCorrupto: 3, blueprints: 6 }, type: 'boss' },
        ],
      },
      {
        name: "Nebulosa del Rumor Azul",
        description: "Una nebulosa densa que distorsiona todos los sensores. Los piratas usan la niebla para emboscadas precisas.",
        battles: [
          { enemyName: "Sombra Azul", health: 250, shield: 100, damage: 30, reward: { scrap: 350, aleacionReforzadaRobada: 3, neuroChipCorrupto: 0 } },
          { enemyName: "Sombra Azul", health: 275, shield: 110, damage: 33, reward: { scrap: 400, aleacionReforzadaRobada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Sombra Azul", health: 300, shield: 125, damage: 40, reward: { scrap: 500, aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Sombra Azul", health: 330, shield: 135, damage: 42, reward: { scrap: 600, aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Acechador Nebular", health: 500, shield: 150, damage: 45, reward: { scrap: 800, aleacionReforzadaRobada: 5, neuroChipCorrupto: 2, blueprints: 3 }, type: 'mini-boss' },
          { enemyName: "Espectro Turquesa", health: 380, shield: 160, damage: 44, reward: { scrap: 700, aleacionReforzadaRobada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Espectro Turquesa", health: 410, shield: 175, damage: 46, reward: { scrap: 850, aleacionReforzadaRobada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Espectro Turquesa", health: 480, shield: 200, damage: 48, reward: { scrap: 1000, aleacionReforzadaRobada: 7, neuroChipCorrupto: 3 } },
          { enemyName: "Espectro Turquesa", health: 520, shield: 220, damage: 50, reward: { scrap: 1200, aleacionReforzadaRobada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Capitán Brumahelada", health: 700, shield: 300, damage: 60, reward: { scrap: 2500, aleacionReforzadaRobada: 10, neuroChipCorrupto: 5, blueprints: 7 }, type: 'boss' },
        ],
      },
      {
        name: "Dominio Grifo",
        description: "Restos orbitales de una antigua colonia minera. El Clan Grifo domina con tácticas directas y drones reciclados.",
        battles: [
          { enemyName: "Ala Grifo", health: 350, shield: 150, damage: 45, reward: { scrap: 600, aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Ala Grifo", health: 380, shield: 165, damage: 47, reward: { scrap: 700, aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Ala Grifo", health: 500, shield: 200, damage: 50, reward: { scrap: 800, aleacionReforzadaRobada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Ala Grifo", health: 540, shield: 220, damage: 52, reward: { scrap: 950, aleacionReforzadaRobada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Heraldo del Grifo", health: 700, shield: 250, damage: 60, reward: { scrap: 1300, aleacionReforzadaRobada: 8, neuroChipCorrupto: 3, blueprints: 4 }, type: 'mini-boss' },
          { enemyName: "Talón Férreo", health: 600, shield: 250, damage: 55, reward: { scrap: 1100, aleacionReforzadaRobada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Talón Férreo", health: 650, shield: 275, damage: 58, reward: { scrap: 1250, aleacionReforzadaRobada: 7, neuroChipCorrupto: 3 } },
          { enemyName: "Talón Férreo", health: 750, shield: 300, damage: 62, reward: { scrap: 1400, aleacionReforzadaRobada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Talón Férreo", health: 800, shield: 330, damage: 65, reward: { scrap: 1600, aleacionReforzadaRobada: 9, neuroChipCorrupto: 4 } },
          { enemyName: "Jefe Picoteador", health: 950, shield: 400, damage: 75, reward: { scrap: 3500, aleacionReforzadaRobada: 12, neuroChipCorrupto: 6, blueprints: 8 }, type: 'boss' },
        ],
      },
      {
        name: "Fortaleza Garra Negra",
        description: "Una fortaleza espacial móvil, núcleo defensivo de la Hermandad. Cargada de torretas, cazas y escudos improvisados.",
        battles: [
          { enemyName: "Ronda Negra", health: 450, shield: 150, damage: 40, reward: { scrap: 1000, aleacionReforzadaRobada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Ronda Negra", health: 480, shield: 160, damage: 42, reward: { scrap: 1200, aleacionReforzadaRobada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Ronda Negra", health: 550, shield: 200, damage: 45, reward: { scrap: 1500, aleacionReforzadaRobada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Ronda Negra", health: 590, shield: 220, damage: 48, reward: { scrap: 1800, aleacionReforzadaRobada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Azote del Vacío", health: 650, shield: 250, damage: 50, reward: { scrap: 2200, aleacionReforzadaRobada: 10, neuroChipCorrupto: 5, blueprints: 5 }, type: 'mini-boss' },
          { enemyName: "Saqueador Élite", health: 620, shield: 240, damage: 52, reward: { scrap: 2000, aleacionReforzadaRobada: 9, neuroChipCorrupto: 4 } },
          { enemyName: "Saqueador Élite", health: 670, shield: 260, damage: 54, reward: { scrap: 2400, aleacionReforzadaRobada: 10, neuroChipCorrupto: 4 } },
          { enemyName: "Saqueador Élite", health: 720, shield: 280, damage: 56, reward: { scrap: 2800, aleacionReforzadaRobada: 11, neuroChipCorrupto: 5 } },
          { enemyName: "Saqueador Élite", health: 770, shield: 300, damage: 58, reward: { scrap: 3200, aleacionReforzadaRobada: 12, neuroChipCorrupto: 5 } },
          { enemyName: "Capitán Atronador", health: 1100, shield: 450, damage: 70, reward: { scrap: 5000, aleacionReforzadaRobada: 15, neuroChipCorrupto: 8, blueprints: 10 }, type: 'boss' },
        ],
      },
      {
        name: "Señor Kraag",
        description: "El caudillo de la Hermandad del Vacío y pirata más temido del sector. Su fragata ha sobrevivido a más batallas de las que se registran oficialmente.",
        isBoss: true,
        battles: [
          { enemyName: "Fragata Skullbreaker", health: 2500, shield: 800, damage: 100, reward: { scrap: 15000, aleacionReforzadaRobada: 50, neuroChipCorrupto: 25, blueprints: 25, matrizQuitinaCristal: 10 }, type: 'boss' },
        ],
      },
    ]
  },
  {
    name: "CAPÍTULO 2 — “Enjambre Carminis”",
    lore: "En los bordes del sector se ha detectado actividad de una especie insectoide conocida como los Carminis. Sus naves no son construidas: son criadas. Cada unidad del enjambre cumple una función biológica y militar, y se comunican por impulsos bioeléctricos. Tras detectar presencia humana, el enjambre ha iniciado un proceso de expansión agresiva.Si no destruyes sus colmenas adelantadas, acabarán multiplicándose hasta consumir todo el sector.",
    destinations: [
      {
        name: "Colmena de Frontera “Nido Espina”",
        description: "Pequeña colmena avanzada creada sobre un asteroide. Aquí se incuban las primeras naves vivas del enjambre: rápidas, frágiles y agresivas.",
        battles: [
          { enemyName: "Zángano Espina", health: 600, shield: 200, damage: 45, reward: { scrap: 1000, aleacionReforzadaRobada: 10 } },
          { enemyName: "Zángano Espina", health: 650, shield: 220, damage: 48, reward: { scrap: 1100, aleacionReforzadaRobada: 11 } },
          { enemyName: "Zángano Espina", health: 750, shield: 250, damage: 55, reward: { scrap: 1200, aleacionReforzadaRobada: 12 } },
          { enemyName: "Zángano Espina", health: 800, shield: 270, damage: 58, reward: { scrap: 1350, aleacionReforzadaRobada: 13 } },
          { enemyName: "Larva Guardiana", health: 900, shield: 300, damage: 65, reward: { scrap: 1600, aleacionReforzadaRobada: 15, nucleoSinapticoFracturado: 1, blueprints: 10 }, type: 'mini-boss' },
          { enemyName: "Polinizador Letal", health: 850, shield: 280, damage: 60, reward: { scrap: 1450, aleacionReforzadaRobada: 14 } },
          { enemyName: "Polinizador Letal", health: 880, shield: 290, damage: 62, reward: { scrap: 1500, aleacionReforzadaRobada: 14, nucleoSinapticoFracturado: 1 } },
          { enemyName: "Polinizador Letal", health: 950, shield: 320, damage: 68, reward: { scrap: 1700, aleacionReforzadaRobada: 16 } },
          { enemyName: "Polinizador Letal", health: 1000, shield: 340, damage: 70, reward: { scrap: 1800, aleacionReforzadaRobada: 17, nucleoSinapticoFracturado: 1 } },
          { enemyName: "Reina Menor Espina Roja", health: 1500, shield: 500, damage: 85, reward: { scrap: 4000, aleacionReforzadaRobada: 25, nucleoSinapticoFracturado: 3, blueprints: 15 }, type: 'boss' },
        ],
      },
      {
        name: "Barranco Bioluminiscente “Hueco Ámbar”",
        description: "Un campo de asteroides convertidos en criaderos conectados por tubos orgánicos. La bioluminiscencia ámbar disimula el movimiento del enjambre.",
        battles: [
          { enemyName: "Cortador Ámbar", health: 800, shield: 300, damage: 60, reward: { scrap: 1800, matrizQuitinaCristal: 5 } },
          { enemyName: "Cortador Ámbar", health: 850, shield: 320, damage: 63, reward: { scrap: 1900, matrizQuitinaCristal: 5 } },
          { enemyName: "Cortador Ámbar", health: 1000, shield: 400, damage: 70, reward: { scrap: 2200, matrizQuitinaCristal: 7 } },
          { enemyName: "Cortador Ámbar", health: 1050, shield: 420, damage: 73, reward: { scrap: 2400, matrizQuitinaCristal: 8 } },
          { enemyName: "Centinela Resinario", health: 1250, shield: 500, damage: 80, reward: { scrap: 3000, matrizQuitinaCristal: 10, nucleoSinapticoFracturado: 3, blueprints: 12 }, type: 'mini-boss' },
          { enemyName: "Acechador Filamento", health: 1100, shield: 450, damage: 75, reward: { scrap: 2600, matrizQuitinaCristal: 9 } },
          { enemyName: "Acechador Filamento", health: 1150, shield: 470, damage: 78, reward: { scrap: 2800, matrizQuitinaCristal: 9, nucleoSinapticoFracturado: 1 } },
          { enemyName: "Acechador Filamento", health: 1200, shield: 480, damage: 82, reward: { scrap: 3200, matrizQuitinaCristal: 11 } },
          { enemyName: "Acechador Filamento", health: 1280, shield: 510, damage: 85, reward: { scrap: 3500, matrizQuitinaCristal: 12, nucleoSinapticoFracturado: 2 } },
          { enemyName: "Soberana de Resina", health: 1800, shield: 700, damage: 100, reward: { scrap: 6000, matrizQuitinaCristal: 20, nucleoSinapticoFracturado: 5, blueprints: 20 }, type: 'boss' },
        ],
      },
      {
        name: "Nebulosa “Velo Melífero”",
        description: "Una nebulosa cargada de partículas dulces que los Carminis usan para nutrir sus naves. Todo aquí es pegajoso, denso y lleno de formas vivas.",
        battles: [
          { enemyName: "Recolector Néctar", health: 1100, shield: 500, damage: 75, reward: { scrap: 3500, matrizQuitinaCristal: 12 } },
          { enemyName: "Recolector Néctar", health: 1180, shield: 530, damage: 78, reward: { scrap: 3700, matrizQuitinaCristal: 13 } },
          { enemyName: "Recolector Néctar", health: 1300, shield: 600, damage: 85, reward: { scrap: 4200, matrizQuitinaCristal: 15, planosMK2: 1 } },
          { enemyName: "Recolector Néctar", health: 1380, shield: 630, damage: 88, reward: { scrap: 4500, matrizQuitinaCristal: 16, planosMK2: 1 } },
          { enemyName: "Emisor de Feromonas", health: 1500, shield: 700, damage: 95, reward: { scrap: 5500, matrizQuitinaCristal: 20, nucleoSinapticoFracturado: 5, planosMK2: 2, blueprints: 15 }, type: 'mini-boss' },
          { enemyName: "Ala Melífera", health: 1420, shield: 650, damage: 90, reward: { scrap: 4800, matrizQuitinaCristal: 17, planosMK2: 1 } },
          { enemyName: "Ala Melífera", health: 1480, shield: 680, damage: 93, reward: { scrap: 5100, matrizQuitinaCristal: 18, nucleoSinapticoFracturado: 2, planosMK2: 1 } },
          { enemyName: "Ala Melífera", health: 1550, shield: 720, damage: 98, reward: { scrap: 5800, matrizQuitinaCristal: 22, nucleoSinapticoFracturado: 3, planosMK2: 2 } },
          { enemyName: "Ala Melífera", health: 1620, shield: 750, damage: 102, reward: { scrap: 6200, matrizQuitinaCristal: 24, nucleoSinapticoFracturado: 4, planosMK2: 2 } },
          { enemyName: "Dama del Velo Dulce", health: 2200, shield: 1000, damage: 120, reward: { scrap: 10000, matrizQuitinaCristal: 40, nucleoSinapticoFracturado: 10, planosMK2: 5, blueprints: 25 }, type: 'boss' },
        ],
      },
      {
        name: "Túneles del Caparazón “Cripta Quitina”",
        description: "Una antigua estación espacial ha sido absorbida y convertida en una colmena orgánica. La estructura está cubierta de placas de quitina.",
        battles: [
          { enemyName: "Quitinoide Raso", health: 1400, shield: 700, damage: 90, reward: { scrap: 6000, matrizQuitinaCristal: 25, planosMK2: 1 } },
          { enemyName: "Quitinoide Raso", health: 1490, shield: 750, damage: 94, reward: { scrap: 6400, matrizQuitinaCristal: 26, planosMK2: 1 } },
          { enemyName: "Quitinoide Raso", health: 1700, shield: 850, damage: 105, reward: { scrap: 7500, matrizQuitinaCristal: 30, planosMK2: 2 } },
          { enemyName: "Quitinoide Raso", health: 1800, shield: 900, damage: 110, reward: { scrap: 8000, matrizQuitinaCristal: 32, planosMK2: 2, nucleoSinapticoFracturado: 5 } },
          { enemyName: "Destructor Mandíbula", health: 2000, shield: 1000, damage: 120, reward: { scrap: 9500, matrizQuitinaCristal: 40, nucleoSinapticoFracturado: 10, planosMK2: 4, blueprints: 20 }, type: 'mini-boss' },
          { enemyName: "Ala Serrada", health: 1850, shield: 930, damage: 112, reward: { scrap: 8500, matrizQuitinaCristal: 35, planosMK2: 3 } },
          { enemyName: "Ala Serrada", health: 1920, shield: 960, damage: 115, reward: { scrap: 8900, matrizQuitinaCristal: 37, nucleoSinapticoFracturado: 8, planosMK2: 3 } },
          { enemyName: "Ala Serrada", health: 2100, shield: 1050, damage: 125, reward: { scrap: 10000, matrizQuitinaCristal: 42, nucleoSinapticoFracturado: 12, planosMK2: 4 } },
          { enemyName: "Ala Serrada", health: 2200, shield: 1100, damage: 130, reward: { scrap: 11000, matrizQuitinaCristal: 45, nucleoSinapticoFracturado: 14, planosMK2: 4 } },
          { enemyName: "Señora Mandibular", health: 3000, shield: 1500, damage: 150, reward: { scrap: 20000, matrizQuitinaCristal: 60, nucleoSinapticoFracturado: 20, planosMK2: 8, blueprints: 30 }, type: 'boss' },
        ],
      },
      {
        name: "Corazón del Enjambre “Púlsar Carmesí”",
        description: "Aquí late la colmena principal. Naves enormes, biotecnología compleja y un flujo constante de criaturas naciendo y muriendo en ciclos de minutos.",
        battles: [
          { enemyName: "Guardián Carmesí", health: 1800, shield: 900, damage: 110, reward: { scrap: 10000, matrizQuitinaCristal: 50, planosMK2: 2 } },
          { enemyName: "Guardián Carmesí", health: 1900, shield: 950, damage: 115, reward: { scrap: 10800, matrizQuitinaCristal: 52, planosMK2: 2 } },
          { enemyName: "Guardián Carmesí", health: 2200, shield: 1100, damage: 125, reward: { scrap: 12000, matrizQuitinaCristal: 60, planosMK2: 3 } },
          { enemyName: "Guardián Carmesí", health: 2350, shield: 1150, damage: 130, reward: { scrap: 13000, matrizQuitinaCristal: 65, nucleoSinapticoFracturado: 10, planosMK2: 3 } },
          { enemyName: "Esporo Alfa", health: 2600, shield: 1300, damage: 140, reward: { scrap: 16000, matrizQuitinaCristal: 75, nucleoSinapticoFracturado: 15, planosMK2: 6, blueprints: 25 }, type: 'mini-boss' },
          { enemyName: "Irradiado del Enjambre", health: 2400, shield: 1200, damage: 132, reward: { scrap: 14000, matrizQuitinaCristal: 68, planosMK2: 4 } },
          { enemyName: "Irradiado del Enjambre", health: 2500, shield: 1250, damage: 135, reward: { scrap: 15000, matrizQuitinaCristal: 70, nucleoSinapticoFracturado: 12, planosMK2: 5 } },
          { enemyName: "Irradiado del Enjambre", health: 2700, shield: 1350, damage: 142, reward: { scrap: 17000, matrizQuitinaCristal: 80, nucleoSinapticoFracturado: 18, planosMK2: 6 } },
          { enemyName: "Irradiado del Enjambre", health: 2850, shield: 1400, damage: 148, reward: { scrap: 18500, matrizQuitinaCristal: 85, nucleoSinapticoFracturado: 20, planosMK2: 7 } },
          { enemyName: "Matriarca Sangrecolmena", health: 3800, shield: 1800, damage: 170, reward: { scrap: 30000, matrizQuitinaCristal: 100, nucleoSinapticoFracturado: 30, planosMK2: 12, blueprints: 40 }, type: 'boss' },
        ],
      },
      {
        name: "“La Emperatriz Carminis”",
        description: "La reina suprema del enjambre en este sector. Una nave viva del tamaño de un crucero, protegida por placas de quitina cristalizada y un núcleo bioenergético capaz de lanzar descargas masivas.Si la Emperatriz cae, el enjambre entra en caos.",
        isBoss: true,
        battles: [
          { enemyName: "Emperatriz Carminis", health: 7000, shield: 3000, damage: 220, reward: { scrap: 50000, matrizQuitinaCristal: 250, nucleoSinapticoFracturado: 50, planosMK2: 15, blueprints: 100 }, type: 'boss' },
        ],
      },
    ]
  },
  {
    name: "CAPÍTULO 3 — “Legión Ilex”",
    lore: "La Legión Ilex es una compañía militar privada que opera fuera de toda jurisdicción. Sus naves no muestran matrículas, sus pilotos no responden llamadas, y sus contratos incluyen “neutralización preventiva” de cualquier objetivo que pueda comprometer sus intereses.Aunque oficialmente dicen ofrecer “seguridad corporativa”, en realidad actúan como un ejército mercenario al servicio del mejor postor.Has entrado en territorio contratado —y ellos no negocian con intrusos.",
    destinations: [
      {
        name: "Perímetro Gris",
        description: "Zona de contención exterior. Patrullas ligeras con camuflaje gris polar mantienen un bloqueo frío y sistemático.",
        battles: [
          { enemyName: "Patrulla Gris", health: 5300, shield: 2650, damage: 530, reward: { scrap: 25000, moduloManiobrasTácticas: 5 } },
          { enemyName: "Patrulla Gris", health: 5400, shield: 2700, damage: 535, reward: { scrap: 26000, moduloManiobrasTácticas: 6 } },
          { enemyName: "Patrulla Gris", health: 5500, shield: 2750, damage: 540, reward: { scrap: 28000, placasCamuflajeActivo: 3 } },
          { enemyName: "Patrulla Gris", health: 5600, shield: 2800, damage: 545, reward: { scrap: 30000, placasCamuflajeActivo: 4 } },
          { enemyName: "Blindado Scout", health: 6500, shield: 3250, damage: 600, reward: { scrap: 40000, moduloManiobrasTácticas: 10, placasCamuflajeActivo: 5, planosDeInterceptor: 1 }, type: 'mini-boss' },
          { enemyName: "Recluta Armado", health: 5800, shield: 2900, damage: 560, reward: { scrap: 32000, moduloManiobrasTácticas: 7 } },
          { enemyName: "Recluta Armado", health: 5900, shield: 2950, damage: 565, reward: { scrap: 34000, placasCamuflajeActivo: 5 } },
          { enemyName: "Recluta Armado", health: 6000, shield: 3000, damage: 570, reward: { scrap: 36000, moduloManiobrasTácticas: 8, placasCamuflajeActivo: 2 } },
          { enemyName: "Recluta Armado", health: 6100, shield: 3050, damage: 575, reward: { scrap: 38000, moduloManiobrasTácticas: 9, placasCamuflajeActivo: 3 } },
          { enemyName: "Teniente Centinela", health: 7500, shield: 3750, damage: 650, reward: { scrap: 60000, moduloManiobrasTácticas: 15, placasCamuflajeActivo: 10, planosDeInterceptor: 3 }, type: 'boss' },
        ],
      },
      {
        name: "Corredor de Interdicción",
        description: "Un corredor de tránsito militarizado, lleno de balizas inhibidoras y radares inteligentes. Nadie pasa sin ser registrado… o destruido.",
        battles: [
          { enemyName: "Interdictor Delta", health: 7600, shield: 3800, damage: 660, reward: { scrap: 42000, moduloManiobrasTácticas: 10 } },
          { enemyName: "Interdictor Delta", health: 7700, shield: 3850, damage: 670, reward: { scrap: 44000, moduloManiobrasTácticas: 11 } },
          { enemyName: "Interdictor Delta", health: 7800, shield: 3900, damage: 680, reward: { scrap: 46000, placasCamuflajeActivo: 6 } },
          { enemyName: "Interdictor Delta", health: 7900, shield: 3950, damage: 690, reward: { scrap: 48000, placasCamuflajeActivo: 7 } },
          { enemyName: "Operador Jammer", health: 9000, shield: 4500, damage: 800, reward: { scrap: 65000, moduloManiobrasTácticas: 15, placasCamuflajeActivo: 10, planosDeInterceptor: 2 }, type: 'mini-boss' },
          { enemyName: "Asaltante Táctico", health: 8200, shield: 4100, damage: 710, reward: { scrap: 50000, moduloManiobrasTácticas: 12 } },
          { enemyName: "Asaltante Táctico", health: 8300, shield: 4150, damage: 720, reward: { scrap: 52000, placasCamuflajeActivo: 8 } },
          { enemyName: "Asaltante Táctico", health: 8400, shield: 4200, damage: 730, reward: { scrap: 55000, moduloManiobrasTácticas: 13, placasCamuflajeActivo: 5 } },
          { enemyName: "Asaltante Táctico", health: 8500, shield: 4250, damage: 740, reward: { scrap: 58000, moduloManiobrasTácticas: 14, placasCamuflajeActivo: 6 } },
          { enemyName: "Capitán Vector", health: 9800, shield: 4900, damage: 900, reward: { scrap: 80000, moduloManiobrasTácticas: 20, placasCamuflajeActivo: 15, planosDeInterceptor: 4 }, type: 'boss' },
        ],
      },
      {
        name: "Base Móvil “Ilex-03”",
        description: "Una megaestructura modular que sirve de cuartel itinerante. Talleres móviles, hangares plegables y lanzaderas de combate salen sin pausa.",
        battles: [
          { enemyName: "Mecaguarida", health: 9900, shield: 4950, damage: 910, reward: { scrap: 60000, moduloManiobrasTácticas: 15 } },
          { enemyName: "Mecaguarida", health: 10000, shield: 5000, damage: 920, reward: { scrap: 63000, moduloManiobrasTácticas: 16 } },
          { enemyName: "Mecaguarida", health: 10100, shield: 5050, damage: 930, reward: { scrap: 66000, placasCamuflajeActivo: 10 } },
          { enemyName: "Mecaguarida", health: 10200, shield: 5100, damage: 940, reward: { scrap: 69000, placasCamuflajeActivo: 11 } },
          { enemyName: "Supervisor de Hangar", health: 11500, shield: 5750, damage: 1050, reward: { scrap: 90000, moduloManiobrasTácticas: 20, placasCamuflajeActivo: 15, planosDeInterceptor: 3 }, type: 'mini-boss' },
          { enemyName: "Técnico de Choque", health: 10500, shield: 5250, damage: 960, reward: { scrap: 72000, moduloManiobrasTácticas: 17 } },
          { enemyName: "Técnico de Choque", health: 10600, shield: 5300, damage: 970, reward: { scrap: 75000, placasCamuflajeActivo: 12 } },
          { enemyName: "Técnico de Choque", health: 10700, shield: 5350, damage: 980, reward: { scrap: 78000, moduloManiobrasTácticas: 18, placasCamuflajeActivo: 8 } },
          { enemyName: "Técnico de Choque", health: 10800, shield: 5400, damage: 990, reward: { scrap: 82000, moduloManiobrasTácticas: 19, placasCamuflajeActivo: 9 } },
          { enemyName: "Comandante Argón", health: 12100, shield: 6050, damage: 1150, reward: { scrap: 110000, moduloManiobrasTácticas: 25, placasCamuflajeActivo: 20, planosDeInterceptor: 5 }, type: 'boss' },
        ],
      },
      {
        name: "Zona Cráneo Verde",
        description: "Sector de entrenamiento avanzado. Aquí se realizan simulacros reales, usando munición de guerra y tácticas corporativas brutalmente eficientes.",
        battles: [
          { enemyName: "Cadete Esmeralda", health: 12200, shield: 6100, damage: 1160, reward: { scrap: 85000, moduloManiobrasTácticas: 20 } },
          { enemyName: "Cadete Esmeralda", health: 12300, shield: 6150, damage: 1170, reward: { scrap: 88000, moduloManiobrasTácticas: 21 } },
          { enemyName: "Cadete Esmeralda", health: 12400, shield: 6200, damage: 1180, reward: { scrap: 92000, placasCamuflajeActivo: 15 } },
          { enemyName: "Cadete Esmeralda", health: 12500, shield: 6250, damage: 1190, reward: { scrap: 96000, placasCamuflajeActivo: 16 } },
          { enemyName: "Instructor Sierra", health: 13500, shield: 6750, damage: 1300, reward: { scrap: 120000, moduloManiobrasTácticas: 25, placasCamuflajeActivo: 20, planosDeInterceptor: 4 }, type: 'mini-boss' },
          { enemyName: "Tirador Musgo", health: 12800, shield: 6400, damage: 1220, reward: { scrap: 100000, moduloManiobrasTácticas: 22 } },
          { enemyName: "Tirador Musgo", health: 12900, shield: 6450, damage: 1230, reward: { scrap: 105000, placasCamuflajeActivo: 17 } },
          { enemyName: "Tirador Musgo", health: 13000, shield: 6500, damage: 1240, reward: { scrap: 110000, moduloManiobrasTácticas: 23, placasCamuflajeActivo: 10 } },
          { enemyName: "Tirador Musgo", health: 13100, shield: 6550, damage: 1250, reward: { scrap: 115000, moduloManiobrasTácticas: 24, placasCamuflajeActivo: 11 } },
          { enemyName: "Mayor Coraza Verde", health: 14000, shield: 7000, damage: 1400, reward: { scrap: 150000, moduloManiobrasTácticas: 30, placasCamuflajeActivo: 25, planosDeInterceptor: 6 }, type: 'boss' },
        ],
      },
      {
        name: "Línea Férrea Cerberus",
        description: "La zona de contención interna final. Tres cinturones defensivos, torres automáticas y fragatas de escolta dan forma a una muralla móvil impenetrable.",
        battles: [
          { enemyName: "Vigía Cerberus", health: 14100, shield: 7050, damage: 1410, reward: { scrap: 120000, moduloManiobrasTácticas: 25, placasCamuflajeActivo: 15 } },
          { enemyName: "Vigía Cerberus", health: 14200, shield: 7100, damage: 1420, reward: { scrap: 125000, moduloManiobrasTácticas: 26, placasCamuflajeActivo: 16 } },
          { enemyName: "Vigía Cerberus", health: 14300, shield: 7150, damage: 1430, reward: { scrap: 130000, moduloManiobrasTácticas: 27, placasCamuflajeActivo: 17 } },
          { enemyName: "Vigía Cerberus", health: 14400, shield: 7200, damage: 1440, reward: { scrap: 135000, moduloManiobrasTácticas: 28, placasCamuflajeActivo: 18 } },
          { enemyName: "Unidad Cerberus-β", health: 15000, shield: 7500, damage: 1500, reward: { scrap: 160000, moduloManiobrasTácticas: 30, placasCamuflajeActivo: 25, planosDeInterceptor: 5 }, type: 'mini-boss' },
          { enemyName: "Operador Férreo", health: 14600, shield: 7300, damage: 1460, reward: { scrap: 140000, moduloManiobrasTácticas: 29, placasCamuflajeActivo: 19 } },
          { enemyName: "Operador Férreo", health: 14700, shield: 7350, damage: 1470, reward: { scrap: 145000, moduloManiobrasTácticas: 30, placasCamuflajeActivo: 20 } },
          { enemyName: "Operador Férreo", health: 14800, shield: 7400, damage: 1480, reward: { scrap: 150000, moduloManiobrasTácticas: 32, placasCamuflajeActivo: 22 } },
          { enemyName: "Operador Férreo", health: 14900, shield: 7450, damage: 1490, reward: { scrap: 155000, moduloManiobrasTácticas: 35, placasCamuflajeActivo: 24 } },
          { enemyName: "Coronel Muralla", health: 16000, shield: 8000, damage: 1600, reward: { scrap: 250000, moduloManiobrasTácticas: 50, placasCamuflajeActivo: 40, planosDeInterceptor: 10 }, type: 'boss' },
        ],
      },
      {
        name: "Bastión Regimental “Ilex Prime”",
        description: "El cuartel general flotante de la Legión Ilex. Un coloso blindado con camuflaje adaptativo, artillería orbital y un núcleo táctico que coordina toda la red mercenaria.Ninguna nave ha conseguido atravesar sus defensas… hasta ahora.",
        isBoss: true,
        battles: [
          { enemyName: "Destructor “Iron Howl”", health: 16000, shield: 8000, damage: 1600, reward: { scrap: 250000, moduloManiobrasTácticas: 50, placasCamuflajeActivo: 40, planosDeInterceptor: 10 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "CAPÍTULO 4 — “El Dominio Aureano”",
    lore: "Los Aureanos son una antigua civilización tecno-espiritual que canaliza energía pura mediante cristales resonantes. Sus naves no están construidas: están esculpidas en luz solidificada.Consideran su territorio sagrado y ven a cualquier intruso como una amenaza para el “Equilibrio Cósmico”.Tu entrada ha despertado a sus Custodios.",
    destinations: [
      {
        name: "Umbral Celeste",
        description: "Puertas de entrada al territorio aureano. Torres flotantes proyectan escudos de luz que examinan todo lo que cruza.",
        battles: [
          { enemyName: "Centinela Celeste", health: 15500, shield: 7750, damage: 1550, reward: { scrap: 100000, placasDeAetherium: 5 } },
          { enemyName: "Centinela Celeste", health: 15800, shield: 7900, damage: 1560, reward: { scrap: 110000, placasDeAetherium: 6 } },
          { enemyName: "Centinela Celeste", health: 16100, shield: 8050, damage: 1570, reward: { scrap: 120000, nucleoPsionicoArmonico: 3 } },
          { enemyName: "Centinela Celeste", health: 16400, shield: 8200, damage: 1580, reward: { scrap: 130000, nucleoPsionicoArmonico: 4 } },
          { enemyName: "Vigilante Prismático", health: 18000, shield: 9000, damage: 1700, reward: { scrap: 200000, placasDeAetherium: 10, nucleoPsionicoArmonico: 5, planosMK3: 1 }, type: 'mini-boss' },
          { enemyName: "Eco de Luz", health: 16800, shield: 8400, damage: 1610, reward: { scrap: 150000, placasDeAetherium: 7 } },
          { enemyName: "Eco de Luz", health: 17100, shield: 8550, damage: 1620, reward: { scrap: 160000, placasDeAetherium: 8 } },
          { enemyName: "Eco de Luz", health: 17400, shield: 8700, damage: 1630, reward: { scrap: 170000, nucleoPsionicoArmonico: 5 } },
          { enemyName: "Eco de Luz", health: 17700, shield: 8850, damage: 1640, reward: { scrap: 180000, nucleoPsionicoArmonico: 6 } },
          { enemyName: "Custodio Aural", health: 20000, shield: 10000, damage: 1800, reward: { scrap: 300000, placasDeAetherium: 15, nucleoPsionicoArmonico: 10, planosMK3: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Campos Resonantes",
        description: "Amplias llanuras de energía cristalizada donde los Aureanos entrenan a sus naves vivas. La energía vibra como un coro.",
        battles: [
          { enemyName: "Iniciado Resonante", health: 20500, shield: 10250, damage: 1850, reward: { scrap: 180000, nucleoPsionicoArmonico: 7 } },
          { enemyName: "Iniciado Resonante", health: 20800, shield: 10400, damage: 1860, reward: { scrap: 190000, nucleoPsionicoArmonico: 8 } },
          { enemyName: "Iniciado Resonante", health: 21100, shield: 10550, damage: 1870, reward: { scrap: 200000, placasDeAetherium: 8 } },
          { enemyName: "Iniciado Resonante", health: 21400, shield: 10700, damage: 1880, reward: { scrap: 210000, placasDeAetherium: 9 } },
          { enemyName: "Agravio Armónico", health: 23000, shield: 11500, damage: 2000, reward: { scrap: 350000, nucleoPsionicoArmonico: 12, placasDeAetherium: 12, planosMK3: 2 }, type: 'mini-boss' },
          { enemyName: "Disonancia Errante", health: 21800, shield: 10900, damage: 1910, reward: { scrap: 220000, nucleoPsionicoArmonico: 9 } },
          { enemyName: "Disonancia Errante", health: 22100, shield: 11050, damage: 1920, reward: { scrap: 230000, nucleoPsionicoArmonico: 10 } },
          { enemyName: "Disonancia Errante", health: 22400, shield: 11200, damage: 1930, reward: { scrap: 250000, placasDeAetherium: 10 } },
          { enemyName: "Disonancia Errante", health: 22700, shield: 11350, damage: 1940, reward: { scrap: 260000, placasDeAetherium: 11 } },
          { enemyName: "Maestro de la Resonancia", health: 25000, shield: 12500, damage: 2200, reward: { scrap: 500000, nucleoPsionicoArmonico: 20, placasDeAetherium: 20, planosMK3: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Sagrario de Aurora",
        description: "Un templo flotante donde los Aureanos canalizan la “Llama Interior”, una fuente energética consciente.",
        battles: [
          { enemyName: "Guardián de Aurora", health: 25500, shield: 12750, damage: 2250, reward: { scrap: 250000, nucleoPsionicoArmonico: 15 } },
          { enemyName: "Guardián de Aurora", health: 25800, shield: 12900, damage: 2260, reward: { scrap: 260000, nucleoPsionicoArmonico: 16 } },
          { enemyName: "Guardián de Aurora", health: 26100, shield: 13050, damage: 2270, reward: { scrap: 280000, placasDeAetherium: 15 } },
          { enemyName: "Guardián de Aurora", health: 26400, shield: 13200, damage: 2280, reward: { scrap: 300000, placasDeAetherium: 16 } },
          { enemyName: "Portador de la Llama", health: 28000, shield: 14000, damage: 2400, reward: { scrap: 450000, nucleoPsionicoArmonico: 20, placasDeAetherium: 20, planosMK3: 3 }, type: 'mini-boss' },
          { enemyName: "Chispa Ancestral", health: 26800, shield: 13400, damage: 2310, reward: { scrap: 320000, nucleoPsionicoArmonico: 18 } },
          { enemyName: "Chispa Ancestral", health: 27100, shield: 13550, damage: 2320, reward: { scrap: 340000, nucleoPsionicoArmonico: 19 } },
          { enemyName: "Chispa Ancestral", health: 27400, shield: 13700, damage: 2330, reward: { scrap: 360000, placasDeAetherium: 18 } },
          { enemyName: "Chispa Ancestral", health: 27700, shield: 13850, damage: 2340, reward: { scrap: 380000, placasDeAetherium: 19 } },
          { enemyName: "Orador Lumínico", health: 30000, shield: 15000, damage: 2600, reward: { scrap: 600000, nucleoPsionicoArmonico: 30, placasDeAetherium: 30, planosMK3: 6 }, type: 'boss' },
        ]
      },
      {
        name: "Bastión Dorado",
        description: "Nudos de defensa hechos con placas de luz endurecida. Cada estructura cambia de forma según la amenaza detectada.",
        battles: [
          { enemyName: "Arconte Dorado", health: 30500, shield: 15250, damage: 2650, reward: { scrap: 300000, placasDeAetherium: 20 } },
          { enemyName: "Arconte Dorado", health: 30800, shield: 15400, damage: 2660, reward: { scrap: 320000, placasDeAetherium: 22 } },
          { enemyName: "Arconte Dorado", health: 31100, shield: 15550, damage: 2670, reward: { scrap: 340000, nucleoPsionicoArmonico: 10 } },
          { enemyName: "Arconte Dorado", health: 31400, shield: 15700, damage: 2680, reward: { scrap: 360000, nucleoPsionicoArmonico: 11 } },
          { enemyName: "Escudo Viviente", health: 33000, shield: 16500, damage: 2800, reward: { scrap: 500000, placasDeAetherium: 30, nucleoPsionicoArmonico: 15, planosMK3: 4 }, type: 'mini-boss' },
          { enemyName: "Lanza Radiante", health: 31800, shield: 15900, damage: 2710, reward: { scrap: 380000, placasDeAetherium: 25 } },
          { enemyName: "Lanza Radiante", health: 32100, shield: 16050, damage: 2720, reward: { scrap: 400000, placasDeAetherium: 28 } },
          { enemyName: "Lanza Radiante", health: 32400, shield: 16200, damage: 2730, reward: { scrap: 420000, nucleoPsionicoArmonico: 12 } },
          { enemyName: "Lanza Radiante", health: 32700, shield: 16350, damage: 2740, reward: { scrap: 450000, nucleoPsionicoArmonico: 14 } },
          { enemyName: "Prelado Solemne", health: 35000, shield: 17500, damage: 3000, reward: { scrap: 800000, placasDeAetherium: 50, nucleoPsionicoArmonico: 25, planosMK3: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Horizonte Sacro",
        description: "Un anillo de plataformas levitantes que protege la capital aureana. Aquí la energía vibra como si tuviera voluntad propia.",
        battles: [
          { enemyName: "Aureano Sagrado", health: 35500, shield: 17750, damage: 3050, reward: { scrap: 400000, nucleoPsionicoArmonico: 15 } },
          { enemyName: "Aureano Sagrado", health: 35800, shield: 17900, damage: 3060, reward: { scrap: 420000, nucleoPsionicoArmonico: 16 } },
          { enemyName: "Aureano Sagrado", health: 36100, shield: 18050, damage: 3070, reward: { scrap: 450000, placasDeAetherium: 20 } },
          { enemyName: "Aureano Sagrado", health: 36400, shield: 18200, damage: 3080, reward: { scrap: 480000, placasDeAetherium: 22 } },
          { enemyName: "Disruptor del Horizonte", health: 38000, shield: 19000, damage: 3200, reward: { scrap: 600000, nucleoPsionicoArmonico: 25, placasDeAetherium: 25, planosMK3: 5 }, type: 'mini-boss' },
          { enemyName: "Rayo Custodio", health: 36800, shield: 18400, damage: 3110, reward: { scrap: 500000, nucleoPsionicoArmonico: 20 } },
          { enemyName: "Rayo Custodio", health: 37100, shield: 18550, damage: 3120, reward: { scrap: 520000, nucleoPsionicoArmonico: 22 } },
          { enemyName: "Rayo Custodio", health: 37400, shield: 18700, damage: 3130, reward: { scrap: 550000, placasDeAetherium: 28 } },
          { enemyName: "Rayo Custodio", health: 37700, shield: 18850, damage: 3140, reward: { scrap: 580000, placasDeAetherium: 30 } },
          { enemyName: "Sumo Guardián del Vórtice", health: 40000, shield: 20000, damage: 3400, reward: { scrap: 1000000, nucleoPsionicoArmonico: 40, placasDeAetherium: 40, planosMK3: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Ciudad-Luz \"Solarion Primus\"",
        description: "La capital flotante de los Aureanos. Un mundo-nave formado por capas de luz cristalizada, guiado por la conciencia colectiva de toda su especie.Aqui reside la encarnacion suprema de su voluntad.",
        isBoss: true,
        battles: [
          { enemyName: "Arconte Supremo Seraphys", health: 45000, shield: 22500, damage: 3800, reward: { scrap: 2500000, nucleoPsionicoArmonico: 100, placasDeAetherium: 100, planosMK3: 30 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "CAPÍTULO 5 — “El Culto del Abismo”",
    lore: "En los confines olvidados del espacio, una fuerza corrupta conocida como El Culto del Abismo devora sistemas enteros. Sus naves son amalgamas de metal retorcido, carne mutada y símbolos prohibidos que palpitan como si estuvieran vivos. Siguen a entidades extradimensionales llamadas Los Susurrantes, cuyas voces turban la mente de cualquier piloto que se acerque.\nLa corrupción avanza como una enfermedad, reescribiendo la materia… y la voluntad.",
    destinations: [
      {
        name: "Penumbra Sangrante",
        description: "Un corredor espacial impregnado de niebla rojiza. Estructuras flotantes, deformadas por la corrupción, laten como órganos gigantescos.",
        battles: [
          { enemyName: "Engendro Penumbrio", health: 32500, shield: 16250, damage: 3250, reward: { scrap: 1000000, tejidoAbisalRetorcido: 5 } },
          { enemyName: "Engendro Penumbrio", health: 33000, shield: 16500, damage: 3300, reward: { scrap: 1100000, tejidoAbisalRetorcido: 6 } },
          { enemyName: "Engendro Penumbrio", health: 33500, shield: 16750, damage: 3350, reward: { scrap: 1200000, singularidadCorruptaContenida: 3 } },
          { enemyName: "Engendro Penumbrio", health: 34000, shield: 17000, damage: 3400, reward: { scrap: 1300000, singularidadCorruptaContenida: 4 } },
          { enemyName: "Vástago Hemolítico", health: 37000, shield: 18500, damage: 3700, reward: { scrap: 2000000, tejidoAbisalRetorcido: 10, singularidadCorruptaContenida: 5, planosMK4: 1 }, type: 'mini-boss' },
          { enemyName: "Deforme Sanguinas", health: 34500, shield: 17250, damage: 3450, reward: { scrap: 1500000, tejidoAbisalRetorcido: 7 } },
          { enemyName: "Deforme Sanguinas", health: 35000, shield: 17500, damage: 3500, reward: { scrap: 1600000, tejidoAbisalRetorcido: 8 } },
          { enemyName: "Deforme Sanguinas", health: 35500, shield: 17750, damage: 3550, reward: { scrap: 1700000, singularidadCorruptaContenida: 5 } },
          { enemyName: "Deforme Sanguinas", health: 36000, shield: 18000, damage: 3600, reward: { scrap: 1800000, singularidadCorruptaContenida: 6 } },
          { enemyName: "Heraldo Carmesí", health: 40000, shield: 20000, damage: 4000, reward: { scrap: 3000000, tejidoAbisalRetorcido: 15, singularidadCorruptaContenida: 10, planosMK4: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Forja Profanada",
        description: "Una antigua estación industrial tomada por el Culto. Los hornos ahora funden metal y carne por igual, creando naves vivientes.",
        battles: [
          { enemyName: "Fragmento Profano", health: 40500, shield: 20250, damage: 4050, reward: { scrap: 2000000, singularidadCorruptaContenida: 10 } },
          { enemyName: "Fragmento Profano", health: 41000, shield: 20500, damage: 4100, reward: { scrap: 2200000, singularidadCorruptaContenida: 12 } },
          { enemyName: "Fragmento Profano", health: 41500, shield: 20750, damage: 4150, reward: { scrap: 2500000, tejidoAbisalRetorcido: 10 } },
          { enemyName: "Fragmento Profano", health: 42000, shield: 21000, damage: 4200, reward: { scrap: 2700000, tejidoAbisalRetorcido: 12 } },
          { enemyName: "Operario del Vacío", health: 45000, shield: 22500, damage: 4500, reward: { scrap: 4000000, singularidadCorruptaContenida: 20, tejidoAbisalRetorcido: 15, planosMK4: 2 }, type: 'mini-boss' },
          { enemyName: "Masa Forjada", health: 42500, shield: 21250, damage: 4250, reward: { scrap: 3000000, singularidadCorruptaContenida: 14 } },
          { enemyName: "Masa Forjada", health: 43000, shield: 21500, damage: 4300, reward: { scrap: 3200000, singularidadCorruptaContenida: 16 } },
          { enemyName: "Masa Forjada", health: 43500, shield: 21750, damage: 4350, reward: { scrap: 3500000, tejidoAbisalRetorcido: 14 } },
          { enemyName: "Masa Forjada", health: 44000, shield: 22000, damage: 4400, reward: { scrap: 3800000, tejidoAbisalRetorcido: 16 } },
          { enemyName: "Artífice del Abismo", health: 48000, shield: 24000, damage: 4800, reward: { scrap: 6000000, singularidadCorruptaContenida: 30, tejidoAbisalRetorcido: 25, planosMK4: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Madriguera del Susurro",
        description: "Zonas colapsadas donde ecos distorsionados repiten frases imposibles. Los Susurrantes habitan aquí… o quizás solo sus voces.",
        battles: [
          { enemyName: "Eco Torturado", health: 48500, shield: 24250, damage: 4850, reward: { scrap: 5000000, tejidoAbisalRetorcido: 20 } },
          { enemyName: "Eco Torturado", health: 49000, shield: 24500, damage: 4900, reward: { scrap: 5200000, tejidoAbisalRetorcido: 22 } },
          { enemyName: "Eco Torturado", health: 49500, shield: 24750, damage: 4950, reward: { scrap: 5500000, singularidadCorruptaContenida: 25 } },
          { enemyName: "Eco Torturado", health: 50000, shield: 25000, damage: 5000, reward: { scrap: 5800000, singularidadCorruptaContenida: 28 } },
          { enemyName: "Devoramente", health: 53000, shield: 26500, damage: 5300, reward: { scrap: 8000000, tejidoAbisalRetorcido: 30, singularidadCorruptaContenida: 35, planosMK4: 4 }, type: 'mini-boss' },
          { enemyName: "Aullador del Silencio", health: 50500, shield: 25250, damage: 5050, reward: { scrap: 6000000, tejidoAbisalRetorcido: 25 } },
          { enemyName: "Aullador del Silencio", health: 51000, shield: 25500, damage: 5100, reward: { scrap: 6200000, tejidoAbisalRetorcido: 28 } },
          { enemyName: "Aullador del Silencio", health: 51500, shield: 25750, damage: 5150, reward: { scrap: 6500000, singularidadCorruptaContenida: 30 } },
          { enemyName: "Aullador del Silencio", health: 52000, shield: 26000, damage: 5200, reward: { scrap: 6800000, singularidadCorruptaContenida: 32 } },
          { enemyName: "Profeta de los Susurros", health: 56000, shield: 28000, damage: 5600, reward: { scrap: 10000000, tejidoAbisalRetorcido: 40, singularidadCorruptaContenida: 40, planosMK4: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Desgarro Onírico",
        description: "Una grieta dimensional convertida en bastión. La realidad aquí es inconsistente: el espacio se dobla, vibra y se retuerce.",
        battles: [
          { enemyName: "Rastro Abismal", health: 56500, shield: 28250, damage: 5650, reward: { scrap: 8000000, singularidadCorruptaContenida: 40 } },
          { enemyName: "Rastro Abismal", health: 57000, shield: 28500, damage: 5700, reward: { scrap: 8200000, singularidadCorruptaContenida: 42 } },
          { enemyName: "Rastro Abismal", health: 57500, shield: 28750, damage: 5750, reward: { scrap: 8500000, tejidoAbisalRetorcido: 40 } },
          { enemyName: "Rastro Abismal", health: 58000, shield: 29000, damage: 5800, reward: { scrap: 8800000, tejidoAbisalRetorcido: 42 } },
          { enemyName: "Quimera Delirante", health: 61000, shield: 30500, damage: 6100, reward: { scrap: 12000000, singularidadCorruptaContenida: 50, tejidoAbisalRetorcido: 50, planosMK4: 6 }, type: 'mini-boss' },
          { enemyName: "Reptante de Pesadilla", health: 58500, shield: 29250, damage: 5850, reward: { scrap: 9000000, singularidadCorruptaContenida: 45 } },
          { enemyName: "Reptante de Pesadilla", health: 59000, shield: 29500, damage: 5900, reward: { scrap: 9200000, singularidadCorruptaContenida: 48 } },
          { enemyName: "Reptante de Pesadilla", health: 59500, shield: 29750, damage: 5950, reward: { scrap: 9500000, tejidoAbisalRetorcido: 45 } },
          { enemyName: "Reptante de Pesadilla", health: 60000, shield: 30000, damage: 6000, reward: { scrap: 9800000, tejidoAbisalRetorcido: 48 } },
          { enemyName: "Guardián del Desgarro", health: 64000, shield: 32000, damage: 6400, reward: { scrap: 15000000, singularidadCorruptaContenida: 60, tejidoAbisalRetorcido: 60, planosMK4: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Santuario de la Ruina",
        description: "Altar mecano-orgánico donde el Culto realiza sus rituales. Las paredes están cubiertas por símbolos que sangran luz negra.",
        battles: [
          { enemyName: "Adepto de Ruina", health: 64500, shield: 32250, damage: 6450, reward: { scrap: 13000000, tejidoAbisalRetorcido: 50 } },
          { enemyName: "Adepto de Ruina", health: 65000, shield: 32500, damage: 6500, reward: { scrap: 13500000, tejidoAbisalRetorcido: 52 } },
          { enemyName: "Adepto de Ruina", health: 65500, shield: 32750, damage: 6550, reward: { scrap: 14000000, singularidadCorruptaContenida: 55 } },
          { enemyName: "Adepto de Ruina", health: 66000, shield: 33000, damage: 6600, reward: { scrap: 14500000, singularidadCorruptaContenida: 58 } },
          { enemyName: "Desolador Ritual", health: 69000, shield: 34500, damage: 6900, reward: { scrap: 20000000, tejidoAbisalRetorcido: 70, singularidadCorruptaContenida: 70, planosMK4: 8 }, type: 'mini-boss' },
          { enemyName: "Sombra Flagelante", health: 66500, shield: 33250, damage: 6650, reward: { scrap: 15000000, tejidoAbisalRetorcido: 60 } },
          { enemyName: "Sombra Flagelante", health: 67000, shield: 33500, damage: 6700, reward: { scrap: 15500000, tejidoAbisalRetorcido: 62 } },
          { enemyName: "Sombra Flagelante", health: 67500, shield: 33750, damage: 6750, reward: { scrap: 16000000, singularidadCorruptaContenida: 65 } },
          { enemyName: "Sombra Flagelante", health: 68000, shield: 34000, damage: 6800, reward: { scrap: 16500000, singularidadCorruptaContenida: 68 } },
          { enemyName: "Alto Sacerdote del Vacío", health: 72000, shield: 36000, damage: 7200, reward: { scrap: 25000000, tejidoAbisalRetorcido: 80, singularidadCorruptaContenida: 80, planosMK4: 12 }, type: 'boss' },
        ]
      },
      {
        name: "Colmena Abisal “Xal-Horuun”",
        description: "La nave-capital del Culto del Abismo: una colmena viviente del tamaño de una luna, hecha de hueso, metal y oscuridad pura.Un núcleo energético corrupto late en su interior como un corazón demoníaco.La entidad líder del Culto mora aquí, conectada a cada nave y cada grito.",
        isBoss: true,
        battles: [
          { enemyName: "Señor del Abismo Vorgrath", health: 80000, shield: 40000, damage: 8000, reward: { scrap: 50000000, singularidadCorruptaContenida: 150, tejidoAbisalRetorcido: 150, planosMK4: 25 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "CAPÍTULO 1 — Hermandad del Vacío (Difícil)",
    lore: "Una alianza pirata controla las rutas olvidadas del sector. Operan entre escombros, estaciones destruidas y nebulosas cargadas de interferencias. Con cazas antiguos, brutalidad y tácticas sucias, la Hermandad del Vacío domina el contrabando y el saqueo. Para avanzar, debes desmantelar zona por zona su red criminal.",
    destinations: [
      {
        name: "Cinturón Khelar",
        description: "Un anillo de chatarra espacial lleno de restos de guerra. Pequeñas bandas se esconden entre montañas de metal oxidado.",
        battles: [
            { enemyName: "Desguazador Khelar", health: 57000, shield: 21500, damage: 7800, reward: { scrap: 2000000, aleacionReforzadaElite: 5 } },
            { enemyName: "Desguazador Khelar", health: 58000, shield: 22000, damage: 7900, reward: { scrap: 2100000, aleacionReforzadaElite: 6 } },
            { enemyName: "Desguazador Khelar", health: 59000, shield: 22500, damage: 8000, reward: { scrap: 2200000, neuroChipCorruptoElite: 3 } },
            { enemyName: "Desguazador Khelar", health: 60000, shield: 23000, damage: 8100, reward: { scrap: 2300000, neuroChipCorruptoElite: 4 } },
            { enemyName: "Triturador Óxido", health: 65000, shield: 25000, damage: 8500, reward: { scrap: 3000000, aleacionReforzadaElite: 10, neuroChipCorruptoElite: 5, planosMK5: 1 }, type: 'mini-boss' },
            { enemyName: "Recolector Errante", health: 61000, shield: 23500, damage: 8200, reward: { scrap: 2500000, aleacionReforzadaElite: 7 } },
            { enemyName: "Recolector Errante", health: 62000, shield: 24000, damage: 8300, reward: { scrap: 2600000, aleacionReforzadaElite: 8 } },
            { enemyName: "Recolector Errante", health: 63000, shield: 24500, damage: 8400, reward: { scrap: 2700000, neuroChipCorruptoElite: 5 } },
            { enemyName: "Recolector Errante", health: 64000, shield: 24800, damage: 8450, reward: { scrap: 2800000, neuroChipCorruptoElite: 6 } },
            { enemyName: "Capataz Chatarra", health: 70000, shield: 28000, damage: 9000, reward: { scrap: 5000000, aleacionReforzadaElite: 15, neuroChipCorruptoElite: 10, planosMK5: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Ancla Roja",
        description: "Asteroide hueco convertido en refugio pirata. Talleres clandestinos, torretas robadas y pilotos veteranos.",
        battles: [
            { enemyName: "Vigilante Carmesí", health: 71000, shield: 28500, damage: 9100, reward: { scrap: 4000000, neuroChipCorruptoElite: 12 } },
            { enemyName: "Vigilante Carmesí", health: 72000, shield: 29000, damage: 9200, reward: { scrap: 4200000, neuroChipCorruptoElite: 14 } },
            { enemyName: "Vigilante Carmesí", health: 73000, shield: 29500, damage: 9300, reward: { scrap: 4500000, aleacionReforzadaElite: 18 } },
            { enemyName: "Vigilante Carmesí", health: 74000, shield: 30000, damage: 9400, reward: { scrap: 4800000, aleacionReforzadaElite: 20 } },
            { enemyName: "Martillo Rojo", health: 80000, shield: 32000, damage: 9800, reward: { scrap: 7000000, neuroChipCorruptoElite: 20, aleacionReforzadaElite: 25, planosMK5: 2 }, type: 'mini-boss' },
            { enemyName: "Garfio del Vacío", health: 75000, shield: 30500, damage: 9500, reward: { scrap: 5000000, neuroChipCorruptoElite: 16 } },
            { enemyName: "Garfio del Vacío", health: 76000, shield: 31000, damage: 9600, reward: { scrap: 5200000, neuroChipCorruptoElite: 18 } },
            { enemyName: "Garfio del Vacío", health: 77000, shield: 31500, damage: 9700, reward: { scrap: 5500000, aleacionReforzadaElite: 22 } },
            { enemyName: "Garfio del Vacío", health: 78000, shield: 31800, damage: 9750, reward: { scrap: 5800000, aleacionReforzadaElite: 24 } },
            { enemyName: "Contramaestre Sangrefría", health: 85000, shield: 35000, damage: 10500, reward: { scrap: 9000000, neuroChipCorruptoElite: 30, aleacionReforzadaElite: 30, planosMK5: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Nebulosa del Rumor Azul",
        description: "Una nebulosa densa que distorsiona todos los sensores. Los piratas usan la niebla para emboscadas precisas.",
        battles: [
            { enemyName: "Sombra Azul", health: 86000, shield: 35500, damage: 10600, reward: { scrap: 8000000, aleacionReforzadaElite: 30 } },
            { enemyName: "Sombra Azul", health: 87000, shield: 36000, damage: 10700, reward: { scrap: 8200000, aleacionReforzadaElite: 32 } },
            { enemyName: "Sombra Azul", health: 88000, shield: 36500, damage: 10800, reward: { scrap: 8500000, neuroChipCorruptoElite: 25 } },
            { enemyName: "Sombra Azul", health: 89000, shield: 37000, damage: 10900, reward: { scrap: 8800000, neuroChipCorruptoElite: 28 } },
            { enemyName: "Acechador Nebular", health: 95000, shield: 39000, damage: 11500, reward: { scrap: 12000000, aleacionReforzadaElite: 40, neuroChipCorruptoElite: 35, planosMK5: 4 }, type: 'mini-boss' },
            { enemyName: "Espectro Turquesa", health: 90000, shield: 37500, damage: 11000, reward: { scrap: 9000000, aleacionReforzadaElite: 35 } },
            { enemyName: "Espectro Turquesa", health: 91000, shield: 38000, damage: 11100, reward: { scrap: 9200000, aleacionReforzadaElite: 38 } },
            { enemyName: "Espectro Turquesa", health: 92000, shield: 38500, damage: 11200, reward: { scrap: 9500000, neuroChipCorruptoElite: 30 } },
            { enemyName: "Espectro Turquesa", health: 93000, shield: 38800, damage: 11300, reward: { scrap: 9800000, neuroChipCorruptoElite: 32 } },
            { enemyName: "Capitán Brumahelada", health: 100000, shield: 42000, damage: 12000, reward: { scrap: 15000000, aleacionReforzadaElite: 50, neuroChipCorruptoElite: 40, planosMK5: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Dominio Grifo",
        description: "Restos orbitales de una antigua colonia minera. El Clan Grifo domina con tácticas directas y drones reciclados.",
        battles: [
            { enemyName: "Ala Grifo", health: 101000, shield: 42500, damage: 12100, reward: { scrap: 13000000, neuroChipCorruptoElite: 40 } },
            { enemyName: "Ala Grifo", health: 102000, shield: 43000, damage: 12200, reward: { scrap: 13500000, neuroChipCorruptoElite: 42 } },
            { enemyName: "Ala Grifo", health: 103000, shield: 43500, damage: 12300, reward: { scrap: 14000000, aleacionReforzadaElite: 50 } },
            { enemyName: "Ala Grifo", health: 104000, shield: 44000, damage: 12400, reward: { scrap: 14500000, aleacionReforzadaElite: 52 } },
            { enemyName: "Heraldo del Grifo", health: 110000, shield: 46000, damage: 13000, reward: { scrap: 20000000, neuroChipCorruptoElite: 50, aleacionReforzadaElite: 60, planosMK5: 6 }, type: 'mini-boss' },
            { enemyName: "Talón Férreo", health: 105000, shield: 44500, damage: 12500, reward: { scrap: 15000000, neuroChipCorruptoElite: 45 } },
            { enemyName: "Talón Férreo", health: 106000, shield: 45000, damage: 12600, reward: { scrap: 15500000, neuroChipCorruptoElite: 48 } },
            { enemyName: "Talón Férreo", health: 107000, shield: 45500, damage: 12700, reward: { scrap: 16000000, aleacionReforzadaElite: 55 } },
            { enemyName: "Talón Férreo", health: 108000, shield: 45800, damage: 12800, reward: { scrap: 16500000, aleacionReforzadaElite: 58 } },
            { enemyName: "Jefe Picoteador", health: 115000, shield: 49000, damage: 13500, reward: { scrap: 25000000, neuroChipCorruptoElite: 60, aleacionReforzadaElite: 70, planosMK5: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Fortaleza Garra Negra",
        description: "Una fortaleza espacial móvil, núcleo defensivo de la Hermandad. Cargada de torretas, cazas y escudos improvisados.",
        battles: [
            { enemyName: "Ronda Negra", health: 116000, shield: 49500, damage: 13600, reward: { scrap: 22000000, aleacionReforzadaElite: 70 } },
            { enemyName: "Ronda Negra", health: 117000, shield: 50000, damage: 13700, reward: { scrap: 22500000, aleacionReforzadaElite: 72 } },
            { enemyName: "Ronda Negra", health: 118000, shield: 50500, damage: 13800, reward: { scrap: 23000000, neuroChipCorruptoElite: 60 } },
            { enemyName: "Ronda Negra", health: 119000, shield: 51000, damage: 13900, reward: { scrap: 23500000, neuroChipCorruptoElite: 62 } },
            { enemyName: "Azote del Vacío", health: 125000, shield: 53000, damage: 14500, reward: { scrap: 30000000, aleacionReforzadaElite: 80, neuroChipCorruptoElite: 70, planosMK5: 8 }, type: 'mini-boss' },
            { enemyName: "Saqueador Élite", health: 120000, shield: 51500, damage: 14000, reward: { scrap: 24000000, aleacionReforzadaElite: 75 } },
            { enemyName: "Saqueador Élite", health: 121000, shield: 52000, damage: 14100, reward: { scrap: 24500000, aleacionReforzadaElite: 78 } },
            { enemyName: "Saqueador Élite", health: 122000, shield: 52500, damage: 14200, reward: { scrap: 25000000, neuroChipCorruptoElite: 65 } },
            { enemyName: "Saqueador Élite", health: 123000, shield: 52800, damage: 14300, reward: { scrap: 25500000, neuroChipCorruptoElite: 68 } },
            { enemyName: "Capitán Atronador", health: 130000, shield: 56000, damage: 15000, reward: { scrap: 40000000, aleacionReforzadaElite: 90, neuroChipCorruptoElite: 80, planosMK5: 12 }, type: 'boss' },
        ]
      },
      {
        name: "Señor Kraag",
        description: "El caudillo de la Hermandad del Vacío y pirata más temido del sector. Su fragata ha sobrevivido a más batallas de las que se registran oficialmente.",
        isBoss: true,
        battles: [
            { enemyName: "Fragata Skullbreaker", health: 145000, shield: 63000, damage: 17000, reward: { scrap: 80000000, neuroChipCorruptoElite: 150, aleacionReforzadaElite: 150, planosMK5: 25 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "CAPÍTULO 2 — “Enjambre Carminis” (Difícil)",
    lore: "En los bordes del sector se ha detectado actividad de una especie insectoide conocida como los Carminis. Sus naves no son construidas: son criadas. Cada unidad del enjambre cumple una función biológica y militar, y se comunican por impulsos bioeléctricos. Tras detectar presencia humana, el enjambre ha iniciado un proceso de expansión agresiva.Si no destruyes sus colmenas adelantadas, acabarán multiplicándose hasta consumir todo el sector.",
    destinations: [
      {
        name: "Colmena de Frontera “Nido Espina”",
        description: "Pequeña colmena avanzada creada sobre un asteroide. Aquí se incuban las primeras naves vivas del enjambre: rápidas, frágiles y agresivas.",
        battles: [
            { enemyName: "Zángano Espina", health: 106000, shield: 45500, damage: 10200, reward: { scrap: 5000000, matrizQuitinaCristalElite: 5 } },
            { enemyName: "Zángano Espina", health: 107000, shield: 46000, damage: 10300, reward: { scrap: 5200000, matrizQuitinaCristalElite: 6 } },
            { enemyName: "Zángano Espina", health: 108000, shield: 46500, damage: 10400, reward: { scrap: 5500000, nucleoSinapticoFracturadoElite: 3 } },
            { enemyName: "Zángano Espina", health: 109000, shield: 47000, damage: 10500, reward: { scrap: 5800000, nucleoSinapticoFracturadoElite: 4 } },
            { enemyName: "Larva Guardiana", health: 115000, shield: 50000, damage: 11000, reward: { scrap: 7000000, matrizQuitinaCristalElite: 10, nucleoSinapticoFracturadoElite: 5, planosMK6: 1 }, type: 'mini-boss' },
            { enemyName: "Polinizador Letal", health: 110000, shield: 47500, damage: 10600, reward: { scrap: 6000000, matrizQuitinaCristalElite: 7 } },
            { enemyName: "Polinizador Letal", health: 111000, shield: 48000, damage: 10700, reward: { scrap: 6200000, matrizQuitinaCristalElite: 8 } },
            { enemyName: "Polinizador Letal", health: 112000, shield: 48500, damage: 10800, reward: { scrap: 6500000, nucleoSinapticoFracturadoElite: 5 } },
            { enemyName: "Polinizador Letal", health: 113000, shield: 49000, damage: 10900, reward: { scrap: 6800000, nucleoSinapticoFracturadoElite: 6 } },
            { enemyName: "Reina Menor Espina Roja", health: 120000, shield: 53000, damage: 11500, reward: { scrap: 10000000, matrizQuitinaCristalElite: 15, nucleoSinapticoFracturadoElite: 10, planosMK6: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Barranco Bioluminiscente “Hueco Ámbar”",
        description: "Un campo de asteroides convertidos en criaderos conectados por tubos orgánicos. La bioluminiscencia ámbar disimula el movimiento del enjambre.",
        battles: [
            { enemyName: "Cortador Ámbar", health: 121000, shield: 53500, damage: 11600, reward: { scrap: 9000000, nucleoSinapticoFracturadoElite: 12 } },
            { enemyName: "Cortador Ámbar", health: 122000, shield: 54000, damage: 11700, reward: { scrap: 9200000, nucleoSinapticoFracturadoElite: 14 } },
            { enemyName: "Cortador Ámbar", health: 123000, shield: 54500, damage: 11800, reward: { scrap: 9500000, matrizQuitinaCristalElite: 18 } },
            { enemyName: "Cortador Ámbar", health: 124000, shield: 55000, damage: 11900, reward: { scrap: 9800000, matrizQuitinaCristalElite: 20 } },
            { enemyName: "Centinela Resinario", health: 130000, shield: 58000, damage: 12500, reward: { scrap: 14000000, nucleoSinapticoFracturadoElite: 20, matrizQuitinaCristalElite: 25, planosMK6: 2 }, type: 'mini-boss' },
            { enemyName: "Acechador Filamento", health: 125000, shield: 55500, damage: 12000, reward: { scrap: 10000000, nucleoSinapticoFracturadoElite: 16 } },
            { enemyName: "Acechador Filamento", health: 126000, shield: 56000, damage: 12100, reward: { scrap: 10200000, nucleoSinapticoFracturadoElite: 18 } },
            { enemyName: "Acechador Filamento", health: 127000, shield: 56500, damage: 12200, reward: { scrap: 10500000, matrizQuitinaCristalElite: 22 } },
            { enemyName: "Acechador Filamento", health: 128000, shield: 57000, damage: 12300, reward: { scrap: 10800000, matrizQuitinaCristalElite: 24 } },
            { enemyName: "Soberana de Resina", health: 135000, shield: 61000, damage: 13000, reward: { scrap: 18000000, nucleoSinapticoFracturadoElite: 30, matrizQuitinaCristalElite: 30, planosMK6: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Nebulosa “Velo Melífero”",
        description: "Una nebulosa cargada de partículas dulces que los Carminis usan para nutrir sus naves. Todo aquí es pegajoso, denso y lleno de formas vivas.",
        battles: [
            { enemyName: "Recolector Néctar", health: 136000, shield: 61500, damage: 13100, reward: { scrap: 15000000, matrizQuitinaCristalElite: 30 } },
            { enemyName: "Recolector Néctar", health: 137000, shield: 62000, damage: 13200, reward: { scrap: 15500000, matrizQuitinaCristalElite: 32 } },
            { enemyName: "Recolector Néctar", health: 138000, shield: 62500, damage: 13300, reward: { scrap: 16000000, nucleoSinapticoFracturadoElite: 25 } },
            { enemyName: "Recolector Néctar", health: 139000, shield: 63000, damage: 13400, reward: { scrap: 16500000, nucleoSinapticoFracturadoElite: 28 } },
            { enemyName: "Emisor de Feromonas", health: 145000, shield: 66000, damage: 14000, reward: { scrap: 22000000, matrizQuitinaCristalElite: 40, nucleoSinapticoFracturadoElite: 35, planosMK6: 4 }, type: 'mini-boss' },
            { enemyName: "Ala Melífera", health: 140000, shield: 63500, damage: 13500, reward: { scrap: 17000000, matrizQuitinaCristalElite: 35 } },
            { enemyName: "Ala Melífera", health: 141000, shield: 64000, damage: 13600, reward: { scrap: 17500000, matrizQuitinaCristalElite: 38 } },
            { enemyName: "Ala Melífera", health: 142000, shield: 64500, damage: 13700, reward: { scrap: 18000000, nucleoSinapticoFracturadoElite: 30 } },
            { enemyName: "Ala Melífera", health: 143000, shield: 65000, damage: 13800, reward: { scrap: 18500000, nucleoSinapticoFracturadoElite: 32 } },
            { enemyName: "Dama del Velo Dulce", health: 150000, shield: 69000, damage: 14500, reward: { scrap: 28000000, matrizQuitinaCristalElite: 50, nucleoSinapticoFracturadoElite: 40, planosMK6: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Túneles del Caparazón “Cripta Quitina”",
        description: "Una antigua estación espacial ha sido absorbida y convertida en una colmena orgánica. La estructura está cubierta de placas de quitina.",
        battles: [
            { enemyName: "Quitinoide Raso", health: 151000, shield: 69500, damage: 14600, reward: { scrap: 25000000, nucleoSinapticoFracturadoElite: 40 } },
            { enemyName: "Quitinoide Raso", health: 152000, shield: 70000, damage: 14700, reward: { scrap: 25500000, nucleoSinapticoFracturadoElite: 42 } },
            { enemyName: "Quitinoide Raso", health: 153000, shield: 70500, damage: 14800, reward: { scrap: 26000000, matrizQuitinaCristalElite: 50 } },
            { enemyName: "Quitinoide Raso", health: 154000, shield: 71000, damage: 14900, reward: { scrap: 26500000, matrizQuitinaCristalElite: 52 } },
            { enemyName: "Destructor Mandíbula", health: 160000, shield: 74000, damage: 15500, reward: { scrap: 35000000, nucleoSinapticoFracturadoElite: 50, matrizQuitinaCristalElite: 60, planosMK6: 6 }, type: 'mini-boss' },
            { enemyName: "Ala Serrada", health: 155000, shield: 71500, damage: 15000, reward: { scrap: 27000000, nucleoSinapticoFracturadoElite: 45 } },
            { enemyName: "Ala Serrada", health: 156000, shield: 72000, damage: 15100, reward: { scrap: 27500000, nucleoSinapticoFracturadoElite: 48 } },
            { enemyName: "Ala Serrada", health: 157000, shield: 72500, damage: 15200, reward: { scrap: 28000000, matrizQuitinaCristalElite: 55 } },
            { enemyName: "Ala Serrada", health: 158000, shield: 73000, damage: 15300, reward: { scrap: 28500000, matrizQuitinaCristalElite: 58 } },
            { enemyName: "Señora Mandibular", health: 165000, shield: 77000, damage: 16000, reward: { scrap: 40000000, nucleoSinapticoFracturadoElite: 60, matrizQuitinaCristalElite: 70, planosMK6: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Corazón del Enjambre “Púlsar Carmesí”",
        description: "Aquí late la colmena principal. Naves enormes, biotecnología compleja y un flujo constante de criaturas naciendo y muriendo en ciclos de minutos.",
        battles: [
            { enemyName: "Guardián Carmesí", health: 166000, shield: 77500, damage: 16100, reward: { scrap: 38000000, matrizQuitinaCristalElite: 70 } },
            { enemyName: "Guardián Carmesí", health: 167000, shield: 78000, damage: 16200, reward: { scrap: 38500000, matrizQuitinaCristalElite: 72 } },
            { enemyName: "Guardián Carmesí", health: 168000, shield: 78500, damage: 16300, reward: { scrap: 39000000, nucleoSinapticoFracturadoElite: 60 } },
            { enemyName: "Guardián Carmesí", health: 169000, shield: 79000, damage: 16400, reward: { scrap: 39500000, nucleoSinapticoFracturadoElite: 62 } },
            { enemyName: "Esporo Alfa", health: 175000, shield: 82000, damage: 17000, reward: { scrap: 50000000, matrizQuitinaCristalElite: 80, nucleoSinapticoFracturadoElite: 70, planosMK6: 8 }, type: 'mini-boss' },
            { enemyName: "Irradiado del Enjambre", health: 170000, shield: 79500, damage: 16500, reward: { scrap: 40000000, matrizQuitinaCristalElite: 75 } },
            { enemyName: "Irradiado del Enjambre", health: 171000, shield: 80000, damage: 16600, reward: { scrap: 40500000, matrizQuitinaCristalElite: 78 } },
            { enemyName: "Irradiado del Enjambre", health: 172000, shield: 80500, damage: 16700, reward: { scrap: 41000000, nucleoSinapticoFracturadoElite: 65 } },
            { enemyName: "Irradiado del Enjambre", health: 173000, shield: 81000, damage: 16800, reward: { scrap: 41500000, nucleoSinapticoFracturadoElite: 68 } },
            { enemyName: "Matriarca Sangrecolmena", health: 180000, shield: 85000, damage: 17500, reward: { scrap: 60000000, matrizQuitinaCristalElite: 90, nucleoSinapticoFracturadoElite: 80, planosMK6: 12 }, type: 'boss' },
        ]
      },
      {
        name: "“La Emperatriz Carminis”",
        description: "La reina suprema del enjambre en este sector. Una nave viva del tamaño de un crucero, protegida por placas de quitina cristalizada y un núcleo bioenergético capaz de lanzar descargas masivas.Si la Emperatriz cae, el enjambre entra en caos.",
        isBoss: true,
        battles: [
          { enemyName: "Emperatriz Carminis", health: 200000, shield: 95000, damage: 19500, reward: { scrap: 100000000, nucleoSinapticoFracturadoElite: 150, matrizQuitinaCristalElite: 150, planosMK6: 25 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "CAPÍTULO 3 — “Legión Ilex” (Difícil)",
    lore: "La Legión Ilex es una compañía militar privada que opera fuera de toda jurisdicción. Sus naves no muestran matrículas, sus pilotos no responden llamadas, y sus contratos incluyen “neutralización preventiva” de cualquier objetivo que pueda comprometer sus intereses.Aunque oficialmente dicen ofrecer “seguridad corporativa”, en realidad actúan como un ejército mercenario al servicio del mejor postor.Has entrado en territorio contratado —y ellos no negocian con intrusos.",
    destinations: [
        {
            name: "Perímetro Gris",
            description: "Zona de contención exterior. Patrullas ligeras con camuflaje gris polar mantienen un bloqueo frío y sistemático.",
            battles: [
                { enemyName: "Patrulla Gris", health: 161000, shield: 72500, damage: 17600, reward: { scrap: 80000000, moduloManiobrasTácticasElite: 5 } },
                { enemyName: "Patrulla Gris", health: 162000, shield: 73000, damage: 17700, reward: { scrap: 81000000, moduloManiobrasTácticasElite: 6 } },
                { enemyName: "Patrulla Gris", health: 163000, shield: 73500, damage: 17800, reward: { scrap: 82000000, placasCamuflajeActivoElite: 3 } },
                { enemyName: "Patrulla Gris", health: 164000, shield: 74000, damage: 17900, reward: { scrap: 83000000, placasCamuflajeActivoElite: 4 } },
                { enemyName: "Blindado Scout", health: 170000, shield: 77000, damage: 18500, reward: { scrap: 100000000, moduloManiobrasTácticasElite: 10, placasCamuflajeActivoElite: 5, planosMK7: 1 }, type: 'mini-boss' },
                { enemyName: "Recluta Armado", health: 165000, shield: 74500, damage: 18000, reward: { scrap: 84000000, moduloManiobrasTácticasElite: 7 } },
                { enemyName: "Recluta Armado", health: 166000, shield: 75000, damage: 18100, reward: { scrap: 85000000, moduloManiobrasTácticasElite: 8 } },
                { enemyName: "Recluta Armado", health: 167000, shield: 75500, damage: 18200, reward: { scrap: 86000000, placasCamuflajeActivoElite: 5 } },
                { enemyName: "Recluta Armado", health: 168000, shield: 76000, damage: 18300, reward: { scrap: 87000000, placasCamuflajeActivoElite: 6 } },
                { enemyName: "Teniente Centinela", health: 175000, shield: 80000, damage: 19000, reward: { scrap: 120000000, moduloManiobrasTácticasElite: 15, placasCamuflajeActivoElite: 10, planosMK7: 3 }, type: 'boss' },
            ]
        },
        {
            name: "Corredor de Interdicción",
            description: "Un corredor de tránsito militarizado, lleno de balizas inhibidoras y radares inteligentes. Nadie pasa sin ser registrado… o destruido.",
            battles: [
                { enemyName: "Interdictor Delta", health: 176000, shield: 80500, damage: 19100, reward: { scrap: 110000000, placasCamuflajeActivoElite: 12 } },
                { enemyName: "Interdictor Delta", health: 177000, shield: 81000, damage: 19200, reward: { scrap: 112000000, placasCamuflajeActivoElite: 14 } },
                { enemyName: "Interdictor Delta", health: 178000, shield: 81500, damage: 19300, reward: { scrap: 115000000, moduloManiobrasTácticasElite: 18 } },
                { enemyName: "Interdictor Delta", health: 179000, shield: 82000, damage: 19400, reward: { scrap: 118000000, moduloManiobrasTácticasElite: 20 } },
                { enemyName: "Operador Jammer", health: 185000, shield: 85000, damage: 20000, reward: { scrap: 150000000, placasCamuflajeActivoElite: 20, moduloManiobrasTácticasElite: 25, planosMK7: 2 }, type: 'mini-boss' },
                { enemyName: "Asaltante Táctico", health: 180000, shield: 82500, damage: 19500, reward: { scrap: 120000000, placasCamuflajeActivoElite: 16 } },
                { enemyName: "Asaltante Táctico", health: 181000, shield: 83000, damage: 19600, reward: { scrap: 122000000, placasCamuflajeActivoElite: 18 } },
                { enemyName: "Asaltante Táctico", health: 182000, shield: 83500, damage: 19700, reward: { scrap: 125000000, moduloManiobrasTácticasElite: 22 } },
                { enemyName: "Asaltante Táctico", health: 183000, shield: 84000, damage: 19800, reward: { scrap: 128000000, moduloManiobrasTácticasElite: 24 } },
                { enemyName: "Capitán Vector", health: 190000, shield: 88000, damage: 21000, reward: { scrap: 180000000, placasCamuflajeActivoElite: 30, moduloManiobrasTácticasElite: 30, planosMK7: 5 }, type: 'boss' },
            ]
        },
        {
            name: "Base Móvil “Ilex-03”",
            description: "Una megaestructura modular que sirve de cuartel itinerante. Talleres móviles, hangares plegables y lanzaderas de combate salen sin pausa.",
            battles: [
                { enemyName: "Mecaguarida", health: 191000, shield: 88500, damage: 21100, reward: { scrap: 160000000, moduloManiobrasTácticasElite: 30 } },
                { enemyName: "Mecaguarida", health: 192000, shield: 89000, damage: 21200, reward: { scrap: 162000000, moduloManiobrasTácticasElite: 32 } },
                { enemyName: "Mecaguarida", health: 193000, shield: 89500, damage: 21300, reward: { scrap: 165000000, placasCamuflajeActivoElite: 25 } },
                { enemyName: "Mecaguarida", health: 194000, shield: 90000, damage: 21400, reward: { scrap: 168000000, placasCamuflajeActivoElite: 28 } },
                { enemyName: "Supervisor de Hangar", health: 200000, shield: 93000, damage: 22000, reward: { scrap: 220000000, moduloManiobrasTácticasElite: 40, placasCamuflajeActivoElite: 35, planosMK7: 4 }, type: 'mini-boss' },
                { enemyName: "Técnico de Choque", health: 195000, shield: 90500, damage: 21500, reward: { scrap: 170000000, moduloManiobrasTácticasElite: 35 } },
                { enemyName: "Técnico de Choque", health: 196000, shield: 91000, damage: 21600, reward: { scrap: 172000000, moduloManiobrasTácticasElite: 38 } },
                { enemyName: "Técnico de Choque", health: 197000, shield: 91500, damage: 21700, reward: { scrap: 175000000, placasCamuflajeActivoElite: 30 } },
                { enemyName: "Técnico de Choque", health: 198000, shield: 92000, damage: 21800, reward: { scrap: 178000000, placasCamuflajeActivoElite: 32 } },
                { enemyName: "Comandante Argón", health: 205000, shield: 96000, damage: 23000, reward: { scrap: 280000000, moduloManiobrasTácticasElite: 50, placasCamuflajeActivoElite: 40, planosMK7: 8 }, type: 'boss' },
            ]
        },
        {
            name: "Zona Cráneo Verde",
            description: "Sector de entrenamiento avanzado. Aquí se realizan simulacros reales, usando munición de guerra y tácticas corporativas brutalmente eficientes.",
            battles: [
                { enemyName: "Cadete Esmeralda", health: 206000, shield: 96500, damage: 23100, reward: { scrap: 250000000, placasCamuflajeActivoElite: 40 } },
                { enemyName: "Cadete Esmeralda", health: 207000, shield: 97000, damage: 23200, reward: { scrap: 255000000, placasCamuflajeActivoElite: 42 } },
                { enemyName: "Cadete Esmeralda", health: 208000, shield: 97500, damage: 23300, reward: { scrap: 260000000, moduloManiobrasTácticasElite: 50 } },
                { enemyName: "Cadete Esmeralda", health: 209000, shield: 98000, damage: 23400, reward: { scrap: 265000000, moduloManiobrasTácticasElite: 52 } },
                { enemyName: "Instructor Sierra", health: 215000, shield: 101000, damage: 24000, reward: { scrap: 350000000, placasCamuflajeActivoElite: 50, moduloManiobrasTácticasElite: 60, planosMK7: 6 }, type: 'mini-boss' },
                { enemyName: "Tirador Musgo", health: 210000, shield: 98500, damage: 23500, reward: { scrap: 270000000, placasCamuflajeActivoElite: 45 } },
                { enemyName: "Tirador Musgo", health: 211000, shield: 99000, damage: 23600, reward: { scrap: 275000000, placasCamuflajeActivoElite: 48 } },
                { enemyName: "Tirador Musgo", health: 212000, shield: 99500, damage: 23700, reward: { scrap: 280000000, moduloManiobrasTácticasElite: 55 } },
                { enemyName: "Tirador Musgo", health: 213000, shield: 100000, damage: 23800, reward: { scrap: 285000000, moduloManiobrasTácticasElite: 58 } },
                { enemyName: "Mayor Coraza Verde", health: 220000, shield: 104000, damage: 25000, reward: { scrap: 400000000, placasCamuflajeActivoElite: 60, moduloManiobrasTácticasElite: 70, planosMK7: 10 }, type: 'boss' },
            ]
        },
        {
            name: "Línea Férrea Cerberus",
            description: "La zona de contención interna final. Tres cinturones defensivos, torres automáticas y fragatas de escolta dan forma a una muralla móvil impenetrable.",
            battles: [
                { enemyName: "Vigía Cerberus", health: 221000, shield: 104500, damage: 25100, reward: { scrap: 380000000, esenciaDelVacio: 80 } },
                { enemyName: "Vigía Cerberus", health: 222000, shield: 105000, damage: 25200, reward: { scrap: 385000000, esenciaDelVacio: 82 } },
                { enemyName: "Vigía Cerberus", health: 223000, shield: 105500, damage: 25300, reward: { scrap: 390000000, reliquiaCorrupta: 90 } },
                { enemyName: "Vigía Cerberus", health: 224000, shield: 106000, damage: 25400, reward: { scrap: 395000000, reliquiaCorrupta: 92 } },
                { enemyName: "Unidad Cerberus-β", health: 230000, shield: 109000, damage: 26000, reward: { scrap: 500000000, esenciaDelVacio: 100, reliquiaCorrupta: 100, planosMK7: 15 }, type: 'mini-boss' },
                { enemyName: "Operador Férreo", health: 225000, shield: 106500, damage: 25500, reward: { scrap: 400000000, esenciaDelVacio: 85 } },
                { enemyName: "Operador Férreo", health: 226000, shield: 107000, damage: 25600, reward: { scrap: 410000000, esenciaDelVacio: 88 } },
                { enemyName: "Operador Férreo", health: 227000, shield: 107500, damage: 25700, reward: { scrap: 420000000, reliquiaCorrupta: 95 } },
                { enemyName: "Operador Férreo", health: 228000, shield: 108000, damage: 25800, reward: { scrap: 430000000, reliquiaCorrupta: 98 } },
                { enemyName: "Coronel Muralla", health: 240000, shield: 115000, damage: 27000, reward: { scrap: 800000000, moduloManiobrasTácticasElite: 150, placasCamuflajeActivoElite: 150, planosMK7: 25 }, type: 'boss' },
            ]
        },
        {
            name: "Bastión Regimental “Ilex Prime”",
            description: "El cuartel general flotante de la Legión Ilex. Un coloso blindado con camuflaje adaptativo, artillería orbital y un núcleo táctico que coordina toda la red mercenaria.Ninguna nave ha conseguido atravesar sus defensas… hasta ahora.",
            isBoss: true,
            battles: [
              { enemyName: "Destructor “Iron Howl”", health: 240000, shield: 115000, damage: 27000, reward: { scrap: 800000000, moduloManiobrasTácticasElite: 150, placasCamuflajeActivoElite: 150, planosMK7: 25 }, type: 'boss' },
            ]
        }
    ]
  },
  {
    name: "CAPÍTULO 4 — “El Dominio Aureano” (Difícil)",
    lore: "Los Aureanos son una antigua civilización tecno-espiritual que canaliza energía pura mediante cristales resonantes. Sus naves no están construidas: están esculpidas en luz solidificada.Consideran su territorio sagrado y ven a cualquier intruso como una amenaza para el “Equilibrio Cósmico”.Tu entrada ha despertado a sus Custodios.",
    destinations: [
      {
        name: "Umbral Celeste",
        description: "Puertas de entrada al territorio aureano. Torres flotantes proyectan escudos de luz que examinan todo lo que cruza.",
        battles: [
            { enemyName: "Centinela Celeste", health: 266000, shield: 125500, damage: 32100, reward: { scrap: 1000000000, placasDeAetheriumElite: 5 } },
            { enemyName: "Centinela Celeste", health: 267000, shield: 126000, damage: 32200, reward: { scrap: 1100000000, placasDeAetheriumElite: 6 } },
            { enemyName: "Centinela Celeste", health: 268000, shield: 126500, damage: 32300, reward: { scrap: 1200000000, nucleoPsionicoArmonicoElite: 3 } },
            { enemyName: "Centinela Celeste", health: 269000, shield: 127000, damage: 32400, reward: { scrap: 1300000000, nucleoPsionicoArmonicoElite: 4 } },
            { enemyName: "Vigilante Prismático", health: 275000, shield: 130000, damage: 33000, reward: { scrap: 1500000000, placasDeAetheriumElite: 10, nucleoPsionicoArmonicoElite: 5, planosMK8: 1 }, type: 'mini-boss' },
            { enemyName: "Eco de Luz", health: 270000, shield: 127500, damage: 32500, reward: { scrap: 1350000000, placasDeAetheriumElite: 7 } },
            { enemyName: "Eco de Luz", health: 271000, shield: 128000, damage: 32600, reward: { scrap: 1400000000, placasDeAetheriumElite: 8 } },
            { enemyName: "Eco de Luz", health: 272000, shield: 128500, damage: 32700, reward: { scrap: 1450000000, nucleoPsionicoArmonicoElite: 5 } },
            { enemyName: "Eco de Luz", health: 273000, shield: 129000, damage: 32800, reward: { scrap: 1480000000, nucleoPsionicoArmonicoElite: 6 } },
            { enemyName: "Custodio Aural", health: 280000, shield: 135000, damage: 34000, reward: { scrap: 2000000000, placasDeAetheriumElite: 15, nucleoPsionicoArmonicoElite: 10, planosMK8: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Campos Resonantes",
        description: "Amplias llanuras de energía cristalizada donde los Aureanos entrenan a sus naves vivas. La energía vibra como un coro.",
        battles: [
            { enemyName: "Iniciado Resonante", health: 281000, shield: 135500, damage: 34100, reward: { scrap: 1800000000, nucleoPsionicoArmonicoElite: 12 } },
            { enemyName: "Iniciado Resonante", health: 282000, shield: 136000, damage: 34200, reward: { scrap: 1850000000, nucleoPsionicoArmonicoElite: 14 } },
            { enemyName: "Iniciado Resonante", health: 283000, shield: 136500, damage: 34300, reward: { scrap: 1900000000, placasDeAetheriumElite: 18 } },
            { enemyName: "Iniciado Resonante", health: 284000, shield: 137000, damage: 34400, reward: { scrap: 1950000000, placasDeAetheriumElite: 20 } },
            { enemyName: "Agravio Armónico", health: 290000, shield: 140000, damage: 35000, reward: { scrap: 2500000000, nucleoPsionicoArmonicoElite: 20, placasDeAetheriumElite: 25, planosMK8: 2 }, type: 'mini-boss' },
            { enemyName: "Disonancia Errante", health: 285000, shield: 137500, damage: 34500, reward: { scrap: 2000000000, nucleoPsionicoArmonicoElite: 16 } },
            { enemyName: "Disonancia Errante", health: 286000, shield: 138000, damage: 34600, reward: { scrap: 2050000000, nucleoPsionicoArmonicoElite: 18 } },
            { enemyName: "Disonancia Errante", health: 287000, shield: 138500, damage: 34700, reward: { scrap: 2100000000, placasDeAetheriumElite: 22 } },
            { enemyName: "Disonancia Errante", health: 288000, shield: 139000, damage: 34800, reward: { scrap: 2150000000, placasDeAetheriumElite: 24 } },
            { enemyName: "Maestro de la Resonancia", health: 295000, shield: 143000, damage: 36000, reward: { scrap: 3000000000, nucleoPsionicoArmonicoElite: 30, placasDeAetheriumElite: 30, planosMK8: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Sagrario de Aurora",
        description: "Un templo flotante donde los Aureanos canalizan la “Llama Interior”, una fuente energética consciente.",
        battles: [
            { enemyName: "Guardián de Aurora", health: 296000, shield: 143500, damage: 36100, reward: { scrap: 2800000000, placasDeAetheriumElite: 30 } },
            { enemyName: "Guardián de Aurora", health: 297000, shield: 144000, damage: 36200, reward: { scrap: 2850000000, placasDeAetheriumElite: 32 } },
            { enemyName: "Guardián de Aurora", health: 298000, shield: 144500, damage: 36300, reward: { scrap: 2900000000, nucleoPsionicoArmonicoElite: 25 } },
            { enemyName: "Guardián de Aurora", health: 299000, shield: 145000, damage: 36400, reward: { scrap: 2950000000, nucleoPsionicoArmonicoElite: 28 } },
            { enemyName: "Portador de la Llama", health: 305000, shield: 148000, damage: 37000, reward: { scrap: 3800000000, placasDeAetheriumElite: 40, nucleoPsionicoArmonicoElite: 35, planosMK8: 4 }, type: 'mini-boss' },
            { enemyName: "Chispa Ancestral", health: 300000, shield: 145500, damage: 36500, reward: { scrap: 3000000000, placasDeAetheriumElite: 35 } },
            { enemyName: "Chispa Ancestral", health: 301000, shield: 146000, damage: 36600, reward: { scrap: 3100000000, placasDeAetheriumElite: 38 } },
            { enemyName: "Chispa Ancestral", health: 302000, shield: 146500, damage: 36700, reward: { scrap: 3200000000, nucleoPsionicoArmonicoElite: 30 } },
            { enemyName: "Chispa Ancestral", health: 303000, shield: 147000, damage: 36800, reward: { scrap: 3300000000, nucleoPsionicoArmonicoElite: 32 } },
            { enemyName: "Orador Lumínico", health: 310000, shield: 150000, damage: 38000, reward: { scrap: 4200000000, placasDeAetheriumElite: 45, nucleoPsionicoArmonicoElite: 40, planosMK8: 7 }, type: 'boss' },
        ]
      },
      {
        name: "Bastión Dorado",
        description: "Nudos de defensa hechos con placas de luz endurecida. Cada estructura cambia de forma según la amenaza detectada.",
        battles: [
            { enemyName: "Arconte Dorado", health: 304000, shield: 147500, damage: 36900, reward: { scrap: 3400000000, placasDeAetheriumElite: 40 } },
            { enemyName: "Arconte Dorado", health: 305000, shield: 148000, damage: 37000, reward: { scrap: 3500000000, placasDeAetheriumElite: 42 } },
            { enemyName: "Arconte Dorado", health: 306000, shield: 148500, damage: 37100, reward: { scrap: 3600000000, nucleoPsionicoArmonicoElite: 35 } },
            { enemyName: "Arconte Dorado", health: 307000, shield: 149000, damage: 37200, reward: { scrap: 3700000000, nucleoPsionicoArmonicoElite: 38 } },
            { enemyName: "Escudo Viviente", health: 315000, shield: 155000, damage: 38500, reward: { scrap: 4500000000, placasDeAetheriumElite: 50, nucleoPsionicoArmonicoElite: 45, planosMK8: 6 }, type: 'mini-boss' },
            { enemyName: "Lanza Radiante", health: 308000, shield: 149500, damage: 37300, reward: { scrap: 3800000000, placasDeAetheriumElite: 42 } },
            { enemyName: "Lanza Radiante", health: 309000, shield: 150000, damage: 37400, reward: { scrap: 3900000000, placasDeAetheriumElite: 44 } },
            { enemyName: "Lanza Radiante", health: 310000, shield: 150500, damage: 37500, reward: { scrap: 4000000000, nucleoPsionicoArmonicoElite: 40 } },
            { enemyName: "Lanza Radiante", health: 311000, shield: 151000, damage: 37600, reward: { scrap: 4100000000, nucleoPsionicoArmonicoElite: 42 } },
            { enemyName: "Prelado Solemne", health: 320000, shield: 160000, damage: 40000, reward: { scrap: 5000000000, placasDeAetheriumElite: 60, nucleoPsionicoArmonicoElite: 50, planosMK8: 9 }, type: 'boss' },
        ]
      },
      {
        name: "Horizonte Sacro",
        description: "Un anillo de plataformas levitantes que protege la capital aureana. Aquí la energía vibra como si tuviera voluntad propia.",
        battles: [
            { enemyName: "Aureano Sagrado", health: 312000, shield: 151500, damage: 37700, reward: { scrap: 4200000000, nucleoPsionicoArmonicoElite: 45 } },
            { enemyName: "Aureano Sagrado", health: 313000, shield: 152000, damage: 37800, reward: { scrap: 4300000000, nucleoPsionicoArmonicoElite: 48 } },
            { enemyName: "Aureano Sagrado", health: 314000, shield: 152500, damage: 37900, reward: { scrap: 4400000000, placasDeAetheriumElite: 50 } },
            { enemyName: "Aureano Sagrado", health: 315000, shield: 153000, damage: 38000, reward: { scrap: 4500000000, placasDeAetheriumElite: 52 } },
            { enemyName: "Disruptor del Horizonte", health: 325000, shield: 160000, damage: 41000, reward: { scrap: 5500000000, nucleoPsionicoArmonicoElite: 55, placasDeAetheriumElite: 55, planosMK8: 8 }, type: 'mini-boss' },
            { enemyName: "Rayo Custodio", health: 316000, shield: 153500, damage: 38100, reward: { scrap: 4600000000, nucleoPsionicoArmonicoElite: 50 } },
            { enemyName: "Rayo Custodio", health: 317000, shield: 154000, damage: 38200, reward: { scrap: 4700000000, nucleoPsionicoArmonicoElite: 52 } },
            { enemyName: "Rayo Custodio", health: 318000, shield: 154500, damage: 38300, reward: { scrap: 4800000000, placasDeAetheriumElite: 58 } },
            { enemyName: "Rayo Custodio", health: 319000, shield: 155000, damage: 38400, reward: { scrap: 4900000000, placasDeAetheriumElite: 60 } },
            { enemyName: "Sumo Guardián del Vórtice", health: 330000, shield: 165000, damage: 43000, reward: { scrap: 6000000000, nucleoPsionicoArmonicoElite: 65, placasDeAetheriumElite: 60, planosMK8: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Ciudad-Luz \"Solarion Primus\"",
        description: "La capital flotante de los Aureanos. Un mundo-nave formado por capas de luz cristalizada, guiado por la conciencia colectiva de toda su especie.Aqui reside la encarnacion suprema de su voluntad.",
        isBoss: true,
        battles: [
          { enemyName: "Arconte Supremo Seraphys", health: 350000, shield: 175000, damage: 45000, reward: { scrap: 10000000000, nucleoPsionicoArmonicoElite: 100, placasDeAetheriumElite: 100, planosMK8: 20 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "CAPÍTULO 5 — “El Culto del Abismo” (Difícil)",
    lore: "En los confines olvidados del espacio, una fuerza corrupta conocida como El Culto del Abismo devora sistemas enteros. Sus naves son amalgamas de metal retorcido, carne mutada y símbolos prohibidos que palpitan como si estuvieran vivos. Siguen a entidades extradimensionales llamadas Los Susurrantes, cuyas voces turban la mente de cualquier piloto que se acerque.\\nLa corrupción avanza como una enfermedad, reescribiendo la materia… y la voluntad.",
    destinations: [
      {
        name: "Penumbra Sangrante",
        description: "Un corredor espacial impregnado de niebla rojiza. Estructuras flotantes, deformadas por la corrupción, laten como órganos gigantescos.",
        battles: [
          { enemyName: "Engendro Penumbrio", health: 335000, shield: 167500, damage: 33500, reward: { scrap: 7000000000, tejidoAbisalRetorcidoElite: 5 } },
          { enemyName: "Engendro Penumbrio", health: 340000, shield: 170000, damage: 34000, reward: { scrap: 7200000000, tejidoAbisalRetorcidoElite: 6 } },
          { enemyName: "Engendro Penumbrio", health: 345000, shield: 172500, damage: 34500, reward: { scrap: 7500000000, singularidadCorruptaContenidaElite: 3 } },
          { enemyName: "Engendro Penumbrio", health: 350000, shield: 175000, damage: 35000, reward: { scrap: 7800000000, singularidadCorruptaContenidaElite: 4 } },
          { enemyName: "Vástago Hemolítico", health: 370000, shield: 185000, damage: 37000, reward: { scrap: 10000000000, tejidoAbisalRetorcidoElite: 10, singularidadCorruptaContenidaElite: 5, planosMK9: 1 }, type: 'mini-boss' },
          { enemyName: "Deforme Sanguinas", health: 355000, shield: 177500, damage: 35500, reward: { scrap: 8000000000, tejidoAbisalRetorcidoElite: 7 } },
          { enemyName: "Deforme Sanguinas", health: 360000, shield: 180000, damage: 36000, reward: { scrap: 8200000000, tejidoAbisalRetorcidoElite: 8 } },
          { enemyName: "Deforme Sanguinas", health: 365000, shield: 182500, damage: 36500, reward: { scrap: 8500000000, singularidadCorruptaContenidaElite: 5 } },
          { enemyName: "Deforme Sanguinas", health: 370000, shield: 185000, damage: 37000, reward: { scrap: 8800000000, singularidadCorruptaContenidaElite: 6 } },
          { enemyName: "Heraldo Carmesí", health: 400000, shield: 200000, damage: 40000, reward: { scrap: 15000000000, tejidoAbisalRetorcidoElite: 15, singularidadCorruptaContenidaElite: 10, planosMK9: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Forja Profanada",
        description: "Una antigua estación industrial tomada por el Culto. Los hornos ahora funden metal y carne por igual, creando naves vivientes.",
        battles: [
          { enemyName: "Fragmento Profano", health: 405000, shield: 202500, damage: 40500, reward: { scrap: 12000000000, singularidadCorruptaContenidaElite: 10 } },
          { enemyName: "Fragmento Profano", health: 410000, shield: 205000, damage: 41000, reward: { scrap: 12200000000, singularidadCorruptaContenidaElite: 12 } },
          { enemyName: "Fragmento Profano", health: 415000, shield: 207500, damage: 41500, reward: { scrap: 12500000000, tejidoAbisalRetorcidoElite: 10 } },
          { enemyName: "Fragmento Profano", health: 420000, shield: 210000, damage: 42000, reward: { scrap: 12800000000, tejidoAbisalRetorcidoElite: 12 } },
          { enemyName: "Operario del Vacío", health: 450000, shield: 225000, damage: 45000, reward: { scrap: 18000000000, singularidadCorruptaContenidaElite: 20, tejidoAbisalRetorcidoElite: 15, planosMK9: 2 }, type: 'mini-boss' },
          { enemyName: "Masa Forjada", health: 425000, shield: 212500, damage: 42500, reward: { scrap: 13000000000, singularidadCorruptaContenidaElite: 14 } },
          { enemyName: "Masa Forjada", health: 430000, shield: 215000, damage: 43000, reward: { scrap: 13200000000, singularidadCorruptaContenidaElite: 16 } },
          { enemyName: "Masa Forjada", health: 435000, shield: 217500, damage: 43500, reward: { scrap: 13500000000, tejidoAbisalRetorcidoElite: 14 } },
          { enemyName: "Masa Forjada", health: 440000, shield: 220000, damage: 44000, reward: { scrap: 13800000000, tejidoAbisalRetorcidoElite: 16 } },
          { enemyName: "Artífice del Abismo", health: 480000, shield: 240000, damage: 48000, reward: { scrap: 25000000000, singularidadCorruptaContenidaElite: 30, tejidoAbisalRetorcidoElite: 25, planosMK9: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Madriguera del Susurro",
        description: "Zonas colapsadas donde ecos distorsionados repiten frases imposibles. Los Susurrantes habitan aquí… o quizás solo sus voces.",
        battles: [
          { enemyName: "Eco Torturado", health: 485000, shield: 242500, damage: 48500, reward: { scrap: 20000000000, tejidoAbisalRetorcidoElite: 20 } },
          { enemyName: "Eco Torturado", health: 490000, shield: 245000, damage: 49000, reward: { scrap: 20500000000, tejidoAbisalRetorcidoElite: 22 } },
          { enemyName: "Eco Torturado", health: 495000, shield: 247500, damage: 49500, reward: { scrap: 21000000000, singularidadCorruptaContenidaElite: 25 } },
          { enemyName: "Eco Torturado", health: 500000, shield: 250000, damage: 50000, reward: { scrap: 21500000000, singularidadCorruptaContenidaElite: 28 } },
          { enemyName: "Devoramente", health: 530000, shield: 265000, damage: 53000, reward: { scrap: 30000000000, tejidoAbisalRetorcidoElite: 30, singularidadCorruptaContenidaElite: 35, planosMK9: 4 }, type: 'mini-boss' },
          { enemyName: "Aullador del Silencio", health: 505000, shield: 252500, damage: 50500, reward: { scrap: 22000000000, tejidoAbisalRetorcidoElite: 25 } },
          { enemyName: "Aullador del Silencio", health: 510000, shield: 255000, damage: 51000, reward: { scrap: 22500000000, tejidoAbisalRetorcidoElite: 28 } },
          { enemyName: "Aullador del Silencio", health: 515000, shield: 257500, damage: 51500, reward: { scrap: 23000000000, singularidadCorruptaContenidaElite: 30 } },
          { enemyName: "Aullador del Silencio", health: 520000, shield: 260000, damage: 52000, reward: { scrap: 23500000000, singularidadCorruptaContenidaElite: 32 } },
          { enemyName: "Profeta de los Susurros", health: 560000, shield: 280000, damage: 56000, reward: { scrap: 40000000000, tejidoAbisalRetorcidoElite: 40, singularidadCorruptaContenidaElite: 40, planosMK9: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Desgarro Onírico",
        description: "Una grieta dimensional convertida en bastión. La realidad aquí es inconsistente: el espacio se dobla, vibra y se retuerce.",
        battles: [
          { enemyName: "Rastro Abismal", health: 565000, shield: 282500, damage: 56500, reward: { scrap: 35000000000, singularidadCorruptaContenidaElite: 40 } },
          { enemyName: "Rastro Abismal", health: 570000, shield: 285000, damage: 57000, reward: { scrap: 35500000000, singularidadCorruptaContenidaElite: 42 } },
          { enemyName: "Rastro Abismal", health: 575000, shield: 287500, damage: 57500, reward: { scrap: 36000000000, tejidoAbisalRetorcidoElite: 40 } },
          { enemyName: "Rastro Abismal", health: 580000, shield: 290000, damage: 58000, reward: { scrap: 36500000000, tejidoAbisalRetorcidoElite: 42 } },
          { enemyName: "Quimera Delirante", health: 610000, shield: 305000, damage: 61000, reward: { scrap: 50000000000, singularidadCorruptaContenidaElite: 50, tejidoAbisalRetorcidoElite: 50, planosMK9: 6 }, type: 'mini-boss' },
          { enemyName: "Reptante de Pesadilla", health: 585000, shield: 292500, damage: 58500, reward: { scrap: 37000000000, singularidadCorruptaContenidaElite: 45 } },
          { enemyName: "Reptante de Pesadilla", health: 590000, shield: 295000, damage: 59000, reward: { scrap: 37500000000, singularidadCorruptaContenidaElite: 48 } },
          { enemyName: "Reptante de Pesadilla", health: 595000, shield: 297500, damage: 59500, reward: { scrap: 38000000000, tejidoAbisalRetorcidoElite: 45 } },
          { enemyName: "Reptante de Pesadilla", health: 600000, shield: 300000, damage: 60000, reward: { scrap: 38500000000, tejidoAbisalRetorcidoElite: 48 } },
          { enemyName: "Guardián del Desgarro", health: 640000, shield: 320000, damage: 64000, reward: { scrap: 60000000000, singularidadCorruptaContenidaElite: 60, tejidoAbisalRetorcidoElite: 60, planosMK9: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Santuario de la Ruina",
        description: "Altar mecano-orgánico donde el Culto realiza sus rituales. Las paredes están cubiertas por símbolos que sangran luz negra.",
        battles: [
          { enemyName: "Adepto de Ruina", health: 645000, shield: 322500, damage: 64500, reward: { scrap: 55000000000, tejidoAbisalRetorcidoElite: 50 } },
          { enemyName: "Adepto de Ruina", health: 650000, shield: 325000, damage: 65000, reward: { scrap: 55500000000, tejidoAbisalRetorcidoElite: 52 } },
          { enemyName: "Adepto de Ruina", health: 655000, shield: 327500, damage: 65500, reward: { scrap: 56000000000, singularidadCorruptaContenidaElite: 55 } },
          { enemyName: "Adepto de Ruina", health: 660000, shield: 330000, damage: 66000, reward: { scrap: 56500000000, singularidadCorruptaContenidaElite: 58 } },
          { enemyName: "Desolador Ritual", health: 690000, shield: 345000, damage: 69000, reward: { scrap: 80000000000, tejidoAbisalRetorcidoElite: 70, singularidadCorruptaContenidaElite: 70, planosMK9: 8 }, type: 'mini-boss' },
          { enemyName: "Sombra Flagelante", health: 665000, shield: 332500, damage: 66500, reward: { scrap: 57000000000, tejidoAbisalRetorcidoElite: 60 } },
          { enemyName: "Sombra Flagelante", health: 670000, shield: 335000, damage: 67000, reward: { scrap: 57500000000, tejidoAbisalRetorcidoElite: 62 } },
          { enemyName: "Sombra Flagelante", health: 675000, shield: 337500, damage: 67500, reward: { scrap: 58000000000, singularidadCorruptaContenidaElite: 65 } },
          { enemyName: "Sombra Flagelante", health: 680000, shield: 340000, damage: 68000, reward: { scrap: 58500000000, singularidadCorruptaContenidaElite: 68 } },
          { enemyName: "Alto Sacerdote del Vacío", health: 720000, shield: 360000, damage: 72000, reward: { scrap: 100000000000, tejidoAbisalRetorcidoElite: 80, singularidadCorruptaContenidaElite: 80, planosMK9: 12 }, type: 'boss' },
        ]
      },
      {
        name: "Colmena Abisal “Xal-Horuun”",
        description: "La nave-capital del Culto del Abismo: una colmena viviente del tamaño de una luna, hecha de hueso, metal y oscuridad pura.Un núcleo energético corrupto late en su interior como un corazón demoníaco.La entidad líder del Culto mora aquí, conectada a cada nave y cada grito.",
        isBoss: true,
        battles: [
          { enemyName: "Señor del Abismo Vorgrath", health: 800000, shield: 400000, damage: 80000, reward: { scrap: 200000000000, singularidadCorruptaContenidaElite: 150, tejidoAbisalRetorcidoElite: 150, planosMK9: 25 }, type: 'boss' },
        ]
      }
    ]
  }
];