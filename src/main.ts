import * as PIXI from 'pixi.js'

import { generateGrid } from './editor/grid'

const editorDiv: HTMLElement | null = document.getElementById('editor')

initializePixiApp(editorDiv)

function initializePixiApp(container: HTMLElement | null) {
  if (container === null) {
    return null
  }
  const app = new PIXI.Application({
    backgroundColor: '#deddda',
    height: 641,
    width: 1201,
  })
  container.appendChild(app.view as unknown as Node)

  const mainContainer = new PIXI.Container()
  mainContainer.sortableChildren = true

  const grid = generateGrid()
  mainContainer.addChild(grid)

  app.stage.addChild(mainContainer)
}
