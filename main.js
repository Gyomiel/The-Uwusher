// Canvas context through DOM:

const canvas = document.getElementById('gameCanvas');

let playerOne;
let playerTwo;
let moveHeroInterval;
let moveAntagonistInterval;

function startGame() {
  newHero();
  newAntagonist();
}

function stillAlive() {
  if (playerOne.health > 0 && playerTwo.health > 0) {
    playerOne.moveTheHeroHorizontally();
    playerTwo.moveTheAntagonistHorizontally();
  } else {
    //
  }
}

function newHero() {
  playerOne = new Hero(0, 690);
  playerOne.insertHero();
  moveHeroInterval = setInterval(function () {
    stillAlive();
  }, 100);
}

function newAntagonist() {
  playerTwo = new Antagonist(1640, 690);
  playerTwo.insertAntagonist();
  moveAntagonistInterval = setInterval(function () {
    stillAlive();
  }, 100);
}

startGame();

function gameOver() {
  clearInterval(moveHeroInterval);
  playerOne.removeHero();
  clearInterval(moveAntagonistInterval);
  playerTwo.removeAntagonist();
}

window.addEventListener('keydown', function (e) {
  switch (e.key.toLowerCase()) {
    case 'a':
      playerOne.directionX = -1;
      playerOne.moveTheHeroHorizontally();
      break;
    case 'd':
      playerOne.directionX = 1;
      playerOne.moveTheHeroHorizontally();
      console.log(playerOne)
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
