// src/data/shipyardData.ts
import { ShipyardProject } from '../types/gameData';

export const allShipyardProjects: ShipyardProject[] = [
  {
    id: 'vindicator_base',
    name: 'Vindicator (Base)',
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
    name: 'Vindicator Mk.I',
    description: 'Mejora el Vindicator a la versión Mk.I "Acorazado". Requiere tecnología avanzada de Fase 1 y materiales exóticos recuperados de la zona corrupta.',
    costs: {
      chasisReforzado: { aceroEstructural: 25000, aleacionReforzada: 250 },
      nucleoSingularidad: { cableadoSuperconductor: 5000, neuroChipCorrupto: 100 },
      sistemaArmamento: { aleacionReforzada: 150, neuroChipCorrupto: 75 },
      ensamblajeFinal: { blueprints: 50 }
    },
  },
  {
    id: 'vindicator_mk2_interceptor',
    name: 'Vindicator MK2 "Interceptor"',
    description: 'Reconstruye el Vindicator con un chasis ligero y tecnología de sigilo para crear el Interceptor, una nave diseñada para la velocidad y la evasión.',
    costs: {
      chasisDeSigilo: { placasDeSigilo: 500, aleacionReforzada: 1000 },
      motorDeManiobraAvanzado: { matrizDeManiobra: 500, IA_Fragmentada: 250 },
      sistemaDeCamuflajeEspectral: { matrizCristalina: 250, neuroChipCorrupto: 500 },
      ensamblajeFinal: { planosDeInterceptor: 50 }
    },
  },
  {
    id: 'vindicator_mk3_devastator',
    name: 'Vindicator MK3 "Devastator"',
    description: 'Reconstruye el Vindicator sobre una plataforma de armamento pesado. El "Devastator" es una fortaleza móvil diseñada para el asalto frontal y la aniquilación.',
    costs: {
      cascoDeAdamantio: { placasAdamantioReforzado: 500, aceroEstructural: 50000 },
      nucleoDeEnergiaArcano: { nucleoDatosArcano: 250, cableadoSuperconductor: 10000 },
      sistemasDeObjetivosMejorados: { IA_Fragmentada: 500, neuroChipCorrupto: 1000 },
      ensamblajeFinal: { planosMK3: 50 }
    },
  },
  {
    id: 'vindicator_mk4_reaper',
    name: 'Vindicator MK4 "Reaper"',
    description: 'Una modificación de campo que integra tecnología de singularidad directamente en el armamento. El "Reaper" es un cañón de cristal, diseñado para terminar las batallas antes de que empiecen.',
    costs: {
      cascoEspaciotemporal: { tejidoEspaciotemporal: 500, placasAdamantioReforzado: 1000 },
      nucleoDeSingularidad: { singularidadEmbotellada: 250, nucleoDatosArcano: 500 },
      sistemasDeArmasOmega: { IA_Fragmentada: 1000, planosMK3: 100 },
      ensamblajeFinal: { planosMK4: 50 }
    },
  },
  {
    id: 'vindicator_mk5_aegis',
    name: 'Vindicator MK5 "Aegis"',
    description: 'La culminación de la tecnología defensiva. El "Aegis" es un bastión inexpugnable, capaz de resistir los ataques más devastadores gracias a su blindaje regenerativo basado en reliquias.',
    costs: {
      matrizDeReliquias: { esquirlasDeReliquia: 500, tejidoEspaciotemporal: 1000 },
      compiladorDeCodex: { codexAncestral: 250, singularidadEmbotellada: 500 },
      sistemasDefensivosAvanzados: { IA_Fragmentada: 2000, planosMK4: 100 },
      ensamblajeFinal: { planosMK5: 50 }
    },
  },
  {
    id: 'vindicator_mk6_tempest',
    name: 'Vindicator MK6 "Tempest"',
    description: 'Una nave experimental que canaliza energía del punto cero para crear una tormenta de destrucción. El "Tempest" es inestable pero inmensamente poderoso.',
    costs: {
      tejidoDeRealidad: { fragmentoHorizonteSucesos: 500, esquirlasDeReliquia: 1000 },
      compiladorAncestral: { energiaPuntoCero: 250, codexAncestral: 500 },
      matrizDeDisparoRapido: { IA_Fragmentada: 2500, planosMK5: 100 },
      ensamblajeFinal: { planosMK6: 50 }
    },
  },
  {
    id: 'vindicator_mk7_wraith',
    name: 'Vindicator MK7 "Wraith"',
    description: 'Nacido de los ecos del vacío, el "Wraith" es una nave fantasma que canaliza energía corrupta para desintegrar a sus enemigos.',
    costs: {
      cascoDeEspectro: { esenciaDelVacio: 500, fragmentoHorizonteSucesos: 1000 },
      nucleoDelVacio: { reliquiaCorrupta: 250, energiaPuntoCero: 500 },
      modulosDeCorrupcion: { IA_Fragmentada: 3000, planosMK6: 100 },
      ensamblajeFinal: { planosMK7: 50 }
    },
  },
  {
    id: 'vindicator_mk8_phantom',
    name: 'Vindicator MK8 "Phantom"',
    description: 'Una nave que existe entre dimensiones. El "Phantom" usa tecnología espectral para desvanecerse de la realidad y asestar golpes mortales.',
    costs: {
      chasisEspectral: { nucleoEspectral: 500, esenciaDelVacio: 1000 },
      sincronizadorFantasmal: { conexionFantasmal: 250, reliquiaCorrupta: 500 },
      armamentoDeFase: { IA_Fragmentada: 4000, planosMK7: 100 },
      ensamblajeFinal: { planosMK8: 50 }
    },
  },
  {
    id: 'vindicator_mk9_apex',
    name: 'Vindicator MK9 "Apex"',
    description: 'La cima de la evolución. El "Apex" integra la tecnología de la Ciudadela para convertirse en el arma definitiva, el depredador alfa de la galaxia.',
    costs: {
      blindajeDeCiudadela: { fragmentoDeCiudadela: 500, nucleoEspectral: 1000 },
      matrizDeOverlord: { matrizDeOverlord: 250, conexionFantasmal: 500 },
      sistemasDeArmasDefinitivos: { IA_Fragmentada: 5000, planosMK8: 100 },
      ensamblajeFinal: { planosMK9: 50 }
    },
  },
];
