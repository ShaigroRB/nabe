import { ErrorBoundary } from 'react-error-boundary'

import { Kbd, MantineProvider, Text } from '@mantine/core'

import { Editor } from './canvas/Editor'
import { EditorContextProvider } from './EditorContext'
import { MapContextProvider } from './MapContext'

// core styles are required for all packages
import '@mantine/core/styles.css'

function App() {
  return (
    <ErrorBoundary fallback={<div>App or Mantine crashed</div>}>
      <MantineProvider>
        <EditorContextProvider>
          <MapContextProvider>
            <CollapseDesktop />
          </MapContextProvider>
        </EditorContextProvider>
      </MantineProvider>
    </ErrorBoundary>
  )
}

export default App

const Binding = ({ binding, desc }: { binding: string; desc: string }) => (
  <Text size="sm">
    <Kbd size="sm">{binding}</Kbd>: {desc}
  </Text>
)

/**
 * Responsive shell with header, collapsable navbar and content.
 */
function CollapseDesktop() {
  return (
    <ErrorBoundary fallback={<div>Editor crashed</div>}>
      <Editor />
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          width: '100%',
        }}
      >
        <Binding binding={'F'} desc={'File'} />
      </div>
    </ErrorBoundary>
  )
}
