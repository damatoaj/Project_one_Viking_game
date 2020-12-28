const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let victoryDisplay = document.getElementById('victory');
canvas.height = '450';
canvas.width = '450';
const max_width = 400;
const max_height = 400;
const min_width = 0;
const min_height = 0;

let currentDirection

//crawler
function Crawler(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.render = function () {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.crashWith = function(currentPiece) { //find a way to do collision checks with every other piece checking if they collide w current piece
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let currentPieceleft = currentPiece.x;
        let currentPieceright = currentPiece.x + (currentPiece.width);
        let currentPiecetop = currentPiece.y;
        let currentPiecebottom = currentPiece.y + (currentPiece.height);
        let crash = true;
        if ((mybottom < currentPiecetop) || (mytop > currentPiecebottom) || (myright < currentPieceleft) || (myleft > currentPieceright)) {
            crash = false;
        }
        return crash;
    }
}

//king
let king = new Crawler(200, 200, 50, 50, '#6b6f78')
//defenders
// const defenders = [
//     new Crawler(150, 200, 50, 50, '#e4e7ed'),
//     new Crawler(100, 200, 50, 50, '#e4e7ed'),
//     new Crawler(250, 200, 50, 50, '#e4e7ed'),
//     new Crawler(300, 200, 50, 50, '#e4e7ed'),
//     new Crawler(200, 150, 50, 50, '#e4e7ed'),
//     new Crawler(200, 100, 50, 50, '#e4e7ed'),
//     new Crawler(200, 250, 50, 50, '#e4e7ed'),
//     new Crawler(200, 300, 50, 50, '#e4e7ed'),
// ]
let defender1 = new Crawler(150, 200, 50, 50, '#e4e7ed')
let defender2 = new Crawler(100, 200, 50, 50, '#e4e7ed')
let defender3 = new Crawler(250, 200, 50, 50, '#e4e7ed')
let defender4 = new Crawler(300, 200, 50, 50, '#e4e7ed')
let defender5 = new Crawler(200, 150, 50, 50, '#e4e7ed')
let defender6 = new Crawler(200, 100, 50, 50, '#e4e7ed')
let defender7 = new Crawler(200, 250, 50, 50, '#e4e7ed')
let defender8 = new Crawler(200, 300, 50, 50, '#e4e7ed')
let defenderArray = [king, defender1, defender2, defender3, defender4, defender5, defender6, defender7, defender8]
//attackers
let attacker1 = new Crawler(200, 0, 50, 50, '#964b4a')
let attacker2 = new Crawler(150, 0, 50, 50, '#964b4a')
let attacker3 = new Crawler(250, 0, 50, 50, '#964b4a')
let attacker4 = new Crawler(200, 50, 50, 50, '#964b4a')
let attacker5 = new Crawler(150, 400, 50, 50, '#964b4a')
let attacker6 = new Crawler(200, 400, 50, 50, '#964b4a')
let attacker7 = new Crawler(250, 400, 50, 50, '#964b4a')
let attacker8 = new Crawler(200, 350, 50, 50, '#964b4a')
let attacker9 = new Crawler(400, 150, 50, 50, '#964b4a')
let attacker10 = new Crawler(400, 200, 50, 50, '#964b4a')
let attacker11 = new Crawler(400, 250, 50, 50, '#964b4a')
let attacker12 = new Crawler(350, 200, 50, 50, '#964b4a')
let attacker13 = new Crawler(0, 150, 50, 50, '#964b4a')
let attacker14 = new Crawler(0, 200, 50, 50, '#964b4a')
let attacker15 = new Crawler(0, 250, 50, 50, '#964b4a')
let attacker16 = new Crawler(50, 200, 50, 50, '#964b4a')
let attackerArray = [attacker1, attacker2, attacker3, attacker4, attacker5, attacker6, attacker7, attacker8, attacker9, attacker10, attacker11, attacker12, attacker13, attacker14, attacker15, attacker16]

//movement

let hitAttacker = false;
let hitDefender = false;
let movement = 50;

let defendersWin = () => {
    victoryDisplay.innerText = "Defenders Win!!!"
}

let detectCornerKing = () => {
    if (
        (king.x == 0 && king.y == 0) ||
        (king.x == 0 && king.y == 400) ||
        (king.x == 400 && king.y == 0) ||
        (king.x == 400 && king.y == 400)
    ) {
        defendersWin()
    }
}

let checkForVictory = () => {
    detectCornerKing()
}

//set player switch button
// let turnButton = document.getElementById("turns").addEventListener('onclick', selectPlayer)


let playerIndex = 0;
let playerArray = [defenderArray, attackerArray]
let selectPlayer = playerArray[playerIndex]
let currentPiece = 0;

let switchPlayer = (e) => {
    e.preventDefault()
    playerIndex = (playerIndex+1) % 2
    selectPlayer = playerArray[playerIndex] //selectplayer is the array of the current player's pieces
    currentPiece = 0;     
    currentDirection = false;                  //every time a new turn starts the same piece is picked
   
}
let turnButton = document.getElementById("turns").addEventListener('click', switchPlayer)


// //switch between attacking characters
// let attackerIndex = 0
// let selectAttacker = attackerArray[attackerIndex]

// let switchAttacker = () => {
//     attackerIndex++
//     if (attackerIndex == attackerArray.length) {
//         attackerIndex = 0
//     }    
//     selectAttacker = attackerArray[attackerIndex]
// }    

//change who the current piece is
let changePiece = (e) => {
    if(e.which == '32') {
        e.preventDefault()
       console.log(selectPlayer)
       console.log(selectPlayer[currentPiece])
       currentPiece++
       currentDirection = false;
    }
}
document.addEventListener('keydown', changePiece)

//move my current piece based on the key pressed.
//passive movement in the game loop, active movement in the movement handler
let move = (e) => {
    // initialize current direction in move()
    

    if (e.key === 'w' && currentDirection === false || currentDirection === 'w') { //move up
        currentDirection = 'w' 
         if(selectPlayer[currentPiece].y - movement >= min_height) {
                selectPlayer[currentPiece].y -= movement
        } 
      
          defenderArray.forEach(defender => {
            if(selectPlayer[currentPiece].y - movement >= defender.y + defender.height &&
                selectPlayer[currentPiece].x === defender.x) {
                    selectPlayer[currentPiece].y -= movement
                    console.log('my current piece hit a defender')
                    console.log(defender)
                }
            })      
        attackerArray.forEach(attacker => {
            if(selectPlayer[currentPiece].y  - movement >= attacker.y + attacker.height &&
                selectPlayer[currentPiece].x === attacker.x) {
                selectPlayer[currentPiece].y -= movement
                console.log('my piece hit an attacker')
                console.log(attacker)
            }
        })   
     

    } else if (e.key === 'a' && currentDirection === false || currentDirection === 'a') { //move left
        currentDirection = 'a'
      if (selectPlayer[currentPiece].x - movement >= min_height) {
        selectPlayer[currentPiece].x -= movement
        }    
    } else if (e.key === 's' && currentDirection === false || currentDirection === 's') { //move down
        currentDirection = 's'
        if(selectPlayer[currentPiece].y + movement <=max_height) {
            selectPlayer[currentPiece].y += movement    
        }
    } else if (e.key === 'd' && currentDirection === false || currentDirection === 'd') { //move right
        currentDirection = 'd'
        if(selectPlayer[currentPiece].x + movement <= max_width) {
            selectPlayer[currentPiece].x += movement    
        }
    }   
        console.log(`x: ${selectPlayer[currentPiece].x}, y: ${selectPlayer[currentPiece].y}`)// 
        checkForVictory()
}     


//set listener event for key down
document.addEventListener('keydown', move)

//function for collision detection that if true kills a piece


// let detectHit = () => {
//     let detectFriendly( 
//         king.x + king.width >= attacker1.x &&
//         king.x <= attacker1.x + attacker1.width &&
//         king.y <= attacker1.y + attacker1.height &&
//         king.y + king.height >= attacker1.y
//     ) {
//         console.log('hit')
//     }
// }

// //helper function so my computer doesn't explode
// document.querySelector('#btm-left').addEventListener('click', () => {
//     clearInterval(gameInterval)
// })

//gameloop
let gameLoop = () => {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //render board

//  if(king.crashWith(defender1)){
//     currentDirection = true;
//     console.log('crash')
//  }
// //  if(defender1.crashWith(defenderArray)){
//      console.log('hello')
//  }

//gameboard corners
ctx.fillStyle = '#323538';
ctx.fillRect(0, 0, 50, 50)
ctx.fillRect(400, 0, 50, 50)
ctx.fillRect(0, 400, 50, 50)
ctx.fillRect(400, 400, 50, 50)

//castle square
ctx.fillStyle = '#7e8508';
ctx.fillRect(200, 200, 50, 50)

// Defender Square
ctx.fillStyle = '#4579ad';
ctx.fillRect(150, 200, 50, 50)
ctx.fillRect(100, 200, 50, 50)
ctx.fillRect(250, 200, 50, 50)
ctx.fillRect(300, 200, 50, 50)
ctx.fillRect(200, 150, 50, 50)
ctx.fillRect(200, 100, 50, 50)
ctx.fillRect(200, 250, 50, 50)
ctx.fillRect(200, 300, 50, 50)
//Attacker Squares
ctx.fillStyle = '#802f3f';
ctx.fillRect(200, 0, 50, 50)
ctx.fillRect(150, 0, 50, 50)
ctx.fillRect(250, 0, 50, 50)
ctx.fillRect(200, 50, 50, 50)
ctx.fillRect(400, 150, 50, 50)
ctx.fillRect(400, 200, 50, 50)
ctx.fillRect(400, 250, 50, 50)
ctx.fillRect(350, 200, 50, 50)
ctx.fillRect(150, 400, 50, 50)
ctx.fillRect(200, 400, 50, 50)
ctx.fillRect(250, 400, 50, 50)
ctx.fillRect(200, 350, 50, 50)
ctx.fillRect(0, 150, 50, 50)
ctx.fillRect(0, 200, 50, 50)
ctx.fillRect(0, 250, 50, 50)
ctx.fillRect(50, 200, 50, 50)

// lines for gameboard
ctx.beginPath();
ctx.moveTo(50, 0);
ctx.lineTo(50, 450);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 0);
ctx.lineTo(100, 450);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150, 0);
ctx.lineTo(150, 450);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(200, 0);
ctx.lineTo(200, 450);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(250, 0);
ctx.lineTo(250, 450);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(300, 0);
ctx.lineTo(300, 450);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(350, 0);
ctx.lineTo(350, 450);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(400, 0);
ctx.lineTo(400, 450);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, 50);
ctx.lineTo(450, 50);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, 100);
ctx.lineTo(450, 100);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, 150);
ctx.lineTo(450, 150);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, 200);
ctx.lineTo(450, 200);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, 250);
ctx.lineTo(450, 250);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, 300);
ctx.lineTo(450, 300);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, 350);
ctx.lineTo(450, 350);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, 400);
ctx.lineTo(450, 400);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, 450);
ctx.lineTo(450, 450);
ctx.stroke();
    // if characters if alive
    if (king.alive) {
        king.render()
        //  if(king.crashWith(selectPlayer[currentPiece])){
        //     console.log('crash')
//  }
        //   detect collision
        // detectHit()
    }
    if (defender1.alive) {
        defender1.render()
    //      if(defender1.crashWith(currentPiece)){
    // currentDirection = true;
    // console.log('crash')
    // }
    }
    if (defender2.alive) {
        defender2.render()
    }
    if (defender3.alive) {
        defender3.render()
    }
    if (defender4.alive) {
        defender4.render()
    }
    if (defender5.alive) {
        defender5.render()
    }
    if (defender6.alive) {
        defender6.render()
    }
    if (defender7.alive) {
        defender7.render()
    }
    if (defender8.alive) {
        defender8.render()
    }

    if (attacker1.alive) {
        attacker1.render()

    }
    if (attacker2.alive) {
        attacker2.render()

    }
    if (attacker3.alive) {
        attacker3.render()

    }
    if (attacker4.alive) {
        attacker4.render()

    }
    if (attacker5.alive) {
        attacker5.render()

    }
    if (attacker6.alive) {
        attacker6.render()

    }
    if (attacker7.alive) {
        attacker7.render()

    }
    if (attacker8.alive) {
        attacker8.render()

    }
    if (attacker9.alive) {
        attacker9.render()

    }
    if (attacker10.alive) {
        attacker10.render()

    }
    if (attacker11.alive) {
        attacker11.render()

    }
    if (attacker12.alive) {
        attacker12.render()

    }
    if (attacker13.alive) {
        attacker13.render()

    }
    if (attacker14.alive) {
        attacker14.render()
    }
    if (attacker15.alive) {
        attacker15.render()
    }
    if (attacker16.alive) {
        attacker16.render()
    }
    // console.log("characters")

}

//initialize game
let gameInterval = setInterval(gameLoop, 100)
