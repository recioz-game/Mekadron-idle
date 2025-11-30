// src/data/categoryData.ts

export type ResourceCategory = 'materialesIndustriales' | 'componentesBatalla' | 'materialesExoticos';

export const resourceCategories: Record<string, ResourceCategory> = {
  // Materiales Industriales
  metalRefinado: 'materialesIndustriales',
  aceroEstructural: 'materialesIndustriales',
  placasCasco: 'materialesIndustriales',
  cableadoSuperconductor: 'materialesIndustriales',
  barraCombustible: 'materialesIndustriales',

  // Componentes de Batalla
  fragmentosPlaca: 'componentesBatalla',
  circuitosDañados: 'componentesBatalla',
  aleacionReforzadaRobada: 'componentesBatalla',
  neuroChipCorrupto: 'componentesBatalla',
  matrizQuitinaCristal: 'componentesBatalla',
  nucleoSinapticoFracturado: 'componentesBatalla',
  moduloManiobrasTácticas: 'componentesBatalla',
  placasCamuflajeActivo: 'componentesBatalla',
  placasDeAetherium: 'componentesBatalla',
  nucleoPsionicoArmonico: 'componentesBatalla',
  tejidoAbisalRetorcido: 'componentesBatalla',
  singularidadCorruptaContenida: 'componentesBatalla',
  aleacionReforzadaElite: 'componentesBatalla',
  neuroChipCorruptoElite: 'componentesBatalla',
  matrizQuitinaCristalElite: 'componentesBatalla',
  nucleoSinapticoFracturadoElite: 'componentesBatalla',
  moduloManiobrasTácticasElite: 'componentesBatalla',
  placasCamuflajeActivoElite: 'componentesBatalla',
  placasDeAetheriumElite: 'componentesBatalla',
  nucleoPsionicoArmonicoElite: 'componentesBatalla',
  tejidoAbisalRetorcidoElite: 'componentesBatalla',
  singularidadCorruptaContenidaElite: 'componentesBatalla',

  // Materiales Exóticos
  nucleoSingularidad: 'materialesExoticos',
  planosMK2: 'materialesExoticos',
  planosDeInterceptor: 'materialesExoticos',
  planosMK3: 'materialesExoticos',
  planosMK4: 'materialesExoticos',
  planosMK5: 'materialesExoticos',
  planosMK6: 'materialesExoticos',
  planosMK7: 'materialesExoticos',
  planosMK8: 'materialesExoticos',
  planosMK9: 'materialesExoticos',
};
