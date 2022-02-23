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
| ada_ada_ada.js | [[@ada_ada_ada_art](https://twitter.com/ada_ada_ada_art)](https://twitter.com/ada_ada_ada_art](https://twitter.com/ada_ada_ada_art)) | https://www.fxhash.xyz/u/Ada%20Ada%20Ada | [✅](https://tzkt.io/opXhZ9r7BPBd79nC1yzQ4HScP58DtT6ZCAmuPVX5RPkkvZVPaNp) |
| anaglyphic.js | [@anaglyph_ic](https://twitter.com/anaglyph_ic) | https://www.fxhash.xyz/u/anaglyphic | [✅](https://tzkt.io/ootMgYTjfzMrt5fsGyt2XZkTrRFLdX2SoZ9bEgtd4KHvGkZFL7B) |
| aqwunderscorezert.js | [@Aqw_Zert](https://twitter.com/Aqw_Zert) | https://www.fxhash.xyz/u/Aqw_Zert | [✅](https://tzkt.io/oozV9KKev9BucftP2mBuYmZZJ3rFDbVnXmy9mETanMefNiWQdSJ) |
| bridgetunnel.js | [@CablesAndPixels](https://twitter.com/CablesAndPixels) | https://www.fxhash.xyz/u/Laurent%20Houdard | [✅](https://tzkt.io/opNt8NfiufeF3bL4nuuN11neB1U2MC3Sz63H8u2xceehauTLQDL) |
| camilleroux.js | [@camillerouxart](https://twitter.com/camillerouxart) | https://www.fxhash.xyz/u/Camille%20Roux | - |
| camilleroux2.js | [@camillerouxart](https://twitter.com/camillerouxart) | https://www.fxhash.xyz/u/Camille%20Roux | - |
| davidesq.js | [@emcyze](https://twitter.com/emcyze) | https://www.fxhash.xyz/u/David%20Esq | [✅](https://tzkt.io/opYSkCima6HnW5yMLiXrcPQRdjdTkkxTeB9bxTLgEVYzDvmN23D) |
| devnull.js | [@lostpunks](https://twitter.com/lostpunks) | https://www.fxhash.xyz/u/devnull | [✅](https://tzkt.io/oojDUm8EkuWvKDMFtkmQwMQdHtXpemHUafwaiGVkizkbZ6yybh7) |
| elsif.js | [@ElsifThen](https://twitter.com/ElsifThen) | https://www.fxhash.xyz/u/elsif | [✅](https://tzkt.io/op3JXGym5hkfhGqrh47YFEcVcvtvFTaDCoNzqmjA5HsJsK8XL1D) |
| estienne.js | [@Estienne_ca](https://twitter.com/Estienne_ca) | https://www.fxhash.xyz/u/Estienne | [✅](https://tzkt.io/onrPc89oY6tNMhtW2mLHKgyvyNdMrLKDgiDNfYm9JkDBLN63rSv) |
| frederative.js | [@frederative](https://twitter.com/frederative) | https://www.fxhash.xyz/u/frederative | [✅](https://tzkt.io/opCiJduNMZX9hqaF6qjAXnaPSc5kr9fAGWokyiyoxQTcRCGEH5F) |
| generativepen.js | [@GenerativePen](https://twitter.com/GenerativePen) | https://www.fxhash.xyz/u/Generative%20Pen | [✅](https://tzkt.io/opXh45eVgRf1qCQcUdFLCzrptsbkB2Woj69qq8nHaCZ65dxdvwo) |
| gorik.js | [@gorikfr](https://twitter.com/gorikfr) | https://www.fxhash.xyz/u/Gorik | [✅](https://tzkt.io/ooQRkKxYJK7CevwYE36yXVUMMHy6XwmMdGCkWPG5N2voWvToQ7g) |
| grosgg.js | [@grosgg](https://twitter.com/grosgg) | https://www.fxhash.xyz/u/grosgg | [✅](https://tzkt.io/oo2VSENLgU4x8TKANwZnJCBMH4cNPvqJZwRCU85t5CfcUKuRnpp) |
| jeres.js | [@heyjeres](https://twitter.com/heyjeres) | https://www.fxhash.xyz/u/jeres | [✅](https://tzkt.io/ooEXFATUaXkgQX5JPwZzvmTFdcZxX39fozxWwoQtFo4ZmxA43mQ) |
| julabat.js | [@julabat](https://twitter.com/julabat) | https://www.fxhash.xyz/u/julabat | [✅](https://tzkt.io/oofH9jpDmQo55MmWNt1LquazKA1pvSREr1vnTyLSS3TBGnHQc3w) |
| lunarean.js | [@lunarean](https://twitter.com/lunarean) | https://www.fxhash.xyz/u/lunarean | [✅](https://tzkt.io/onxRACDzJYTtezjuV2XnW1mZzcTi2wAwCeWwTcQq1XrdZw367ta) |
| makio64.js | [@makio64](https://twitter.com/makio64) | https://www.fxhash.xyz/u/Makio64 | [✅](https://tzkt.io/onyLnS8UySCJrTPoVcyqS3kc5tCYvNJH2hriZ9fUb4b2scQR2aE) |
| mandybrigwell.js | [@mandybrigwell](https://twitter.com/mandybrigwell) | https://www.fxhash.xyz/u/mandybrigwell | [✅](https://tzkt.io/opSqxNm56uGnz4RuPHy2dee6Mkq9pNeSu29mwd3HanEm8DQY5RF) |
| matt_circles.js | [@matt_circles](https://twitter.com/matt_circles) | https://www.fxhash.xyz/u/Matt%20Circles | [✅](https://tzkt.io/op59cDYnjaPeiZvtoKBtzpQz9o2iLatNHPc3cnvSNZHwmXeDbZ5) |
| nickdima.js | [@nickdima](https://twitter.com/nickdima) | https://www.fxhash.xyz/u/Nick%20Dima | [✅](https://tzkt.io/ooK1p4B2dPKNrM5qE63dcDf4H1QXk5RdfA1hF548U47aNcQAd1W) |
| phil_osophie.js | [@phil_osophie](https://twitter.com/phil_osophie) | https://www.fxhash.xyz/u/phil_osophie | [✅](https://tzkt.io/opGnrayfCjT9VEaVRAXJzgeDvU1jqjANFSoh8jrT8B9cG2kX4xv) |
| robinmetcalfe.js | [@solarise_webdev](https://twitter.com/solarise_webdev) | https://www.fxhash.xyz/u/Robin | [✅](https://tzkt.io/op2pCfqjqFKQT8wkQ6hNZpqY1M4tYEfmuABc1MFKBYwATjjhshr) |
| rvig.js | [@rvig_art](https://twitter.com/rvig_art) | https://www.fxhash.xyz/u/rvig | [✅](https://tzkt.io/oopR9xVdiYGeBARcAw2ZmJmyfgiwrnUDGuVRMd4eHj1y4orWfHv) |
| shuhblam.js | [@shuhblam](https://twitter.com/shuhblam) | https://www.fxhash.xyz/u/shuhblam | [✅](https://tzkt.io/op23pryQWPk3apkBc2RV5SWMB35krJ8F3RXMAMxutn7RAeeye4w) |
| wilke.js | [@ClausWilke](https://twitter.com/ClausWilke) | https://www.fxhash.xyz/u/clauswilke | [✅](https://tzkt.io/onyivQ6cRESvb3JCnrij8VB6AyaWZ8wpQfUvc15kQ1rwXsZyPzF) |

**The code minted on fxhash is from the [fxhash](https://github.com/camilleroux/fxhash-bridge/tree/fxhash) branch**

## 💰 Money

- Primary market is: 4050.00 tez
- Fees are: 2.5%
- So "net revenue" is: 3948.75 tez
- They are 26 styles in the minted project so each included contributor will receive: 151.875 tez.
