"use strict";

// start our game when document is ready
$("body").ready( function () {
    $(window).on("keypress", initialise);
} );

//global variable 
var c = $('#mycanvas')[0];
var ctx = c.getContext("2d");
c.style.backgroundColor = "red";
var posX = 0;
var posY = 0;

var playerCords = findPlayerCords();
var playerCordsX = playerCords.x;
var playerCordsY = playerCords.y;

// function definition 

//function to set up the game
function initialise() {
    //when this function run a new game is loading so it should erase the former game :
    $('#content').text("");
    $('#start-interface').text("");
    
    c = $('#mycanvas')[0];
    ctx = c.getContext("2d");
    
    // turn off the keypress listener while a game is in progress
    $(window).off("keypress");
    document.onkeydown = keys;
    mapMaker();
}
// the function map maker go trough the maparray and define a plan that will help another function call makeSquare to create the visible map.
function mapMaker() {
    ctx.clearRect(0, 0, c.width, c.height);
    posX = 0;
    posY = 0;
    for (var i = 0; i < mapArray.length; i++) {
        for (var j = 0; j < mapArray[i].length; j++) {
            if (mapArray[i][j] == "0") {
                makeSquare(posX, posY, "green");
            }
            if (mapArray[i][j] == "*") {
                makeSquare(posX, posY, "yellow");
            }
            posX += 32;
        }
      posX = 0;
      posY += 32;
    }
}
// the function makeSquare will draw and give color to the plan made by the function mapMaker, it basically takes the coordinates given by the mapMaker function and draw a square with these coords (the point given by the coords is located at the top left corner of the square)
function makeSquare(posX, posY, colour)
{
    ctx.beginPath();
    ctx.rect(posX, posY, 32, 32);
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.fillStyle = colour;
    ctx.fill();
}

function findPlayerCords() {
    const y = mapArray.findIndex((row) => row.includes('*')); // ici le programme va chercher * en x il va entrer dans chaque ligne jusqu'à ce qu'il trouve une étoile, si il ne trouve pas l'étoile dans sa ligne il va passer à la ligne suivante jusqu'à ce qu'il la trouve.
    const x = mapArray[y].indexOf('*'); // ici le programme va chercher x dans la ligne où se situe y, 
    //ces 2 ligne ci-dessus fonctionnent ensemble, la première cherche la ligne dans laquelle se situe l'étoile (sa coord en y) et l'autre cherche où l'étoile se trouve dans la ligne concernée (sa coord en x)

    return {
      x,
      y,
      above: mapArray[y - 1][x],
      below: mapArray[y + 1][x],
      sideLeft: mapArray[y][x - 1],
      sideRight: mapArray[y][x + 1],
    };
}

function keys(e) {
    playerCords = findPlayerCords();
    playerCordsX = playerCords.x;
    playerCordsY = playerCords.y;

    if (e.keyCode == 87 || e.keyCode == 38) {
        mapArray[playerCordsY - 1][playerCordsX + 0] = "*";
        mapArray[playerCordsY][playerCordsX] = "0";
        mapMaker();
    }
    if (e.keyCode == 65 || e.keyCode == 37) {
        mapArray[playerCordsY + 0][playerCordsX - 1] = "*";
        mapArray[playerCordsY][playerCordsX] = "0";
        mapMaker();
    }
    if (e.keyCode == 83 || e.keyCode == 40) {
        mapArray[playerCordsY + 1][playerCordsX + 0] = "*";
        mapArray[playerCordsY][playerCordsX] = "0";
        mapMaker();
    }
    if (e.keyCode == 68 || e.keyCode == 39) {
        mapArray[playerCordsY - 0][playerCordsX + 1] = "*";
        mapArray[playerCordsY][playerCordsX] = "0";
        mapMaker();
    }
}

//map 
const mapArray = 
[
    ["0","0","0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","*","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0","0"]
]