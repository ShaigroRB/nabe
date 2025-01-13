import { notifications } from '@mantine/notifications'

import { CELL_SIZE } from '../canvas/grid'
import { writeFile } from '../tauri/file'
import { Block } from '../types'

export function saveAsJSON(blocks: unknown) {
  return async (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    const { failed, filepath } = await writeFile(
      JSON.stringify(blocks),
      'nabe.json',
    )

    if (!failed) {
      notifications.show({
        title: 'File saved',
        message: `Saved at ${filepath}nabe.json`,
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

function convertValuesToStrings(json: Record<string, unknown>) {
  const result: Record<string, string> = {}
  for (const key in json) {
    if (json[key] != null) {
      result[key] = `${json[key]}`
    }
  }
  return result
}

function blocksToBmap(blocks: Block[]) {
  const objects = blocks.map((block, index) => {
    return convertValuesToStrings({
      Y: `${(block.y / CELL_SIZE) * 128}`,
      X: `${(block.x / CELL_SIZE) * 128}`,
      LogicID: `${index}`,
      ID: `${index}`,
      Poly: 0,
      ObjIsTile: 0,
      Depth: 500,
      ObjType: 0,
      ObjSound: 0,
      Name: 'Block (1x1)',
      Team: -1,
      ObjIndexID: 0,
    })
  })
  return objects
}

const defaultConfig = {
  Bkgd2XOff: '0',
  Author: 'Shaigro',
  TotalGates: '11',
  Bkgd1MD5: '',
  Bkgd2YTile: '1',
  SeaLevel: '0',
  Ambience: '0',
  Bkgd2Hspeed: '0',
  MapWidth: '10112',
  ShowLog: '0',
  Bkgd3XTile: '1',
  Bkgd2HPara: '0',
  Bkgd1XTile: '1',
  Bkgd1File: '',
  BkgdColor2: '10835578',
  ShowPath: '0',
  Bkgd1AmbCol: '4210752',
  Preview: '',
  Bkgd1VPara: '0',
  Bkgd3Vspeed: '0',
  Bkgd3VPara: '0',
  Bkgd2YOff: '0',
  Workshop: '-1',
  Bkgd1Vspeed: '0',
  Bkgd3File: '',
  SeaDepth: '-200',
  Bkgd3MD5: '',
  DivChc: '25',
  BkgdColor1: '14802633',
  MapHeight: '2944',
  Bkgd1Hspeed: '0',
  Bkgd3YTile: '1',
  ShowCol: '0',
  Bkgd1YTile: '1',
  Bkgd3XOff: '0',
  Bkgd3Hspeed: '0',
  Bkgd2XTile: '1',
  SeaType: '0',
  Bkgd1YOff: '0',
  Bkgd1HPara: '0',
  Bkgd3HPara: '0',
  Name: 'Boring Map',
  Bkgd2File: '',
  Bkgd1XOff: '0',
  Bkgd3YOff: '0',
  Bkgd1Amb: '8',
  DecalDepth: '-200',
  Bkgd2Vspeed: '0',
  Bkgd2MD5: '',
  Climb: '0',
  Bkgd2VPara: '0',
}

function createBmapContent(blocks: Block[]) {
  const bmapBlocks = blocksToBmap(blocks)
  const map: Record<string, Record<string, string>> = { Config: defaultConfig }

  bmapBlocks.forEach((block, index) => {
    const key = `OBJ${index}`
    map[key] = block
  })

  return `Nabe content\n0\n-1\n${JSON.stringify(map)}\n{}`
}

export function saveAsBMAP(blocks: Block[]) {
  return async (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    const content = createBmapContent(blocks)

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
