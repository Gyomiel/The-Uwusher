const healthRecoverySound = document.getElementById('healthPU');

class HealthRecovery {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.width = 40;
    this.height = 40;
    this.sprite = document.createElement('div');
    this.collided = false;
    this.sprite.setAttribute('class', 'healthRecovery');
    this.sprite.style.width = this.width + 'px';
    this.sprite.style.height = this.height + 'px';
    this.sprite.style.left = this.x + 'px';
    this.sprite.style.top = this.y + 'px';
    this.sprite.style.backgroundImage = "url('imgs/assets/healthPowerUp.png')";
    canvas.appendChild(this.sprite);
  }

  fall(speed) {
    this.y += speed;
    this.sprite.style.top = this.y + 'px';
  }

  checkCollisions() {
    if (
      this.x < playerOne.x + playerOne.width &&
      this.y < playerOne.y + playerOne.height &&
      this.x + this.width > playerOne.x &&
      this.y + this.height > playerOne.y
    ) {
      if (!this.collided) {
        playerOne.health < 600 ? (playerOne.health += 100) : null;
        healthBarP1.value += 100;
        this.collided = true;
        healthRecoverySound.play();
      }
      this.sprite.remove();
    }

    if (
      this.x < playerTwo.x + playerTwo.width &&
      this.y < playerTwo.y + playerTwo.height &&
      this.x + this.width > playerTwo.x &&
      this.y + this.height > playerTwo.y
    ) {
      if (!this.collided) {
        playerTwo.health < 600 ? (playerTwo.health += 100) : null;
        healthBarP2.value += 100;
        this.collided = true;
        healthRecoverySound.play();
      }
      this.sprite.remove();
    }
  }
}
