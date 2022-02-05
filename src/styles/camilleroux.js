// Camille Roux
// wallet: tz1WEZkz46AZmGbW32qwUHsdA2PBBATgixth

import Style from './style'
import { createCols } from '../utils'
import { getWeightedOption } from '@liamegan1/fxhash-helpers'

const palettes = ['https://coolors.co/fdfffc-2ec4b6-ff9f1c-e71d36-011627', 'https://coolors.co/011627-ff9f1c-2ec4b6-e71d36-fdfffc']
export default class CamilleRouxStyle extends Style {
  constructor (s, projectionCalculator3d, p5) {
    super(s, projectionCalculator3d, p5)
    const palette = getWeightedOption([
      [0, 2],
      [1, 1]
    ])
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

  static author () { return 'Camille Roux' }

  static name () { return 'Demo' }
}
