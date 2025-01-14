import { notifications } from '@mantine/notifications'

import { openFile, readFile } from '../tauri/file'
import { Block } from '../types'

export async function importFromJSON() {
  const { failed, filepath } = await openFile('Nabe JSON', ['nabe.json'])

  if (failed) {
    notifications.show({
      color: 'red',
      title: 'Cannot open multiple files',
      message: 'Please chose only one *.nabe.json',
    })
    return [] // todo: return the map with no modification
  }

  if (filepath === null) {
    notifications.show({
      title: 'User canceled',
      message: 'poop',
    })
    return [] // todo: return the map with no modification
  }

  const contents = await readFile(filepath)
  return [...JSON.parse(contents)] as Block[]
}
