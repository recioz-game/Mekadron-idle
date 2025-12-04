export const formatNumber = (num: number, format: 'full' | 'abbreviated' | 'scientific' = 'abbreviated'): string => {
  if (format === 'full') {
    return Math.floor(num).toLocaleString('es-ES');
  }

  if (format === 'scientific' && num >= 1000) {
    return num.toExponential(2);
  }

  // Lógica para 'abbreviated' (o por defecto)
  if (num < 1000) {
    return Math.floor(num).toString();
  }

  const suffixes = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);

  if (tier >= suffixes.length) {
    return num.toExponential(2);
  }

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  // Formateo mejorado para evitar ".0" innecesarios y mostrar más precisión
  if (scaled < 10) {
    return scaled.toFixed(2) + suffix;
  } else if (scaled < 100) {
    return scaled.toFixed(1) + suffix;
  } else {
    return Math.floor(scaled) + suffix;
  }
};
