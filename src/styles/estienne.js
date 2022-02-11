// Estienne
// Status: WIP // "WIP", "Ready"
// wallet: tz1fFaDrCytWQiycjWSAfJkyLgQcMMmFEi2y

import { FXRandomIntBetween, FXRandomOption } from "@liamegan1/fxhash-helpers"
import Style from "./style"

const palettes = []

export default class EstienneStyle extends Style {
  beforeDraw() {
    const p5 = this._p5
    p5.strokeJoin(p5.ROUND)
    this.palettes = [
      // Cream on blue
      ["#22223b", "#c9ada7", "#f2e9e4"],
      // White and red on dark gray
      ["#fdf0d5", "#003049", "#780000"],
    ]

    this.palette = p5.random(this.palettes)

    this.bgColor = this.palette.shift()
    this.strokeTileColor = this.palette.shift()
    this.strokeBorderColor = this.palette.shift()
    p5.background(this.bgColor)
    this.bridgeStyle = p5.floor(p5.random(2));
    this.pylonsHeight = 1.1
  }

  drawTile(tilePoints, frontLeftCorner3DCoord, isBorder) {
    const p5 = this._p5
    const coord = frontLeftCorner3DCoord
    const quads = []
    const duplicates = p5.floor(p5.random(5, 20))
    const strokeW = ((1 - (coord.y / this._gridSizeY) ** 0.5) * this._s) / 800

    p5.push()

    p5.stroke(this.strokeTileColor)
    p5.fill(this.bgColor)
    p5.strokeWeight(strokeW)

    if (isBorder) {
      p5.stroke(this.strokeBorderColor)
    }

    for (let i = 0; i < duplicates; i++) {
      let quadPoints = []
      ;[
        [coord.x, coord.y],
        [coord.x + 1, coord.y],
        [coord.x + 1, coord.y + 1],
        [coord.x, coord.y + 1],
      ].forEach((p) => {
        const v = p5.createVector(
          ...this._projectionCalculator3d.getProjectedPoint([
            p[0],
            p[1],
            p5.map(i, 0, duplicates - 1, coord.z - 0.01 * duplicates, coord.z),
          ])
        )
        quadPoints.push(v)
      }, this)
      quadPoints[4] = p5.lerpColor(
        p5.color(this.bgColor),
        p5.color(isBorder ? this.strokeBorderColor : this.strokeTileColor),
        (i / duplicates) ** 2
      )
      quads.push(quadPoints)
    }

    for (let q of quads) {
      p5.push()
      p5.stroke(q[4])
      p5.quad(
        q[0].x * this._s,
        q[0].y * this._s,
        q[1].x * this._s,
        q[1].y * this._s,
        q[2].x * this._s,
        q[2].y * this._s,
        q[3].x * this._s,
        q[3].y * this._s
      )
      p5.pop()
    }

    if (isBorder) {
      switch (this.bridgeStyle) {
        case 0:
          this.suspendedBridge(coord)
          break

        case 1:
          this.cableStayedBridge(coord)
          break
      }
    }

    p5.pop()
  }

  suspendedBridge(coord) {
    const p5 = this._p5

    // Draw main cables in 2 parts (before and after pylons)
    if (!this.mainCablesDrawn1) {
      p5.push()
      for (let gy = this._gridSizeY; gy > this._gridSizeY / 2; gy--) {
        const y = 1 - gy / this._gridSizeY
        const y1 = 1 - (gy - 1) / this._gridSizeY
        const h0 = 0.2
        const h = h0 + p5.min(y ** 2, (y - 1) ** 2) * 4 * (1 - h0)
        const h1 = h0 + p5.min(y1 ** 2, (y1 - 1) ** 2) * 4 * (1 - h0)
        const strokeW = ((1 - (gy / this._gridSizeY) ** 0.5) * this._s) / 800
        p5.strokeWeight(3 * strokeW)
        this.line3D(
          -this._gridSizeX / 2 + 0.5,
          gy + 0.5,
          h,
          -this._gridSizeX / 2 + 0.5,
          gy - 0.5,
          h1
        )
        this.line3D(
          this._gridSizeX / 2 - 0.5,
          gy + 0.5,
          h,
          this._gridSizeX / 2 - 0.5,
          gy - 0.5,
          h1
        )
      }
      this.mainCablesDrawn1 = true
      p5.pop()
    }
    if (!this.mainCablesDrawn2 && this.pylonsDrawn) {
      p5.push()
      for (let gy = this._gridSizeY / 2; gy > -1; gy--) {
        const y = 1 - gy / this._gridSizeY
        const y1 = 1 - (gy - 1) / this._gridSizeY
        const h0 = 0.2
        const h = h0 + p5.min(y ** 2, (y - 1) ** 2) * 4 * (1 - h0)
        const h1 = h0 + p5.min(y1 ** 2, (y1 - 1) ** 2) * 4 * (1 - h0)
        const strokeW = ((1 - (gy / this._gridSizeY) ** 0.5) * this._s) / 800
        p5.strokeWeight(3 * strokeW)
        this.line3D(
          -this._gridSizeX / 2 + 0.5,
          gy + 0.5,
          h,
          -this._gridSizeX / 2 + 0.5,
          gy - 0.5,
          h1
        )
        this.line3D(
          this._gridSizeX / 2 - 0.5,
          gy + 0.5,
          h,
          this._gridSizeX / 2 - 0.5,
          gy - 0.5,
          h1
        )
      }
      this.mainCablesDrawn2 = true
      p5.pop()
    }

    // Draw secondary cables
    if (coord.x == -this._gridSizeX / 2 || coord.x == this._gridSizeX / 2 - 1) {
      const y = 1 - (coord.y - 0.5) / this._gridSizeY
      const h0 = 0.2
      const h = h0 + p5.min(y ** 2, (y - 1) ** 2) * 4 * (1 - h0)
      this.line3D(
        coord.x + 0.5,
        coord.y + 0.5,
        coord.z,
        coord.x + 0.5,
        coord.y + 0.5,
        h
      )
    }

    this.pylons(coord)
  }

  cableStayedBridge(coord) {
    const p5 = this._p5
    // Draw railings and cables
    if (
      !(coord.y % 2) &&
      (coord.x == -this._gridSizeX / 2 || coord.x == this._gridSizeX / 2 - 1)
    ) {
      const railHeight = 0.1
      const railWidth = 0.02
      this.boxFromCorners(
        coord.x + 0.25,
        coord.y + 0.4,
        coord.z,
        coord.x + 0.75,
        coord.y + 0.6,
        coord.z + railHeight
      )
      this.boxFromCorners(
        coord.x + 0.25,
        coord.y - 0.5,
        coord.z + railHeight,
        coord.x + 0.75,
        coord.y + 1.5,
        coord.z + railHeight + railWidth
      )
      // cables
      this.line3D(
        coord.x + 0.5,
        coord.y + 0.5,
        coord.z + railHeight + railWidth,
        coord.x + 0.5,
        this._gridSizeY / 2,
        coord.z + this.pylonsHeight - 0.1
      )
    }

    this.pylons(coord)
  }

  pylons(coord) {
    const p5 = this._p5
    // Draw pylons
    if (
      window.$fxhashFeatures.borders != "none" &&
      coord.y / this._gridSizeY < 0.5 &&
      !this.pylonsDrawn
    ) {
      p5.push()
      p5.stroke(this.strokeBorderColor)
      this.boxFromCorners(
        -this._gridSizeX / 2,
        this._gridSizeY / 2,
        -0.1,
        -this._gridSizeX / 2 + 1,
        this._gridSizeY / 2 + 1,
        this.pylonsHeight
      )
      this.boxFromCorners(
        this._gridSizeX / 2 - 1,
        this._gridSizeY / 2,
        -0.1,
        this._gridSizeX / 2,
        this._gridSizeY / 2 + 1,
        this.pylonsHeight
      )
      this.pylonsDrawn = true
      p5.pop()
    }
  }

  // Draw a projected 3D line
  line3D(x1, y1, z1, x2, y2, z2) {
    this._p5.line(
      ...this._projectionCalculator3d
        .getProjectedPoint([x1, y1, z1])
        .map((x) => x * this._s),
      ...this._projectionCalculator3d
        .getProjectedPoint([x2, y2, z2])
        .map((x) => x * this._s)
    )
  }

  // Draw a 3D box without rotation from 2 corner points
  boxFromCorners(x1, y1, z1, x2, y2, z2) {
    const quadList = [
      [
        [x1, y1, z1],
        [x1, y2, z1],
        [x2, y2, z1],
        [x2, y1, z1],
      ],
      [
        [x1, y1, z2],
        [x1, y2, z2],
        [x2, y2, z2],
        [x2, y1, z2],
      ],
      [
        [x1, y1, z1],
        [x1, y2, z1],
        [x1, y2, z2],
        [x1, y1, z2],
      ],
      [
        [x2, y1, z1],
        [x2, y2, z1],
        [x2, y2, z2],
        [x2, y1, z2],
      ],
      [
        [x1, y1, z1],
        [x2, y1, z1],
        [x2, y1, z2],
        [x1, y1, z2],
      ],
      [
        [x1, y2, z1],
        [x2, y2, z1],
        [x2, y2, z2],
        [x1, y2, z2],
      ],
    ]

    quadList.sort(
      (a, b) =>
        this._p5.dist(
          (b[0][0] + b[1][0] + b[2][0] + b[3][0]) / 4,
          (b[0][1] + b[1][1] + b[2][1] + b[3][1]) / 4,
          (b[0][2] + b[1][2] + b[2][2] + b[3][2]) / 4,
          0,
          0,
          0.5
        ) -
        this._p5.dist(
          (a[0][0] + a[1][0] + a[2][0] + a[3][0]) / 4,
          (a[0][1] + a[1][1] + a[2][1] + a[3][1]) / 4,
          (a[0][2] + a[1][2] + a[2][2] + a[3][2]) / 4,
          0,
          0,
          0.5
        )
    )

    const pointList = quadList.map((pl) =>
      pl.map((p) =>
        this._projectionCalculator3d.getProjectedPoint([p[0], p[1], p[2]])
      )
    )

    for (let p of pointList) {
      this._p5.quad(
        p[0][0] * this._s,
        p[0][1] * this._s,
        p[1][0] * this._s,
        p[1][1] * this._s,
        p[2][0] * this._s,
        p[2][1] * this._s,
        p[3][0] * this._s,
        p[3][1] * this._s
      )
    }
  }

  afterDraw() {}

  static author() {
    return "Estienne"
  }

  static name() {
    return "Estienne Style"
  }
}
