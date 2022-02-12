// Cole Gillespie aka shuhblam
// Status: WIP
// Wallet: tz1b37erGvRoFPXBuz1DKyZwdKsxMbyt8eq1
import Style from './style'

export default class ShuhblamStyle extends Style {
  addGrain(amount) {
    this._p5.loadPixels()
    for (let i = 0; i < (this._s * this._p5.pixelDensity()) * (this._s * this._p5.pixelDensity()) * 4; i += 4) {
      let noise = this._p5.map(this._p5.random(), 0, 1, -amount, amount)
      this._p5.pixels[i] = this._p5.pixels[i] + noise
      this._p5.pixels[i + 1] = this._p5.pixels[i + 1] + noise
      this._p5.pixels[i + 2] = this._p5.pixels[i + 2] + noise
      this._p5.pixels[i + 3] = this._p5.pixels[i + 3] + noise
    }
    this._p5.updatePixels()
  }

  beforeDraw() {
    console.log(this._s);
    this.center = this._s / 2;
    this.halfCenter = this.center / 2;
    this._p5.background('#040585');
    this._p5.background('#F1F1F1');
    this.p4 = this._p5.random(1, 5);
    this.p4m = this._p5.random(2, 8);
    this.p4s = this._p5.random(5, 10);
    this.sw = this._p5.random(1);

    this.lines = this._p5.random(10, 20)

    this._p5.strokeWeight(this._p5.random(.5, .7));
    this.y = this._s;
  }

  drawTile(tilePoints, frontLeftCorner3DCoord, isBorder) {


    var p1 = this._p5.int(this._p5.random(1, 3));
    var p2 = this._p5.int(this._p5.random(1, 3));
    var p3 = this._p5.int(this._p5.random(1, 3));
    var p4 = this._p5.int(this._p5.random(1, 3));


    if (isBorder) {
      this._p5.stroke('#000000');
      this.p4 = this.p4s;
    } else {
      this.p4 = this.p4m
      this._p5.stroke(this._p5.random(['#046586', '#FF6890']));

    }
    for (var i = 0; i < this.lines; i = i + this.p4) {
      if (!isBorder) {
        if ((tilePoints[0].y * this._s) + i < this.y) {
          this.y = (tilePoints[0].y * this._s)
        }
        if ((tilePoints[1].y * this._s) + i < this.y) {
          this.y = (tilePoints[1].y * this._s)
        }
        if ((tilePoints[2].y * this._s) + i < this.y) {
          this.y = (tilePoints[2].y * this._s)
        }
        if ((tilePoints[3].y * this._s) + i < this.y) {
          this.y = (tilePoints[3].y * this._s)
        }

      }

      this._p5.line(
        (tilePoints[0].x * this._s) + i,
        (tilePoints[0].y * this._s) + i,
        (tilePoints[p1].x * this._s) + i,
        (tilePoints[p1].y * this._s) + i
      )

      this._p5.line(
        (tilePoints[p1].x * this._s) + i,
        (tilePoints[p1].y * this._s) + i,
        (tilePoints[p2].x * this._s) + i,
        (tilePoints[p2].y * this._s) + i
      )

      this._p5.line(
        (tilePoints[p2].x * this._s) + i,
        (tilePoints[p2].y * this._s) + i,
        (tilePoints[p3].x * this._s) + i,
        (tilePoints[p3].y * this._s) + i
      )

      this._p5.line(
        (tilePoints[p3].x * this._s) + i,
        (tilePoints[p3].y * this._s) + i,
        (tilePoints[p4].x * this._s) + i,
        (tilePoints[p4].y * this._s) + i
      )

      this._p5.line(
        (tilePoints[p4].x * this._s) + i,
        (tilePoints[p4].y * this._s) + i,
        (tilePoints[0].x * this._s) + i,
        (tilePoints[0].y * this._s) + i
      )
    }

  }

  afterDraw() {
    console.log(this.y)
    this._p5.line(0, this.y, this._s, this.y)
    this._p5.noFill();
    var s = this._p5.random(15, 20);
    for (var i = 0; i < this.y * 1.5; i = i + s) {
      this._p5.push()
      this._p5.translate(this._s / 2, this.y)
      var r = i;
      this._p5.arc(0, 0, i, i, this._p5.PI, this._p5.TWO_PI);
      this._p5.pop()
    }
    this.addGrain(this._p5.random(10, 15))
  }

  static author() {
    return 'shuhblam'
  }

  static name() {
    return 'here comes the sun'
  }
}