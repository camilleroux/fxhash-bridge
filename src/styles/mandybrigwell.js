// Mandy Brigwell
// Status: Ready // "WIP", "Ready"
// Twitter: @mandybrigwell
// Fxhash: https://www.fxhash.xyz/u/mandybrigwell
// Wallet: tz1VjCS2jiBTVPSEoYzJ79KkbYV5QbFJxuf3

// Bifrost is the rainbow bridge from Norse mythology that stretches between Midgard and Asgard.
// It's the path from the realm of men to the realm of the Gods.

import Style from './style'
import { createCols } from '../utils'

const palettes = ['https://coolors.co/fdfffc-2ec4b6-ff9f1c-e71d36-011627', 'https://coolors.co/011627-ff9f1c-2ec4b6-e71d36-fdfffc']

export default class DemoStyle extends Style {
	constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
		super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
		const palette = this._p5.random([0, 0, 0, 1])
		this.colors = createCols(palettes[palette])
		this.backgroundColor = this.colors.pop()
		this.defaultColor = this.colors[0]
	}

	beforeDraw () {
		// I like HSB, 360 and I'll get confused if I don't stick with it.
		this._p5.colorMode(this._p5.HSB, 360);
		// Select a random hue for the background, making it light
		this.backgroundColor = this._p5.random(360, 180);
		this._p5.background(this.backgroundColor, 30, 360);
		this._p5.noStroke();
		// Add some distant darkness; lighter below the horizon
		for (var i=0; i<1; i+=0.2) {
		this._p5.fill(0, 8);
			this._p5.arc(this._s*0.5, this._s*0.5, 0.9*i*this._s, 0.9*i*this._s, this._p5.PI, 0);
		this._p5.fill(60, 5);
			this._p5.arc(this._s*0.5, this._s*0.5, 0.9*i*this._s, 0.9*i*this._s, 0, this._p5.PI);
		}
		// Choose circle-overlay sizes based on the screen resolution
		this.circleMin = this._s/8;
		this.circleMax = this._s/32;
		// Iterate across the canvas, using the screen resolution as step size
		// Map strokeweight to distance, and then dot some random ellipses, weighted towards the top
		for (var i=0; i<this._s; i+=this._s/640) {
			this._p5.strokeWeight(this._p5.map(i, 0, this._s, 0, 1));
			this._p5.noFill();
			for (var j=0; j<32; j++) {
				this.randomLocation = this._p5.random()*this._p5.random()*i;
				this._p5.stroke(this.backgroundColor, 90, 300, this._p5.map(this.randomLocation, 0, this._s, 30, 0));
				this.circleSize = this._p5.map(this.randomLocation, 0, this._s, this.circleMax, this.circleMin);
				this._p5.ellipse(this._p5.random(this._s), this.randomLocation-this.circleMax, this.circleSize, this.circleSize);
			}
		}
	}

	drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
		this._p5.colorMode(this._p5.HSB, 360);
		this._p5.noStroke();
		
		// We're going to jiggle the tiles a little with a slight random value
		this.randomMinimum = 1-fxrand()*0.025;
		this.randomMaximum = 1+fxrand()*0.025;
	
		// And occasionally a larger random value
		if (this._p5.noise(tilePoints[0].x, tilePoints[0].y) < 0.25) {
			this.randomMinumum = -1.1;
			this.randomMaximum = 1.1;
		}
	
		// Use the distance to alter the hue and draw the tile: Bifrost is a rainbow bridge, after all
		this.distance = this._p5.dist((tilePoints[0].x+tilePoints[1].x)*this._s*0.025, (tilePoints[0].y+tilePoints[2].y)*this._s, this._s/2, this._s/2)/this._s;
		this._p5.fill(this._p5.map(this.distance, 0.75, 1.25, 0, 360), 360, 300, this._p5.map(this.distance, 0.75, 1.25, 90, 210));
		this._p5.quad(
		tilePoints[0].x * this._s * this._p5.random(this.randomMinimum, this.randomMaximum), tilePoints[0].y * this._s * this._p5.random(this.randomMinimum, this.randomMaximum),
		tilePoints[1].x * this._s * this._p5.random(this.randomMinimum, this.randomMaximum), tilePoints[1].y * this._s * this._p5.random(this.randomMinimum, this.randomMaximum),
		tilePoints[2].x * this._s * this._p5.random(this.randomMinimum, this.randomMaximum), tilePoints[2].y * this._s * this._p5.random(this.randomMinimum, this.randomMaximum),
		tilePoints[3].x * this._s * this._p5.random(this.randomMinimum, this.randomMaximum), tilePoints[3].y * this._s * this._p5.random(this.randomMinimum, this.randomMaximum)
		);
	
		// Now, radiative ray type things.
		// Set the fill to a transparent white, and make rays from slightly outside the top corners to the vertical edges of each quad
		this._p5.fill(360, this._p5.map(this.distance, 1, 2, 10, 60));
		this._p5.stroke(360, 2);
		this._p5.quad(
		-this._s*0.05, 0,
		0, -this._s*0.05,
		tilePoints[2].x * this._s, tilePoints[2].y * this._s,
		tilePoints[3].x * this._s, tilePoints[3].y * this._s);
		this._p5.quad(
		this._s*1.05, 0,
		this._s, -this._s*0.05,
		tilePoints[1].x * this._s, tilePoints[1].y * this._s,
		tilePoints[0].x * this._s, tilePoints[0].y * this._s);
	}

	afterDraw () {
		// Add a little more texture over the top, in a similar way to beforeDraw()
		// Use rectangles this time, for an effect vaguely like linen paper
		this._p5.colorMode(this._p5.HSB, 360);
		this.circleMin = this._s/4;
		this.circleMax = this._s/8;
		for (var i=0; i<this._s; i+=this._s/640) {
			this._p5.strokeWeight(this._p5.map(i, 0, this._s, 0, 1));
			this._p5.noFill();
			for (var j=0; j<8; j++) {
				this.randomLocation = (this._p5.random()*i);
				this._p5.stroke(0, 0, 360, this._p5.map(i, this._s/2, this._s, 0, 30));
				this.circleSize = this._p5.map(this.randomLocation, 0, this._s, this.circleMax, this.circleMin);
				this._p5.rect(this._p5.random(this._s), this._s-this.randomLocation, this.circleSize, this.circleSize);
			}
		}
		
		// Add a white border, with inlaid thin-black
		this._p5.stroke(360)
		this._p5.strokeWeight(this._s*0.025)
		this._p5.noFill()
		this._p5.rect(0, 0, this._s, this._s)
		this._p5.strokeWeight(this._s*0.00125);
		this._p5.stroke(0);
		this._p5.rect(this._s*0.0125, this._s*0.0125, this._s*0.975, this._s*0.975)
	}

	static author () { return 'mandyBrigwell' }

	static name () { return 'Bifrost' }
}
