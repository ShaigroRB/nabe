import { Container, Sprite } from 'pixi.js'

import { COLOR_BLUE, COLOR_PINK, COLOR_TYPE_NORMAL } from '../colors'
import { MapObjectProperties, MapObjectViaName } from '../map'

import { CELL_SIZE } from './grid'
import { loadPixiAsset } from './textures'
export async function drawMapObject<Name extends MapObjectProperties['name']>(
  layer: Container,
  mapObject: MapObjectViaName<Name>,
) {
  const texture = await loadPixiAsset(mapObject.name)

  // NEW_ASSET: update the switch case to draw the new asset
  switch (mapObject.name) {
    case 'block': {
      const block = new Sprite({
        texture,
        x: mapObject.x,
        y: mapObject.y,
        width: CELL_SIZE,
        height: CELL_SIZE,
        tint: COLOR_TYPE_NORMAL,
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
      })

      layer.addChild(ladder)

      break
    }
    case 'spawn': {
      const spawn = new Sprite({
        texture,
        x: mapObject.x,
        y: mapObject.y,
        width: CELL_SIZE,
        height: CELL_SIZE,
        tint: COLOR_PINK,
      })

      layer.addChild(spawn)

      break
    }
  }
}
