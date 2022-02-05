// BRIDGE
// Camille Roux, 2022

/* eslint-disable no-undef */
import p5 from 'p5'
import { ProjectionCalculator3d } from 'projection-3d-2d'
import { FXInit, FXRandomBetween, FXRandomIntBetween, FXRandomOption, getWeightedOption } from '@liamegan1/fxhash-helpers'

import BoilerplateStyle from './styles/boilerplate'
import CamilleRouxStyle from './styles/camilleroux'

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

const gridSizeX = FXRandomIntBetween(6, 30)
const gridSizeY = FXRandomIntBetween(25, 50)
const borders = getWeightedOption([
  ['none', 3],
  ['simple', 6],
  ['double', 1]
])
const perspective = Math.floor(FXRandomBetween(0.01, 0.1) * 100) / 100
const missingTiles = Math.floor(FXRandomBetween(0.2, 0.7) * 10) / 10

const defaultStyleClass = FXRandomOption([BoilerplateStyle, CamilleRouxStyle]) // set `defaultStyleClass`to your own style to dev easily
let currentStyle

// defining features
window.$fxhashFeatures = {
  styleCreator: defaultStyleClass.author(),
  styleName: defaultStyleClass.name(),
  gridSizeX,
  gridSizeY,
  borders,
  perspective,
  missingTiles
}
// eslint-disable-next-line no-console
console.table(window.$fxhashFeatures)

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

    currentStyle = new defaultStyleClass(s, projectionCalculator3d, p5)
  }

  p5.draw = function () {
    p5.randomSeed(seed)
    p5.noiseSeed(seed)

    currentStyle.beforeDraw()

    // draw tiles
    const borderSize = borders === 'simple' ? 1 : 2
    for (let i = -gridSizeX / 2; i < gridSizeX / 2; i++) {
      for (let j = gridSizeY - 1; j >= 0; j--) {
        let height = 0 // default tile height
        if (borders !== 'none') {
          height = i <= -gridSizeX / 2 - 1 + borderSize || i >= gridSizeX / 2 - borderSize ? 0.04 : 0 // change height if it's a border tile
        }
        if (p5.random() < missingTiles) continue // don't draw the tile if it's a missing tile

        // calculate 2D projection of the current tile
        const tilePoints = []
        tilePoints.push(p5.createVector().set(projectionCalculator3d.getProjectedPoint([i, j, height])))
        tilePoints.push(p5.createVector().set(projectionCalculator3d.getProjectedPoint([i, j + 1, height])))
        tilePoints.push(p5.createVector().set(projectionCalculator3d.getProjectedPoint([i + 1, j + 1, height])))
        tilePoints.push(p5.createVector().set(projectionCalculator3d.getProjectedPoint([i + 1, j, height])))

        currentStyle.drawTile(tilePoints, p5.createVector(i, j, height), height !== 0)
      }
    }

    currentStyle.afterDraw()

    // eslint-disable-next-line no-undef
    fxpreview()
  }

  p5.windowResized = function () {
    s = p5.min(p5.windowWidth, p5.windowHeight)
    currentStyle = new defaultStyleClass(s, projectionCalculator3d, p5)
    p5.resizeCanvas(s, s)
  }

  p5.keyTyped = function () {
    if (p5.key === 'n') {
      // TODO: set next style
      currentStyle = new defaultStyleClass(s, projectionCalculator3d, p5)
    }
  }
}

// eslint-disable-next-line no-unused-vars
const myp5 = new p5(sketch, window.document.body)
