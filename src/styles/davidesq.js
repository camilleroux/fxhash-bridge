// David Esq.
// Status: Ready // "WIP", "Ready"
// Twitter: @emcyze
// Fxhash: https://www.fxhash.xyz/u/David%20Esq
// Wallet: tz1PQNPx5AtjN6ff3GW52MPdS1qumLXzhHN4

import Style from './style'

export default class s extends Style {

  constructor(gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5);
    this.palettes = [
      ["#0ec2c8", "#0c7787", "#0e5b5f", "#020403"],
      ["#00ff00", "#077807", "#099903", "#002412"],
      ["#fcf500", "#c9b36d", "#fffaa8", "#101b1e"],
      ["#e6a500", "#cc6e00", "#b34000", "#2b001a"],
      ["#d4cece", "#cccccc", "#dedede", "#080814"],
      ["#080814", "#102030", "#445454", "#d4cece"],
      ["#d08c60", "#b58463", "#997b66", "#040404"],
      ["#d55d92", "#dd339c", "#ac46a1", "#12000b"],
      ["#822faf", "#973aa8", "#6411ad", "#17000e"]
    ];
    this.my_palette = this.palettes[getRandomInt(0, this.palettes.length)];
    this.bgColor = this.my_palette[this.my_palette.length - 1];
  }

  beforeDraw() {

    this._p5.background(this.bgColor)

    const [x, y] = this._projectionCalculator3d.getProjectedPoint([0, this._gridSizeY, 0]);
    const horizonX = this._p5.width / 2;
    const horizonY = y  * this._s - 3;

    this._p5.drawingContext.fillStyle = this.bgColor;
    this._p5.ellipseMode(this._p5.CENTER);
    this._p5.angleMode(this._p5.DEGREES);
// add the blury effect
    this._p5.drawingContext.shadowBlur = 50;
    this._p5.drawingContext.shadowColor = this.my_palette[0];


    // DRAW BACKGROUND

    // Draw rays of light, slighlty off
    this._p5.strokeWeight(0.5)
    this._p5.stroke(this.my_palette[0])
    for (let angle = -180; angle <= 1800; angle += 12) {
      let x = 3 * horizonX * this._p5.cos(angle)
      let y = 3 * horizonX * this._p5.sin(angle)
      this._p5.line(horizonX, horizonY, x, y)
    }

    // Draw a sun in the background
    this._p5.strokeWeight(1)
    this._p5.drawingContext.shadowBlur = 0;
    let sunCol1 = this._p5.color(this.my_palette[0]);
    const sunCol2 = this._p5.color(this.bgColor);
    this._p5.fill(this.bgColor)
    for (let i = this._p5.width / 1.3; i > 0; i -= 40) {
      sunCol1 = this._p5.lerpColor(sunCol1, sunCol2, 0.25);
      this._p5.stroke(sunCol1);
      this._p5.ellipse(this._p5.width / 2, horizonY, i);
    }
    this._p5.noStroke();

    // Draw stars
    this._p5.drawingContext.shadowBlur = 0;
    this._p5.fill(this.my_palette[2]);
    for (let i = 0; i < 60; i++) {
      this._p5.circle(this._p5.width * fxrand(),
        horizonY * fxrand(),
        2.5 * fxrand());
    }

    // Draw rectangle to hide half of the sun
    this._p5.drawingContext.shadowBlur = 40;
    this._p5.fill(this.bgColor);
    this._p5.drawingContext.shadowColor = this.my_palette[2];
    this._p5.rect(0, horizonY, this._p5.width, this._p5.height);

    // draw depth, add space elements below the Bridge
    this._p5.drawingContext.shadowBlur = 0;
    this._p5.fill(this.my_palette[1]);
    for (let i = 0; i < 60; i++) {
      this._p5.circle(this._p5.width * fxrand(),
        this._p5.height * fxrand() + horizonY,
        2 * fxrand());
    }

    // Draw horizon shiny line
    this._p5.drawingContext.shadowBlur = 10
    this._p5.stroke(sunCol2)
    this._p5.strokeWeight(5)
    this._p5.line(0, horizonY, this._p5.width, horizonY)

    this._p5.stroke(this.my_palette[0])
    this._p5.strokeWeight(1)
    this._p5.line(0, horizonY, this._p5.width, horizonY)

    this._p5.stroke("white")
    this._p5.drawingContext.shadowBlur = 30;
    this._p5.drawingContext.shadowColor = "white";
    this._p5.strokeWeight(0.5)
    this._p5.line(this._p5.width / 3, horizonY, 2 * this._p5.width / 3, horizonY)

    // reset the glow effect
    this._p5.drawingContext.shadowBlur = 35;
    this._p5.drawingContext.shadowColor = this.my_palette[0];
  }

  drawTile(tilePoints, frontLeftCorner3DCoord) {

    this._p5.drawingContext.shadowBlur = 40;
    this._p5.drawingContext.shadowColor = this.my_palette[0];

    let chance = fxrand();
    if (chance > 0.9)
      this._p5.fill(this.my_palette[0]);
    //twinkle side
    else
      this._p5.noFill();

    this._p5.stroke(this.my_palette[1])

    // draw top
    //  this._p5.fill(this.my_palette[0])
    this._p5.quad(tilePoints[0].x * this._s, tilePoints[0].y * this._s,
      tilePoints[1].x * this._s, tilePoints[1].y * this._s,
      tilePoints[2].x * this._s, tilePoints[2].y * this._s,
      tilePoints[3].x * this._s, tilePoints[3].y * this._s)

    // draw left
    //  this._p5.fill(this.my_palette[1])
    let tileHeight = Math.abs(tilePoints[1].y - tilePoints[0].y) * this._s
    if (tilePoints[1].x * this._s <= this._p5.width / 2)
      this._p5.quad(tilePoints[1].x * this._s, tilePoints[1].y * this._s,
        tilePoints[1].x * this._s, tilePoints[1].y * this._s + tileHeight,
        tilePoints[0].x * this._s, tilePoints[0].y * this._s
      );

    // draw right
    //this._p5.fill(this.my_palette[2])
    tileHeight = Math.abs(tilePoints[2].y - tilePoints[3].y) * this._s
    if (tilePoints[2].x * this._s >= this._p5.width / 2)
      this._p5.quad(tilePoints[2].x * this._s, tilePoints[2].y * this._s,
        tilePoints[2].x * this._s, tilePoints[2].y * this._s + tileHeight,
        tilePoints[3].x * this._s, tilePoints[3].y * this._s);



    // add lines to vanishing point
    let pdfX = this._p5.width / 2;
    let pdfY = -this._p5.height;

    // Is the tile touched by the grace?
    if (chance > 0.95) {
      this._p5.fill(this.my_palette[0]);
      this._p5.strokeWeight(.8);
    }
    else {
      this._p5.stroke(this.my_palette[2]);
      this._p5.strokeWeight(0.1);
    }
    this._p5.line(
      (tilePoints[0].x + tilePoints[2].x) * this._s / 2,
      (tilePoints[1].y + tilePoints[0].y) * this._s / 2,
      pdfX, pdfY);

    this._p5.noFill();
    this._p5.strokeWeight(1);
  }

  afterDraw() {}

  static author() {
    return 'David Esq'
  }

  static name() {
    return 'TGH Bridge'
  }

}


//******************************************************************************
//** UTILS
//******************************************************************************

//** Get a random val between min and max based on fxrand() function
function getFxRandom(min, max) {
  return min + fxrand() * (max - min);
}

//** Get a random val between min and max based on fxrand() function
function getFxRandomSquare(min, max) {
  return min + fxrand() ** 2 * (max - min);
}
//** Get a fxrandom INT between min and max (exclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
