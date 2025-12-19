// src/data/resourceMetadata.ts
import metalRefinadoIcon from '../assets/images/ui/refined-metal-icon.png';
import aceroEstructuralIcon from '../assets/images/ui/structural-steel-icon.png';
import placasCascoIcon from '../assets/images/ui/hull-plate-icon.png';
import cableadoSuperconductorIcon from '../assets/images/ui/superconductor-wiring-icon.png';
import barraCombustibleIcon from '../assets/images/ui/fuel-rod-icon.png';
import aleacionReforzadaRobadaIcon from '../assets/images/ui/reinforced-alloy-icon.png';
import neuroChipCorruptoIcon from '../assets/images/ui/corrupt-neurochip-icon.png';
import nucleoSingularidadIcon from '../assets/images/ui/singularity-core-icon.png';
import fragmentosPlacaIcon from '../assets/images/ui/plate-fragments-icon.png';
import circuitosDañadosIcon from '../assets/images/ui/damaged-circuits-icon.png';
import matrizQuitinaCristalIcon from '../assets/images/ui/resources/Matriz Quitina-Cristal.png';
import nucleoSinapticoFracturadoIcon from '../assets/images/ui/resources/Núcleo Sináptico Fracturado.png';
import planosMK2Icon from '../assets/images/ui/resources/plano.png';
import moduloManiobrasTácticasIcon from '../assets/images/ui/resources/Módulo de Maniobras Tácticas.png';
import placasCamuflajeActivoIcon from '../assets/images/ui/resources/Placas de Camuflaje Activo.png';
import planosDeInterceptorIcon from '../assets/images/ui/resources/plano.png';
import placasDeAetheriumIcon from '../assets/images/ui/resources/Placas de Aetherium.png';
import nucleoPsionicoArmonicoIcon from '../assets/images/ui/resources/Núcleo Psiónico Armónico.png';
import planosMK3Icon from '../assets/images/ui/resources/plano.png';
import tejidoAbisalRetorcidoIcon from '../assets/images/ui/resources/Tejido Abisal Retorcido.png';
import singularidadCorruptaContenidaIcon from '../assets/images/ui/resources/Singularidad Corrupta Contenida.png';
import planosMK4Icon from '../assets/images/ui/resources/plano.png';
import aleacionReforzadaEliteIcon from '../assets/images/ui/reinforced-alloy-icon.png';
import neuroChipCorruptoEliteIcon from '../assets/images/ui/corrupt-neurochip-icon.png';
import planosMK5Icon from '../assets/images/ui/resources/plano.png';
import matrizQuitinaCristalEliteIcon from '../assets/images/ui/resources/Matriz Quitina-Cristal.png';
import nucleoSinapticoFracturadoEliteIcon from '../assets/images/ui/resources/Núcleo Sináptico Fracturado.png';
import planosMK6Icon from '../assets/images/ui/resources/plano.png';
import moduloManiobrasTácticasEliteIcon from '../assets/images/ui/resources/Módulo de Maniobras Tácticas.png';
import placasCamuflajeActivoEliteIcon from '../assets/images/ui/resources/Placas de Camuflaje Activo.png';
import planosMK7Icon from '../assets/images/ui/resources/plano.png';
import placasDeAetheriumEliteIcon from '../assets/images/ui/resources/Placas de Aetherium.png';
import nucleoPsionicoArmonicoEliteIcon from '../assets/images/ui/resources/Núcleo Psiónico Armónico.png';
import planosMK8Icon from '../assets/images/ui/resources/plano.png';
import tejidoAbisalRetorcidoEliteIcon from '../assets/images/ui/resources/Tejido Abisal Retorcido.png';
import singularidadCorruptaContenidaEliteIcon from '../assets/images/ui/resources/Singularidad Corrupta Contenida.png';
import planosMK9Icon from '../assets/images/ui/resources/plano.png';
import planoGenericoIcon from '../assets/images/ui/resources/plano.png'; // Nuevo import para el plano genérico

export const resourceMetadata: Record<string, { name: string; icon: string }> = {
  // Capítulo 1
  metalRefinado: { name: 'Metal Refinado', icon: metalRefinadoIcon },
  aceroEstructural: { name: 'Acero Estructural', icon: aceroEstructuralIcon },
  placasCasco: { name: 'Placas de Casco', icon: placasCascoIcon },
  cableadoSuperconductor: { name: 'Cableado Superconductor', icon: cableadoSuperconductorIcon },
  barraCombustible: { name: 'Barra de Combustible', icon: barraCombustibleIcon },
  aleacionReforzadaRobada: { name: 'Aleación Reforzada', icon: aleacionReforzadaRobadaIcon },
  neuroChipCorrupto: { name: 'Neuro-Chip Corrupto', icon: neuroChipCorruptoIcon },
  nucleoSingularidad: { name: 'Núcleo de Singularidad', icon: nucleoSingularidadIcon },
  fragmentosPlaca: { name: 'Fragmentos de Placa', icon: fragmentosPlacaIcon },
  circuitosDañados: { name: 'Circuitos Dañados', icon: circuitosDañadosIcon },
  // Capítulo 2
  matrizQuitinaCristal: { name: 'Matriz Quitina-Cristal', icon: matrizQuitinaCristalIcon },
  nucleoSinapticoFracturado: { name: 'Núcleo Sináptico Fracturado', icon: nucleoSinapticoFracturadoIcon },
  planosMK2: { name: 'Planos MK2', icon: planosMK2Icon },
  // Capítulo 3
  moduloManiobrasTácticas: { name: 'Módulo de Maniobras Tácticas', icon: moduloManiobrasTácticasIcon },
  placasCamuflajeActivo: { name: 'Placas de Camuflaje Activo', icon: placasCamuflajeActivoIcon },
  planosDeInterceptor: { name: 'Planos de Interceptor', icon: planosDeInterceptorIcon },
  // Capítulo 4
  placasDeAetherium: { name: 'Placas de Aetherium', icon: placasDeAetheriumIcon },
  nucleoPsionicoArmonico: { name: 'Núcleo Psiónico Armónico', icon: nucleoPsionicoArmonicoIcon },
  planosMK3: { name: 'Planos MK3', icon: planosMK3Icon },
  // Capítulo 5
  tejidoAbisalRetorcido: { name: 'Tejido Abisal Retorcido', icon: tejidoAbisalRetorcidoIcon },
  singularidadCorruptaContenida: { name: 'Singularidad Corrupta Contenida', icon: singularidadCorruptaContenidaIcon },
  planosMK4: { name: 'Planos MK4', icon: planosMK4Icon },
  // Capítulo 6
  aleacionReforzadaElite: { name: 'Aleación Reforzada (Élite)', icon: aleacionReforzadaEliteIcon },
  neuroChipCorruptoElite: { name: 'Neuro-Chip Corrupto (Élite)', icon: neuroChipCorruptoEliteIcon },
  planosMK5: { name: 'Planos MK5', icon: planosMK5Icon },
  // Capítulo 7
  matrizQuitinaCristalElite: { name: 'Matriz Quitina-Cristal (Élite)', icon: matrizQuitinaCristalEliteIcon },
  nucleoSinapticoFracturadoElite: { name: 'Núcleo Sináptico Fracturado (Élite)', icon: nucleoSinapticoFracturadoEliteIcon },
  planosMK6: { name: 'Planos MK6', icon: planosMK6Icon },
  // Capítulo 8
  moduloManiobrasTácticasElite: { name: 'Módulo de Maniobras Tácticas (Élite)', icon: moduloManiobrasTácticasEliteIcon },
  placasCamuflajeActivoElite: { name: 'Placas de Camuflaje Activo (Élite)', icon: placasCamuflajeActivoEliteIcon },
  planosMK7: { name: 'Planos MK7', icon: planosMK7Icon },
  // Capítulo 9
  placasDeAetheriumElite: { name: 'Placas de Aetherium (Élite)', icon: placasDeAetheriumEliteIcon },
  nucleoPsionicoArmonicoElite: { name: 'Núcleo Psiónico Armónico (Élite)', icon: nucleoPsionicoArmonicoEliteIcon },
  planosMK8: { name: 'Planos MK8', icon: planosMK8Icon },
  // Capítulo 10
  tejidoAbisalRetorcidoElite: { name: 'Tejido Abisal Retorcido (Élite)', icon: tejidoAbisalRetorcidoEliteIcon },
  singularidadCorruptaContenidaElite: { name: 'Singularidad Corrupta Contenida (Élite)', icon: singularidadCorruptaContenidaEliteIcon },
  planosMK9: { name: 'Planos MK9', icon: planosMK9Icon },
  planosGenericos: { name: 'Planos', icon: planoGenericoIcon },
};

