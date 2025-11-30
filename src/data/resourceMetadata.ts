// src/data/resourceMetadata.ts
import metalRefinadoIcon from '../assets/images/ui/refined-metal-icon.png';
import aceroEstructuralIcon from '../assets/images/ui/structural-steel-icon.png';
import fragmentosPlacaIcon from '../assets/images/ui/plate-fragments-icon.png';
import circuitosDañadosIcon from '../assets/images/ui/damaged-circuits-icon.png';
import nucleoSingularidadIcon from '../assets/images/ui/singularity-core-icon.png';
import placasCascoIcon from '../assets/images/ui/hull-plate-icon.png';
import cableadoSuperconductorIcon from '../assets/images/ui/superconductor-wiring-icon.png';
import aleacionReforzadaIcon from '../assets/images/ui/reinforced-alloy-icon.png';
import neuroChipCorruptoIcon from '../assets/images/ui/corrupt-neurochip-icon.png';
import barraCombustibleIcon from '../assets/images/ui/fuel-rod-icon.png';
import matrizQuitinaCristalIcon from '../assets/images/ui/resources/Matriz Quitina-Cristal.png';
import nucleoSinapticoFracturadoIcon from '../assets/images/ui/resources/Núcleo Sináptico Fracturado.png';
import moduloManiobrasTacticasIcon from '../assets/images/ui/resources/Módulo de Maniobras Tácticas.png';
import placasCamuflajeActivoIcon from '../assets/images/ui/resources/Placas de Camuflaje Activo.png';
import placasDeAetheriumIcon from '../assets/images/ui/resources/Placas de Aetherium.png';
import nucleoPsionicoArmonicoIcon from '../assets/images/ui/resources/Núcleo Psiónico Armónico.png';
import tejidoAbisalRetorcidoIcon from '../assets/images/ui/resources/Tejido Abisal Retorcido.png';
import singularidadCorruptaContenidaIcon from '../assets/images/ui/resources/Singularidad Corrupta Contenida.png';
import planosIcon from '../assets/images/ui/resources/plano.png';

export const resourceMetadata: Record<string, { name: string; icon: string }> = {
  // Capítulo 1
  metalRefinado: { name: 'Metal Refinado', icon: metalRefinadoIcon },
  aceroEstructural: { name: 'Acero Estructural', icon: aceroEstructuralIcon },
  placasCasco: { name: 'Placas de Casco', icon: placasCascoIcon },
  cableadoSuperconductor: { name: 'Cableado Superconductor', icon: cableadoSuperconductorIcon },
  barraCombustible: { name: 'Barra de Combustible', icon: barraCombustibleIcon },
  aleacionReforzadaRobada: { name: 'Aleación Reforzada', icon: aleacionReforzadaIcon },
  neuroChipCorrupto: { name: 'Neuro-Chip Corrupto', icon: neuroChipCorruptoIcon },
  nucleoSingularidad: { name: 'Núcleo de Singularidad', icon: nucleoSingularidadIcon },
  fragmentosPlaca: { name: 'Fragmentos de Placa', icon: fragmentosPlacaIcon },
  circuitosDañados: { name: 'Circuitos Dañados', icon: circuitosDañadosIcon },
  // Capítulo 2
  matrizQuitinaCristal: { name: 'Matriz Quitina-Cristal', icon: matrizQuitinaCristalIcon },
  nucleoSinapticoFracturado: { name: 'Núcleo Sináptico Fracturado', icon: nucleoSinapticoFracturadoIcon },
  planosMK2: { name: 'Planos MK2', icon: planosIcon },
  // Capítulo 3
  moduloManiobrasTácticas: { name: 'Módulo de Maniobras Tácticas', icon: moduloManiobrasTacticasIcon },
  placasCamuflajeActivo: { name: 'Placas de Camuflaje Activo', icon: placasCamuflajeActivoIcon },
  planosDeInterceptor: { name: 'Planos de Interceptor', icon: planosIcon },
  // Capítulo 4
  placasDeAetherium: { name: 'Placas de Aetherium', icon: placasDeAetheriumIcon },
  nucleoPsionicoArmonico: { name: 'Núcleo Psiónico Armónico', icon: nucleoPsionicoArmonicoIcon },
  planosMK3: { name: 'Planos MK3', icon: planosIcon },
  // Capítulo 5
  tejidoAbisalRetorcido: { name: 'Tejido Abisal Retorcido', icon: tejidoAbisalRetorcidoIcon },
  singularidadCorruptaContenida: { name: 'Singularidad Corrupta Contenida', icon: singularidadCorruptaContenidaIcon },
  planosMK4: { name: 'Planos MK4', icon: planosIcon },
  // Capítulo 6
  aleacionReforzadaElite: { name: 'Aleación Reforzada (Élite)', icon: '' },
  neuroChipCorruptoElite: { name: 'Neuro-Chip Corrupto (Élite)', icon: '' },
  planosMK5: { name: 'Planos MK5', icon: planosIcon },
  // Capítulo 7
  matrizQuitinaCristalElite: { name: 'Matriz Quitina-Cristal (Élite)', icon: '' },
  nucleoSinapticoFracturadoElite: { name: 'Núcleo Sináptico Fracturado (Élite)', icon: '' },
  planosMK6: { name: 'Planos MK6', icon: planosIcon },
  // Capítulo 8
  moduloManiobrasTácticasElite: { name: 'Módulo de Maniobras Tácticas (Élite)', icon: '' },
  placasCamuflajeActivoElite: { name: 'Placas de Camuflaje Activo (Élite)', icon: '' },
  planosMK7: { name: 'Planos MK7', icon: planosIcon },
  // Capítulo 9
  placasDeAetheriumElite: { name: 'Placas de Aetherium (Élite)', icon: '' },
  nucleoPsionicoArmonicoElite: { name: 'Núcleo Psiónico Armónico (Élite)', icon: '' },
  planosMK8: { name: 'Planos MK8', icon: planosIcon },
  // Capítulo 10
  tejidoAbisalRetorcidoElite: { name: 'Tejido Abisal Retorcido (Élite)', icon: '' },
  singularidadCorruptaContenidaElite: { name: 'Singularidad Corrupta Contenida (Élite)', icon: '' },
  planosMK9: { name: 'Planos MK9', icon: planosIcon },
};
