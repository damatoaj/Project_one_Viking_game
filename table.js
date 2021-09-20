//setting universal variables here at the beginning; in retrospect I could have put more variables up here.
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let victoryDisplay = document.getElementById('victory');
let playerOneDisplay = document.getElementById('playerOne')
let playerTwoDisplay = document.getElementById('playerTwo')
let resetButton = document.getElementById('reset')
canvas.height = '450';
canvas.width = '450';
const max_width = 400;
const max_height = 400;
const min_width = 0;
const min_height = 0;
let movement = 50;
let currentDirection;
function reloadGame() {
    window.location.reload()
};

//all sounds constructor, learned that sounds can be created like components and then be plugged into functions; 

let screamOne = new Audio('scream1.mp3');
let screamTwo = new Audio('scream2.mp3');
let screamThree = new Audio('scream3.mp3');
let cheerOne = new Audio('cheer1.mp3');
let cheerTwo = new Audio('cheer2.mp3');

/* Crawler  in retropect I should have put more functions in the crawlers that could be called later in the game, or made the
the placement of the characters a function that could be used for the reset */

function Crawler(x, y, width, height, color, type) { //other functions can be programmed right here in the Crawler/Component that then get called later
    this.type;
    if (type == 'image') {
        this.image = new Image();
        this.image.src = color;
    };
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.render = function () {
        if (type == 'image') {
        ctx.drawImage(this.image, 
        this.x, 
        this.y,
        this.width,
        this.height); 
        } 
    };
    this.death = function () {
        if(this.alive) {screamOne.play()};
        this.alive = false;
        this.y = null;
        this.x = null;
        this.width = null;
        this.height = null;
        delete this.render;
    };
};

//king
let king = new Crawler(200, 200, 50, 50, 'king_artwork.jpg', 'image')
//defenders
let defender1 = new Crawler(150, 200, 50, 50, 'swedish_shield.jpg', 'image')
let defender2 = new Crawler(100, 200, 50, 50, 'swedish_shield.jpg', 'image')
let defender3 = new Crawler(250, 200, 50, 50, 'swedish_shield.jpg', 'image')
let defender4 = new Crawler(300, 200, 50, 50, 'swedish_shield.jpg', 'image')
let defender5 = new Crawler(200, 150, 50, 50, 'swedish_shield.jpg', 'image')
let defender6 = new Crawler(200, 100, 50, 50, 'swedish_shield.jpg', 'image')
let defender7 = new Crawler(200, 250, 50, 50, 'swedish_shield.jpg', 'image')
let defender8 = new Crawler(200, 300, 50, 50, 'swedish_shield.jpg', 'image')
let defenderArray = [king, defender1, defender2, defender3, defender4, defender5, defender6, defender7, defender8];
//attackers
let attacker1 = new Crawler(200, 0, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker2 = new Crawler(150, 0, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker3 = new Crawler(250, 0, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker4 = new Crawler(200, 50, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker5 = new Crawler(150, 400, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker6 = new Crawler(200, 400, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker7 = new Crawler(250, 400, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker8 = new Crawler(200, 350, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker9 = new Crawler(400, 150, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker10 = new Crawler(400, 200, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker11 = new Crawler(400, 250, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker12 = new Crawler(350, 200, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker13 = new Crawler(0, 150, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker14 = new Crawler(0, 200, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker15 = new Crawler(0, 250, 50, 50, 'norwegian_flag.jpg', 'image')
let attacker16 = new Crawler(50, 200, 50, 50, 'norwegian_flag.jpg', 'image')
let attackerArray = [attacker1, attacker2, attacker3, attacker4, attacker5, attacker6, attacker7, attacker8, attacker9, attacker10, attacker11, attacker12, attacker13, attacker14, attacker15, attacker16];

let playerIndex = 0;
let playerArray = [defenderArray, attackerArray]
let selectPlayer = playerArray[playerIndex]
let currentPiece = 0;
let previousPiece = currentPiece - 1;

//Text display functions ;
let defendersWin = () => {
    document.removeEventListener('keydown', changePiece);
    document.removeEventListener('keydown', move);
    document.getElementById("turns").removeEventListener('click', switchPlayer);
    victoryDisplay.innerText = "Defenders Win!!!";
    cheerOne.play();
    setTimeout(() => window.location.reload(), 10000);
};

let attackersWin = () => {
    victoryDisplay.innerText = "Attackers Win!!!";
    cheerTwo.play();
};

let playerOneTurn = () => {
    playerOneDisplay.innerText = "Player One's Turn";
    playerTwoDisplay.innerText = "";
    playerOneDisplay.style.animationName = 'border-animation';
    playerTwoDisplay.style.animationName = 'none';
};

let playerTwoTurn = () => {
    playerOneDisplay.innerText = "";
    playerTwoDisplay.innerText = "Player Two's Turn";
    playerOneDisplay.style.animationName = 'none';
    playerTwoDisplay.style.animationName = 'border-animation';
};

//detect victory condition for defenders; run later in the move function
let detectCornerKing = () => {
    if (
        (king.x == 0 && king.y == 0) ||
        (king.x == 0 && king.y == 400) ||
        (king.x == 400 && king.y == 0) ||
        (king.x == 400 && king.y == 400)
    ) {
        defendersWin();
    };
};

let detectKingDeath = () => {
    if (!king.alive) {
        attackersWin()
        document.removeEventListener('keydown', changePiece);
        document.removeEventListener('keydown', move);
        document.getElementById("turns").removeEventListener('click', switchPlayer);
        setTimeout(() => window.location.reload(), 10000);
    };
};

/*   These functions allow the players to switch from team one to team two as they click the switch player button. 
As the players switch then the current piece resets to zero and the color is toggled to yellow to indicate who the current piece is

*/
let switchPlayer = (e) => {
    e.preventDefault();

    if (!playerIndex) {
        if (currentPiece == 0) {
            selectPlayer[currentPiece].image.src = 'king_artwork.jpg';
        } else if (currentPiece >= 1) {
            selectPlayer[currentPiece].image.src = 'swedish_shield.jpg';
        }
    };

    if (playerIndex) {
        selectPlayer[currentPiece].image.src = 'norwegian_flag.jpg';
    };

    playerIndex = (playerIndex + 1) % 2;
    selectPlayer = playerArray[playerIndex];
    currentDirection = false;
    currentPiece = 0;
    selectPlayer[currentPiece].image.src = 'blue_viking_shield.jpg';

    if (playerIndex == 0) {
        playerOneTurn();
        checkPlayerProximity();
        
        // renderLivingPlayers();
        // console.log('check attacker death')
    } else { 
        playerTwoTurn();
        checkPlayerProximity();
         
        // console.log('check defender death')
    }
};
let turnButton = document.getElementById("turns").addEventListener('click', switchPlayer); //switch between players


//change who the current piece is within a team
let changePiece = (e) => {
    if (e.which == '9') {
        if (playerIndex) { //selects attackerArray
            if(currentPiece == attackerArray.length - 1) {
                attackerArray[currentPiece].image.src = 'norwegian_flag.jpg'
                currentPiece = 0
                attackerArray[currentPiece].image.src = 'blue_viking_shield.jpg'
            } else {
                attackerArray[currentPiece].image.src = 'norwegian_flag.jpg'
                currentPiece++
                attackerArray[currentPiece].image.src = 'blue_viking_shield.jpg'
            } 
        } else if (currentPiece == defenderArray.length - 1) {
                    defenderArray[currentPiece].image.src = 'swedish_shield.jpg'
                    currentPiece = 0
                    defenderArray[currentPiece].image.src = 'blue_viking_shield.jpg'
                } else {
                    defenderArray[currentPiece].image.src = 'swedish_shield.jpg'
                    currentPiece++
                    defenderArray[currentPiece].image.src = 'blue_viking_shield.jpg'
                } if(currentPiece != 0) {
                    defenderArray[0].image.src = 'king_artwork.jpg'
                } 
        currentDirection = false;
        e.preventDefault();
    };
};
document.addEventListener('keydown', changePiece);

/*move my current piece based on the key pressed.
first part set the borders
second part sets conditions where if characters are alive then they can be hit and not passed through
Object.is was a new thing I learned to use and set rules base on whether the manipulated object is or is not itself
attack and defender conditions had to be set for eacsh direction key
*/
let move = (e) => {
    if (e.key === 'w' && currentDirection === false || currentDirection === 'w') {
        currentDirection = 'w';

        if (selectPlayer[currentPiece].y - movement >= min_height) {
            selectPlayer[currentPiece].y -= movement
        };

        defenderArray.forEach(defender => {
            if (defender.alive) {
                if (!Object.is(selectPlayer[currentPiece], defender)) { 
                    if (selectPlayer[currentPiece].y === defender.y && 
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].y = defender.y + defender.height
                    };
                };
            };
        });

        attackerArray.forEach(attacker => {
            if (attacker.alive) {
                if (!Object.is(selectPlayer[currentPiece], attacker)) {
                    if (selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].y = attacker.y + attacker.height
                    };
                };
            };
        });
    } else if (e.key === 'a' && currentDirection === false || currentDirection === 'a') {
        currentDirection = 'a';

        if (selectPlayer[currentPiece].x - movement >= min_height) {
            selectPlayer[currentPiece].x -= movement
        };

        defenderArray.forEach(defender => {
            if (defender.alive) {
                if (!Object.is(selectPlayer[currentPiece], defender)) {
                    if (selectPlayer[currentPiece].y === defender.y &&
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].x = defender.x + defender.width
                    };
                };
            };
        });

        attackerArray.forEach(attacker => {
            if (attacker.alive) {
                if (!Object.is(selectPlayer[currentPiece], attacker)) {
                    if (selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].x = attacker.x + attacker.width
                    };
                };
            };
        });
    } else if (e.key === 's' && currentDirection === false || currentDirection === 's') {
        currentDirection = 's';

        if (selectPlayer[currentPiece].y + movement <= max_height) {
            selectPlayer[currentPiece].y += movement
        };

        defenderArray.forEach(defender => {
            if (defender.alive) {
                if (!Object.is(selectPlayer[currentPiece], defender)) {
                    if (selectPlayer[currentPiece].y === defender.y &&
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].y = defender.y - defender.height
                    };
                };
            };
        });

        attackerArray.forEach(attacker => {
            if (attacker.alive) {
                if (!Object.is(selectPlayer[currentPiece], attacker)) {
                    if (selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].y = attacker.y - attacker.height
                    };
                };
            };
        });
    } else if (e.key === 'd' && currentDirection === false || currentDirection === 'd') {
        currentDirection = 'd';

        if (selectPlayer[currentPiece].x + movement <= max_width) {
            selectPlayer[currentPiece].x += movement
        };
        defenderArray.forEach(defender => {
            if (defender.alive) {
                if (!Object.is(selectPlayer[currentPiece], defender)) {
                    if (selectPlayer[currentPiece].y === defender.y &&
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].x = defender.x - defender.width
                    };
                };
            };
        });

        attackerArray.forEach(attacker => {
            if (attacker.alive) {
                if (!Object.is(selectPlayer[currentPiece], attacker)) {
                    if (selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].x = attacker.x - attacker.width
                    };
                };
            };
        });
    };
    detectCornerKing();
};
document.addEventListener('keydown', move);

/*gameloop sets down the lines for the board game and renders characters if they are alive
also hosts the kill conditions using nested arrays
*/
let renderBoard = () => {
    //clear canvas so that the pieces can then be rendered again
    ctx.clearRect(0, 0, canvas.width, canvas.height);
//gameboard corners
    ctx.fillStyle = '#323538'; ctx.fillRect(0, 0, 50, 50); ctx.fillRect(400, 0, 50, 50); ctx.fillRect(0, 400, 50, 50); ctx.fillRect(400, 400, 50, 50);
 //castle square
    ctx.fillStyle = '#7e8508'; ctx.fillRect(200, 200, 50, 50);
// Defender Square
    ctx.fillStyle = '#4579ad'; ctx.fillRect(150, 200, 50, 50); ctx.fillRect(100, 200, 50, 50); ctx.fillRect(250, 200, 50, 50); ctx.fillRect(300, 200, 50, 50);
    ctx.fillRect(200, 150, 50, 50); ctx.fillRect(200, 100, 50, 50); ctx.fillRect(200, 250, 50, 50); ctx.fillRect(200, 300, 50, 50);
 //Attacker Squares
    ctx.fillStyle = '#4d7855'; ctx.fillRect(200, 0, 50, 50); ctx.fillRect(150, 0, 50, 50); ctx.fillRect(250, 0, 50, 50); ctx.fillRect(200, 50, 50, 50);
    ctx.fillRect(400, 150, 50, 50); ctx.fillRect(400, 200, 50, 50); ctx.fillRect(400, 250, 50, 50); ctx.fillRect(350, 200, 50, 50); ctx.fillRect(150, 400, 50, 50);
    ctx.fillRect(200, 400, 50, 50); ctx.fillRect(250, 400, 50, 50); ctx.fillRect(200, 350, 50, 50); ctx.fillRect(0, 150, 50, 50);
    ctx.fillRect(0, 200, 50, 50); ctx.fillRect(0, 250, 50, 50); ctx.fillRect(50, 200, 50, 50);
// lines for gameboard
    ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(50, 450);ctx.stroke();

    ctx.beginPath();ctx.moveTo(100, 0);ctx.lineTo(100, 450);ctx.stroke();

    ctx.beginPath();ctx.moveTo(150, 0);ctx.lineTo(150, 450);ctx.stroke();

    ctx.beginPath();ctx.moveTo(200, 0);ctx.lineTo(200, 450);ctx.stroke();

    ctx.beginPath();ctx.moveTo(250, 0);ctx.lineTo(250, 450);ctx.stroke();

    ctx.beginPath();ctx.moveTo(300, 0);ctx.lineTo(300, 450);ctx.stroke();

    ctx.beginPath();ctx.moveTo(350, 0);ctx.lineTo(350, 450);ctx.stroke();

    ctx.beginPath();ctx.moveTo(400, 0);ctx.lineTo(400, 450);ctx.stroke();

    ctx.beginPath();ctx.moveTo(0, 50);ctx.lineTo(450, 50);ctx.stroke();

    ctx.beginPath();ctx.moveTo(0, 100);ctx.lineTo(450, 100);ctx.stroke();

    ctx.beginPath();ctx.moveTo(0, 150);ctx.lineTo(450, 150);ctx.stroke();

    ctx.beginPath();ctx.moveTo(0, 200);ctx.lineTo(450, 200);ctx.stroke();

    ctx.beginPath();ctx.moveTo(0, 250);ctx.lineTo(450, 250);ctx.stroke();

    ctx.beginPath();ctx.moveTo(0, 300);ctx.lineTo(450, 300);ctx.stroke();

    ctx.beginPath();ctx.moveTo(0, 350);ctx.lineTo(450, 350);ctx.stroke();

    ctx.beginPath();ctx.moveTo(0, 400);ctx.lineTo(450, 400);ctx.stroke();

    ctx.beginPath();ctx.moveTo(0, 450);ctx.lineTo(450, 450);ctx.stroke();
};

function checkAttackerDeath(left, right, north, bottom, attacker, index) {
        // console.log('left:', left, 'right:', right, 'north:', north, 'bottom:', bottom, attacker, 'check attacker death', 'index:', index)
        if (left && right) { 
            console.log('left:', left, 'right:', right)
            return attacker.death();
        }
        
        if (north && bottom) {attacker.death()}
    
}

function checkDefenderDeath(left, right, north, bottom, defender, index) {  
    console.log(index, "i killed a defender")  
    if (index == 0) {
        // console.log(index, 'my target')
        if (left && right) {defender.alive}
        if (north && bottom) {defender.alive}
        if (left && right && bottom && north) {defender.alive = false; defender.death();}
    } else {
        // console.log(index, 'not my target')
        if (left && right) {defender.death()}
        if (north && bottom) {defender.death()}
    };
};

function checkPlayerProximity() {
    /*nested arrays for piece deaths; if the defenders, for each defender, if in these positions they return true
returning true then satisfies the death conditions and sound effect. 
*/
console.log('checkplayerproximity function')
if (!playerIndex) {
    defenderArray.forEach((defender, idx) => {
        north = false;
        bottom = false;
        right = false;
        left = false;
        // console.log(defender, index, 'this is the defender piece')
        attackerArray.forEach((attacker, index) => {
            console.log(index, north, left, right, bottom, idx)
            if (defender.x == attacker.x + attacker.width &&
                defender.x + defender.height == attacker.x + attacker.width + attacker.height &&
                defender.y == attacker.y) {
                left = true;
            };
            if (defender.x + defender.width == attacker.x &&
                defender.x + defender.width + defender.height == attacker.x + attacker.height &&
                defender.y == attacker.y) {
                right = true;
            };
            if (defender.y == attacker.y + attacker.height &&
                defender.y + defender.width == attacker.y + attacker.height + attacker.width &&
                defender.x == attacker.x) {
                north = true;
            };
            if (defender.y + defender.height == attacker.y &&
                defender.y + defender.width + defender.height == attacker.y + attacker.width &&
                defender.x == attacker.x) {
                bottom = true;
            };

            checkDefenderDeath(left, right, north, bottom, defender, index)
        });
    })
} else {
    attackerArray.forEach(attacker => {
        // console.log(attacker, 'checking this attacker')
        north = false;
        bottom = false;
        right = false;
        left = false;
        defenderArray.forEach((defender, index) => {
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
                north = true;
            }
            if (attacker.y + attacker.height == defender.y &&
                attacker.y + attacker.width + attacker.height == defender.y + defender.width &&
                attacker.x == defender.x) {
                bottom = true;
            }
            checkAttackerDeath(left, right, north, bottom, attacker)
        })
    })
}
}

function renderLivingPlayers() {
    // if characters are alive, then they are rendered. if not, no more rendering and the x,y position is changed to eliminate a post-death bug
   for (pieceArray of playerArray) {
        for (viking of pieceArray) {
            if (viking.alive)  {
                viking.render()   
            } 
        };
    };
}
let gameLoop = () => {
    renderBoard();
    renderLivingPlayers();
  
//death conditions for the king trigger the win for the attackers
    detectKingDeath()
}
// let deathBtn = document.getElementById("turns").addEventListener('click', checkDefenderDeath();
//initialize game
let gameInterval = setInterval(gameLoop, 100)