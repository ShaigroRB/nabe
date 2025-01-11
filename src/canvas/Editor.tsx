import { useEffect, useReducer } from 'react'
import * as PIXI from 'pixi.js'

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

  useEffect(() => {
    if (editorContainer == null) {
      forceUpdate()
    }
    initializePixiApp(editorContainer)
  }, [editorContainer])
  return editorContainer
}

const initializePixiApp = (container: HTMLElement | null) => {
  if (container == null) {
    return
  }
  const app = new PIXI.Application({
    backgroundColor: '#deddda',
    height: windowHeight - PADDING_CANVAS / 2,
    width: windowWidth,
  })
  container.appendChild(app.view as unknown as Node)

  const mainContainer = new PIXI.Container()
  mainContainer.sortableChildren = true

  const grid = generateGrid(gridWidth, gridHeight)
  grid.x = PADDING_CANVAS
  grid.y = PADDING_CANVAS

  mainContainer.addChild(grid)

  app.stage.addChild(mainContainer)
}
