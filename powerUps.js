class PowerUp {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.sprite = document.createElement('div');

        this.sprite.setAttribute('class', 'power-ups');
        this.sprite.style.width = this.width + 'px';
        this.sprite.style.height = this.height + 'px';
        this.sprite.style.left = this.x + 'px';
        this.sprite.style.top = this.y + 'px';
        this.sprite.style.backgroundColor = 'yellow'; 
        canvas.appendChild(this.sprite);
    }

    fall(speed) {
        this.y += speed; // Hacer que el power-up caiga
        this.sprite.style.top = this.y + 'px';
    }
}
