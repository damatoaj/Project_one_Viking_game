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
}

//king
let king = new Crawler(200, 200, 50, 50, '#6b6f78')
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

//movement
let movement = 50;

let defendersWin = () => {
    victoryDisplay.innerText = "Defenders Win!!!"
}

let attackersWin = () => {
    victoryDisplay.innerText = "Attackers Win!!!"
}

let detectCornerKing = () => {
    if (
        (king.x == 0 && king.y == 0) ||
        (king.x == 0 && king.y == 400) ||
        (king.x == 400 && king.y == 0) ||
        (king.x == 400 && king.y == 400)
    ) {
        defendersWin()
        // console.log('victory')
    }
}

// let checkForVictory = () => {
//     detectCornerKing()
//     detectKingDeath()
//     console.log('victory')
// }

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
let turnButton = document.getElementById("turns").addEventListener('click', switchPlayer)//switch between players


//change who the current piece is

let changePiece = (e) => {
    if(e.which == '32') {
        currentPiece++
        let previousPiece = currentPiece - 1;
        e.preventDefault()
       console.log(selectPlayer)
       console.log(selectPlayer[currentPiece], "howdy")
       console.log('previousPiece', previousPiece)
       currentDirection = false;
       selectPlayer[currentPiece].color = 'yellow';
        console.log(selectPlayer[currentPiece], 'what')

        if (!playerIndex) { //selects defenderArray
            if (previousPiece == 0) {
                selectPlayer[previousPiece].color = '#6b6f78';
             } else if (previousPiece >= 1) {
               selectPlayer[previousPiece].color = '#e4e7ed';
            } else {selectPlayer[previousPiece].color = 'black';}
        } 
        if (playerIndex) { //selects attackerArray
            if (previousPiece >= 0) {
            selectPlayer[previousPiece].color = '#964b4a';
            }
        }
    } 
}
document.addEventListener('keydown', changePiece)

//move my current piece based on the key pressed.
//passive movement in the game loop, active movement in the movement handler
let move = (e) => {

    if (e.key === 'w' && currentDirection === false || currentDirection === 'w') { //move up
        currentDirection = 'w' 
         if(selectPlayer[currentPiece].y - movement >= min_height) {
                selectPlayer[currentPiece].y -= movement
        } 
      
        defenderArray.forEach(defender => {
            if (defender.alive) {
                if (!Object.is(selectPlayer[currentPiece], defender)) {
                    if(selectPlayer[currentPiece].y === defender.y &&
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].y = defender.y + defender.height
                        console.log('my current piece hit a defender')
                    }    
                }
            }    
         })      
            
        attackerArray.forEach(attacker => {
            if(attacker.alive) {
                if(!Object.is(selectPlayer[currentPiece], attacker)) {
                    if(selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].y = attacker.y + attacker.height
                        console.log('my piece hit an attacker')
                    } 
                }
            }
        })   
     
    } else if (e.key === 'a' && currentDirection === false || currentDirection === 'a') { //move left
        currentDirection = 'a'
      if (selectPlayer[currentPiece].x - movement >= min_height) {
        selectPlayer[currentPiece].x -= movement
        }    
      
        defenderArray.forEach(defender => {
            if(defender.alive) {
                if(!Object.is(selectPlayer[currentPiece], defender)) {
                if(selectPlayer[currentPiece].y === defender.y &&
                     selectPlayer[currentPiece].x === defender.x) {
                     selectPlayer[currentPiece].x = defender.x + defender.width
                } 
                }
            }    
         })      
            
        attackerArray.forEach(attacker => {
            if(attacker.alive) {
                if(!Object.is(selectPlayer[currentPiece], attacker)) {
                    if(selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].x = attacker.x + attacker.width
                    } 
                }
            }
        })         
   
    } else if (e.key === 's' && currentDirection === false || currentDirection === 's') { //move down
        currentDirection = 's'
        if(selectPlayer[currentPiece].y + movement <=max_height) {
            selectPlayer[currentPiece].y += movement    
        }
      
        defenderArray.forEach(defender => {
            if (defender.alive) {
                if(!Object.is(selectPlayer[currentPiece], defender)) {
                    if(selectPlayer[currentPiece].y === defender.y &&
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].y = defender.y - defender.height
                    } 
                }
            }       
         })
      
            
        attackerArray.forEach(attacker => {
            if (attacker.alive) {
                if(!Object.is(selectPlayer[currentPiece], attacker)) {
                    if(selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].y = attacker.y - attacker.height
                    } 
                }
            }
        })         
    } else if (e.key === 'd' && currentDirection === false || currentDirection === 'd') { //move right
        currentDirection = 'd'
        if(selectPlayer[currentPiece].x + movement <= max_width) {
            selectPlayer[currentPiece].x += movement    
        }
      
        defenderArray.forEach(defender => {
            if (defender.alive) {
                if(!Object.is(selectPlayer[currentPiece], defender)) {
                    if(selectPlayer[currentPiece].y === defender.y &&
                        selectPlayer[currentPiece].x === defender.x) {
                        selectPlayer[currentPiece].x = defender.x - defender.width
                    } 
                }
            }    
         })      
            
        attackerArray.forEach(attacker => {
            if (attacker.alive) {
                if(!Object.is(selectPlayer[currentPiece], attacker)) {
                    if(selectPlayer[currentPiece].y === attacker.y &&
                        selectPlayer[currentPiece].x === attacker.x) {
                        selectPlayer[currentPiece].x = attacker.x - attacker.width
                    } 
                }
            } 
        }) 
    }  
    detectCornerKing()
    // detectKingDeath()
} 
        console.log(`x: ${selectPlayer[currentPiece].x}, y: ${selectPlayer[currentPiece].y}`)// 
     


//set listener event for key down
document.addEventListener('keydown', move)

//gameloop
let gameLoop = () => {
    // checkForVictory
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //render board


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

if (playerIndex) {
    defenderArray.forEach ((defender, index) => {
        let top = false;
        let bottom = false;
        let right = false;
        let left = false
        attackerArray.forEach (attacker => {
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
            if (left && right) {defender.alive}
            if (top && bottom) {defender.alive}
            if (left && right && bottom && top) {defender.alive = false}
        } else {
            if (left && right) {defender.alive = false}
            if (top && bottom) {defender.alive = false}
        }
    })
}
if (!playerIndex) {
    attackerArray.forEach (attacker => {
        let top = false;
        let bottom = false;
        let right = false;
        let left = false
        defenderArray.forEach (defender => {
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
        if (left && right) {attacker.alive = false}
        if (top && bottom) {attacker.alive = false}
    })
}
    // if characters if alive
    if (king.alive) {
        king.render()
    }
    if (defender1.alive) {
        defender1.render()
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
    
    let attackersWin = () => {
        victoryDisplay.innerText = "Attackers Win!!!"
    }
    
    let detectKingDeath = () => {
        if (!king.alive) {
            attackersWin()
            }
        }
    detectKingDeath ()

}

//initialize game
let gameInterval = setInterval(gameLoop, 100)
