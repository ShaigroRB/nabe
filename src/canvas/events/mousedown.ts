import * as PIXI from 'pixi.js'

import { drawMapObject } from '../draw'
import { DrawnObjProperties } from '../types'
import { getNearestLocalPosition } from '../utils'

/**
 * Place an object to the current coordinates
 *
 * This function takes:
 * - layer (`PIXI.Container`) where the object is going to be drawn
 * - function to be called when the event is fired
 * - function to determine whether the object can be drawn or not
 * - type of object to be drawn with additional properties for that object
 *
 * It returns an async function that waits for a `PIXI.FederatedPointerEvent`.
 * `dispatch` is not called if `canBeDrawn` returns false.
 *
 * @example onPointerDown(drawingLayer, dispatch, canBlockBeDrawn { obj: 'block', type: 'lava', ambience: 'rainy' })
 * @example onPointerDown(neutralLayer, dispatch, canObjBeDrawn, { obj: 'spawn_player', type: 'player' })
 * @example onPointerDown(randLayer, dispatch, canBeDrawn, { obj: 'key', color: 0x00ff00 })
 */
export function onMouseDown(
  layer: PIXI.Container,
  dispatch: (coordinates: DrawnObjProperties) => void,
  canBeDrawn: (obj: DrawnObjProperties) => boolean,
  properties: DrawnObjProperties,
) {
  return async (e: PIXI.FederatedPointerEvent) => {
    const { nearestX: x, nearestY: y } = getNearestLocalPosition(e, layer)

    if (!canBeDrawn({ ...properties, x, y })) {
      return
    }
    // todo(perf): possible performance improvement for graphics
    // we aren't reusing graphics between each click, just recreating new ones

    await drawMapObject(layer, properties, { x, y })

    dispatch({ ...properties, x, y })
  }
}
