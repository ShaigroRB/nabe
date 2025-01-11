import { ErrorBoundary } from 'react-error-boundary'

import { MantineProvider } from '@mantine/core'

import { Editor } from './canvas/Editor'
import { DebugContextProvider } from './DebugContext'
import { MapContextProvider } from './MapContext'

// core styles are required for all packages
import '@mantine/core/styles.css'

function App() {
  return (
    <ErrorBoundary fallback={<div>App or Mantine crashed</div>}>
      <DebugContextProvider>
        <MantineProvider>
          <MapContextProvider>
            <CollapseDesktop />
          </MapContextProvider>
        </MantineProvider>
      </DebugContextProvider>
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
    </ErrorBoundary>
  )
}
