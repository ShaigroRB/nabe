import { notifications } from '@mantine/notifications'

import {
  blockToBmapBlock,
  bmapObjsToRecordBmapObjs,
  ladderToBmapLadder,
  smallRampToBmapSmallRamp,
  spawnToBmapSpawn,
  terrainToBmapTerrain,
} from '../conversion/blocks'
import { defaultConfig } from '../conversion/config'
import { MapInformation } from '../map'
import { writeFile } from '../tauri/file'

export function saveAsJSON(map: MapInformation) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- dunno what's the type of this event in this situation but not important
  return async (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    const { failed, filepath } = await writeFile(
      JSON.stringify(map),
      'map.nabe.json',
    )

    if (!failed) {
      notifications.show({
        title: 'File saved',
        message: `Saved at ${filepath}map.nabe.json`,
      })
    } else {
      notifications.show({
        color: 'red',
        title: 'Failed to save file',
        message: `Failed to save at ${filepath}`,
      })
    }
  }
}

// NEW_ASSET: adapt conversion to bmap.txt
function createBmapContent(map: MapInformation) {
  const bmapBlocks = map.blocks.map(blockToBmapBlock)
  const bmapTerrains = map.terrains.map(terrainToBmapTerrain)
  const bmapLadders = map.ladders.map(ladderToBmapLadder)
  const bmapSpawns = map.spawns.map(spawnToBmapSpawn)
  const bmapSmallRamps = map.small_ramps.map(smallRampToBmapSmallRamp)
  const bmap: Record<string, Record<string, string>> = {
    Config: defaultConfig,
    ...bmapObjsToRecordBmapObjs([
      ...bmapBlocks,
      ...bmapLadders,
      ...bmapSpawns,
      ...bmapTerrains,
      ...bmapSmallRamps,
    ]),
  }

  return `Nabe content\n0\n-1\n${JSON.stringify(bmap)}\n{}`
}

export function saveAsBMAP(map: MapInformation) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- dunno what's the type of this event in this situation but not important
  return async (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    const content = createBmapContent(map)

    const { failed, filepath } = await writeFile(content, 'bmap.txt')

    if (!failed) {
      notifications.show({
        title: 'File saved',
        message: `Saved at ${filepath}bmap.txt`,
      })
    } else {
      notifications.show({
        color: 'red',
        title: 'Failed to save file',
        message: `Failed to save at ${filepath}`,
      })
    }
  }
}
