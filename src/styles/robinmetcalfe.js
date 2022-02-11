// Robin Metcalfe
// Status: WIP // "WIP", "Ready"
// Twitter: @solarise_webdev
// Fxhash: https://www.fxhash.xyz/u/Robin
// Wallet: tz1a3ZWW7sdgX3JGp3h316TvsgpiVGWFYihe

import Style from './style'
import { FXInit, FXRandomBetween, FXRandomIntBetween, getWeightedOption } from '@liamegan1/fxhash-helpers'
import chroma from "chroma-js";
import p5 from 'p5'

// Some helper functions
// Basic lerp
const lerp = (a, b, t) => {
  return (1 - t) * a + t * b;
}

const clamp = (val, min, max) => {
    return val > max ? max : val < min ? min : val;
}

const range = (number, inMin, inMax, outMin, outMax) => {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// external constant
const BORDER_HEIGHT = 0.04

FXInit(fxrand)

// Some random variables which are set across all tiles
let curtainStringModiferRange = [FXRandomBetween(-0.005, -0.001), FXRandomBetween(0.001, 0.005)]
let heightRange = [FXRandomBetween(0.005, BORDER_HEIGHT), FXRandomBetween(BORDER_HEIGHT, 0.15)]
let heightVarianceRange = [FXRandomBetween(0.01, 0.05), FXRandomBetween(0.05, 0.25)]
let colorRange = chroma.scale(['#666', '#f00'])
let borderHeightRange = [FXRandomBetween(2, 4), FXRandomBetween(4, 7)]

let surfaceSinAdjust = FXRandomBetween(1, 4)
let surfaceCosAdjust = FXRandomBetween(1, 4)
let surfaceAmplitude = FXRandomBetween(0.001, 0.003)

let lightMode = FXRandomBetween(0, 1) > 0.5

const palettes = [
  ["#ff5400","#ff6d00","#ff8500","#ff9100","#ff9e00","#00b4d8","#0096c7","#0077b6","#023e8a","#03045e"],
  ["#7400b8","#6930c3","#5e60ce","#5390d9","#4ea8de","#48bfe3","#56cfe1","#64dfdf","#72efdd","#80ffdb"],
  ["#b7094c","#a01a58","#892b64","#723c70","#5c4d7d","#455e89","#2e6f95","#1780a1","#0091ad"],
  ["#ff6d00","#ff7900","#ff8500","#ff9100","#ff9e00","#240046","#3c096c","#5a189a","#7b2cbf","#9d4edd"],
  ["#0b090a","#161a1d","#660708","#a4161a","#ba181b","#e5383b","#b1a7a6","#d3d3d3","#f5f3f4","#ffffff"],
]

let pal = chroma.scale(palettes[FXRandomIntBetween(0, palettes.length)])

export default class RobinMetcalfeStyle extends Style {
  
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)

    // re-init fxhash so that this always starts from the same
    // random seed point on e.g. window resize
    fxrand = sfc32(...hashes)

    // Some shorthand accessors
    this.prj = this._projectionCalculator3d
    this.v = this._p5.createVector

    // A variable which scales with screen size
    this.sizeVar = this._s / 1000

    // Cubic bezier easing
    // Used to increase height of buildings far back
    // https://cubic-bezier.com/#.9,.2,.9,.55
    this.buildingEase = new CubicBezier(.9,.2,.9,.55)


    // Due to the way the tiles are drawn, the
    // center column of tiles will need redrawn after the loop
    this.delayCenterTiles = []
    this.finishedMainDraw = false

    this.start = new Date().getTime()
    this.end


  }

  beforeDraw () {
    this._p5.background('#000')
    this.background()
  }


  /**
   * Draw a segmented line which fades from one colour/alpha
   * to another
   */
  fadeLine({
    from,
    to,
    fromColor = '#f00',
    toColor = '#00f',
    fromAlpha = 1,
    toAlpha = 0,
    segments = 32,
    strokeWeight = 1,
  }) {

    // Work directly with canvas context rather than p5.line() and alpha
    // MUCH faster!
    // See https://p5js.org/reference/#/p5/drawingContext
    // and https://editor.p5js.org/odmundeetgen/sketches/qqmp0fVSK
    const grad = this._p5.drawingContext.createLinearGradient(
                    from.x * this._s,
                    from.y * this._s,
                    to.x * this._s,
                    to.y * this._s,
                  )
    grad.addColorStop(0, chroma(fromColor).alpha(fromAlpha).hex())
    grad.addColorStop(1, chroma(toColor).alpha(toAlpha).hex())
    this._p5.drawingContext.strokeStyle = grad
    this._p5.line(from.x * this._s,
                    from.y * this._s,
                    to.x * this._s,
                    to.y * this._s)
  }




  background() {
    
    let col
    if(lightMode)
      col = pal(1).desaturate(1.1)
    else
      col = pal(0).darken(1).desaturate(1.1)
    
    this._p5.strokeWeight(0)

    const center = this.v().set(this.prj.getProjectedPoint([0, this._gridSizeY, 0.1]))

    // radial gradient
    for(let i = this._s * 2; i > 0; i--) {
      let _col
      if(lightMode)
        _col = col.brighten(i / this._s * 2)
      else
        _col = col.darken(i / this._s * 2)
      this._p5.fill(_col.hex())
      this._p5.stroke(_col.hex())
      this._p5.circle(center.x * this._s, center.y * this._s, i)
    }

    // draw a horizon
    const horizonFrom =  this.v(center.x - 0.4, center.y)
    const horizonTo =  this.v(center.x + 0.4, center.y)
    
    this.fadeLine({
      from: horizonFrom,
      to: center,
      fromColor: pal(0.5).brighten(1).hex(),
      toColor: pal(0.75).darken(1).hex(),
      fromAlpha: 0,
      toAlpha: 1,
      strokeWeight: 1,
      segments: this.sizeVar * 100
    })

    this.fadeLine({
      from: center,
      to: horizonTo,
      fromColor: pal(0.75).darken(1).hex(),
      toColor: pal(0.5).brighten(1).hex(),
      fromAlpha: 1,
      toAlpha: 0,
      strokeWeight: 1,
      segments: this.sizeVar * 100
    })
  }


  drawTile (t, f, isBorder) {

    const isCenter = f.x == -0.5 || f.x == 0

    if(isCenter && !this.finishedMainDraw) {
      // draw these in afterDraw(), otherwise
      // the tile to the right will overlap the center one
      this.delayCenterTiles.push({
        t, f, isBorder
      })
      return
    }

    // Shorthand vars - todo:remove
    const prj = this._projectionCalculator3d
    const v = this._p5.createVector
    const p5 = this._p5

    let col = pal(FXRandomBetween(0, 1))

    // Stick with a simple 3D projection, adjust randomly based
    // on height, apply interesting effects to the "surface" of dots...

    this._p5.strokeWeight(1)

    const rowFactor = (this._gridSizeY - f.y) / this._gridSizeY

    this._p5.stroke(col.desaturate((1 - rowFactor) * 3).alpha(rowFactor).hex())
    this._p5.fill(col.brighten(1).desaturate(1 - rowFactor).alpha(rowFactor * 3).hex())

    // do something more interesting with the quads
    this._p5.quad(
      t[0].x * this._s, t[0].y * this._s,
      t[1].x * this._s, t[1].y * this._s,
      t[2].x * this._s, t[2].y * this._s,
      t[3].x * this._s, t[3].y * this._s
    )

    const howFarForward = f.y / this._gridSizeY

    const point = v().set(prj.getProjectedPoint([f.x, f.y, 0]))
    
    let gridRes
    
    // Optimise. Draw fewer lines the further back each tile/block is
    if(howFarForward > 0.8) {
      gridRes = 4
    } else if(howFarForward > 0.5) {
      gridRes = 8
    } else {
      gridRes = 16
    }

    // render the front rows in high detail
    if(f.y <= 1.5)
      gridRes = 32

    const xRes = 1 / gridRes
    const yRes = 1 / gridRes

    let height = Math.sin(f.x) + Math.cos(f.y * 4) - Math.sin((f.x + 1) % (f.y + 1))
    height = range(height, -3, 1, heightRange[0], heightRange[1])

    // A height factor to add to buildings, further back = higher
    // Uses bezier easing
    height += FXRandomBetween(0.02, .15) * this.buildingEase(1 - f.y)

    let lastCurtainLength

    let heightModifier = FXRandomBetween(heightVarianceRange[0], heightVarianceRange[1])

    if(isBorder)
      heightModifier *= FXRandomBetween(borderHeightRange[0], borderHeightRange[1])

    col = col.desaturate(range(t[0].y, 0, 1, 2, 0))
              .darken(range(t[0].y, 0, 1, 3, 0))

    let topQuad = []

    const mults = 3

    let structureStrokeWeight = (1 - howFarForward) * 5 * this.sizeVar

    if(f.y < 4) {
      structureStrokeWeight = this._s / 250
    }

    // For continuing the "curtain" to the left, so from x = 0
    // Maintain the same height at the corners
    let firstCurtainLength

    let bubbleChance = 0

    let bubbleRows = 15

    if(f.y < bubbleRows)
      bubbleChance = FXRandomBetween(0.025, 0.125) * (1 - f.y / bubbleRows)

    let curtainDifference = FXRandomBetween(0.01, 0.1)


    const bubbleRowFactor = (bubbleRows - f.y) / bubbleRows // goes from 1 -> 0
    const bubbleAlpha = FXRandomBetween(0.2, 1)


    // same call is used twice, as there are two seperate loops to 
    // cater for overdrawing layers issue
    const setupPoint = (i, j) => {
      const isEdge = (j < 2 || j > gridRes - 1 || i < 2 || i > gridRes - 1)

      let additionalHeightModifier = range(Math.sin(t[0].x * 4), -1, 1, 0, 0.2)

      let pointHeight = isBorder ?
            height + heightModifier + additionalHeightModifier + BORDER_HEIGHT :
            height + heightModifier + additionalHeightModifier

      let offset = Math.sin(i / surfaceSinAdjust) * Math.cos(j / surfaceCosAdjust)
      pointHeight += range(offset, -1, 1, -surfaceAmplitude, surfaceAmplitude)              
      
      let pointCol

      if(lightMode)
        pointCol = col.brighten((gridRes - j) / gridRes).desaturate(Math.abs(0.75 - height) / 2)
      else
        pointCol = col.darken((gridRes - j) / gridRes).desaturate(Math.abs(0.75 - height) / 2)

      if(isEdge) {
        pointCol = pointCol.darken(0.2)
      }

      let point = v().set(prj.getProjectedPoint([
        f.x + (i * xRes),
        f.y + (j * yRes),
        pointHeight
      ]))

      return {
        point,
        pointCol,
        pointHeight,
        offset
      }
    }


    this._p5.stroke(col.brighten().hex())
    this._p5.strokeWeight(1)
    this._p5.fill(0, 0)

    /**
     * Loop 1 - drawing the bubbles
     */
    for(let j = 0; j <= gridRes; j++) {
      for(let i = 0; i <= gridRes; i++) {


        // Draw the bubbles rising from the tiles
        if(FXRandomBetween(0, 1) < bubbleChance) {
          
          // spawn a source of bubbles
          const bubbleDarken = FXRandomBetween(0, 1) * (1 - bubbleRowFactor)
          const bubbleDesaturate = FXRandomBetween(0, (j/gridRes) * 2) * (1 - bubbleRowFactor)
          const bubbleSize = [FXRandomBetween(0.2, 0.5), FXRandomBetween(0.5, 3.5)]
          
          let bubbleHeight = isBorder ? BORDER_HEIGHT : 0

          const bubble = v().set(prj.getProjectedPoint([
            f.x + (i * xRes),
            f.y + (j * yRes),
            0
          ]))

          const bubbleHeightRange = [FXRandomBetween(-0.0002, -0.001), FXRandomBetween(0.002, 0.015)]

          for(let k = 0; k < FXRandomIntBetween(15, 30); k++) {

            bubbleHeight += Math.pow(k * 0.0002, 1.05) + FXRandomBetween(bubbleHeightRange[0], bubbleHeightRange[1])

            const bubbleCol = col
                              .darken(bubbleDarken + (k * 0.05))
                              .alpha(((25 - k) / 25) * bubbleRowFactor * bubbleAlpha)
                              .desaturate(bubbleDesaturate)

            // adjust within screen-space. They'll always be going directly up
            let point = bubble.copy()
            point = point.sub(v(0, bubbleHeight))
            this._p5.stroke(bubbleCol.hex())
            this._p5.fill(bubbleCol.darken(1).hex())

            this._p5.circle((point.x + FXRandomBetween(-k * 0.0002, k * 0.0002)) * this._s,
                            point.y * this._s,
                            FXRandomBetween(bubbleSize[0], bubbleSize[1]) * rowFactor * this.sizeVar)

          }

        }
      }
    }

    /**
     * Loop 2 - drawing the tops of the structures
     */
    this._p5.strokeWeight(2 * this.sizeVar * rowFactor)

    for(let j = 0; j <= gridRes; j++) {
      for(let i = 0; i <= gridRes; i++) {
        const pointData = setupPoint(i, j)
        this._p5.stroke(pointData.pointCol.hex())
        this._p5.circle(pointData.point.x * this._s, pointData.point.y * this._s, rowFactor)
      }
    }


    /**
     * Loop 3 - drawing the "side curtains"
     *
     * This needs done entirely after drawing the tops, as otherwise
     * the top layer can end up overlaying the sides if viewing the top
     * from below
     */
    for(let j = 0; j <= gridRes; j++) {
      for(let i = 0; i <= gridRes; i++) {

        this._p5.strokeWeight(structureStrokeWeight * rowFactor)

        const pointData = setupPoint(i, j)

        const point = pointData.point
        const pointCol = pointData.pointCol
        const pointHeight = pointData.pointHeight

        // Draw ever-fainter quads the further back we go
        // Gives the impression of the front quads being more prominent
        const floorPoint = this._p5.createVector(point.x * this._s, point.y * this._s - height)


        // Draw a "curtain" effect hanging down from the front/sides
        // of each quad
        // 
        // Checking for !isCenter - drawing left/right walls here
        // causes a glitch
        // 
        if( j == 0 ||
            (t[0].x < 0.5 && i == gridRes && !isCenter) ||
            (t[0].x > 0.5 && i == 0 && !isCenter)
          ) {
          
          let curtainCol = pointCol.desaturate(Math.abs(0.75 - height) / 2)

          if(j !== 0 && (i == 0 || i == gridRes)) {
            curtainCol = curtainCol.darken(1 + (j / gridRes) * 2)
          }

          // Shine
          const shineFactor = Math.sin(t[0].x * 4) * Math.cos(t[0].y * 8)
          curtainCol = curtainCol.brighten(shineFactor / 3)

          this._p5.stroke(curtainCol
                      .hex())

          let k = 1
          let curtainStringModifier = FXRandomBetween(curtainStringModiferRange[0], curtainStringModiferRange[1])

          if(!lastCurtainLength) {
            lastCurtainLength = FXRandomBetween(pointHeight * 0.5, pointHeight * 0.75)
            firstCurtainLength = lastCurtainLength
          }

          if(j == 1 && i == 0) {
            lastCurtainLength = firstCurtainLength
          }

          if(lastCurtainLength < 0)
            lastCurtainLength = 0

          let curtainEnd = v().set(prj.getProjectedPoint([
            f.x + (i * xRes + (k * (xRes / 4))),
            f.y + (j * yRes),
            pointHeight - lastCurtainLength
          ]))

          let curtainStart = v().set(prj.getProjectedPoint([
            f.x + (i * xRes + (k * (xRes / 4))),
            f.y + (j * yRes),
            pointHeight
          ]))


          this.fadeLine({
            from: curtainStart,
            to: curtainEnd,
            fromColor: curtainCol.hex(),
            toColor: curtainCol.saturate(2).hex(),
            segments: gridRes,
            strokeWeight: 3 * this.sizeVar * rowFactor
          })

          lastCurtainLength += curtainStringModifier

        }

      }
    }


 
    return


  }

  afterDraw () {
    this.end = new Date().getTime()

    console.log("Elapsed = ", this.end - this.start)

    this.finishedMainDraw = true
    this.delayCenterTiles.forEach(tile => {
      this.drawTile(tile.t, tile.f, tile.isBorder)
    })
  }

  static author () { return 'Robin Metcalfe' }

  static name () { return 'Cities In Flux' }
}




/**
 * Creates cubic-bezier easing functions.
 *
 * https://github.com/thednp/CubicBezier/blob/master/src/cubic-bezier-easing.js
 *
 * MIT License

Copyright (c) 2020 thednp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 * 
 * @class
 */
class CubicBezier {
  /**
   * @constructor
   * @param {number} p1x - first point horizontal position
   * @param {number} p1y - first point vertical position
   * @param {number} p2x - second point horizontal position
   * @param {number} p2y - second point vertical position
   * @param {string=} functionName - an optional function name
   * @returns {(t: number) => number} a new CubicBezier easing function
   */
  constructor(p1x, p1y, p2x, p2y, functionName) {
    // pre-calculate the polynomial coefficients
    // First and last control points are implied to be (0,0) and (1.0, 1.0)
  
    /** @type {number} */
    this.cx = 3.0 * p1x;
  
    /** @type {number} */
    this.bx = 3.0 * (p2x - p1x) - this.cx;

    /** @type {number} */
    this.ax = 1.0 - this.cx - this.bx;
    
    /** @type {number} */
    this.cy = 3.0 * p1y;
  
    /** @type {number} */
    this.by = 3.0 * (p2y - p1y) - this.cy;
  
    /** @type {number} */
    this.ay = 1.0 - this.cy - this.by;
    
    /** @type {(t: number) => number} */
    const BezierEasing = (t) => this.sampleCurveY(this.solveCurveX(t));

    // this function needs a name
    Object.defineProperty(BezierEasing, 'name', { writable: true });
    BezierEasing.name = functionName || `cubic-bezier(${[p1x, p1y, p2x, p2y]})`;

    return BezierEasing;
  }

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled X value
   */
  sampleCurveX(t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  }

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled Y value
   */
  sampleCurveY(t) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
  }

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled curve derivative X value
   */
  sampleCurveDerivativeX(t) {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
  }

  /**
   * @param {number} x - progress [0-1]
   * @return {number} - solved curve X value
   */
  solveCurveX(x) {
    let t0;
    let t1;
    let t2;
    let x2;
    let d2;
    let i;
    const epsilon = 1e-5; // Precision

    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 32; i += 1) {
      x2 = this.sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) return t2;
      d2 = this.sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < epsilon) break;
      t2 -= x2 / d2;
    }

    // No solution found - use bi-section
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;

    if (t2 < t0) return t0;
    if (t2 > t1) return t1;

    while (t0 < t1) {
      x2 = this.sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) return t2;
      if (x > x2) t0 = t2;
      else t1 = t2;

      t2 = (t1 - t0) * 0.5 + t0;
    }

    // Give up
    return t2;
  }
}