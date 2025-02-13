import * as PIXI from 'pixi.js'

import { COLOR_BLUE, COLOR_PINK, COLOR_TYPE_NORMAL } from '../../colors'
import { Coordinates } from '../../map'
import { CELL_SIZE } from '../grid'
import { TEXTURES } from '../textures'
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
 * @example onPointerDown(dispatch, { obj: 'spawn', type: 'player' })
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

    switch (properties.name) {
      case 'block': {
        const block = new PIXI.Sprite({
          texture: TEXTURES.block,
          x,
          y,
          width: CELL_SIZE,
          height: CELL_SIZE,
          tint: COLOR_TYPE_NORMAL,
        })

        layer.addChild(block)

        dispatch({ ...properties, x, y })
        break
      }
      case 'terrain': {
        const terrain = new PIXI.Sprite({
          texture: TEXTURES.terrain,
          x,
          y,
          width: CELL_SIZE * 4,
          height: CELL_SIZE * 2,
          tint: COLOR_TYPE_NORMAL,
        })

        layer.addChild(terrain)

        dispatch({ ...properties, x, y })
        break
      }
      case 'ladder': {
        const ladder = new PIXI.Sprite({
          texture: TEXTURES.ladder,
          x,
          y,
          width: CELL_SIZE,
          height: CELL_SIZE,
          tint: COLOR_BLUE,
        })

        layer.addChild(ladder)

        dispatch({ ...properties, x, y })
        break
      }
      case 'spawn': {
        const spawn = new PIXI.Sprite({
          texture: TEXTURES.spawn,
          x,
          y,
          width: CELL_SIZE,
          height: CELL_SIZE,
          tint: COLOR_PINK,
        })

        layer.addChild(spawn)

        dispatch({ ...properties, x, y })
        break
      }
    }
  }
}
