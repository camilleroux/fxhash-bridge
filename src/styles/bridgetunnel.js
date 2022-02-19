// Laurent Houdard
// Status: Ready
// Twitter: @CablesAndPixels
// Fxhash: https://www.fxhash.xyz/u/Laurent%20Houdard
// Wallet: tz1WwNyzXEGvSxZDEvugnDghcsQabxHWcsvn

import Style from './style'

export default class BridgeTunnelStyle extends Style {
  beforeDraw () {
    this._endMode = this._p5.random(['light', 'dark'])
    this._borderMode = this._p5.random(['a', 'b'])
    this._amplitude = this._p5.random(0.5, 1)
    this._texture = this._p5.random(0.1, 1)

    this._S = this._s * this._p5.pixelDensity()
    this._depth = 4
    this._p5.background('#000000')
    this._p5.noStroke()

    // Prevent rendering differences on some browsers
    this._p5.loadPixels()
    this._p5.updatePixels()
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    let { x, y, z } = frontLeftCorner3DCoord
    let gx = this._gridSizeX
    let gy = this._gridSizeY

    let grids = []
    for (let yo = 0; yo < this._depth * gy; yo += gy) {
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
      let f1 = g[0][1] / (this._depth * gy - 1)
      let f2 =
        (isBorder && this._borderMode === 'b') ?
        0 : (1 - f1) + this._p5.random(- this._amplitude, this._amplitude)
      let c = this._p5.color(
        Math.floor(256 * f2), // Color
        Math.floor(256 * f1), // Light
        255 // Mask
      )
      this.tilePointsQuad(c, g)
    }
  }

  afterDraw () {
    let endy = this._depth * this._gridSizeY
    let gxh = this._gridSizeX / 2
    this.tilePointsQuad('#00ff00', [
      [-gxh, endy, 0],
      [-gxh, endy, 1],
      [gxh, endy, 1],
      [gxh, endy, 0]
    ])

    this._p5.loadPixels()

    const p = this._p5.pixels
    for (let i = 0; i < p.length; i += 4) {
      let v1 = p[i]
      if (this._p5.random() < this._texture) {
        let v2 = v1 > 127 ? 255 : 0
        let e = (v1 - v2) / 16
        p[i + 4] += e * 7
        p[i - 4 + this._S * 4] += e * 5
        p[i + 0 + this._S * 4] += e * 3
        p[i + 4 + this._s * 4] += e * 1
      }
      let mask = (p[i + 2] / 255)
      let v
      if (this._endMode === 'light') {
        v = Math.max(v1 * mask, p[i + 1] * 2)
      }
      else {
        let light = (1 - p[i + 1] / 255)
        v = v1 * mask * light * light
      }
      p[i] = v
      p[i + 1] = v
      p[i + 2] = v
      p[i + 3] = 255
    }

    this._p5.updatePixels()
  }

  tilePointsQuad (c, g) {
    let tilePoints = g.map(v => this._p5.createVector().set(
      this._projectionCalculator3d.getProjectedPoint(v)
    ))
    this._p5.fill(c)
    this._p5.quad(tilePoints[0].x * this._s,
                  tilePoints[0].y * this._s,
                  tilePoints[1].x * this._s,
                  tilePoints[1].y * this._s,
                  tilePoints[2].x * this._s,
                  tilePoints[2].y * this._s,
                  tilePoints[3].x * this._s,
                  tilePoints[3].y * this._s)
  }

  static author () { return 'Laurent Houdard' }

  static name () { return 'Bridge-Tunnel' }
}
