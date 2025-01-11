import { useEffect, useReducer } from 'react'
import * as PIXI from 'pixi.js'

import { DebugFunc, useDebugContext } from '../DebugContext'

import { generateGrid } from './grid'

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
  const { setDebug } = useDebugContext()

  useEffect(() => {
    if (editorContainer == null) {
      forceUpdate()
    }

    const waitForInitializationPixiApp = async () => {
      await initializePixiApp(editorContainer, setDebug)
    }

    waitForInitializationPixiApp().catch(console.error)
  }, [editorContainer, setDebug])

  return editorContainer
}

const initializePixiApp = async (
  container: HTMLElement | null,
  debug: DebugFunc,
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
  mainContainer.x = PADDING_CANVAS
  mainContainer.y = PADDING_CANVAS

  const grid = generateGrid(gridWidth, gridHeight)
  const blocks = blocksLayer(grid.width, grid.height, debug)

  mainContainer.addChild(grid)
  mainContainer.addChild(blocks)

  app.stage.addChild(mainContainer)
}

function blocksLayer(width: number, height: number, debug: DebugFunc) {
  const layer = new PIXI.Container({ width, height, alpha: 0 })

  const graphicsToDetectEvents = new PIXI.Graphics({ width, height, alpha: 0 })
  graphicsToDetectEvents.zIndex = 0
  graphicsToDetectEvents.eventMode = 'static'
  graphicsToDetectEvents.on('click', (e) => {
    debug(`x: ${e.x}; y: ${e.y}`)
  })

  // define a rectangle so something appears and can be clicked
  // even though it is transparent
  graphicsToDetectEvents.rect(0, 0, width, height).fill(0xff00f0)

  layer.addChild(graphicsToDetectEvents)

  return layer
}
