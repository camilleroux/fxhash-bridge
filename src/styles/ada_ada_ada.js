// Ada Ada Ada
// Status: Ready // "WIP", "Ready"
// Twitter: @ada_ada_ada_art
// Fxhash: https://www.fxhash.xyz/u/Ada%20Ada%20Ada
// Wallet: tz1VvQf92Ni54LbTqJdCn2P9wQjS3LDHycbk

/*
 The code for AdaAdaAdaStyle is Copyright (C) 2022 by Ada Hyldahl Fogh.
 I grant Camille Roux a permanent, irrevocable, non-exclusive,
 license to release this code as part of the BRIDGE project under
 the licensing terms of the entire project.
 For all other uses, the code for AdaAdaAdaStyle is released under
 CC-BY-NC-SA 4.0: https://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import Style from './style'

// Fettepalette doesn't import well in this project, so I had to copy the minified version
// Source: https://meodai.github.io/fettepalette/
const fettepalette = (() => { const y = Object.defineProperty; const C = Math.pow; const I = e => y(e, '__esModule', { value: !0 }); const F = (e, r) => { I(e); for (const o in r)y(e, o, { get: r[o], enumerable: !0 }) }; const O = {}; F(O, { generateRandomColorRamp: () => G, generateRandomColorRampParams: () => N, hsv2hsl: () => R, hsv2hsx: () => c, pointOnCurve: () => M }); var R = (e, r, o, t = o - o * r / 2, p = Math.min(t, 1 - t)) => [e, p ? (o - t) / p : 0, t]; var c = (e, r, o, t) => t === 'hsl' ? R(e, r, o) : [e, r, o]; var M = (e, r, o, t, p = [0, 0], m = [1, 1]) => { const x = Math.PI / 2; const u = x / o; const s = r / o; let a = 0; let n = 0; if (e === 'lam\xE9') { const l = s * x; const i = 2 / (2 + 20 * t); const h = Math.cos(l); const f = Math.sin(l); a = Math.sign(h) * C(Math.abs(h), i), n = Math.sign(f) * C(Math.abs(f), i) } else if (e === 'arc')n = Math.cos(-Math.PI / 2 + r * u + t), a = Math.sin(Math.PI / 2 + r * u - t); else if (e === 'pow')a = Math.pow(1 - s, 1 - t), n = Math.pow(s, 1 - t); else if (e === 'powY')a = Math.pow(1 - s, t), n = Math.pow(s, 1 - t); else if (e === 'powX')a = Math.pow(s, t), n = Math.pow(s, 1 - t); else if (typeof e === 'function')a = e(s)[0], n = e(s)[1]; else throw new Error(`pointOnCurve() curveAccent parameter is expected to be "lam\xE9" | "arc" | "pow" | "powY" | "powX" or a function but \`${e}\` given.`); return a = p[0] + Math.min(Math.max(a, 0), 1) * (m[0] - p[0]), n = p[1] + Math.min(Math.max(n, 0), 1) * (m[1] - p[1]), [a, n] }; function G ({ total: e = 3, centerHue: r = 0, hueCycle: o = 0.3, offsetTint: t = 0.1, offsetShade: p = 0.1, curveAccent: m = 0, tintShadeHueShift: x = 0.1, curveMethod: u = 'arc', offsetCurveModTint: s = 0.03, offsetCurveModShade: a = 0.03, minSaturationLight: n = [0, 0], maxSaturationLight: l = [1, 1], colorModel: i = 'hsl' } = {}) { const h = []; const f = []; const w = []; for (let b = 1; b < e + 1; b++) { const [S, T] = M(u, b, e + 1, m, n, l); const d = (360 + (-180 * o + (r + b * (360 / (e + 1)) * o))) % 360; const k = c(d, S, T, i); h.push(k); const [P, X] = M(u, b, e + 1, m + s, n, l); const V = c(d, P, X, i); f.push([(d + 360 * x) % 360, V[1] - t, V[2] + t]); const [Y, H] = M(u, b, e + 1, m - a, n, l); const g = c(d, Y, H, i); w.push([(360 + (d - 360 * x)) % 360, g[1] - p, g[2] - p]) } return { light: f, dark: w, base: h, all: [...f, ...h, ...w] } } var N = { curveMethod: { default: 'lam\xE9', props: { options: ['lam\xE9', 'arc', 'pow', 'powY', 'powX'] } }, curveAccent: { default: 0, props: { min: -0.095, max: 1, step: 0.001 } }, total: { default: 9, props: { min: 3, max: 35, step: 1 } }, centerHue: { default: 0, props: { min: 0, max: 360, step: 0.1 } }, hueCycle: { default: 0.3, props: { min: -1.25, max: 1.5, step: 0.001 } }, offsetTint: { default: 0.01, props: { min: 0, max: 0.4, step: 0.001 } }, offsetShade: { default: 0.01, props: { min: 0, max: 0.4, step: 0.001 } }, tintShadeHueShift: { default: 0.01, props: { min: 0, max: 1, step: 0.001 } }, offsetCurveModTint: { default: 0.03, props: { min: 0, max: 0.4, step: 1e-4 } }, offsetCurveModShade: { default: 0.03, props: { min: 0, max: 0.4, step: 1e-4 } }, minSaturation: { default: 0, props: { min: 0, max: 1, step: 0.001 } }, minLight: { default: 0, props: { min: 0, max: 1, step: 0.001 } }, maxSaturation: { default: 1, props: { min: 0, max: 1, step: 0.001 } }, maxLight: { default: 1, props: { min: 0, max: 1, step: 0.001 } } }; return O })()

const words = [
  // Malay
  'JEMBATAN',
  // Dravidian
  'പാലം',
  // Semitic
  'גשר',
  // Philippine
  'TULAY',
  'TAYTAY',
  // Greek
  'ΓΕΦΥΡΑ',
  // Uralic
  'HÍD',
  'SILTA',
  // Turkic
  'KÖPRÜ',
  'КҮПЕР',
  // Germanic
  'BRIDGE',
  'BRO', // Danish + Swedish
  'BRÜCKE',
  'BRUG',
  'BRÉCK',
  // Latin
  'PONT',
  'PONTE', // Italian + Portuguese
  'PUENTE',
  'POD',
  // Chinese
  '橋',
  // Slavic
  'MOST', // Serbian + Croatian
  'МОСТ',
  'МІСТ'
]

let word = 'SILTA'
let palette = null
let floydsteinbergThreshold = 129

export default class AdaAdaAdaStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.far = this._projectionCalculator3d.getProjectedPoint([0, this._gridSizeY, 0]).map(x => x * s)
    const farLeft = this._projectionCalculator3d.getProjectedPoint(
      [-this._gridSizeX / 2, this._gridSizeY, 0]).map(x => x * s)
    this.farSize = this.far[0] - farLeft[0]
    this.focal = [this.far[0], this.far[1] - this.farSize]
  }

  beforeDraw () {
    palette = fettepalette.generateRandomColorRamp({
      total: 9,
      centerHue: this._p5.random() * 360,
      hueCycle: 0.3,
      curveMethod: 'arc',
      curveAccent: 0,
      offsetTint: 0.01,
      offsetShade: 0.01,
      tintShadeHueShift: 0.01,
      offsetCurveModTint: 0.03,
      offsetCurveModShade: 0.03,
      minSaturationLight: [0, 0],
      maxSaturationLight: [0.5, 1]
    })
    this._p5.textAlign(this._p5.CENTER, this._p5.CENTER)
    // Pick a random word
    word = this._p5.random(words)

    const sunCorners = Math.round(this._p5.random(3, 7))
    const bgRadius = this._s * 2
    const bgStroke = bgRadius / 10
    // Draw bg disc
    // HSL works nicely with fettepalette values
    this._p5.colorMode(this._p5.HSL, 360, 100, 100)
    this.drawDisc(bgRadius, bgStroke, palette.dark[1], palette.dark[3], sunCorners)

    const sunRadius = this._s / this._p5.random(3, 7)
    const sunStroke = sunRadius / (Math.PI * 2)
    // Draw sun
    this._p5.colorMode(this._p5.HSL, 360, 100, 100)
    this.drawDisc(sunRadius, sunStroke, palette.dark[4], palette.dark[6], sunCorners, true)

    floydsteinbergThreshold = this._p5.random() * 129
  }

  // Draws a cool looking geometrical disc
  drawDisc (discRadius, discStroke, fetteDiscStart, fetteDiscEnd, corners, shouldRotate) {
    this._p5.noFill()
    this._p5.strokeWeight(discStroke + 2)

    const startColor = this._p5.color(fetteDiscStart[0], fetteDiscStart[1] * 100, fetteDiscStart[2] * 100)
    const endcolor = this._p5.color(fetteDiscEnd[0], fetteDiscEnd[1] * 100, fetteDiscEnd[2] * 100)

    // Lerping works best in RGB mode
    this._p5.colorMode(this._p5.RGB)

    for (let rad = discRadius; rad >= 0; rad -= discStroke) {
      const lerpVal = this._p5.map(rad, 0, discRadius, 0, 1)
      const interColor = this._p5.lerpColor(startColor, endcolor, lerpVal)
      this._p5.stroke(interColor)
      this._p5.push()
      this._p5.beginShape()
      this._p5.translate(this.focal[0], this.focal[1])
      if (shouldRotate) this._p5.rotate(this._p5.map(rad, discRadius, 0, 0, 360, true))
      for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / corners) {
        const x = (Math.cos(i) * rad)
        const y = (Math.sin(i) * rad)
        this._p5.vertex(x, y)
      }
      this._p5.endShape(this._p5.CLOSE)
      this._p5.pop()
    }
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    this._p5.colorMode(this._p5.HSL, 360, 100, 100)
    const lightestColors = palette.base.slice(3)
    const fetteFill = this._p5.random(lightestColors)
    const fillColor = this._p5.color(fetteFill[0], fetteFill[1] * 100, fetteFill[2] * 100)

    // Convert the tilepoints to vectors, which are nicer
    const BLVector = this._p5.createVector(tilePoints[0].x * this._s, tilePoints[0].y * this._s)
    const TLVector = this._p5.createVector(tilePoints[1].x * this._s, tilePoints[1].y * this._s)
    const TRVector = this._p5.createVector(tilePoints[2].x * this._s, tilePoints[2].y * this._s)
    const BRVector = this._p5.createVector(tilePoints[3].x * this._s, tilePoints[3].y * this._s)

    const halfwayBottomPos = BLVector.copy().lerp(BRVector, 0.5)
    const halfwayTopPos = TLVector.copy().lerp(TRVector, 0.5)
    // Draw lines on the sides of the tiles
    this._p5.stroke(fillColor)
    this._p5.strokeWeight(1)
    this._p5.line(TLVector.x, TLVector.y, BLVector.x, BLVector.y)
    this._p5.line(TRVector.x, TRVector.y, BRVector.x, BRVector.y)

    // Figure out the text config
    this._p5.fill(fillColor)
    this._p5.noStroke()
    const minTextSize = 0.1
    const maxTextSize = this._s * 0.0125
    const textSize = this._p5.map(tilePoints[0].y, 0, 1, minTextSize, maxTextSize)
    this._p5.textSize(Math.floor(textSize))

    // Draw the text in a vertical, char-by-char fashion
    const wordCount = word.length
    let letterJump = 1
    // These letters are composites, so we need two letters at a time for it to look nice
    if (word === 'പാലം') letterJump = 2
    for (let i = 0; i <= wordCount; i += letterJump) {
      // We lerp between top and bottom to move the characters progressively down
      const lerpVal = (i + 1) / (wordCount + 1)
      const mappedPos = halfwayTopPos.copy().lerp(halfwayBottomPos, lerpVal)
      this._p5.push()
      this._p5.translate(mappedPos.x, mappedPos.y)
      // Not the best matrix transformation, but it works well enough as an illusion to make characters "lie down"
      this._p5.applyMatrix([
        1, 0,
        (mappedPos.x / this._s) - 0.5, 1,
        0, 0
      ])
      let letter = word.charAt(i)
      // Some words work best with two characters at a time, so this loop makes sure we respect that
      for (let j = 1; j < letterJump; j++) {
        letter += word.charAt(i + j)
      }
      this._p5.text(letter, 0, 0)
      this._p5.pop()
    }
  }

  // Adapted (poorly with great glitchy effect) from p5.riso's dither implementation: https://github.com/antiboredom/p5.riso
  dither (type, threshold) {
  // source adapted from: https://github.com/meemoo/meemooapp/blob/44236a29574812026407c0288ab15390e88b556a/src/nodes/image-monochrome-worker.js

    if (threshold === undefined) threshold = 128

    const w = this._p5.width
    let newPixel, err

    const bayerThresholdMap = [
      [15, 135, 45, 165],
      [195, 75, 225, 105],
      [60, 180, 30, 150],
      [240, 120, 210, 90]
    ]

    const lumR = []
    const lumG = []
    const lumB = []

    this._p5.loadPixels()

    for (let i = 0; i < 256; i++) {
      lumR[i] = i * 0.299
      lumG[i] = i * 0.587
      lumB[i] = i * 0.114
    }

    for (let i = 0; i <= this._p5.pixels.length; i += 4) {
      this._p5.pixels[i] = Math.floor(lumR[this._p5.pixels[i]] + lumG[this._p5.pixels[i + 1]] + lumB[this._p5.pixels[i + 2]])
    }

    for (let i = 0; i <= this._p5.pixels.length; i += 4) {
      if (type === 'none') {
      // No dithering
        this._p5.pixels[i] = this._p5.pixels[i] < threshold ? 0 : 255
      } else if (type === 'bayer') {
      // 4x4 Bayer ordered dithering algorithm
        const x = i / 4 % w
        const y = Math.floor(i / 4 / w)
        const map = Math.floor((this._p5.pixels[i] + bayerThresholdMap[x % 4][y % 4]) / 2)
        this._p5.pixels[i] = (map < threshold) ? 0 : 255
      } else if (type === 'floydsteinberg') {
      // Floyd–Steinberg dithering algorithm
        newPixel = this._p5.pixels[i] < floydsteinbergThreshold ? 0 : 255
        err = Math.floor((this._p5.pixels[i] - newPixel) / 16)
        this._p5.pixels[i] = newPixel
        this._p5.pixels[i + 4] += err * 7
        this._p5.pixels[i + 4 * w - 4] += err * 3
        this._p5.pixels[i + 4 * w] += err * 5
        this._p5.pixels[i + 4 * w + 4] += err * 1
      } else {
      // Bill Atkinson's dithering algorithm
        newPixel = this._p5.pixels[i] < 129 ? 0 : 255
        err = Math.floor((this._p5.pixels[i] - newPixel) / 8)
        this._p5.pixels[i] = newPixel

        this._p5.pixels[i + 4] += err
        this._p5.pixels[i + 8] += err
        this._p5.pixels[i + 4 * w - 4] += err
        this._p5.pixels[i + 4 * w] += err
        this._p5.pixels[i + 4 * w + 4] += err
        this._p5.pixels[i + 8 * w] += err
      }
    }
    this._p5.updatePixels()
  // return out
  }

  afterDraw () {
    this.dither('floydsteinberg')
  }

  static author () { return 'Ada Ada Ada' }

  static name () { return 'Text-to-Bridge (TTB)' }
}
