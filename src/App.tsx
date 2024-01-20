import { useState } from 'react'

import { Button, FileButton, Group, Text } from '@mantine/core'
import { MantineProvider } from '@mantine/core'

import './App.css'

function App() {
  return (
    <MantineProvider>
      <Demo />
    </MantineProvider>
  )
}

export default App

function Demo() {
  const [file, setFile] = useState<File | null>(null)
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    </>
  )
}
