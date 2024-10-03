class Antagonist {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 80;
    this.height = 150;
    this.directionX = 0;
    this.directionY = 0;
    this.previousDirection = -1;
    this.speedX = 2;
    this.speedY = 0;
    this.jumpStrength = -22;
    this.gravity = 1;
    this.isJumping = false;
    this.attacking = false;
    this.health = 600;
    this.strength = 100;
    this.spellCounter = 0;
    this.attackAudio = new Audio(`/imgs/sprites/${type}/AttackSound.mp3`);
    this.hurtAudio = new Audio(`/imgs/sprites/${type}/HurtSound.mp3`);
    this.jumpAudio = new Audio(`/imgs/sprites/${type}/JumpSound.mp3`);
    this.deadAudio = new Audio(`/imgs/sprites/${type}/DeadSound.mp3`);
    this.sprite = document.createElement('div');
  }

  insertAntagonist() {
    this.sprite.setAttribute('id', 'antagonistContainer');
    this.sprite.setAttribute('class', this.type);
    this.sprite.style.width = this.width + 'px';
    this.sprite.style.height = this.height + 'px';
    this.sprite.style.top = this.y + 'px';
    this.sprite.style.left = this.x + 'px';
    this.sprite.style.backgroundImage = `url('./imgs/sprites/${this.type}/IdleReverse.gif')`;
    canvas.appendChild(this.sprite);
  }

  removeAntagonist() {
    clearInterval(moveAntagonistInterval);
    canvas.removeChild(this.sprite);
  }

  moveTheAntagonistHorizontally() {
    let xAxis = this.x + this.speedX * this.directionX;
    this.checkCollisions();
    if (xAxis >= 0 && xAxis <= 1700 - this.width && !this.checkCollisions()) {
      this.x = xAxis;
      this.sprite.style.left = this.x + 'px';
    }

    if (xAxis >= 0 && xAxis <= 1700 - this.width && this.checkCollisions()) {
      if (
        xAxis + this.bounceBack() >= 0 &&
        xAxis + this.bounceBack() <= 1700 - this.width
      ) {
        this.x = xAxis + this.bounceBack();
        this.sprite.style.left = this.x + 'px';
      }
    }
  }

  bounceBack() {
    if (
      playerTwo.directionX === -1 ||
      (playerOne.directionX === 1 && playerTwo.directionX === 0)
    ) {
      return 10;
    } else {
      return -10;
    }
  }

  jumping() {
    if (!this.isJumping) {
      this.speedY = this.jumpStrength;
      this.isJumping = true;
      this.jumpAudio.play();
    }
  }

  gravityOnJump() {
    if (this.isJumping && !this.checkCollisions()) {
      this.speedY += this.gravity;
      this.y += this.speedY;
      this.sprite.style.top = this.y + 'px';
      if (this.y >= 395) {
        this.y = 395;
        this.isJumping = false;
        this.speedY = 0;
      }
    }
  }

  playerMeleeAttack() {
    let previousWidth = this.width;
    let previousX = this.x;
    this.attackAudio.play();
    if (this.previousDirection === 1) {
      this.width += this.width / 2;
      if (this.checkCollisions()) {
        playerOne.receiveDamage(this.strength);
      }
    } else {
      this.width += this.width / 2;
      this.x = this.x - this.width / 2;
      if (this.checkCollisions()) {
        playerOne.receiveDamage(this.strength);
      }
    }

    this.width = previousWidth;
    this.x = previousX;
  }

  playerDistanceAttack() {
    let spell = new Spell(playerTwo);
    spell.sprite.style.backgroundImage =
      playerTwo.directionX === -1
        ? `url('./imgs/sprites/${this.type}/spellAnimationReverse.gif')`
        : `url('./imgs/sprites/${this.type}/spellAnimation.gif')`;
    spell.sprite.style.backgroundImage =
      playerTwo.previousDirection === -1
        ? `url('./imgs/sprites/${this.type}/spellAnimationReverse.gif')`
        : `url('./imgs/sprites/${this.type}/spellAnimation.gif')`;
    spell.insertSpell();
  }

  receiveDamage(dmg) {
    healthBarP2.value -= dmg;
    this.health -= dmg;
    this.hurtAudio.play();
    playerTwo.sprite.style.backgroundImage =
      playerTwo.previousDirection === -1
        ? `url('./imgs/sprites/${this.type}/HurtReverse.gif')`
        : `url('./imgs/sprites/${this.type}/Hurt.gif')`;
    this.checkingIfTheyDie();
  }

  checkingIfTheyDie() {
    if (this.health <= 0) {
      this.deadAudio.play();
      playerTwo.sprite.style.backgroundImage =
        playerTwo.previousDirection === -1
          ? `url('./imgs/sprites/${this.type}/DeadReverse.gif')`
          : `url('./imgs/sprites/${this.type}/Dead.gif')`;
      setTimeout(() => {
        playerTwo.x = 0;
        playerTwo.y = 0;
        playerTwo.removeAntagonist();
      }, 500);
    } else if (playerTwo.health > 0) {
      setTimeout(function () {
        playerTwo.sprite.style.backgroundImage =
          playerTwo.previousDirection === -1
            ? `url('./imgs/sprites/${playerTwo.type}/IdleReverse.gif')`
            : `url('./imgs/sprites/${playerTwo.type}/Idle.gif')`;
      }, 1000);
    }
  }

  checkCollisions() {
    if (
      playerOne.x < playerTwo.x + playerTwo.width &&
      playerOne.y < playerTwo.y + playerTwo.height &&
      playerOne.x + playerOne.width > playerTwo.x &&
      playerOne.y + playerOne.height > playerTwo.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}
