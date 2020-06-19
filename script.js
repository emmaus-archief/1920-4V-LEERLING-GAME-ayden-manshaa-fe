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

var spelerX = 200; // x-positie van speler zebra
var spelerY = 100; // y-positie van speler zebra
var spelerSnelheid = 3;

var voerX = 0;    // x-positie van zebraVoer
var voerY = 0;    // y-positie van zebraVoer

var vijandX = 50;   // x-positie van vijand leeuw
var vijandY = 100;   // y-positie van vijand leeuw

var score = 30; // aantal behaalde punten, telt af met de tijd (seconden)

var imgS=0;
var imgV=0;

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  background("green");
  fill("yellow");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
  fill("black");
  text("Zebra = WASD     Leeuw = Pijltjes", 400, 800);
};

/**
 * Tekent eindscherm
 */
var tekenLeeuwWint = function () {
  fill("orange");
  textSize(30);
  text("Leeuw Wint, druk op reload om opnieuw te spelen", 100, 400);
};

var tekenZebraWint = function () {
  fill("grey");
  textSize(30);
  text("Zebra Wint, druk op reload om opnieuw te spelen", 100, 400);
};

/**
 * Tekent voer
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenZebraVoer = function(x, y) {
 var voer = fill("black");
            ellipse(x,y,20,20);
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
    vijandX = vijandX + spelerSnelheid;
  }

  if (keyIsDown(65) && vijandX > 60) { // a
    vijandX = vijandX - spelerSnelheid;
  }

  if (keyIsDown(83) && vijandY < 660) { // s
    vijandY = vijandY + spelerSnelheid;
  }

  if (keyIsDown(87) && vijandY > 60) { // w
    vijandY = vijandY - spelerSnelheid;
  }
};


/**
 * Updatet globale variabelen met positie van voer
 */
var plaatsZebraVoer = function() { 
  voerX = random (100, 1000);
  voerY = random (100, 700);
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
var checkSpelerOpVoer = function() {
    if (((vijandX - voerX) < 35 ) && 
        ((vijandX - voerX) > -35) &&
        ((vijandY - voerY) < 35) &&
        ((vijandY - voerY) > -35)) {
            return true;
        }
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

    
  voerX = random (100, 1000);
  voerY = random (100, 700);
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
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerOpVoer()) {
          if (spelerSnelheid > 5) {
            spelerSnelheid = spelerSnelheid + 0
          } else if(spelerSnelheid < 6) {
              spelerSnelheid = spelerSnelheid + 1;
              plaatsZebraVoer();
          }
        } 

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenZebraVoer(voerX, voerY);
      tekenSpeler(spelerX, spelerY);

      score = score - 1/50; // elke seconde 1 punt eraf
      textSize(20);
      fill("white");
      text("Score: "+round(score), 20, 20);
      if(score <= 0) {
          spelStatus = GAMEOVER;
          tekenZebraWint();
      }

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
        tekenLeeuwWint();
      }
      break;
  }
}

