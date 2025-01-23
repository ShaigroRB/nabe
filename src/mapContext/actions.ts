import { Coordinates } from '../map'

import { MapState } from './state'

export type PlaceMapObjectAction = {
  type: 'place_any_object'
  payload: Coordinates
}

export type SetNewMapAction = {
  type: 'set_new_map'
  payload: MapState['map']
}

export type MapAction = PlaceMapObjectAction | SetNewMapAction
