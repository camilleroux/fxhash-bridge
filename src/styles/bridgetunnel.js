// Laurent Houdard
// Status: Ready
// Twitter: @CablesAndPixels
// Fxhash: https://www.fxhash.xyz/u/Laurent%20Houdard
// Wallet: tz1WwNyzXEGvSxZDEvugnDghcsQabxHWcsvn

import Style from './style'

export default class BridgeTunnelStyle extends Style {
  beforeDraw () {
    this._S = this._s * this._p5.pixelDensity()
    this._white = this._p5.color('#ffffff')
    this._black = this._p5.color('#000000')
    this._p5.background(this._black)
    this._p5.stroke(this._black)

    // Prevent rendering differences on some browsers
    this._p5.loadPixels()
    this._p5.updatePixels()
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    let { x, y, z } = frontLeftCorner3DCoord
    let gx = this._gridSizeX
    let gy = this._gridSizeY
    let depth = 3

    let grids = []
    for (let yo = 0; yo < depth * gy; yo += gy) {
      grids.push([
        [x, yo + y, z],
        [x, yo + y + 1, z],
        [x + 1, yo + y + 1, z],
        [x + 1, yo + y, z],
      ])
      grids.push([
        [x, yo + y, 1 - z],
        [x, yo + y + 1, 1 - z],
        [x + 1, yo + y + 1, 1 - z],
        [x + 1, yo + y, 1 - z],
      ])
      if (!isBorder) {
        grids.push([
          [-gx / 2, yo + y, x / gx + 0.5],
          [-gx / 2, yo + y + 1, x / gx + 0.5],
          [-gx / 2, yo + y + 1, (x + 1) / gx + 0.5],
          [-gx / 2, yo + y, (x + 1) / gx + 0.5],
        ])
        grids.push([
          [gx / 2, yo + y, x / gx + 0.5],
          [gx / 2, yo + y + 1, x / gx + 0.5],
          [gx / 2, yo + y + 1, (x + 1) / gx + 0.5],
          [gx / 2, yo + y, (x + 1) / gx + 0.5],
        ])
      }
    }
    for (let g of grids) {
      let fy = Math.sqrt(g[0][1] / (depth * gy)) +
               this._p5.random(-0.25, 0.25)
      let gray = this._p5.lerpColor(this._white, this._black, fy)
      this._p5.strokeWeight(0.25 * (1 - fy))
      this.tilePointsQuad(gray, g.map(v => this._p5.createVector().set(
        this._projectionCalculator3d.getProjectedPoint(v)
      )))
    }
  }

  tilePointsQuad (color, tilePoints) {
    this._p5.fill(color)
    this._p5.quad(tilePoints[0].x * this._s,
                  tilePoints[0].y * this._s,
                  tilePoints[1].x * this._s,
                  tilePoints[1].y * this._s,
                  tilePoints[2].x * this._s,
                  tilePoints[2].y * this._s,
                  tilePoints[3].x * this._s,
                  tilePoints[3].y * this._s)
  }

  afterDraw () {
    this._p5.loadPixels()
    const p1 = this._p5.pixels
    const p2 = new Uint8ClampedArray(p1)
    for (let i = 0; i < p2.length; i += 4) {
      let v1 = p2[i] - this._p5.random() * 128
      let v2 = v1 > 127 ? 255 : 0
      let e = (v1 - v2) / 16
      this.setPixel(p2, i, v2)
      this.setPixel(p2, i + 4, p2[i + 4] + e * 7)
      this.setPixel(p2, i - 4 + this._S * 4, p2[i - 4 + this._S * 4] + e * 3)
      this.setPixel(p2, i + this._S * 4, p2[i + this._S * 4] + e * 5)
      this.setPixel(p2, i + this._S * 4 + 4, p2[i + this._S * 4 + 4] + e)
    }
    for (let i = 0; i < p1.length; i+= 4) {
      let v1 = 0.9 * p1[i] + p1[i] * p1[i] / 512 - p1[i] * p2[i] / 512
      let v2 = this.bPixel(p1, i)
      let f = Math.sqrt(p1[i] / 256)
      let v3 = Math.round(f * v1 + (1 - f) * v2)
      if (v3 > 255) { v3 = 255 }
      this.setPixel(p1, i, v3)
    }
    this._p5.updatePixels()
  }

  setPixel (p, i, v) {
    if (v < p.length) {
      p[i] = v
      p[i + 1] = v
      p[i + 2] = v
      p[i + 3] = 255
    }
  }

  bPixel (p, i) {
    let val = 0
    let count = 0
    let C = 2
    for (let x = -C; x <= C; x += 1) {
      for (let y = -C; y <= C; y += 1) {
        let bi = i + x * 4 + y * this._S * 4
        if (bi > 0 && bi < p.length) {
          val += p[bi]
          count += 1
        }
      }
    }
    return val / count
  }

  static author () { return 'Laurent Houdard' }

  static name () { return 'Bridge-Tunnel' }
}
