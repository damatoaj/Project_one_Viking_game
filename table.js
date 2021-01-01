//setting universal variables here at the top; in retrospect I could have put more variables up here.
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let victoryDisplay = document.getElementById('victory');
let playerOneDisplay = document.getElementById('playerOne')
let playerTwoDisplay = document.getElementById('playerTwo')
let startButton = document.getElementById('start')
let resetButton = document.getElementById('reset')
canvas.height = '450';
canvas.width = '450';
const max_width = 400;
const max_height = 400;
const min_width = 0;
const min_height = 0;
let movement = 50;
let backGroundMusic = document.getElementById('backgroundMusic')
let currentDirection

//all sounds constructor, learned that sounds can be created like components and then be plugged into functions; 

let screamOne = new Audio('scream1.mp3');
let screamTwo = new Audio('scream2.mp3');
let screamThree = new Audio('scream3.mp3');
let cheerOne = new Audio('cheer1.mp3');
let cheerTwo = new Audio('cheer2.mp3');

/* Crawler  in retropect I should have put more functions in the crawlers that could be called later in the game, or made the
the placement of the characters a function that could be used for the reset */
function Crawler(x, y, width, height, color) { //other functions can be programmed right here in the Crawler/Component that then get called later
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
}

//king
let king = new Crawler(200, 200, 50, 50, 'yellow')
//defenders
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


let playerIndex = 0;
let playerArray = [defenderArray, attackerArray]
let selectPlayer = playerArray[playerIndex]
let currentPiece = 0;
let previousPiece = currentPiece - 1;

//Text display functions 
let defendersWin = () => {
    victoryDisplay.innerText = "Defenders Win!!!"
    cheerOne.play()
}

let attackersWin = () => {
    victoryDisplay.innerText = "Attackers Win!!!"
    cheerTwo.play()
}

let playerOneTurn = () => {
    playerOneDisplay.innerText = "Player One's Turn"
    playerTwoDisplay.innerText = "                 "
}

let playerTwoTurn = () => {
    playerOneDisplay.innerText = "                 "
    playerTwoDisplay.innerText = "Player Two's Turn"
}

//detect victory condition for defenders; run later in the move function
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

/*   These functions allow the players to switch from team one to team two as they click the switch player button. 
As the players switch then the current piece resets to zero and the color is toggled to yellow to indicate who the current piece is

*/
let switchPlayer = (e) => {
    e.preventDefault()
    console.log(selectPlayer[currentPiece])

    if (!playerIndex) {
        if (currentPiece == 0) {
            selectPlayer[currentPiece].color = '#6b6f78';
        } else if (currentPiece >= 1) {
            selectPlayer[currentPiece].color = '#e4e7ed';
        }
    }
    if (playerIndex) {
        selectPlayer[currentPiece].color = '#964b4a';
    }

    playerIndex = (playerIndex + 1) % 2
    selectPlayer = playerArray[playerIndex]
    currentDirection = false;

    currentPiece = 0;
    selectPlayer[currentPiece].color = 'yellow'
    if (playerIndex == 0) {
        playerOneTurn()
    } else { playerTwoTurn() }
}
let turnButton = document.getElementById("turns").addEventListener('click', switchPlayer)//switch between players


//change who the current piece is within a team
let changePiece = (e) => {
    if (e.which == '9') {
        currentPiece++
        let previousPiece = currentPiece - 1;
        e.preventDefault()
        console.log('previousPiece', previousPiece)
        currentDirection = false;
        selectPlayer[currentPiece].color = 'yellow';
        console.log(currentPiece)
        if (!playerIndex) { //selects defenderArray
            if (previousPiece == 0) {
                selectPlayer[previousPiece].color = '#6b6f78';
            } else if (previousPiece >= 1) {
                selectPlayer[previousPiece].color = '#e4e7ed';
            }
            if (currentPiece == defenderArray.length - 1) {
                currentPiece = 0
                defenderArray[defenderArray.length - 1].color = '#e4e7ed'
            }
        }
        if (playerIndex) { //selects attackerArray
            if (previousPiece >= 0) {
                selectPlayer[previousPiece].color = '#964b4a';
            }
            if (currentPiece == attackerArray.length - 1) {
                currentPiece = 0
                attackerArray[attackerArray.length - 1].color = '#964b4a'
            }
        }
    }
}

document.addEventListener('keydown', changePiece)

/*move my current piece based on the key pressed.
first part set the borders
second part sets conditions where if characters are alive then they can be hit and not passed through
Object.is was a new thing I learned to use and set rules base on whether the manipulated object is or is not itself
attack and defender conditions had to be set for eacsh direction key
*/
let move = (e) => {

    if (e.key === 'w' && currentDirection === false || currentDirection === 'w') {
        currentDirection = 'w'
        if (selectPlayer[currentPiece].y - movement >= min_height) {
            selectPlayer[currentPiece].y -= movement
        }

        defenderArray.forEach(defender => {
            if (defender.alive) {
                if (!Object.is(selectPlayer[currentPiece], defender)) { 
                    if (selectPlayer[currentPiece].y === defender.y && 
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].y = defender.y + defender.height
                        console.log('my current piece hit a defender')
                    }
                }
            }
        })

        attackerArray.forEach(attacker => {
            if (attacker.alive) {
                if (!Object.is(selectPlayer[currentPiece], attacker)) {
                    if (selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].y = attacker.y + attacker.height
                        console.log('my piece hit an attacker')
                    }
                }
            }
        })

    } else if (e.key === 'a' && currentDirection === false || currentDirection === 'a') {
        currentDirection = 'a'
        if (selectPlayer[currentPiece].x - movement >= min_height) {
            selectPlayer[currentPiece].x -= movement
        }

        defenderArray.forEach(defender => {
            if (defender.alive) {
                if (!Object.is(selectPlayer[currentPiece], defender)) {
                    if (selectPlayer[currentPiece].y === defender.y &&
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].x = defender.x + defender.width
                    }
                }
            }
        })

        attackerArray.forEach(attacker => {
            if (attacker.alive) {
                if (!Object.is(selectPlayer[currentPiece], attacker)) {
                    if (selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].x = attacker.x + attacker.width
                    }
                }
            }
        })

    } else if (e.key === 's' && currentDirection === false || currentDirection === 's') {
        currentDirection = 's'
        if (selectPlayer[currentPiece].y + movement <= max_height) {
            selectPlayer[currentPiece].y += movement
        }

        defenderArray.forEach(defender => {
            if (defender.alive) {
                if (!Object.is(selectPlayer[currentPiece], defender)) {
                    if (selectPlayer[currentPiece].y === defender.y &&
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].y = defender.y - defender.height
                    }
                }
            }
        })


        attackerArray.forEach(attacker => {
            if (attacker.alive) {
                if (!Object.is(selectPlayer[currentPiece], attacker)) {
                    if (selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].y = attacker.y - attacker.height
                    }
                }
            }
        })

    } else if (e.key === 'd' && currentDirection === false || currentDirection === 'd') {
        currentDirection = 'd'
        if (selectPlayer[currentPiece].x + movement <= max_width) {
            selectPlayer[currentPiece].x += movement
        }

        defenderArray.forEach(defender => {
            if (defender.alive) {
                if (!Object.is(selectPlayer[currentPiece], defender)) {
                    if (selectPlayer[currentPiece].y === defender.y &&
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].x = defender.x - defender.width
                    }
                }
            }
        })

        attackerArray.forEach(attacker => {
            if (attacker.alive) {
                if (!Object.is(selectPlayer[currentPiece], attacker)) {
                    if (selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].x = attacker.x - attacker.width
                    }
                }
            }
        })
    }
    detectCornerKing()
}
document.addEventListener('keydown', move)


/*gameloop sets down the lines for the board game and renders characters if they are alive
also hosts the kill conditions using nested arrays
*/


let gameLoop = () => {
//clear canvas so that the pieces can then be rendered again
    ctx.clearRect(0, 0, canvas.width, canvas.height)
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
    ctx.fillStyle = '#4d7855';
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
/*nested arrays for piece deaths; if the defenders, for each defender, if in these positions they return true
returning true then satisfies the death conditions and sound effect. 
*/
if (playerIndex) {
        defenderArray.forEach((defender, index) => {
            let top = false;
            let bottom = false;
            let right = false;
            let left = false
            attackerArray.forEach(attacker => {
                if (defender.x == attacker.x + attacker.width &&
                    defender.x + defender.height == attacker.x + attacker.width + attacker.height &&
                    defender.y == attacker.y) {
                    left = true;
                }
                if (defender.x + defender.width == attacker.x &&
                    defender.x + defender.width + defender.height == attacker.x + attacker.height &&
                    defender.y == attacker.y) {
                    right = true;
                }
                if (defender.y == attacker.y + attacker.height &&
                    defender.y + defender.width == attacker.y + attacker.height + attacker.width &&
                    defender.x == attacker.x) {
                    top = true;
                }
                if (defender.y + defender.height == attacker.y &&
                    defender.y + defender.width + defender.height == attacker.y + attacker.width &&
                    defender.x == attacker.x) {
                    bottom = true;
                }
            })
            if (index == 0) {
                if (left && right) { defender.alive }
                if (top && bottom) { defender.alive }
                if (left && right && bottom && top) { defender.alive = false; cheerTwo.play(); }
            } else {
                if (left && right) { defender.alive = false; screamOne.play(); }
                if (top && bottom) { defender.alive = false; screamOne.play(); }
            }
        })
    }
    if (!playerIndex) {
        attackerArray.forEach(attacker => {
            let top = false;
            let bottom = false;
            let right = false;
            let left = false
            defenderArray.forEach(defender => {
                if (attacker.x == defender.x + defender.width &&
                    attacker.x + attacker.height == defender.x + defender.width + defender.height &&
                    attacker.y == defender.y) {
                    left = true;
                }
                if (attacker.x + attacker.width == defender.x &&
                    attacker.x + attacker.width + attacker.height == defender.x + defender.height &&
                    attacker.y == defender.y) {
                    right = true;
                }
                if (attacker.y == defender.y + defender.height &&
                    attacker.y + attacker.width == defender.y + defender.height + defender.width &&
                    attacker.x == defender.x) {
                    top = true;
                }
                if (attacker.y + attacker.height == defender.y &&
                    attacker.y + attacker.width + attacker.height == defender.y + defender.width &&
                    attacker.x == defender.x) {
                    bottom = true;
                }
            })
            if (left && right) { attacker.alive = false; screamTwo.play() }
            if (top && bottom) { attacker.alive = false; screamTwo.play() }
        })
    }
// if characters are alive, then they are rendered. if not, no more rendering and the x,y position is changed to eliminate a post-death bug
    if (king.alive) {
        king.render()
    } else {
        king.x = 200;
        king.y = 200;
    }
    if (defender1.alive) {
        defender1.render()
    } else {
        defender1.x = 0;
        defender1.y = 0;
    }
    if (defender2.alive) {
        defender2.render()
    } else {
        defender2.x = 0;
        defender2.y = 0;
    }
    if (defender3.alive) {
        defender3.render()
    } else {
        defender3.x = 0;
        defender3.y = 0;
    }
    if (defender4.alive) {
        defender4.render()
    } else {
        defender4.x = 0;
        defender4.y = 0;
    }

    if (defender5.alive) {
        defender5.render()
    } else {
        defender5.x = 0;
        defender5.y = 0;
    }
    if (defender6.alive) {
        defender6.render()
    } else {
        defender6.x = 0;
        defender6.y = 0;
    }
    if (defender7.alive) {
        defender7.render()
    } else {
        defender7.x = 0;
        defender7.y = 0;
    }
    if (defender8.alive) {
        defender8.render()
    } else {
        defender8.x = 0;
        defender8.y = 0;
    }
    if (attacker1.alive) {
        attacker1.render()
    } else {
        attacker1.x = 0;
        attacker1.y = 0;
    }
    if (attacker2.alive) {
        attacker2.render()
    } else {
        attacker2.x = 0;
        attacker2.y = 0;
    }
    if (attacker3.alive) {
        attacker3.render()
    } else {
        attacker3.x = 0;
        attacker3.y = 0;
    }
    if (attacker4.alive) {
        attacker4.render()
    } else {
        attacker4.x = 0;
        attacker4.y = 0;
    }
    if (attacker5.alive) {
        attacker5.render()
    } else {
        attacker5.x = 0;
        attacker5.y = 0;
    }
    if (attacker6.alive) {
        attacker6.render()
    } else {
        attacker6.x = 0;
        attacker6.y = 0;
    }
    if (attacker7.alive) {
        attacker7.render()
    } else {
        attacker7.x = 0;
        attacker7.y = 0;
    }
    if (attacker8.alive) {
        attacker8.render()
    } else {
        attacker8.x = 0;
        attacker8.y = 0;
    }
    if (attacker9.alive) {
        attacker9.render()
    } else {
        attacker9.x = 0;
        attacker9.y = 0;
    }
    if (attacker10.alive) {
        attacker10.render()
    } else {
        attacker10.x = 0;
        attacker10.y = 0;
    }
    if (attacker11.alive) {
        attacker11.render()
    } else {
        attacker11.x = 0;
        attacker11.y = 0;
    }
    if (attacker12.alive) {
        attacker12.render()
    } else {
        attacker12.x = 0;
        attacker12.y = 0;
    }
    if (attacker13.alive) {
        attacker13.render()
    } else {
        attacker13.x = 0;
        attacker13.y = 0;
    }
    if (attacker14.alive) {
        attacker14.render()
    } else {
        attacker14.x = 0;
        attacker14.y = 0;
    }
    if (attacker15.alive) {
        attacker15.render()
    } else {
        attacker15.x = 0;
        attacker15.y = 0;
    }
    if (attacker16.alive) {
        attacker16.render()
    } else {
        attacker16.x = 0;
        attacker16.y = 0;
    }
//death conditions for the king trigger the win for the attackers
    let attackersWin = () => {
    victoryDisplay.innerText = "Attackers Win!!!"
        }
    let detectKingDeath = () => {
        if (!king.alive) {
            attackersWin()
        }
    }
    detectKingDeath()
}


//initialize game
let gameInterval = setInterval(gameLoop, 100)
startButton.addEventListener('onclick', gameLoop())
console.log(startButton)

//end game and reset board

function reset() {

}

resetButton.addEventListener('onclick', reset())