import { CELL_SIZE } from '../canvas/grid'
import { Block, Ladder, Spawn, Terrain } from '../map'

type BmapObject = Record<string, string>

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
    Y: `${(block.y / CELL_SIZE) * 128}`,
    X: `${(block.x / CELL_SIZE) * 128}`,
    LogicID: `${id}`,
    ID: `${id}`,
    Poly: 0,
    ObjIsTile: 0,
    Depth: 500,
    ObjType: 0,
    ObjSound: 0,
    Name: 'Block (1x1)',
    Team: -1,
    ObjIndexID: 0,
  }
  return allJSONValuesToString(bmap)
}

export function spawnToBmapSpawn(spawn: Spawn, id: number): BmapObject {
  const bmap = {
    Y: `${(spawn.y / CELL_SIZE) * 128 + 64}`,
    X: `${(spawn.x / CELL_SIZE) * 128 + 64}`,
    LogicID: id,
    ID: id,
    Poly: '0',
    ObjIsTile: '0',
    Depth: '-250',
    Name: 'Player Spawn',
    Team: '0',
    ObjIndexID: '7',
  }
  return allJSONValuesToString(bmap)
}

export function ladderToBmapLadder(ladder: Ladder, id: number): BmapObject {
  return allJSONValuesToString({
    Y: `${(ladder.y / CELL_SIZE) * 128 + 64}`,
    X: `${(ladder.x / CELL_SIZE) * 128 + 64}`,
    ID: id,
    LogicID: id,
    Poly: '0',
    ObjIsTile: '0',
    Depth: '500',
    Name: 'Ladder (Metal)',
    Team: '0',
    ObjIndexID: '16',
  })
}

export function terrainToBmapTerrain(terrain: Terrain, id: number): BmapObject {
  return allJSONValuesToString({
    Y: `${(terrain.y / CELL_SIZE) * 128}`,
    X: `${(terrain.x / CELL_SIZE) * 128}`,
    ID: id,
    LogicID: id,
    Poly: '0',
    ObjIsTile: '0',
    Depth: '500',
    ObjType: '0',
    ObjSound: '0',
    Name: 'Terrain',
    Team: '-1',
    ObjIndexID: '5',
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
