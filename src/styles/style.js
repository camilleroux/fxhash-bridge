export default class Style {
  constructor (s, projectionCalculator3d, p5) {
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
