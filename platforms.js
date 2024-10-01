class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = document.createElement("div");
  }

  insertPlatform() {
    this.sprite.setAttribute("class", "platformContainer");
    this.sprite.style.width = this.width + "px";
    this.sprite.style.height = this.height + "px";
    this.sprite.style.top = this.y + "px";
    this.sprite.style.left = this.x + "px";
    this.sprite.style.backgroundColor = "orange";
    canvas.appendChild(this.sprite);
  }


  checkCollisions() {
    let platformX = this.x;
    let playerOneX = playerOne.x;

    let platformY = this.y;
    let playerOneY = playerOne.y;

    let platformXRight = this.x + this.width;
    let playerOneXRight = playerOne.x + playerOne.width;

    let platformYBottom = this.y + this.height;
    let playerOneYBottom = playerOne.y + playerOne.height;
    if (
      platformXRight >= playerOneX &&
      platformX <= playerOneXRight &&
      platformYBottom >= playerOneY &&
      platformY <= playerOneYBottom
    ) {
      if (platformY <= playerOneYBottom && platformYBottom >= playerOneY) {
        playerOne.y = platformYBottom;
      } else if (
        platformY <= playerOneYBottom &&
        playerOneYBottom >= platformY
      ) {
        playerOne.y = platformY;
      }

      this.speed = 0;
      return true;
    }
    this.speed;
    return false;
  }
}
