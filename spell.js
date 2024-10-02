class Spell {
  constructor(player) {
    this.player = player;
    this.width = 30;
    this.height = 30;
    this.x = this.player.x + this.player.width / 2 + this.width / 2;
    this.y = this.player.y + this.height * 3;
    this.directionX = this.player.previousDirection;
    this.speed = 20;
    this.castInterval = setInterval(this.spellMovement.bind(this), 30);
    this.sprite = document.createElement('div');
  }

  insertSpell() {
    this.sprite.setAttribute('class', 'spellCast');
    this.sprite.style.width = this.width + 'px';
    this.sprite.style.height = this.height + 'px';
    if (this.player.previousDirection === 1) {
      this.sprite.style.top = this.y + 'px';
      this.sprite.style.left = this.x + 'px';
    } else if (this.player.previousDirection === -1) {
      this.x = this.player.x - this.width / 2;
      this.sprite.style.top = this.y + 'px';
      this.sprite.style.left = this.x + 'px';
    }

    this.sprite.style.backgroundColor = 'blue';
    canvas.appendChild(this.sprite);
  }

  removeSpell() {
    canvas.removeChild(this.sprite);
    clearInterval(this.castInterval);
  }

  spellMovement() {
    let newX = this.x + this.speed * this.directionX;
    this.checkCollisions(this);
    if (newX >= 0 && newX <= 1700 - this.width) {
      this.x = newX;
      this.sprite.style.left = this.x + 'px';
    } else {
      this.removeSpell();
    }
  }

  checkCollisions(self) {
    if (
      playerTwo.x < playerOne.x + playerOne.width &&
      playerTwo.y < playerOne.y + playerOne.height &&
      playerTwo.x + playerTwo.width > playerOne.x &&
      playerTwo.y + playerTwo.height > playerOne.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}
