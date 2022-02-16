// Mandy Brigwell
// Status: WIP // "WIP", "Ready"
// Twitter: @mandybrigwell
// Fxhash: https://www.fxhash.xyz/u/mandybrigwell
// Wallet: tz1VjCS2jiBTVPSEoYzJ79KkbYV5QbFJxuf3

import Style from './style'

export default class MandyBrigwellStyle extends Style {

	beforeDraw () {
	this._p5.colorMode(this._p5.HSB, 360);
	this.backgroundColor = this._p5.random(360);
	this._p5.background(this.backgroundColor, 30, 360);
	for (var i=-32; i<this._s; i++) {
		this._p5.stroke(0, 10);
		this._p5.strokeWeight(this._p5.map(i, -32, this._s, 2, 0));
		this._p5.noFill();
		for (var j=0; j<8; j++) {
			this._p5.ellipse(this._p5.random(this._s), this._p5.random(i), 32, 32);
		}
	}
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
	this._p5.colorMode(this._p5.HSB, 360);
	this._p5.stroke(240, 360, 360);
	this._p5.fill(240, 360, 360);
	this._p5.quad(tilePoints[0].x * this._s, tilePoints[0].y * this._s, tilePoints[1].x * this._s, tilePoints[1].y * this._s, tilePoints[2].x * this._s, tilePoints[2].y * this._s, tilePoints[3].x * this._s, tilePoints[3].y * this._s)
	
  }

  afterDraw () {}

  static author () { return 'mandybrigwell' }

  static name () { return 'mandybrigwell' }
}
