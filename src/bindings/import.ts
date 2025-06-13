import { notifications } from '@mantine/notifications'

import { MapInformation } from '../map'
import { openFile, readFile } from '../tauri/file'

type ImportFromJSONResult =
  | { hasImport: false; map: null }
  | { hasImport: true; map: MapInformation }

export async function importFromJSON(): Promise<ImportFromJSONResult> {
  const { failed, filepath } = await openFile('Nabe JSON', ['nabe.json'])

  if (failed) {
    notifications.show({
      color: 'red',
      title: 'Cannot open multiple files',
      message: 'Please chose only one *.nabe.json',
    })
    return { hasImport: false, map: null }
  }

  if (filepath === null) {
    notifications.show({
      title: 'User canceled',
      message: 'poop',
    })
    return { hasImport: false, map: null }
  }

  const contents = await readFile(filepath)
  return { hasImport: true, map: JSON.parse(contents) }
}
