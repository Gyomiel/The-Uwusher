// Canvas context through DOM:

const canvas = document.getElementById("gameCanvas");

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
  if (playerOne.health > 0 || playerTwo.health > 0) {
    playerOne.moveTheHeroHorizontally();
    playerTwo.moveTheAntagonistHorizontally();
  } else {
    gameOver();
  }
}

// Inserting the hero (player one):

function newHero() {
  playerOne = new Hero(20, 400);
  playerOne.insertHero();
  moveHeroInterval = setInterval(function () {
    stillAlive();
  }, 10);
}

// Inserting the antagonist (player two):

function newAntagonist() {
  playerTwo = new Antagonist(1580, 395);
  playerTwo.insertAntagonist();
  moveAntagonistInterval = setInterval(function () {
    stillAlive();
  }, 10);
}

startGame();

// Game over:

function gameOver() {
  clearInterval(moveHeroInterval);
  playerOne.checkingIfTheyDie();
  clearInterval(moveAntagonistInterval);
  playerTwo.checkingIfTheyDie();
}

function updateTheGame() {
  playerOne.gravityOnJump();
  playerTwo.gravityOnJump();
  playerOne.moveTheHeroHorizontally();
  playerTwo.moveTheAntagonistHorizontally();

  requestAnimationFrame(updateTheGame);
}

// Add event listeners for keyboard control:

window.addEventListener("keydown", function (e) {
  switch (e.key.toLowerCase()) {
    case "a":
      playerOne.directionX = -1;
      playerOne.previousDirection = -1;
      playerOne.checkCollisions();
      playerOne.moveTheHeroHorizontally();
      playerOne.sprite.style.backgroundImage =
        "url('/imgs/sprites/yurei/yureiRunReverse.gif')";
      break;
    case "d":
      playerOne.directionX = 1;
      playerOne.previousDirection = 1;
      playerOne.checkCollisions();
      playerOne.moveTheHeroHorizontally();
      playerOne.sprite.style.backgroundImage =
        "url('/imgs/sprites/yurei/yureiRun.gif')";
      break;
    case "w":
      playerOne.checkCollisions();
      playerOne.jumping();
      playerOne.sprite.style.backgroundImage =
        playerOne.directionX === -1
          ? "url('/imgs/sprites/yurei/yureiJumpReverse.gif')"
          : "url('/imgs/sprites/yurei/yureiJump.gif')";
      playerOne.sprite.style.backgroundImage =
        playerOne.previousDirection === -1
          ? "url('/imgs/sprites/yurei/yureiJumpReverse.gif')"
          : "url('/imgs/sprites/yurei/yureiJump.gif')";
      break;
    case " ":
      playerOne.playerMeleeAttack();
      playerOne.sprite.style.backgroundImage =
        playerOne.directionX === -1
          ? "url('/imgs/sprites/yurei/yureiMeleeAttackReverse.gif')"
          : "url('/imgs/sprites/yurei/yureiMeleeAttack.gif')";
      playerOne.sprite.style.backgroundImage =
        playerOne.previousDirection === -1
          ? "url('/imgs/sprites/yurei/yureiMeleeAttackReverse.gif')"
          : "url('/imgs/sprites/yurei/yureiMeleeAttack.gif')";
  }
});

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft":
      playerTwo.directionX = -1;
      playerTwo.previousDirection = -1;
      playerTwo.checkCollisions();
      playerTwo.moveTheAntagonistHorizontally();
      playerTwo.sprite.style.backgroundImage =
        "url('imgs/sprites/onre/onreRunReverse.gif')";
      break;
    case "ArrowRight":
      playerTwo.directionX = 1;
      playerTwo.previousDirection = 1;
      playerTwo.checkCollisions();
      playerTwo.moveTheAntagonistHorizontally();
      playerTwo.sprite.style.backgroundImage =
        "url('imgs/sprites/onre/onreRun.gif')";
      break;
    case "ArrowUp":
      playerTwo.checkCollisions();
      playerTwo.jumping();
      playerTwo.sprite.style.backgroundImage =
        playerTwo.directionX === -1
          ? "url('/imgs/sprites/onre/onreJumpReverse.gif')"
          : "url('/imgs/sprites/onre/onreJump.gif')";
      playerTwo.sprite.style.backgroundImage =
        playerTwo.previousDirection === -1
          ? "url('/imgs/sprites/onre/onreJumpReverse.gif')"
          : "url('/imgs/sprites/onre/onreJump.gif')";
      break;
    case "ArrowDown":
      playerTwo.playerMeleeAttack();
      playerTwo.sprite.style.backgroundImage =
        playerTwo.directionX === -1
          ? "url('/imgs/sprites/onre/onreMeleeAttackReverse.gif')"
          : "url('/imgs/sprites/onre/onreMeleeAttack.gif')";
      playerTwo.sprite.style.backgroundImage =
        playerTwo.previousDirection === -1
          ? "url('/imgs/sprites/onre/onreMeleeAttackReverse.gif')"
          : "url('/imgs/sprites/onre/onreMeleeAttack.gif')";
  }
});

window.addEventListener("keyup", function (e) {
  if (e.key.toLowerCase() === "a") {
    playerOne.directionX = 0;
    playerOne.sprite.style.backgroundImage =
      "url('/imgs/sprites/yurei/yureiIdleReverse.gif')";
  }
  if (e.key.toLowerCase() === "d") {
    playerOne.directionX = 0;
    playerOne.sprite.style.backgroundImage =
      "url('/imgs/sprites/yurei/yureiIdle.gif')";
  }
  if (e.key.toLowerCase() === "w") {
    playerOne.directionX = 0;
    playerOne.sprite.style.backgroundImage =
      playerOne.previousDirection === -1
        ? "url('/imgs/sprites/yurei/yureiIdleReverse.gif')"
        : "url('/imgs/sprites/yurei/yureiIdle.gif')";
  }

  if (e.key === " ") {
    playerOne.directionX = 0;
    playerOne.sprite.style.backgroundImage =
      playerOne.previousDirection === -1
        ? "url('/imgs/sprites/yurei/yureiIdleReverse.gif')"
        : "url('/imgs/sprites/yurei/yureiIdle.gif')";
  }
});

window.addEventListener("keyup", function (e) {
  if (e.key === "ArrowLeft") {
    playerTwo.directionX = 0;
    playerTwo.sprite.style.backgroundImage =
      "url('/imgs/sprites/onre/onreIdleReverse.gif')";
  }
  if (e.key === "ArrowRight") {
    playerTwo.directionX = 0;
    playerTwo.sprite.style.backgroundImage =
      "url('/imgs/sprites/onre/onreIdle.gif')";
  }

  if (e.key === "ArrowUp") {
    playerTwo.directionX = 0;
    playerTwo.sprite.style.backgroundImage =
      playerTwo.previousDirection === -1
        ? "url('/imgs/sprites/onre/onreIdleReverse.gif')"
        : "url('/imgs/sprites/onre/onreIdle.gif')";
  }

  if (e.key === "ArrowDown") {
    playerTwo.directionX = 0;
    playerTwo.sprite.style.backgroundImage =
      playerTwo.previousDirection === -1
        ? "url('/imgs/sprites/onre/onreIdleReverse.gif')"
        : "url('/imgs/sprites/onre/onreIdle.gif')";
  }
});

updateTheGame();
