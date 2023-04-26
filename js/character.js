export class Character {
    constructor(name, photo, life, face, x = 5, y = 295) {
        this.name = name;
        this.photo = photo;
        this.life = life;
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
}
