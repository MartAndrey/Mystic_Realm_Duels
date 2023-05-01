export class Character {
    constructor(name, life, damage, defense, photo, face, strength, x = 5, y = 295) {
        this.name = name;
        this.life = life;
        this.damage = damage;
        this.defense = defense;
        this.photo = photo;
        this.strength = new Map();
        // this.weakness = new Map();
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


// blaze.test = [
//     { objectTest: { atr1: 'hola', atr2: 'hola1' } },
//     { objectTest1: { atr1: 'hola', atr2: 'hola1' } },
//     { objectTest2: { atr1: 'hola', atr2: 'hola1' } },
//     { objectTest3: { atr1: 'hola', atr2: 'hola1' } },
// ];
// for (let clave in blaze.test) {
//     console.log(clave + ':');
//     for (let propiedad in blaze.test[clave]) {
//         console.log(propiedad + ' = ' + blaze.test[clave][propiedad]);
//     }
// }

// for (let elemento of blaze.test) {
//     console.log('Elemento:');
//     for (let clave in elemento) {
//         console.log(clave + ' = ' + elemento[clave].atr2);
//     }
// }