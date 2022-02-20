// frederative
// Status: Ready
// Wallet: frederative.tez

// Linear gradient c/o p5js.org:
// https://p5js.org/examples/color-linear-gradient.html

// Polygon drawing c/o p5js.org:
// https://p5js.org/examples/form-regular-polygon.html

// Floyd-Steinberg dithering based on sketch:
// https://openprocessing.org/sketch/1192123

import Style from './style'

export default class FrederativeStyle extends Style {
  constructor(gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.backgroundColor = 0;//this.colors.pop()
    this.defaultColor = 255;//this.colors[0]
  }

  beforeDraw() {
    // grab user's current density before changing
    this.currDensity = this._p5.pixelDensity();
    this._p5.pixelDensity(1);
    this.theta = 0.0;

    this.sizeVar = this._s / 1000; // thanks Robin!

    // sky palette: https://www.schemecolor.com/night-sky-color-palette.php
    this.darkColors = [
      this._p5.color("#070b34"),
      this._p5.color("#141852"),
      this._p5.color("#2b2f77"),
    ];
    this.lightColors = [
      this._p5.color("#483475"),
      this._p5.color("#6b4984"),
      this._p5.color("#855988"),
    ];

    // palettes: chromotome 
    this.miradors = [
      this._p5.color("#020202"),
      this._p5.color("#ff6936"),
      this._p5.color("#fddc3f"),
      this._p5.color("#0075ca"),
      this._p5.color("#03bb70"),
    ];
    this.butterfly = [
      this._p5.color("#191e36"),
      this._p5.color("#f40104"),
      this._p5.color("#f6c0b3"),
      this._p5.color("#99673a"),
      this._p5.color("#f0f1f4"),
    ];

    this.cc239 = [
      this._p5.color("#e0eff0"),
      this._p5.color("#e3dd34"),
      this._p5.color("#78496b"),
      this._p5.color("#f0527f"),
      this._p5.color("#a7e0e2"),
    ];
    this.matrix_palette = [
      this._p5.color("#020204"),
      this._p5.color("#204829"),
      this._p5.color("#22b455"),
      this._p5.color("#80ce87"),
      this._p5.color("#92e5a1"),
    ];
    this.jung_hippo = [
      this._p5.color("#ffffff"),
      this._p5.color("#fe7bac"),
      this._p5.color("#ff921e"),
      this._p5.color("#3da8f5"),
      this._p5.color("#7ac943"),
    ];

    this.dt02 = [
      this._p5.color("#eee3d3"),
      this._p5.color("#302956"),
      this._p5.color("#f3c51a"),
    ]
    this.monochrome_palette = [
      this._p5.color(this._p5.random(0, 255)),
      this._p5.color(this._p5.random(0, 255)),
      this._p5.color(this._p5.random(0, 255)),
      this._p5.color(this._p5.random(0, 255)),
      this._p5.color(this._p5.random(0, 255)),
      this._p5.color(this._p5.random(0, 255)),
      this._p5.color(this._p5.random(0, 255)),
      this._p5.color(this._p5.random(0, 255)),
      this._p5.color(this._p5.random(0, 255)),
      this._p5.color(this._p5.random(0, 255)),
    ];
    this.colors = this._p5.random([
      this.miradors,
      this.powerpuff,
      this.butterfly,
      this.cc239,
      this.matrix_palette,
      this.jung_hippo,
      this.dt02,
      this.monochrome_palette,
    ]);

    // background
    this.setGradient(0, 0, this._p5.width, this._p5.height, this._p5.random(this.darkColors), this._p5.random(this.lightColors));

    // stars
    this._p5.noStroke();
    let _starColors = [
      this._p5.color("#fffbbd"),
      this._p5.color("#cff5ff"),
      this._p5.color("#b8ffff"),
      this._p5.color("#fff980"),
    ];
    let w2 = this._p5.width / 200.0
    let w5 = this._p5.width / 500.0
    for (let i = 0; i < this._p5.random(5000); i++) {
      let _star_rad = this._p5.random(2.0, 5.0) * this.sizeVar;
      let _x = this._p5.random(_star_rad, this._p5.width - _star_rad);

      let _mid_offset = this._p5.height * 0.1;

      let _y = this._p5.random(_star_rad, this._p5.height / 2.0 + this._p5.random(-_mid_offset, _mid_offset));
      let star_col = this._p5.color(this._p5.random(_starColors));
      star_col._array[3] = this._p5.random(0.1, 0.5);
      this._p5.fill(star_col);
      this._p5.ellipse(_x, _y, _star_rad + this._p5.random(-w5, w5), _star_rad + this._p5.random(-w5, w5));
    }

    // poly-moon
    let _moon_d = this._p5.width * this._p5.random(0.3, 0.05);
    let _moon_c = this._p5.color(this._p5.random(_starColors));
    _moon_c._array[3] = this._p5.random(0.1, 0.5);
    let _x = this._p5.random(_moon_d, this._p5.width - _moon_d);
    let _y = this._p5.random(_moon_d, this._p5.height / 4 - _moon_d);
    this._p5.fill(_moon_c);
    this.polygon(_x, _y, _moon_d, this._p5.random(8, 20));
  }

  drawTile(tilePoints, frontLeftCorner3DCoord) {
    let c = this._p5.color(this._p5.random(this.colors));
    c._array[3] = this._p5.map(tilePoints[0].y, this._p5.height, 0, 0.1, 0.4);

    if (this._p5.random() > 0.9) {
      this._p5.fill(c);//'#FF00FF')
      this._p5.noStroke();
    } else {
      this._p5.noFill()
      this._p5.stroke(c);
    }

    this._p5.push();

    if (this._p5.random() > 0.90) {
      this._p5.rotate(this._p5.random(0, this._p5.TWO_PI));
    }

    let ys = [
      tilePoints[0].y * this._s,
      tilePoints[1].y * this._s,
      tilePoints[2].y * this._s,
      tilePoints[3].y * this._s,
    ];

    // multiply quads
    let tgt = this._p5.random(1,50) * this.sizeVar;
    for (let i = 0; i < tgt; i++) {
      this._p5.quad(tilePoints[0].x * this._s, ys[0] - i, tilePoints[1].x * this._s, ys[1] - i, tilePoints[2].x * this._s, ys[2] - i, tilePoints[3].x * this._s, ys[3] - i);
    }

    this._p5.pop();
  }

  afterDraw() { 
    this.dither(null); 

    // reset user's density after my dithering is done
    this._p5._pixelDensity = this.currDensity;
  }

  // FS dithering
  index(g, x, y) {
    if (g == null) return (x + y * this._p5.width) * 4;
    else return (x + y * g.width) * 4;
  }
  dither(g) {
    if (g == null) {
      this._p5.loadPixels();
      for (let y = 0; y < this._p5.height - 1; y++) {
        for (let x = 1; x < this._p5.width - 1; x++) {
          let oldr = this._p5.pixels[this.index(g, x, y)];
          let oldg = this._p5.pixels[this.index(g, x, y) + 1];
          let oldb = this._p5.pixels[this.index(g, x, y) + 2];

          let factor = 1.0;
          let newr = this._p5.round((factor * oldr) / 255) * (255 / factor);
          let newg = this._p5.round((factor * oldg) / 255) * (255 / factor);
          let newb = this._p5.round((factor * oldb) / 255) * (255 / factor);

          this._p5.pixels[this.index(g, x, y)] = newr;
          this._p5.pixels[this.index(g, x, y) + 1] = newg;
          this._p5.pixels[this.index(g, x, y) + 2] = newb;

          this._p5.pixels[this.index(g, x + 1, y)] += ((oldr - newr) * 7) / 16.0;
          this._p5.pixels[this.index(g, x + 1, y) + 1] += ((oldr - newr) * 7) / 16.0;
          this._p5.pixels[this.index(g, x + 1, y) + 2] += ((oldr - newr) * 7) / 16.0;

          this._p5.pixels[this.index(g, x - 1, y + 1)] += ((oldr - newr) * 3) / 16.0;
          this._p5.pixels[this.index(g, x - 1, y + 1) + 1] += ((oldr - newr) * 3) / 16.0;
          this._p5.pixels[this.index(g, x - 1, y + 1) + 2] += ((oldr - newr) * 3) / 16.0;

          this._p5.pixels[this.index(g, x, y + 1)] += ((oldr - newr) * 5) / 16.0;
          this._p5.pixels[this.index(g, x, y + 1) + 1] += ((oldr - newr) * 5) / 16.0;
          this._p5.pixels[this.index(g, x, y + 1) + 2] += ((oldr - newr) * 5) / 16.0;

          this._p5.pixels[this.index(g, x + 1, y + 1)] += ((oldr - newr) * 1) / 16.0;
          this._p5.pixels[this.index(g, x + 1, y + 1) + 1] += ((oldr - newr) * 1) / 16.0;
          this._p5.pixels[this.index(g, x + 1, y + 1) + 2] += ((oldr - newr) * 1) / 16.0;
        }
      }
      this._p5.updatePixels();
    } else {
      g.loadPixels();
      for (let y = 0; y < g.height - 1; y++) {
        for (let x = 1; x < g.width - 1; x++) {
          let oldr = g.pixels[this.index(g, x, y)];
          let oldg = g.pixels[this.index(g, x, y) + 1];
          let oldb = g.pixels[this.index(g, x, y) + 2];

          let factor = 1.0;
          let newr = round((factor * oldr) / 255) * (255 / factor);
          let newg = round((factor * oldg) / 255) * (255 / factor);
          let newb = round((factor * oldb) / 255) * (255 / factor);

          g.pixels[this.index(g, x, y)] = newr;
          g.pixels[this.index(g, x, y) + 1] = newg;
          g.pixels[this.index(g, x, y) + 2] = newb;

          g.pixels[this.index(g, x + 1, y)] += ((oldr - newr) * 7) / 16.0;
          g.pixels[this.index(g, x + 1, y) + 1] += ((oldr - newr) * 7) / 16.0;
          g.pixels[this.index(g, x + 1, y) + 2] += ((oldr - newr) * 7) / 16.0;

          g.pixels[this.index(g, x - 1, y + 1)] += ((oldr - newr) * 3) / 16.0;
          g.pixels[this.index(g, x - 1, y + 1) + 1] += ((oldr - newr) * 3) / 16.0;
          g.pixels[this.index(g, x - 1, y + 1) + 2] += ((oldr - newr) * 3) / 16.0;

          g.pixels[this.index(g, x, y + 1)] += ((oldr - newr) * 5) / 16.0;
          g.pixels[this.index(g, x, y + 1) + 1] += ((oldr - newr) * 5) / 16.0;
          g.pixels[this.index(g, x, y + 1) + 2] += ((oldr - newr) * 5) / 16.0;

          g.pixels[this.index(g, x + 1, y + 1)] += ((oldr - newr) * 1) / 16.0;
          g.pixels[this.index(g, x + 1, y + 1) + 1] += ((oldr - newr) * 1) / 16.0;
          g.pixels[this.index(g, x + 1, y + 1) + 2] += ((oldr - newr) * 1) / 16.0;
        }
      }
      g.updatePixels();
    }
  }
  // linear gradient - p5js.org
  // removed horizontal gradient as it isn't necessary here
  setGradient(x, y, w, h, c1, c2) {
    this._p5.noFill();

    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = this._p5.map(i, y, y + h, 0, 1);
      let c = this._p5.lerpColor(c1, c2, inter);
      this._p5.stroke(c);
      this._p5.line(x, i, x + w, i);
    }
  }

  // https://p5js.org/examples/form-regular-polygon.html
  polygon(x, y, radius, npoints) {
    this._p5.push();

    // draw shadow
    this._p5.drawingContext.shadowOffsetX = 0;
    this._p5.drawingContext.shadowOffsetY = 0;
    this._p5.drawingContext.shadowBlur = 50;
    this._p5.drawingContext.shadowColor = this._p5.color(255);

    let angle = this._p5.TWO_PI / npoints;
    this._p5.beginShape();
    for (let a = 0; a < this._p5.TWO_PI; a += angle) {
      let sx = x + Math.cos(a) * radius;
      let sy = y + Math.sin(a) * radius;
      this._p5.vertex(sx, sy);
    }
    this._p5.endShape(this._p5.CLOSE);
    this._p5.pop();
  }

  static author() { return 'frederative' }

  static name() { return 'starry night//glitchy night' }
}
