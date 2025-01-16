import * as PIXI from 'pixi.js'

import SpawnTexture from '../assets/textures/spawn.png'

export const TEXTURES = {
  spawn: await PIXI.Assets.load(SpawnTexture),
}
