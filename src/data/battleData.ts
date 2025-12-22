export interface Battle {
  enemyName: string;
  assetFolder?: string;
  assetFilename?: string;
  health: number;
  shield: number;
  damage: number;
  reward: {
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
  blueprintCost: number; 
  researchPointsCost?: number; 
  statBonus: { 
    health: number;
    shield: number;
    damage: number;
  };
}

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
          { enemyName: "Desguazador Khelar", health: 100, shield: 25, damage: 15, reward: { aleacionReforzadaRobada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Desguazador Khelar", health: 110, shield: 30, damage: 16, reward: { aleacionReforzadaRobada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Desguazador Khelar", health: 125, shield: 50, damage: 20, reward: { aleacionReforzadaRobada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Desguazador Khelar", health: 140, shield: 55, damage: 22, reward: { aleacionReforzadaRobada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Triturador Óxido", health: 200, shield: 75, damage: 25, reward: { aleacionReforzadaRobada: 2, neuroChipCorrupto: 1, blueprints: 1 }, type: 'mini-boss' },
          { enemyName: "Recolector Errante", health: 160, shield: 60, damage: 24, reward: { aleacionReforzadaRobada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Recolector Errante", health: 180, shield: 70, damage: 26, reward: { aleacionReforzadaRobada: 2, neuroChipCorrupto: 1 } },
          { enemyName: "Recolector Errante", health: 220, shield: 100, damage: 28, reward: { aleacionReforzadaRobada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Recolector Errante", health: 250, shield: 120, damage: 30, reward: { aleacionReforzadaRobada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Capataz Chatarra", health: 400, shield: 150, damage: 40, reward: { aleacionReforzadaRobada: 5, neuroChipCorrupto: 2, blueprints: 5 }, type: 'boss' },
        ],
      },
      {
        name: "Ancla Roja",
        description: "Asteroide hueco convertido en refugio pirata. Talleres clandestinos, torretas robadas y pilotos veteranos.",
        battles: [
          { enemyName: "Vigilante Carmesí", health: 150, shield: 50, damage: 25, reward: { aleacionReforzadaRobada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Vigilante Carmesí", health: 165, shield: 55, damage: 27, reward: { aleacionReforzadaRobada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Vigilante Carmesí", health: 200, shield: 100, damage: 30, reward: { aleacionReforzadaRobada: 3, neuroChipCorrupto: 0 } },
          { enemyName: "Vigilante Carmesí", health: 220, shield: 110, damage: 32, reward: { aleacionReforzadaRobada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Martillo Rojo", health: 300, shield: 75, damage: 35, reward: { aleacionReforzadaRobada: 3, neuroChipCorrupto: 1, blueprints: 2 }, type: 'mini-boss' },
          { enemyName: "Garfio del Vacío", health: 260, shield: 80, damage: 34, reward: { aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Garfio del Vacío", health: 280, shield: 90, damage: 36, reward: { aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Garfio del Vacío", health: 350, shield: 150, damage: 38, reward: { aleacionReforzadaRobada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Garfio del Vacío", health: 380, shield: 170, damage: 40, reward: { aleacionReforzadaRobada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Contramaestre Sangrefría", health: 550, shield: 200, damage: 50, reward: { aleacionReforzadaRobada: 8, neuroChipCorrupto: 3, blueprints: 6 }, type: 'boss' },
        ],
      },
      {
        name: "Nebulosa del Rumor Azul",
        description: "Una nebulosa densa que distorsiona todos los sensores. Los piratas usan la niebla para emboscadas precisas.",
        battles: [
          { enemyName: "Sombra Azul", health: 250, shield: 100, damage: 30, reward: { aleacionReforzadaRobada: 3, neuroChipCorrupto: 0 } },
          { enemyName: "Sombra Azul", health: 275, shield: 110, damage: 33, reward: { aleacionReforzadaRobada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Sombra Azul", health: 300, shield: 125, damage: 40, reward: { aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Sombra Azul", health: 330, shield: 135, damage: 42, reward: { aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Acechador Nebular", health: 500, shield: 150, damage: 45, reward: { aleacionReforzadaRobada: 5, neuroChipCorrupto: 2, blueprints: 3 }, type: 'mini-boss' },
          { enemyName: "Espectro Turquesa", health: 380, shield: 160, damage: 44, reward: { aleacionReforzadaRobada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Espectro Turquesa", health: 410, shield: 175, damage: 46, reward: { aleacionReforzadaRobada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Espectro Turquesa", health: 480, shield: 200, damage: 48, reward: { aleacionReforzadaRobada: 7, neuroChipCorrupto: 3 } },
          { enemyName: "Espectro Turquesa", health: 520, shield: 220, damage: 50, reward: { aleacionReforzadaRobada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Capitán Brumahelada", health: 700, shield: 300, damage: 60, reward: { aleacionReforzadaRobada: 10, neuroChipCorrupto: 5, blueprints: 7 }, type: 'boss' },
        ],
      },
      {
        name: "Dominio Grifo",
        description: "Restos orbitales de una antigua colonia minera. El Clan Grifo domina con tácticas directas y drones reciclados.",
        battles: [
          { enemyName: "Ala Grifo", health: 350, shield: 150, damage: 45, reward: { aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Ala Grifo", health: 380, shield: 165, damage: 47, reward: { aleacionReforzadaRobada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Ala Grifo", health: 500, shield: 200, damage: 50, reward: { aleacionReforzadaRobada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Ala Grifo", health: 540, shield: 220, damage: 52, reward: { aleacionReforzadaRobada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Heraldo del Grifo", health: 700, shield: 250, damage: 60, reward: { aleacionReforzadaRobada: 8, neuroChipCorrupto: 3, blueprints: 4 }, type: 'mini-boss' },
          { enemyName: "Talón Férreo", health: 600, shield: 250, damage: 55, reward: { aleacionReforzadaRobada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Talón Férreo", health: 650, shield: 275, damage: 58, reward: { aleacionReforzadaRobada: 7, neuroChipCorrupto: 3 } },
          { enemyName: "Talón Férreo", health: 750, shield: 300, damage: 62, reward: { aleacionReforzadaRobada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Talón Férreo", health: 800, shield: 330, damage: 65, reward: { aleacionReforzadaRobada: 9, neuroChipCorrupto: 4 } },
          { enemyName: "Jefe Picoteador", health: 950, shield: 400, damage: 75, reward: { aleacionReforzadaRobada: 12, neuroChipCorrupto: 6, blueprints: 8 }, type: 'boss' },
        ],
      },
      {
        name: "Fortaleza Garra Negra",
        description: "Una fortaleza espacial móvil, núcleo defensivo de la Hermandad. Cargada de torretas, cazas y escudos improvisados.",
        battles: [
          { enemyName: "Ronda Negra", health: 450, shield: 150, damage: 40, reward: { aleacionReforzadaRobada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Ronda Negra", health: 480, shield: 160, damage: 42, reward: { aleacionReforzadaRobada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Ronda Negra", health: 550, shield: 200, damage: 45, reward: { aleacionReforzadaRobada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Ronda Negra", health: 590, shield: 220, damage: 48, reward: { aleacionReforzadaRobada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Azote del Vacío", health: 650, shield: 250, damage: 50, reward: { aleacionReforzadaRobada: 10, neuroChipCorrupto: 5, blueprints: 5 }, type: 'mini-boss' },
          { enemyName: "Saqueador Élite", health: 620, shield: 240, damage: 52, reward: { aleacionReforzadaRobada: 9, neuroChipCorrupto: 4 } },
          { enemyName: "Saqueador Élite", health: 670, shield: 260, damage: 54, reward: { aleacionReforzadaRobada: 10, neuroChipCorrupto: 4 } },
          { enemyName: "Saqueador Élite", health: 720, shield: 280, damage: 56, reward: { aleacionReforzadaRobada: 11, neuroChipCorrupto: 5 } },
          { enemyName: "Saqueador Élite", health: 770, shield: 300, damage: 58, reward: { aleacionReforzadaRobada: 12, neuroChipCorrupto: 5 } },
          { enemyName: "Capitán Atronador", health: 1100, shield: 450, damage: 70, reward: { aleacionReforzadaRobada: 15, neuroChipCorrupto: 8, blueprints: 10 }, type: 'boss' },
        ],
      },
      {
        name: "Señor Kraag",
        description: "El caudillo de la Hermandad del Vacío y pirata más temido del sector. Su fragata ha sobrevivido a más batallas de las que se registran oficialmente.",
        isBoss: true,
        battles: [
          { enemyName: "Fragata Skullbreaker", health: 2500, shield: 800, damage: 100, reward: { aleacionReforzadaRobada: 50, neuroChipCorrupto: 25, blueprints: 25, matrizQuitinaCristal: 10 }, type: 'boss' },
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
          { enemyName: "Zángano Espina", health: 600, shield: 200, damage: 45, reward: { aleacionReforzadaRobada: 10 } },
          { enemyName: "Zángano Espina", health: 650, shield: 220, damage: 48, reward: { aleacionReforzadaRobada: 11 } },
          { enemyName: "Zángano Espina", health: 750, shield: 250, damage: 55, reward: { aleacionReforzadaRobada: 12 } },
          { enemyName: "Zángano Espina", health: 800, shield: 270, damage: 58, reward: { aleacionReforzadaRobada: 13 } },
          { enemyName: "Larva Guardiana", health: 900, shield: 300, damage: 65, reward: { aleacionReforzadaRobada: 15, nucleoSinapticoFracturado: 1, blueprints: 10 }, type: 'mini-boss' },
          { enemyName: "Polinizador Letal", health: 850, shield: 280, damage: 60, reward: { aleacionReforzadaRobada: 14 } },
          { enemyName: "Polinizador Letal", health: 880, shield: 290, damage: 62, reward: { aleacionReforzadaRobada: 14, nucleoSinapticoFracturado: 1 } },
          { enemyName: "Polinizador Letal", health: 950, shield: 320, damage: 68, reward: { aleacionReforzadaRobada: 16 } },
          { enemyName: "Polinizador Letal", health: 1000, shield: 340, damage: 70, reward: { aleacionReforzadaRobada: 17, nucleoSinapticoFracturado: 1 } },
          { enemyName: "Reina Menor Espina Roja", health: 1500, shield: 500, damage: 85, reward: { aleacionReforzadaRobada: 25, nucleoSinapticoFracturado: 3, blueprints: 15 }, type: 'boss' },
        ],
      },
      {
        name: "Barranco Bioluminiscente “Hueco Ámbar”",
        description: "Un campo de asteroides convertidos en criaderos conectados por tubos orgánicos. La bioluminiscencia ámbar disimula el movimiento del enjambre.",
        battles: [
          { enemyName: "Cortador Ámbar", health: 800, shield: 300, damage: 60, reward: { matrizQuitinaCristal: 5 } },
          { enemyName: "Cortador Ámbar", health: 850, shield: 320, damage: 63, reward: { matrizQuitinaCristal: 5 } },
          { enemyName: "Cortador Ámbar", health: 1000, shield: 400, damage: 70, reward: { matrizQuitinaCristal: 7 } },
          { enemyName: "Cortador Ámbar", health: 1050, shield: 420, damage: 73, reward: { matrizQuitinaCristal: 8 } },
          { enemyName: "Centinela Resinario", health: 1250, shield: 500, damage: 80, reward: { matrizQuitinaCristal: 10, nucleoSinapticoFracturado: 3, blueprints: 12 }, type: 'mini-boss' },
          { enemyName: "Acechador Filamento", health: 1100, shield: 450, damage: 75, reward: { matrizQuitinaCristal: 9 } },
          { enemyName: "Acechador Filamento", health: 1150, shield: 470, damage: 78, reward: { matrizQuitinaCristal: 9, nucleoSinapticoFracturado: 1 } },
          { enemyName: "Acechador Filamento", health: 1200, shield: 480, damage: 82, reward: { matrizQuitinaCristal: 11 } },
          { enemyName: "Acechador Filamento", health: 1280, shield: 510, damage: 85, reward: { matrizQuitinaCristal: 12, nucleoSinapticoFracturado: 2 } },
          { enemyName: "Soberana de Resina", health: 1800, shield: 700, damage: 100, reward: { matrizQuitinaCristal: 20, nucleoSinapticoFracturado: 5, blueprints: 20 }, type: 'boss' },
        ],
      },
      {
        name: "Nebulosa “Velo Melífero”",
        description: "Una nebulosa cargada de partículas dulces que los Carminis usan para nutrir sus naves. Todo aquí es pegajoso, denso y lleno de formas vivas.",
        battles: [
          { enemyName: "Recolector Néctar", health: 1100, shield: 500, damage: 75, reward: { matrizQuitinaCristal: 12 } },
          { enemyName: "Recolector Néctar", health: 1180, shield: 530, damage: 78, reward: { matrizQuitinaCristal: 13 } },
          { enemyName: "Recolector Néctar", health: 1300, shield: 600, damage: 85, reward: { matrizQuitinaCristal: 15, planosMK2: 1 } },
          { enemyName: "Recolector Néctar", health: 1380, shield: 630, damage: 88, reward: { matrizQuitinaCristal: 16, planosMK2: 1 } },
          { enemyName: "Emisor de Feromonas", health: 1500, shield: 700, damage: 95, reward: { matrizQuitinaCristal: 20, nucleoSinapticoFracturado: 5, planosMK2: 2, blueprints: 15 }, type: 'mini-boss' },
          { enemyName: "Ala Melífera", health: 1420, shield: 650, damage: 90, reward: { matrizQuitinaCristal: 17, planosMK2: 1 } },
          { enemyName: "Ala Melífera", health: 1480, shield: 680, damage: 93, reward: { matrizQuitinaCristal: 18, nucleoSinapticoFracturado: 2, planosMK2: 1 } },
          { enemyName: "Ala Melífera", health: 1550, shield: 720, damage: 98, reward: { matrizQuitinaCristal: 22, nucleoSinapticoFracturado: 3, planosMK2: 2 } },
          { enemyName: "Ala Melífera", health: 1620, shield: 750, damage: 102, reward: { matrizQuitinaCristal: 24, nucleoSinapticoFracturado: 4, planosMK2: 2 } },
          { enemyName: "Dama del Velo Dulce", health: 2200, shield: 1000, damage: 120, reward: { matrizQuitinaCristal: 40, nucleoSinapticoFracturado: 10, planosMK2: 5, blueprints: 25 }, type: 'boss' },
        ],
      },
      {
        name: "Túneles del Caparazón “Cripta Quitina”",
        description: "Una antigua estación espacial ha sido absorbida y convertida en una colmena orgánica. La estructura está cubierta de placas de quitina.",
        battles: [
          { enemyName: "Quitinoide Raso", health: 1400, shield: 700, damage: 90, reward: { matrizQuitinaCristal: 25, planosMK2: 1 } },
          { enemyName: "Quitinoide Raso", health: 1490, shield: 750, damage: 94, reward: { matrizQuitinaCristal: 26, planosMK2: 1 } },
          { enemyName: "Quitinoide Raso", health: 1700, shield: 850, damage: 105, reward: { matrizQuitinaCristal: 30, planosMK2: 2 } },
          { enemyName: "Quitinoide Raso", health: 1800, shield: 900, damage: 110, reward: { matrizQuitinaCristal: 32, planosMK2: 2, nucleoSinapticoFracturado: 5 } },
          { enemyName: "Destructor Mandíbula", health: 2000, shield: 1000, damage: 120, reward: { matrizQuitinaCristal: 40, nucleoSinapticoFracturado: 10, planosMK2: 4, blueprints: 20 }, type: 'mini-boss' },
          { enemyName: "Ala Serrada", health: 1850, shield: 930, damage: 112, reward: { matrizQuitinaCristal: 35, planosMK2: 3 } },
          { enemyName: "Ala Serrada", health: 1920, shield: 960, damage: 115, reward: { matrizQuitinaCristal: 37, nucleoSinapticoFracturado: 8, planosMK2: 3 } },
          { enemyName: "Ala Serrada", health: 2100, shield: 1050, damage: 125, reward: { matrizQuitinaCristal: 42, nucleoSinapticoFracturado: 12, planosMK2: 4 } },
          { enemyName: "Ala Serrada", health: 2200, shield: 1100, damage: 130, reward: { matrizQuitinaCristal: 45, nucleoSinapticoFracturado: 14, planosMK2: 4 } },
          { enemyName: "Señora Mandibular", health: 3000, shield: 1500, damage: 150, reward: { matrizQuitinaCristal: 60, nucleoSinapticoFracturado: 20, planosMK2: 8, blueprints: 30 }, type: 'boss' },
        ],
      },
      {
        name: "Corazón del Enjambre “Púlsar Carmesí”",
        description: "Aquí late la colmena principal. Naves enormes, biotecnología compleja y un flujo constante de criaturas naciendo y muriendo en ciclos de minutos.",
        battles: [
          { enemyName: "Guardián Carmesí", health: 1800, shield: 900, damage: 110, reward: { matrizQuitinaCristal: 50, planosMK2: 2 } },
          { enemyName: "Guardián Carmesí", health: 1900, shield: 950, damage: 115, reward: { matrizQuitinaCristal: 52, planosMK2: 2 } },
          { enemyName: "Guardián Carmesí", health: 2200, shield: 1100, damage: 125, reward: { matrizQuitinaCristal: 60, planosMK2: 3 } },
          { enemyName: "Guardián Carmesí", health: 2350, shield: 1150, damage: 130, reward: { matrizQuitinaCristal: 65, nucleoSinapticoFracturado: 10, planosMK2: 3 } },
          { enemyName: "Esporo Alfa", health: 2600, shield: 1300, damage: 140, reward: { matrizQuitinaCristal: 75, nucleoSinapticoFracturado: 15, planosMK2: 6, blueprints: 25 }, type: 'mini-boss' },
          { enemyName: "Irradiado del Enjambre", health: 2400, shield: 1200, damage: 132, reward: { matrizQuitinaCristal: 68, planosMK2: 4 } },
          { enemyName: "Irradiado del Enjambre", health: 2500, shield: 1250, damage: 135, reward: { matrizQuitinaCristal: 70, nucleoSinapticoFracturado: 12, planosMK2: 5 } },
          { enemyName: "Irradiado del Enjambre", health: 2700, shield: 1350, damage: 142, reward: { matrizQuitinaCristal: 80, nucleoSinapticoFracturado: 18, planosMK2: 6 } },
          { enemyName: "Irradiado del Enjambre", health: 2850, shield: 1400, damage: 148, reward: { matrizQuitinaCristal: 85, nucleoSinapticoFracturado: 20, planosMK2: 7 } },
          { enemyName: "Matriarca Sangrecolmena", health: 3800, shield: 1800, damage: 170, reward: { matrizQuitinaCristal: 100, nucleoSinapticoFracturado: 30, planosMK2: 12, blueprints: 40 }, type: 'boss' },
        ],
      },
      {
        name: "“La Emperatriz Carminis”",
        description: "La reina suprema del enjambre en este sector. Una nave viva del tamaño de un crucero, protegida por placas de quitina cristalizada y un núcleo bioenergético capaz de lanzar descargas masivas.Si la Emperatriz cae, el enjambre entra en caos.",
        isBoss: true,
        battles: [
          { enemyName: "Emperatriz Carminis", health: 7000, shield: 3000, damage: 220, reward: { matrizQuitinaCristal: 250, nucleoSinapticoFracturado: 50, planosMK2: 15, blueprints: 100 }, type: 'boss' },
        ],
      },
    ]
  },
  {
    name: "CAPÍTULO 3 — “Legión Ilex”",
    lore: "La Legión Ilex es una compañía militar privada que opera fuera de toda jurisdicción. Sus naves no muestran matrículas, sus pilotos no responden llamadas, y sus contratos incluyen ‘neutralización preventiva’ de cualquier objetivo que pueda comprometer sus intereses.Aunque oficialmente dicen ofrecer ‘seguridad corporativa’, en realidad actúan como un ejército mercenario al servicio del mejor postor.Has entrado en territorio contratado —y ellos no negocian con intrusos.",
    destinations: [
      {
        name: "Perímetro Gris",
        description: "Zona de contención exterior. Patrullas ligeras con camuflaje gris polar mantienen un bloqueo frío y sistemático.",
        battles: [
          { enemyName: "Patrulla Gris", health: 5300, shield: 2650, damage: 530, reward: { moduloManiobrasTácticas: 5 } },
          { enemyName: "Patrulla Gris", health: 5400, shield: 2700, damage: 535, reward: { moduloManiobrasTácticas: 6 } },
          { enemyName: "Patrulla Gris", health: 5500, shield: 2750, damage: 540, reward: { placasCamuflajeActivo: 3 } },
          { enemyName: "Patrulla Gris", health: 5600, shield: 2800, damage: 545, reward: { placasCamuflajeActivo: 4 } },
          { enemyName: "Blindado Scout", health: 6500, shield: 3250, damage: 600, reward: { moduloManiobrasTácticas: 10, placasCamuflajeActivo: 5, planosDeInterceptor: 1 }, type: 'mini-boss' },
          { enemyName: "Recluta Armado", health: 5800, shield: 2900, damage: 560, reward: { moduloManiobrasTácticas: 7 } },
          { enemyName: "Recluta Armado", health: 5900, shield: 2950, damage: 565, reward: { placasCamuflajeActivo: 5 } },
          { enemyName: "Recluta Armado", health: 6000, shield: 3000, damage: 570, reward: { moduloManiobrasTácticas: 8, placasCamuflajeActivo: 2 } },
          { enemyName: "Recluta Armado", health: 6100, shield: 3050, damage: 575, reward: { moduloManiobrasTácticas: 9, placasCamuflajeActivo: 3 } },
          { enemyName: "Teniente Centinela", health: 7500, shield: 3750, damage: 650, reward: { moduloManiobrasTácticas: 15, placasCamuflajeActivo: 10, planosDeInterceptor: 3 }, type: 'boss' },
        ],
      },
      {
        name: "Corredor de Interdicción",
        description: "Un corredor de tránsito militarizado, lleno de balizas inhibidoras y radares inteligentes. Nadie pasa sin ser registrado… o destruido.",
        battles: [
          { enemyName: "Interdictor Delta", health: 7600, shield: 3800, damage: 660, reward: { moduloManiobrasTácticas: 10 } },
          { enemyName: "Interdictor Delta", health: 7700, shield: 3850, damage: 670, reward: { moduloManiobrasTácticas: 11 } },
          { enemyName: "Interdictor Delta", health: 7800, shield: 3900, damage: 680, reward: { placasCamuflajeActivo: 6 } },
          { enemyName: "Interdictor Delta", health: 7900, shield: 3950, damage: 690, reward: { placasCamuflajeActivo: 7 } },
          { enemyName: "Operador Jammer", health: 9000, shield: 4500, damage: 800, reward: { moduloManiobrasTácticas: 15, placasCamuflajeActivo: 10, planosDeInterceptor: 2 }, type: 'mini-boss' },
          { enemyName: "Asaltante Táctico", health: 8200, shield: 4100, damage: 710, reward: { moduloManiobrasTácticas: 12 } },
          { enemyName: "Asaltante Táctico", health: 8300, shield: 4150, damage: 720, reward: { placasCamuflajeActivo: 8 } },
          { enemyName: "Asaltante Táctico", health: 8400, shield: 4200, damage: 730, reward: { moduloManiobrasTácticas: 13, placasCamuflajeActivo: 5 } },
          { enemyName: "Asaltante Táctico", health: 8500, shield: 4250, damage: 740, reward: { moduloManiobrasTácticas: 14, placasCamuflajeActivo: 6 } },
          { enemyName: "Capitán Vector", health: 9800, shield: 4900, damage: 900, reward: { moduloManiobrasTácticas: 20, placasCamuflajeActivo: 15, planosDeInterceptor: 4 }, type: 'boss' },
        ],
      },
      {
        name: "Base Móvil “Ilex-03”",
        description: "Una megaestructura modular que sirve de cuartel itinerante. Talleres móviles, hangares plegables y lanzaderas de combate salen sin pausa.",
        battles: [
          { enemyName: "Mecaguarida", health: 9900, shield: 4950, damage: 910, reward: { moduloManiobrasTácticas: 15 } },
          { enemyName: "Mecaguarida", health: 10000, shield: 5000, damage: 920, reward: { moduloManiobrasTácticas: 16 } },
          { enemyName: "Mecaguarida", health: 10100, shield: 5050, damage: 930, reward: { placasCamuflajeActivo: 10 } },
          { enemyName: "Mecaguarida", health: 10200, shield: 5100, damage: 940, reward: { placasCamuflajeActivo: 11 } },
          { enemyName: "Supervisor de Hangar", health: 11500, shield: 5750, damage: 1050, reward: { moduloManiobrasTácticas: 20, placasCamuflajeActivo: 15, planosDeInterceptor: 3 }, type: 'mini-boss' },
          { enemyName: "Técnico de Choque", health: 10500, shield: 5250, damage: 960, reward: { moduloManiobrasTácticas: 17 } },
          { enemyName: "Técnico de Choque", health: 10600, shield: 5300, damage: 970, reward: { placasCamuflajeActivo: 12 } },
          { enemyName: "Técnico de Choque", health: 10700, shield: 5350, damage: 980, reward: { moduloManiobrasTácticas: 18, placasCamuflajeActivo: 8 } },
          { enemyName: "Técnico de Choque", health: 10800, shield: 5400, damage: 990, reward: { moduloManiobrasTácticas: 19, placasCamuflajeActivo: 9 } },
          { enemyName: "Comandante Argón", health: 12100, shield: 6050, damage: 1150, reward: { moduloManiobrasTácticas: 25, placasCamuflajeActivo: 20, planosDeInterceptor: 5 }, type: 'boss' },
        ],
      },
      {
        name: "Zona Cráneo Verde",
        description: "Sector de entrenamiento avanzado. Aquí se realizan simulacros reales, usando munición de guerra y tácticas corporativas brutalmente eficientes.",
        battles: [
          { enemyName: "Cadete Esmeralda", health: 12200, shield: 6100, damage: 1160, reward: { moduloManiobrasTácticas: 20 } },
          { enemyName: "Cadete Esmeralda", health: 12300, shield: 6150, damage: 1170, reward: { moduloManiobrasTácticas: 21 } },
          { enemyName: "Cadete Esmeralda", health: 12400, shield: 6200, damage: 1180, reward: { placasCamuflajeActivo: 15 } },
          { enemyName: "Cadete Esmeralda", health: 12500, shield: 6250, damage: 1190, reward: { placasCamuflajeActivo: 16 } },
          { enemyName: "Instructor Sierra", health: 13500, shield: 6750, damage: 1300, reward: { moduloManiobrasTácticas: 25, placasCamuflajeActivo: 20, planosDeInterceptor: 4 }, type: 'mini-boss' },
          { enemyName: "Tirador Musgo", health: 12800, shield: 6400, damage: 1220, reward: { moduloManiobrasTácticas: 22 } },
          { enemyName: "Tirador Musgo", health: 12900, shield: 6450, damage: 1230, reward: { placasCamuflajeActivo: 17 } },
          { enemyName: "Tirador Musgo", health: 13000, shield: 6500, damage: 1240, reward: { moduloManiobrasTácticas: 23, placasCamuflajeActivo: 10 } },
          { enemyName: "Tirador Musgo", health: 13100, shield: 6550, damage: 1250, reward: { moduloManiobrasTácticas: 24, placasCamuflajeActivo: 11 } },
          { enemyName: "Mayor Coraza Verde", health: 14000, shield: 7000, damage: 1400, reward: { moduloManiobrasTácticas: 30, placasCamuflajeActivo: 25, planosDeInterceptor: 6 }, type: 'boss' },
        ],
      },
      {
        name: "Línea Férrea Cerberus",
        description: "La zona de contención interna final. Tres cinturones defensivos, torres automáticas y fragatas de escolta dan forma a una muralla móvil impenetrable.",
        battles: [
          { enemyName: "Vigía Cerberus", health: 14100, shield: 7050, damage: 1410, reward: { moduloManiobrasTácticas: 25, placasCamuflajeActivo: 15 } },
          { enemyName: "Vigía Cerberus", health: 14200, shield: 7100, damage: 1420, reward: { moduloManiobrasTácticas: 26, placasCamuflajeActivo: 16 } },
          { enemyName: "Vigía Cerberus", health: 14300, shield: 7150, damage: 1430, reward: { moduloManiobrasTácticas: 27, placasCamuflajeActivo: 17 } },
          { enemyName: "Vigía Cerberus", health: 14400, shield: 7200, damage: 1440, reward: { moduloManiobrasTácticas: 28, placasCamuflajeActivo: 18 } },
          { enemyName: "Unidad Cerberus-β", health: 15000, shield: 7500, damage: 1500, reward: { moduloManiobrasTácticas: 30, placasCamuflajeActivo: 25, planosDeInterceptor: 5 }, type: 'mini-boss' },
          { enemyName: "Operador Férreo", health: 14600, shield: 7300, damage: 1460, reward: { moduloManiobrasTácticas: 29, placasCamuflajeActivo: 19 } },
          { enemyName: "Operador Férreo", health: 14700, shield: 7350, damage: 1470, reward: { moduloManiobrasTácticas: 30, placasCamuflajeActivo: 20 } },
          { enemyName: "Operador Férreo", health: 14800, shield: 7400, damage: 1480, reward: { moduloManiobrasTácticas: 32, placasCamuflajeActivo: 22 } },
          { enemyName: "Operador Férreo", health: 14900, shield: 7450, damage: 1490, reward: { moduloManiobrasTácticas: 35, placasCamuflajeActivo: 24 } },
          { enemyName: "Coronel Muralla", health: 16000, shield: 8000, damage: 1600, reward: { moduloManiobrasTácticas: 50, placasCamuflajeActivo: 40, planosDeInterceptor: 10 }, type: 'boss' },
        ],
      },
      {
        name: "Bastión Regimental “Ilex Prime”",
        description: "El cuartel general flotante de la Legión Ilex. Un coloso blindado con camuflaje adaptativo, artillería orbital y un núcleo táctico que coordina toda la red mercenaria.Ninguna nave ha conseguido atravesar sus defensas… hasta ahora.",
        isBoss: true,
        battles: [
          { enemyName: "Destructor ‘Iron Howl’", health: 16000, shield: 8000, damage: 1600, reward: { moduloManiobrasTácticas: 50, placasCamuflajeActivo: 40, planosDeInterceptor: 10 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "CAPÍTULO 4 — ‘El Dominio Aureano’",
    lore: "Los Aureanos son una antigua civilización tecno-espiritual que canaliza energía pura mediante cristales resonantes. Sus naves no están construidas: están esculpidas en luz solidificada.Consideran su territorio sagrado y ven a cualquier intruso como una amenaza para el ‘Equilibrio Cósmico’.Tu entrada ha despertado a sus Custodios.",
    destinations: [
      {
        name: "Umbral Celeste",
        description: "Puertas de entrada al territorio aureano. Torres flotantes proyectan escudos de luz que examinan todo lo que cruza.",
        battles: [
          { enemyName: "Centinela Celeste", health: 15500, shield: 7750, damage: 1550, reward: { placasDeAetherium: 5 } },
          { enemyName: "Centinela Celeste", health: 15800, shield: 7900, damage: 1560, reward: { placasDeAetherium: 6 } },
          { enemyName: "Centinela Celeste", health: 16100, shield: 8050, damage: 1570, reward: { nucleoPsionicoArmonico: 3 } },
          { enemyName: "Centinela Celeste", health: 16400, shield: 8200, damage: 1580, reward: { nucleoPsionicoArmonico: 4 } },
          { enemyName: "Vigilante Prismático", health: 18000, shield: 9000, damage: 1700, reward: { placasDeAetherium: 10, nucleoPsionicoArmonico: 5, planosMK3: 1 }, type: 'mini-boss' },
          { enemyName: "Eco de Luz", health: 16800, shield: 8400, damage: 1610, reward: { placasDeAetherium: 7 } },
          { enemyName: "Eco de Luz", health: 17100, shield: 8550, damage: 1620, reward: { placasDeAetherium: 8 } },
          { enemyName: "Eco de Luz", health: 17400, shield: 8700, damage: 1630, reward: { nucleoPsionicoArmonico: 5 } },
          { enemyName: "Eco de Luz", health: 17700, shield: 8850, damage: 1640, reward: { nucleoPsionicoArmonico: 6 } },
          { enemyName: "Custodio Aural", health: 20000, shield: 10000, damage: 1800, reward: { placasDeAetherium: 15, nucleoPsionicoArmonico: 10, planosMK3: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Campos Resonantes",
        description: "Amplias llanuras de energía cristalizada donde los Aureanos entrenan a sus naves vivas. La energía vibra como un coro.",
        battles: [
          { enemyName: "Iniciado Resonante", health: 20500, shield: 10250, damage: 1850, reward: { nucleoPsionicoArmonico: 7 } },
          { enemyName: "Iniciado Resonante", health: 20800, shield: 10400, damage: 1860, reward: { nucleoPsionicoArmonico: 8 } },
          { enemyName: "Iniciado Resonante", health: 21100, shield: 10550, damage: 1870, reward: { placasDeAetherium: 8 } },
          { enemyName: "Iniciado Resonante", health: 21400, shield: 10700, damage: 1880, reward: { placasDeAetherium: 9 } },
          { enemyName: "Agravio Armónico", health: 23000, shield: 11500, damage: 2000, reward: { nucleoPsionicoArmonico: 12, placasDeAetherium: 12, planosMK3: 2 }, type: 'mini-boss' },
          { enemyName: "Disonancia Errante", health: 21800, shield: 10900, damage: 1910, reward: { nucleoPsionicoArmonico: 9 } },
          { enemyName: "Disonancia Errante", health: 22100, shield: 11050, damage: 1920, reward: { nucleoPsionicoArmonico: 10 } },
          { enemyName: "Disonancia Errante", health: 22400, shield: 11200, damage: 1930, reward: { placasDeAetherium: 10 } },
          { enemyName: "Disonancia Errante", health: 22700, shield: 11350, damage: 1940, reward: { placasDeAetherium: 11 } },
          { enemyName: "Maestro de la Resonancia", health: 25000, shield: 12500, damage: 2200, reward: { nucleoPsionicoArmonico: 20, placasDeAetherium: 20, planosMK3: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Sagrario de Aurora",
        description: "Un templo flotante donde los Aureanos canalizan la ‘Llama Interior’, una fuente energética consciente.",
        battles: [
          { enemyName: "Guardián de Aurora", health: 25500, shield: 12750, damage: 2250, reward: { nucleoPsionicoArmonico: 15 } },
          { enemyName: "Guardián de Aurora", health: 25800, shield: 12900, damage: 2260, reward: { nucleoPsionicoArmonico: 16 } },
          { enemyName: "Guardián de Aurora", health: 26100, shield: 13050, damage: 2270, reward: { placasDeAetherium: 15 } },
          { enemyName: "Guardián de Aurora", health: 26400, shield: 13200, damage: 2280, reward: { placasDeAetherium: 16 } },
          { enemyName: "Portador de la Llama", health: 28000, shield: 14000, damage: 2400, reward: { nucleoPsionicoArmonico: 20, placasDeAetherium: 20, planosMK3: 3 }, type: 'mini-boss' },
          { enemyName: "Chispa Ancestral", health: 26800, shield: 13400, damage: 2310, reward: { nucleoPsionicoArmonico: 18 } },
          { enemyName: "Chispa Ancestral", health: 27100, shield: 13550, damage: 2320, reward: { nucleoPsionicoArmonico: 19 } },
          { enemyName: "Chispa Ancestral", health: 27400, shield: 13700, damage: 2330, reward: { placasDeAetherium: 18 } },
          { enemyName: "Chispa Ancestral", health: 27700, shield: 13850, damage: 2340, reward: { placasDeAetherium: 19 } },
          { enemyName: "Orador Lumínico", health: 30000, shield: 15000, damage: 2600, reward: { nucleoPsionicoArmonico: 30, placasDeAetherium: 30, planosMK3: 6 }, type: 'boss' },
        ]
      },
      {
        name: "Bastión Dorado",
        description: "Nudos de defensa hechos con placas de luz endurecida. Cada estructura cambia de forma según la amenaza detectada.",
        battles: [
          { enemyName: "Arconte Dorado", health: 30500, shield: 15250, damage: 2650, reward: { placasDeAetherium: 20 } },
          { enemyName: "Arconte Dorado", health: 30800, shield: 15400, damage: 2660, reward: { placasDeAetherium: 22 } },
          { enemyName: "Arconte Dorado", health: 31100, shield: 15550, damage: 2670, reward: { nucleoPsionicoArmonico: 10 } },
          { enemyName: "Arconte Dorado", health: 31400, shield: 15700, damage: 2680, reward: { nucleoPsionicoArmonico: 11 } },
          { enemyName: "Escudo Viviente", health: 33000, shield: 16500, damage: 2800, reward: { placasDeAetherium: 30, nucleoPsionicoArmonico: 15, planosMK3: 4 }, type: 'mini-boss' },
          { enemyName: "Lanza Radiante", health: 31800, shield: 15900, damage: 2710, reward: { placasDeAetherium: 25 } },
          { enemyName: "Lanza Radiante", health: 32100, shield: 16050, damage: 2720, reward: { placasDeAetherium: 28 } },
          { enemyName: "Lanza Radiante", health: 32400, shield: 16200, damage: 2730, reward: { nucleoPsionicoArmonico: 12 } },
          { enemyName: "Lanza Radiante", health: 32700, shield: 16350, damage: 2740, reward: { nucleoPsionicoArmonico: 14 } },
          { enemyName: "Prelado Solemne", health: 35000, shield: 17500, damage: 3000, reward: { placasDeAetherium: 50, nucleoPsionicoArmonico: 25, planosMK3: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Horizonte Sacro",
        description: "Un anillo de plataformas levitantes que protege la capital aureana. Aquí la energía vibra como si tuviera voluntad propia.",
        battles: [
          { enemyName: "Aureano Sagrado", health: 35500, shield: 17750, damage: 3050, reward: { nucleoPsionicoArmonico: 15 } },
          { enemyName: "Aureano Sagrado", health: 35800, shield: 17900, damage: 3060, reward: { nucleoPsionicoArmonico: 16 } },
          { enemyName: "Aureano Sagrado", health: 36100, shield: 18050, damage: 3070, reward: { placasDeAetherium: 20 } },
          { enemyName: "Aureano Sagrado", health: 36400, shield: 18200, damage: 3080, reward: { placasDeAetherium: 22 } },
          { enemyName: "Disruptor del Horizonte", health: 38000, shield: 19000, damage: 3200, reward: { nucleoPsionicoArmonico: 25, placasDeAetherium: 25, planosMK3: 5 }, type: 'mini-boss' },
          { enemyName: "Rayo Custodio", health: 36800, shield: 18400, damage: 3110, reward: { nucleoPsionicoArmonico: 20 } },
          { enemyName: "Rayo Custodio", health: 37100, shield: 18550, damage: 3120, reward: { nucleoPsionicoArmonico: 22 } },
          { enemyName: "Rayo Custodio", health: 37400, shield: 18700, damage: 3130, reward: { placasDeAetherium: 28 } },
          { enemyName: "Rayo Custodio", health: 37700, shield: 18850, damage: 3140, reward: { placasDeAetherium: 30 } },
          { enemyName: "Sumo Guardián del Vórtice", health: 40000, shield: 20000, damage: 3400, reward: { nucleoPsionicoArmonico: 40, placasDeAetherium: 40, planosMK3: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Ciudad-Luz ‘Solarion Primus’",
        description: "La capital flotante de los Aureanos. Un mundo-nave formado por capas de luz cristalizada, guiado por la conciencia colectiva de toda su especie.Aqui reside la encarnacion suprema de su voluntad.",
        isBoss: true,
        battles: [
          { enemyName: "Arconte Supremo Seraphys", health: 45000, shield: 22500, damage: 3800, reward: { nucleoPsionicoArmonico: 100, placasDeAetherium: 100, planosMK3: 30 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "CAPÍTULO 5 — ‘El Culto del Abismo’",
    lore: "En los confines olvidados del espacio, una fuerza corrupta conocida como El Culto del Abismo devora sistemas enteros. Sus naves son amalgamas de metal retorcido, carne mutada y símbolos prohibidos que palpitan como si estuvieran vivos. Siguen a entidades extradimensionales llamadas Los Susurrantes, cuyas voces turban la mente de cualquier piloto que se acerque.\nLa corrupción avanza como una enfermedad, reescribiendo la materia… y la voluntad.",
    destinations: [
      {
        name: "Penumbra Sangrante",
        description: "Un corredor espacial impregnado de niebla rojiza. Estructuras flotantes, deformadas por la corrupción, laten como órganos gigantescos.",
        battles: [
          { enemyName: "Engendro Penumbrio", health: 32500, shield: 16250, damage: 3250, reward: { tejidoAbisalRetorcido: 5 } },
          { enemyName: "Engendro Penumbrio", health: 33000, shield: 16500, damage: 3300, reward: { tejidoAbisalRetorcido: 6 } },
          { enemyName: "Engendro Penumbrio", health: 33500, shield: 16750, damage: 3350, reward: { singularidadCorruptaContenida: 3 } },
          { enemyName: "Engendro Penumbrio", health: 34000, shield: 17000, damage: 3400, reward: { singularidadCorruptaContenida: 4 } },
          { enemyName: "Vástago Hemolítico", health: 37000, shield: 18500, damage: 3700, reward: { tejidoAbisalRetorcido: 10, singularidadCorruptaContenida: 5, planosMK4: 1 }, type: 'mini-boss' },
          { enemyName: "Deforme Sanguinas", health: 34500, shield: 17250, damage: 3450, reward: { tejidoAbisalRetorcido: 7 } },
          { enemyName: "Deforme Sanguinas", health: 35000, shield: 17500, damage: 3500, reward: { tejidoAbisalRetorcido: 8 } },
          { enemyName: "Deforme Sanguinas", health: 35500, shield: 17750, damage: 3550, reward: { singularidadCorruptaContenida: 5 } },
          { enemyName: "Deforme Sanguinas", health: 36000, shield: 18000, damage: 3600, reward: { singularidadCorruptaContenida: 6 } },
          { enemyName: "Heraldo Carmesí", health: 40000, shield: 20000, damage: 4000, reward: { tejidoAbisalRetorcido: 15, singularidadCorruptaContenida: 10, planosMK4: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Forja Profanada",
        description: "Una antigua estación industrial tomada por el Culto. Los hornos ahora funden metal y carne por igual, creando naves vivientes.",
        battles: [
          { enemyName: "Fragmento Profano", health: 40500, shield: 20250, damage: 4050, reward: { singularidadCorruptaContenida: 10 } },
          { enemyName: "Fragmento Profano", health: 41000, shield: 20500, damage: 4100, reward: { singularidadCorruptaContenida: 12 } },
          { enemyName: "Fragmento Profano", health: 41500, shield: 20750, damage: 4150, reward: { tejidoAbisalRetorcido: 10 } },
          { enemyName: "Fragmento Profano", health: 42000, shield: 21000, damage: 4200, reward: { tejidoAbisalRetorcido: 12 } },
          { enemyName: "Operario del Vacío", health: 45000, shield: 22500, damage: 4500, reward: { singularidadCorruptaContenida: 20, tejidoAbisalRetorcido: 15, planosMK4: 2 }, type: 'mini-boss' },
          { enemyName: "Masa Forjada", health: 42500, shield: 21250, damage: 4250, reward: { singularidadCorruptaContenida: 14 } },
          { enemyName: "Masa Forjada", health: 43000, shield: 21500, damage: 4300, reward: { singularidadCorruptaContenida: 16 } },
          { enemyName: "Masa Forjada", health: 43500, shield: 21750, damage: 4350, reward: { tejidoAbisalRetorcido: 14 } },
          { enemyName: "Masa Forjada", health: 44000, shield: 22000, damage: 4400, reward: { tejidoAbisalRetorcido: 16 } },
          { enemyName: "Artífice del Abismo", health: 48000, shield: 24000, damage: 4800, reward: { singularidadCorruptaContenida: 30, tejidoAbisalRetorcido: 25, planosMK4: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Madriguera del Susurro",
        description: "Zonas colapsadas donde ecos distorsionados repiten frases imposibles. Los Susurrantes habitan aquí… o quizás solo sus voces.",
        battles: [
          { enemyName: "Eco Torturado", health: 48500, shield: 24250, damage: 4850, reward: { tejidoAbisalRetorcido: 20 } },
          { enemyName: "Eco Torturado", health: 49000, shield: 24500, damage: 4900, reward: { tejidoAbisalRetorcido: 22 } },
          { enemyName: "Eco Torturado", health: 49500, shield: 24750, damage: 4950, reward: { singularidadCorruptaContenida: 25 } },
          { enemyName: "Eco Torturado", health: 50000, shield: 25000, damage: 5000, reward: { singularidadCorruptaContenida: 28 } },
          { enemyName: "Devoramente", health: 53000, shield: 26500, damage: 5300, reward: { tejidoAbisalRetorcido: 30, singularidadCorruptaContenida: 35, planosMK4: 4 }, type: 'mini-boss' },
          { enemyName: "Aullador del Silencio", health: 50500, shield: 25250, damage: 5050, reward: { tejidoAbisalRetorcido: 25 } },
          { enemyName: "Aullador del Silencio", health: 51000, shield: 25500, damage: 5100, reward: { tejidoAbisalRetorcido: 28 } },
          { enemyName: "Aullador del Silencio", health: 51500, shield: 25750, damage: 5150, reward: { singularidadCorruptaContenida: 30 } },
          { enemyName: "Aullador del Silencio", health: 52000, shield: 26000, damage: 5200, reward: { singularidadCorruptaContenida: 32 } },
          { enemyName: "Profeta de los Susurros", health: 56000, shield: 28000, damage: 5600, reward: { tejidoAbisalRetorcido: 40, singularidadCorruptaContenida: 40, planosMK4: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Desgarro Onírico",
        description: "Una grieta dimensional convertida en bastión. La realidad aquí es inconsistente: el espacio se dobla, vibra y se retuerce.",
        battles: [
          { enemyName: "Rastro Abismal", health: 56500, shield: 28250, damage: 5650, reward: { singularidadCorruptaContenida: 40 } },
          { enemyName: "Rastro Abismal", health: 57000, shield: 28500, damage: 5700, reward: { singularidadCorruptaContenida: 42 } },
          { enemyName: "Rastro Abismal", health: 57500, shield: 28750, damage: 5750, reward: { tejidoAbisalRetorcido: 40 } },
          { enemyName: "Rastro Abismal", health: 58000, shield: 29000, damage: 5800, reward: { tejidoAbisalRetorcido: 42 } },
          { enemyName: "Quimera Delirante", health: 61000, shield: 30500, damage: 6100, reward: { singularidadCorruptaContenida: 50, tejidoAbisalRetorcido: 50, planosMK4: 6 }, type: 'mini-boss' },
          { enemyName: "Reptante de Pesadilla", health: 58500, shield: 29250, damage: 5850, reward: { singularidadCorruptaContenida: 45 } },
          { enemyName: "Reptante de Pesadilla", health: 59000, shield: 29500, damage: 5900, reward: { singularidadCorruptaContenida: 48 } },
          { enemyName: "Reptante de Pesadilla", health: 59500, shield: 29750, damage: 5950, reward: { tejidoAbisalRetorcido: 45 } },
          { enemyName: "Reptante de Pesadilla", health: 60000, shield: 30000, damage: 6000, reward: { tejidoAbisalRetorcido: 48 } },
          { enemyName: "Guardián del Desgarro", health: 64000, shield: 32000, damage: 6400, reward: { singularidadCorruptaContenida: 60, tejidoAbisalRetorcido: 60, planosMK4: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Santuario de la Ruina",
        description: "Altar mecano-orgánico donde el Culto realiza sus rituales. Las paredes están cubiertas por símbolos que sangran luz negra.",
        battles: [
          { enemyName: "Adepto de Ruina", health: 64500, shield: 32250, damage: 6450, reward: { tejidoAbisalRetorcido: 50 } },
          { enemyName: "Adepto de Ruina", health: 65000, shield: 32500, damage: 6500, reward: { tejidoAbisalRetorcido: 52 } },
          { enemyName: "Adepto de Ruina", health: 65500, shield: 32750, damage: 6550, reward: { singularidadCorruptaContenida: 55 } },
          { enemyName: "Adepto de Ruina", health: 66000, shield: 33000, damage: 6600, reward: { singularidadCorruptaContenida: 58 } },
          { enemyName: "Desolador Ritual", health: 69000, shield: 34500, damage: 6900, reward: { tejidoAbisalRetorcido: 70, singularidadCorruptaContenida: 70, planosMK4: 8 }, type: 'mini-boss' },
          { enemyName: "Sombra Flagelante", health: 66500, shield: 33250, damage: 6650, reward: { tejidoAbisalRetorcido: 60 } },
          { enemyName: "Sombra Flagelante", health: 67000, shield: 33500, damage: 6700, reward: { tejidoAbisalRetorcido: 62 } },
          { enemyName: "Sombra Flagelante", health: 67500, shield: 33750, damage: 6750, reward: { singularidadCorruptaContenida: 65 } },
          { enemyName: "Sombra Flagelante", health: 68000, shield: 34000, damage: 6800, reward: { singularidadCorruptaContenida: 68 } },
          { enemyName: "Alto Sacerdote del Vacío", health: 72000, shield: 36000, damage: 7200, reward: { tejidoAbisalRetorcido: 80, singularidadCorruptaContenida: 80, planosMK4: 12 }, type: 'boss' },
        ]
      },
      {
        name: "Colmena Abisal ‘Xal-Horuun’",
        description: "La nave-capital del Culto del Abismo: una colmena viviente del tamaño de una luna, hecha de hueso, metal y oscuridad pura.Un núcleo energético corrupto late en su interior como un corazón demoníaco.La entidad líder del Culto mora aquí, conectada a cada nave y cada grito.",
        isBoss: true,
        battles: [
          { enemyName: "Señor del Abismo Vorgrath", health: 80000, shield: 40000, damage: 8000, reward: { singularidadCorruptaContenida: 150, tejidoAbisalRetorcido: 150, planosMK4: 25 }, type: 'boss' },
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
            { enemyName: "Desguazador Khelar", health: 57000, shield: 21500, damage: 7800, reward: { aleacionReforzadaElite: 5 } },
            { enemyName: "Desguazador Khelar", health: 58000, shield: 22000, damage: 7900, reward: { aleacionReforzadaElite: 6 } },
            { enemyName: "Desguazador Khelar", health: 59000, shield: 22500, damage: 8000, reward: { neuroChipCorruptoElite: 3 } },
            { enemyName: "Desguazador Khelar", health: 60000, shield: 23000, damage: 8100, reward: { neuroChipCorruptoElite: 4 } },
            { enemyName: "Triturador Óxido", health: 65000, shield: 25000, damage: 8500, reward: { aleacionReforzadaElite: 10, neuroChipCorruptoElite: 5, planosMK5: 1 }, type: 'mini-boss' },
            { enemyName: "Recolector Errante", health: 61000, shield: 23500, damage: 8200, reward: { aleacionReforzadaElite: 7 } },
            { enemyName: "Recolector Errante", health: 62000, shield: 24000, damage: 8300, reward: { aleacionReforzadaElite: 8 } },
            { enemyName: "Recolector Errante", health: 63000, shield: 24500, damage: 8400, reward: { neuroChipCorruptoElite: 5 } },
            { enemyName: "Recolector Errante", health: 64000, shield: 24800, damage: 8450, reward: { neuroChipCorruptoElite: 6 } },
            { enemyName: "Capataz Chatarra", health: 70000, shield: 28000, damage: 9000, reward: { aleacionReforzadaElite: 15, neuroChipCorruptoElite: 10, planosMK5: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Ancla Roja",
        description: "Asteroide hueco convertido en refugio pirata. Talleres clandestinos, torretas robadas y pilotos veteranos.",
        battles: [
            { enemyName: "Vigilante Carmesí", health: 71000, shield: 28500, damage: 9100, reward: { neuroChipCorruptoElite: 12 } },
            { enemyName: "Vigilante Carmesí", health: 72000, shield: 29000, damage: 9200, reward: { neuroChipCorruptoElite: 14 } },
            { enemyName: "Vigilante Carmesí", health: 73000, shield: 29500, damage: 9300, reward: { aleacionReforzadaElite: 18 } },
            { enemyName: "Vigilante Carmesí", health: 74000, shield: 30000, damage: 9400, reward: { aleacionReforzadaElite: 20 } },
            { enemyName: "Martillo Rojo", health: 80000, shield: 32000, damage: 9800, reward: { neuroChipCorruptoElite: 20, aleacionReforzadaElite: 25, planosMK5: 2 }, type: 'mini-boss' },
            { enemyName: "Garfio del Vacío", health: 75000, shield: 30500, damage: 9500, reward: { neuroChipCorruptoElite: 16 } },
            { enemyName: "Garfio del Vacío", health: 76000, shield: 31000, damage: 9600, reward: { neuroChipCorruptoElite: 18 } },
            { enemyName: "Garfio del Vacío", health: 77000, shield: 31500, damage: 9700, reward: { aleacionReforzadaElite: 22 } },
            { enemyName: "Garfio del Vacío", health: 78000, shield: 31800, damage: 9750, reward: { aleacionReforzadaElite: 24 } },
            { enemyName: "Contramaestre Sangrefría", health: 85000, shield: 35000, damage: 10500, reward: { neuroChipCorruptoElite: 30, aleacionReforzadaElite: 30, planosMK5: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Nebulosa del Rumor Azul",
        description: "Una nebulosa densa que distorsiona todos los sensores. Los piratas usan la niebla para emboscadas precisas.",
        battles: [
            { enemyName: "Sombra Azul", health: 86000, shield: 35500, damage: 10600, reward: { aleacionReforzadaElite: 30 } },
            { enemyName: "Sombra Azul", health: 87000, shield: 36000, damage: 10700, reward: { aleacionReforzadaElite: 32 } },
            { enemyName: "Sombra Azul", health: 88000, shield: 36500, damage: 10800, reward: { neuroChipCorruptoElite: 25 } },
            { enemyName: "Sombra Azul", health: 89000, shield: 37000, damage: 10900, reward: { neuroChipCorruptoElite: 28 } },
            { enemyName: "Acechador Nebular", health: 95000, shield: 39000, damage: 11500, reward: { aleacionReforzadaElite: 40, neuroChipCorruptoElite: 35, planosMK5: 4 }, type: 'mini-boss' },
            { enemyName: "Espectro Turquesa", health: 90000, shield: 37500, damage: 11000, reward: { aleacionReforzadaElite: 35 } },
            { enemyName: "Espectro Turquesa", health: 91000, shield: 38000, damage: 11100, reward: { aleacionReforzadaElite: 38 } },
            { enemyName: "Espectro Turquesa", health: 92000, shield: 38500, damage: 11200, reward: { neuroChipCorruptoElite: 30 } },
            { enemyName: "Espectro Turquesa", health: 93000, shield: 38800, damage: 11300, reward: { neuroChipCorruptoElite: 32 } },
            { enemyName: "Capitán Brumahelada", health: 100000, shield: 42000, damage: 12000, reward: { aleacionReforzadaElite: 50, neuroChipCorruptoElite: 40, planosMK5: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Dominio Grifo",
        description: "Restos orbitales de una antigua colonia minera. El Clan Grifo domina con tácticas directas y drones reciclados.",
        battles: [
            { enemyName: "Ala Grifo", health: 101000, shield: 42500, damage: 12100, reward: { neuroChipCorruptoElite: 40 } },
            { enemyName: "Ala Grifo", health: 102000, shield: 43000, damage: 12200, reward: { neuroChipCorruptoElite: 42 } },
            { enemyName: "Ala Grifo", health: 103000, shield: 43500, damage: 12300, reward: { aleacionReforzadaElite: 50 } },
            { enemyName: "Ala Grifo", health: 104000, shield: 44000, damage: 12400, reward: { aleacionReforzadaElite: 52 } },
            { enemyName: "Heraldo del Grifo", health: 110000, shield: 46000, damage: 13000, reward: { neuroChipCorruptoElite: 50, aleacionReforzadaElite: 60, planosMK5: 6 }, type: 'mini-boss' },
            { enemyName: "Talón Férreo", health: 105000, shield: 44500, damage: 12500, reward: { neuroChipCorruptoElite: 45 } },
            { enemyName: "Talón Férreo", health: 106000, shield: 45000, damage: 12600, reward: { neuroChipCorruptoElite: 48 } },
            { enemyName: "Talón Férreo", health: 107000, shield: 45500, damage: 12700, reward: { aleacionReforzadaElite: 55 } },
            { enemyName: "Talón Férreo", health: 108000, shield: 45800, damage: 12800, reward: { neuroChipCorruptoElite: 58 } },
            { enemyName: "Jefe Picoteador", health: 115000, shield: 49000, damage: 13500, reward: { neuroChipCorruptoElite: 60, aleacionReforzadaElite: 70, planosMK5: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Fortaleza Garra Negra",
        description: "Una fortaleza espacial móvil, núcleo defensivo de la Hermandad. Cargada de torretas, cazas y escudos improvisados.",
        battles: [
            { enemyName: "Ronda Negra", health: 116000, shield: 49500, damage: 13600, reward: { aleacionReforzadaElite: 70 } },
            { enemyName: "Ronda Negra", health: 117000, shield: 50000, damage: 13700, reward: { aleacionReforzadaElite: 72 } },
            { enemyName: "Ronda Negra", health: 118000, shield: 50500, damage: 13800, reward: { neuroChipCorruptoElite: 60 } },
            { enemyName: "Ronda Negra", health: 119000, shield: 51000, damage: 13900, reward: { neuroChipCorruptoElite: 62 } },
            { enemyName: "Azote del Vacío", health: 125000, shield: 53000, damage: 14500, reward: { aleacionReforzadaElite: 80, neuroChipCorruptoElite: 70, planosMK5: 8 }, type: 'mini-boss' },
            { enemyName: "Saqueador Élite", health: 120000, shield: 51500, damage: 14000, reward: { aleacionReforzadaElite: 75 } },
            { enemyName: "Saqueador Élite", health: 121000, shield: 52000, damage: 14100, reward: { aleacionReforzadaElite: 78 } },
            { enemyName: "Saqueador Élite", health: 122000, shield: 52500, damage: 14200, reward: { neuroChipCorruptoElite: 65 } },
            { enemyName: "Saqueador Élite", health: 123000, shield: 52800, damage: 14300, reward: { neuroChipCorruptoElite: 68 } },
            { enemyName: "Capitán Atronador", health: 130000, shield: 56000, damage: 15000, reward: { aleacionReforzadaElite: 90, neuroChipCorruptoElite: 80, planosMK5: 12 }, type: 'boss' },
        ]
      },
      {
        name: "Señor Kraag",
        description: "El caudillo de la Hermandad del Vacío y pirata más temido del sector. Su fragata ha sobrevivido a más batallas de las que se registran oficialmente.",
        isBoss: true,
        battles: [
            { enemyName: "Fragata Skullbreaker", health: 145000, shield: 63000, damage: 17000, reward: { neuroChipCorruptoElite: 150, aleacionReforzadaElite: 150, planosMK5: 25 }, type: 'boss' },
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
            { enemyName: "Zángano Espina", health: 106000, shield: 45500, damage: 10200, reward: { matrizQuitinaCristalElite: 5 } },
            { enemyName: "Zángano Espina", health: 107000, shield: 46000, damage: 10300, reward: { matrizQuitinaCristalElite: 6 } },
            { enemyName: "Zángano Espina", health: 108000, shield: 46500, damage: 10400, reward: { nucleoSinapticoFracturadoElite: 3 } },
            { enemyName: "Zángano Espina", health: 109000, shield: 47000, damage: 10500, reward: { nucleoSinapticoFracturadoElite: 4 } },
            { enemyName: "Larva Guardiana", health: 115000, shield: 50000, damage: 11000, reward: { matrizQuitinaCristalElite: 10, nucleoSinapticoFracturadoElite: 5, planosMK6: 1 }, type: 'mini-boss' },
            { enemyName: "Polinizador Letal", health: 110000, shield: 47500, damage: 10600, reward: { matrizQuitinaCristalElite: 7 } },
            { enemyName: "Polinizador Letal", health: 111000, shield: 48000, damage: 10700, reward: { matrizQuitinaCristalElite: 8 } },
            { enemyName: "Polinizador Letal", health: 112000, shield: 48500, damage: 10800, reward: { nucleoSinapticoFracturadoElite: 5 } },
            { enemyName: "Polinizador Letal", health: 113000, shield: 49000, damage: 10900, reward: { nucleoSinapticoFracturadoElite: 6 } },
            { enemyName: "Reina Menor Espina Roja", health: 120000, shield: 53000, damage: 11500, reward: { matrizQuitinaCristalElite: 15, nucleoSinapticoFracturadoElite: 10, planosMK6: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Barranco Bioluminiscente “Hueco Ámbar”",
        description: "Un campo de asteroides convertidos en criaderos conectados por tubos orgánicos. La bioluminiscencia ámbar disimula el movimiento del enjambre.",
        battles: [
            { enemyName: "Cortador Ámbar", health: 121000, shield: 53500, damage: 11600, reward: { nucleoSinapticoFracturadoElite: 12 } },
            { enemyName: "Cortador Ámbar", health: 122000, shield: 54000, damage: 11700, reward: { nucleoSinapticoFracturadoElite: 14 } },
            { enemyName: "Cortador Ámbar", health: 123000, shield: 54500, damage: 11800, reward: { matrizQuitinaCristalElite: 18 } },
            { enemyName: "Cortador Ámbar", health: 124000, shield: 55000, damage: 11900, reward: { matrizQuitinaCristalElite: 20 } },
            { enemyName: "Centinela Resinario", health: 130000, shield: 58000, damage: 12500, reward: { nucleoSinapticoFracturadoElite: 20, matrizQuitinaCristalElite: 25, planosMK6: 2 }, type: 'mini-boss' },
            { enemyName: "Acechador Filamento", health: 125000, shield: 55500, damage: 12000, reward: { nucleoSinapticoFracturadoElite: 16 } },
            { enemyName: "Acechador Filamento", health: 126000, shield: 56000, damage: 12100, reward: { nucleoSinapticoFracturadoElite: 18 } },
            { enemyName: "Acechador Filamento", health: 127000, shield: 56500, damage: 12200, reward: { nucleoSinapticoFracturadoElite: 22 } },
            { enemyName: "Acechador Filamento", health: 128000, shield: 57000, damage: 12300, reward: { nucleoSinapticoFracturadoElite: 24 } },
            { enemyName: "Soberana de Resina", health: 135000, shield: 61000, damage: 13000, reward: { nucleoSinapticoFracturadoElite: 30, matrizQuitinaCristalElite: 30, planosMK6: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Nebulosa “Velo Melífero”",
        description: "Una nebulosa cargada de partículas dulces que los Carminis usan para nutrir sus naves. Todo aquí es pegajoso, denso y lleno de formas vivas.",
        battles: [
            { enemyName: "Recolector Néctar", health: 136000, shield: 61500, damage: 13100, reward: { matrizQuitinaCristalElite: 30 } },
            { enemyName: "Recolector Néctar", health: 137000, shield: 62000, damage: 13200, reward: { matrizQuitinaCristalElite: 32 } },
            { enemyName: "Recolector Néctar", health: 138000, shield: 62500, damage: 13300, reward: { nucleoSinapticoFracturadoElite: 25 } },
            { enemyName: "Recolector Néctar", health: 139000, shield: 63000, damage: 13400, reward: { nucleoSinapticoFracturadoElite: 28 } },
            { enemyName: "Emisor de Feromonas", health: 145000, shield: 66000, damage: 14000, reward: { matrizQuitinaCristalElite: 40, nucleoSinapticoFracturadoElite: 35, planosMK6: 4 }, type: 'mini-boss' },
            { enemyName: "Ala Melífera", health: 140000, shield: 63500, damage: 13500, reward: { matrizQuitinaCristalElite: 35 } },
            { enemyName: "Ala Melífera", health: 141000, shield: 64000, damage: 13600, reward: { matrizQuitinaCristalElite: 38 } },
            { enemyName: "Ala Melífera", health: 142000, shield: 64500, damage: 13700, reward: { nucleoSinapticoFracturadoElite: 30 } },
            { enemyName: "Ala Melífera", health: 143000, shield: 65000, damage: 13800, reward: { nucleoSinapticoFracturadoElite: 32 } },
            { enemyName: "Dama del Velo Dulce", health: 150000, shield: 69000, damage: 14500, reward: { matrizQuitinaCristalElite: 50, nucleoSinapticoFracturadoElite: 40, planosMK6: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Túneles del Caparazón “Cripta Quitina”",
        description: "Una antigua estación espacial ha sido absorbida y convertida en una colmena orgánica. La estructura está cubierta de placas de quitina.",
        battles: [
            { enemyName: "Quitinoide Raso", health: 151000, shield: 69500, damage: 14600, reward: { nucleoSinapticoFracturadoElite: 40 } },
            { enemyName: "Quitinoide Raso", health: 152000, shield: 70000, damage: 14700, reward: { nucleoSinapticoFracturadoElite: 42 } },
            { enemyName: "Quitinoide Raso", health: 153000, shield: 70500, damage: 14800, reward: { nucleoSinapticoFracturadoElite: 50 } },
            { enemyName: "Quitinoide Raso", health: 154000, shield: 71000, damage: 14900, reward: { matrizQuitinaCristalElite: 52 } },
            { enemyName: "Destructor Mandíbula", health: 160000, shield: 74000, damage: 15500, reward: { nucleoSinapticoFracturadoElite: 50, matrizQuitinaCristalElite: 60, planosMK6: 6 }, type: 'mini-boss' },
            { enemyName: "Ala Serrada", health: 155000, shield: 71500, damage: 15000, reward: { nucleoSinapticoFracturadoElite: 45 } },
            { enemyName: "Ala Serrada", health: 156000, shield: 72000, damage: 15100, reward: { nucleoSinapticoFracturadoElite: 48 } },
            { enemyName: "Ala Serrada", health: 157000, shield: 72500, damage: 15200, reward: { nucleoSinapticoFracturadoElite: 55 } },
            { enemyName: "Ala Serrada", health: 158000, shield: 73000, damage: 15300, reward: { nucleoSinapticoFracturadoElite: 58 } },
            { enemyName: "Señora Mandibular", health: 165000, shield: 77000, damage: 16000, reward: { nucleoSinapticoFracturadoElite: 60, matrizQuitinaCristalElite: 70, planosMK6: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Corazón del Enjambre “Púlsar Carmesí”",
        description: "Aquí late la colmena principal. Naves enormes, biotecnología compleja y un flujo constante de criaturas naciendo y muriendo en ciclos de minutos.",
        battles: [
            { enemyName: "Guardián Carmesí", health: 166000, shield: 77500, damage: 16100, reward: { nucleoSinapticoFracturadoElite: 70 } },
            { enemyName: "Guardián Carmesí", health: 167000, shield: 78000, damage: 16200, reward: { matrizQuitinaCristalElite: 72 } },
            { enemyName: "Guardián Carmesí", health: 168000, shield: 78500, damage: 16300, reward: { nucleoSinapticoFracturadoElite: 60 } },
            { enemyName: "Guardián Carmesí", health: 169000, shield: 79000, damage: 16400, reward: { nucleoSinapticoFracturadoElite: 62 } },
            { enemyName: "Esporo Alfa", health: 175000, shield: 82000, damage: 17000, reward: { matrizQuitinaCristalElite: 80, nucleoSinapticoFracturadoElite: 70, planosMK6: 8 }, type: 'mini-boss' },
            { enemyName: "Irradiado del Enjambre", health: 170000, shield: 79500, damage: 16500, reward: { nucleoSinapticoFracturadoElite: 75 } },
            { enemyName: "Irradiado del Enjambre", health: 171000, shield: 80000, damage: 16600, reward: { nucleoSinapticoFracturadoElite: 78 } },
            { enemyName: "Irradiado del Enjambre", health: 172000, shield: 80500, damage: 16700, reward: { nucleoSinapticoFracturadoElite: 65 } },
            { enemyName: "Irradiado del Enjambre", health: 173000, shield: 81000, damage: 16800, reward: { nucleoSinapticoFracturadoElite: 68 } },
            { enemyName: "Matriarca Sangrecolmena", health: 180000, shield: 85000, damage: 17500, reward: { matrizQuitinaCristalElite: 90, nucleoSinapticoFracturadoElite: 80, planosMK6: 12 }, type: 'boss' },
        ]
      },
      {
        name: "“La Emperatriz Carminis”",
        description: "La reina suprema del enjambre en este sector. Una nave viva del tamaño de un crucero, protegida por placas de quitina cristalizada y un núcleo bioenergético capaz de lanzar descargas masivas.Si la Emperatriz cae, el enjambre entra en caos.",
        isBoss: true,
        battles: [
          { enemyName: "Emperatriz Carminis", health: 200000, shield: 95000, damage: 19500, reward: { nucleoSinapticoFracturadoElite: 150, matrizQuitinaCristalElite: 150, planosMK6: 25 }, type: 'boss' },
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
                { enemyName: "Patrulla Gris", health: 161000, shield: 72500, damage: 17600, reward: { moduloManiobrasTácticasElite: 5 } },
                { enemyName: "Patrulla Gris", health: 162000, shield: 73000, damage: 17700, reward: { moduloManiobrasTácticasElite: 6 } },
                { enemyName: "Patrulla Gris", health: 163000, shield: 73500, damage: 17800, reward: { placasCamuflajeActivoElite: 3 } },
                { enemyName: "Patrulla Gris", health: 164000, shield: 74000, damage: 17900, reward: { placasCamuflajeActivoElite: 4 } },
                { enemyName: "Blindado Scout", health: 170000, shield: 77000, damage: 18500, reward: { moduloManiobrasTácticasElite: 10, placasCamuflajeActivoElite: 5, planosMK7: 1 }, type: 'mini-boss' },
                { enemyName: "Recluta Armado", health: 165000, shield: 74500, damage: 18000, reward: { moduloManiobrasTácticasElite: 7 } },
                { enemyName: "Recluta Armado", health: 166000, shield: 75000, damage: 18100, reward: { moduloManiobrasTácticasElite: 8 } },
                { enemyName: "Recluta Armado", health: 167000, shield: 75500, damage: 18200, reward: { placasCamuflajeActivoElite: 5 } },
                { enemyName: "Recluta Armado", health: 168000, shield: 76000, damage: 18300, reward: { placasCamuflajeActivoElite: 6 } },
                { enemyName: "Teniente Centinela", health: 175000, shield: 80000, damage: 19000, reward: { moduloManiobrasTácticasElite: 15, placasCamuflajeActivoElite: 10, planosMK7: 3 }, type: 'boss' },
            ]
        },
        {
            name: "Corredor de Interdicción",
            description: "Un corredor de tránsito militarizado, lleno de balizas inhibidoras y radares inteligentes. Nadie pasa sin ser registrado… o destruido.",
            battles: [
                { enemyName: "Interdictor Delta", health: 176000, shield: 80500, damage: 19100, reward: { placasCamuflajeActivoElite: 12 } },
                { enemyName: "Interdictor Delta", health: 177000, shield: 81000, damage: 19200, reward: { placasCamuflajeActivoElite: 14 } },
                { enemyName: "Interdictor Delta", health: 178000, shield: 81500, damage: 19300, reward: { moduloManiobrasTácticasElite: 18 } },
                { enemyName: "Interdictor Delta", health: 179000, shield: 82000, damage: 19400, reward: { moduloManiobrasTácticasElite: 20 } },
                { enemyName: "Operador Jammer", health: 185000, shield: 85000, damage: 20000, reward: { placasCamuflajeActivoElite: 20, moduloManiobrasTácticasElite: 25, planosMK7: 2 }, type: 'mini-boss' },
                { enemyName: "Asaltante Táctico", health: 180000, shield: 82500, damage: 19500, reward: { placasCamuflajeActivoElite: 16 } },
                { enemyName: "Asaltante Táctico", health: 181000, shield: 83000, damage: 19600, reward: { placasCamuflajeActivoElite: 18 } },
                { enemyName: "Asaltante Táctico", health: 182000, shield: 83500, damage: 19700, reward: { moduloManiobrasTácticasElite: 22 } },
                { enemyName: "Asaltante Táctico", health: 183000, shield: 84000, damage: 19800, reward: { moduloManiobrasTácticasElite: 24 } },
                { enemyName: "Capitán Vector", health: 190000, shield: 88000, damage: 21000, reward: { placasCamuflajeActivoElite: 30, moduloManiobrasTácticasElite: 30, planosMK7: 5 }, type: 'boss' },
            ]
        },
        {
            name: "Base Móvil “Ilex-03”",
            description: "Una megaestructura modular que sirve de cuartel itinerante. Talleres móviles, hangares plegables y lanzaderas de combate salen sin pausa.",
            battles: [
                { enemyName: "Mecaguarida", health: 191000, shield: 88500, damage: 21100, reward: { moduloManiobrasTácticasElite: 30 } },
                { enemyName: "Mecaguarida", health: 192000, shield: 89000, damage: 21200, reward: { moduloManiobrasTácticasElite: 32 } },
                { enemyName: "Mecaguarida", health: 193000, shield: 89500, damage: 21300, reward: { placasCamuflajeActivoElite: 25 } },
                { enemyName: "Mecaguarida", health: 194000, shield: 90000, damage: 21400, reward: { placasCamuflajeActivoElite: 28 } },
                { enemyName: "Supervisor de Hangar", health: 200000, shield: 93000, damage: 22000, reward: { moduloManiobrasTácticasElite: 40, placasCamuflajeActivoElite: 35, planosMK7: 4 }, type: 'mini-boss' },
                { enemyName: "Técnico de Choque", health: 195000, shield: 90500, damage: 21500, reward: { moduloManiobrasTácticasElite: 35 } },
                { enemyName: "Técnico de Choque", health: 196000, shield: 91000, damage: 21600, reward: { moduloManiobrasTácticasElite: 38 } },
                { enemyName: "Técnico de Choque", health: 197000, shield: 91500, damage: 21700, reward: { placasCamuflajeActivoElite: 30 } },
                { enemyName: "Técnico de Choque", health: 198000, shield: 92000, damage: 21800, reward: { placasCamuflajeActivoElite: 32 } },
                { enemyName: "Comandante Argón", health: 205000, shield: 96000, damage: 23000, reward: { moduloManiobrasTácticasElite: 50, placasCamuflajeActivoElite: 40, planosMK7: 8 }, type: 'boss' },
            ]
        },
        {
            name: "Zona Cráneo Verde",
            description: "Sector de entrenamiento avanzado. Aquí se realizan simulacros reales, usando munición de guerra y tácticas corporativas brutalmente eficientes.",
            battles: [
                { enemyName: "Cadete Esmeralda", health: 206000, shield: 96500, damage: 23100, reward: { placasCamuflajeActivoElite: 40 } },
                { enemyName: "Cadete Esmeralda", health: 207000, shield: 97000, damage: 23200, reward: { placasCamuflajeActivoElite: 42 } },
                { enemyName: "Cadete Esmeralda", health: 208000, shield: 97500, damage: 23300, reward: { moduloManiobrasTácticasElite: 50 } },
                { enemyName: "Cadete Esmeralda", health: 209000, shield: 98000, damage: 23400, reward: { moduloManiobrasTácticasElite: 52 } },
                { enemyName: "Instructor Sierra", health: 215000, shield: 101000, damage: 24000, reward: { placasCamuflajeActivoElite: 50, moduloManiobrasTácticasElite: 60, planosMK7: 6 }, type: 'mini-boss' },
                { enemyName: "Tirador Musgo", health: 210000, shield: 98500, damage: 23500, reward: { placasCamuflajeActivoElite: 45 } },
                { enemyName: "Tirador Musgo", health: 211000, shield: 99000, damage: 23600, reward: { placasCamuflajeActivoElite: 48 } },
                { enemyName: "Tirador Musgo", health: 212000, shield: 99500, damage: 23700, reward: { moduloManiobrasTácticasElite: 55 } },
                { enemyName: "Tirador Musgo", health: 213000, shield: 100000, damage: 23800, reward: { moduloManiobrasTácticasElite: 58 } },
                { enemyName: "Mayor Coraza Verde", health: 220000, shield: 104000, damage: 25000, reward: { placasCamuflajeActivoElite: 60, moduloManiobrasTácticasElite: 70, planosMK7: 10 }, type: 'boss' },
            ]
        },
        {
            name: "Línea Férrea Cerberus",
            description: "La zona de contención interna final. Tres cinturones defensivos, torres automáticas y fragatas de escolta dan forma a una muralla móvil impenetrable.",
            battles: [
                { enemyName: "Vigía Cerberus", health: 221000, shield: 104500, damage: 25100, reward: { esenciaDelVacio: 80 } },
                { enemyName: "Vigía Cerberus", health: 222000, shield: 105000, damage: 25200, reward: { esenciaDelVacio: 82 } },
                { enemyName: "Vigía Cerberus", health: 223000, shield: 105500, damage: 25300, reward: { reliquiaCorrupta: 90 } },
                { enemyName: "Vigía Cerberus", health: 224000, shield: 106000, damage: 25400, reward: { reliquiaCorrupta: 92 } },
                { enemyName: "Unidad Cerberus-β", health: 230000, shield: 109000, damage: 26000, reward: { esenciaDelVacio: 100, reliquiaCorrupta: 100, planosMK7: 15 }, type: 'mini-boss' },
                { enemyName: "Operador Férreo", health: 225000, shield: 106500, damage: 25500, reward: { esenciaDelVacio: 85 } },
                { enemyName: "Operador Férreo", health: 226000, shield: 107000, damage: 25600, reward: { esenciaDelVacio: 88 } },
                { enemyName: "Operador Férreo", health: 227000, shield: 107500, damage: 25700, reward: { reliquiaCorrupta: 95 } },
                { enemyName: "Operador Férreo", health: 228000, shield: 108000, damage: 25800, reward: { reliquiaCorrupta: 98 } },
                { enemyName: "Coronel Muralla", health: 240000, shield: 115000, damage: 27000, reward: { moduloManiobrasTácticasElite: 150, placasCamuflajeActivoElite: 150, planosMK7: 25 }, type: 'boss' },
            ]
        },
        {
            name: "Bastión Regimental “Ilex Prime”",
            description: "El cuartel general flotante de la Legión Ilex. Un coloso blindado con camuflaje adaptativo, artillería orbital y un núcleo táctico que coordina toda la red mercenaria.Ninguna nave ha conseguido atravesar sus defensas… hasta ahora.",
            isBoss: true,
            battles: [
              { enemyName: "Destructor “Iron Howl”", health: 240000, shield: 115000, damage: 27000, reward: { moduloManiobrasTácticasElite: 150, placasCamuflajeActivoElite: 150, planosMK7: 25 }, type: 'boss' },
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
            { enemyName: "Centinela Celeste", health: 266000, shield: 125500, damage: 32100, reward: { placasDeAetheriumElite: 5 } },
            { enemyName: "Centinela Celeste", health: 267000, shield: 126000, damage: 32200, reward: { placasDeAetheriumElite: 6 } },
            { enemyName: "Centinela Celeste", health: 268000, shield: 126500, damage: 32300, reward: { nucleoPsionicoArmonicoElite: 3 } },
            { enemyName: "Centinela Celeste", health: 269000, shield: 127000, damage: 32400, reward: { nucleoPsionicoArmonicoElite: 4 } },
            { enemyName: "Vigilante Prismático", health: 275000, shield: 130000, damage: 33000, reward: { placasDeAetheriumElite: 10, nucleoPsionicoArmonicoElite: 5, planosMK8: 1 }, type: 'mini-boss' },
            { enemyName: "Eco de Luz", health: 270000, shield: 127500, damage: 32500, reward: { placasDeAetheriumElite: 7 } },
            { enemyName: "Eco de Luz", health: 271000, shield: 128000, damage: 32600, reward: { placasDeAetheriumElite: 8 } },
            { enemyName: "Eco de Luz", health: 272000, shield: 128500, damage: 32700, reward: { nucleoPsionicoArmonicoElite: 5 } },
            { enemyName: "Eco de Luz", health: 273000, shield: 129000, damage: 32800, reward: { nucleoPsionicoArmonicoElite: 6 } },
            { enemyName: "Custodio Aural", health: 280000, shield: 135000, damage: 34000, reward: { placasDeAetheriumElite: 15, nucleoPsionicoArmonicoElite: 10, planosMK8: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Campos Resonantes",
        description: "Amplias llanuras de energía cristalizada donde los Aureanos entrenan a sus naves vivas. La energía vibra como un coro.",
        battles: [
            { enemyName: "Iniciado Resonante", health: 281000, shield: 135500, damage: 34100, reward: { nucleoPsionicoArmonicoElite: 12 } },
            { enemyName: "Iniciado Resonante", health: 282000, shield: 136000, damage: 34200, reward: { nucleoPsionicoArmonicoElite: 14 } },
            { enemyName: "Iniciado Resonante", health: 283000, shield: 136500, damage: 34300, reward: { placasDeAetheriumElite: 18 } },
            { enemyName: "Iniciado Resonante", health: 284000, shield: 137000, damage: 34400, reward: { placasDeAetheriumElite: 20 } },
            { enemyName: "Agravio Armónico", health: 290000, shield: 140000, damage: 35000, reward: { nucleoPsionicoArmonicoElite: 20, placasDeAetheriumElite: 25, planosMK8: 2 }, type: 'mini-boss' },
            { enemyName: "Disonancia Errante", health: 285000, shield: 137500, damage: 34500, reward: { nucleoPsionicoArmonicoElite: 16 } },
            { enemyName: "Disonancia Errante", health: 286000, shield: 138000, damage: 34600, reward: { nucleoPsionicoArmonicoElite: 18 } },
            { enemyName: "Disonancia Errante", health: 287000, shield: 138500, damage: 34700, reward: { placasDeAetheriumElite: 22 } },
            { enemyName: "Disonancia Errante", health: 288000, shield: 139000, damage: 34800, reward: { placasDeAetheriumElite: 24 } },
            { enemyName: "Maestro de la Resonancia", health: 295000, shield: 143000, damage: 36000, reward: { nucleoPsionicoArmonicoElite: 30, placasDeAetheriumElite: 30, planosMK8: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Sagrario de Aurora",
        description: "Un templo flotante donde los Aureanos canalizan la “Llama Interior”, una fuente energética consciente.",
        battles: [
            { enemyName: "Guardián de Aurora", health: 296000, shield: 143500, damage: 36100, reward: { placasDeAetheriumElite: 30 } },
            { enemyName: "Guardián de Aurora", health: 297000, shield: 144000, damage: 36200, reward: { placasDeAetheriumElite: 32 } },
            { enemyName: "Guardián de Aurora", health: 298000, shield: 144500, damage: 36300, reward: { nucleoPsionicoArmonicoElite: 25 } },
            { enemyName: "Guardián de Aurora", health: 299000, shield: 145000, damage: 36400, reward: { nucleoPsionicoArmonicoElite: 28 } },
            { enemyName: "Portador de la Llama", health: 305000, shield: 148000, damage: 37000, reward: { placasDeAetheriumElite: 40, nucleoPsionicoArmonicoElite: 35, planosMK8: 4 }, type: 'mini-boss' },
            { enemyName: "Chispa Ancestral", health: 300000, shield: 145500, damage: 36500, reward: { placasDeAetheriumElite: 35 } },
            { enemyName: "Chispa Ancestral", health: 301000, shield: 146000, damage: 36600, reward: { placasDeAetheriumElite: 38 } },
            { enemyName: "Chispa Ancestral", health: 302000, shield: 146500, damage: 36700, reward: { nucleoPsionicoArmonicoElite: 30 } },
            { enemyName: "Chispa Ancestral", health: 303000, shield: 147000, damage: 36800, reward: { nucleoPsionicoArmonicoElite: 32 } },
            { enemyName: "Orador Lumínico", health: 310000, shield: 150000, damage: 38000, reward: { placasDeAetheriumElite: 45, nucleoPsionicoArmonicoElite: 40, planosMK8: 7 }, type: 'boss' },
        ]
      },
      {
        name: "Bastión Dorado",
        description: "Nudos de defensa hechos con placas de luz endurecida. Cada estructura cambia de forma según la amenaza detectada.",
        battles: [
            { enemyName: "Arconte Dorado", health: 304000, shield: 147500, damage: 36900, reward: { placasDeAetheriumElite: 40 } },
            { enemyName: "Arconte Dorado", health: 305000, shield: 148000, damage: 37000, reward: { placasDeAetheriumElite: 42 } },
            { enemyName: "Arconte Dorado", health: 306000, shield: 148500, damage: 37100, reward: { nucleoPsionicoArmonicoElite: 35 } },
            { enemyName: "Arconte Dorado", health: 307000, shield: 149000, damage: 37200, reward: { nucleoPsionicoArmonicoElite: 38 } },
            { enemyName: "Escudo Viviente", health: 315000, shield: 155000, damage: 38500, reward: { placasDeAetheriumElite: 50, nucleoPsionicoArmonicoElite: 45, planosMK8: 6 }, type: 'mini-boss' },
            { enemyName: "Lanza Radiante", health: 308000, shield: 149500, damage: 37300, reward: { placasDeAetheriumElite: 42 } },
            { enemyName: "Lanza Radiante", health: 309000, shield: 150000, damage: 37400, reward: { placasDeAetheriumElite: 44 } },
            { enemyName: "Lanza Radiante", health: 310000, shield: 150500, damage: 37500, reward: { nucleoPsionicoArmonicoElite: 40 } },
            { enemyName: "Lanza Radiante", health: 311000, shield: 151000, damage: 37600, reward: { nucleoPsionicoArmonicoElite: 42 } },
            { enemyName: "Prelado Solemne", health: 320000, shield: 160000, damage: 40000, reward: { placasDeAetheriumElite: 60, nucleoPsionicoArmonicoElite: 50, planosMK8: 9 }, type: 'boss' },
        ]
      },
      {
        name: "Horizonte Sacro",
        description: "Un anillo de plataformas levitantes que protege la capital aureana. Aquí la energía vibra como si tuviera voluntad propia.",
        battles: [
            { enemyName: "Aureano Sagrado", health: 312000, shield: 151500, damage: 37700, reward: {  nucleoPsionicoArmonicoElite: 45 } },
            { enemyName: "Aureano Sagrado", health: 313000, shield: 152000, damage: 37800, reward: { nucleoPsionicoArmonicoElite: 48 } },
            { enemyName: "Aureano Sagrado", health: 314000, shield: 152500, damage: 37900, reward: { placasDeAetheriumElite: 50 } },
            { enemyName: "Aureano Sagrado", health: 315000, shield: 153000, damage: 38000, reward: { placasDeAetheriumElite: 52 } },
            { enemyName: "Disruptor del Horizonte", health: 325000, shield: 160000, damage: 41000, reward: { nucleoPsionicoArmonicoElite: 55, placasDeAetheriumElite: 55, planosMK8: 8 }, type: 'mini-boss' },
            { enemyName: "Rayo Custodio", health: 316000, shield: 153500, damage: 38100, reward: { nucleoPsionicoArmonicoElite: 50 } },
            { enemyName: "Rayo Custodio", health: 317000, shield: 154000, damage: 38200, reward: { nucleoPsionicoArmonicoElite: 52 } },
            { enemyName: "Rayo Custodio", health: 318000, shield: 154500, damage: 38300, reward: { placasDeAetheriumElite: 58 } },
            { enemyName: "Rayo Custodio", health: 319000, shield: 155000, damage: 38400, reward: { placasDeAetheriumElite: 60 } },
            { enemyName: "Sumo Guardián del Vórtice", health: 330000, shield: 165000, damage: 43000, reward: { nucleoPsionicoArmonicoElite: 65, placasDeAetheriumElite: 60, planosMK8: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Ciudad-Luz \"Solarion Primus\"",
        description: "La capital flotante de los Aureanos. Un mundo-nave formado por capas de luz cristalizada, guiado por la conciencia colectiva de toda su especie.Aqui reside la encarnacion suprema de su voluntad.",
        isBoss: true,
        battles: [
          { enemyName: "Arconte Supremo Seraphys", health: 350000, shield: 175000, damage: 45000, reward: { nucleoPsionicoArmonicoElite: 100, placasDeAetheriumElite: 100, planosMK8: 20 }, type: 'boss' },
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
          { enemyName: "Engendro Penumbrio", health: 335000, shield: 167500, damage: 33500, reward: { tejidoAbisalRetorcidoElite: 5 } },
          { enemyName: "Engendro Penumbrio", health: 340000, shield: 170000, damage: 34000, reward: { tejidoAbisalRetorcidoElite: 6 } },
          { enemyName: "Engendro Penumbrio", health: 345000, shield: 172500, damage: 34500, reward: { singularidadCorruptaContenidaElite: 3 } },
          { enemyName: "Engendro Penumbrio", health: 350000, shield: 175000, damage: 35000, reward: { singularidadCorruptaContenidaElite: 4 } },
          { enemyName: "Vástago Hemolítico", health: 370000, shield: 185000, damage: 37000, reward: { tejidoAbisalRetorcidoElite: 10, singularidadCorruptaContenidaElite: 5, planosMK9: 1 }, type: 'mini-boss' },
          { enemyName: "Deforme Sanguinas", health: 355000, shield: 177500, damage: 35500, reward: { tejidoAbisalRetorcidoElite: 7 } },
          { enemyName: "Deforme Sanguinas", health: 360000, shield: 180000, damage: 36000, reward: { tejidoAbisalRetorcidoElite: 8 } },
          { enemyName: "Deforme Sanguinas", health: 365000, shield: 182500, damage: 36500, reward: { singularidadCorruptaContenidaElite: 5 } },
          { enemyName: "Deforme Sanguinas", health: 370000, shield: 185000, damage: 37000, reward: { singularidadCorruptaContenidaElite: 6 } },
          { enemyName: "Heraldo Carmesí", health: 400000, shield: 200000, damage: 40000, reward: { tejidoAbisalRetorcidoElite: 15, singularidadCorruptaContenidaElite: 10, planosMK9: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Forja Profanada",
        description: "Una antigua estación industrial tomada por el Culto. Los hornos ahora funden metal y carne por igual, creando naves vivientes.",
        battles: [
          { enemyName: "Fragmento Profano", health: 405000, shield: 202500, damage: 40500, reward: { singularidadCorruptaContenidaElite: 10 } },
          { enemyName: "Fragmento Profano", health: 410000, shield: 205000, damage: 41000, reward: { singularidadCorruptaContenidaElite: 12 } },
          { enemyName: "Fragmento Profano", health: 415000, shield: 207500, damage: 41500, reward: { tejidoAbisalRetorcidoElite: 10 } },
          { enemyName: "Fragmento Profano", health: 420000, shield: 210000, damage: 42000, reward: { tejidoAbisalRetorcidoElite: 12 } },
          { enemyName: "Operario del Vacío", health: 450000, shield: 225000, damage: 45000, reward: { singularidadCorruptaContenidaElite: 20, tejidoAbisalRetorcidoElite: 15, planosMK9: 2 }, type: 'mini-boss' },
          { enemyName: "Masa Forjada", health: 425000, shield: 212500, damage: 42500, reward: { singularidadCorruptaContenidaElite: 14 } },
          { enemyName: "Masa Forjada", health: 430000, shield: 215000, damage: 43000, reward: { singularidadCorruptaContenidaElite: 16 } },
          { enemyName: "Masa Forjada", health: 435000, shield: 217500, damage: 43500, reward: { tejidoAbisalRetorcidoElite: 14 } },
          { enemyName: "Masa Forjada", health: 440000, shield: 220000, damage: 44000, reward: { tejidoAbisalRetorcidoElite: 16 } },
          { enemyName: "Artífice del Abismo", health: 480000, shield: 240000, damage: 48000, reward: { singularidadCorruptaContenidaElite: 30, tejidoAbisalRetorcidoElite: 25, planosMK9: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Madriguera del Susurro",
        description: "Zonas colapsadas donde ecos distorsionados repiten frases imposibles. Los Susurrantes habitan aquí… o quizás solo sus voces.",
        battles: [
          { enemyName: "Eco Torturado", health: 485000, shield: 242500, damage: 48500, reward: { tejidoAbisalRetorcidoElite: 20 } },
          { enemyName: "Eco Torturado", health: 490000, shield: 245000, damage: 49000, reward: { tejidoAbisalRetorcidoElite: 22 } },
          { enemyName: "Eco Torturado", health: 495000, shield: 247500, damage: 49500, reward: { singularidadCorruptaContenidaElite: 25 } },
          { enemyName: "Eco Torturado", health: 500000, shield: 250000, damage: 50000, reward: { singularidadCorruptaContenidaElite: 28 } },
          { enemyName: "Devoramente", health: 530000, shield: 265000, damage: 53000, reward: { tejidoAbisalRetorcidoElite: 30, singularidadCorruptaContenidaElite: 35, planosMK9: 4 }, type: 'mini-boss' },
          { enemyName: "Aullador del Silencio", health: 505000, shield: 252500, damage: 50500, reward: { tejidoAbisalRetorcidoElite: 25 } },
          { enemyName: "Aullador del Silencio", health: 510000, shield: 255000, damage: 51000, reward: { tejidoAbisalRetorcidoElite: 28 } },
          { enemyName: "Aullador del Silencio", health: 515000, shield: 257500, damage: 51500, reward: { singularidadCorruptaContenidaElite: 30 } },
          { enemyName: "Aullador del Silencio", health: 520000, shield: 260000, damage: 52000, reward: { singularidadCorruptaContenidaElite: 32 } },
          { enemyName: "Profeta de los Susurros", health: 560000, shield: 280000, damage: 56000, reward: { tejidoAbisalRetorcidoElite: 40, singularidadCorruptaContenidaElite: 40, planosMK9: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Desgarro Onírico",
        description: "Una grieta dimensional convertida en bastión. La realidad aquí es inconsistente: el espacio se dobla, vibra y se retuerce.",
        battles: [
          { enemyName: "Rastro Abismal", health: 565000, shield: 282500, damage: 56500, reward: { singularidadCorruptaContenidaElite: 40 } },
          { enemyName: "Rastro Abismal", health: 570000, shield: 285000, damage: 57000, reward: { singularidadCorruptaContenidaElite: 42 } },
          { enemyName: "Rastro Abismal", health: 575000, shield: 287500, damage: 57500, reward: { tejidoAbisalRetorcidoElite: 40 } },
          { enemyName: "Rastro Abismal", health: 580000, shield: 290000, damage: 58000, reward: { tejidoAbisalRetorcidoElite: 42 } },
          { enemyName: "Quimera Delirante", health: 610000, shield: 305000, damage: 61000, reward: { singularidadCorruptaContenidaElite: 50, tejidoAbisalRetorcidoElite: 50, planosMK9: 6 }, type: 'mini-boss' },
          { enemyName: "Reptante de Pesadilla", health: 585000, shield: 292500, damage: 58500, reward: { singularidadCorruptaContenidaElite: 45 } },
          { enemyName: "Reptante de Pesadilla", health: 590000, shield: 295000, damage: 59000, reward: { singularidadCorruptaContenidaElite: 48 } },
          { enemyName: "Reptante de Pesadilla", health: 595000, shield: 297500, damage: 59500, reward: { tejidoAbisalRetorcidoElite: 45 } },
          { enemyName: "Reptante de Pesadilla", health: 600000, shield: 300000, damage: 60000, reward: { tejidoAbisalRetorcidoElite: 48 } },
          { enemyName: "Guardián del Desgarro", health: 640000, shield: 320000, damage: 64000, reward: { singularidadCorruptaContenidaElite: 60, tejidoAbisalRetorcidoElite: 60, planosMK9: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Santuario de la Ruina",
        description: "Altar mecano-orgánico donde el Culto realiza sus rituales. Las paredes están cubiertas por símbolos que sangran luz negra.",
        battles: [
          { enemyName: "Adepto de Ruina", health: 645000, shield: 322500, damage: 64500, reward: { tejidoAbisalRetorcidoElite: 50 } },
          { enemyName: "Adepto de Ruina", health: 650000, shield: 325000, damage: 65000, reward: { tejidoAbisalRetorcidoElite: 52 } },
          { enemyName: "Adepto de Ruina", health: 655000, shield: 327500, damage: 65500, reward: { singularidadCorruptaContenidaElite: 55 } },
          { enemyName: "Adepto de Ruina", health: 660000, shield: 330000, damage: 66000, reward: { singularidadCorruptaContenidaElite: 58 } },
          { enemyName: "Desolador Ritual", health: 690000, shield: 345000, damage: 69000, reward: { tejidoAbisalRetorcidoElite: 70, singularidadCorruptaContenidaElite: 70, planosMK9: 8 }, type: 'mini-boss' },
          { enemyName: "Sombra Flagelante", health: 665000, shield: 332500, damage: 66500, reward: { tejidoAbisalRetorcidoElite: 60 } },
          { enemyName: "Sombra Flagelante", health: 670000, shield: 335000, damage: 67000, reward: { tejidoAbisalRetorcidoElite: 62 } },
          { enemyName: "Sombra Flagelante", health: 675000, shield: 337500, damage: 67500, reward: { singularidadCorruptaContenidaElite: 65 } },
          { enemyName: "Sombra Flagelante", health: 680000, shield: 340000, damage: 68000, reward: { singularidadCorruptaContenidaElite: 68 } },
          { enemyName: "Alto Sacerdote del Vacío", health: 720000, shield: 360000, damage: 72000, reward: { tejidoAbisalRetorcidoElite: 80, singularidadCorruptaContenidaElite: 80, planosMK9: 12 }, type: 'boss' },
        ]
      },
      {
        name: "Colmena Abisal “Xal-Horuun”",
        description: "La nave-capital del Culto del Abismo: una colmena viviente del tamaño de una luna, hecha de hueso, metal y oscuridad pura.Un núcleo energético corrupto late en su interior como un corazón demoníaco.La entidad líder del Culto mora aquí, conectada a cada nave y cada grito.",
        isBoss: true,
        battles: [
          { enemyName: "Señor del Abismo Vorgrath", health: 800000, shield: 400000, damage: 80000, reward: { singularidadCorruptaContenidaElite: 150, tejidoAbisalRetorcidoElite: 150, planosMK9: 25 }, type: 'boss' },
        ]
      }
    ]
  }
]
