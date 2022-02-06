BRIDGE collaborative project for fxhash
================

BRIDGE is an experimental project for fxhash. Any artist can contribute. 
The main rule: draw the tiles at the given coordinates. While they are quite visible, you can add everything you want: birds, stars, grass, reflexions, circles...
For each minted edition, there'll be a default style, but you will be able to try all the other styles by clicking/touching the image.

## The story

I'm Camille Roux ([@camillerouxart](https://twitter.com/camillerouxart)). I planned to do a lot of collab this year with fxhash artists I like, but it takes too much time (or maybe I like too much artists 🤣). Some days ago, I woke up with this idea in mind: "Hey! What if I make a collaboration with all the artists I like at once!".
This is how the project was born.

Moreover, I love the mutual aid and solidarity between fxhash generative artists. The BRIDGE can be seen as a symbol of the link between us ♥️

## The rules

If you contribute to the project, you must accept the following rules:

* I can mint this project on my [fxhash profile](https://www.fxhash.xyz/u/Camille%20Roux) with any subset of styles. (If you've an idea about what I could do with the unselected styles, let me know!)
* I'll select the styles I'll mint
* I'll share manually and equitably the primary market revenue of the/each mint with the creators of the styles included (the 2sd market revenue is for me)
* For now, I expect there to be about 30-50 editions of each style in the/each drop

## How to contribute

- clone the project
- run `npm i``
- duplicate the `./styles/boilerplate.js`, change the name and info
- in `index.js` add your style Class to `stylesClasses` and set `defaultStyleClassId` to only see your style
- run `npm start` to launch the project
- create a pull request when you're ready

## How to be selected

In order to have your style selected, it must:

* be dimension-less (same output whatever the canvas dimensions)
* be determist (same output if you refresh)
* draw the tiles at the correct place (tiles must be not move if you change style)
* write your tez wallet adress in the comment in your code
* have fun, make something awesome, collab with other artists (yes, why not a collab in a collab!)... ♥️

## Technical info

- The 3D coordinates of point of the bridge is represented by a p5.Vector with the following dimension:
  - x: from -gridSizeX / 2 (left) to gridSizeX / 2 (right)
  - y: from 0 (front) to gridSizeY (back)
  - z: from 0 (down) to 1 (up)
- The 2D coordinates of the tiles are an array of p5.Vector. The coord go from (0,0) (top left) to (1,1) (bottom right). So you'll have to multiply them by `s` at drawing (this is done to be dimension-less)
