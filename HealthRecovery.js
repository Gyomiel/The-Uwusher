class HealthRecovery {
    constructor(x) {
        this.x = x;
        this.y = 0;
        this.width = 30;
        this.height = 30;
        this.sprite = document.createElement('div');
        this.collided = false
        this.sprite.setAttribute('class', 'healthRecovery');
        this.sprite.style.width = this.width + 'px';
        this.sprite.style.height = this.height + 'px';
        this.sprite.style.left = this.x + 'px';
        this.sprite.style.top = this.y + 'px';
        this.sprite.style.backgroundColor = 'green';
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
           
                
           if (!this.collided) {
            playerOne.health += 100
            this.collided = true
           }
           console.log(playerOne.health + 'hp pl1 ')
           this.sprite.remove()
           
        }

        if (this.x < playerTwo.x + playerTwo.width &&
            this.y < playerTwo.y + playerTwo.height &&
            this.x + this.width > playerTwo.x &&
            this.y + this.height > playerTwo.y) {
           
                
           if (!this.collided) {
            playerTwo.health += 100
            this.collided = true
           }
           console.log(playerTwo.health + 'hp pl2')
           this.sprite.remove()
           
        }

      
    }
}