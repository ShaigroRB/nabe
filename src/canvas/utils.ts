import * as PIXI from 'pixi.js'

import { roundDownToNearestPositiveMultiple } from '../utils/numbers'

import { CELL_SIZE } from './grid'

/**
 * Get nearest local position from a container.
 * Based on `CELL_SIZE`.
 */
export function getNearestLocalPosition(
  evt: PIXI.FederatedPointerEvent,
  container: PIXI.Container,
) {
  const localPosition = evt.getLocalPosition(container)
  const nearestX = roundDownToNearestPositiveMultiple(
    localPosition.x,
    CELL_SIZE,
  )
  const nearestY = roundDownToNearestPositiveMultiple(
    localPosition.y,
    CELL_SIZE,
  )

  return { nearestX, nearestY }
}
