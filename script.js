/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */                    




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 200; // x-positie van speler
var spelerY = 100; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 50;   // x-positie van vijand
var vijandY = 100;   // y-positie van vijand

var score = 0; // aantal behaalde punten

var imgS=0;
var imgV=0;

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("yellow");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
};

/**
 * Tekent eindscherm
 */
var tekenEindScherm = function () {
  fill("purple");
  textSize(30);
  text("Game Over, druk op reload om opnieuw te spelen", 100, 400);
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {

}

/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x,  y) {
  /*
  fill(20,230,230);
  ellipse(vijandX ,  vijandY, 50, 50); //hoofd
  fill(200,30,30);
  ellipse(vijandX-25, vijandY+25, 20, 20); //oog links
  ellipse(vijandX+25, vijandY+25, 20, 20); //oog rechts
  ellipse(vijandX,    vijandY-25, 75, 20); //mond
  */
   image(imgV, x-25, y-25, 50, 50); 
}

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
   image(imgS, x-25, y-25, 50, 50); 
};

/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
  if (keyIsDown(68) && vijandX < 1200) { // d
    vijandX = vijandX + 3;
  }

  if (keyIsDown(65) && vijandX > 60) { // a
    vijandX = vijandX - 3;
  }

  if (keyIsDown(83) && vijandY < 660) { // s
    vijandY = vijandY + 3;
  }

  if (keyIsDown(87) && vijandY > 60) { // w
    vijandY = vijandY - 3;
  }
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.    https://keycode.info/   is website voor codes
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
    console.log("beweegSpeler");
  if (keyIsDown(39) && spelerX < 1220) { // pijlrechts
   spelerX = spelerX + 3;
   console.log("speler:rechts");
  }

  if (keyIsDown(37) && spelerX > 60) { // pijllinks
    spelerX = spelerX - 3;
  }

  if (keyIsDown(40) && spelerY < 660) { // pijlonder
    spelerY = spelerY + 3;
  }

  if (keyIsDown(38) && spelerY > 60) { //pijlboven
    spelerY = spelerY - 3;
  }
};

/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};

/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {

  return false;
};

/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    if (((spelerX - vijandX) < 50 ) && 
        ((spelerX - vijandX) > -50) &&
        ((spelerY - vijandY) < 50) &&
        ((spelerY - vijandY) > -50)) {
            return true;
        }
        
  return false;
};

/**
 * preload
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, voordat setup wordt aangeroepen
 */
function preload() {
  imgS = loadImage("afbeeldingen/lion.png"); 
  imgV = loadImage("afbeeldingen/zebra.png");
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    console.log("draw");
  switch (spelStatus) {
    case SPELEN:
        console.log("SPELEN");
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
        tekenEindScherm();
      }
      break;
  }
}

