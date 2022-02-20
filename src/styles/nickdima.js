// Nick Dima
// Status: Ready // "WIP", "Ready"
// Twitter: @nickdima
// Fxhash: https://www.fxhash.xyz/u/Nick%20Dima
// Wallet: tz1W3A3hBLQHQueSanvydtrdQJbmjEp94ZwD

import Style from './style'

export default class BoilerplateStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.zInc = 0.040
    this.bg = [0, 0, 10]
    this.van = this._projectionCalculator3d.getProjectedPoint([0, gridSizeY, 0])
    this.palettes = [
      [
        [
          [13, 58, 88],
          [234, 33, 36],
          [151, 28, 70],
          [37, 41, 95]
        ],
        [52, 9, 96]
      ],
      [
        [
          [4, 96, 89],
          [138, 26, 90],
          [55, 30, 99],
          [40, 83, 97]
        ],
        [293, 36, 18]
      ],
      [
        [
          [164, 97, 84],
          [42, 60, 100],
          [346, 70, 94],
          [208, 69, 49]
        ],
        [30, 2, 100]
      ],
      [
        [
          [47, 61, 96],
          [195, 80, 49],
          [28, 68, 93],
          [180, 77, 69]
        ],
        [100, 31, 15]
      ],
      [
        [
          [332, 55, 36],
          [353, 61, 98],
          [8, 34, 99],
          [19, 20, 100]
        ],
        [41, 7, 100]
      ],
      [
        [
          [2, 66, 86],
          [162, 61, 67],
          [8, 65, 100],
          [174, 46, 27]
        ],
        [55, 13, 70]
      ],
      [
        [
          [42, 74, 89],
          [55, 9, 93],
          [4, 9, 64],
          [179, 100, 66]
        ],
        [45, 8, 100]
      ],
      [
        [
          [40, 66, 100],
          [186, 83, 54],
          [345, 81, 86],
          [39, 100, 100]
        ],
        [204, 2, 97]
      ],
      [
        [
          [47, 70, 89],
          [186, 31, 50],
          [203, 12, 25],
          [9, 70, 86]
        ],
        [77, 22, 13]
      ],
      [
        [
          [29, 47, 94],
          [4, 67, 100],
          [52, 17, 84],
          [132, 17, 94]
        ],
        [76, 11, 96]
      ]
    ]
    this.palette = this._p5.random(this.palettes)
  }

  beforeDraw () {
    const p5 = this._p5
    p5.colorMode(this._p5.HSB, 360, 100, 100)
    p5.background(this.bg)
    p5.noStroke()
    p5.fill(this.palette[1])
    const w = this._s
    const h = this.van[1] * this._s
    p5.rect(0, 0, w, h)
    const sw = w / 400
    p5.strokeWeight(sw)
    p5.strokeCap(p5.SQUARE)
    p5.stroke(this.bg)
    for (let i = 0; i <= 100; i++) {
      p5.line(i * sw * 2, h, i * sw * 2, h - i * h / 100)
    }
    for (let i = 1; i <= 100; i++) {
      p5.line(w / 2 + i * sw * 2, h, w / 2 + i * sw * 2, 0 + i * h / 100)
    }
    // for (let i = 0; i <= 200; i++) {
    //   p5.line(i * sw * 2, h, i * sw * 2, h - i * h / 100)
    // }
  }

  drawTriangle (x1, y1, x2, y2, x3, y3, z) {
    const p5 = this._p5
    const zInc = this.zInc
    const c = p5.random(this.palette[0])
    p5.fill(c[0], c[1], c[2], 0.9)
    p5.noStroke()
    z = p5.random(0.2, 0.4)
    const [tx1, ty1] = this._projectionCalculator3d.getProjectedPoint(
      [x1, y1, z]
    )
    const [tx2, ty2] = this._projectionCalculator3d.getProjectedPoint(
      [x2, y2, z]
    )
    const [tx3, ty3] = this._projectionCalculator3d.getProjectedPoint(
      [x3, y3, z]
    )
    p5.triangle(tx1 * this._s, ty1 * this._s, tx2 * this._s, ty2 * this._s, tx3 * this._s, ty3 * this._s)
    const D = p5.dist(x1, y1, x3, y3)
    const d = D / 2
    if (d < 0.5) return
    const randVal = p5.constrain(p5.randomGaussian(0.5, 0.15), 0, 1)
    const x4 = p5.lerp(x1, x3, randVal)
    const y4 = p5.lerp(y1, y3, randVal)
    this.drawTriangle(x1, y1, x4, y4, x2, y2, z + zInc)
    this.drawTriangle(x2, y2, x4, y4, x3, y3, z + zInc * 2)
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    const p5 = this._p5
    const xs = tilePoints.map(({ x }) => x).sort((a, b) => a - b)
    const w = xs[2] * this._s - xs[0] * this._s
    const tc = p5.random(this.palette[0])
    p5.strokeWeight(w / 80)
    p5.stroke(tc)
    p5.fill(tc)
    p5.quad(
      tilePoints[0].x * this._s,
      tilePoints[0].y * this._s,
      tilePoints[1].x * this._s,
      tilePoints[1].y * this._s,
      tilePoints[2].x * this._s,
      tilePoints[2].y * this._s,
      tilePoints[3].x * this._s,
      tilePoints[3].y * this._s
    )
    if (isBorder || p5.random() < 0.5) {
      return
    }
    const c = p5.random(this.palette[0])
    for (let i = 0; i < p5.floor(p5.random(80, 130)); i++) {
      p5.strokeWeight(w / 80)
      if (p5.random() < 0.2) {
        const tc = p5.random(this.palette[0])
        p5.fill(tc)
        p5.stroke(tc[0], tc[1], tc[2] - 20)
      } else {
        p5.fill(c)
        p5.stroke(c[0], c[1], c[2] - 20)
      }
      p5.beginShape()
      const cx = frontLeftCorner3DCoord.x + 0.5
      const cy = frontLeftCorner3DCoord.y + 0.5
      const r = 0.2
      for (let j = 0; j < p5.TWO_PI; j += 0.2) {
        const [x1, y1] = this._projectionCalculator3d.getProjectedPoint([
          cx + (r - i / 1000) * Math.cos(j),
          cy + (r - i / 1000) * Math.sin(j),
          frontLeftCorner3DCoord.z + i / 250
        ])
        p5.vertex(x1 * this._s, y1 * this._s)
      }
      p5.endShape(p5.CLOSE)
    }
    p5.noStroke()
    this.drawTriangle(frontLeftCorner3DCoord.x, frontLeftCorner3DCoord.y,
      frontLeftCorner3DCoord.x + 1, frontLeftCorner3DCoord.y,
      frontLeftCorner3DCoord.x + 1, frontLeftCorner3DCoord.y + 1,
      frontLeftCorner3DCoord.z + this.zInc)
    this.drawTriangle(frontLeftCorner3DCoord.x, frontLeftCorner3DCoord.y,
      frontLeftCorner3DCoord.x, frontLeftCorner3DCoord.y + 1,
      frontLeftCorner3DCoord.x + 1, frontLeftCorner3DCoord.y + 1,
      frontLeftCorner3DCoord.z + this.zInc * 2)
  }

  afterDraw () {}

  static author () { return 'Nick Dima' }

  static name () { return 'Esoteric Oasis' }
}
