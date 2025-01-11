import { useEffect, useReducer } from 'react'
import * as PIXI from 'pixi.js'

import { DebugFunc, useDebugContext } from '../DebugContext'
import { roundDownToNearestPositiveMultiple as roundDownToNearestPositiveMultiple } from '../utils/numbers'

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
const gridWidth = windowWidth - PADDING_CANVAS * 2

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
  const editorContainer = document.getElementById('editor-content')
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    if (editorContainer == null) {
      forceUpdate()
    }

    const waitForInitializationPixiApp = async () => {
      await initializePixiApp(editorContainer, setDebug)
    }

    waitForInitializationPixiApp().catch(console.error)
  }, [editorContainer])

  return editorContainer
}

const initializePixiApp = async (
  container: HTMLElement | null,
) => {
  if (container == null) {
    return
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
  grid.y = PADDING_CANVAS
  const blocks = blocksLayer(grid.width, grid.height, debug)
  blocks.x = PADDING_CANVAS
  blocks.y = PADDING_CANVAS

  mainContainer.addChild(grid)
  mainContainer.addChild(blocks)

  app.stage.addChild(mainContainer)
}

function getNearestLocalPosition(
  evt: PIXI.FederatedPointerEvent,
  container: PIXI.Container,
) {
  const localPosition = evt.getLocalPosition(container)
  const nearestX = roundDownToNearestPositiveMultiple(
    localPosition.x,
    CELL_SIZE,
  )
  const nearestY = roundDownToNearestPositiveMultiple(
    localPosition.y,
    CELL_SIZE,
  )

  return { nearestX, nearestY }
}

function blocksLayer(width: number, height: number, debug: DebugFunc) {
  const layer = new PIXI.Container({ width, height })
  layer.sortableChildren = true

  // where blocks are drawn
  const blockGraphics = new PIXI.Graphics({ zIndex: ZINDEX_LAYER_BLOCKS })

  // where block would be drawn if user clicks
  const hoveredBlockGraphics = new PIXI.Graphics({
    alpha: 0.3,
    zIndex: ZINDEX_PREVIEW_PLACED_OBJECT,
  })
  let prevHoveredPos = { x: -1, y: -1 }

  // this graphics is simply there to detect where the blocks will be drawn
  const events = new PIXI.Graphics({ width, height, alpha: 0 })
  events.zIndex = ZINDEX_CONTAINER_DETECT_EVENTS
  events.eventMode = 'static'

  events.on('mousemove', (e) => {
    const { nearestX, nearestY } = getNearestLocalPosition(e, layer)
    // display a preview of the object to be placed (snapped to the grid)
    if (nearestX === prevHoveredPos.x && nearestY === prevHoveredPos.y) {
      return
    } else {
      hoveredBlockGraphics.clear()

      hoveredBlockGraphics
        .rect(nearestX, nearestY, CELL_SIZE, CELL_SIZE)
        .fill(0xff0000)

      prevHoveredPos = { x: nearestX, y: nearestY }
    }
  })

  events.on('pointerdown', (e) => {
    const { nearestX, nearestY } = getNearestLocalPosition(e, layer)
    // draw a block to at the pointer position (snap it to the grid)
    blockGraphics.rect(nearestX, nearestY, CELL_SIZE, CELL_SIZE).fill(0x000000)
  })

  layer.addChild(blockGraphics)
  layer.addChild(hoveredBlockGraphics)

  // define a rectangle so something appears and can be clicked
  // even though it is transparent
  events.rect(0, 0, width, height).fill(0xff00f0)

  layer.addChild(events)

  return layer
}
