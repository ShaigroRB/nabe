import { AppShell, Burger, Group, Skeleton } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Editor } from './canvas/Editor'
import { PlaceholderLogo } from './placeholders/PlaceholderLogo'

// core styles are required for all packages
import '@mantine/core/styles.css'

function App() {
  return (
    <MantineProvider>
      <CollapseDesktop />
    </MantineProvider>
  )
}

export default App

/**
 * Responsive shell with header, collapsable navbar and content.
 */
function CollapseDesktop() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  return (
    <AppShell
      header={{ height: 60 }}
      aside={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={0}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <PlaceholderLogo size={30} />
        </Group>
      </AppShell.Header>
      <AppShell.Aside p="md">
        Aside
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Aside>
      <AppShell.Main
        style={{
          marginLeft: '4rem',
          padding: 0,
          paddingTop: 60,
          height: '100%',
          border: '1px red dotted',
        }}
      >
        <Editor />
      </AppShell.Main>
    </AppShell>
  )
}
