"use strict";

function makeMap ()
{
    ctx.clearRect(0, 0, c.width, c.height);
    posX = 0;
    posY = 0;
    for (var i = 0; i < mapArray.length; i++) {
      for (var j = 0; j < mapArray[i].length; j++) {
        if (mapArray[i][j] == ' ') {
            makeSquareimg (posX, posY, "./img/seamless-grass-texture-with-old-stone-tiles_172107-2543.jpg.avif")
        }
        if (mapArray[i][j] == '*') {//player
            makeSquareimg (posX, posY, "./img/silvershroud.png")
        }
        if (mapArray[i][j] == 'w') {//w for wall
            makeSquareimg (posX, posY, "./img/Capture d’écran 2023-11-29 à 15.30.58.png")
        }
        if (mapArray[i][j] == 'b') {//b for box
            makeSquareimg (posX, posY, "./img/Capture d’écran 2023-11-29 à 16.02.42.png")
        }
        if (mapArray[i][j] == 't') {//target
            makeSquareimg (posX, posY, "./img/tagret.png")
        }
        if (mapArray[i][j] == 'wp') {//win position
          makeSquareimg (posX, posY, "./img/winningposition.png")
        }
        if (mapArray[i][j] == 'test') {//win position
          makeSquare (posX, posY, "red")
        }
        posX += 50;
      }
      posX = 0;
      posY += 50;
    }
}

function makeSquare (posX, posY, colour)
{
    ctx.beginPath();
    ctx.rect(posX, posY, 50, 50);
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.fillStyle = colour;
    ctx.fill();
}
function makeSquareimg(posX, posY, imageURL) {
  var img = new Image();
  img.src = imageURL;

  img.onload = function () {
      ctx.drawImage(img, posX, posY, 50, 50);
  };
}

function findPlayerCords() {
    const y = mapArray.findIndex((row) => row.includes('*'));
    const x = mapArray[y].indexOf('*');

    return {
      x,
      y,
      above: mapArray[y - 1][x],
      below: mapArray[y + 1][x],
      sideLeft: mapArray[y][x - 1],
      sideRight: mapArray[y][x + 1],
      above2: mapArray[y - 2][x],
      below2: mapArray[y + 2][x],
      sideLeft2: mapArray[y][x - 2],
      sideRight2: mapArray[y][x + 2],
    };
}

function findBoxCords() {
    const By = mapArray.findIndex((row) => row.includes('b'));
    const Bx = mapArray[By].indexOf('b');

    return {
      Bx,
      By,
      above_box: mapArray[By - 1][Bx],
      below_box: mapArray[By + 1][Bx],
      sideRight_box: mapArray[By][Bx + 1],
      sideLeft_box: mapArray[By][Bx - 1]
    };
}

function targetdrawer() {
  if (mapArray[2][2] !== '*' && mapArray[2][2] !== 'b' && mapArray[2][2] !== 'wp') {
    // makeSquareimg (100, 100, "./img/tagret.png");
    mapArray[2][2] = 't';
  }
  if (mapArray[8][2] !== '*' && mapArray[8][2] !== 'b' && mapArray[8][2] !== 'wp') {
    // makeSquareimg (100, 400, "./img/target.png")
    mapArray[8][2] = 't';
  }
  if (mapArray[8][6] !== '*' && mapArray[8][6] !== 'b' && mapArray[8][6] !== 'wp') {
    // makeSquareimg (100, 400, "./img/target.png")
    mapArray[8][6] = 't';
  }
  if (mapArray[2][7] !== '*' && mapArray[2][7] !== 'b' && mapArray[2][7] !== 'wp') {
    // makeSquareimg (100, 100, "./img/tagret.png");
    mapArray[2][7] = 't';
  }
  makeMap()
}

function keys(e) {
    e = e || window.event;

    // Prevent default behavior for arrow keys
    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
        e.preventDefault();
    }

    playerCords = findPlayerCords();
    playerCordsX = playerCords.x;
    playerCordsY = playerCords.y;

    boxCords = findBoxCords();
    boxCordsX = boxCords.Bx;
    boxCordsY = boxCords.By;

    // Store the original content of the cell the player is moving from
   

    // if (e.keyCode == 87 || e.keyCode == 38) {
    //   console.log(boxCordsX)
    //   console.log(boxCordsY)
    //   if (playerCords.above == 'w') {
    //     alert("you're not a ghost")
    //   }
    //   else if (playerCords.above == 'b' && boxCords.above_box == ' ') {
    //     mapArray[playerCordsY - 1][playerCordsX + 0] = '*';
    //     mapArray[playerCordsY][playerCordsX] = ' ';
    //     mapArray[playerCordsY - 2][playerCordsX + 0] = 'b';
    //     makeMap();
    //   }
    //   else if (playerCords.above == 'b' && boxCords.above_box == 't') {
    //     mapArray[playerCordsY - 1][playerCordsX + 0] = '*';
    //     mapArray[playerCordsY][playerCordsX] = ' ';
    //     mapArray[playerCordsY - 2][playerCordsX + 0] = 'wp';
    //     makeMap();
    //   }
    //   else if (playerCords.above == 'b' && boxCords.above_box == 'w') {
    //     alert("you can't do this")
    //   }
    //   else if (playerCords.above == ' ') {
    //     mapArray[playerCordsY - 1][playerCordsX + 0] = '*';
    //     mapArray[playerCordsY][playerCordsX] = ' ';
    //     makeMap();
    //   }
    // }
    if (e.keyCode == 87 || e.keyCode == 38) {
      if (playerCords.above == 'w') {
        alert("you're not a ghost")
      }
      else if (playerCords.above == 'wp') {
        alert("Nah")
      }
      else if (playerCords.above == 'b' && playerCords.above2 == ' ') {
        mapArray[playerCordsY - 1][playerCordsX + 0] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY - 2][playerCordsX + 0] = 'b';
        makeMap();
      }
      else if (playerCords.above == 'b' && playerCords.above2 == 't') {
        mapArray[playerCordsY - 1][playerCordsX + 0] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY - 2][playerCordsX + 0] = 'wp';
        makeMap();
      }
      else if (playerCords.above == 'b' && playerCords.above2 == 'w') {
        alert("you can't do this")
      }
      else {
        mapArray[playerCordsY - 1][playerCordsX + 0] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        makeMap();
      }//make a program that always write target at cetain coords unless the player is at this coords
    }
    if (e.keyCode == 65 || e.keyCode == 37) {
      if (playerCords.sideLeft == 'w') {
        alert("you're not a ghost")
      }
      else if (playerCords.sideLeft == 'wp') {
        alert("Nah")
      }
      else if (playerCords.sideLeft == 'b' && playerCords.sideLeft2 == ' ') {
        mapArray[playerCordsY + 0][playerCordsX - 1] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY + 0][playerCordsX - 2] = 'b';
        makeMap();
      }
      else if(playerCords.sideLeft == 'b' && playerCords.sideLeft2 == 't') {
        mapArray[playerCordsY - 0][playerCordsX - 1] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY - 0][playerCordsX - 2] = 'wp';
        makeMap();
      }
      else if (playerCords.sideLeft == 'b' && playerCords.sideLeft2 == 'w') {
        alert("you can't do this")
      }
      else {
        mapArray[playerCordsY + 0][playerCordsX - 1] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        makeMap();
      }
    }
    if (e.keyCode == 83 || e.keyCode == 40) {
      if (playerCords.below == 'w') {
        alert("you're not a ghost")
      }
      else if (playerCords.below == 'wp') {
        alert("Nah")
      }
      else if(playerCords.below == 'b' && playerCords.below2 == ' ') {
        mapArray[playerCordsY + 1][playerCordsX + 0] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY + 2][playerCordsX + 0] = 'b';
        makeMap();
      }
      else if(playerCords.below == 'b' && playerCords.below2 == 't') {
        mapArray[playerCordsY + 1][playerCordsX + 0] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY + 2][playerCordsX + 0] = 'wp';
        makeMap();
      }
      else if(playerCords.below == 'b' && playerCords.below2 == 'w') {
        alert("you can't do this")
      }
      else {
        mapArray[playerCordsY + 1][playerCordsX + 0] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        makeMap();
      }
    }
    if (e.keyCode == 68 || e.keyCode == 39) {
      if (playerCords.sideRight == 'w') {
        alert("you're not a ghost")
      }
      else if (playerCords.sideRight == 'wp') {
        alert("Nah")
      }
      else if(playerCords.sideRight == 'b' && playerCords.sideRight2 == ' ') {
        mapArray[playerCordsY - 0][playerCordsX + 1] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY - 0][playerCordsX + 2] = 'b';
        makeMap();
      }
      else if(playerCords.sideRight == 'b' && playerCords.sideRight2 == 't') {
        mapArray[playerCordsY - 0][playerCordsX + 1] = '*';
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY - 0][playerCordsX + 2] = 'wp';
        makeMap();
      }
      else if(playerCords.sideRight == 'b' && playerCords.sideRight2 == 'w') {
        alert("you can't do this")
      }
      else {
          mapArray[playerCordsY - 0][playerCordsX + 1] = '*';
          mapArray[playerCordsY][playerCordsX] = ' ';
          makeMap();
      }
    }
    targetdrawer()
    makeMap()
  }

// var mapArray = 
// [
//     ["w","w","w","w","w","w","w"],
//     ["w"," "," "," "," "," ","w"],
//     ["w"," "," "," "," "," ","w"],
//     ["w"," "," ","*"," "," ","w"],
//     ["w"," "," "," "," "," ","w"],
//     ["w"," "," "," "," "," ","w"],
//     ["w","w","w","w","w","w","w"]
// ];
var mapArray = 
[
    ["","","","","","","","","","",""],
    ["","w","w","w","w","w","w","w","w","w",""],
    ["","w","t"," "," "," "," ","t"," ","w",""],
    ["","w"," "," "," "," "," "," "," ","w",""],
    ["","w"," "," "," "," "," ","b"," ","w",""],
    ["","w"," ","b"," ","*"," "," "," ","w",""],
    ["","w","b"," "," "," "," "," "," ","w",""],
    ["","w"," "," "," "," "," "," "," ","w",""],
    ["","w","t"," "," "," ","t","b"," ","w",""],
    ["","w","w","w","w","w","w","w","w","w",""],
    ["","","","","","","","","","",""]
];

var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
var posX = 0;
var posY = 0;

var playerCords = findPlayerCords();
var playerCordsX = playerCords.x;
var playerCordsY = playerCords.y;

var boxCords = findBoxCords();
var boxCordsX = boxCords.Bx;
var boxCordsY = boxCords.By;

document.onkeydown = keys;
makeMap ();

