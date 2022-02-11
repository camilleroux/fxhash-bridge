// Anaglyphic
// Status: "Ready"
// Wallet: tz1hkKqGk3fPPYroNagWpWsxxV3x8P8jqwp9

import Style from "./style";

export default class AnaglyphicStyle extends Style {
  constructor(gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5);
    this.prj = this._projectionCalculator3d;
    this.v = this._p5.createVector;
  }

  beforeDraw() {
    this._p5.background("#fff");

    this._p5.fill("rgba(0,0,0,1)");

    const center = this.v().set(
      this.prj.getProjectedPoint([0, this._gridSizeY, 0.1])
    );

    const horizon = window.innerHeight * center.y;

    this._p5.circle(
      window.innerHeight / 2 - 5,
      horizon,
      window.innerHeight / 4
    );

    this._p5.circle(window.innerHeight / 2, horizon, window.innerHeight / 4);

    this._p5.fill("rgba(0,0,0,0)");
    for (let i = 0; i < 7; i++) {
      this._p5.stroke("rgb(0,255,235)");
      this._p5.circle(
        window.innerHeight / 2,
        horizon,
        (window.innerHeight * (7 - i)) / 4
      );
      this._p5.stroke("rgb(255,0,0)");
      this._p5.circle(
        window.innerHeight / 2 - 5,
        horizon,
        (window.innerHeight * (7 - i)) / 4
      );
    }

    for (let i = 0; i <= 18; i++) {
      this._p5.stroke("rgb(0,255,235)");
      this._p5.line(
        window.innerHeight / 2 +
          window.innerHeight * Math.cos((Math.PI / 9) * i), //x1
        horizon + window.innerHeight * Math.sin((Math.PI / 9) * i), //y1
        window.innerHeight / 2 +
          (window.innerHeight / 8) * Math.cos((Math.PI / 9) * i), //x1,
        horizon + (window.innerHeight / 8) * Math.sin((Math.PI / 9) * i) //y1
      );
      this._p5.stroke("rgb(255,0,0)");
      this._p5.line(
        -5 +
          window.innerHeight / 2 +
          window.innerHeight * Math.cos((Math.PI / 9) * i), //x1
        horizon + window.innerHeight * Math.sin((Math.PI / 9) * i), //y1
        -5 +
          window.innerHeight / 2 +
          (window.innerHeight / 8) * Math.cos((Math.PI / 9) * i), //x1,
        horizon + (window.innerHeight / 8) * Math.sin((Math.PI / 9) * i) //y1
      );
    }
    this._p5.stroke("rgba(0,0,0,0)");
    this._p5.fill("rgba(0,0,0,1)");

    this._p5.square(0, horizon - window.innerHeight, window.innerHeight);
  }

  drawTile(tilePoints, frontLeftCorner3DCoord, isBorder) {
    var tileHeight = 10 + parseInt(fxrand() * 10);

    var perspectiveShift = 0.003 + (tilePoints[0].y - tilePoints[1].y) * 0.3;

    tilePoints[0].x += fxrand() * perspectiveShift;
    tilePoints[0].y += fxrand() * perspectiveShift;
    tilePoints[1].x += fxrand() * perspectiveShift;
    tilePoints[1].y += fxrand() * perspectiveShift;
    tilePoints[2].x += fxrand() * perspectiveShift;
    tilePoints[2].y += fxrand() * perspectiveShift;
    tilePoints[3].x += fxrand() * perspectiveShift;
    tilePoints[3].y += fxrand() * perspectiveShift;

    this._p5.stroke("rgb(0,255,235)");
    this._p5.fill("white");

    //left
    this._p5.quad(
      tilePoints[0].x * this._s,
      tilePoints[0].y * this._s,
      tilePoints[1].x * this._s,
      tilePoints[1].y * this._s,
      tilePoints[1].x * this._s,
      tilePoints[1].y * this._s + tileHeight,
      tilePoints[0].x * this._s,
      tilePoints[0].y * this._s + tileHeight
    );

    //right
    this._p5.quad(
      tilePoints[2].x * this._s,
      tilePoints[2].y * this._s,
      tilePoints[3].x * this._s,
      tilePoints[3].y * this._s,
      tilePoints[3].x * this._s,
      tilePoints[3].y * this._s + tileHeight,
      tilePoints[2].x * this._s,
      tilePoints[2].y * this._s + tileHeight
    );

    //top
    this._p5.quad(
      tilePoints[0].x * this._s,
      tilePoints[0].y * this._s,
      tilePoints[1].x * this._s,
      tilePoints[1].y * this._s,
      tilePoints[2].x * this._s,
      tilePoints[2].y * this._s,
      tilePoints[3].x * this._s,
      tilePoints[3].y * this._s
    );

    //front
    this._p5.quad(
      tilePoints[0].x * this._s,
      tilePoints[0].y * this._s,
      tilePoints[3].x * this._s,
      tilePoints[3].y * this._s,
      tilePoints[3].x * this._s,
      tilePoints[3].y * this._s + tileHeight,
      tilePoints[0].x * this._s,
      tilePoints[0].y * this._s + tileHeight
    );

    const shift = -5;
    this._p5.stroke("rgb(255,0,0)");
    this._p5.fill("white");
    this._p5.quad(
      tilePoints[0].x * this._s + shift,
      tilePoints[0].y * this._s,
      tilePoints[1].x * this._s + shift,
      tilePoints[1].y * this._s,
      tilePoints[1].x * this._s + shift,
      tilePoints[1].y * this._s + tileHeight,
      tilePoints[0].x * this._s + shift,
      tilePoints[0].y * this._s + tileHeight
    );

    this._p5.quad(
      tilePoints[0].x * this._s + shift,
      tilePoints[0].y * this._s,
      tilePoints[1].x * this._s + shift,
      tilePoints[1].y * this._s,
      tilePoints[2].x * this._s + shift,
      tilePoints[2].y * this._s,
      tilePoints[3].x * this._s + shift,
      tilePoints[3].y * this._s
    );

    //front
    this._p5.quad(
      tilePoints[0].x * this._s + shift,
      tilePoints[0].y * this._s,
      tilePoints[3].x * this._s + shift,
      tilePoints[3].y * this._s,
      tilePoints[3].x * this._s + shift,
      tilePoints[3].y * this._s + tileHeight,
      tilePoints[0].x * this._s + shift,
      tilePoints[0].y * this._s + tileHeight
    );
    for (let rise = 0; rise < 200; rise++) {
      this._p5.stroke("rgb(0,255,235)");
      this._p5.circle(
        tilePoints[3].x * this._s,
        -rise * 40 + tilePoints[3].y * this._s,
        0.1
      );
      this._p5.circle(
        tilePoints[2].x * this._s,
        -rise * 40 + tilePoints[3].y * this._s,
        0.1
      );
      this._p5.circle(
        tilePoints[1].x * this._s,
        -rise * 40 + tilePoints[3].y * this._s,
        0.1
      );
      this._p5.circle(
        tilePoints[0].x * this._s,
        -rise * 40 + tilePoints[3].y * this._s,
        0.1
      );
      this._p5.stroke("rgb(255,0,0)");
      this._p5.circle(
        tilePoints[3].x * this._s + shift,
        -rise * 40 + tilePoints[3].y * this._s,
        0.1
      );
      this._p5.circle(
        tilePoints[2].x * this._s + shift,
        -rise * 40 + tilePoints[3].y * this._s,
        0.1
      );
      this._p5.circle(
        tilePoints[1].x * this._s + shift,
        -rise * 40 + tilePoints[3].y * this._s,
        0.1
      );
      this._p5.circle(
        tilePoints[0].x * this._s + shift,
        -rise * 40 + tilePoints[3].y * this._s,
        0.1
      );
    }
  }

  afterDraw() {}

  static author() {
    return "Anaglyphic";
  }

  static name() {
    return "Blest Path";
  }
}
