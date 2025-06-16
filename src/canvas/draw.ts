import { Container, Sprite, SpriteOptions } from 'pixi.js'

import { COLOR_BLUE, COLOR_PINK, COLOR_TYPE_NORMAL } from '../colors'
import { MapObjectProperties } from '../map'

import { CELL_SIZE } from './grid'
import { loadPixiAsset } from './textures'
import { DrawnObjProperties } from './types'

type AdditionalSpriteOptionsProperties = Omit<
  SpriteOptions,
  'width' | 'height' | 'texture'
>

export async function drawMapObject(
  layer: Container,
  mapObject: MapObjectProperties | DrawnObjProperties,
  additionalMapObjectSpriteOptionsProps: AdditionalSpriteOptionsProperties = {},
) {
  const texture = await loadPixiAsset(mapObject.name)

  // NEW_ASSET: update the switch case to draw the new asset
  switch (mapObject.name) {
    case 'ramp_bottom_left':
    case 'ramp_bottom_right':
    case 'ramp_top_left':
    case 'ramp_top_right':
    case 'block': {
      const block = new Sprite({
        texture,
        x: mapObject.x,
        y: mapObject.y,
        width: CELL_SIZE,
        height: CELL_SIZE,
        tint: COLOR_TYPE_NORMAL,
        ...additionalMapObjectSpriteOptionsProps,
      })

      layer.addChild(block)

      break
    }
    case 'terrain': {
      const terrain = new Sprite({
        texture,
        x: mapObject.x,
        y: mapObject.y,
        width: CELL_SIZE * 4,
        height: CELL_SIZE * 2,
        tint: COLOR_TYPE_NORMAL,
        ...additionalMapObjectSpriteOptionsProps,
      })

      layer.addChild(terrain)

      break
    }
    case 'ladder': {
      const ladder = new Sprite({
        texture,
        x: mapObject.x,
        y: mapObject.y,
        width: CELL_SIZE,
        height: CELL_SIZE,
        tint: COLOR_BLUE,
        ...additionalMapObjectSpriteOptionsProps,
      })

      layer.addChild(ladder)

      break
    }
    case 'spawn_player': {
      const spawn = new Sprite({
        texture,
        x: mapObject.x,
        y: mapObject.y,
        width: CELL_SIZE,
        height: CELL_SIZE,
        tint: COLOR_PINK,
        ...additionalMapObjectSpriteOptionsProps,
      })

      layer.addChild(spawn)

      break
    }
  }
}
