import * as PIXI from 'pixi.js'

import { COLOR_RED } from '../../colors'
import { drawMapObject } from '../draw'
import { DrawnObjProperties } from '../types'
import { getNearestLocalPosition } from '../utils'

const ALPHA_PREVIEW_OBJECT = 0.3

/**
 * Display a preview of the object to be drawn to the current coordinates
 *
 * This function takes:
 * - layer (`PIXI.Container`) where the preview of object is going to be drawn
 * - function to be called when the event is fired
 * - type of object to be drawn with additional properties for that object
 *
 * @example onMouseMove(dispatch, { obj: 'block', type: 'lava', ambience: 'rainy' })
 * @example onMouseMove(dispatch, { obj: 'spawn_player', type: 'player' })
 * @example onMouseMove(dispatch, { obj: 'key', color: 0x00ff00 })
 *
 * It returns an async function that waits for a `PIXI.FederatedPointerEvent`.
 */
export function onMouseMove(
  layer: PIXI.Container,
  dispatch: (properties: DrawnObjProperties) => void,
  properties: DrawnObjProperties,
) {
  return async (e: PIXI.FederatedPointerEvent) => {
    const { nearestX: x, nearestY: y } = getNearestLocalPosition(e, layer)

    // todo(perf): possible performance improvement for everything
    // we are removing all children to clear the preview, before adding the PIXI object
    // (graphics, sprite) that interests us
    layer.removeChildren()

    await drawMapObject(layer, properties, {
      x,
      y,
      alpha: ALPHA_PREVIEW_OBJECT,
      tint: COLOR_RED,
    })

    dispatch({ ...properties, x, y })
  }
}
