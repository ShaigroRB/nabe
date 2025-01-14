import { notifications } from '@mantine/notifications'

import {
  blockToBmapBlock,
  bmapObjsToRecordBmapObjs,
} from '../conversion/blocks'
import { defaultConfig } from '../conversion/config'
import { writeFile } from '../tauri/file'
import { Block } from '../types'

export function saveAsJSON(blocks: unknown) {
  return async (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    const { failed, filepath } = await writeFile(
      JSON.stringify(blocks),
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

function createBmapContent(blocks: Block[]) {
  const bmapBlocks = blocks.map(blockToBmapBlock)
  const map: Record<string, Record<string, string>> = {
    Config: defaultConfig,
    ...bmapObjsToRecordBmapObjs(bmapBlocks),
  }

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
