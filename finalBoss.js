class Boss {
  constructor() {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 1;
    this.health = 180;
    this.strength = 45;
    this.sprite = document.createElement('div');
  }

  insertFinalBoss() {
    this.sprite.setAttribute('id', 'bossContainer');
    this.sprite.style.width = this.width + 'px';
    this.sprite.style.height = this.height + 'px';
    this.sprite.style.top = this.y + 'px';
    this.sprite.style.left = this.x + 'px';
    this.sprite.style.backgroundColor = 'yellow';
    //canvas.appendChild(this.sprite);
  }

  finalBossMovement() {}

  finalBossAttack() {}

  receiveDamage(dmg) {
    this.health -= dmg;
  }
  checkCollisions() {}

  removeFinalBoss() {}
}
