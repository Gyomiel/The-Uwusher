// Canvas context through DOM:

const canvas = document.getElementById('gameCanvas');

let playerOne;
let playerTwo;

function startGame() {
  newHero();
  newAntagonist();
}

function newHero() {
  playerOne = new Hero(0, 690);
  playerOne.insertHero();
}

function newAntagonist() {
  playerTwo = new Antagonist(1640, 690);
  playerTwo.insertAntagonist();
}

startGame();
