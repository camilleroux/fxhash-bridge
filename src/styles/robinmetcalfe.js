// Robin Metcalfe
// Status: WIP // "WIP", "Ready"
// Wallet: tz1a3ZWW7sdgX3JGp3h316TvsgpiVGWFYihe

import Style from './style'
import { FXInit, FXRandomBetween, FXRandomIntBetween, getWeightedOption } from '@liamegan1/fxhash-helpers'
import chroma from "chroma-js";

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

FXInit(fxrand)

// Some random variables which are set across all tiles
let curtainStringModiferRange
let heightRange
let heightVarianceRange
let colorRange

curtainStringModiferRange = [FXRandomBetween(-0.005, -0.001), FXRandomBetween(0.001, 0.005)]
heightRange = [FXRandomBetween(0.005, 0.04), FXRandomBetween(0.04, 0.25)]
heightVarianceRange = [FXRandomBetween(0.01, 0.05), FXRandomBetween(0.05, 0.25)]
colorRange = chroma.scale(['#666', '#f00'])

const pal = chroma.scale(["012a4a","013a63","01497c","014f86","2a6f97","2c7da0","468faf","61a5c2","89c2d9","a9d6e5"])

export default class RobinMetcalfeStyle extends Style {
  
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
  }

  beforeDraw () {
    this._p5.background('#eee')
  }

  /**
   * Create a duplicate of a 
   * @return {[type]} [description]
   */
  dupe() {

  }
  
  // get tile dimensions
  dims(t) {
    return this._p5.createVector(t[1].x - t[0].x, t[1].y - t[0].y)
  }


  /**
   * Draw a segmented line which fades from one colour/alpha
   * to another
   */
  lerpLine({
    from,
    to,
    fromColor = '#f00',
    toColor = '#00f',
    fromAlpha = 1,
    toAlpha = 0,
    segments = 10
  }) {
    let lastPoint = from
    let scale = chroma.scale([fromColor, toColor])
    for(let i = 0; i < segments; i++) {
      let point = this._p5.lerp(from, to, i / segments)
      let alpha = lerp(fromAlpha, toAlpha, i / segments)
      this._p5.stroke('#ff0')
      //console.log(from, to)
      /*this._p5.line(lastPoint.x,
                    lastPoint.y,
                    point.x,
                    point.y)*/
      lastPoint = point
    }
  }


  drawTile (t, f, isBorder) {

    // Shorthand vars
    const prj = this._projectionCalculator3d
    const v = this._p5.createVector
    const p5 = this._p5

    let col = pal(FXRandomBetween(0, 1))

    // Stick with a simple 3D projection, adjust randomly based
    // on height, apply interesting effects to the "surface" of dots...

    this._p5.stroke(col.saturate(1).hex())
    this._p5.fill(col.desaturate(2).hex())

    this._p5.quad(
      t[0].x * this._s, t[0].y * this._s,
      t[1].x * this._s, t[1].y * this._s,
      t[2].x * this._s, t[2].y * this._s,
      t[3].x * this._s, t[3].y * this._s
    )

    
    const point = v().set(prj.getProjectedPoint([f.x, f.y, 0]))
    
    let gridRes = FXRandomIntBetween(8, 32)
    
    const xRes = 1 / gridRes
    const yRes = 1 / gridRes

    let height = Math.sin(f.x) + Math.cos(f.y * 4) - Math.sin(f.x % f.y)
    height = range(height, -3, 1, heightRange[0], heightRange[1])

    let lastCurtainLength

    let heightModifier = FXRandomBetween(heightVarianceRange[0], heightVarianceRange[1])

    //let col = colorRange(t[0].x)
    col = col.desaturate(range(t[0].y, 0, 1, 2, 0)).brighten(range(t[0].y, 0, 1, 3, 0))

    let topQuad = []

    const mults = 3

    for(let j = 0; j <= gridRes; j++) {
      for(let i = 0; i <= gridRes; i++) {

        let additionalHeightModifier = range(Math.sin(t[0].x * 4), -1, 1, 0, 0.2)

        const pointHeight = isBorder ?
              height + heightModifier + additionalHeightModifier + 0.04 :
              height + heightModifier + additionalHeightModifier

        const point = v().set(prj.getProjectedPoint([
                f.x + (i * xRes),
                f.y + (j * yRes),
                pointHeight                
              ]))

        // Draw ever-fainter quads the further back we go
        // Gives the impression of the front quads being more prominent
        const floorPoint = this._p5.createVector(point.x * this._s, point.y * this._s - height)



        if(i == 0 && j == 0) {
          //console.log(floorPoint)
          this.lerpLine({
            from: floorPoint,
            to: t[0].copy().mult(this._s)
          })
          //col = col.darken(1)
          //topQuad.push(point.x)
          //topQuad.push(point.y)
        }
        else if(i == 0 && j == gridRes) {
          this.lerpLine({
            from: floorPoint,
            to: t[1].copy().mult(this._s)
          })
          //col = col.darken(1)
          //topQuad.push(point.x)
          //topQuad.push(point.y)
        }
        else if(i == gridRes && j == gridRes) {
          this.lerpLine({
            from: floorPoint,
            to: t[2].copy().mult(this._s)
          })
          //col = col.darken(1)
          //topQuad.push(point.x)
          //topQuad.push(point.y)
        }
        else if(i == gridRes && j == 0) {
          this.lerpLine({
            from: floorPoint,
            to: t[3].copy().mult(this._s)
          })
          //col = col.darken(1)
          //topQuad.push(point.x)
          //topQuad.push(point.y)
        }

        p5.stroke(col.darken((gridRes - j) / gridRes).hex())
        p5.circle(point.x * this._s, point.y * this._s, 1)

        // Draw a "curtain" effect hanging down from the front
        // of each quad
        if(j == 0) {
          for(let k = 0; k < 4; k++) {
            let curtainStringModifier = FXRandomBetween(curtainStringModiferRange[0], curtainStringModiferRange[1])
            
            p5.stroke(col
                      .brighten(Math.sin(j % (i + 1)) * Math.cos(j * gridRes))
                      .darken(Math.sin(j * 2 / ((i + 1) * 4)) * Math.cos(2 * i + j))
                      .hex())

            if(!lastCurtainLength)
              lastCurtainLength = FXRandomBetween(pointHeight / 4, pointHeight / 2)

            if(lastCurtainLength < 0)
              lastCurtainLength = 0

            let curtainEnd = v().set(prj.getProjectedPoint([
              // make the resolution of the "curtain" effect
              // 4 times finer than the resolution of the quad
              f.x + (i * xRes + (k * (xRes / 4))),
              f.y + (j * yRes),
              pointHeight - lastCurtainLength
            ]))

            let curtainStart = v().set(prj.getProjectedPoint([
              // make the resolution of the "curtain" effect
              // 4 times finer than the resolution of the quad
              f.x + (i * xRes + (k * (xRes / 4))),
              f.y + (j * yRes),
              pointHeight
            ]))
            
            p5.line(
              curtainStart.x * this._s,
              curtainStart.y * this._s,
              curtainEnd.x * this._s,
              curtainEnd.y * this._s
            )

            lastCurtainLength += curtainStringModifier

          }
        }

      }
    }

    //console.log(topQuad)
    //p5.fill('#f00')
    //p5.stroke('#0f0')
    //p5.quad(...topQuad.map(i => i * this._s))
 
    return


  }

  afterDraw () {}

  static author () { return 'Robin Metcalfe' }

  static name () { return 'Robin' }
}
