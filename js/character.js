export class Character {
    constructor(name, photo, life, photoMap, x = 5, y = 210) {
        this.name = name;
        this.photo = photo;
        this.life = life;
        this.powers = [];
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.mapPhoto = new Image();
        this.mapPhoto.src = photoMap;
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
