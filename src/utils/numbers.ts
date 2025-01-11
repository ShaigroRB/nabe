export const roundDownToNearestPositiveMultiple = (
  nb: number,
  step: number,
) => {
  const result = Math.floor(nb / step) * step
  return result > 0 ? result : 0
}
