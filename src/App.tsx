import { ErrorBoundary } from 'react-error-boundary'

import { Group, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { EditorCanvas } from './canvas/Canvas'
import { Binding } from './components/Binding'
import { EditorContextProvider } from './editor/EditorContext'
import { MapContextProvider } from './mapContext/MapContext'

// core styles are required for all packages
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

function App() {
  return (
    <ErrorBoundary fallback={<div>App or Mantine crashed</div>}>
      <MantineProvider>
        <MapContextProvider>
          <EditorContextProvider>
            <CollapseDesktop />
          </EditorContextProvider>
        </MapContextProvider>
        <Notifications />
      </MantineProvider>
    </ErrorBoundary>
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
      </Group>
    </ErrorBoundary>
  )
}
