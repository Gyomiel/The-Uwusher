class Hero {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 2;
    this.speedY = 0;
    this.jumpStrength = -10;
    this.gravity = 0.5;
    this.isJumping = false;
    this.attacking = false;
    this.health = 90;
    this.strength = 40;
    this.sprite = document.createElement("div");
  }

  insertHero() {
    this.sprite.setAttribute("id", "heroContainer");
    this.sprite.style.width = this.width + "px";
    this.sprite.style.height = this.height + "px";
    this.sprite.style.top = this.y + "px";
    this.sprite.style.left = this.x + "px";
    this.sprite.style.backgroundColor = "red";
    canvas.appendChild(this.sprite);
  }

  moveTheHeroHorizontally() {
    let xAxis = this.x + this.speed * this.directionX;
    if (xAxis >= 0 && xAxis <= 1700 - this.width) {
      this.x = xAxis;
      this.sprite.style.left = this.x + "px";
    }
  }

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
      this.sprite.style.top = this.y + "px";

      if (this.y >= 690) {
        this.y = 690;
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
  removeHero() {}
}
