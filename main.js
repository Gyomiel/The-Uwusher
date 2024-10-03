// Canvas context through DOM:

const canvas = document.getElementById("gameCanvas");
const gameContainer = document.getElementById("gameContainer");
const healthBarP1 = document.getElementById("playerOneHB");
const healthBarP2 = document.getElementById("playerTwoHB");
let playerOneName = document.getElementById("playerOneName");
let playerTwoName = document.getElementById("playerTwoName");
const choosePlayerOne = document.getElementById("selectionCharacterScreen");
const choosePlayerTwo = document.getElementById("selectionCharacterScreen2");
const firstScreenCharas = document.getElementsByClassName("firstScreenCharas");
const secondScreenCharas =
  document.getElementsByClassName("secondScreenCharas");

// Audios:

let startAudio;
(function startScreenAudio() {
  startAudio = new Audio(`sounds/startScreenAudio.mp3`);
  startAudio.play();
})();

let chooseAudio;
function chooseFighterAudio() {
  chooseAudio = new Audio(`sounds/chooseFighterAudio.mp3`);
  chooseAudio.play();
}

// Necessary variables:

let playersArray = [];

let playerOne;
let moveHeroInterval;
let selectPlayerOne = "yurei";

let playerTwo;
let moveAntagonistInterval;
let selectPlayerTwo = "kitsune";

let powerUp;
let healthRecovery;
let powerUpInterval;

let startButton = document.getElementById("btn-start");
let restartButton = document.getElementById("btn-restart");
let startScreen = document.getElementById("start");
let restartScreen = document.getElementById("restart");

// Starting the game:

let battleScreenAudio;

function startGame() {
  newHero();
  newAntagonist();
  chooseAudio.pause();
  battleScreenAudio = new Audio(`sounds/battleScreenAudio.mp3`);
  battleScreenAudio.play();
  powerUpInterval = setInterval(function () {
    spawnPowerUp();
  }, 100);
  gameContainer.style.display = "block";
  updateTheGame();
}

// If the characters are still alive, the game goes on:

function stillAlive() {
  if (playerOne.health > 0 || playerTwo.health > 0) {
    playerOne.moveTheHeroHorizontally();
    playerTwo.moveTheAntagonistHorizontally();
  }

  if (playerOne.health <= 0 || playerTwo.health <= 0) {
    gameOver(playerOne.health > 0 ? playerOne : playerTwo);
  }
}

// Inserting the hero (player one):

function newHero() {
  playerOne = new Hero(50, 395, selectPlayerOne);
  playerOne.insertHero();
  playersArray.push(playerOne);
  moveHeroInterval = setInterval(function () {
    stillAlive();
  }, 10);
}

// Inserting the antagonist (player two):

function newAntagonist() {
  playerTwo = new Antagonist(1550, 395, selectPlayerTwo);
  playerTwo.insertAntagonist();
  playersArray.push(playerTwo);
  moveAntagonistInterval = setInterval(function () {
    stillAlive();
  }, 10);
}

// Power ups:

function spawnPowerUp() {
  if (!powerUp && !healthRecovery) {
    const x = Math.random() * (1750 - 50);
    const type = Math.floor(Math.random() * 2);
    if (type === 0) {
      powerUp = new PowerUp(x);
    } else {
      healthRecovery = new HealthRecovery(x);
    }
  }
}

function updatePowerUps() {
  if (powerUp) {
    powerUp.fall(2);

    if (powerUp.y > 720) {
      powerUp.sprite.remove();
      powerUp = null;
    } else {
      powerUp.checkCollisions();
    }
  }
  if (healthRecovery) {
    healthRecovery.fall(2);
    if (healthRecovery.y > 720) {
      healthRecovery.sprite.remove();
      healthRecovery = null;
    } else {
      healthRecovery.checkCollisions();
    }
  }
}

// Game over:

let restartScreenAudio;
const outputMessage = document.getElementById("outputMessage");

function gameOver(winner) {
  clearInterval(moveHeroInterval);
  playerOne.removeHero();
  clearInterval(moveAntagonistInterval);
  clearInterval(powerUpInterval);
  playerTwo.removeAntagonist();
  battleScreenAudio.pause();
  restartScreenAudio = new Audio(`sounds/restartScreenAudio.mp3`);
  restartScreenAudio.play();
  gameContainer.style.display = "none";
  restartScreen.style.display = "block";
  outputMessage.innerText = `${
    winner.type[0].toUpperCase() + winner.type.slice(1)
  } won the battle!`;
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
  healthBarP1.value = 600;
  healthBarP2.value = 600;
  clearInterval(moveHeroInterval);
  clearInterval(powerUpInterval);
  clearInterval(moveAntagonistInterval);
  window.location.reload();
}

// Add event listeners for keyboard control:

window.addEventListener("keydown", function (e) {
  switch (e.key.toLowerCase()) {
    case "a":
      playerOne.directionX = -1;
      playerOne.previousDirection = -1;
      playerOne.checkCollisions();
      playerOne.moveTheHeroHorizontally();
      playerOne.sprite.style.backgroundImage = `url('/imgs/sprites/${playerOne.type}/RunReverse.gif')`;
      break;
    case "d":
      playerOne.directionX = 1;
      playerOne.previousDirection = 1;
      playerOne.checkCollisions();
      playerOne.moveTheHeroHorizontally();
      playerOne.sprite.style.backgroundImage = `url('/imgs/sprites/${playerOne.type}/Run.gif')`;
      break;
    case "w":
      playerOne.checkCollisions();
      playerOne.jumping();
      playerOne.sprite.style.backgroundImage =
        playerOne.directionX === -1
          ? `url('/imgs/sprites/${playerOne.type}/JumpReverse.gif')`
          : `url('/imgs/sprites/${playerOne.type}/Jump.gif')`;
      playerOne.sprite.style.backgroundImage =
        playerOne.previousDirection === -1
          ? `url('/imgs/sprites/${playerOne.type}/JumpReverse.gif')`
          : `url('/imgs/sprites/${playerOne.type}/Jump.gif')`;
      break;
    case " ":
      playerOne.playerMeleeAttack();
      playerOne.sprite.style.backgroundImage =
        playerOne.directionX === -1
          ? `url('/imgs/sprites/${playerOne.type}/MeleeAttackReverse.gif')`
          : `url('/imgs/sprites/${playerOne.type}/MeleeAttack.gif')`;
      playerOne.sprite.style.backgroundImage =
        playerOne.previousDirection === -1
          ? `url('/imgs/sprites/${playerOne.type}/MeleeAttackReverse.gif')`
          : `url('/imgs/sprites/${playerOne.type}/MeleeAttack.gif')`;
      break;
    case "f":
      if (playerOne.spellCounter < 1) {
        playerOne.spellCounter++;
        playerOne.playerDistanceAttack();
        playerOne.sprite.style.backgroundImage =
          playerOne.directionX === -1
            ? `url('./imgs/sprites/${playerOne.type}/SpellReverse.gif')`
            : `url('./imgs/sprites/${playerOne.type}/Spell.gif')`;
        playerOne.sprite.style.backgroundImage =
          playerOne.previousDirection === -1
            ? `url('./imgs/sprites/${playerOne.type}/SpellReverse.gif')`
            : `url('./imgs/sprites/${playerOne.type}/Spell.gif')`;
        break;
      }
  }
});

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft":
      playerTwo.directionX = -1;
      playerTwo.previousDirection = -1;
      playerTwo.checkCollisions();
      playerTwo.moveTheAntagonistHorizontally();
      playerTwo.sprite.style.backgroundImage = `url('imgs/sprites/${playerTwo.type}/RunReverse.gif')`;
      break;
    case "ArrowRight":
      playerTwo.directionX = 1;
      playerTwo.previousDirection = 1;
      playerTwo.checkCollisions();
      playerTwo.moveTheAntagonistHorizontally();
      playerTwo.sprite.style.backgroundImage = `url('imgs/sprites/${playerTwo.type}/Run.gif')`;
      break;
    case "ArrowUp":
      playerTwo.checkCollisions();
      playerTwo.jumping();
      playerTwo.sprite.style.backgroundImage =
        playerTwo.directionX === -1
          ? `url('/imgs/sprites/${playerTwo.type}/JumpReverse.gif')`
          : `url('/imgs/sprites/${playerTwo.type}/Jump.gif')`;
      playerTwo.sprite.style.backgroundImage =
        playerTwo.previousDirection === -1
          ? `url('/imgs/sprites/${playerTwo.type}/JumpReverse.gif')`
          : `url('/imgs/sprites/${playerTwo.type}/Jump.gif')`;
      break;
    case "ArrowDown":
      playerTwo.playerMeleeAttack();
      playerTwo.sprite.style.backgroundImage =
        playerTwo.directionX === -1
          ? `url('/imgs/sprites/${playerTwo.type}/MeleeAttackReverse.gif')`
          : `url('/imgs/sprites/${playerTwo.type}/MeleeAttack.gif')`;
      playerTwo.sprite.style.backgroundImage =
        playerTwo.previousDirection === -1
          ? `url('/imgs/sprites/${playerTwo.type}/MeleeAttackReverse.gif')`
          : `url('/imgs/sprites/${playerTwo.type}/MeleeAttack.gif')`;
      break;
    case "-":
      if (playerTwo.spellCounter < 1) {
        playerTwo.spellCounter++;
        playerTwo.playerDistanceAttack();
        playerTwo.sprite.style.backgroundImage =
          playerTwo.directionX === -1
            ? `url('./imgs/sprites/${playerTwo.type}/SpellReverse.gif')`
            : `url('./imgs/sprites/${playerTwo.type}/Spell.gif')`;
        playerTwo.sprite.style.backgroundImage =
          playerTwo.previousDirection === -1
            ? `url('./imgs/sprites/${playerTwo.type}/SpellReverse.gif')`
            : `url('./imgs/sprites/${playerTwo.type}/Spell.gif')`;
        break;
      }
  }
});

window.addEventListener("keyup", function (e) {
  if (e.key.toLowerCase() === "a") {
    playerOne.directionX = 0;
    playerOne.sprite.style.backgroundImage = `url('/imgs/sprites/${playerOne.type}/IdleReverse.gif')`;
  }
  if (e.key.toLowerCase() === "d") {
    playerOne.directionX = 0;
    playerOne.sprite.style.backgroundImage = `url('/imgs/sprites/${playerOne.type}/Idle.gif')`;
  }
  if (e.key.toLowerCase() === "w") {
    playerOne.directionX = 0;
    playerOne.sprite.style.backgroundImage =
      playerOne.previousDirection === -1
        ? `url('/imgs/sprites/${playerOne.type}/IdleReverse.gif')`
        : `url('/imgs/sprites/${playerOne.type}/Idle.gif')`;
  }
  if (e.key === " ") {
    playerOne.directionX = 0;
    playerOne.sprite.style.backgroundImage =
      playerOne.previousDirection === -1
        ? `url('/imgs/sprites/${playerOne.type}/IdleReverse.gif')`
        : `url('/imgs/sprites/${playerOne.type}/Idle.gif')`;
  }

  if (e.key.toLowerCase() === "f") {
    playerOne.directionX = 0;
    playerOne.sprite.style.backgroundImage =
      playerOne.previousDirection === -1
        ? `url('/imgs/sprites/${playerOne.type}/IdleReverse.gif')`
        : `url('/imgs/sprites/${playerOne.type}/Idle.gif')`;
  }
});

window.addEventListener("keyup", function (e) {
  if (e.key === "ArrowLeft") {
    playerTwo.directionX = 0;
    playerTwo.sprite.style.backgroundImage = `url('/imgs/sprites/${playerTwo.type}/IdleReverse.gif')`;
  }
  if (e.key === "ArrowRight") {
    playerTwo.directionX = 0;
    playerTwo.sprite.style.backgroundImage = `url('/imgs/sprites/${playerTwo.type}/Idle.gif')`;
  }

  if (e.key === "ArrowUp") {
    playerTwo.directionX = 0;
    playerTwo.sprite.style.backgroundImage =
      playerTwo.previousDirection === -1
        ? `url('/imgs/sprites/${playerTwo.type}/IdleReverse.gif')`
        : `url('/imgs/sprites/${playerTwo.type}/Idle.gif')`;
  }

  if (e.key === "ArrowDown") {
    playerTwo.directionX = 0;
    playerTwo.sprite.style.backgroundImage =
      playerTwo.previousDirection === -1
        ? `url('/imgs/sprites/${playerTwo.type}/IdleReverse.gif')`
        : `url('/imgs/sprites/${playerTwo.type}/Idle.gif')`;
  }

  if (e.key === "-") {
    playerTwo.directionX = 0;
    playerTwo.sprite.style.backgroundImage =
      playerTwo.previousDirection === -1
        ? `url('/imgs/sprites/${playerTwo.type}/IdleReverse.gif')`
        : `url('/imgs/sprites/${playerTwo.type}/Idle.gif')`;
  }
});

startButton.addEventListener("click", function (event) {
  canvas.style.display = "block";
  startScreen.style.display = "none";
  choosePlayerOne.style.display = "block";
  startAudio.pause();
  chooseFighterAudio();
});

restartButton.addEventListener("click", function (event) {
  restartGame();
  startScreen.style.display = "block";
  restartScreen.style.display = "none";
});

let charaIntroAudio;

function addOnClick(array) {
  let newArray = [...array];
  newArray.forEach(function (item) {
    item.addEventListener("click", function () {
      choosePlayerOne.style.display = "none";
      choosePlayerTwo.style.display = "block";
      selectPlayerOne = item.getAttribute("name");
      charaIntroAudio = new Audio(
        `imgs/sprites/${selectPlayerOne}/IntroSound.mp3`
      );
      charaIntroAudio.play();
      playerOneName.innerText =
        selectPlayerOne.charAt(0).toUpperCase() + selectPlayerOne.slice(1);
    });
  });
}

function addOnClickTwo(array) {
  let newArray = [...array];
  newArray.forEach(function (item) {
    item.addEventListener("click", function () {
      canvas.style.display = "block";
      choosePlayerTwo.style.display = "none";
      selectPlayerTwo = item.getAttribute("name");
      charaIntroAudio = new Audio(
        `imgs/sprites/${selectPlayerTwo}/IntroSound.mp3`
      );
      charaIntroAudio.play();
      playerTwoName.innerText =
        selectPlayerTwo.charAt(0).toUpperCase() + selectPlayerTwo.slice(1);
      startGame();
    });
  });
}

addOnClick(firstScreenCharas);
addOnClickTwo(secondScreenCharas);
