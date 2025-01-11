import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { appLocalDataDir } from '@tauri-apps/api/path'

/**
 * Tries to write a file to %localappdata%/com.shaigro.dev
 * Returns true if successful, false otherwise
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
