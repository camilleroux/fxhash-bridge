// RVig
// Status: "Ready"
// Twitter: @rvig_art
// Fxhash: https://www.fxhash.xyz/u/rvig
// Wallet: tz1LBs6F9tZ4Qdf4vvCF9ikjeyHaQmmAW3Yu
/*
 The code for RVigStyle is Copyright (C) 2022 by Richard Vigniel.

 I grant Camille Roux a permanent, irrevocable, non-exclusive,
 license to release this code as part of the BRIDGE project under
 the licensing terms of the entire project.

 For all other uses, the code for RVigStyle is released under
 CC-BY-NC-SA 4.0: https://creativecommons.org/licenses/by-nc-sa/4.0/
*/
import Style from './style'
import { FXRandomBetween, FXRandomIntBetween } from '@liamegan1/fxhash-helpers'

const palette = [[255, 255, 255], [250, 200, 50], [240, 20, 100], [220, 100, 250], [250, 120, 50], [50, 100, 230]]

export default class RVigStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.vanishing = this._projectionCalculator3d.getProjectedPoint([0, gridSizeY * 100, 0])
    this.vanishingw = 1 * (this._projectionCalculator3d.getProjectedPoint([gridSizeX, gridSizeY, 0])[0] - this.vanishing[0]) * this._s
    this.dc1 = palette[FXRandomIntBetween(0, palette.length)]
    this.dc2 = palette[FXRandomIntBetween(0, palette.length)]
  }

  static author () { return 'RVig' }

  static name () { return 'Flower Bridge' }

  beforeDraw () {
    this._p5.background('#000000')

    this._p5.blendMode(this._p5.ADD)
    this._p5.strokeWeight(this._s / 1600)

    this.rMax = this._s

    const n = 18
    const p = Array(n)
    for (let i = 1; i < n - 1; i++) {
      p[i] = (FXRandomBetween(0.5, 1.0))
    }
    p[0] = 1
    p[1] = 1
    p[n - 1] = 1

    const nl = 100
    for (let i = 0; i < nl; i++) {
      const k = i / nl
      const c = [this._p5.lerp(this.dc1[0], this.dc2[0], k),
        this._p5.lerp(this.dc1[1], this.dc2[1], k),
        this._p5.lerp(this.dc1[2], this.dc2[2], k)
      ]
      this._p5.stroke(c[0], c[1], c[2], 150)
      this._p5.noFill()
      const radius = this.vanishingw * 0.2 + k * this.rMax + 0 * FXRandomBetween(0, this.rMax * 0.1)
      const dalpha = (k - 0.5) * 2
      for (let s = -1; s <= 1; s += 2) {
        this._p5.beginShape()
        for (let j = 0; j <= n; j++) {
          const pr = p[(j + n) % n]
          const alpha = (0.3 + 0.9 * j / n) * this._p5.TWO_PI + s * dalpha
          this._p5.curveVertex((this.vanishing[0] * this._s + this._p5.cos(alpha) * radius * pr), (this.vanishing[1] * this._s + this._p5.sin(alpha) * radius * pr))
        }
        this._p5.endShape()
      }
    }
    const pmax = this._projectionCalculator3d.getProjectedPoint([this._gridSizeX / 2, this._gridSizeY * 10, 0])
    const pmin = this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2, this._gridSizeY * 10, 0])
    const pxmin = this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2, 0, 0])
    const pxmax = this._projectionCalculator3d.getProjectedPoint([this._gridSizeX / 2, 0, 0])
    const dx = pxmax[0] - pxmin[0]
    const dxu = pmax[0] - pmin[0]
    for (let i = 0; i < 1000; i++) {
      const kx = FXRandomBetween(0, 1)
      const ky = FXRandomBetween(0.05, 0.2)
      const c = FXRandomBetween(0, 1) > 0.5 ? this.dc1 : this.dc2
      this._p5.stroke(c[0], c[1], c[2], 25)
      const xa = pxmin[0] + dx * kx
      const ya = 1.0
      const xb = pmin[0] + dxu * kx
      const yb = pmin[1]
      this._p5.line(xa * this._s, ya * this._s, (xb + (xa - xb) * ky) * this._s, (yb + (ya - yb) * ky) * this._s)
    }
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    if (isBorder) {
      this._p5.stroke('#ffffff20')
      this._p5.noFill()
    } else {
      const c = this.dc1
      const c2 = this.dc2
      this._p5.stroke(c[0], c[1], c[2], 20)
      this._p5.fill(c2[0], c2[1], c2[2], 5)
    }
    this._p5.blendMode(this._p5.ADD)
    this._p5.strokeWeight(this._s / 800)

    const nr = tilePoints[0].y * tilePoints[0].y * 100
    for (let s = 0; s < nr; s++) {
      const kxLeft__ = FXRandomBetween(0.01, 0.3) * 1
      const kxRight_ = FXRandomBetween(0.01, 0.3) * 1
      const kyBottom = FXRandomBetween(0.01, 0.3) * 1
      const kyTop___ = FXRandomBetween(0.01, 0.3) * 1
      const dx0 = (tilePoints[3].x - tilePoints[0].x)
      const dx1 = (tilePoints[2].x - tilePoints[1].x)
      const dy_ = (tilePoints[1].y - tilePoints[0].y)

      const x0 = (tilePoints[0].x + dx0 * kxLeft__ + (tilePoints[1].x - tilePoints[0].x) * kyBottom) * this._s
      const y03 = (tilePoints[0].y + dy_ * kyBottom + (tilePoints[1].y - tilePoints[0].y) * kxLeft__ * 0) * this._s
      const x1 = (tilePoints[1].x + dx1 * kxLeft__ - (tilePoints[1].x - tilePoints[0].x) * kyTop___) * this._s
      const y12 = (tilePoints[1].y - dy_ * kyTop___ - (tilePoints[1].y - tilePoints[0].y) * kxLeft__ * 0) * this._s
      const x2 = (tilePoints[2].x - dx1 * kxRight_ - (tilePoints[2].x - tilePoints[3].x) * kyTop___) * this._s
      const x3 = (tilePoints[3].x - dx0 * kxRight_ + (tilePoints[2].x - tilePoints[3].x) * kyBottom) * this._s
      this._p5.strokeWeight(this._s / 800)
      this._p5.quad(x0, y03, x1, y12, x2, y12, x3, y03)
      if (isBorder) {
        const py03 = (this._projectionCalculator3d.getProjectedPoint([0, frontLeftCorner3DCoord.y, 0])[1])
        const py12 = (this._projectionCalculator3d.getProjectedPoint([0, frontLeftCorner3DCoord.y + 1, 0])[1])

        const yy03 = (py03 + dy_ * kyBottom + (py12 - py03) * kxLeft__ * 0) * this._s
        const yy12 = (py12 - dy_ * kyTop___ - (py12 - py03) * kxLeft__ * 0) * this._s
        this._p5.strokeWeight(this._s / 1600)

        this._p5.quad(x0, yy03, x1, yy12, x2, yy12, x3, yy03)
        this._p5.line(x0, y03, x0, yy03)
        this._p5.line(x1, y12, x1, yy12)
        this._p5.line(x2, y12, x2, yy12)
        this._p5.line(x3, y03, x3, yy03)
      }
    }
  }

  afterDraw () {}
}
