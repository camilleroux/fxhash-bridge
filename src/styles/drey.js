// Drey
// Status: WIP // "WIP", "Ready"
// Wallet: tz.....

import Style from './style'
import { getWeightedOption } from '@liamegan1/fxhash-helpers'

class DreyStyle extends Style {
  settings () {
    if (!this._settings) {
      this._settings = {
        colorStrategy: getWeightedOption([
          ['color', 50],
          ['bw', 1]
        ]),
        maxHeight: this._p5.random(0.4, 2),
        strategy: this._p5.random([
          'beam',
          'tiles',
          'scaffold',
          'standard',
          'prism',
          'wire'
        ]),
        heightStepStrategy: this._p5.random(['uniform']),
        baseHue: this._p5.random(360),
        pillarColorStrategy: this._p5.random(['static', 'dynamic'])
      }
      this._settings.rowSpin = getWeightedOption(
        [
          !['prism'].includes(this._settings.strategy) && [2, 1],
          [this._p5.random(5, 8), 1],
          [this._p5.random(12, 20), 1]
        ].filter(Boolean)
      )
      this._settings.heightStep = (() => {
        switch (this._settings.strategy) {
          case 'tiles':
            return this._p5.random(0.01, 0.05)
          default:
            if (this._settings.heightStepStrategy === 'uniform') {
              return this._p5.random(0.01, 0.2)
            }
            return this._p5.random(0.03, 0.3)
        }
      })()
      this._settings.baseColor =
        this._settings.colorStrategy === 'color'
          ? this.color(this._settings.baseHue, 100, 100)
          : this.color(0, 0, 100)
      this._settings.maxAlpha = (() => {
        switch (this._settings.strategy) {
          case 'tiles':
            return this._p5.random(0.55, 1)
          case 'scaffold':
            return this._p5.random(0.55, 1)
          case 'wire':
            return this._p5.random(0.55, 1)
          default:
            return this._p5.random(0.2, 1)
        }
      })()
      this._settings.tileAlpha = ['wire', 'beam'].includes(
        this._settings.strategy
      )
        ? 0
        : this._p5.random(0.5, 1)
      this._settings.pillarFillAlpha = ['wire', 'tiles', 'scaffold'].includes(
        this._settings.strategy
      )
        ? 0
        : this._p5.random(0.1, 1)
      this._settings.pillarStrokeAlpha = (() => {
        if (['prism', 'beam', 'tiles'].includes(this._settings.strategy)) {
          return 0
        }
        switch (this._settings.strategy) {
          case 'wire':
            return this._p5.random(0.4, 1)
          default:
            return this._p5.random(0.1, 1)
        }
      })()
      this._settings.pillarHueRange = getWeightedOption([
        [this._p5.random(50, 100), 5],
        [this._p5.random(100, 200), 1]
      ])
      this._settings.fillGlitch = this._p5.random() > 0.9
      this._settings.jitterGlitch = this._p5.random() > 0.9
    }
    return this._settings
  }

  scaleVerts (verts, s) {
    return verts.map(({ x, y }) => ({ x: x * s, y: y * s }))
  }

  jitterVerts (verts) {
    return this.settings().jitterGlitch
      ? verts.map(({ x, y }) => ({
        x: x + this._p5.random(-5, 5),
        y: y + this._p5.random(-5, 5)
      }))
      : verts
  }

  beforeDraw () {
    this._p5.background('#060606')
    this._p5.colorMode(this._p5.HSB)
    // console.log(this.settings().strategy)
    console.log(this.settings())
  }

  color (...args) {
    const c = this._p5.color(...args)
    c.clone = () => {
      const hsb = [
        this._p5.hue(c),
        this._p5.saturation(c),
        this._p5.brightness(c)
      ]
      return this.color(...hsb)
    }
    c.spin = (amount) => {
      const [h, s, b] = [
        this._p5.hue(c),
        this._p5.saturation(c),
        this._p5.brightness(c)
      ]
      const a = this._p5.alpha(c)
      let newHue = (h + amount) % 360
      if (newHue < 0) {
        newHue = 360 - newHue
      }
      const newColor = this.color(newHue, s, b)
      newColor.setAlpha(a)
      return newColor
    }

    c._setAlpha = c.setAlpha
    c.setAlpha = (alpha) => {
      c._setAlpha(alpha)
      return c
    }
    return c
  }

  getSlices ({ heightSteps, i, j }) {
    const slices = []
    for (let a = 0; a < heightSteps; a++) {
      const coords = [
        [i, j, this.settings().maxHeight - a * this.settings().heightStep],
        [i, j + 1, this.settings().maxHeight - a * this.settings().heightStep],
        [
          i + 1,
          j + 1,
          this.settings().maxHeight - a * this.settings().heightStep
        ],
        [i + 1, j, this.settings().maxHeight - a * this.settings().heightStep]
      ]
      const points = coords.map(([x, y, h]) =>
        this._p5
          .createVector()
          .set(this._projectionCalculator3d.getProjectedPoint([x, y, h]))
      )
      slices.push(points)
    }
    return slices
  }

  drawPillarSection (scaledVerts, nextScaledVerts) {
    if (this.settings().strategy === 'wire') {
      this._p5.strokeWeight(this._p5.random(0.5, 3))
      this._p5.strokeJoin(this._p5.BEVEL)
    }
    const vertPairs = [
      [0, 3],
      [1, 0],
      [1, 2],
      [2, 3]
    ]
    vertPairs.forEach(([v1, v2]) => {
      this._p5.quad(
        scaledVerts[v1].x,
        scaledVerts[v1].y,
        nextScaledVerts[v1].x,
        nextScaledVerts[v1].y,
        nextScaledVerts[v2].x,
        nextScaledVerts[v2].y,
        scaledVerts[v2].x,
        scaledVerts[v2].y
      )
    })
  }

  drawGround ({ color, verts }) {
    this._p5.noStroke()
    this._p5.fill(color.setAlpha(0.07).toString())
    const scaledVerts = this.scaleVerts(verts, this._s)
    this._p5.quad(...scaledVerts.reduce((acc, { x, y }) => [...acc, x, y], []))
  }

  drawSlice ({ slice, slices, color, heightSteps, i, j }) {
    // ALPHA
    let alpha = this.settings().maxAlpha * Math.pow(0.9, j)
    alpha = alpha - (alpha / heightSteps) * i
    alpha = Math.max(alpha, 0.001)
    const sliceAlpha = alpha * this.settings().tileAlpha
    let pillarFillAlpha =
      alpha *
      (this.settings().fillGlitch
        ? this._p5.random() * this.settings().pillarFillAlpha
        : this.settings().pillarFillAlpha)
    pillarFillAlpha = Math.max(pillarFillAlpha, 0.001)
    const pillarStrokeAlpha = alpha * this.settings().pillarStrokeAlpha

    // COLOR
    const spinAmount = (this.settings().pillarHueRange / heightSteps) * i
    const sliceColor = color.spin(spinAmount)
    const pillarColor =
      this.settings().pillarColorStrategy === 'static'
        ? color.clone()
        : sliceColor.clone()
    const pillarFillColor = pillarColor.clone().setAlpha(pillarFillAlpha)
    const pillarStrokeColor = pillarColor.clone().setAlpha(pillarStrokeAlpha)

    // TILE
    this._p5.fill(sliceColor.setAlpha(sliceAlpha).toString())
    this._p5.noStroke()
    const scaledVerts = this.jitterVerts(this.scaleVerts(slice, this._s))
    this._p5.quad(...scaledVerts.reduce((acc, { x, y }) => [...acc, x, y], []))

    // PILLAR
    this._p5.fill(pillarFillColor.setAlpha(pillarFillAlpha).toString())
    this._p5.stroke(pillarStrokeColor.toString())
    const nextVerts = i < slices.length && slices[i + 1]
    const nextScaledVerts = nextVerts
      ? this.jitterVerts(this.scaleVerts(nextVerts, this._s))
      : scaledVerts

    this.drawPillarSection(scaledVerts, nextScaledVerts)
  }

  drawTile (tilePoints, _a, _b, { i, j }) {
    this._p5.strokeWeight(0.5)
    // GROUND
    const groundSpin =
      0 +
      (this.settings().pillarColor === 'dynamic'
        ? this.settings().pillarHueRange
        : 0) +
      (j * this.settings().rowSpin) / 5
    const groundColor = this.settings().baseColor.spin(groundSpin)
    this.drawGround({ color: groundColor, verts: tilePoints })

    const heightSteps = Math.ceil(
      this._p5.random(0.4, this.settings().maxHeight) /
        this.settings().heightStep
    )
    const slices = this.getSlices({ i, j, heightSteps })

    // SLICES
    const color = this.settings().baseColor.spin(j * this.settings().rowSpin)
    slices.forEach((slice, i) => {
      this.drawSlice({ slice, slices, color, heightSteps, i, j })
    })
  }

  afterDraw () {}

  static author () {
    return 'drey'
  }

  static name () {
    return 'Hanging Gardens'
  }
}

export default DreyStyle
