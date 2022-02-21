// jeres
// Status: "Ready"
// Twitter: @heyjeres
// Fxhash: https://www.fxhash.xyz/u/jeres
// Wallet: tz1hnnCaYDiRPH8apoJQB9wvytwpYQSJEzCK

import Style from './style'

export default class JeresStyle extends Style {

  WHITE = "#F4EEDC";
  BLACK = "#45413C";
  COLORS = ["#CEAC41", "#DAC27C", "#D7AF72", "#EFDEC2", "#A8651E"];
  SKYCOLORS = ["#948f9f", "#3E92CC"];
  WATERCOLORS = ["#2169BA", "#11489F", "#2A628F", "#2A628F"];
  TILECOLORS = ["#c93b36", "#c85470", "#4c9784", "#41569a", "#948f9f"];

  WIND = 0;

  randomWaterColor() {
    return this.WATERCOLORS[this._p5.floor(this._p5.random() * this.WATERCOLORS.length)];
  }

  randomTileColor() {
    return this.TILECOLORS[this._p5.floor(this._p5.random() * this.TILECOLORS.length)];
  }

  randomSkyColor() {
    return this.SKYCOLORS[this._p5.floor(this._p5.random() * this.SKYCOLORS.length)];
  }

  randomColor() {
    return this.COLORS[this._p5.floor(this._p5.random() * this.COLORS.length)];
  }

  beforeDraw() {
    this.SHAKE_LEVEL = 1/(1 + this._p5.floor(this._p5.random()*3));
    this.WIND = (this._p5.random() - 0.5)*4;
    this._p5.background(this.randomSkyColor())

    const horizonPercent = this._projectionCalculator3d.getProjectedPoint([0, this._gridSizeY, 0])[1]
    const horizon = horizonPercent * this._s
    this._p5.fill(this.randomWaterColor())
    this._p5.strokeWeight(0)
    this._p5.rect(0, horizon * 1.1, this._s, this._p5.height)
  }

  drawTile(tilePoints, frontLeftCorner3DCoord, isBorder) {

    const stepSize = this._p5.height / 128
    const nudgeMult = stepSize/512*this._s;
    var tileColor = this._p5.color(this.BLACK);

    for (var i = 0; i < 100; i++) {
      var shift = i * (isBorder ? 1 : 3)
      tileColor.setAlpha(255 - 24*shift);
      this._p5.fill(tileColor);
      this._p5.quad(
        tilePoints[0].x * this._s + (this._p5.random() - 0.5)*nudgeMult,
        tilePoints[0].y * this._s + (this._p5.random() - 0.5)*nudgeMult + nudgeMult*shift,
        tilePoints[1].x * this._s + (this._p5.random() - 0.5)*nudgeMult,
        tilePoints[1].y * this._s + (this._p5.random() - 0.5)*nudgeMult + nudgeMult*shift,
        tilePoints[2].x * this._s + (this._p5.random() - 0.5)*nudgeMult,
        tilePoints[2].y * this._s + (this._p5.random() - 0.5)*nudgeMult + nudgeMult*shift,
        tilePoints[3].x * this._s + (this._p5.random() - 0.5)*nudgeMult,
        tilePoints[3].y * this._s + (this._p5.random() - 0.5)*nudgeMult + nudgeMult*shift)
    }

    const minX = Math.min(Math.min(tilePoints[0].x, tilePoints[1].x), Math.min(tilePoints[2].x, tilePoints[3].x)) * this._s
    const maxX = Math.max(Math.max(tilePoints[0].x, tilePoints[1].x), Math.max(tilePoints[2].x, tilePoints[3].x)) * this._s
    const maxY = Math.max(Math.max(tilePoints[0].y, tilePoints[1].y), Math.max(tilePoints[2].y, tilePoints[3].y)) * this._s

    if (!isBorder) {
      var color = this._p5.color(this.randomTileColor());
      color.setAlpha(64)
      this._p5.fill(color)
      this._p5.rect(
        minX,
        maxY,
        maxX - minX,
        this._p5.height,
      )
    }

    if (this._p5.random() > 0.5) {
      var x = (tilePoints[0].x + tilePoints[1].x + tilePoints[2].x + tilePoints[3].x) * this._s / 4
      var y = (tilePoints[0].y + tilePoints[1].y + tilePoints[2].y + tilePoints[3].y) * this._s / 4 - stepSize * this._p5.random(1, 10)

      var fireCount = 26;

      for (var i = fireCount; i > fireCount/2; i--) {
        this.drawSplotch(
          this.randomColor(),
          x + this.WIND*stepSize*(fireCount - i),
          y * i / fireCount,
          this._p5.width / 128,
          10,
          6
        );
      }

      var smokeCount = 14;
      for (var i = smokeCount; i > 0; i--) {
        this.drawSplotch(
          this.BLACK,
          x + this.WIND*stepSize*(smokeCount - i),
          y * i / smokeCount,
          this._p5.width / 128,
          24,// + this._p5.floor(i/4),
          2,
          8
        );
      }
    }
  }

  randomColor() {
    return this.COLORS[this._p5.floor(this._p5.random() * this.COLORS.length)];
  }

  drawSplotch(_color, _centerX, _centerY, _baseRadius, _radiusMult, _sCount, _alpha) {

    this._p5.push();

    var increment = this._p5.height / 512;

    var centerX = _centerX ?? this._p5.width / 16 + this._p5.width / 16 * 14 * this._p5.random();
    var centerY = _centerY ?? this._p5.height / 16 + this._p5.width / 16 * 14 * this._p5.random();

    var points = [];

    var baseRadius = _baseRadius ?? increment * (1 + this._p5.random() * 2) / 2;
    var startAngle = this._p5.random() * 180;
    var currentAngle = startAngle;

    while (currentAngle - startAngle < 350) {
      var radius = baseRadius + increment * 2 * this._p5.random() * (_radiusMult ?? 1);
      let radians = this._p5.radians(currentAngle);
      let x = Math.round(radius * Math.cos(radians) + centerX);
      let y = Math.round(radius * Math.sin(radians) + centerY);
      currentAngle += 30 + this._p5.random() * 30; //(currentAngle - startAngle)/2
      points.push([x, y]);
    }

    points = points;

    this._p5.blendMode(this._p5.OVERLAY);

    var sCount = _sCount ?? 64 + this._p5.floor(this._p5.random() * 4) * 6;

    for (var j = 0; j < sCount; j++) {
      var c = this._p5.color(_color ?? this.randomColor(p5));
      c.setAlpha(_alpha ?? 8);
      this._p5.fill(c);
      this._p5.strokeWeight(0)
      for (var k = 0; k < points.length; k++) {
        points[k][0] = points[k][0] + (0.5 - this._p5.random()) * increment / (this.SHAKE_LEVEL / 2) * (_radiusMult ?? 1);
        points[k][1] = points[k][1] + (0.5 - this._p5.random()) * increment / (this.SHAKE_LEVEL / 2) * (_radiusMult ?? 1);
      }
      this._p5.beginShape();
      this._p5.curveVertex(points[points.length - 1][0], points[points.length - 1][1]);
      for (var i = 0; i < points.length; i++) {
        this._p5.curveVertex(points[i][0], points[i][1]);
      }
      this._p5.curveVertex(points[0][0], points[0][1]);
      this._p5.endShape(this._p5.CLOSE);
    }

    this._p5.pop();

  }

  afterDraw() {
    this._p5.loadPixels();
    var density = this._p5.pixelDensity()
    for (let x = 0; x < this._p5.width * density; x++) {
      for (let y = 0; y < this._p5.height * density; y++) {

        const index = (x + y * this._p5.width * density) * 4;
        var n = this._p5.random() * 22;

        if (this._p5.pixels[index] + this._p5.pixels[index + 1] + this._p5.pixels[index + 2] < (255 * 3) * 0.3) {
          n = -n;
        }

        this._p5.pixels[index] = Math.min(255, Math.max(0, this._p5.pixels[index] + n));
        this._p5.pixels[index + 1] = Math.min(255, Math.max(0, this._p5.pixels[index + 1] + n));
        this._p5.pixels[index + 2] = Math.min(255, Math.max(0, this._p5.pixels[index + 2] + n));
      }
    }
    this._p5.updatePixels();

    this._p5.push();
    this._p5.blendMode(this._p5.SOFT_LIGHT);
    var matteColor = this.BLACK;
    var fullFrame = Math.ceil(Math.min(this._p5.width, this._p5.height) / 16);
    this._p5.stroke(matteColor);
    this._p5.noFill();
    this._p5.strokeWeight(fullFrame);
    this._p5.rect(0, 0, this._p5.width, this._p5.height);
    this._p5.pop();
  }

  static author() {
    return 'jeres'
  }

  static name() {
    return 'burning bridges'
  }
}
