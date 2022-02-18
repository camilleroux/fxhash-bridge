// grosgg
// Status: WIP // "WIP", "Ready"
// Twitter: @grosgg
// Fxhash: https://www.fxhash.xyz/u/grosgg
// Wallet: tz1Lf3aAFLG6omKsqr2ofRGRpJ9xBK1VPt7A

import p5 from "p5";
import Style from "./style";

export default class GrosggStyle extends Style {
  constructor(gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5);
    console.log(gridSizeX, gridSizeY, s);
    this.prj = projectionCalculator3d;
    this.gridSize = this._p5.createVector(gridSizeX, gridSizeY);
    this.centerPoint = this.prj.getProjectedPoint([0, this.gridSize.y, 0]);
    this.heightFactor = 1; //this._p5.random(1, 2);
    this.wallHeight = 0.3 * this.heightFactor;
    this.lineRes = this._p5.random([2, 5, 10]);
    this.lineThickness = this._p5.random([0.25, 0.5, 0.75]);
    // console.log("center", this.centerPoint);
    // console.log("lineRes", this.lineRes);
    // console.log("lineThickness", this.lineThickness);

    this.palette = this._p5.random([
      {
        mountain: this._p5.random(["#333", "#444", "#555"]),
        mid: ["#777", "#888", "#999", "#aaa"],
        bright: ["#ccc", "#ddd", "#eee"],
        stroke: "#111",
        background: "#111",
      },
      {
        mountain: this._p5.random(["#774936", "#8a5a44", "#9d6b53"]),
        mid: ["#b07d62", "#c38e70", "#cd9777"],
        bright: ["#d69f7e", "#deab90", "#e6b8a2", "#edc4b3"],
        stroke: "#111",
        background: "#111",
      },
      {
        mountain: this._p5.random(["#641220", "#6e1423", "#85182a"]),
        bright: ["#641220", "#6e1423", "#85182a"],
        mid: ["#a11d33"],
        stroke: "#111",
        background: "#111",
      },
      {
        mountain: this._p5.random([
          "#ff595e",
          "#ffca3a",
          "#8ac926",
          "#1982c4",
          "#6a4c93",
        ]),
        bright: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"],
        mid: ["#999", "#aaa", "#bbb"],
        stroke: "#111",
        background: "#111",
      },
    ]);
  }

  static author() {
    return "grosgg";
  }

  static name() {
    return "Devour";
  }

  beforeDraw() {
    this._p5.background(this.palette.mountain);
    this._p5.noStroke();
    this._p5.strokeWeight(this.lineThickness);
    this._p5.fill(this.palette.background);
    this._p5.rect(0, 0, this._s, this.centerPoint[1] * this._s);

    for (let y = 0; y < this.centerPoint[1] * this._s; y += 2) {
      const skyColor = this._p5.lerpColor(
        this._p5.color(this.palette.background),
        this._p5.color(this.palette.mountain),
        y / (this.centerPoint[1] * this._s)
      );
      this._p5.fill(skyColor);
      this._p5.rect(0, y, this._s, y + 2);
    }

    this._p5.fill("#fff");
    const sunSize = this._s * this._p5.random(0.5, 0.8);
    this._p5.arc(
      this.centerPoint[0] * this._s,
      this.centerPoint[1] * this._s,
      sunSize,
      sunSize,
      this._p5.PI,
      this._p5.TWO_PI
    );

    this._p5.stroke(this.palette.stroke);
    this._p5.fill(this.palette.mountain);

    const mainMountainSize = this._p5.createVector(
      this._p5.random(30, 60),
      50,
      2.5
    );
    this._drawMountain(
      this._p5.createVector(0, this.gridSize.y, 0),
      mainMountainSize
    );

    // Mountains left
    for (
      let y = this.gridSize.y - 10;
      y >= 0;
      y -= this._p5.map(y, this.gridSize.y, 0, 5, 2)
    ) {
      for (
        let x = -this.gridSize.x * 2;
        x < -this.gridSize.x / 2;
        x += this._p5.map(y, this.gridSize.y, 0, 5, 1)
      ) {
        const baseSize = this._p5.random(
          1,
          this._p5.map(y, this.gridSize.y, 0, 30, 2)
        );
        this._drawMountain(
          this._p5.createVector(x, y, 0),
          this._p5.createVector(
            baseSize,
            baseSize,
            this._p5.random(0.1, this._p5.map(y, this.gridSize.y, 0, 2, 0.1))
          )
        );
      }
    }

    // Mountains right
    for (
      let y = this.gridSize.y - 10;
      y >= 0;
      y -= this._p5.map(y, this.gridSize.y, 0, 5, 2)
    ) {
      for (
        let x = this.gridSize.x * 2;
        x > this.gridSize.x / 2;
        x -= this._p5.map(y, this.gridSize.y, 0, 5, 1)
      ) {
        const baseSize = this._p5.random(
          1,
          this._p5.map(y, this.gridSize.y, 0, 30, 2)
        );
        this._drawMountain(
          this._p5.createVector(x, y, 0),
          this._p5.createVector(
            baseSize,
            baseSize,
            this._p5.random(0.1, this._p5.map(y, this.gridSize.y, 0, 2, 0.1))
          )
        );
      }
    }

    // Tunnel
    this._penQuad(
      this.prj.getProjectedPoint([
        -this.gridSize.x / 2 - 1,
        this.gridSize.y,
        0,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        -this.gridSize.x / 2 - 1,
        this.gridSize.y,
        0,
      ])[1] * this._s,
      this.prj.getProjectedPoint([
        this.gridSize.x / 2 + 1,
        this.gridSize.y,
        0,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        this.gridSize.x / 2 + 1,
        this.gridSize.y,
        0,
      ])[1] * this._s,
      this.prj.getProjectedPoint([
        this.gridSize.x / 2 + 1,
        this.gridSize.y,
        this.wallHeight + 0.2,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        this.gridSize.x / 2 + 1,
        this.gridSize.y,
        this.wallHeight + 0.2,
      ])[1] * this._s,
      this.prj.getProjectedPoint([
        -this.gridSize.x / 2 - 1,
        this.gridSize.y,
        this.wallHeight + 0.2,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        -this.gridSize.x / 2 - 1,
        this.gridSize.y,
        this.wallHeight + 0.2,
      ])[1] * this._s
    );
    this._p5.fill("#000");
    this._penQuad(
      this.prj.getProjectedPoint([
        -this.gridSize.x / 2 - 0.5,
        this.gridSize.y,
        0,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        -this.gridSize.x / 2 - 0.5,
        this.gridSize.y,
        0,
      ])[1] * this._s,
      this.prj.getProjectedPoint([
        this.gridSize.x / 2 + 0.5,
        this.gridSize.y,
        0,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        this.gridSize.x / 2 + 0.5,
        this.gridSize.y,
        0,
      ])[1] * this._s,
      this.prj.getProjectedPoint([
        this.gridSize.x / 2 - 2,
        this.gridSize.y,
        this.wallHeight + 0.1,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        this.gridSize.x / 2 - 2,
        this.gridSize.y,
        this.wallHeight + 0.1,
      ])[1] * this._s,
      this.prj.getProjectedPoint([
        -this.gridSize.x / 2 + 2,
        this.gridSize.y,
        this.wallHeight + 0.1,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        -this.gridSize.x / 2 + 2,
        this.gridSize.y,
        this.wallHeight + 0.1,
      ])[1] * this._s
    );

    // Ground
    this._p5.fill(this._p5.random(this.palette.mid));
    this._penQuad(
      this.prj.getProjectedPoint([-this.gridSize.x / 2, 0, 0])[0] * this._s,
      this.prj.getProjectedPoint([-this.gridSize.x / 2, 0, 0])[1] * this._s,
      this.prj.getProjectedPoint([this.gridSize.x / 2, 0, 0])[0] * this._s,
      this.prj.getProjectedPoint([this.gridSize.x / 2, 0, 0])[1] * this._s,
      this.prj.getProjectedPoint([this.gridSize.x / 2, this.gridSize.y, 0])[0] *
        this._s,
      this.prj.getProjectedPoint([this.gridSize.x / 2, this.gridSize.y, 0])[1] *
        this._s,
      this.prj.getProjectedPoint([
        -this.gridSize.x / 2,
        this.gridSize.y,
        0,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        -this.gridSize.x / 2,
        this.gridSize.y,
        0,
      ])[1] * this._s
    );

    this._p5.strokeWeight(this._p5.map(this.lineThickness, 0.25, 0.75, 0.5, 1));
    this._p5.stroke(this.palette.stroke);
    const groundDotSpacing = this._p5.random(0.1, 0.3);
    for (let y = 0; y < this.gridSize.y; y += groundDotSpacing) {
      for (
        let x = -this.gridSize.x / 2;
        x < this.gridSize.x / 2;
        x += groundDotSpacing
      ) {
        this._p5.point(
          this.prj.getProjectedPoint([x, y, 0])[0] * this._s,
          this.prj.getProjectedPoint([x, y, 0])[1] * this._s
        );
      }
    }
    this._p5.strokeWeight(this.lineThickness);

    // Wall
    const borders = window.$fxhashFeatures.borders;
    let leftWallBase, rightWallBase, wallBaseDimensions, borderOffset;
    if (borders != "none") {
      borderOffset = borders == "double" ? 2 : 1;
      leftWallBase = this._p5.createVector(-this.gridSize.x / 2, -4, 0);
      rightWallBase = this._p5.createVector(
        this.gridSize.x / 2 - borderOffset,
        -4,
        0
      );
      wallBaseDimensions = this._p5.createVector(
        borderOffset,
        this.gridSize.y + 4,
        0.04
      );
    } else {
      borderOffset = 0.5;
      leftWallBase = this._p5.createVector(-this.gridSize.x / 2 - 0.5, -4, 0);
      rightWallBase = this._p5.createVector(this.gridSize.x / 2, -4, 0);
      wallBaseDimensions = this._p5.createVector(
        0.5,
        this.gridSize.y + 4,
        0.02
      );
    }
    this._drawBox(leftWallBase, wallBaseDimensions);
    this._drawBox(rightWallBase, wallBaseDimensions);

    this._drawVerticalLinePatternY(
      this._p5.createVector(
        leftWallBase.x,
        leftWallBase.y,
        leftWallBase.z + wallBaseDimensions.z
      ),
      this._p5.createVector(
        leftWallBase.x + borderOffset,
        leftWallBase.y + wallBaseDimensions.y,
        leftWallBase.z + wallBaseDimensions.z
      )
    );
    this._drawVerticalLinePatternY(
      this._p5.createVector(
        rightWallBase.x,
        rightWallBase.y,
        rightWallBase.z + wallBaseDimensions.z
      ),
      this._p5.createVector(
        rightWallBase.x + borderOffset,
        rightWallBase.y + wallBaseDimensions.y,
        rightWallBase.z + wallBaseDimensions.z
      )
    );
  }

  drawTile(tilePoints, frontLeftCorner3DCoord, isBorder) {
    // console.log("tilePoints", tilePoints);
    // console.log("frontLeftCorner3DCoord", frontLeftCorner3DCoord);

    // this._p5.fill(this._p5.random(["#aaa", "#333", "#777", "#fff"]));

    if (isBorder) {
      // console.log(frontLeftCorner3DCoord);
      this._drawPole(frontLeftCorner3DCoord);
    } else {
      this._drawBuilding(frontLeftCorner3DCoord, tilePoints);
    }
  }

  afterDraw() {
    const borders = window.$fxhashFeatures.borders;
    if (borders != "none") {
      this._p5.fill(this._p5.random(this.palette.mid));
      const borderOffset = borders == "double" ? 2 : 1;
      const leftWallTop = this._p5.createVector(
        -this.gridSize.x / 2,
        -4,
        this.wallHeight
      );
      const rightWallTop = this._p5.createVector(
        this.gridSize.x / 2 - borderOffset,
        -4,
        this.wallHeight
      );
      const wallTopDimensions = this._p5.createVector(
        borderOffset,
        this.gridSize.y + 4,
        0.01
      );
      this._drawBox(leftWallTop, wallTopDimensions);
      this._drawBox(rightWallTop, wallTopDimensions);

      this._drawVerticalLinePatternY(
        this._p5.createVector(
          leftWallTop.x,
          leftWallTop.y,
          leftWallTop.z + wallTopDimensions.z
        ),
        this._p5.createVector(
          leftWallTop.x + borderOffset,
          leftWallTop.y + wallTopDimensions.y,
          leftWallTop.z + wallTopDimensions.z
        )
      );
      this._drawVerticalLinePatternY(
        this._p5.createVector(
          rightWallTop.x,
          rightWallTop.y,
          rightWallTop.z + wallTopDimensions.z
        ),
        this._p5.createVector(
          rightWallTop.x + borderOffset,
          rightWallTop.y + wallTopDimensions.y,
          rightWallTop.z + wallTopDimensions.z
        )
      );
    }
  }

  _drawPole(tilePos) {
    this._p5.fill(this._p5.random(this.palette.mid));
    const poleDimensions = this._p5.createVector(
      this._p5.random(0.2) + 0.1,
      this._p5.random(0.2) + 0.1,
      this.wallHeight - tilePos.z
    );
    const polePos = this._p5.createVector(
      tilePos.x + 0.5 - poleDimensions.x / 2,
      tilePos.y + 0.5 - poleDimensions.x / 2,
      tilePos.z
    );

    this._drawBox(polePos, poleDimensions);
  }

  _drawBuilding(tilePos) {
    const buildingColor = this._p5.lerpColor(
      this._p5.color(this._p5.random(this.palette.bright)),
      this._p5.color("#000"),
      this._p5.map(tilePos.y, this.gridSize.y * 0.75, this.gridSize.y, 0, 1)
    );
    this._p5.fill(buildingColor);
    const dimensions = this._p5.createVector(
      this._p5.random(0.6) + 0.3,
      this._p5.random(0.6) + 0.3,
      this._p5.random(0.2) + 0.1 * this.heightFactor
    );
    const buildingPos = this._p5.createVector(
      tilePos.x + 0.5 - dimensions.x / 2,
      tilePos.y + 0.5 - dimensions.x / 2,
      tilePos.z
    );
    // console.log("dimensions", dimensions);
    // console.log("buildingPos", buildingPos);

    this._drawBox(buildingPos, dimensions);
    this._drawBuildingPattern(buildingPos, dimensions);
  }

  _drawBox(origin, dimensions) {
    this._p5.stroke(this.palette.stroke);
    this._p5.strokeWeight(this.lineThickness);

    // Front
    this._penQuad(
      this.prj.getProjectedPoint([origin.x, origin.y, origin.z])[0] * this._s,
      this.prj.getProjectedPoint([origin.x, origin.y, origin.z])[1] * this._s,
      this.prj.getProjectedPoint([
        origin.x + dimensions.x,
        origin.y,
        origin.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x + dimensions.x,
        origin.y,
        origin.z,
      ])[1] * this._s,
      this.prj.getProjectedPoint([
        origin.x + dimensions.x,
        origin.y,
        origin.z + dimensions.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x + dimensions.x,
        origin.y,
        origin.z + dimensions.z,
      ])[1] * this._s,
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[1] * this._s
    );

    // Side if not center column
    if (origin.x < -0.5 || origin.x > 0) {
      let offset = origin.x > 0 ? 0 : dimensions.x;

      this._penQuad(
        this.prj.getProjectedPoint([origin.x + offset, origin.y, origin.z])[0] *
          this._s,
        this.prj.getProjectedPoint([origin.x + offset, origin.y, origin.z])[1] *
          this._s,
        this.prj.getProjectedPoint([
          origin.x + offset,
          origin.y + dimensions.y,
          origin.z,
        ])[0] * this._s,
        this.prj.getProjectedPoint([
          origin.x + offset,
          origin.y + dimensions.y,
          origin.z,
        ])[1] * this._s,
        this.prj.getProjectedPoint([
          origin.x + offset,
          origin.y + dimensions.y,
          origin.z + dimensions.z,
        ])[0] * this._s,
        this.prj.getProjectedPoint([
          origin.x + offset,
          origin.y + dimensions.y,
          origin.z + dimensions.z,
        ])[1] * this._s,
        this.prj.getProjectedPoint([
          origin.x + offset,
          origin.y,
          origin.z + dimensions.z,
        ])[0] * this._s,
        this.prj.getProjectedPoint([
          origin.x + offset,
          origin.y,
          origin.z + dimensions.z,
        ])[1] * this._s
      );
    }

    // Top
    if (
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[1] > this.centerPoint[1]
    ) {
      this._penQuad(
        this.prj.getProjectedPoint([
          origin.x + dimensions.x,
          origin.y,
          origin.z + dimensions.z,
        ])[0] * this._s,
        this.prj.getProjectedPoint([
          origin.x + dimensions.x,
          origin.y,
          origin.z + dimensions.z,
        ])[1] * this._s,
        this.prj.getProjectedPoint([
          origin.x + dimensions.x,
          origin.y + dimensions.y,
          origin.z + dimensions.z,
        ])[0] * this._s,
        this.prj.getProjectedPoint([
          origin.x + dimensions.x,
          origin.y + dimensions.y,
          origin.z + dimensions.z,
        ])[1] * this._s,
        this.prj.getProjectedPoint([
          origin.x,
          origin.y + dimensions.y,
          origin.z + dimensions.z,
        ])[0] * this._s,
        this.prj.getProjectedPoint([
          origin.x,
          origin.y + dimensions.y,
          origin.z + dimensions.z,
        ])[1] * this._s,
        this.prj.getProjectedPoint([
          origin.x,
          origin.y,
          origin.z + dimensions.z,
        ])[0] * this._s,
        this.prj.getProjectedPoint([
          origin.x,
          origin.y,
          origin.z + dimensions.z,
        ])[1] * this._s
      );
    }

    // Bottom
    if (
      this.prj.getProjectedPoint([origin.x, origin.y, origin.z])[1] <
      this.centerPoint[1]
    ) {
      this._penQuad(
        this.prj.getProjectedPoint([
          origin.x + dimensions.x,
          origin.y,
          origin.z,
        ])[0] * this._s,
        this.prj.getProjectedPoint([
          origin.x + dimensions.x,
          origin.y,
          origin.z,
        ])[1] * this._s,
        this.prj.getProjectedPoint([
          origin.x + dimensions.x,
          origin.y + dimensions.y,
          origin.z,
        ])[0] * this._s,
        this.prj.getProjectedPoint([
          origin.x + dimensions.x,
          origin.y + dimensions.y,
          origin.z,
        ])[1] * this._s,
        this.prj.getProjectedPoint([
          origin.x,
          origin.y + dimensions.y,
          origin.z,
        ])[0] * this._s,
        this.prj.getProjectedPoint([
          origin.x,
          origin.y + dimensions.y,
          origin.z,
        ])[1] * this._s,
        this.prj.getProjectedPoint([origin.x, origin.y, origin.z])[0] * this._s,
        this.prj.getProjectedPoint([origin.x, origin.y, origin.z])[1] * this._s
      );
    }
  }

  _drawBuildingPattern(origin, dimensions) {
    this._p5.stroke(this.palette.stroke);
    const spacing = this._p5.random(0.01, 0.03);

    this._drawHorizontalLinePatternZ(
      origin,
      this._p5.createVector(
        origin.x + dimensions.x,
        origin.y,
        origin.z + dimensions.z
      ),
      spacing
    );

    if (origin.x < -0.5 || origin.x > 0) {
      let offset = origin.x > 0 ? 0 : dimensions.x;

      this._drawHorizontalLinePatternZ(
        this._p5.createVector(origin.x + offset, origin.y, origin.z),
        this._p5.createVector(
          origin.x + offset,
          origin.y + dimensions.y,
          origin.z + dimensions.z
        ),
        spacing
      );
    }
  }

  _drawHorizontalLinePatternZ(pt1, pt2, spacing = this._p5.random(0.01, 0.03)) {
    for (let z = pt1.z; z < pt2.z; z += spacing) {
      this._penLine(
        this.prj.getProjectedPoint([pt1.x, pt1.y, z])[0] * this._s,
        this.prj.getProjectedPoint([pt1.x, pt1.y, z])[1] * this._s,
        this.prj.getProjectedPoint([pt2.x, pt2.y, z])[0] * this._s,
        this.prj.getProjectedPoint([pt2.x, pt2.y, z])[1] * this._s
      );
    }
  }

  _drawVerticalLinePatternY(pt1, pt2, spacing = this._p5.random(0.1, 0.2)) {
    for (let x = pt1.x; x < pt2.x; x += spacing) {
      this._penLine(
        this.prj.getProjectedPoint([x, pt1.y, pt1.z])[0] * this._s,
        this.prj.getProjectedPoint([x, pt1.y, pt1.z])[1] * this._s,
        this.prj.getProjectedPoint([x, pt2.y, pt2.z])[0] * this._s,
        this.prj.getProjectedPoint([x, pt2.y, pt2.z])[1] * this._s
      );
    }
  }

  _drawMountain = (origin, dimensions) => {
    this._p5.noStroke();
    this._penQuad(
      // Bottom
      this.prj.getProjectedPoint([
        origin.x,
        origin.y - dimensions.y * 0.1,
        origin.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x,
        origin.y - dimensions.y * 0.1,
        origin.z,
      ])[1] * this._s,
      // Left
      this.prj.getProjectedPoint([
        origin.x - dimensions.x / 2,
        origin.y,
        origin.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x - dimensions.x / 2,
        origin.y,
        origin.z,
      ])[1] * this._s,
      // Top
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[1] * this._s,
      // Right
      this.prj.getProjectedPoint([
        origin.x + dimensions.x / 2,
        origin.y,
        origin.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x + dimensions.x / 2,
        origin.y,
        origin.z,
      ])[1] * this._s
    );

    // Side lines
    this._p5.stroke(this.palette.stroke);
    this._penLine(
      this.prj.getProjectedPoint([
        origin.x - dimensions.x / 2,
        origin.y,
        origin.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x - dimensions.x / 2,
        origin.y,
        origin.z,
      ])[1] * this._s,
      // Top
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[1] * this._s
    );
    this._penLine(
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[1] * this._s,
      // Right
      this.prj.getProjectedPoint([
        origin.x + dimensions.x / 2,
        origin.y,
        origin.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x + dimensions.x / 2,
        origin.y,
        origin.z,
      ])[1] * this._s
    );

    // Middle line
    this._penLine(
      this.prj.getProjectedPoint([
        origin.x,
        origin.y - dimensions.y * 0.1,
        origin.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x,
        origin.y - dimensions.y * 0.1,
        origin.z,
      ])[1] * this._s,
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[0] * this._s,
      this.prj.getProjectedPoint([
        origin.x,
        origin.y,
        origin.z + dimensions.z,
      ])[1] * this._s
    );
  };

  _penQuad = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    this._p5.quad(x1, y1, x2, y2, x3, y3, x4, y4);
    this._penLine(x1, y1, x2, y2);
    this._penLine(x2, y2, x3, y3);
    this._penLine(x3, y3, x4, y4);
    this._penLine(x4, y4, x1, y1);
  };

  _penLine = (x1, y1, x2, y2) => {
    const v1 = this._p5.createVector(x1, y1);
    const v2 = this._p5.createVector(x2, y2);

    const dist = v1.dist(v2);
    for (let i = 0; i < dist; i += this.lineRes) {
      const lineWidth = this._p5.map(this._p5.sin(i), -1, 1, 0.2, 0.4);
      for (let j = 0; j < this.lineRes; j++) {
        const v = p5.Vector.lerp(v1, v2, (i + j) / dist);
        this._p5.circle(v.x, v.y, lineWidth);
      }
    }
  };
}
