// Camille Roux
// Status: Don't mint // "WIP", "Ready"
// Twitter: @camillerouxart
// Fxhash: https://www.fxhash.xyz/u/Camille%20Roux
// Wallet: tz1WEZkz46AZmGbW32qwUHsdA2PBBATgixth

import Style from './style'
import { createCols } from '../utils'

const palettes = ['https://coolors.co/fdfffc-2ec4b6-ff9f1c-e71d36-011627', 'https://coolors.co/011627-ff9f1c-2ec4b6-e71d36-fdfffc']
export default class DemoStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    const palette = this._p5.random([0, 0, 0, 1])
    this.colors = createCols(palettes[palette])
    this.backgroundColor = this.colors.pop()
    this.defaultColor = this.colors[0]
  }

  beforeDraw () {
    this._p5.background(this.backgroundColor)
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    this._p5.stroke(this.defaultColor)
    this._p5.fill(isBorder ? this.colors[2] : this.defaultColor)
    this._p5.quad(tilePoints[0].x * this._s, tilePoints[0].y * this._s, tilePoints[1].x * this._s, tilePoints[1].y * this._s, tilePoints[2].x * this._s, tilePoints[2].y * this._s, tilePoints[3].x * this._s, tilePoints[3].y * this._s)
  }

  afterDraw () {
    this._p5.stroke(this.colors[0])
    this._p5.strokeWeight(0.05 * this._s)
    this._p5.noFill()
    this._p5.rect(0, 0, this._s, this._s)
  }

  static author () { return 'Camille Roux' }

  static name () { return 'Demo' }
}
