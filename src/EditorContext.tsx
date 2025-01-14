import { createContext, ReactNode, useContext, useState } from 'react'

import { LoadingOverlay, Modal } from '@mantine/core'
import { getHotkeyHandler, useDisclosure, useHotkeys } from '@mantine/hooks'

import { importFromJSON } from './bindings/import'
import { saveAsBMAP, saveAsJSON } from './bindings/save'
import { Binding } from './components/Binding'
import { useMapContext } from './MapContext'

type RootBinding = 'file'

type EditorInformation = {
  pressedRootBinding: RootBinding | null
}

const EditorContext = createContext<EditorInformation | null>(null)

export const EditorContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const { map, setNewMap } = useMapContext()
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, { open: openLoading, close: closeLoading }] =
    useDisclosure(false)

  const [pressedRootBinding, setPressedRootBinding] =
    useState<EditorInformation['pressedRootBinding']>(null)

  useHotkeys([['F', open]])

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
    <EditorContext.Provider value={{ pressedRootBinding }}>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'orange', type: 'bars', size: 'xl' }}
      />
      <Modal
        opened={opened && !loading}
        onClose={close}
        title="File options"
        centered
        onKeyDown={getHotkeyHandler([
          ['S', saveAsJSON(map)],
          ['D', saveAsBMAP(map)],
          ['X', udpateNewMap],
        ])}
      >
        <Binding binding="S" desc="Save file" />
        <Binding binding="D" desc="Save as bmap.txt" />
        <Binding binding="X" desc="Import map from JSON" />
      </Modal>
      {children}
    </EditorContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEditorContext = () => {
  const context = useContext(EditorContext)

  if (context === null) {
    throw new Error(
      'EditorContext: Component is not a child of a EditorContextProvider',
    )
  }

  return context
}
