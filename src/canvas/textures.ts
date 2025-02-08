import { Assets } from 'pixi.js'

import {
  TextureBlock,
  TextureLadder,
  TextureLongRampBottomLeft,
  TextureLongRampBottomRight,
  TextureLongRampTopLeft,
  TextureLongRampTopRight,
  TexturePlatform,
  TextureRampBottomLeft,
  TextureRampBottomRight,
  TextureRampTopLeft,
  TextureRampTopRight,
  TextureSpawn,
  TextureTerrain,
} from '../react_textures'

export const TEXTURES = {
  block: await Assets.load(TextureBlock),
  ladder: await Assets.load(TextureLadder),
  long_ramp_bottom_left: await Assets.load(TextureLongRampBottomLeft),
  long_ramp_bottom_right: await Assets.load(TextureLongRampBottomRight),
  long_ramp_top_left: await Assets.load(TextureLongRampTopLeft),
  long_ramp_top_right: await Assets.load(TextureLongRampTopRight),
  platform: await Assets.load(TexturePlatform),
  ramp_bottom_left: await Assets.load(TextureRampBottomLeft),
  ramp_bottom_right: await Assets.load(TextureRampBottomRight),
  ramp_top_left: await Assets.load(TextureRampTopLeft),
  ramp_top_right: await Assets.load(TextureRampTopRight),
  spawn: await Assets.load(TextureSpawn),
  terrain: await Assets.load(TextureTerrain),
}
