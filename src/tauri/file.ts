import { open } from '@tauri-apps/api/dialog'
import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import { appLocalDataDir } from '@tauri-apps/api/path'

/**
 * Tries to write a file to %localappdata%/com.shaigro.dev
 * Can return:
 * - `{failed: true, filepath: null}`: File successfully written
 * - `{failed: false, filepath}`: Failed to write the file
 */
export const writeFile = async (content: string, filename: string) => {
  let filepath = ''
  try {
    await writeTextFile(filename, content, { dir: BaseDirectory.AppLocalData })
    filepath = await appLocalDataDir()
  } catch (error) {
    console.error(error)

    return { failed: true, filepath: null }
  }
  return { failed: false, filepath }
}

/**
 * Tries to open a file from %localappdata%/com.shaigro.dev
 * Can return:
 * - `{failed: false, filepath}`: User chose a file
 * - `{failed: false, filepath: null}`: User canceled
 * - `{failed: true, filepath: null}`: User chose multiple files
 */
export const openFile = async (name: string, extensions: string[]) => {
  // Open a selection dialog for image files
  const selected = await open({
    defaultPath: await appLocalDataDir(),
    filters: [{ name, extensions }],
  })
  if (Array.isArray(selected)) {
    // user selected multiple files
    return { failed: true, filepath: null }
  } else if (selected === null) {
    // user cancelled the selection
    return { failed: false, filepath: null }
  } else {
    // user selected a single file
    return { failed: false, filepath: selected }
  }
}

export const readFile = async (filepath: string) => {
  return await readTextFile(filepath)
}
