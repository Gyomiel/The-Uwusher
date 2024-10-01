class Hero {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 150;
    this.directionX = 0;
    this.directionY = 0;
    this.speedX = 2;
    this.speedY = 0;
    this.jumpStrength = -20;
    this.gravity = 0.5;
    this.isJumping = false;
    this.attacking = false;
    this.health = 100;
    this.strength = 20;
    this.sprite = document.createElement('div');
  }

  insertHero() {
    this.sprite.setAttribute('id', 'heroContainer');
    this.sprite.style.width = this.width + 'px';
    this.sprite.style.height = this.height + 'px';
    this.sprite.style.top = this.y + 'px';
    this.sprite.style.left = this.x + 'px';
    this.sprite.style.backgroundColor = 'red';
    canvas.appendChild(this.sprite);
  }

  removeHero() {
    canvas.removeChild(this.sprite);
    clearInterval(moveHeroInterval);
  }

  moveTheHeroHorizontally() {
    let xAxis = this.x + this.speedX * this.directionX;
    if (xAxis >= 0 && xAxis <= 1700 - this.width) {
      this.x = xAxis;
      this.sprite.style.left = this.x + 'px';
    }
  }

/*   healthBar() {
    let healthBar = 
  } */

  jumping() {
    if (!this.isJumping) {
      this.speedY = this.jumpStrength;
      this.isJumping = true;
    }
  }

  gravityOnJump() {
    if (this.isJumping) {
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
  playerAttack() {}

  receiveDamage(dmg) {
    this.health -= dmg;
  }
  checkCollisions() {}
}
