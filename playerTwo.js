class Antagonist {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.direction = 0;
    this.speed = 10;
    this.health = 90;
    this.strength = 40;
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
}
