// Canvas context through DOM:

const canvas = document.getElementById('gameCanvas');

// Necessary variables:

let playerOne;
let moveHeroInterval;
let start = document.getElementById('btn-start');
let restart = document.getElementById('btn-restart')
let playerTwo;
let moveAntagonistInterval;
let powerUp;

// Starting the game:

function startGame() {
  newHero();
  newAntagonist();
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
  if (!powerUp) { // Solo crea un power-up si no hay uno en pantalla
    const x = Math.random() * (window.innerWidth - 30); // Generar posición x aleatoria
    powerUp = new PowerUp(x, 0); // Posición y inicial en 0
}
} 
 



function updatePowerUps() {
  if (powerUp) {
    powerUp.fall(2); // Hacer que el power-up caiga con velocidad 2

    // Verificar si el power-up ha salido de la pantalla
    if (powerUp.y > window.innerHeight) {
        powerUp = null; // Eliminar el power-up si sale de la pantalla
    }
}

}

// Game over:

function gameOver() {
  clearInterval(moveHeroInterval);
  playerOne.removeHero();
  clearInterval(moveAntagonistInterval);
  playerTwo.removeAntagonist();
}

function updateTheGame() {
  playerOne.gravityOnJump();
  playerTwo.gravityOnJump();
  playerOne.moveTheHeroHorizontally();
  playerTwo.moveTheAntagonistHorizontally();
  spawnPowerUp()
  updatePowerUps()
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

start.addEventListener('click', function(event){
  startGame()
})

restart.addEventListener('click', function(event) {
restartGame()
})


