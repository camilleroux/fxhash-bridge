// Julien Labat
// Status: WIP // "WIP", "Ready"
// Twitter: @julienlabat
// Fxhash: https://www.fxhash.xyz/u/julabat
// Wallet: tz1UxPe68iFRp27KqowTo7nF9C6GxAKa2vFj

import Style from './style'
import { FXInit, getWeightedOption, FXRandomBetween, FXRandomOption } from '@liamegan1/fxhash-helpers'

// eslint-disable-next-line no-undef
FXInit(fxrand)

const starField = []

export default class JuLabatStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    // eslint-disable-next-line no-undef
    fxrand = sfc32(...hashes)
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.bgColor = '#080808'
    this.HUES = [
      [[0, 20, 35, 50, 160, 180, 220, 240, 345], 1],
      [[220, 230, 245, 255, 350], 3],
      [[15, 20, 25, 30, 35, 40, 45, 50, 170, 235], 3],
      [[350, 175, 230], 3]
    ]
    this.hues = getWeightedOption(this.HUES)
    this.offset = this._s / 100
    this.tileGlow = true
  }

  beforeDraw () {
    const P5 = this._p5

    P5.colorMode(P5.HSB)
    P5.background(this.bgColor)

    // Fill starField``
    if (starField.length === 0) {
      const inc = FXRandomBetween(0.01, 0.03)
      const def = 8
      let yoff = 0
      for (let j = 0; j < this._s; j += def) {
        let xoff = 0
        for (let i = 0; i < this._s; i += def) {
          // Generate star attributes
          const x = (i + FXRandomBetween(-def * 5, def * 5)) / this._s
          const y = (j + FXRandomBetween(-def * 5, def * 5)) / this._s
          const v = P5.noise(xoff, yoff)
          const b = P5.map(y * this._s, 0, this._s, 120, 10)
          const col = P5.color(FXRandomOption(this.hues), FXRandomBetween(50, 90), b + FXRandomBetween(-20, 20))
          const size = this._s / FXRandomBetween(170000, 450000)
          const star = {
            pos: P5.createVector(x, y),
            val: v,
            col: col,
            size: size
          }
          // Store star in starField
          if (star.val < FXRandomBetween(0, 1) * 0.5 &&
            star.pos.x > 0 &&
            star.pos.y > 0 &&
            star.pos.x < this._s &&
            star.pos.y < this._s
          ) starField.push(star)
          xoff += inc
        }
        yoff += inc
      }
    }

    // Draw stars
    P5.noFill()
    starField.forEach(p => {
      P5.strokeWeight(p.size * this._s)
      P5.stroke(p.col)
      P5.point(p.pos.x * this._s, p.pos.y * this._s)
    })
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    const P5 = this._p5

    // Tile points
    const p0 = tilePoints[0]
    const p1 = tilePoints[1]
    const p2 = tilePoints[2]
    const p3 = tilePoints[3]

    // Fill color
    const h = P5.random(this.hues)
    const darkBgColor = P5.color(
      P5.hue(this.bgColor),
      P5.saturation(this.bgColor),
      P5.brightness(this.bgColor) + 8
    )

    // Bottom shape
    P5.noStroke()
    P5.strokeWeight(1)
    if (isBorder) P5.fill(P5.hue(darkBgColor), P5.saturation(darkBgColor), P5.brightness(darkBgColor), 0.5)
    else P5.fill(h, P5.random(50, 70), 100, 0.5)
    P5.quad(
      p0.x * this._s, p0.y * this._s + this.offset / (frontLeftCorner3DCoord.y + 1) * 4,
      p1.x * this._s, p1.y * this._s + this.offset / (frontLeftCorner3DCoord.y + 1) * 4,
      p2.x * this._s, p2.y * this._s + this.offset / (frontLeftCorner3DCoord.y + 1) * 4,
      p3.x * this._s, p3.y * this._s + this.offset / (frontLeftCorner3DCoord.y + 1) * 4
    )

    // Actual shape
    if (isBorder) P5.fill(darkBgColor)
    else P5.fill(h, P5.random(50, 70), P5.random(75, 90), 0.9)
    P5.noStroke()
    P5.quad(
      p0.x * this._s, p0.y * this._s,
      p1.x * this._s, p1.y * this._s,
      p2.x * this._s, p2.y * this._s,
      p3.x * this._s, p3.y * this._s
    )

    // Glow effect
    if (this.tileGlow) {
      P5.blendMode(P5.SCREEN)
      if (isBorder) P5.fill(darkBgColor)
      else P5.fill(h, 100, 80)
      this.setBlur(40)
      P5.quad(
        p0.x * this._s, p0.y * this._s,
        p1.x * this._s, p1.y * this._s,
        p2.x * this._s, p2.y * this._s,
        p3.x * this._s, p3.y * this._s
      )
      P5.drawingContext.filter = 'none'
    }

    // Reset effects
    P5.blendMode(P5.BLEND)
  }

  afterDraw () {}

  setBlur (size) {
    this._p5.drawingContext.filter = `blur(${size}px)`
  }

  static author () { return 'Julien Labat' }

  static name () { return 'Space Disco Dancefloor' }
}
