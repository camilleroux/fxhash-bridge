// Matthieu Segret
// Status: "Ready"
// Twitter: @matt_circles
// Fxhash: https://www.fxhash.xyz/u/Matt%20Circles
// Wallet: tz1XQGuPaCopF7KCgyVXrYm7arjen8jiZn9z

import { Vector } from 'p5'
import Style from './style'
import { createCols } from '../utils'

const palettes = [
  {
    bgPalettes: createCols('https://coolors.co/03045E-02316F-012C65-00466B-000000'),
    rainPalettes: createCols('https://coolors.co/palette/023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef').reverse(),
    starsPalettes: createCols('https://coolors.co/palette/ffba08-faa307-faa307-f48c06-dc2f02-dc2f02')
  },
  {
    bgPalettes: createCols('https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-dee2e6-adb5bd-6c757d-495057-343a40-212529'),
    rainPalettes: createCols('https://coolors.co/palette/03045e-023e8a-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06').reverse(),
    starsPalettes: createCols('https://coolors.co/palette/03045e-023e8a-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06').reverse()
  },
  {
    bgPalettes: createCols('https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-dee2e6-adb5bd-6c757d-495057-343a40-212529'),
    rainPalettes: createCols('https://coolors.co/palette/90caf9-42a5f5-1e88e5-1976d2-1565c0-0d47a1'),
    starsPalettes: createCols('https://coolors.co/palette/90caf9-42a5f5-1e88e5-1976d2-1565c0-0d47a1')
  }
]

export default class MattCirclesStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)

    // Parameters
    this.refSize = this._s * 0.04
    this.starsGap = this.refSize * 1
    this.minSkyHeight = 5 * this._s / 12
    this.borderGap = this._s / 20
    this.nbStars = 200
    this.cloudH = this.refSize * 3
    this.cloudW = this.refSize * 5
    this.resTextureW = 50
    this.resTextureH = 110

    // Initialize colors
    const paletteIndex = this._p5.random([0, 0, 0, 0, 0, 0, 0, 1, 1, 2])
    const palette = palettes[paletteIndex]
    this.bgColors = palette.bgPalettes.slice(0, 4)
    this.bgShadowColor = palette.bgPalettes[4]

    this.rainColors = palette.rainPalettes.slice(0, 4)
    this.rainShadowColor = palette.rainPalettes[5]

    this.starsColors = palette.starsPalettes.slice(0, 4)
    this.starsShadowColor = palette.starsPalettes[5]

    this.flowField = this.createFlowField(this.resTextureW, this.resTextureH)
    this.rainArea = this.getRainArea()

    // Create textures and mask for rain
    this.rainMask = this.createGraphics(s, s)
    this.rainTexture = this.createGraphics(s, s)

    // Create textures and mask for stars
    this.starsMask = this.createGraphics(s, s)
    this.starsTexture = this.createGraphics(s, s)
  }

  beforeDraw () {
    // Generate textures
    this.createTexture(this.bgColors, this.bgShadowColor, this.resTextureW, this.resTextureH, this._p5)
    this.createTexture(this.rainColors, this.rainShadowColor, this.resTextureW, this.resTextureH, this.rainTexture)
    this.createTexture(this.starsColors, this.starsShadowColor, this.resTextureW, this.resTextureH, this.starsTexture)
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    // Draw rain on mask
    this.rainMask.push()
    this.rainMask.fill('#000')
    this.rain(frontLeftCorner3DCoord, this.rainMask)
    this.rainMask.pop()
  }

  afterDraw () {
    // Draw stars
    this.drawStarsMask(this.nbStars, this.starsMask)
    this.drawImage(this.starsMask, this.starsTexture)

    // Draw rain and stars with textures on sketch
    this.cloud((this.rainArea[0].x + this.rainArea[1].x) / 2, this.rainArea[2].y - this.cloudH / 2, this.cloudW, this.cloudH, this.rainMask)
    this.drawImage(this.rainMask, this.rainTexture)

    // Draw border
    this.border(this.borderGap, this.bgColors[0])
  }

  // ////////////
  // Stars
  // ////////////
  drawStarsMask (nbStars, g) {
    const stars = []
    const [smallSize, mediumSize, largeSize] = [0.3 * this.refSize, 0.5 * this.refSize, 0.7 * this.refSize]

    for (let i = 0; i < nbStars; i++) {
      // Draw the biggest ones first
      let size = largeSize
      if (i > nbStars * 0.2 && i <= nbStars * 0.5) size = mediumSize
      if (i > nbStars * 0.2) size = smallSize
      const newStar = this.tryCreateStar(stars, size)
      if (newStar) stars.push(newStar)
    }

    g.push()
    g.strokeWeight(this.refSize * 0.15)
    stars.forEach((star) => {
      const drawStar = this._p5.random([this.star1, this.star2])
      const nbRay = this._p5.random([3, 4, 5])
      drawStar.call(this, star.x, star.y, star.size, nbRay, g)
    })
    g.pop()
  }

  tryCreateStar (stars, size) {
    let attempts = 0
    let star

    while (star === undefined) {
      star = this.createStar(size)

      stars.forEach((s) => {
        if (this.overlap(star, s)) {
          star = undefined
        }
      })

      if (!this.inTheSky(star)) {
        star = undefined
      }

      attempts++
      if (attempts > 100) {
        break
      }
    }

    return star
  }

  createStar (size) {
    const border = this.borderGap + this.refSize * 0.2
    const x = this._p5.random(border, this._s - border)
    const y = this._p5.random(border, this._s - border)
    return { x, y, size }
  }

  overlap (s1, s2) {
    if (s1 === undefined || s2 === undefined) return true
    const d = this._p5.dist(s1.x, s1.y, s2.x, s2.y)
    return d < s1.size / 2 + s2.size / 2 + this.starsGap
  }

  inTheSky (star) {
    if (star === undefined) return false
    const [p1, p2, p3, p4] = this.rainArea
    return (this.sign(star, p1, p3) < 0 || this.sign(star, p2, p4) > 0) || star.y < p3.y - 3.5 * this.refSize
  }

  star1 (x, y, r, nbRays, g) {
    g.push()
    g.noFill()
    const start = this._p5.random(-Math.PI / 6)
    for (let a = start; a < 2 * Math.PI - start; a += Math.PI / nbRays) {
      const p1 = new Vector(x + r * Math.cos(a), y + r * Math.sin(a))
      const p2 = new Vector(x + r * Math.cos(a - Math.PI), y + r * Math.sin(a - Math.PI))
      g.line(p1.x, p1.y, p2.x, p2.y)
    }
    g.pop()
  }

  star2 (x, y, r, nbRays, g) {
    g.push()
    g.noStroke()
    g.beginShape()
    let i = 0
    const start = this._p5.random(-Math.PI / 6)
    for (let a = start; a < 2 * Math.PI - start; a += Math.PI / nbRays) {
      const radius = i % 2 === 0 ? r : r / 2
      g.vertex(x + radius * Math.cos(a), y + radius * Math.sin(a))
      i++
    }
    g.endShape(g.CLOSE)
    g.pop()
  }

  // ////////////
  // Cloud
  // ////////////
  cloud (cx, cy, w, h, g) {
    const [smallWeight, largeWeight] = [this.refSize * 0.15, this.refSize * 0.2]
    const weight = this._p5.random([smallWeight, smallWeight, largeWeight])
    const [pointStyle, linearStyle] = [[0.25, 0.02, 5], [0.01, 0.001, 4]]
    const gaps = this._p5.random([pointStyle, linearStyle, linearStyle])
    this.miniCloud(cx - w / 4, cy + h / 5, w, h, weight, gaps, g)
    this.miniCloud(cx + w / 5, cy + h / 5, w, h, weight, gaps, g)
    this.miniCloud(cx, cy, w, h, weight, gaps, g)
  }

  miniCloud (cx, cy, w, h, weight, gaps, g) {
    let radiusW = w / 2 - weight
    let radiusH = h / 2 - weight

    g.push()
    g.fill('#000')
    g.ellipse(cx, cy, w, h)
    g.pop()

    g.push()
    g.noStroke()
    g.erase()
    const [aGap, raduisGap, piMax] = gaps
    for (let a = 0; a < piMax * Math.PI; a += aGap) {
      const x = radiusW * Math.cos(a) + cx
      const y = radiusH * Math.sin(a) + cy
      radiusW -= raduisGap * this.refSize
      radiusH -= raduisGap * this.refSize
      g.circle(x, y, weight)
    }
    g.noErase()
    g.pop()
  }

  // ////////////
  // Rain
  // ////////////
  rain (frontLeftCorner3DCoord, g) {
    const w = 0.08
    const h = 0.6
    const p1 = new Vector(0.5 - w / 2, 0.5 - h / 2)
    const p2 = new Vector(0.5 + w / 2, 0.5 - h / 2)
    const p3 = new Vector(0.5 + w / 2, 0.5 + h / 2)
    const p4 = new Vector(0.5 - w / 2, 0.5 + h / 2)
    const points3D = [p1, p2, p3, p4]

    const [i, j, height] = [frontLeftCorner3DCoord.x, frontLeftCorner3DCoord.y, frontLeftCorner3DCoord.z]
    const points2D = points3D.map((point3D) => {
      const coords = [i + point3D.x, j + point3D.y, height]
      const [x2D, y2D] = this._projectionCalculator3d.getProjectedPoint(coords)
      return new Vector(x2D * this._s, y2D * this._s)
    })

    // Don't display the rain over 1/3 of the sky
    if (points2D[0].y < this.minSkyHeight) return

    g.push()
    g.beginShape()
    points2D.forEach((point) => {
      g.vertex(point.x, point.y)
    })
    g.endShape(g.CLOSE)
    g.pop()
  }

  getRainArea () {
    const v1 = this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2, 0, 0]))
    const v2 = this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([this._gridSizeX / 2, 0, 0]))
    const v3 = this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2, this._gridSizeY, 0]))
    const v4 = this._p5.createVector().set(this._projectionCalculator3d.getProjectedPoint([this._gridSizeX / 2, this._gridSizeY, 0]))

    const area = [v1, v2, v3, v4].map((p) => {
      return new Vector(p.x * this._s, p.y * this._s)
    })

    if (area[2].y < this.minSkyHeight) area[2].y = this.minSkyHeight
    if (area[3].y < this.minSkyHeight) area[3].y = this.minSkyHeight

    const gap = this.refSize * 1.5
    const [p1, p2, p3, p4] = area
    p1.x -= gap
    p3.x -= gap * 2
    p2.x += gap
    p4.x += gap * 2

    return area
  }

  // ////////////
  // Tools
  // ////////////
  createTexture (colors, shadowColor, resTextureW, resTextureH, g) {
    const rs = this.refSize
    const size = rs * 0.35
    const weight = rs * 0.12

    g.push()
    g.background(colors[0])
    g.noFill()
    g.strokeWeight(weight)

    // Setting shadow
    const dc = g.drawingContext
    dc.shadowOffsetX = rs * 0.03
    dc.shadowOffsetY = rs * 0.03
    dc.shadowColor = shadowColor

    let x = 0
    let y = -size
    for (let i = 0; i < resTextureH; i++) {
      x = (i % 2 === 0) ? -4.4 * weight : 0
      y += size - 1 * weight
      for (let j = 0; j < resTextureW; j++) {
        for (let k = 0; k < 2; k++) {
          const color = this._p5.random(colors)
          g.stroke(color)
          x += 2.2 * weight
          y = (k % 2 === 0) ? y + size / 8 : y - size / 8

          g.push()
          g.translate(x, y)
          g.rotate(this.flowField[i][j])
          g.line(0, 0, 0, size)
          g.pop()
        }
      }
    }
    g.pop()
  }

  border (weight, color) {
    this._p5.stroke(color)
    this._p5.strokeWeight(weight)
    this._p5.noFill()
    this._p5.rect(0, 0, this._s, this._s)
  }

  createFlowField (resTextureW, resTextureH) {
    const flowField = []
    const inc = 0.02
    let yoff = 0

    for (let y = 0; y < resTextureH; y++) {
      let xoff = 0
      flowField[y] = []
      for (let x = 0; x < resTextureW; x++) {
        flowField[y][x] = this._p5.noise(xoff, yoff) * Math.PI * 2
        xoff += inc
      }
      yoff += inc
    }

    return flowField
  }

  toImage (g, density) {
    density ||= g.pixelDensity()
    const img = this._p5.createImage(g.width * density, g.height * density)
    img.copy(g, 0, 0, g.width, g.height, 0, 0, g.width * density, g.height * density)
    return img
  }

  drawImage (mask, texture) {
    const maskImg = this.toImage(mask)
    const img = this.toImage(texture)
    img.mask(maskImg)
    this._p5.image(img, 0, 0, this._s, this._s)
  }

  createGraphics (w, h) {
    const g = this._p5.createGraphics(w, h)
    g.background(this._p5.color(255, 255, 255, 0))
    return g
  }

  sign (p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)
  }

  static author () {
    return 'Matt Circles'
  }

  static name () {
    return 'Rain under the stars'
  }
}
