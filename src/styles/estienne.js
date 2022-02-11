// Estienne
// wallet: tz1fFaDrCytWQiycjWSAfJkyLgQcMMmFEi2y

import { FXRandomIntBetween } from "@liamegan1/fxhash-helpers";
import Style from "./style";

export default class EstienneStyle extends Style {
  beforeDraw() {
    this.bgColor = "#011627"
    this.strokeTileColor = "#fdfffc"
    this.strokeBorderColor = "#ff9f1c"
    this._p5.background(this.bgColor);
    this.pylonsDrawn = false;
  }

  drawTile(tilePoints, frontLeftCorner3DCoord, isBorder) {
    const p5 = this._p5;

    p5.push();

    p5.stroke(this.strokeTileColor)
    p5.fill(this.bgColor);

    if (isBorder) {
      p5.stroke(this.strokeBorderColor);
    }

    const coord = frontLeftCorner3DCoord;

    const quads = [];

    const duplicates = FXRandomIntBetween(5, 20);
  
    for (let i = 0; i < duplicates; i++) {
      let quadPoints = [];
      [
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
        );
        quadPoints.push(v);
      }, this);
      quadPoints[4] = p5.lerpColor(
        p5.color(this.bgColor),
        p5.color(isBorder ? this.strokeBorderColor : this.strokeTileColor),
        (i / duplicates) ** 2
      );
      quads.push(quadPoints);
    }

    for (let q of quads) {
      p5.push();
      p5.stroke(q[4]);
      p5.quad(
        q[0].x * this._s,
        q[0].y * this._s,
        q[1].x * this._s,
        q[1].y * this._s,
        q[2].x * this._s,
        q[2].y * this._s,
        q[3].x * this._s,
        q[3].y * this._s
      );
    }

    if (
      isBorder &&
      !(coord.y % 2) &&
      (coord.x == -this._gridSizeX / 2 || coord.x == this._gridSizeX / 2 - 1)
    ) {
      const railHeight = 0.1;
      const railWidth = 0.02;
      this.boxFromCorners(
        coord.x + 0.25,
        coord.y + 0.4,
        coord.z,
        coord.x + 0.75,
        coord.y + 0.6,
        coord.z + railHeight
      );
      this.boxFromCorners(
        coord.x + 0.25,
        coord.y - 0.5,
        coord.z + railHeight,
        coord.x + 0.75,
        coord.y + 1.5,
        coord.z + railHeight + railWidth
      );
      this.line3D(
        coord.x + 0.5,
        coord.y + 0.5,
        coord.z + railHeight + railWidth,
        coord.x + 0.5,
        this._gridSizeY / 2,
        coord.z + 1
      );
    }

    if (
      window.$fxhashFeatures.borders != "none" &&
      coord.y / this._gridSizeY < 0.5 &&
      !this.pylonsDrawn
    ) {
      p5.push();
      p5.stroke(this.strokeBorderColor);
      this.boxFromCorners(
        -this._gridSizeX / 2,
        this._gridSizeY / 2,
        -0.1,
        -this._gridSizeX / 2 + 1,
        this._gridSizeY / 2 + 1,
        1.1
      );
      this.boxFromCorners(
        this._gridSizeX / 2 - 1,
        this._gridSizeY / 2,
        0,
        this._gridSizeX / 2,
        this._gridSizeY / 2+1,
        1.1
      );
      this.pylonsDrawn = true;
      p5.pop();
    }

    p5.pop();
  }

  line3D(x1, y1, z1, x2, y2, z2) {
    this._p5.line(
      ...this._projectionCalculator3d
        .getProjectedPoint([x1, y1, z1])
        .map((x) => x * this._s),
      ...this._projectionCalculator3d
        .getProjectedPoint([x2, y2, z2])
        .map((x) => x * this._s)
    );
  }

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
    ];

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
    );

    const pointList = quadList.map((pl) =>
      pl.map((p) =>
        this._projectionCalculator3d.getProjectedPoint([p[0], p[1], p[2]])
      )
    );

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
      );
    }
  }

  afterDraw() {}

  static author() {
    return "Estienne";
  }

  static name() {
    return "Estienne Style";
  }
}
