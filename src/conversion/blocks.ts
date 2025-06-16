import { CELL_SIZE } from '../canvas/grid'
import {
  Block,
  Coordinates,
  Ladder,
  LongRamp,
  MapObjectName,
  Ramp,
  Spawn,
  Terrain,
} from '../map'

import { BMAP_OBJ_INFO } from './info'

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

function getBaseBmapObjInfo(obj: MapObjectName) {
  const info = BMAP_OBJ_INFO[obj]
  // if id is 0 & not block, then non-animated tile
  // else, it's animated (strip)
  const isTile =
    (info.id === 0 && info.name !== 'Block (1x1)') || info.id === 255

  return {
    Name: info.name,
    ObjIndexID: info.id,
    ObjIsTile: isTile ? 1 : 0,
    Poly: info.name === 'Polygon Tool' ? 1 : 0,
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
    ...getBaseBmapObjInfo(block.name),
    LogicID: `${id}`,
    ID: `${id}`,
    Depth: 500,
    ObjType: 0,
    ObjSound: 0,
    Team: -1,
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
    Depth: '-250',
    Team: '0',
    ...getBaseBmapObjInfo(spawn.name),
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
    Depth: '500',
    Team: '0',
    ...getBaseBmapObjInfo(ladder.name),
  })
}

export function terrainToBmapTerrain(terrain: Terrain, id: number): BmapObject {
  return allJSONValuesToString({
    ...computeBaseBmapCoordinates(terrain),
    ID: id,
    LogicID: id,
    Depth: '500',
    ObjType: '0',
    ObjSound: '0',
    Team: '-1',
    ...getBaseBmapObjInfo(terrain.name),
  })
}

export function rampToBmapRamp(ramp: Ramp, id: number): BmapObject {
  const bmap = {
    ...computeBaseBmapCoordinates(ramp),
    ...getBaseBmapObjInfo(ramp.name),
    LogicID: `${id}`,
    ID: `${id}`,
    Depth: 500,
    ObjType: 0,
    ObjSound: 0,
    Team: -1,
  }
  return allJSONValuesToString(bmap)
}

export function longRampToBmapLongRamp(ramp: LongRamp, id: number): BmapObject {
  return allJSONValuesToString({
    ...computeBaseBmapCoordinates(ramp),
    ...getBaseBmapObjInfo(ramp.name),
    LogicID: `${id}`,
    ID: `${id}`,
    Depth: 500,
    ObjType: 0,
    ObjSound: 0,
    Team: -1,
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
