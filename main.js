// Canvas context through DOM:

const canvas = document.getElementById('gameCanvas');

// Necessary variables:

let playerOne;
let moveHeroInterval;

let playerTwo;
let moveAntagonistInterval;

// Starting the game:

function startGame() {
  newHero();
  newAntagonist();
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

startGame();

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

  requestAnimationFrame(updateTheGame);
}

// Add event listeners for keyboard control:

window.addEventListener('keydown', function (e) {
  switch (e.key.toLowerCase()) {
    case 'a':
      playerOne.directionX = -1;
      playerOne.previousDirection = -1;
      playerOne.checkCollisions();
      playerOne.moveTheHeroHorizontally();
      break;
    case 'd':
      playerOne.directionX = 1;
      playerOne.previousDirection = 1;
      playerOne.checkCollisions();
      playerOne.moveTheHeroHorizontally();
      break;
    case 'w':
      playerOne.checkCollisions();
      playerOne.jumping();
      break;
    case ' ':
      playerOne.playerMeleeAttack();
  }
});

window.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'ArrowLeft':
      playerTwo.directionX = -1;
      playerTwo.previousDirection = -1;
      playerTwo.checkCollisions();
      playerTwo.moveTheAntagonistHorizontally();
      break;
    case 'ArrowRight':
      playerTwo.directionX = 1;
      playerTwo.previousDirection = 1;
      playerTwo.checkCollisions();
      playerTwo.moveTheAntagonistHorizontally();
      break;
    case 'ArrowUp':
      playerTwo.checkCollisions();
      playerTwo.jumping();
      break;
    case 'ArrowDown':
      playerTwo.playerMeleeAttack();
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

updateTheGame();
