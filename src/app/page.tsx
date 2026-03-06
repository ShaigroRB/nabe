'use client'
import { ErrorBoundary } from 'react-error-boundary'

import { EditorCanvas } from '@/canvas/Canvas'
import { Binding } from '@/components/Binding'
import { EditorContextProvider } from '@/editor/EditorContext'
import { MapContextProvider } from '@/mapContext/MapContext'
import { Group } from '@mantine/core'

// core styles are required for all packages

function App() {
  return (
    <MapContextProvider>
      <EditorContextProvider>
        <CollapseDesktop />
      </EditorContextProvider>
    </MapContextProvider>
  )
}

export default App

/**
 * Responsive shell with header, collapsable navbar and content.
 */
function CollapseDesktop() {
  return (
    <ErrorBoundary fallback={<div>Editor crashed</div>}>
      <EditorCanvas />
      <Group
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          width: '100%',
        }}
      >
        <Binding binding="F" desc="File" />
        <Binding binding="G" desc="Objects" />
        <Binding binding="C" desc="Clear map" />
        <Binding binding="D" desc="Toggle debug" />
        <Binding binding="F2" desc="Toggle logic mode" />
      </Group>
    </ErrorBoundary>
  )
}
