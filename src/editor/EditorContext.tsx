import { createContext, ReactNode } from 'react'

import { Box, LoadingOverlay } from '@mantine/core'
import { getHotkeyHandler, useDisclosure, useHotkeys } from '@mantine/hooks'

import { importFromJSON } from '../bindings/import'
import { saveAsBMAP, saveAsJSON } from '../bindings/save'
import { emptyMap } from '../constants'
import { useMapContext } from '../mapContext/MapContext'

import { FileOptions } from './FileOptions'

type ObjectType = 'block' | 'spawn'

export type EditorContextInformation = {
  selectedObjectType: ObjectType
}

const EditorContext = createContext<EditorContextInformation | null>(null)

export const EditorContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {
    state: { map, selected },
    setNewMap,
    dispatch,
  } = useMapContext()
  const [
    openedFileOptions,
    { open: openFileOptions, close: closeFileOptions },
  ] = useDisclosure(false)
  const [loading, { open: openLoading, close: closeLoading }] =
    useDisclosure(false)

  useHotkeys([
    ['F', openFileOptions],
    [
      'G',
      () => {
        const { name } = selected
        dispatch({
          type: 'update_selected_map_object',
          name: name === 'block' ? 'spawn' : 'block',
        })
      },
    ],
    [
      'C',
      () => {
        setNewMap(emptyMap)
      },
    ],
  ])

  const udpateNewMap = async () => {
    const { hasImport, map: newMap } = await importFromJSON()
    if (!hasImport) {
      return
    }

    setNewMap(newMap)
    // to display loading overlay
    setTimeout(() => {
      closeLoading()
    }, 700)
    openLoading()
  }

  return (
    <EditorContext.Provider value={{ selectedObjectType: selected.name }}>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'orange', type: 'bars', size: 'xl' }}
      />
      <FileOptions
        opened={openedFileOptions && !loading}
        onClose={closeFileOptions}
        onKeyDown={getHotkeyHandler([
          ['S', saveAsJSON(map)],
          ['D', saveAsBMAP(map)],
          ['X', udpateNewMap],
        ])}
      />
      <Box>{children}</Box>
    </EditorContext.Provider>
  )
}
