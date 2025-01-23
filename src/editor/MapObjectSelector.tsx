import {
  Button,
  Drawer,
  DrawerProps,
  Group,
  Image,
  Stack,
  Text,
} from '@mantine/core'

import Spawn from '../assets/textures/spawn.png'
import { MapObjectName } from '../map'

import './tint.css'

const mapObjects: [MapObjectName, string][] = [
  [
    'block',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT37kAyd3Bk4V1hZNNpGuE1YTYeq_zJg0fdKQ&s',
  ],
  ['spawn', Spawn],
]

type Props = Pick<DrawerProps, 'opened' | 'onClose'> & {
  selectObj: (obj: MapObjectName) => void
}
export const MapObjectSelector = ({ opened, onClose, selectObj }: Props) => {
  return (
    <Drawer
      title="Select an object"
      position="right"
      size="xl"
      opened={opened}
      onClose={onClose}
    >
      <Stack>
        {mapObjects.map(([name, src]) => (
          <Button
            variant="subtle"
            key={name}
            onClick={() => {
              selectObj(name)
              onClose()
            }}
            display="block"
            w="200px"
          >
            <Group>
              <Image
                className={name === 'block' ? 'black' : 'pink'}
                src={src}
                width={32}
                height={32}
              />
              <Text>{name}</Text>
            </Group>
          </Button>
        ))}
      </Stack>
    </Drawer>
  )
}
