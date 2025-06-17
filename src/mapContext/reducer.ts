import { inferMapObject, MapInformationKeys } from '../map'

import { MapAction } from './actions'
import { MapState } from './state'
import { getMapObjectIdByCoords, mapInformationToObjsByCoords } from './utils'

export function reducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case 'place_any_object': {
      const mapObject = inferMapObject({
        id: state.nextId,
        name: state.selected.name,
        ...action.payload,
      })

      // update the record placed map objects
      const objByCoordsId = getMapObjectIdByCoords(mapObject)

      // default value should be overriden afterwards anyway
      let modifiedArrayName: MapInformationKeys = 'blocks'

      // NEW_ASSET: new case if new type in MapInformation
      switch (mapObject.name) {
        case 'ramp_bottom_left':
        case 'ramp_bottom_right':
        case 'ramp_top_left':
        case 'ramp_top_right': {
          modifiedArrayName = 'ramps'
          break
        }
        case 'long_ramp_bottom_left':
        case 'long_ramp_bottom_right':
        case 'long_ramp_top_left':
        case 'long_ramp_top_right': {
          modifiedArrayName = 'long_ramps'
          break
        }
        case 'spawn_player': {
          modifiedArrayName = 'spawns'
          break
        }
        default: {
          modifiedArrayName = `${mapObject.name}s`
          break
        }
      }

      const modifiedObjects = [...state.map[modifiedArrayName], mapObject]
      return {
        ...state,
        map: { ...state.map, [modifiedArrayName]: modifiedObjects },
        nextId: state.nextId + 1,
        mapObjsByCoords: { ...state.mapObjsByCoords, [objByCoordsId]: true },
      }
    }
    case 'update_selected_map_object': {
      return { ...state, selected: { ...state.selected, name: action.name } }
    }
    case 'set_new_map': {
      // todo: retrieve the next id from map
      const newMapObjsByCoords = mapInformationToObjsByCoords(action.payload)

      return {
        ...state,
        map: { ...action.payload },
        mapObjsByCoords: newMapObjsByCoords,
      }
    }
    default:
      console.warn('action not handled', { action })
      return state
  }
}
