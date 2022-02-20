// Julien Labat
// Status: WIP // "WIP", "Ready"
// Twitter: @julabat
// Fxhash: https://www.fxhash.xyz/u/julabat
// Wallet: tz1UxPe68iFRp27KqowTo7nF9C6GxAKa2vFj

import Style from './style'
import { FXRandomBetween, FXRandomOption, getWeightedOption } from '@liamegan1/fxhash-helpers'

const HUES = [
  [[0, 20, 35, 50, 160, 180, 220, 240, 345], 1],
  [[220, 230, 245, 255, 350], 3],
  [[15, 20, 25, 30, 35, 40, 45, 50, 170, 235], 3],
  [[350, 175, 230], 3]
]

export default class JuLabatStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.hues = getWeightedOption(HUES)
    this.noiseField = []
    this.bgColor = '#080808'
    this.offset = 0
  }

  beforeDraw () {
    const P5 = this._p5

    P5.colorMode(P5.HSB)
    P5.background(this.bgColor)

    this.offset = P5.height / 100

    // Fill noiseField
    const inc = FXRandomBetween(0.01, 0.03)
    const def = 8
    let yoff = 0
    for (let j = 0; j < P5.height; j += def) {
      let xoff = 0
      for (let i = 0; i < P5.width; i += def) {
        const v = P5.noise(xoff, yoff)
        // Store slightly randomized position + noise value as vector's z
        const point = P5.createVector(
          i + FXRandomBetween(-def * 6, def * 6),
          j + FXRandomBetween(-def * 6, def * 6),
          v
        )
        this.noiseField.push(point)
        xoff += inc
      }
      yoff += inc
    }

    // Compute average noiseField noise value
    const sum = this.noiseField.reduce((a, v) => a + v.z, 0)
    const avg = (sum / this.noiseField.length)
    // Create star with random chance depending on noise value
    const f = this.noiseField.reduce((a, v) => {
      const r = FXRandomBetween(0, 1)
      if (v.z < r * 0.5 && v.z < avg) a.push(v)
      return a
    }, [])

    // Draw stars
    P5.noFill()
    f.forEach(p => {
      const h = FXRandomOption(this.hues)
      const b = P5.map(p.y, 0, P5.height, 120, 10)
      const w = FXRandomBetween(0.5, 2.6)

      P5.strokeWeight(w)
      P5.stroke(h, FXRandomBetween(50, 90), b + FXRandomBetween(-20, 20))
      P5.point(p.x, p.y)

      P5.strokeWeight(w * 4)
      P5.stroke(P5.color(h, 100, b, 0.25))
      P5.blendMode(P5.SCREEN)
      this.setBlur(w * 4)
      P5.point(p.x, p.y)
      P5.blendMode(P5.BLEND)
      this.setBlur(0)
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
    const h = FXRandomOption(this.hues)
    const darkBgColor = P5.color(
      P5.hue(this.bgColor),
      P5.saturation(this.bgColor),
      P5.brightness(this.bgColor) + 8
    )

    // Bottom shape
    P5.noStroke()
    P5.strokeWeight(1)
    if (isBorder) P5.fill(P5.hue(darkBgColor), P5.saturation(darkBgColor), P5.brightness(darkBgColor), 0.5)
    else P5.fill(h, FXRandomBetween(50, 70), 100, 0.5)
    P5.quad(
      p0.x * this._s, p0.y * this._s + this.offset / (frontLeftCorner3DCoord.y + 1) * 4,
      p1.x * this._s, p1.y * this._s + this.offset / (frontLeftCorner3DCoord.y + 1) * 4,
      p2.x * this._s, p2.y * this._s + this.offset / (frontLeftCorner3DCoord.y + 1) * 4,
      p3.x * this._s, p3.y * this._s + this.offset / (frontLeftCorner3DCoord.y + 1) * 4
    )

    // Actual shape
    if (isBorder) P5.fill(darkBgColor)
    else P5.fill(h, FXRandomBetween(50, 70), FXRandomBetween(75, 90), 0.9)
    P5.noStroke()
    P5.quad(
      p0.x * this._s, p0.y * this._s,
      p1.x * this._s, p1.y * this._s,
      p2.x * this._s, p2.y * this._s,
      p3.x * this._s, p3.y * this._s
    )

    // Glow effect
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

    // Reset effects
    this.setBlur(0)
    P5.blendMode(P5.BLEND)
  }

  afterDraw () {}

  setBlur (size) {
    this._p5.drawingContext.filter = `blur(${size}px)`
  }

  static author () { return 'Julien Labat' }

  static name () { return 'Space Disco Dancefloor' }
}
