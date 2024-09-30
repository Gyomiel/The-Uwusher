class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 1;
    this.health = 20;
    this.strength = 30;
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
}