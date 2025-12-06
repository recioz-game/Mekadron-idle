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

  // Usa toPrecision para un mejor control y luego elimina los ceros innecesarios
  let formattedNumber;
  if (scaled < 10) {
    formattedNumber = scaled.toPrecision(3);
  } else if (scaled < 100) {
    formattedNumber = scaled.toPrecision(3);
  } else {
    formattedNumber = scaled.toPrecision(3);
  }

  // Elimina los ".0" al final y los ceros sobrantes
  return parseFloat(formattedNumber).toString() + suffix;
};
