import * as PIXI from 'pixi.js'

import { COLOR_BLACK, COLOR_PINK } from '../../colors'
import { CELL_SIZE } from '../grid'
import { TEXTURES } from '../textures'
import { getNearestLocalPosition } from '../utils'
import { ZINDEX_LAYER_BLOCKS } from '../zIndexes'

type Coordinates = { x: number; y: number }

export type ObjProperties =
  | ({ id: 'block'; type: string; ambience: string } & Coordinates)
  | ({ id: 'spawn'; type: string } & Coordinates)

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
  dispatch: (coords: Coordinates) => void,
  properties: ObjProperties,
) {
  return async (e: PIXI.FederatedPointerEvent) => {
    const { nearestX: x, nearestY: y } = getNearestLocalPosition(e, layer)

    // todo(perf): possible performance improvement for graphics
    // we aren't reusing graphics between each click, just recreating new ones

    switch (properties.id) {
      case 'block': {
        const blockGraphics = new PIXI.Graphics({ zIndex: ZINDEX_LAYER_BLOCKS })
        // draw a block to at the pointer position (snap it to the grid)
        blockGraphics.rect(x, y, CELL_SIZE, CELL_SIZE).fill(COLOR_BLACK)

        layer.addChild(blockGraphics)

        // update map data info
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
