// Camille Roux
// Status: WIP // "WIP", "Ready"
// Twitter: @camillerouxart
// Fxhash: https://www.fxhash.xyz/u/Camille%20Roux
// Wallet: tz1WEZkz46AZmGbW32qwUHsdA2PBBATgixth

import Style from './style'
import { createCols } from '../utils'

const palettes = ['https://coolors.co/fdfffc-2ec4b6-ff9f1c-e71d36-011627']

export default class CamilleRouxStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.colors = createCols(palettes[0])
    this.backgroundColor = this.colors.pop()
    this.defaultColor = this.colors[0]
  }

  beforeDraw () {
    this._p5.background(this.backgroundColor)

    // Draw stars
    this._p5.push()
    const colorStars = this._p5.color(this.defaultColor)
    const horizon = this._projectionCalculator3d.getProjectedPoint([0, this._gridSizeY, 0])[1]
    for (let i = 0; i < 2000; i++) {
      colorStars.setAlpha(this._p5.random(50, 200))
      this._p5.noFill()
      this._p5.stroke(colorStars)
      this._p5.strokeWeight((0.0001 * this._p5.random(1, 3)) * this._s)
      const radius = this._p5.random(Math.SQRT2)
      const angle = this._p5.random(this._p5.PI, this._p5.TWO_PI)
      const angleDist = this._p5.random(this._p5.PI / 40, this._p5.TWO_PI / 20)
      this._p5.arc(0.5 * this._s, horizon * this._s, radius * this._s, radius * this._s, Math.max(this._p5.PI, angle - angleDist / 2), Math.min(angle + angleDist / 2, this._p5.TWO_PI))
    }

    // Draw grid
    colorStars.setAlpha(150)
    for (let i = -100.5; i < 101; i++) {
      const coord1 = this._projectionCalculator3d.getProjectedPoint([i, 0, 0])
      const coord2 = this._projectionCalculator3d.getProjectedPoint([i, this._gridSizeY, 0])
      this._p5.stroke(colorStars)
      this._p5.strokeWeight(0.0002 * this._s)
      this._p5.line(coord1[0] * this._s, coord1[1] * this._s, coord2[0] * this._s, coord2[1] * this._s)
    }
    for (let i = 0; i < this._gridSizeY; i++) {
      const coord1 = this._projectionCalculator3d.getProjectedPoint([-1000, i, 0])
      const coord2 = this._projectionCalculator3d.getProjectedPoint([1000, i, 0])
      this._p5.stroke(colorStars)
      this._p5.strokeWeight(0.0002 * this._s)
      this._p5.line(coord1[0] * this._s, coord1[1] * this._s, coord2[0] * this._s, coord2[1] * this._s)
    }
    this._p5.pop()
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    this._p5.noStroke()
    this._p5.fill(isBorder ? this.defaultColor : this._p5.random(this.colors))
    for (let tilePointId = 0; tilePointId < tilePoints.length; tilePointId++) {
      const dotDensity = Math.pow((this._gridSizeY - frontLeftCorner3DCoord.y * 0.8) / this._gridSizeY, 2)
      for (let i = 0; i < 4000 * dotDensity; i++) {
        const pointOriginVect = tilePoints[tilePointId].copy()
        const pointVect = pointOriginVect.lerp(tilePoints[(tilePointId + 1) % tilePoints.length], this._p5.random())
        this._p5.rect(pointVect.x * this._s, (pointVect.y - Math.abs(this._p5.randomGaussian(0, isBorder ? 0.08 : 0.03) * this._p5.map(frontLeftCorner3DCoord.y, 0, this._gridSizeY, 1, 0.2))) * this._s, this._s * this._p5.map(frontLeftCorner3DCoord.y, 0, this._gridSizeY, 0.0005, 0.0001))
      }
    }
  }

  static author () { return 'Camille Roux' }

  static name () { return 'Evaporating' }
}
