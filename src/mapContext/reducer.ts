import { Block } from '../map'

import { MapAction } from './actions'
import { MapState } from './types'

export function reducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case 'place_block': {
      const block: Block = { ...action.payload }
      const blocks = [...state.map.blocks, block]
      return {
        ...state,
        map: { blocks },
      }
    }
    case 'set_new_map': {
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
