import { useState } from 'react'

import {
  Button,
  Drawer,
  DrawerProps,
  Group,
  Image,
  Input,
  Stack,
  Text,
} from '@mantine/core'

import { MapObjectName } from '../map'
import {
  TextureBlock,
  TextureLadder,
  TextureLongRampBottomLeft,
  TextureLongRampBottomRight,
  TextureLongRampTopLeft,
  TextureLongRampTopRight,
  TextureRampBottomLeft,
  TextureRampBottomRight,
  TextureRampTopLeft,
  TextureRampTopRight,
  TextureSpawnPlayer,
  TextureTerrain,
} from '../react_textures'

import './tint.css'

const tints = [
  'pink',
  'red',
  'green',
  'blue',
  'normal',
  'poison',
  'noweap',
  'icy',
  'heal',
  'dmg',
  'death',
  'burn',
  'bouncy',
  'ammo',
] as const
type TextureImgSrc = string
type Tint = (typeof tints)[number]

// NEW_ASSET: add new map object corresponding to new asset
const mapObjects: [MapObjectName, TextureImgSrc, Tint][] = [
  ['block', TextureBlock, 'normal'],
  ['spawn_player', TextureSpawnPlayer, 'pink'],
  ['ladder', TextureLadder, 'blue'],
  ['terrain', TextureTerrain, 'normal'],
  ['ramp_bottom_left', TextureRampBottomLeft, 'normal'],
  ['ramp_bottom_right', TextureRampBottomRight, 'normal'],
  ['ramp_top_left', TextureRampTopLeft, 'normal'],
  ['ramp_top_right', TextureRampTopRight, 'normal'],
  ['long_ramp_bottom_left', TextureLongRampBottomLeft, 'normal'],
  ['long_ramp_bottom_right', TextureLongRampBottomRight, 'normal'],
  ['long_ramp_top_left', TextureLongRampTopLeft, 'normal'],
  ['long_ramp_top_right', TextureLongRampTopRight, 'normal'],
]

type Props = Pick<DrawerProps, 'opened' | 'onClose'> & {
  selectObj: (obj: MapObjectName) => void
}
export const MapObjectSelector = ({ opened, onClose, selectObj }: Props) => {
  const [search, setSearch] = useState('')
  return (
    <Drawer
      title="Select an object"
      position="right"
      size="xl"
      opened={opened}
      onClose={onClose}
    >
      <Stack>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<SearchIcon />}
        />
        {mapObjects
          .filter(([name]) => name.includes(search))
          .map(([name, src, tint]) => {
            return (
              <Button
                variant="subtle"
                key={name}
                onClick={() => {
                  selectObj(name)
                  onClose()
                }}
                display="block"
                w="100%"
              >
                <Group>
                  <Image className={tint} src={src} w={64} h={32} />
                  <Text>{name}</Text>
                </Group>
              </Button>
            )
          })}
      </Stack>
    </Drawer>
  )
}

const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
      fill="currentColor"
    />
  </svg>
)
