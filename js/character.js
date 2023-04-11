export class Character {
    constructor(name, photo, life) {
        this.name = name;
        this.photo = photo;
        this.life = life;
        this.powers = [];
        this.x = 20;
        this.y = 30;
        this.width = 80;
        this.height = 80;
        this.mapPhoto = new Image();
        this.mapPhoto.src = photo;
        this.speedX = 0;
        this.speedY = 0;
    }
}
