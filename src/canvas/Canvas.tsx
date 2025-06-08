import { useEffect, useReducer, useState } from 'react'
import * as PIXI from 'pixi.js'

import { Block, MapInformation } from '../map'
import { MapContextInformation, useMapContext } from '../mapContext/MapContext'

import { onMouseMove } from './events/mousemove'
import { onPointerDown } from './events/pointerdown'
import { CELL_SIZE } from './grid'
import {
  clearDrawingContainer,
  createPixiAppStructure,
  PADDING_CANVAS,
  windowHeight,
  windowWidth,
} from './structure'

const { rootContainer, previewLayer, drawingContainer, eventsLayer } =
  createPixiAppStructure()

/**
 * This is where the magic happens.
 *
 * The editor is a big canvas that is used to:
 * - draw the objects (assets, tiles, etc)
 * - interact with the objects (create, move, delete, etc)
 */
export const EditorCanvas = () => {
  useInitializePixiMainContainer()

  return <div id="editor-content"></div>
}

async function initializePixiApp(container: HTMLElement) {
  const app = new PIXI.Application()

  await app.init({
    backgroundColor: '#deddda',
    height: windowHeight - PADDING_CANVAS / 2,
    width: windowWidth,
  })
  container.appendChild(app.canvas as unknown as Node)

  return app
}

const useInitializePixiMainContainer = () => {
  const mapContext = useMapContext()
  const editorContainer = document.getElementById('editor-content')
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const [pixiApp, setPixiApp] = useState<PIXI.Application | null>(null)

  // init the app once and saves it in as a state
  useEffect(() => {
    if (pixiApp !== null) {
      return () => {
        pixiApp.destroy()
      }
    }
    // DOM has not been loaded yet
    if (editorContainer == null) {
      forceUpdate()
      return
    }

    // initialize the app
    const waitForPixiAppInitialization = async () => {
      const _pixiApp = await initializePixiApp(editorContainer)
      _pixiApp.stage.addChild(rootContainer)

      setPixiApp(_pixiApp)
    }

    waitForPixiAppInitialization().catch(console.error)
  }, [pixiApp, editorContainer])

  // after app is set, (re)draw the map
  useEffect(() => {
    if (pixiApp === null || !mapContext.shouldRedraw) {
      return
    }

    drawMap({ map: mapContext.state.map })

    mapContext.redrawIsFinished()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need to redraw if redraw is not set
  }, [pixiApp, mapContext.shouldRedraw])

  // after app is set, (re)set event listeners for mousemove, pointerdown, ...
  useEffect(() => {
    if (pixiApp === null) {
      return
    }

    resetEventsListeners({ map: mapContext })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixiApp, mapContext.state.selected.name])

  return editorContainer
}

type DrawMapProps = {
  map: MapInformation
}
function drawMap({ map }: DrawMapProps) {
  clearDrawingContainer()

  // NEW_ASSET: draw new asset when importing from JSON
  drawBlocksLayer({
    blocks: map.blocks,
  })
}

type BlocksLayerFuncParam = {
  blocks: Block[]
}
function drawBlocksLayer({ blocks }: BlocksLayerFuncParam) {
  const blocksLayer = new PIXI.Graphics()
  drawingContainer.addChild(blocksLayer)

  // place blocks from the map
  blocks.forEach((block) => {
    blocksLayer.rect(block.x, block.y, CELL_SIZE, CELL_SIZE).fill(0x000000)
  })
}

function resetEventsListeners({ map }: { map: MapContextInformation }) {
  eventsLayer.removeAllListeners()

  eventsLayer.on(
    'mousemove',
    onMouseMove(
      previewLayer,
      (props) => {
        switch (props.name) {
          case 'block': {
            // console.log({ props })
            break
          }
          case 'spawn': {
            // console.log({ props })
            break
          }
        }
      },
      { x: 0, y: 0, ...map.state.selected },
    ),
  )

  eventsLayer.on(
    'pointerdown',
    onPointerDown(
      drawingContainer,
      (coords) => {
        map.placeSelectedMapObject(coords)
      },
      { x: 0, y: 0, ...map.state.selected },
    ),
  )
}
