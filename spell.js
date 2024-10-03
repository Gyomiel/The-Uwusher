class Spell {
  constructor(player) {
    this.player = player;
    this.width = 30;
    this.height = 30;
    this.dmg = player.strength;
    this.x = this.player.x + this.player.width / 2 + this.width / 2;
    this.y = this.player.y + this.height * 3;
    this.directionX = this.player.previousDirection;
    this.speed = 20;
    this.castInterval = setInterval(this.spellMovement.bind(this), 30);
    this.sprite = document.createElement('div');
    this.audio = new Audio(`/imgs/sprites/${player.type}/spellAnimationSound.mp3`)
  }

  insertSpell() {
    this.sprite.setAttribute('class', 'spellCast');
    this.sprite.style.width = this.width + 'px';
    this.sprite.style.height = this.height + 'px';
    this.audio.play();

    if (this.player.previousDirection === 1) {
      this.sprite.style.top = this.y + 'px';
      this.sprite.style.left = this.x + 'px';
    } else if (this.player.previousDirection === -1) {
      this.x = this.player.x - this.width / 2;
      this.sprite.style.top = this.y + 'px';
      this.sprite.style.left = this.x + 'px';
    }
    canvas.appendChild(this.sprite);
  }

  removeSpell() {
    this.player.spellCounter--;
    canvas.removeChild(this.sprite);
    clearInterval(this.castInterval);
    this.audio.pause();
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
    let player = playersArray.filter(
      (playerFromArray) => playerFromArray !== this.player
    )[0];

    if (
      self.x + self.width >= player.x &&
      self.x < player.x + player.width &&
      self.y >= player.y &&
      self.y + self.height <= player.y + player.height
    ) {
      this.removeSpell();
      player.receiveDamage(this.dmg);
      return true;
    }
    return false;
  }
}
