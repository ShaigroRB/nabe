import * as PIXI from 'pixi.js'

import { Coordinates } from '../../map'
import { drawMapObject } from '../draw'
import { DrawnObjProperties } from '../types'
import { getNearestLocalPosition } from '../utils'

/**
 * Place an object to the current coordinates
 *
 * This function takes:
 * - layer (`PIXI.Container`) where the object is going to be drawn
 * - function to be called when the event is fired
 * - type of object to be drawn with additional properties for that object
 *
 * @example onPointerDown(dispatch, { obj: 'block', type: 'lava', ambience: 'rainy' })
 * @example onPointerDown(dispatch, { obj: 'spawn_player', type: 'player' })
 * @example onPointerDown(dispatch, { obj: 'key', color: 0x00ff00 })
 *
 * It returns an async function that waits for a `PIXI.FederatedPointerEvent`.
 */
export function onPointerDown(
  layer: PIXI.Container,
  dispatch: (coordinates: Coordinates) => void,
  properties: DrawnObjProperties,
) {
  return async (e: PIXI.FederatedPointerEvent) => {
    console.log(e)
    const { nearestX: x, nearestY: y } = getNearestLocalPosition(e, layer)

    // todo(perf): possible performance improvement for graphics
    // we aren't reusing graphics between each click, just recreating new ones

    await drawMapObject(layer, properties, { x, y })

    dispatch({ ...properties, x, y })
  }
}
