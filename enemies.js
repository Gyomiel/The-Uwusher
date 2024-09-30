class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.speed = 1;
    this.health = 20;
    this.strength = 30;
    this.attacking = false;
    this.randomDirection = 0;
    this.sprite = document.createElement('div');
  }

  insertEnemy() {
    this.sprite.setAttribute('class', 'enemyContainer');
    this.sprite.style.width = this.width + 'px';
    this.sprite.style.height = this.height + 'px';
    this.sprite.style.top = this.y + 'px';
    this.sprite.style.left = this.x + 'px';
    this.sprite.style.backgroundColor = 'green';
    canvas.appendChild(this.sprite);
  }

  chooseRandomDirection() {
    this.randomDirection = Math.floor(Math.random() * 2) + 1;
  }

  enemyMovement() {
    let previousX = this.x;
    let previousY = this.y;
  }

  enemyAttack() {}

  receiveDamage(dmg) {
    this.health -= dmg;
  }
  checkCollisions() {}

  removeEnemy() {}
}
