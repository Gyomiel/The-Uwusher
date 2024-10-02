// Canvas context through DOM:

let canvas = document.getElementById('gameCanvas');

// Necessary variables:

let playerOne;
let moveHeroInterval;
let startButton = document.getElementById('btn-start');
let restartButton = document.getElementById('btn-restart')
let playerTwo;
let moveAntagonistInterval;
let powerUp;
let startScreen = document.getElementById('start')
let restartScreen = document.getElementById('restart')


// Starting the game:

function startGame() {
  
  newHero();
  newAntagonist();
  setInterval(function() {
    spawnPowerUp(); 
  }, 15000); 
  updateTheGame();
  
  console.log(powerUp)
}

// If the characters are still alive, the game goes on:

function stillAlive() {
  if (playerOne.health > 0 && playerTwo.health > 0) {
    playerOne.moveTheHeroHorizontally();
    playerTwo.moveTheAntagonistHorizontally();
  } else {
    gameOver();
  }
}

// Inserting the hero (player one):

function newHero() {
  playerOne = new Hero(0, 400);
  playerOne.insertHero();
  moveHeroInterval = setInterval(function () {
    stillAlive();
  }, 10);
}

// Inserting the antagonist (player two):

function newAntagonist() {
  playerTwo = new Antagonist(1620, 400);
  playerTwo.insertAntagonist();
  moveAntagonistInterval = setInterval(function () {
    stillAlive();
  }, 10);
}

//Power ups

function spawnPowerUp() {
  if (!powerUp) { 
    const x = Math.random() * (window.innerWidth - 30); 
    powerUp = new PowerUp(x); 
    
    setTimeout(function() {
      if (powerUp) {
        powerUp.sprite.style.display = 'none'; 
        powerUp = null; 
      }
    }, 5000);
  }
} 
 



function updatePowerUps() {

  if (powerUp) {
    powerUp.fall(2); 
    
  }
    
    if (powerUp.y > 750) {
      powerUp = null; 
    }

}

// Game over:

function gameOver() {
  clearInterval(moveHeroInterval);
  playerOne.removeHero();
  clearInterval(moveAntagonistInterval);
  playerTwo.removeAntagonist();
  restartScreen.style.display = 'block'
}

function updateTheGame() {
  playerOne.gravityOnJump();
  playerTwo.gravityOnJump();
  playerOne.moveTheHeroHorizontally();
  playerTwo.moveTheAntagonistHorizontally();
  updatePowerUps();
  requestAnimationFrame(updateTheGame);
}

function restartGame() {
 
  canvas.innerHTML = ''; 
  
  playerOne = null;
  playerTwo = null;
  powerUp = null;

  
  clearInterval(moveHeroInterval);
  clearInterval(moveAntagonistInterval);

  
}
  


// Add event listeners for keyboard control:

window.addEventListener('keydown', function (e) {
  switch (e.key.toLowerCase()) {
    case 'a':
      playerOne.directionX = -1;
      playerOne.moveTheHeroHorizontally();
      break;
    case 'd':
      playerOne.directionX = 1;
      playerOne.moveTheHeroHorizontally();
      break;
    case 'w':
      playerOne.jumping();
      break;
  }
});

window.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'ArrowLeft':
      playerTwo.directionX = -1;
      playerTwo.moveTheAntagonistHorizontally();
      break;
    case 'ArrowRight':
      playerTwo.directionX = 1;
      playerTwo.moveTheAntagonistHorizontally();
      break;
    case 'ArrowUp':
      playerTwo.jumping();
      break;
  }
});

window.addEventListener('keyup', function (e) {
  if (e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 'd') {
    playerOne.directionX = 0;
  }
});

window.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    playerTwo.directionX = 0;
  }
});

startButton.addEventListener('click', function(event){
  startGame()
  canvas.style.display = 'block'
  startScreen.style.display = 'none'


})

restartButton.addEventListener('click', function(event) {
restartGame()
startScreen.style.display = 'none'

})


