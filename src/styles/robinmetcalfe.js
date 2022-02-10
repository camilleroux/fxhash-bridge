// Robin Metcalfe
// Status: WIP // "WIP", "Ready"
// Wallet: tz1a3ZWW7sdgX3JGp3h316TvsgpiVGWFYihe

import Style from './style'
import { FXInit, FXRandomBetween, FXRandomIntBetween, getWeightedOption } from '@liamegan1/fxhash-helpers'
import chroma from "chroma-js";
import p5 from 'p5'

// todo - scale e.g. bubbles based on screen size

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
let heightRange = [FXRandomBetween(0.005, BORDER_HEIGHT), FXRandomBetween(BORDER_HEIGHT, 0.25)]
let heightVarianceRange = [FXRandomBetween(0.01, 0.05), FXRandomBetween(0.05, 0.25)]
let colorRange = chroma.scale(['#666', '#f00'])
let borderHeightRange = [FXRandomBetween(2, 4), FXRandomBetween(4, 7)]

let surfaceSinAdjust = FXRandomBetween(2, 8)
let surfaceCosAdjust = FXRandomBetween(2, 8)
let surfaceAmplitude = FXRandomBetween(0.001, 0.003)


const palettes = [
  ["ff5400","ff6d00","ff8500","ff9100","ff9e00","00b4d8","0096c7","0077b6","023e8a","03045e"],
  ["7400b8","6930c3","5e60ce","5390d9","4ea8de","48bfe3","56cfe1","64dfdf","72efdd","80ffdb"],
  ["b7094c","a01a58","892b64","723c70","5c4d7d","455e89","2e6f95","1780a1","0091ad"],
  ["ff6d00","ff7900","ff8500","ff9100","ff9e00","240046","3c096c","5a189a","7b2cbf","9d4edd"]
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

  }

  beforeDraw () {
    this._p5.background('#eee')
    this.background()
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
    segments = 32
  }) {

    let lastPoint = from
    let scale = chroma.scale([fromColor, toColor])
    for(let i = 0; i < segments; i++) {
      let point = p5.Vector.lerp(from, to, i / segments)
      this._p5.stroke(scale(i / segments).alpha((segments - i) / segments).hex())
      this._p5.line(lastPoint.x * this._s,
                    lastPoint.y * this._s,
                    point.x * this._s,
                    point.y * this._s)
      lastPoint = point
    }
    
  }




  background() {
    
    
    let col = pal(0).darken(2).desaturate(1.1)
    
    this._p5.strokeWeight(0)

    const center = this.v().set(this.prj.getProjectedPoint([0, this._gridSizeY, 0.1]))

    for(let i = this._s * 2; i > 0; i--) {
      let _col = col.darken(i / this._s * 2)
      this._p5.fill(_col.hex())
      this._p5.stroke(_col.hex())
      this._p5.circle(center.x * this._s, center.y * this._s, i)

      //const center = 

      /*const c1 = this.v().set(this.prj.getProjectedPoint([-this._gridSizeX * 10, this._gridSizeY, i * 3]))
      
      const second = this.v().set(this.prj.getProjectedPoint([this._gridSizeX * 10, this._gridSizeY, i]))
      const c2 = this.v().set(this.prj.getProjectedPoint([this._gridSizeX * 10, this._gridSizeY, i * 3]))*/
      
      /*this._p5.stroke('#006')
      this._p5.circle(c1.x * this._s, c1.y * this._s, 10)
      this._p5.stroke('#666')
      this._p5.circle(first.x * this._s, first.y * this._s, 10)
      this._p5.stroke('#666')
      this._p5.circle(second.x * this._s, second.y * this._s, 10)
      this._p5.stroke('#600')
      this._p5.circle(c2.x * this._s, c2.y * this._s, 10)*/

      /*this._p5.stroke(_col.hex())

      this._p5.curve(
          c1.x * this._s, c1.y * this._s,
          first.x * this._s, first.y * this._s, 
          second.x * this._s, second.y * this._s, 
          c2.x * this._s, c2.y * this._s,
      )*/
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

    this._p5.strokeWeight(1)

    const rowFactor = (this._gridSizeY - f.y) / this._gridSizeY

    this._p5.stroke(col.desaturate((1 - rowFactor) * 3).alpha(rowFactor).hex())
    //this._p5.fill(col.desaturate(1.5).hex())
    this._p5.fill(0, 0)

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
    if(howFarForward > 0.25) {
      gridRes = 8
    } else {
      gridRes = 16
    }

    if(f.y < 4)
      gridRes = 32


    const xRes = 1 / gridRes
    const yRes = 1 / gridRes

    let height = Math.sin(f.x) + Math.cos(f.y * 4) - Math.sin((f.x + 1) % (f.y + 1))
    height = range(height, -3, 1, heightRange[0], heightRange[1])



    let lastCurtainLength

    let heightModifier = FXRandomBetween(heightVarianceRange[0], heightVarianceRange[1])

    if(isBorder)
      heightModifier *= FXRandomBetween(borderHeightRange[0], borderHeightRange[1])

    //let col = colorRange(t[0].x)
    col = col.desaturate(range(t[0].y, 0, 1, 2, 0))
              .darken(range(t[0].y, 0, 1, 3, 0))

    let topQuad = []

    const mults = 3

    let structureStrokeWeight = (1 - howFarForward) * 3

    if(f.y < 4) {
      structureStrokeWeight = this._s / 250
    }

    



    // For continuing the "curtain" to the left, so from x = 0
    let firstCurtainLength

    let bubbleChance = 0

    if(f.y < 8)
      bubbleChance = FXRandomBetween(0.01, 0.05) * (1 - f.y / 8)

    let curtainDifference = FXRandomBetween(0.01, 0.1)


    const bubbleRowFactor = (8 - f.y) / 8 // goes from 1 -> 0
    const bubbleAlpha = FXRandomBetween(0.2, 1)

    for(let j = 0; j <= gridRes; j++) {
      for(let i = 0; i <= gridRes; i++) {


        // Draw the bubbles
        if(FXRandomBetween(0, 1) < bubbleChance) {
          // spawn a source of bubbles
          this._p5.stroke(col.brighten().hex())
          this._p5.strokeWeight(1)
          this._p5.fill(0, 0)

          const bubbleDarken = FXRandomBetween(0, 1) * (1 - bubbleRowFactor)
          const bubbleDesaturate = FXRandomBetween(0, (j/gridRes) * 2) * (1 - bubbleRowFactor)
          const bubbleSize = [FXRandomBetween(0.5, 1.5), FXRandomBetween(1.5, 3)]
          
          let bubbleHeight = isBorder ? BORDER_HEIGHT : 0

          const bubble = v().set(prj.getProjectedPoint([
            // make the resolution of the "curtain" effect
            // 4 times finer than the resolution of the quad
            f.x + (i * xRes),
            f.y + (j * yRes),
            bubbleHeight
          ]))



          for(let k = 0; k < 25; k++) {

            bubbleHeight += Math.pow(k * 0.0002, 1.05) + FXRandomBetween(-0.0005, 0.004)

            // adjust within screen-space. They'll always be going directly up
            let point = bubble.copy()
            point = point.sub(v(0, bubbleHeight))
            this._p5.stroke(col
                              .darken(bubbleDarken + (k * 0.05))
                              .alpha(((25 - k) / 25) * bubbleRowFactor * bubbleAlpha)
                              .desaturate(bubbleDesaturate)
                              .hex())
            this._p5.circle(point.x * this._s, point.y * this._s, FXRandomBetween(bubbleSize[0], bubbleSize[1]) * rowFactor)

          }

          
        }


        // Draw the top part
        // 
        // Todo - deduplicate this!
        const isEdge = (j <= 2 || j >= gridRes - 2 || i <= 2 || i >= gridRes - 2)

        let additionalHeightModifier = range(Math.sin(t[0].x * 4), -1, 1, 0, 0.2)

        let pointHeight = isBorder ?
              height + heightModifier + additionalHeightModifier + BORDER_HEIGHT :
              height + heightModifier + additionalHeightModifier

        let offset = Math.sin(i / surfaceSinAdjust) * Math.cos(j / surfaceCosAdjust)
        pointHeight += range(offset, -1, 1, -surfaceAmplitude, surfaceAmplitude)              
        
        let pointCol = col.darken((gridRes - j) / gridRes).desaturate(Math.abs(0.75 - height))
        if(isEdge) {
          pointCol = pointCol.darken(0.2)
        }

        const point = v().set(prj.getProjectedPoint([
                f.x + (i * xRes),
                f.y + (j * yRes),
                pointHeight
              ]))        

        this._p5.stroke(pointCol.hex())
        this._p5.circle(point.x * this._s, point.y * this._s, 1)


      }
    }

    for(let j = 0; j <= gridRes; j++) {
      for(let i = 0; i <= gridRes; i++) {

        

        this._p5.strokeWeight(structureStrokeWeight)

        // determine distance from edges
        const isEdge = (j <= 2 || j >= gridRes - 2 || i <= 2 || i >= gridRes - 2)

        let additionalHeightModifier = range(Math.sin(t[0].x * 4), -1, 1, 0, 0.2)

        let pointHeight = isBorder ?
              height + heightModifier + additionalHeightModifier + BORDER_HEIGHT :
              height + heightModifier + additionalHeightModifier

        let offset = Math.sin(i / surfaceSinAdjust) * Math.cos(j / surfaceCosAdjust)
        pointHeight += range(offset, -1, 1, -surfaceAmplitude, surfaceAmplitude)

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



        // Draw a "curtain" effect hanging down from the front
        // of each quad
        if(j == 0 || (t[0].x < 0.5 && i == gridRes) || (t[0].x > 0.5 && i == 0)) {
          
          let curtainCol = col.desaturate(Math.abs(0.75 - height))

          if(j !== 0 && (i == 0 || i == gridRes)) {
            curtainCol = curtainCol.darken(1 + (j / gridRes) * 2)
          }

          // Shine
          const shineFactor = Math.sin(t[0].x * 2) * Math.cos(t[0].y * 4)
          curtainCol = curtainCol.brighten(shineFactor / 3)

          this._p5.stroke(curtainCol
                      //.brighten(Math.sin(j % (i + 1)) * Math.cos(j * gridRes))
                      //.darken(Math.sin(j * 4 / ((i + 1) * 8)) * Math.cos(4 * i + j))
                      .hex())

          for(let k = 0; k < 1; k++) {
            let curtainStringModifier = FXRandomBetween(curtainStringModiferRange[0], curtainStringModiferRange[1])
            
            
            //if(f.y < 1)
              //continue
            

            if(!lastCurtainLength) {
              lastCurtainLength = FXRandomBetween(pointHeight / 4, pointHeight / 2)
              firstCurtainLength = lastCurtainLength
            }

            if(j == 1 && i == 0) {
              lastCurtainLength = firstCurtainLength
            }

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
            
            //p5.line(
              //curtainStart.x * this._s,
              //curtainStart.y * this._s,
              //curtainEnd.x * this._s,
              //curtainEnd.y * this._s
            //)*/
            //


            this.lerpLine({
              from: curtainStart,
              to: curtainEnd,
              fromColor: curtainCol.hex(),
              toColor: curtainCol.saturate(2).hex(),
              segments: gridRes
            })

            


            /*if(f.y < 4) {

              curtainCol = curtainCol.desaturate(1.25).brighten(1.25)

              this._p5.stroke(curtainCol
                      .brighten(Math.sin(j % (i + 1)) * Math.cos(j * gridRes))
                      .desaturate(Math.sin(j * 4 / ((i + 1) * 8)) * Math.cos(4 * i + j))
                      .alpha(f.y / 4)
                      .hex())

              let floorCurtainStart = v().set(prj.getProjectedPoint([
                // make the resolution of the "curtain" effect
                // 4 times finer than the resolution of the quad
                f.x + (i * xRes + (k * (xRes / 4))),
                f.y + (j * yRes),
                isBorder ? BORDER_HEIGHT : 0
              ]))

              let floorCurtainEnd = v().set(prj.getProjectedPoint([
                // make the resolution of the "curtain" effect
                // 4 times finer than the resolution of the quad
                f.x + (i * xRes + (k * (xRes / 4))),
                f.y + (j * yRes),
                ((pointHeight - lastCurtainLength) - curtainDifference) / 2
              ]))

              this.lerpLine({
                from: floorCurtainStart,
                to: floorCurtainEnd,
                fromColor: curtainCol.hex(),
                toColor: curtainCol.saturate(2).hex(),
                segments: gridRes
              })
            }

            /*p5.line(
              floorCurtainStart.x * this._s,
              floorCurtainStart.y * this._s,
              floorCurtainEnd.x * this._s,
              floorCurtainEnd.y * this._s
            )*/

            lastCurtainLength += curtainStringModifier

          }
        }

      }
    }


 
    return


  }

  afterDraw () {

  }

  static author () { return 'Robin Metcalfe' }

  static name () { return 'Downtown' }
}
