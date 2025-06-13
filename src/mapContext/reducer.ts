import { inferMapObject, PluralMapObjectName } from '../map'

import { MapAction } from './actions'
import { MapState } from './state'

export function reducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case 'place_any_object': {
      const mapObject = inferMapObject({
        id: state.nextId,
        name: state.selected.name,
        ...action.payload,
      })

      // NEW_ASSET: new case if new type in MapInformation

      if (
        mapObject.name === 'ramp_bottom_left' ||
        mapObject.name === 'ramp_bottom_right' ||
        mapObject.name === 'ramp_top_left' ||
        mapObject.name === 'ramp_top_right'
      ) {
        const modifiedObjects = [...state.map['small_ramps'], mapObject]
        return {
          ...state,
          map: { ...state.map, small_ramps: modifiedObjects },
          nextId: state.nextId + 1,
        }
      } else {
        const modifiedArrayName: PluralMapObjectName = `${mapObject.name}s`
        const modifiedObjects = [...state.map[modifiedArrayName], mapObject]
        return {
          ...state,
          map: { ...state.map, [modifiedArrayName]: modifiedObjects },
          nextId: state.nextId + 1,
        }
      }
    }
    case 'update_selected_map_object': {
      return { ...state, selected: { ...state.selected, name: action.name } }
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
