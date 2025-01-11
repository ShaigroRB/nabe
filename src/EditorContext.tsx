import { createContext, ReactNode, useContext, useState } from 'react'

import { useHotkeys } from '@mantine/hooks'

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
  const [pressedRootBinding, setPressedRootBinding] =
    useState<EditorInformation['pressedRootBinding']>(null)

  useHotkeys([['F', () => alert('hello')]])

  return (
    <EditorContext.Provider value={{ pressedRootBinding }}>
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
