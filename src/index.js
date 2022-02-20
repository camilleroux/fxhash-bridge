/**
 * BRIDGE - JavaScript bundle to produce generative art
 *
 * Copyright (c) 2022, Camille Roux and contributing artists
 * All rights reserved.
 *
 * The BRIDGE framework code (excluding contributed styles) is released
 * under CC-BY-NC-SA 4.0:
 * https://creativecommons.org/licenses/by-nc-sa/4.0/
 * Each contributing artist holds the copyright to their individual
 * style implementation and additional restrictions may apply.
 *
 * Some code in this bundle was written by third parties
 * and is distributed under their respective licensing
 * conditions:
 * - p5.js (LGPL, https://p5js.org/copyright.html)
 * - chroma.js (BSD License, https://github.com/gka/chroma.js/blob/master/LICENSE)
 * - projection-3d-2d (MIT License, https://github.com/Infl1ght/projection-3d-2d/blob/master/LICENSE)
 * - fxhash-helpers (MIT License, https://github.com/liamegan/fxhash-helpers/blob/main/LICENSE)
 * - fxrandom.js (MIT License, https://github.com/clauswilke/fxrandomjs/blob/main/LICENSE)
 * @preserve
 **/

/* eslint-disable no-undef */
import p5 from 'p5'
import { ProjectionCalculator3d } from 'projection-3d-2d'
import { FXInit, FXRandomBetween, FXRandomIntBetween, getWeightedOption } from '@liamegan1/fxhash-helpers'

import BoilerplateStyle from './styles/boilerplate'
import ShuhblamStyle from './styles/shuhblam'
import DemoStyle from './styles/demo'
import CamilleRouxStyle from './styles/camilleroux'
import CamilleRoux2Style from './styles/camilleroux2'
import GorikStyle from './styles/gorik'
import WilkeStyle from './styles/wilke'
import PhilosophieStyle from './styles/phil_osophie'
import RobinMetcalfeStyle from './styles/robinmetcalfe'
import AnaglyphicStyle from './styles/anaglyphic'
import FrederativeStyle from './styles/frederative'
import DavidEsqStyle from './styles/davidesq'
import EstienneStyle from './styles/estienne'
import Makio64Style from './styles/makio64'
import ElsifStyle from './styles/elsif'
import AdaAdaAdaStyle from './styles/ada_ada_ada'
import MandyBrigwellStyle from './styles/mandybrigwell'
import RVigStyle from './styles/rvig'
import AzeemStyle from './styles/azeem'
import BridgeTunnelStyle from './styles/bridgetunnel'
import DreyStyle from './styles/drey'
import LunareanStyle from './styles/lunarean'
import GrosggStyle from './styles/grosgg'
// import JuLabatStyle from './styles/julabat'
import bfosStyle from './styles/bfos'
import DevnullStyle from './styles/devnull'
import JeresStyle from './styles/jeres'
import Nobody from './styles/nobody'
import NickDimaStyle from './styles/nickdima'
import GenerativePenStyle from './styles/generativepen'
import AqwUnderscoreZertStyle from './styles/aqwunderscorezert'

const FXR = require('fxrandomjs')

// note about the fxrand() function
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

// these are the variables you can use as inputs to your algorithms
// console.log(fxhash)   // the 64 chars hex number fed to your algorithm
// console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()

// eslint-disable-next-line no-console
console.log('By Camille Roux (@CamilleRouxArt) - ' + fxhash)
const rnd = new FXR(fxhash, true) // reimplementation of fxrand that allows for resetting the seed
FXInit(rnd.fxrand)
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

const stylesClasses = [
  GenerativePenStyle,
  NickDimaStyle,
  AdaAdaAdaStyle,
  RVigStyle,
  ElsifStyle,
  EstienneStyle,
  FrederativeStyle,
  DavidEsqStyle,
  ShuhblamStyle,
  GorikStyle,
  AnaglyphicStyle,
  PhilosophieStyle,
  WilkeStyle,
  RobinMetcalfeStyle,
  CamilleRoux2Style,
  CamilleRouxStyle,
  BoilerplateStyle,
  DemoStyle,
  AzeemStyle,
  Makio64Style,
  MandyBrigwellStyle,
  BridgeTunnelStyle,
  DreyStyle,
  LunareanStyle,
  GrosggStyle,
  // JuLabatStyle,
  bfosStyle,
  DevnullStyle,
  Nobody,
  AqwUnderscoreZertStyle,
  JeresStyle,
  Nobody
]
let styleClassId = FXRandomIntBetween(0, stylesClasses.length)
let currentStyle

let fxpreviewDone = false

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
    p5.resizeCanvas(s, s, true)
    p5.randomSeed(seed)
    p5.noiseSeed(seed)
    rnd.setSeed(fxhash, true)
    FXInit(rnd.fxrand)

    p5.push()

    // restore default p5 modes to prevent changes across styles
    p5.colorMode(p5.RGB)
    p5.ellipseMode(p5.CENTER)
    p5.rectMode(p5.CORNER)
    p5.blendMode(p5.BLEND)
    p5.imageMode(p5.CORNER)
    p5.angleMode(p5.RADIANS)
    p5.pixelDensity(window.devicePixelRatio)
    p5.strokeWeight(1)
    p5.drawingContext.shadowBlur = 0
    p5.drawingContext.filter = 'none'

    currentStyle = new stylesClasses[styleClassId](gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
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

    if (!fxpreviewDone) {
      // eslint-disable-next-line no-undef
      fxpreview()
      fxpreviewDone = true
    }
  }

  p5.windowResized = function () {
    s = p5.min(p5.windowWidth, p5.windowHeight)
    p5.resizeCanvas(s, s)
  }

  p5.mousePressed = function (event) {
    if (event.which === 0 || event.which === 1) { // if touch or left clic
      styleClassId = (styleClassId + 1) % stylesClasses.length
      console.table({
        styleCreator: stylesClasses[styleClassId].author(),
        styleName: stylesClasses[styleClassId].name()
      })
      this.draw()
      return false
    }
  }

  // save image when pressing 's' key
  p5.keyPressed = function () {
    if (p5.keyCode === 83) { // 83 is letter s
      p5.saveCanvas(`BRIDGE-${fxhash}`, 'png')
    }
  }
}

// eslint-disable-next-line no-unused-vars
const myp5 = new p5(sketch, window.document.body)
