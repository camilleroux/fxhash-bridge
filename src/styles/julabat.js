// Julien Labat
// Status: WIP // "WIP", "Ready"
// Twitter: @julabat
// Fxhash: https://www.fxhash.xyz/u/julabat
// Wallet: tz1UxPe68iFRp27KqowTo7nF9C6GxAKa2vFj

import Style from './style'
import { getWeightedOption } from '@liamegan1/fxhash-helpers'

const noiseField = []

export default class JuLabatStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
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
    this.starsGlow = false
    this.tileGlow = true
  }

  beforeDraw () {
    const P5 = this._p5
    P5.loop()

    P5.colorMode(P5.HSB)
    P5.background(this.bgColor)

    // Fill noiseField
    if (noiseField.length === 0) {
      const inc = P5.random(0.01, 0.03)
      const def = 8
      let yoff = 0
      for (let j = 0; j < this._s; j += def) {
        let xoff = 0
        for (let i = 0; i < this._s; i += def) {
          const val = P5.noise(xoff, yoff)
          // Store slightly randomized position + noise value as vector's z
          const point = P5.createVector(
            (i + P5.random(0, def * 5)) / this._s,
            (j + P5.random(0, def * 5)) / this._s,
            val
          )

          if (point.x > 0 && point.y > 0 && point.x < this._s && point.y < this._s) noiseField.push(point)
          xoff += inc
        }
        yoff += inc
      }
    }

    // Compute average noiseField noise value
    const sum = noiseField.reduce((a, v) => a + v.z, 0)
    const avg = sum / noiseField.length
    // Create star with random chance depending on noise value
    const f = noiseField.reduce((a, v) => {
      if (v.z < P5.random() * 0.5 && v.z <= avg) a.push(v)
      return a
    }, [])

    console.log(f.length)
    console.log(noiseField.length)

    // Draw stars
    P5.noFill()
    f.forEach(p => {
      const h = P5.random(this.hues)
      const b = P5.map(p.y * this._s, 0, this._s, 120, 10)
      const w = P5.random(this._s / 1400, this._s / 270)

      P5.strokeWeight(w)
      P5.stroke(h, P5.random(50, 90), b + P5.random(-20, 20))
      P5.point(p.x * this._s, p.y * this._s)

      if (this.starsGlow) {
        P5.strokeWeight(w * 4)
        P5.stroke(P5.color(h, 100, b, 0.25))
        this.setBlur(w * 4)
        P5.point(p.x * this._s, p.y * this._s)
        this.removeBlur()
      }
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
    }

    // Reset effects
    this.removeBlur()
    P5.blendMode(P5.BLEND)
  }

  afterDraw () {
    const P5 = this._p5
    if (P5.frameCount > 1) P5.noLoop()
  }

  setBlur (size) {
    this._p5.drawingContext.filter = `blur(${size}px)`
  }

  removeBlur () {
    this._p5.drawingContext.filter = 'none'
  }

  static author () { return 'Julien Labat' }

  static name () { return 'Space Disco Dancefloor' }
}
