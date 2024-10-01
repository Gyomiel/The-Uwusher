class Antagonist {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 150;
    this.directionX = 0;
    this.directionY = 0;
    this.previousDirection = 0;
    this.speedX = 2;
    this.speedY = 0;
    this.jumpStrength = -22;
    this.gravity = 1;
    this.isJumping = false;
    this.attacking = false;
    this.health = 100;
    this.strength = 20;
    this.sprite = document.createElement('div');
  }

  insertAntagonist() {
    this.sprite.setAttribute('id', 'antagonistContainer');
    this.sprite.style.width = this.width + 'px';
    this.sprite.style.height = this.height + 'px';
    this.sprite.style.top = this.y + 'px';
    this.sprite.style.left = this.x + 'px';
    this.sprite.style.backgroundColor = 'blue';
    canvas.appendChild(this.sprite);
  }

  removeAntagonist() {
    canvas.removeChild(this.sprite);
    clearInterval(moveAntagonistInterval);
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
    }
  }

  gravityOnJump() {
    if (this.isJumping && !this.checkCollisions()) {
      this.speedY += this.gravity;
      this.y += this.speedY;
      this.sprite.style.top = this.y + 'px';
      if (this.y >= 400) {
        this.y = 400;
        this.isJumping = false;
        this.speedY = 0;
      }
    }
  }

  playerMeleeAttack() {
    let previousWidth = this.width;
    let previousX = this.x;

    if (this.previousDirection === 1) {
      this.width += this.width / 2;
      if (this.checkCollisions()) {
        playerOne.health -= this.strength;
        console.log('AttackingP2');

      }
    } else {
      this.width += this.width / 2;
      this.x = this.x - this.width / 2;
      if (this.checkCollisions()) {
        playerOne.health -= this.strength;
        console.log('AttackingP2');

      }
    }

    this.width = previousWidth;
    this.x = previousX;
  }

  receiveDamage(dmg) {
    this.health -= dmg;
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
