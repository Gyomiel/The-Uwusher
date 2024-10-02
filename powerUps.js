class PowerUp {
    constructor(x) {
        this.x = x;
        this.y = 0;
        this.width = 30;
        this.height = 30;
        this.sprite = document.createElement('div');
        this.collided = false
        this.sprite.setAttribute('class', 'power-up');
        this.sprite.style.width = this.width + 'px';
        this.sprite.style.height = this.height + 'px';
        this.sprite.style.left = this.x + 'px';
        this.sprite.style.top = this.y + 'px';
        this.sprite.style.backgroundColor = 'yellow';
        canvas.appendChild(this.sprite);
    }

    fall(speed) {
        this.y += speed;
        this.sprite.style.top = this.y + 'px';
    }

    checkCollisions() {
        if (this.x < playerOne.x + playerOne.width &&
            this.y < playerOne.y + playerOne.height &&
            this.x + this.width > playerOne.x &&
            this.y + this.height > playerOne.y) {
           
                console.log('pum');
           if (!this.collided) {
            playerOne.strength *= 2
            this.collided = true
           }
           console.log(playerOne.strength)
           this.sprite.remove()
           
        }

      
    }
}
