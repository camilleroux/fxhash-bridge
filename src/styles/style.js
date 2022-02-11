// BRIDGE
// Camille Roux, 2022
export default class Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    this._gridSizeX = gridSizeX
    this._gridSizeY = gridSizeY
    this._s = s // size of the canvas
    this._projectionCalculator3d = projectionCalculator3d
    this._p5 = p5
  }

  beforeDraw () {
    this._p5.background('red')
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {

  }

  afterDraw () {}

  static author () { return '' }

  static name () { return '' }
}
