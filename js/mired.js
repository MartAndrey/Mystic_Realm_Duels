import { Character } from './character.js';

const CHARACTER = {
    Blaze: 'Blaze',
    Alexia: 'Alexia',
    Zarek: 'Zarek',
    Draven: 'Draven',
    Crystalia: 'Crystalia',
    Raiven: 'Raiven',
};

const POWERS = {
    Pyro: 'Pyro',
    Hydro: 'Hydro',
    Geo: 'Geo',
    Cryo: 'Cryo',
    Electro: 'Electro',
};

const sectionSelectCharacter = document.getElementById('select-character');
const sectionSelectPower = document.getElementById('select-power');
const buttonCharacterPlayer = document.getElementById('button-character');
const buttonRestart = document.getElementById('button-restart');

const spanLivesPlayer = document.getElementById('lives-player');
const spanLivesEnemy = document.getElementById('lives-enemy');
const spanCharacterEnemy = document.getElementById('character-enemy');

const containerCards = document.getElementById('container-cards');
const containerPowers = document.getElementById('powers-container');

const buttonMoveUp = document.getElementById('button-move-up');
const buttonMoveLeft = document.getElementById('button-move-left');
const buttonMoveDown = document.getElementById('button-move-down');
const buttonMoveRight = document.getElementById('button-move-right');

buttonMoveUp.addEventListener('mousedown', moveUp);
buttonMoveLeft.addEventListener('mousedown', moveLeft);
buttonMoveDown.addEventListener('mousedown', moveDown);
buttonMoveRight.addEventListener('mousedown', moveRight);

buttonMoveUp.addEventListener('mouseup', stopMovement);
buttonMoveLeft.addEventListener('mouseup', stopMovement);
buttonMoveDown.addEventListener('mouseup', stopMovement);
buttonMoveRight.addEventListener('mouseup', stopMovement);

const sectionSeeMap = document.getElementById('see-map');
const map = document.getElementById('map');

let inputBlaze;
let inputAlexia;
let inputZarek;
let inputDraven;
let inputCrystalia;
let inputRaiven;

let buttons = [];
let characters = [];

let optionCharacter;
let powersCharacter;

let objectCurrentCharacterPlayer;
let currentCharacterPlayer;
let currentCharacterEnemy;

let attackPlayer;
let attackEnemy;

let livesPlayer = 3;
let livesEnemy = 3;

let canvas = map.getContext('2d');

let interval;

let mapBackground = new Image();
mapBackground.src = '/assets/map.png';

let blaze = new Character('Blaze', 'assets/Blaze.png',5,'assets/BlazeFace.png');
let alexia = new Character('Alexia','assets/Alexia.png',5,'assets/AlexiaFace.png');
let zarek = new Character('Zarek','assets/Zarek.png',5,'assets/ZarekFace.png');
let draven = new Character('Draven','assets/Draven.png',5,'assets/DravenFace.png');
let crystalia = new Character('Crystalia','assets/Crystalia.png',5,'assets/CrystaliaFace.png');
let raiven = new Character( 'Raiven', 'assets/Raiven.png', 5,'assets/RaivenFace.png');

let blazeEnemy = new Character('Blaze', 'assets/Blaze.png',5,'assets/BlazeFace.png', 40, 210);
let alexiaEnemy = new Character( 'Alexia', 'assets/Alexia.png', 5, 'assets/AlexiaFace.png', 330, 345);
let zarekEnemy = new Character('Zarek','assets/Zarek.png',5,'assets/ZarekFace.png',220,115);
let dravenEnemy = new Character('Draven', 'assets/Draven.png', 5,'assets/DravenFace.png',65,350);
let crystaliaEnemy = new Character('Crystalia','assets/Crystalia.png',5,'assets/CrystaliaFace.png',495, 30);
let raivenEnemy = new Character('Raiven','assets/Raiven.png',5,'assets/RaivenFace.png',495, 230);

blaze.powers.push(
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' }
);

alexia.powers.push(
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Electro, id: 'button-electro' }
);

zarek.powers.push(
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Geo, id: 'button-geo' }
);

draven.powers.push(
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Pyro, id: 'button-pyro' }
);

crystalia.powers.push(
    { name: POWERS.Hydro, id: 'button-hydro' },
    { name: POWERS.Cryo, id: 'button-cryo' },
    { name: POWERS.Hydro, id: 'button-hydro' },
    { name: POWERS.Cryo, id: 'button-cryo' }
);

raiven.powers.push(
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' }
);

blazeEnemy.powers.push(
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' }
);

alexiaEnemy.powers.push(
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Electro, id: 'button-electro' }
);

zarekEnemy.powers.push(
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Geo, id: 'button-geo' }
);

dravenEnemy.powers.push(
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Pyro, id: 'button-pyro' }
);

crystaliaEnemy.powers.push(
    { name: POWERS.Hydro, id: 'button-hydro' },
    { name: POWERS.Cryo, id: 'button-cryo' },
    { name: POWERS.Hydro, id: 'button-hydro' },
    { name: POWERS.Cryo, id: 'button-cryo' }
);

raivenEnemy.powers.push(
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' }
);

characters.push(blaze, alexia, zarek, draven, crystalia, raiven);

function startGame() {
    sectionSelectCharacter.style.display = 'flex';
    sectionSeeMap.style.display = 'none';
    sectionSelectPower.style.display = 'none';

    characters.forEach((character) => {
        optionCharacter = `
        <li  class="cards-container ">
        <input type="radio" name="pets" id=${character.name} />
        <label class="label-container-cards" for=${character.name}>
            <p>${character.name}</p>
            <img
                src=${character.photo}
                alt=${character.name}
            />
        </label>
        </li>
        `;
        containerCards.innerHTML += optionCharacter;
    });

    inputBlaze = document.getElementById('Blaze');
    inputAlexia = document.getElementById('Alexia');
    inputZarek = document.getElementById('Zarek');
    inputDraven = document.getElementById('Draven');
    inputCrystalia = document.getElementById('Crystalia');
    inputRaiven = document.getElementById('Raiven');

    buttonCharacterPlayer.addEventListener('click', selectCharacterPlayer);
    buttonRestart.addEventListener('click', restartGame);
}

function selectCharacterPlayer() {
    sectionSelectCharacter.style.display = 'none';
    sectionSelectPower.style.display = 'none';
    sectionSeeMap.style.display = 'flex';

    if (inputBlaze.checked) currentCharacterPlayer = CHARACTER.Blaze;
    else if (inputAlexia.checked) currentCharacterPlayer = CHARACTER.Alexia;
    else if (inputZarek.checked) currentCharacterPlayer = CHARACTER.Zarek;
    else if (inputDraven.checked) currentCharacterPlayer = CHARACTER.Draven;
    else if (inputCrystalia.checked)
        currentCharacterPlayer = CHARACTER.Crystalia;
    else if (inputRaiven.checked) currentCharacterPlayer = CHARACTER.Raiven;
    else {
        currentCharacterPlayer = null;
        alert('You must select a character ');
    }

    if (currentCharacterPlayer == null) {
        startGame();
        return;
    }

    startMap();
}

function getPowers(currentCharacterPlayer) {
    let powers;

    for (let i = 0; i < characters.length; i++) {
        if (currentCharacterPlayer === characters[i].name) {
            powers = characters[i].powers;
        }
    }

    showPowers(powers);
}

function showPowers(powers) {
    powers.forEach((power) => {
        powersCharacter = `<button id=${power.id} class="button-power">${power.name} </button>`;
        containerPowers.innerHTML += powersCharacter;
    });

    buttons = document.querySelectorAll('.button-power');

    attackSequence();
}

function attackSequence() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            let text = e.target.textContent.trim();
            if (text === POWERS.Pyro) {
            } else if (text === POWERS.Hydro) {
            } else if (text === POWERS.Geo) {
            } else if (text === POWERS.Cryo) {
            } else if (text === POWERS.Electro) {
            }
        });
    });
}

function selectCharacterEnemy(enemy) {
    spanCharacterEnemy.innerHTML = enemy.name;
}

function powerPyro() {
    attackPlayer = POWERS.Pyro;
    SetPowerEnemy();
}

function powerHydro() {
    attackPlayer = POWERS.Hydro;
    SetPowerEnemy();
}

function powerGeo() {
    attackPlayer = POWERS.Geo;
    SetPowerEnemy();
}

function powerCryo() {
    attackPlayer = POWERS.Cryo;
    SetPowerEnemy();
}

function powerElectro() {
    attackPlayer = POWERS.Electro;
    SetPowerEnemy();
}

function SetPowerEnemy() {
    let powerRandom = random(0, currentCharacterEnemy.powers.length - 1);

    if (powerRandom == 1) attackEnemy = POWERS.Pyro;
    else if (powerRandom == 2) attackEnemy = POWERS.Hydro;
    else if (powerRandom == 3) attackEnemy = POWERS.Geo;
    else if (powerRandom == 4) attackEnemy = POWERS.Cryo;
    else if (powerRandom == 5) attackEnemy = POWERS.Electro;

    combat();
}

function combat() {
    let result;

    if (attackPlayer == attackEnemy) {
        result = 'TIE😠';
    } else if (attackPlayer == POWERS.Pyro && attackEnemy == POWERS.Cryo) {
        result = 'You win🎉';
        livesEnemy--;
        spanLivesEnemy.innerHTML = livesEnemy;
    } else if (attackPlayer == POWERS.Hydro && attackEnemy == POWERS.Pyro) {
        result = 'You win🎉';
        livesEnemy--;
        spanLivesEnemy.innerHTML = livesEnemy;
    } else if (attackPlayer == POWERS.Geo && attackEnemy == POWERS.Pyro) {
        result = 'You win🎉';
        livesEnemy--;
        spanLivesEnemy.innerHTML = livesEnemy;
    } else if (attackPlayer == POWERS.Cryo && attackEnemy == POWERS.Electro) {
        result = 'You win🎉';
        livesEnemy--;
        spanLivesEnemy.innerHTML = livesEnemy;
    } else if (attackPlayer == POWERS.Electro && attackEnemy == POWERS.Hydro) {
        result = 'You win🎉';
        livesEnemy--;
        spanLivesEnemy.innerHTML = livesEnemy;
    } else {
        result = 'You lost🎗️';
        livesPlayer = livesPlayer - 1;
        spanLivesPlayer.innerHTML = livesPlayer;
    }

    // createMessage(result);

    checkLives();
}

// function checkLives() {
//     if (livesEnemy <= 0) createFinalMessage('Congratulation! YOU WIN😃');
//     else if (livesPlayer <= 0) createFinalMessage('Sorry! YOU LOST😔');
// }

// function createMessage(result) {
//     let newAttackPlayer = document.createElement('p');
//     let newAttackEnemy = document.createElement('p');

//     sectionMessages.innerHTML = result;
//     newAttackPlayer.innerHTML = attackPlayer;
//     newAttackEnemy.innerHTML = attackEnemy;

//     pAttackPlayer.appendChild(newAttackPlayer);
//     pAttackEnemy.appendChild(newAttackEnemy);
// }

// function createFinalMessage(finalResult) {
//     sectionMessages.innerHTML = finalResult;
// }

function restartGame() {
    location.reload();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function startMap() {
    map.width = 600;
    map.height = 400;

    objectCurrentCharacterPlayer = findCurrentCharacter();

    interval = setInterval(drawCanvas, 50);

    window.addEventListener('keydown', keyPressed);
    window.addEventListener('keyup', stopMovement);
}

function findCurrentCharacter() {
    let character = characters.find(
        (character) => character.name === currentCharacterPlayer
    );

    return character;
}

function drawCanvas() {
    objectCurrentCharacterPlayer.x += objectCurrentCharacterPlayer.speedX;
    objectCurrentCharacterPlayer.y += objectCurrentCharacterPlayer.speedY;
    
    canvas.clearRect(0, 0, map.width, map.height);

    canvas.drawImage(mapBackground, 0, 0, map.width, map.height);

    objectCurrentCharacterPlayer.drawCharacter(canvas);

    blazeEnemy.drawCharacter(canvas);
    alexiaEnemy.drawCharacter(canvas);
    zarekEnemy.drawCharacter(canvas);
    dravenEnemy.drawCharacter(canvas);
    crystaliaEnemy.drawCharacter(canvas);
    raivenEnemy.drawCharacter(canvas);

    if (
        objectCurrentCharacterPlayer.speedX !== 0 ||
        objectCurrentCharacterPlayer.speedY !== 0
    ) {
        checkCollision(blazeEnemy);
        checkCollision(alexiaEnemy);
        checkCollision(zarekEnemy);
        checkCollision(dravenEnemy);
        checkCollision(crystaliaEnemy);
        checkCollision(raivenEnemy);
    }
}

function moveUp() {
    objectCurrentCharacterPlayer.speedY = -5;
}

function moveLeft() {
    objectCurrentCharacterPlayer.speedX = -5;
}

function moveDown() {
    objectCurrentCharacterPlayer.speedY = 5;
}

function moveRight() {
    objectCurrentCharacterPlayer.speedX = 5;
}

function stopMovement() {
    objectCurrentCharacterPlayer.speedX = 0;
    objectCurrentCharacterPlayer.speedY = 0;
}

function keyPressed(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            moveUp();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            moveLeft();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            moveDown();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            moveRight();
            break;
    }
}

function checkCollision(enemy) {
    const upEnemy = enemy.y;
    const downEnemy = enemy.y + enemy.height;
    const rightEnemy = enemy.x + enemy.width;
    const leftEnemy = enemy.x;

    const upCharacter = objectCurrentCharacterPlayer.y;
    const downCharacter =
        objectCurrentCharacterPlayer.y + objectCurrentCharacterPlayer.height;
    const rightCharacter =
        objectCurrentCharacterPlayer.x + objectCurrentCharacterPlayer.width;
    const leftCharacter = objectCurrentCharacterPlayer.x;

    if (
        downCharacter < upEnemy ||
        upCharacter > downEnemy ||
        rightCharacter < leftEnemy ||
        leftCharacter > rightEnemy
    ) {
        return;
    }
    stopMovement();
    clearInterval(interval);
    sectionSelectPower.style.display = 'grid';
    sectionSeeMap.style.display = 'none';

    selectCharacterEnemy(enemy);
    getPowers(currentCharacterPlayer);
}

window.addEventListener('load', startGame);
