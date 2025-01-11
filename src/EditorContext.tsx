import { createContext, ReactNode, useContext, useState } from 'react'

import { Modal } from '@mantine/core'
import { getHotkeyHandler, useDisclosure, useHotkeys } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import { Binding } from './components/Binding'
import { writeFile } from './tauri/file'
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
  const { blocks } = useMapContext()
  const [opened, { open, close }] = useDisclosure(false)

  const [pressedRootBinding, setPressedRootBinding] =
    useState<EditorInformation['pressedRootBinding']>(null)

  useHotkeys([['F', open]])

  return (
    <EditorContext.Provider value={{ pressedRootBinding }}>
      <Modal
        opened={opened}
        onClose={close}
        title="File options"
        centered
        onKeyDown={getHotkeyHandler([
          [
            'S',
            async (e) => {
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
            },
          ],
        ])}
      >
        <Binding binding="S" desc="Save file" />
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
