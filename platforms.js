class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = document.createElement('div');
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
  
  checkCollisions() {}
}
