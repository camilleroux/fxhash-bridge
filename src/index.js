// BRIDGE
// Camille Roux, 2022

/* eslint-disable no-undef */
import p5 from 'p5'
import { ProjectionCalculator3d } from 'projection-3d-2d'
import { FXInit, FXRandomBetween, FXRandomIntBetween, getWeightedOption } from '@liamegan1/fxhash-helpers'

import BoilerplateStyle from './styles/boilerplate'
import DemoStyle from './styles/demo'
import CamilleRouxStyle from './styles/camilleroux'
import WilkeStyle from './styles/wilke'
import CamilleRoux2Style from './styles/camilleroux2'

// note about the fxrand() function
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

// these are the variables you can use as inputs to your algorithms
// console.log(fxhash)   // the 64 chars hex number fed to your algorithm
// console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()

// eslint-disable-next-line no-console
console.log('By Camille Roux (@CamilleRouxArt) - ' + fxhash)
FXInit(fxrand)
const seed = ~~(fxrand() * 123456789)
let s

const gridSizeX = FXRandomIntBetween(4, 10) * 2 + 1
const gridSizeY = FXRandomIntBetween(30, 60)
const borders = getWeightedOption([
  ['none', 2],
  ['simple', 5],
  ['double', 3]
])
const perspective = Math.floor(FXRandomBetween(0.01, 0.08) * 100) / 100
const missingTiles = Math.floor(FXRandomBetween(0.3, 0.8) * 10) / 10

const stylesClasses = [WilkeStyle, CamilleRoux2Style, CamilleRouxStyle, BoilerplateStyle, DemoStyle]
let styleClassId = FXRandomIntBetween(0, stylesClasses.length)
let currentStyle

// defining features
window.$fxhashFeatures = {
  styleCreator: stylesClasses[styleClassId].author(),
  styleName: stylesClasses[styleClassId].name(),
  gridSizeX,
  gridSizeY,
  borders,
  perspective,
  missingTiles
}
// eslint-disable-next-line no-console
console.table(window.$fxhashFeatures)

const tilesList = []

// create projectionCalculator3d
const points3d = [
  [-gridSizeX / 2, 0, 1],
  [gridSizeX / 2, 0, 1],
  [gridSizeX / 2, 0, 0],
  [-gridSizeX / 2, 0, 0],
  [0, 1, 0],
  [0, 1, 1]
]
const points2d = [
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
  [0.5, 0.9],
  [0.5, perspective]
]
const projectionCalculator3d = new ProjectionCalculator3d(points3d, points2d)

const sketch = function (p5) {
  p5.setup = function () {
    p5.noLoop()
    s = p5.min(p5.windowWidth, p5.windowHeight)
    p5.createCanvas(s, s)

    for (let j = gridSizeY - 1; j >= 0; j--) {
      for (let halfI = 0; halfI < gridSizeX / 2; halfI++) {
        if (FXRandomBetween(0, 1) > missingTiles) { tilesList.push([-gridSizeX / 2 + halfI, j]) }
        if (FXRandomBetween(0, 1) > missingTiles) {
          if (-gridSizeX / 2 + halfI !== gridSizeX / 2 - 1 - halfI) { tilesList.push([gridSizeX / 2 - 1 - halfI, j]) } // not draw twice the same column
        }
      }
    }
  }

  p5.draw = function () {
    p5.randomSeed(seed)
    p5.noiseSeed(seed)
    FXInit(fxrand)

    currentStyle = new stylesClasses[styleClassId](gridSizeX, gridSizeY, s, projectionCalculator3d, p5)

    p5.push()

    currentStyle.beforeDraw()

    // draw tiles
    const borderSize = borders === 'simple' ? 1 : 2
    tilesList.forEach((tile) => {
      const i = tile[0]
      const j = tile[1]
      let height = 0 // default tile height
      if (borders !== 'none') {
        height = i <= -gridSizeX / 2 - 1 + borderSize || i >= gridSizeX / 2 - borderSize ? 0.04 : 0 // change height if it's a border tile
      }
      // calculate 2D projection of the current tile
      const tilePoints = []
      tilePoints.push(p5.createVector().set(projectionCalculator3d.getProjectedPoint([i, j, height])))
      tilePoints.push(p5.createVector().set(projectionCalculator3d.getProjectedPoint([i, j + 1, height])))
      tilePoints.push(p5.createVector().set(projectionCalculator3d.getProjectedPoint([i + 1, j + 1, height])))
      tilePoints.push(p5.createVector().set(projectionCalculator3d.getProjectedPoint([i + 1, j, height])))

      currentStyle.drawTile(tilePoints, p5.createVector(i, j, height), height !== 0)
    })

    currentStyle.afterDraw()
    p5.pop()

    // eslint-disable-next-line no-undef
    fxpreview()
  }

  p5.windowResized = function () {
    s = p5.min(p5.windowWidth, p5.windowHeight)
    p5.resizeCanvas(s, s)
  }

  p5.mousePressed = function (event) {
    if (event.which === 0 || event.which === 1) { // if touch or left clic
      styleClassId = (styleClassId + 1) % stylesClasses.length
      this.draw()
      return false
    }
  }
  
  p5.keyPressed = function () {
    console.log(p5.keyCode)
    if (p5.keyCode === 83) { // 83 is letter s
      p5.saveCanvas(`BRIDGE-${fxhash}`, 'png');
    }
  }
}

// eslint-disable-next-line no-unused-vars
const myp5 = new p5(sketch, window.document.body)
