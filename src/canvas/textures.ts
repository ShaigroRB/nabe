import { Assets } from 'pixi.js'

import { MapObjectName } from '../map'
import {
  TextureBlock,
  TextureLadder,
  TextureLongRampBottomLeft,
  TextureLongRampBottomRight,
  TextureLongRampTopLeft,
  TextureLongRampTopRight,
  // TexturePlatform,
  TextureRampBottomLeft,
  TextureRampBottomRight,
  TextureRampTopLeft,
  TextureRampTopRight,
  TextureSpawnPlayer,
  TextureTerrain,
} from '../react_textures'

// NEW_ASSET: add alias & src to assets array

const assets: { alias: MapObjectName; src: string }[] = [
  { alias: 'block', src: TextureBlock },
  { alias: 'ladder', src: TextureLadder },
  { alias: 'long_ramp_bottom_left', src: TextureLongRampBottomLeft },
  { alias: 'long_ramp_bottom_right', src: TextureLongRampBottomRight },
  { alias: 'long_ramp_top_left', src: TextureLongRampTopLeft },
  { alias: 'long_ramp_top_right', src: TextureLongRampTopRight },
  // { alias: 'platform', src: TexturePlatform },
  { alias: 'ramp_bottom_left', src: TextureRampBottomLeft },
  { alias: 'ramp_bottom_right', src: TextureRampBottomRight },
  { alias: 'ramp_top_left', src: TextureRampTopLeft },
  { alias: 'ramp_top_right', src: TextureRampTopRight },
  { alias: 'spawn_player', src: TextureSpawnPlayer },
  { alias: 'terrain', src: TextureTerrain },
]

Assets.add(assets)

export async function loadPixiAsset(asset: MapObjectName) {
  return await Assets.load(asset)
}
