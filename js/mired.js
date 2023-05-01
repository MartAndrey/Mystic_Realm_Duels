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

const DAMAGE_TYPE = {
    2: 'X2',
    0.5: 'X1/2',
    0: 'X0',
};

const sectionSelectCharacter = document.getElementById('select-character');
const sectionSelectPower = document.getElementById('select-power');
const buttonCharacterPlayer = document.getElementById('button-character');

const spanLivesPlayer = document.getElementById('lives-player');
const spanLivesEnemy = document.getElementById('lives-enemy');

const frameCharacter = '/assets/Frame.png';

const containerCards = document.getElementById('container-cards');
const containerCharacterInfo = document.getElementById('character-info');
const containerCharacterDisplay = document.getElementById('character-display');
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

let buttonRestart;

let inputBlaze;
let inputAlexia;
let inputZarek;
let inputDraven;
let inputCrystalia;
let inputRaiven;

let buttons = [];
let characters = [];
let charactersEnemies = [];
let allCharacters = [];

let optionCharacter;
let powersCharacter;

let objectCurrentCharacterPlayer;
let objectCurrentCharacterEnemy;
let currentCharacterPlayer;
let currentCharacterEnemy;

let attackPlayer;
let attackEnemy;

let canvas = map.getContext('2d');

let interval;

let mapBackground = new Image();
mapBackground.src = '/assets/map.png';

let blaze = new Character(
    'Blaze',
    200,
    50,
    30,
    'assets/Blaze.png',
    'assets/BlazeFace.png'
);
let alexia = new Character(
    'Alexia',
    250,
    45,
    40,
    'assets/Alexia.png',
    'assets/AlexiaFace.png'
);
let zarek = new Character(
    'Zarek',
    225,
    40,
    35,
    'assets/Zarek.png',
    'assets/ZarekFace.png'
);
let draven = new Character(
    'Draven',
    300,
    35,
    50,
    'assets/Draven.png',
    'assets/DravenFace.png'
);
let crystalia = new Character(
    'Crystalia',
    150,
    60,
    30,
    'assets/Crystalia.png',
    'assets/CrystaliaFace.png'
);
let raiven = new Character(
    'Raiven',
    200,
    55,
    25,
    'assets/Raiven.png',
    'assets/RaivenFace.png'
);

let blazeEnemy = new Character(
    'Blaze',
    200,
    50,
    30,
    'assets/Blaze.png',
    'assets/BlazeFace.png',
    40,
    210
);
let alexiaEnemy = new Character(
    'Alexia',
    250,
    45,
    40,
    'assets/Alexia.png',
    'assets/AlexiaFace.png',
    330,
    345
);
let zarekEnemy = new Character(
    'Zarek',
    225,
    40,
    35,
    'assets/Zarek.png',
    'assets/ZarekFace.png',
    220,
    115
);
let dravenEnemy = new Character(
    'Draven',
    300,
    35,
    50,
    'assets/Draven.png',
    'assets/DravenFace.png',
    65,
    350
);
let crystaliaEnemy = new Character(
    'Crystalia',
    150,
    60,
    30,
    'assets/Crystalia.png',
    'assets/CrystaliaFace.png',
    495,
    30
);
let raivenEnemy = new Character(
    'Raiven',
    200,
    55,
    25,
    'assets/Raiven.png',
    'assets/RaivenFace.png',
    495,
    230
);

blaze.powers.push(
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' }
);
blaze.icons.push({ icon: '/assets/IconPowerPyro.png', name: POWERS.Pyro });

alexia.powers.push(
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Electro, id: 'button-electro' }
);
alexia.icons.push(
    { icon: '/assets/IconPowerPyro.png', name: POWERS.Pyro },
    { icon: '/assets/IconPowerElectro.png', name: POWERS.Electro }
);

zarek.powers.push(
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' },
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' },
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' },
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' }
);
zarek.icons.push({ icon: '/assets/IconPowerGeo.png', name: POWERS.Geo });

draven.powers.push(
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' },
    { name: POWERS.Pyro, id: 'button-pyro', icon: '/assets/IconPowerPyro.png' },
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' },
    { name: POWERS.Pyro, id: 'button-pyro', icon: '/assets/IconPowerPyro.png' }
);
draven.icons.push(
    { icon: '/assets/IconPowerGeo.png', name: POWERS.Geo },
    { icon: '/assets/IconPowerPyro.png', name: POWERS.Pyro }
);

crystalia.powers.push(
    { name: POWERS.Hydro, id: 'button-hydro' },
    { name: POWERS.Cryo, id: 'button-cryo' },
    { name: POWERS.Hydro, id: 'button-hydro' },
    { name: POWERS.Cryo, id: 'button-cryo' }
);
crystalia.icons.push(
    { icon: '/assets/IconPowerHydro.png', name: POWERS.Hydro },
    { icon: '/assets/IconPowerCryo.png', name: POWERS.Cryo }
);

raiven.powers.push(
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' }
);
raiven.icons.push({
    icon: '/assets/IconPowerElectro.png',
    name: POWERS.Electro,
});

characters.push(blaze, alexia, zarek, draven, crystalia, raiven);

blazeEnemy.powers.push(
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-pyro' }
);
blazeEnemy.icons.push({ icon: '/assets/IconPowerPyro.png', name: POWERS.Pyro });
blaze.strength.set(DAMAGE_TYPE[2], [], DAMAGE_TYPE['0.5'], [], DAMAGE_TYPE[0]);

alexiaEnemy.powers.push(
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Electro, id: 'button-electro' }
);
alexiaEnemy.icons.push(
    { icon: '/assets/IconPowerPyro.png', name: POWERS.Pyro },
    { icon: '/assets/IconPowerElectro.png', name: POWERS.Electro }
);

zarekEnemy.powers.push(
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' },
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' },
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' },
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' }
);
zarekEnemy.icons.push({ icon: '/assets/IconPowerGeo.png', name: POWERS.Geo });

dravenEnemy.powers.push(
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' },
    { name: POWERS.Pyro, id: 'button-pyro', icon: '/assets/IconPowerPyro.png' },
    { name: POWERS.Geo, id: 'button-geo', icon: '/assets/IconPowerGeo.png' },
    { name: POWERS.Pyro, id: 'button-pyro', icon: '/assets/IconPowerPyro.png' }
);
dravenEnemy.icons.push(
    { icon: '/assets/IconPowerGeo.png', name: POWERS.Geo },
    { icon: '/assets/IconPowerPyro.png', name: POWERS.Pyro }
);

crystaliaEnemy.powers.push(
    { name: POWERS.Hydro, id: 'button-hydro' },
    { name: POWERS.Cryo, id: 'button-cryo' },
    { name: POWERS.Hydro, id: 'button-hydro' },
    { name: POWERS.Cryo, id: 'button-cryo' }
);
crystaliaEnemy.icons.push(
    { icon: '/assets/IconPowerHydro.png', name: POWERS.Hydro },
    { icon: '/assets/IconPowerCryo.png', name: POWERS.Cryo }
);

raivenEnemy.powers.push(
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Electro, id: 'button-electro' }
);
raivenEnemy.icons.push({
    icon: '/assets/IconPowerElectro.png',
    name: POWERS.Electro,
});

charactersEnemies.push(
    blazeEnemy,
    alexiaEnemy,
    zarekEnemy,
    dravenEnemy,
    crystaliaEnemy,
    raivenEnemy
);

function setStrengthEachCharacter(characters) {
    characters.forEach((character) => {
        character.strength.set(DAMAGE_TYPE[2], []);
        character.strength.set(DAMAGE_TYPE['0.5'], []);
        character.strength.set(DAMAGE_TYPE[0], []);
        setStrength(character);
    });
}

function setStrength(character) {
    character.icons.forEach((power) => {
        switch (power.name) {
            case POWERS.Pyro:
                setStrengthPyro(character);
                break;
            case POWERS.Hydro:
                setStrengthHydro(character);
                break;
            case POWERS.Geo:
                setStrengthGeo(character);
                break;
            case POWERS.Cryo:
                setStrengthCryo(character);
                break;
            case POWERS.Electro:
                setStrengthElectro(character);
                break;
        }
    });
}

function setStrengthPyro(character) {
    if (!character.strength.get(DAMAGE_TYPE[2]).includes(POWERS.Cryo))
        character.strength.get(DAMAGE_TYPE[2]).push(POWERS.Cryo);

    if (!character.strength.get(DAMAGE_TYPE['0.5']).includes(POWERS.Hydro))
        character.strength.get(DAMAGE_TYPE['0.5']).push(POWERS.Hydro);
    if (!character.strength.get(DAMAGE_TYPE['0.5']).includes(POWERS.Geo))
        character.strength.get(DAMAGE_TYPE['0.5']).push(POWERS.Geo);

    if (!character.strength.get(DAMAGE_TYPE[0]).includes(POWERS.Pyro))
        character.strength.get(DAMAGE_TYPE[0]).push(POWERS.Pyro);
}

function setStrengthHydro(character) {
    if (!character.strength.get(DAMAGE_TYPE[2]).includes(POWERS.Pyro))
        character.strength.get(DAMAGE_TYPE[2]).push(POWERS.Pyro);

    if (!character.strength.get(DAMAGE_TYPE['0.5']).includes(POWERS.Electro))
        character.strength.get(DAMAGE_TYPE['0.5']).push(POWERS.Electro);

    if (!character.strength.get(DAMAGE_TYPE[0]).includes(POWERS.Hydro))
        character.strength.get(DAMAGE_TYPE[0]).push(POWERS.Hydro);
}

function setStrengthGeo(character) {
    if (!character.strength.get(DAMAGE_TYPE[2]).includes(POWERS.Pyro))
        character.strength.get(DAMAGE_TYPE[2]).push(POWERS.Pyro);
    if (!character.strength.get(DAMAGE_TYPE[2]).includes(POWERS.Electro))
        character.strength.get(DAMAGE_TYPE[2]).push(POWERS.Electro);

    if (!character.strength.get(DAMAGE_TYPE[0]).includes(POWERS.Geo))
        character.strength.get(DAMAGE_TYPE[0]).push(POWERS.Geo);
}

function setStrengthCryo(character) {
    if (!character.strength.get(DAMAGE_TYPE['0.5']).includes(POWERS.Pyro))
        character.strength.get(DAMAGE_TYPE['0.5']).push(POWERS.Pyro);

    if (!character.strength.get(DAMAGE_TYPE[0]).includes(POWERS.Cryo))
        character.strength.get(DAMAGE_TYPE[0]).push(POWERS.Cryo);
}

function setStrengthElectro(character) {
    if (!character.strength.get(DAMAGE_TYPE[2]).includes(POWERS.Hydro))
        character.strength.get(DAMAGE_TYPE[2]).push(POWERS.Hydro);

    if (!character.strength.get(DAMAGE_TYPE['0.5']).includes(POWERS.Geo))
        character.strength.get(DAMAGE_TYPE['0.5']).push(POWERS.Geo);

    if (!character.strength.get(DAMAGE_TYPE[0]).includes(POWERS.Electro))
        character.strength.get(DAMAGE_TYPE[0]).push(POWERS.Electro);
}

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

    allCharacters = characters.concat(charactersEnemies);
    setStrengthEachCharacter(allCharacters);
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

    showDisplayBattle(powers);
}

function showDisplayBattle(powers) {
    let charactersToPlay = [];
    charactersToPlay.push(objectCurrentCharacterPlayer);
    charactersToPlay.push(objectCurrentCharacterEnemy);

    charactersToPlay.forEach((character) => {
        let nameCharacter =
            character == objectCurrentCharacterPlayer ? 'player' : 'enemy';

        showCharacterInfo(character, nameCharacter);
        showDisplayCharacter(character, nameCharacter);
    });

    showPowers(powers);

    buttonRestart = document.getElementById('button-restart');
    buttonRestart.addEventListener('click', restartGame);

    startBattle();
}

function showCharacterInfo(character, nameCharacter) {
    let labelCharacterInfo = `
    <label id="label-character-${nameCharacter}" class="label-character">
    <div class="character-photo">
                    <img class="frame" src=${frameCharacter} alt="Frame" />
                    <img class="character-img"  src=${character.face} alt="Character" />
                    </div>
                    <div id="character-name-${nameCharacter}" class="character-name">
                    <p>${character.name}
                    <label id="label-powers-${nameCharacter}" ></label>
                    </p>
                    <div class="bar-container">
                    <div class="fill-life"></div>
                    </div>
                    </div>
                    </label>
                    `;
    containerCharacterInfo.innerHTML += labelCharacterInfo;

    let nameLabelPowers =
        nameCharacter == 'player'
            ? 'label-powers-player'
            : 'label-powers-enemy';

    let containerLabelPowers = document.getElementById(nameLabelPowers);

    character.icons.forEach((icon) => {
        let labelPower = `<img src=${icon.icon} alt="Icon Power" />`;
        containerLabelPowers.innerHTML += labelPower;
    });
}

function showDisplayCharacter(character, nameCharacter) {
    let characterDisplay = `<img id="character-display-${nameCharacter}" src=${character.photo} alt="Character">`;
    containerCharacterDisplay.innerHTML += characterDisplay;
}

function showPowers(powers) {
    powers.forEach((power) => {
        powersCharacter = `<button id=${power.id} class="button-power">${power.name} </button>`;
        containerPowers.innerHTML += powersCharacter;
    });

    buttons = document.querySelectorAll('.button-power');
}

function restartGame() {
    console.log('Reload');
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

function startBattle() {
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
    objectCurrentCharacterEnemy = enemy;
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
    combat();
}

function combat() {
    checkLives();
}

window.addEventListener('load', startGame);
