const strengthGainSound = document.getElementById('strengthPU');

class PowerUp {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.width = 40;
    this.height = 40;
    this.sprite = document.createElement("div");
    this.collided = false;
    this.sprite.setAttribute("class", "power-up");
    this.sprite.style.width = this.width + "px";
    this.sprite.style.height = this.height + "px";
    this.sprite.style.left = this.x + "px";
    this.sprite.style.top = this.y + "px";
    this.sprite.style.backgroundImage = "url('imgs/assets/strengthPowerUp.png')";
    canvas.appendChild(this.sprite);
  }

  fall(speed) {
    this.y += speed;
    this.sprite.style.top = this.y + "px";
  }

  checkCollisions() {
    if (
      this.x < playerOne.x + playerOne.width &&
      this.y < playerOne.y + playerOne.height &&
      this.x + this.width > playerOne.x &&
      this.y + this.height > playerOne.y
    ) {
      if (!this.collided) {
        playerOne.strength *= 2;
        this.collided = true;
        strengthGainSound.play();
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
        playerTwo.strength *= 2;
        this.collided = true;
        strengthGainSound.play();

      }
      this.sprite.remove();
    }
  }
}
