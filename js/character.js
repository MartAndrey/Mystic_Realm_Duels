export class Character {
    timesDefenseIncrease = 0;

    constructor(name, life, damage, defense, photo, face, xMap, yMap, id = null) {
        this.id = id;
        this.name = name;
        this.maxLife = life;
        this.life = this.maxLife;
        this.damage = damage;
        this.defaultDefense = defense;
        this.defense = this.defaultDefense;
        this.photo = photo;
        this.face = face;
        this.powers = [];
        this.icons = [];
        this.width = 40;
        this.height = 40;
        this.x = this.randomPosition(0, xMap - this.width);
        this.y = this.randomPosition(0, yMap - this.height);
        this.mapPhoto = new Image();
        this.mapPhoto.src = face;
        this.speedX = 0;
        this.speedY = 0;
    }

    setNumberPlayer(numberPlayer){
        this.imageNumberPlayer = new Image(this.width - 20, this.height - 20);
        this.imageNumberPlayer.src = numberPlayer;
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

    drawNumberPlayer(canvas){
        canvas.drawImage(
            this.imageNumberPlayer,
            this.x - this.imageNumberPlayer.width / -2,
            this.y - this.imageNumberPlayer.height,
            this.width - 20,
            this.height - 20
        );
    }

    changeLife(amount) {
        this.life -= amount;
    }

    defenseIncrease(percentage) {
        if (!this.timesDefenseIncrease >= 1)
            this.defense = this.defense + this.defense * percentage;
        this.timesDefenseIncrease += 2;
    }

    defenseDecrease() {
        this.timesDefenseIncrease--;
        if (this.timesDefenseIncrease <= 0) this.defense = this.defaultDefense;
    }

    randomPosition(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
