import * as PIXI from 'pixi.js'

import { COLOR_PINK, COLOR_RED } from '../../colors'
import { CELL_SIZE } from '../grid'
import { TEXTURES } from '../textures'
import { DrawnObjProperties } from '../types'
import { getNearestLocalPosition } from '../utils'
import { ZINDEX_PREVIEW_PLACED_OBJECT } from '../zIndexes'

const ALPHA_PREVIEW_OBJECT = 0.3

// where block would be drawn if user clicks
const hoveredBlockGraphics = new PIXI.Graphics({
  alpha: ALPHA_PREVIEW_OBJECT,
  zIndex: ZINDEX_PREVIEW_PLACED_OBJECT,
})

let prevHoveredPos = { x: -1, y: -1 }

/**
 * Display a preview of the object to be drawn to the current coordinates
 *
 * This function takes:
 * - layer (`PIXI.Container`) where the preview of object is going to be drawn
 * - function to be called when the event is fired
 * - type of object to be drawn with additional properties for that object
 *
 * @example onMouseMove(dispatch, { obj: 'block', type: 'lava', ambience: 'rainy' })
 * @example onMouseMove(dispatch, { obj: 'spawn', type: 'player' })
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

    if (x === prevHoveredPos.x && y === prevHoveredPos.y) {
      return
    }

    // todo(perf): possible performance improvement for everything
    // we are removing all children to clear the preview, before adding the PIXI object
    // (graphics, sprite) that interests us
    layer.removeChildren()

    switch (properties.name) {
      case 'block': {
        hoveredBlockGraphics.clear()
        hoveredBlockGraphics.rect(x, y, CELL_SIZE, CELL_SIZE).fill(COLOR_RED)

        prevHoveredPos = { x, y }

        layer.addChild(hoveredBlockGraphics)
        // update map data info
        dispatch({ ...properties, x, y })
        break
      }
      case 'spawn': {
        const spawn = new PIXI.Sprite({
          alpha: ALPHA_PREVIEW_OBJECT,
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
