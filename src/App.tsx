import { ErrorBoundary } from 'react-error-boundary'

import { AppShell, Burger, Group } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Editor } from './canvas/Editor'
import { PlaceholderLogo } from './placeholders/PlaceholderLogo'
import { MapContextProvider } from './MapContext'

// core styles are required for all packages
import '@mantine/core/styles.css'

function App() {
  return (
    <ErrorBoundary fallback={<div>App or Mantine crashed</div>}>
      <MantineProvider>
        <MapContextProvider>
          <CollapseDesktop />
        </MapContextProvider>
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
    </ErrorBoundary>
  )
}
