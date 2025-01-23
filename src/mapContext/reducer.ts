import { inferMapObject } from '../map'

import { MapAction } from './actions'
import { MapState } from './state'

export function reducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case 'place_any_object': {
      const mapObject = inferMapObject({
        id: state.nextId,
        name: 'block',
        ...action.payload,
      })
      const blocks = [...state.map.blocks, mapObject]
      return {
        ...state,
        map: { blocks },
        nextId: state.nextId + 1,
      }
    }
    case 'set_new_map': {
      // todo: retrieve the next id from map
      return {
        ...state,
        map: { ...action.payload },
      }
    }
    default:
      console.warn('action not handled', { action })
      return state
  }
}
