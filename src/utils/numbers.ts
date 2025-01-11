export const roundToNearestMultiple = (nb: number, step: number) =>
  Math.round(nb / step) * step
