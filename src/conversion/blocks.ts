import { CELL_SIZE } from '../canvas/grid'
import { Block } from '../types'

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
