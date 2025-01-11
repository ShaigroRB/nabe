import { ErrorBoundary } from 'react-error-boundary'

import { AppShell, Burger, Group } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Editor } from './canvas/Editor'
import { PlaceholderLogo } from './placeholders/PlaceholderLogo'

// core styles are required for all packages
import '@mantine/core/styles.css'

function App() {
  return (
    <ErrorBoundary fallback={<div>App or Mantine crashed</div>}>
      <MantineProvider>
        <CollapseDesktop />
      </MantineProvider>
    </ErrorBoundary>
  )
}

export default App

/**
 * Responsive shell with header, collapsable navbar and content.
 */
function CollapseDesktop() {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  return (
    <AppShell
      header={{ height: 60 }}
      aside={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: !desktopOpened },
      }}
      padding={0}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <PlaceholderLogo size={30} />
        </Group>
      </AppShell.Header>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
      <AppShell.Main
        style={{
          marginLeft: '4rem',
          padding: 0,
          paddingTop: 60,
          height: '100%',
          border: '1px red dotted',
        }}
      >
        <ErrorBoundary fallback={<div>Editor crashed</div>}>
          <Editor />
        </ErrorBoundary>
      </AppShell.Main>
    </AppShell>
  )
}
