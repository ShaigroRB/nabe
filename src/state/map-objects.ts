export type Block = { x: number; y: number; size: number }

type MapObjectsState = {
  blocks: Block[]
}
export const mapObjects: MapObjectsState = {
  blocks: [],
}

export function addBlock(block: Block) {
  mapObjects.blocks.push(block)
}
