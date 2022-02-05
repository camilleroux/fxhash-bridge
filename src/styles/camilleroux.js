// Camille Roux
// wallet: tz1WEZkz46AZmGbW32qwUHsdA2PBBATgixth

import Style from './style'
import { createCols } from '../utils'
import { getWeightedOption } from '@liamegan1/fxhash-helpers'

const palettes = ['https://coolors.co/fdfffc-2ec4b6-ff9f1c-e71d36-011627', 'https://coolors.co/011627-ff9f1c-2ec4b6-e71d36-fdfffc']

export default class CamilleRouxStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    const palette = 0 // getWeightedOption([[0, 9], [1, 1]])
    this.colors = createCols(palettes[palette])
    this.backgroundColor = this.colors.pop()
    this.defaultColor = this.colors[0]
  }

  beforeDraw () {
    this._p5.background(this.backgroundColor)

    // Draw stars
    this._p5.push()
    const colorStars = this._p5.color(this.defaultColor)
    for (let i = 0; i < 400; i++) {
      colorStars.setAlpha(this._p5.random(100, 255))
      this._p5.fill(colorStars)
      this._p5.noStroke()
      this._p5.ellipse(this._p5.random() * this._s, Math.abs(this._p5.randomGaussian(0, 0.3)) * this._s, (0.001 * this._p5.random(1, 2)) * this._s)
    }
    this._p5.pop()
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    // this._p5.noStroke() // this._p5.stroke(this.defaultColor)
    // this._p5.fill(isBorder ? this.colors[2] : this.defaultColor)
    // this._p5.fill(this.backgroundColor)
    // this._p5.quad(tilePoints[0].x * this._s, tilePoints[0].y * this._s, tilePoints[1].x * this._s, tilePoints[1].y * this._s, tilePoints[2].x * this._s, tilePoints[2].y * this._s, tilePoints[3].x * this._s, tilePoints[3].y * this._s)

    this._p5.fill(isBorder ? this.defaultColor : this._p5.random(this.colors))
    for (let tilePointId = 0; tilePointId < tilePoints.length; tilePointId++) {
      const dotDensity = Math.pow((this._gridSizeY - frontLeftCorner3DCoord.y) / this._gridSizeY, 9)
      for (let i = 0; i < 5000 * dotDensity; i++) {
        this._p5.noStroke()
        const pointOriginVect = tilePoints[tilePointId].copy()
        const pointVect = pointOriginVect.lerp(tilePoints[(tilePointId + 1) % tilePoints.length], this._p5.random())
        this._p5.rect(pointVect.x * this._s, (pointVect.y - Math.abs(this._p5.randomGaussian(0, 0.07))) * this._s, this._s * 0.0005)
      }
    }
    // this._p5.stroke('red')
    // this._p5.quad(tilePoints[0].x * this._s, tilePoints[0].y * this._s, tilePoints[1].x * this._s, tilePoints[1].y * this._s, tilePoints[2].x * this._s, tilePoints[2].y * this._s, tilePoints[3].x * this._s, tilePoints[3].y * this._s)
  }

  static author () { return 'Camille Roux' }

  static name () { return 'Demo' }
}
