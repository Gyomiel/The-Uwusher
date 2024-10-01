// Canvas context through DOM:

const canvas = document.getElementById('gameCanvas');

// Necessary variables:

let playerOne;
let moveHeroInterval;

let playerTwo;
let moveAntagonistInterval;

let enemy;
let enemies = [];
let enemiesSpawningInterval;

let platform;

// Starting the game:

function startGame() {
  newHero();
  newAntagonist();
  newEnemy();
  newPlatform();
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
  playerOne = new Hero(0, 690);
  playerOne.insertHero();
  moveHeroInterval = setInterval(function () {
    stillAlive();
  }, 10);
}

// Inserting the antagonist (player two):

function newAntagonist() {
  playerTwo = new Antagonist(1640, 690);
  playerTwo.insertAntagonist();
  moveAntagonistInterval = setInterval(function () {
    stillAlive();
  }, 10);
}

function newEnemy() {
  enemiesSpawningInterval = setInterval(function () {
    enemy = new Enemy(0, 0);
    enemy.insertEnemy();
    enemies.push(enemy)
  }, 5000);
}

function newPlatform() {
  platform = new Platform(200, 650, 60, 30);
  platform.insertPlatform();
}

startGame();

// Game over:

function gameOver() {
  clearInterval(moveHeroInterval);
  playerOne.removeHero();
  clearInterval(moveAntagonistInterval);
  playerTwo.removeAntagonist();
  enemies.forEach(function(enemy) {
    enemy.removeEnemy();
  })
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
      playerOne.moveTheHeroHorizontally();
      platform.checkCollisions();
      break;
    case 'd':
      playerOne.directionX = 1;
      playerOne.moveTheHeroHorizontally();
      platform.checkCollisions();
      break;
    case 'w':
      playerOne.jumping();
      platform.checkCollisions();
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

updateTheGame();
