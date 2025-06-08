import * as PIXI from 'pixi.js'

import { COLOR_RED } from '../../colors'
import { CELL_SIZE } from '../grid'
import { loadPixiAsset } from '../textures'
import { DrawnObjProperties } from '../types'
import { getNearestLocalPosition } from '../utils'

const ALPHA_PREVIEW_OBJECT = 0.3

// where block would be drawn if user clicks

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

    // todo(perf): possible performance improvement for everything
    // we are removing all children to clear the preview, before adding the PIXI object
    // (graphics, sprite) that interests us
    layer.removeChildren()

    const texture = await loadPixiAsset(properties.name)

    // NEW_ASSET: update the switch case to draw the new asset
    switch (properties.name) {
      case 'block': {
        const block = new PIXI.Sprite({
          alpha: ALPHA_PREVIEW_OBJECT,
          texture,
          x,
          y,
          width: CELL_SIZE,
          height: CELL_SIZE,
          tint: COLOR_RED,
        })

        layer.addChild(block)
        // update map data info
        dispatch({ ...properties, x, y })
        break
      }
      case 'ladder': {
        const ladder = new PIXI.Sprite({
          alpha: ALPHA_PREVIEW_OBJECT,
          texture,
          x,
          y,
          width: CELL_SIZE,
          height: CELL_SIZE,
          tint: COLOR_RED,
        })

        layer.addChild(ladder)

        dispatch({ ...properties, x, y })
        break
      }
      case 'spawn': {
        const spawn = new PIXI.Sprite({
          alpha: ALPHA_PREVIEW_OBJECT,
          texture,
          x,
          y,
          width: CELL_SIZE,
          height: CELL_SIZE,
          tint: COLOR_RED,
        })

        layer.addChild(spawn)

        dispatch({ ...properties, x, y })
        break
      }
      case 'terrain': {
        const terrain = new PIXI.Sprite({
          alpha: ALPHA_PREVIEW_OBJECT,
          texture,
          x,
          y,
          width: CELL_SIZE * 4,
          height: CELL_SIZE * 2,
          tint: COLOR_RED,
        })

        layer.addChild(terrain)

        dispatch({ ...properties, x, y })
        break
      }
    }
  }
}
