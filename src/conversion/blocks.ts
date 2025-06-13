import { CELL_SIZE } from '../canvas/grid'
import { Block, Coordinates, Ladder, Spawn, Terrain } from '../map'

import { OBJ_INDEX_IDS } from './ids'

/**
 * Grid width & height are usually the same in game.
 * I'm using the default one since it's very rarely changed by players.
 * The unit is in pixels.
 */
const BMAP_GRID_SIZE = 128
const BMAP_MIDDLE_GRID_SIZE = BMAP_GRID_SIZE / 2

type BmapObject = Record<string, string>

function nabeCoordToBmapCoord(n: number) {
  return (n / CELL_SIZE) * BMAP_GRID_SIZE
}
function computeBaseBmapCoordinates(coords: Coordinates) {
  return {
    X: nabeCoordToBmapCoord(coords.x),
    Y: nabeCoordToBmapCoord(coords.y),
  }
}

function allJSONValuesToString(json: Record<string, unknown>) {
  const result: Record<string, string> = {}
  for (const key in json) {
    if (json[key] != null) {
      result[key] = `${json[key]}`
    }
  }
  return result
}

/**
 * `id` is usually the index of the block in an array of blocks
 */
export function blockToBmapBlock(block: Block, id: number): BmapObject {
  const bmap = {
    ...computeBaseBmapCoordinates(block),
    LogicID: `${id}`,
    ID: `${id}`,
    Poly: 0,
    ObjIsTile: 0,
    Depth: 500,
    ObjType: 0,
    ObjSound: 0,
    Name: 'Block (1x1)',
    Team: -1,
    ObjIndexID: OBJ_INDEX_IDS.block,
  }
  return allJSONValuesToString(bmap)
}

export function spawnToBmapSpawn(spawn: Spawn, id: number): BmapObject {
  const { X, Y } = computeBaseBmapCoordinates(spawn)
  const bmap = {
    X: X + BMAP_MIDDLE_GRID_SIZE,
    Y: Y + BMAP_MIDDLE_GRID_SIZE,
    LogicID: id,
    ID: id,
    Poly: '0',
    ObjIsTile: '0',
    Depth: '-250',
    Name: 'Player Spawn',
    Team: '0',
    ObjIndexID: OBJ_INDEX_IDS.spawn,
  }
  return allJSONValuesToString(bmap)
}

export function ladderToBmapLadder(ladder: Ladder, id: number): BmapObject {
  const { X, Y } = computeBaseBmapCoordinates(ladder)
  return allJSONValuesToString({
    X: X + BMAP_MIDDLE_GRID_SIZE,
    Y: Y + BMAP_MIDDLE_GRID_SIZE,
    ID: id,
    LogicID: id,
    Poly: '0',
    ObjIsTile: '0',
    Depth: '500',
    Name: 'Ladder (Metal)',
    Team: '0',
    ObjIndexID: OBJ_INDEX_IDS.ladder,
  })
}

export function terrainToBmapTerrain(terrain: Terrain, id: number): BmapObject {
  return allJSONValuesToString({
    ...computeBaseBmapCoordinates(terrain),
    ID: id,
    LogicID: id,
    Poly: '0',
    ObjIsTile: '0',
    Depth: '500',
    ObjType: '0',
    ObjSound: '0',
    Name: 'Terrain',
    Team: '-1',
    ObjIndexID: OBJ_INDEX_IDS.terrain,
  })
}
/**
 * Create a single object representing the entirety of a BMAP.
 *
 * For example:
 * `[{ ...A }, { ...B }]` becomes `{ "OBJ0": { ...A }, "OBJ1": { ...B }}`
 */
export function bmapObjsToRecordBmapObjs(objs: BmapObject[]) {
  return objs.reduce(
    (acc, obj, index) => {
      acc[`OBJ${index}`] = obj
      return acc
    },
    {} as Record<string, BmapObject>,
  )
}
