import { ErrorBoundary } from 'react-error-boundary'

import { Group, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { Editor } from './canvas/Editor'
import { Binding } from './components/Binding'
import { EditorContextProvider } from './EditorContext'
import { MapContextProvider } from './MapContext'

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
      <Editor />
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
      </Group>
    </ErrorBoundary>
  )
}
