export class Character {
    constructor(name, life, damage, defense, photo, face, x = 5, y = 295) {
        this.name = name;
        this.maxLife = life;
        this.life = this.maxLife;
        this.damage = damage;
        this.defense = defense;
        this.photo = photo;
        this.face = face;
        this.powers = [];
        this.icons = [];
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.mapPhoto = new Image();
        this.mapPhoto.src = face;
        this.speedX = 0;
        this.speedY = 0;
    }

    drawCharacter(canvas) {
        canvas.drawImage(
            this.mapPhoto,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    changeLife(amount) {
        this.life -= amount;
    }
}