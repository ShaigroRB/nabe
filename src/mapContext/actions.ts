import { MapInformation } from '../types'

export type PlaceBlockAction = {
  type: 'place_block'
  payload: { x: number; y: number }
}

export type SetNewMapAction = {
  type: 'set_new_map'
  payload: MapInformation
}

export type MapAction = PlaceBlockAction | SetNewMapAction
