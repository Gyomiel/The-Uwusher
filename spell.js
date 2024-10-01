class Spell {
  constructor(player) {
    this.width = 6;
    this.height = 3;
    this.x = player.x + player.width / 2 - this.width / 2;
    this.y = player.y - this.height;
    this.directionX = 1;
    this.speed = 10;
    this.castInterval = setInterval(this.spellMovement.bind(this), 30);
    this.sprite = document.createElement('div');
  }
}
