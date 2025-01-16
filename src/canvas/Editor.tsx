import { useEffect, useReducer } from 'react'
import * as PIXI from 'pixi.js'

import { MapContextInformation, useMapContext } from '../MapContext'
import { Block } from '../types'

import { onMouseMove } from './events/mousemove'
import { ObjProperties, onPointerDown } from './events/pointerdown'
import { CELL_SIZE, generateGrid } from './grid'
import {
  ZINDEX_CONTAINER_DETECT_EVENTS,
  ZINDEX_LAYER_BLOCKS,
  ZINDEX_PREVIEW_PLACED_OBJECT,
} from './zIndexes'

const PADDING_CANVAS = 16
const windowHeight = window.innerHeight
const windowWidth = window.innerWidth
const gridHeight = windowHeight - PADDING_CANVAS * 2
const gridWidth = windowWidth - PADDING_CANVAS

/**
 * This is where the magic happens.
 *
 * The editor is a big canvas that is used to:
 * - draw the objects (assets, tiles, etc)
 * - interact with the objects (create, move, delete, etc)
 */
export const Editor = () => {
  useInitializePixiMainContainer()

  return <div id="editor-content"></div>
}

const useInitializePixiMainContainer = () => {
  const { placeBlock, map, shouldRedraw, redrawIsFinished } = useMapContext()
  const editorContainer = document.getElementById('editor-content')
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    // only initialize the PIXI app once the div has been placed in the DOM
    if (editorContainer == null) {
      forceUpdate()
      return
    }

    // avoid redrawing the PIXI app over and over due to variables updating
    // this variable updates in very specific cases, such as importing a map
    if (!shouldRedraw) {
      return
    }

    const waitForInitializationPixiApp = async () => {
      await initializePixiApp(editorContainer, {
        placeBlock,
        map,
        shouldRedraw,
      })
    }

    redrawIsFinished()

    waitForInitializationPixiApp().catch(console.error)
  }, [editorContainer, shouldRedraw, redrawIsFinished, placeBlock, map])

  return editorContainer
}

type PixiEditorMapContext = Pick<
  MapContextInformation,
  'map' | 'placeBlock' | 'shouldRedraw'
>

const initializePixiApp = async (
  container: HTMLElement | null,
  { placeBlock, map, shouldRedraw }: PixiEditorMapContext,
) => {
  if (container == null || !shouldRedraw) {
    return
  }
  if (shouldRedraw) {
    container.innerHTML = ''
  }

  const app = new PIXI.Application()

  await app.init({
    backgroundColor: '#deddda',
    height: windowHeight - PADDING_CANVAS / 2,
    width: windowWidth,
  })
  container.appendChild(app.canvas as unknown as Node)

  const mainContainer = new PIXI.Container()
  mainContainer.sortableChildren = true
  mainContainer.renderable = true

  const grid = generateGrid(gridWidth, gridHeight)
  grid.x = PADDING_CANVAS
  // grid.y = PADDING_CANVAS
  const blocks = blocksLayer({
    width: grid.width,
    height: grid.height,
    placeBlock,
    blocks: map.blocks,
  })
  blocks.x = PADDING_CANVAS
  // blocks.y = PADDING_CANVAS

  mainContainer.addChild(grid)
  mainContainer.addChild(blocks)

  app.stage.addChild(mainContainer)
}

type BlocksLayerFuncParam = {
  width: number
  height: number
  placeBlock: (b: Block) => void
  blocks: Block[]
}
function blocksLayer({
  width,
  height,
  placeBlock,
  blocks,
}: BlocksLayerFuncParam) {
  const layer = new PIXI.Container({ width, height })
  layer.sortableChildren = true

  // display a preview on current coordinates of the current object
  const previewLayer = new PIXI.Container({
    width,
    height,
    zIndex: ZINDEX_PREVIEW_PLACED_OBJECT,
  })
  layer.addChild(previewLayer)

  // where blocks are drawn
  const blockGraphics = new PIXI.Graphics({ zIndex: ZINDEX_LAYER_BLOCKS })

  // this graphics is simply there to detect where the blocks will be drawn
  const events = new PIXI.Graphics({ width, height, alpha: 0 })
  events.zIndex = ZINDEX_CONTAINER_DETECT_EVENTS
  events.eventMode = 'static'

  events.on(
    'mousemove',
    onMouseMove(
      previewLayer,
      (props) => {
        switch (props.id) {
          case 'block': {
            console.log({ props })
            break
          }
          case 'spawn': {
            console.log({ props })
            break
          }
        }
      },
      { id: 'block', x: 0, y: 0, type: 'lava', ambience: '' },
    ),
  )

  events.on(
    'pointerdown',
    onPointerDown(
      layer,
      (properties: ObjProperties) => {
        switch (properties.id) {
          case 'block': {
            placeBlock({ x: properties.x, y: properties.y })
            break
          }
          case 'spawn': {
            console.log({ properties })
            break
          }
        }
      },
      {
        id: 'spawn',
        type: 'lava',
        // ambience: 'rainy',
        x: 0,
        y: 0,
      },
    ),
  )

  // place blocks from the map
  blocks.forEach((block) => {
    blockGraphics.rect(block.x, block.y, CELL_SIZE, CELL_SIZE).fill(0x000000)
  })

  layer.addChild(blockGraphics)

  // define a rectangle so something appears and can be clicked
  // even though it is transparent
  events.rect(0, 0, width, height).fill(0xff00f0)

  layer.addChild(events)

  return layer
}
