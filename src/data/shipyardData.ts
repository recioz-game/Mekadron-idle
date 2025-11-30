// src/data/shipyardData.ts
import { ShipyardProject } from '../types/gameData';

export const allShipyardProjects: ShipyardProject[] = [
  {
    id: 'vindicator_base',
    name: 'Vindicator',
    description: 'Construye el casco base del Vindicator.',
    costs: {
      hull: { placasCasco: 50 },
      powerCore: { cableadoSuperconductor: 50 },
      targetingSystem: { researchPoints: 1000, cableadoSuperconductor: 25 },
      warpDrive: { nucleoSingularidad: 1 }
    },
  },
  {
    id: 'vindicator_mk1',
    name: 'VM01 — Origin',
    description: 'Mejora el Vindicator a la versión Mk.I "Origin". Requiere tecnología avanzada de Fase 1 y materiales exóticos recuperados de la zona corrupta.',
    costs: {
      chasisReforzado: { aceroEstructural: 25000, aleacionReforzadaRobada: 250 },
      nucleoSingularidad: { cableadoSuperconductor: 5000, neuroChipCorrupto: 100 },
      sistemaArmamento: { aleacionReforzadaRobada: 150, neuroChipCorrupto: 75 },
      ensamblajeFinal: { blueprints: 50 }
    },
  },
  {
    id: 'vindicator_mk2_interceptor',
    name: 'VM02 — Interceptor',
    description: 'Reconstruye el Vindicator con un chasis ligero y tecnología de sigilo para crear el Interceptor, una nave diseñada para la velocidad y la evasión.',
    costs: {
      chasisDeSigilo: { placasCamuflajeActivo: 500, aleacionReforzadaRobada: 1000 },
      motorDeManiobraAvanzado: { moduloManiobrasTácticas: 500, nucleoSinapticoFracturado: 250 },
      sistemaDeCamuflajeEspectral: { matrizQuitinaCristal: 250, neuroChipCorrupto: 500 },
      ensamblajeFinal: { planosDeInterceptor: 50 }
    },
  },
  {
    id: 'vindicator_mk3_devastator',
    name: 'VM03 — Devastator',
    description: 'Reconstruye el Vindicator sobre una plataforma de armamento pesado. El "Devastator" es una fortaleza móvil diseñada para el asalto frontal y la aniquilación.',
    costs: {
      cascoDeAdamantio: { placasDeAetherium: 500, aceroEstructural: 50000 },
      nucleoDeEnergiaArcano: { nucleoPsionicoArmonico: 250, cableadoSuperconductor: 10000 },
      sistemasDeObjetivosMejorados: { nucleoSinapticoFracturado: 500, neuroChipCorrupto: 1000 },
      ensamblajeFinal: { planosMK3: 50 }
    },
  },
  {
    id: 'vindicator_mk4_reaper',
    name: 'VM04 — Reaper',
    description: 'Una modificación de campo que integra tecnología de singularidad directamente en el armamento. El "Reaper" es un cañón de cristal, diseñado para terminar las batallas antes de que empiecen.',
    costs: {
      cascoEspaciotemporal: { tejidoAbisalRetorcido: 500, placasDeAetherium: 1000 },
      nucleoDeSingularidad: { singularidadCorruptaContenida: 250, nucleoPsionicoArmonico: 500 },
      sistemasDeArmasOmega: { nucleoSinapticoFracturado: 1000, planosMK3: 100 },
      ensamblajeFinal: { planosMK4: 50 }
    },
  },
  {
    id: 'vindicator_mk5_aegis',
    name: 'VM05 — Aegis',
    description: 'La culminación de la tecnología defensiva. El "Aegis" es un bastión inexpugnable, capaz de resistir los ataques más devastadores gracias a su blindaje regenerativo basado en reliquias.',
    costs: {
      matrizDeReliquias: { aleacionReforzadaElite: 500, tejidoAbisalRetorcido: 1000 },
      compiladorDeCodex: { neuroChipCorruptoElite: 250, singularidadCorruptaContenida: 500 },
      sistemasDefensivosAvanzados: { nucleoSinapticoFracturado: 2000, planosMK4: 100 },
      ensamblajeFinal: { planosMK5: 50 }
    },
  },
  {
    id: 'vindicator_mk6_tempest',
    name: 'VM06 — Tempest',
    description: 'Una nave experimental que canaliza energía del punto cero para crear una tormenta de destrucción. El "Tempest" es inestable pero inmensamente poderoso.',
    costs: {
      tejidoDeRealidad: { matrizQuitinaCristalElite: 500, aleacionReforzadaElite: 1000 },
      compiladorAncestral: { nucleoSinapticoFracturadoElite: 250, neuroChipCorruptoElite: 500 },
      matrizDeDisparoRapido: { nucleoSinapticoFracturado: 2500, planosMK5: 100 },
      ensamblajeFinal: { planosMK6: 50 }
    },
  },
  {
    id: 'vindicator_mk7_wraith',
    name: 'VM07 — Wraith',
    description: 'Nacido de los ecos del vacío, el "Wraith" es una nave fantasma que canaliza energía corrupta para desintegrar a sus enemigos.',
    costs: {
      cascoDeEspectro: { moduloManiobrasTácticasElite: 500, matrizQuitinaCristalElite: 1000 },
      nucleoDelVacio: { placasCamuflajeActivoElite: 250, nucleoSinapticoFracturadoElite: 500 },
      modulosDeCorrupcion: { nucleoSinapticoFracturado: 3000, planosMK6: 100 },
      ensamblajeFinal: { planosMK7: 50 }
    },
  },
  {
    id: 'vindicator_mk8_phantom',
    name: 'VM08 — Phantom',
    description: 'Una nave que existe entre dimensiones. El "Phantom" usa tecnología espectral para desvanecerse de la realidad y asestar golpes mortales.',
    costs: {
      chasisEspectral: { placasDeAetheriumElite: 500, moduloManiobrasTácticasElite: 1000 },
      sincronizadorFantasmal: { nucleoPsionicoArmonicoElite: 250, placasCamuflajeActivoElite: 500 },
      armamentoDeFase: { nucleoSinapticoFracturado: 4000, planosMK7: 100 },
      ensamblajeFinal: { planosMK8: 50 }
    },
  },
  {
    id: 'vindicator_mk9_apex',
    name: 'VM09 — Apex',
    description: 'La cima de la evolución. El "Apex" integra la tecnología de la Ciudadela para convertirse en el arma definitiva, el depredador alfa de la galaxia.',
    costs: {
      blindajeDeCiudadela: { tejidoAbisalRetorcidoElite: 500, placasDeAetheriumElite: 1000 },
      matrizDeOverlord: { singularidadCorruptaContenidaElite: 250, nucleoPsionicoArmonicoElite: 500 },
      sistemasDeArmasDefinitivos: { nucleoSinapticoFracturado: 5000, planosMK8: 100 },
      ensamblajeFinal: { planosMK9: 50 }
    },
  },
];
