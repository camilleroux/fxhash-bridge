// Camille Roux
// Status: Ready // "WIP", "Ready"
// Twitter: @camillerouxart
// Fxhash: https://www.fxhash.xyz/u/Camille%20Roux
// Wallet: tz1WEZkz46AZmGbW32qwUHsdA2PBBATgixth

import Style from './style'
import { createCols } from '../utils'

const palettes = ['https://coolors.co/fdfffc-2ec4b6-ff9f1c-e71d36-011627', 'https://coolors.co/011627-ff9f1c-2ec4b6-e71d36-fdfffc']

export default class CamilleRoux2Style extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    const palette = 0 // getWeightedOption([[0, 9], [1, 1]])
    this.colors = createCols(palettes[palette])
    this.backgroundColor = this.colors.pop()
    this.defaultColor = this.colors[0]
    this._maxStorey = Math.floor(this._p5.random(4, 20))
    this._heightSkew = this._p5.random(2, 7)
    this._offsetSkew = this._p5.random([0.3, 1, 2])
  }

  beforeDraw () {
    this._p5.background(this.backgroundColor)

    // Draw stars
    this._p5.push()
    const colorStars = this._p5.color(this.defaultColor)
    for (let i = 0; i < 600; i++) {
      colorStars.setAlpha(this._p5.random(100, 255))
      this._p5.fill(colorStars)
      this._p5.noStroke()
      this._p5.ellipse(this._p5.random() * this._s, Math.abs(this._p5.randomGaussian(0, 0.3)) * this._s, (0.0005 * this._p5.random(1, 2)) * this._s)
    }
    this._p5.pop()

    // Draw base
    this._p5.push()
    this._p5.drawingContext.shadowOffsetX = 0
    this._p5.drawingContext.shadowOffsetY = -this._s * 0.03
    this._p5.drawingContext.shadowBlur = this._s * 0.06
    this._p5.drawingContext.shadowColor = '#00000088'
    this._p5.fill(this.backgroundColor)
    this._p5.noStroke()
    const basePoints = []
    basePoints.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2, 0, 0])))
    basePoints.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2, this._gridSizeY, 0])))
    basePoints.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([this._gridSizeX / 2, this._gridSizeY, 0])))
    basePoints.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([this._gridSizeX / 2, 0, 0])))
    this._p5.quad(basePoints[0].x * this._s, basePoints[0].y * this._s, basePoints[1].x * this._s, basePoints[1].y * this._s, basePoints[2].x * this._s, basePoints[2].y * this._s, basePoints[3].x * this._s, basePoints[3].y * this._s)

    // Draw border base
    if (window.$fxhashFeatures.borders !== 'none') {
      const border1Points = []
      border1Points.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2, -1, 0.04])))
      border1Points.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2, this._gridSizeY, 0.04])))
      border1Points.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2 + (window.$fxhashFeatures.borders === 'simple' ? 1 : 2), this._gridSizeY, 0.04])))
      border1Points.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2 + (window.$fxhashFeatures.borders === 'simple' ? 1 : 2), -1, 0.04])))
      this._p5.quad(border1Points[0].x * this._s, border1Points[0].y * this._s, border1Points[1].x * this._s, border1Points[1].y * this._s, border1Points[2].x * this._s, border1Points[2].y * this._s, border1Points[3].x * this._s, border1Points[3].y * this._s)

      const border2Points = []
      border2Points.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([this._gridSizeX / 2, -1, 0.04])))
      border2Points.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([this._gridSizeX / 2, this._gridSizeY, 0.04])))
      border2Points.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([this._gridSizeX / 2 - (window.$fxhashFeatures.borders === 'simple' ? 1 : 2), this._gridSizeY, 0.04])))
      border2Points.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([this._gridSizeX / 2 - (window.$fxhashFeatures.borders === 'simple' ? 1 : 2), -1, 0.04])))
      this._p5.quad(border2Points[0].x * this._s, border2Points[0].y * this._s, border2Points[1].x * this._s, border2Points[1].y * this._s, border2Points[2].x * this._s, border2Points[2].y * this._s, border2Points[3].x * this._s, border2Points[3].y * this._s)
    }
    this._p5.pop()
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    const maxSteps = isBorder ? 200 : 2000
    const maxStoreys = this._maxStorey
    const stepsPerStoreys = maxSteps / maxStoreys
    this._p5.noFill()
    this._p5.stroke(isBorder ? this.defaultColor : this._p5.random(this.colors))
    this._p5.strokeWeight(0.15 * Math.pow((this._gridSizeY - frontLeftCorner3DCoord.y) / this._gridSizeY, 3) * this._s / 1000)

    this._p5.quad(tilePoints[0].x * this._s, tilePoints[0].y * this._s, tilePoints[1].x * this._s, tilePoints[1].y * this._s, tilePoints[2].x * this._s, tilePoints[2].y * this._s, tilePoints[3].x * this._s, tilePoints[3].y * this._s)

    const i = frontLeftCorner3DCoord.x
    const j = frontLeftCorner3DCoord.y
    const stepCount = isBorder ? maxSteps / 3 : (Math.floor(Math.pow(this._p5.random(), this._heightSkew) * maxStoreys)) * stepsPerStoreys
    for (let step = 1; step <= stepCount; step++) {
      const shadowTilePoints = []
      let height
      if (isBorder) {
        height = this._p5.map(step, 0, maxSteps, frontLeftCorner3DCoord.z, 1 - frontLeftCorner3DCoord.z)
        // height = this._p5.map(Math.pow(this._p5.random(), 4) * stepCount, 0, maxSteps, frontLeftCorner3DCoord.z, 1 - frontLeftCorner3DCoord.z)
      } else {
        const offset = Math.pow((Math.cos(step / (stepsPerStoreys) * 2 * Math.PI + Math.PI) + 1) / 2, this._offsetSkew)
        height = (step + offset * (stepsPerStoreys)) / maxSteps
      }
      shadowTilePoints.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([i, j, height])))
      shadowTilePoints.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([i, j + 1, height])))
      shadowTilePoints.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([i + 1, j + 1, height])))
      shadowTilePoints.push(this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([i + 1, j, height])))
      this._p5.quad(shadowTilePoints[0].x * this._s, shadowTilePoints[0].y * this._s, shadowTilePoints[1].x * this._s, shadowTilePoints[1].y * this._s, shadowTilePoints[2].x * this._s, shadowTilePoints[2].y * this._s, shadowTilePoints[3].x * this._s, shadowTilePoints[3].y * this._s)
    }
  }

  static author () { return 'Camille Roux' }

  static name () { return 'Buildings' }
}
