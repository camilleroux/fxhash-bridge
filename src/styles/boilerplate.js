// Camille Roux
// Status: WIP // "WIP", "Ready"
// Wallet: tz.....

import Style from './style'

export default class BoilerplateStyle extends Style {
  beforeDraw () {
    this._p5.background('#011627')
  }

  drawTile (tilePoints, frontLeftCorner3DCoord) {
    this._p5.stroke('#fdfffc')
    this._p5.fill('#011627')
    this._p5.quad(tilePoints[0].x * this._s, tilePoints[0].y * this._s, tilePoints[1].x * this._s, tilePoints[1].y * this._s, tilePoints[2].x * this._s, tilePoints[2].y * this._s, tilePoints[3].x * this._s, tilePoints[3].y * this._s)
  }

  afterDraw () {}

  static author () { return 'Camille Roux' }

  static name () { return 'Boilerplate' }
}
