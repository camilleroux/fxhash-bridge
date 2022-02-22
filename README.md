BRIDGE collaborative project for fxhash
================

BRIDGE is an experimental project for fxhash. Any artist can contribute. 
The main rule: draw the tiles at the given coordinates. While they are quite visible, you can add everything you want: birds, stars, grass, reflexions, circles... You don't have to draw a real bridge, take the theme as a metaphor.
For each minted edition, there'll be a default style, but you will be able to try all the other styles by clicking/touching the image.

## ✨ The story

I'm Camille Roux ([@camillerouxart](https://twitter.com/camillerouxart)). I planned to do a lot of collab this year with fxhash artists I like, but it takes too much time (or maybe I like too much artists 🤣). Some days ago, I woke up with this idea in mind: "Hey! What if I make a collaboration with all the artists I like at once!".
This is how the BRIDGE project was born.

Moreover, I love the mutual aid and solidarity between fxhash generative artists. The BRIDGE can be seen as a symbol of the link between us ♥️

## 📋 The rules

If you contribute to the project, you must accept the following rules:

* I can mint this project on my [fxhash profile](https://www.fxhash.xyz/u/Camille%20Roux) with any subset of styles. (If you've an idea about what I could do with the unselected styles, let me know!)
* I'll select the styles I'll mint
* I'll share manually and equitably the primary market revenue of the/each mint with the creators of the styles included in that mint (the 2sd market revenue is for me) when the project we'll be sold out.
* You can't mint/drop it yourself
* For now, I expect there to be about 20-30 editions of each style in the drop. 
* Dead line: **[February 20th 23:59 CET](https://everytimezone.com/?t=62118480,563)**.
* I will announce the selected projects on February 21 on my [Twitter account](https://twitter.com/camillerouxart) and I will create a branch (tag? release?) for the project I'll mint.
* I'll mint the projet on my [fxhash profile](https://www.fxhash.xyz/u/Camille%20Roux), the **[February 22th 18:00 CET](https://everytimezone.com/?t=62118480,f3c)**. For pricing, I'll do a Dutch auction.

## 🧑‍💻 How to contribute

- fork then clone the project
- run `npm i`
- duplicate the `./styles/boilerplate.js`, change the name and info
- in `index.js` add your style Class to `stylesClasses` and set `defaultStyleClassId` to only see your style
- run `npm start` to launch the project
- create a pull request when you're ready (don't need to be ready to mint, you can commit as soon as you've something to show)

## 🤩 How to be selected

In order to have your style selected, it must:

* be dimension-less (same output whatever the canvas dimensions)
* be determist (same output if you refresh with the same hash)
* draw the tiles at the correct place (tiles must be not move if you change style)
* write your tez wallet adress in the comment in your code so that I can give you a share of the primary market revenue
* have fun, make something awesome, collab with other artists (yes, why not a collab in a collab!)... ♥️

## 🚀 How to help this project

- Talk about this project, share this page...
- Create a style if you know how to code
- Introduce the project to the artists you would like to see participate
- Fix bugs, answer questions, add documentation, give feedbacks...

## 💻 Technical info

- The 3D coordinates of point of the bridge is represented by a p5.Vector with the following dimensions:
  - x: from -gridSizeX / 2 (left) to gridSizeX / 2 (right)
  - y: from 0 (front) to gridSizeY (back)
  - z: from 0 (down) to 1 (up)
- The 2D coordinates of the tiles are an array of p5.Vector. The coord go from (0,0) (top left) to (1,1) (bottom right). So you'll have to multiply them by `s` at drawing (this is done to be dimension-less)

## 🖼 26 Styles included the fxhash mint

| Style | Twitter | fxhash | 💰 |
| :---: | :---: | :---: |  :---: |
| ada_ada_ada.js | @ada_ada_ada_art | https://www.fxhash.xyz/u/Ada%20Ada%20Ada |  |
| anaglyphic.js | @anaglyph_ic | https://www.fxhash.xyz/u/anaglyphic |  |
| aqwunderscorezert.js | @Aqw_Zert | https://www.fxhash.xyz/u/Aqw_Zert |  |
| bridgetunnel.js | @CablesAndPixels | https://www.fxhash.xyz/u/Laurent%20Houdard |  |
| camilleroux.js | @camillerouxart | https://www.fxhash.xyz/u/Camille%20Roux |  |
| camilleroux2.js | @camillerouxart | https://www.fxhash.xyz/u/Camille%20Roux |  |
| davidesq.js | @emcyze | https://www.fxhash.xyz/u/David%20Esq |  |
| devnull.js | @lostpunks | https://www.fxhash.xyz/u/devnull |  |
| elsif.js | @ElsifThen | https://www.fxhash.xyz/u/elsif |  |
| estienne.js | @Estienne_ca | https://www.fxhash.xyz/u/Estienne |  |
| frederative.js | @frederative | https://www.fxhash.xyz/u/frederative |  |
| generativepen.js | @GenerativePen | https://www.fxhash.xyz/u/Generative%20Pen |  |
| gorik.js | @gorikfr | https://www.fxhash.xyz/u/Gorik |  |
| grosgg.js | grosgg | https://www.fxhash.xyz/u/grosgg |  |
| jeres.js | @heyjeres | https://www.fxhash.xyz/u/jeres |  |
| julabat.js | @julabat | https://www.fxhash.xyz/u/julabat |  |
| lunarean.js | @lunarean | https://www.fxhash.xyz/u/lunarean |  |
| makio64.js | @makio64 | https://www.fxhash.xyz/u/Makio64 |  |
| mandybrigwell.js | @mandybrigwell | https://www.fxhash.xyz/u/mandybrigwell |  |
| matt_circles.js | @matt_circles | https://www.fxhash.xyz/u/Matt%20Circles |  |
| nickdima.js | @nickdima | https://www.fxhash.xyz/u/Nick%20Dima |  |
| phil_osophie.js | @phil_osophie | https://www.fxhash.xyz/u/phil_osophie |  |
| robinmetcalfe.js | @solarise_webdev | https://www.fxhash.xyz/u/Robin |  |
| rvig.js | @rvig_art | https://www.fxhash.xyz/u/rvig |  |
| shuhblam.js | @shuhblam | https://www.fxhash.xyz/u/shuhblam |  |
| wilke.js | @ClausWilke | https://www.fxhash.xyz/u/clauswilke |  |
**The code minted on fxhash is from the [fxhash](https://github.com/camilleroux/fxhash-bridge/tree/fxhash) branch**

## 💰 Money

- Primary market is: 4050.00 tez
- Fees are: 2.5%
- So "net revenue" is: 3948.75 tez
- They are 26 styles in the minted project so each included contributor will receive: 151.875 tez.
I'm exhausted right now, I'll will send tez, tomorrow, the feb 23 and report each paiement. Please let me know if I did a mistake :)
