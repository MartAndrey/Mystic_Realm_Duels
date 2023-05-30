import { Character } from './character.js';
import { Element } from './elements.js';

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
    Melee: 'Melee',
    Defense: 'Defense',
};

const DAMAGE_TYPE = {
    2: 2,
    1.5: 1.5,
    0.5: 0.5,
    0: 0,
};

const TURN = {
    Player: 'Player',
    Enemy: 'Enemy',
};

const NUMBER_PLAYER = {
    P1: '/assets/P1.png',
    P2: '/assets/P2.png',
    P3: '/assets/P3.png',
    P4: '/assets/P4.png',
};

const sectionSelectCharacter = document.getElementById('select-character');
const sectionSelectPower = document.getElementById('select-power');
const buttonCharacterPlayer = document.getElementById('button-character');

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
const maxWidthMap = 600;

const colorTurn = '#bdc2be';
const colorNormal = '#444444';

const colorDamageCritical = 'rgba(255, 0, 0, 0.7)';
const colorDamageStrong = 'rgba(255, 175, 1, 0.7)';
const colorDamageImmune = 'rgba(1, 255, 1, 0.7)';
const colorDamageNormal = 'rgba(238, 255, 0, 0.7)';

let buttonRestart;

// let playerId = null;

let inputBlaze;
let inputAlexia;
let inputZarek;
let inputDraven;
let inputCrystalia;
let inputRaiven;

let buttons = [];
let characters = [];
let charactersEnemies = [];

let optionCharacter;
let powersCharacter;

let objectCurrentCharacterPlayer;
let objectCurrentCharacterEnemy;
let currentCharacterPlayer;
let currentElement;

let barLifePlayer;
let barLifeEnemy;

let labelPlayer;
let labelEnemy;

let informationDamagePlayer;
let informationDamageEnemy;

let colorInformationDamage;

let currentTurn;

let canvas = map.getContext('2d');

let interval;

let mapBackground = new Image();
mapBackground.src = '/assets/map.png';

adjustMap();

let blaze = new Character(
    'Blaze',
    200,
    50,
    30,
    'assets/Blaze.png',
    'assets/BlazeFace.png',
    map.width,
    map.height
);
let alexia = new Character(
    'Alexia',
    250,
    45,
    40,
    'assets/Alexia.png',
    'assets/AlexiaFace.png',
    map.width,
    map.height
);
let zarek = new Character(
    'Zarek',
    225,
    40,
    35,
    'assets/Zarek.png',
    'assets/ZarekFace.png',
    map.width,
    map.height
);
let draven = new Character(
    'Draven',
    300,
    35,
    50,
    'assets/Draven.png',
    'assets/DravenFace.png',
    map.width,
    map.height
);
let crystalia = new Character(
    'Crystalia',
    150,
    60,
    30,
    'assets/Crystalia.png',
    'assets/CrystaliaFace.png',
    map.width,
    map.height
);
let raiven = new Character(
    'Raiven',
    200,
    55,
    25,
    'assets/Raiven.png',
    'assets/RaivenFace.png',
    map.width,
    map.height
);

let blazeEnemy = new Character(
    'Blaze',
    200,
    50,
    30,
    'assets/Blaze.png',
    'assets/BlazeFace.png',
    map.width,
    map.height
);
let alexiaEnemy = new Character(
    'Alexia',
    250,
    45,
    40,
    'assets/Alexia.png',
    'assets/AlexiaFace.png',
    map.width,
    map.height
);
let zarekEnemy = new Character(
    'Zarek',
    225,
    40,
    35,
    'assets/Zarek.png',
    'assets/ZarekFace.png',
    map.width,
    map.height
);
let dravenEnemy = new Character(
    'Draven',
    300,
    35,
    50,
    'assets/Draven.png',
    'assets/DravenFace.png',
    map.width,
    map.height
);
let crystaliaEnemy = new Character(
    'Crystalia',
    150,
    60,
    30,
    'assets/Crystalia.png',
    'assets/CrystaliaFace.png',
    map.width,
    map.height
);
let raivenEnemy = new Character(
    'Raiven',
    200,
    55,
    25,
    'assets/Raiven.png',
    'assets/RaivenFace.png',
    map.width,
    map.height
);

const BLAZE_POWERS = [
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Defense, id: 'button-defense' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Melee, id: 'button-melee' },
];
const BLAZE_ICONS = [{ icon: '/assets/IconPowerPyro.png', name: POWERS.Pyro }];

const ALEXIA_POWERS = [
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Melee, id: 'button-melee' },
];
const ALEXIA_ICONS = [
    { icon: '/assets/IconPowerPyro.png', name: POWERS.Pyro },
    { icon: '/assets/IconPowerElectro.png', name: POWERS.Electro },
];

const ZAREK_POWERS = [
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Defense, id: 'button-defense' },
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Melee, id: 'button-melee' },
];
const ZAREK_ICONS = [{ icon: '/assets/IconPowerGeo.png', name: POWERS.Geo }];

const DRAVEN_POWERS = [
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Pyro, id: 'button-pyro' },
    { name: POWERS.Geo, id: 'button-geo' },
    { name: POWERS.Melee, id: 'button-melee' },
];
const DRAVEN_ICONS = [
    { icon: '/assets/IconPowerGeo.png', name: POWERS.Geo },
    { icon: '/assets/IconPowerPyro.png', name: POWERS.Pyro },
];

const CRYSTALIA_POWERS = [
    { name: POWERS.Hydro, id: 'button-hydro' },
    { name: POWERS.Cryo, id: 'button-cryo' },
    { name: POWERS.Hydro, id: 'button-hydro' },
    { name: POWERS.Melee, id: 'button-melee' },
];
const CRYSTALIA_ICONS = [
    { icon: '/assets/IconPowerHydro.png', name: POWERS.Hydro },
    { icon: '/assets/IconPowerCryo.png', name: POWERS.Cryo },
];

const RAIVEN_POWERS = [
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Defense, id: 'button-defense' },
    { name: POWERS.Electro, id: 'button-electro' },
    { name: POWERS.Melee, id: 'button-melee' },
];
const RAIVEN_ICONS = [
    { icon: '/assets/IconPowerElectro.png', name: POWERS.Electro },
];

blaze.powers.push(...BLAZE_POWERS);
blaze.icons.push(...BLAZE_ICONS);

alexia.powers.push(...ALEXIA_POWERS);
alexia.icons.push(...ALEXIA_ICONS);

zarek.powers.push(...ZAREK_POWERS);
zarek.icons.push(...ZAREK_ICONS);

draven.powers.push(...DRAVEN_POWERS);
draven.icons.push(...DRAVEN_ICONS);

crystalia.powers.push(...CRYSTALIA_POWERS);
crystalia.icons.push(...CRYSTALIA_ICONS);

raiven.powers.push(...RAIVEN_POWERS);
raiven.icons.push(...RAIVEN_ICONS);

characters.push(blaze, alexia, zarek, draven, crystalia, raiven);

blazeEnemy.powers.push(...BLAZE_POWERS);
blazeEnemy.icons.push(...BLAZE_ICONS);

alexiaEnemy.powers.push(...ALEXIA_POWERS);
alexiaEnemy.icons.push(...ALEXIA_ICONS);

zarekEnemy.powers.push(...ZAREK_POWERS);
zarekEnemy.icons.push(...ZAREK_ICONS);

dravenEnemy.powers.push(...DRAVEN_POWERS);
dravenEnemy.icons.push(...DRAVEN_ICONS);

crystaliaEnemy.powers.push(...CRYSTALIA_POWERS);
crystaliaEnemy.icons.push(...CRYSTALIA_ICONS);

raivenEnemy.powers.push(...RAIVEN_POWERS);
raivenEnemy.icons.push(...RAIVEN_ICONS);

charactersEnemies.push(
    blazeEnemy,
    alexiaEnemy,
    zarekEnemy,
    dravenEnemy,
    crystaliaEnemy,
    raivenEnemy
);

const ELEMENT_PYRO = new Element([
    DAMAGE_TYPE[2],
    DAMAGE_TYPE['1.5'],
    DAMAGE_TYPE['0.5'],
    DAMAGE_TYPE[0],
]);
const ELEMENT_HYDRO = new Element([
    DAMAGE_TYPE[2],
    DAMAGE_TYPE['1.5'],
    DAMAGE_TYPE['0.5'],
    DAMAGE_TYPE[0],
]);
const ELEMENT_GEO = new Element([
    DAMAGE_TYPE[2],
    DAMAGE_TYPE['1.5'],
    DAMAGE_TYPE['0.5'],
    DAMAGE_TYPE[0],
]);
const ELEMENT_CRYO = new Element([
    DAMAGE_TYPE[2],
    DAMAGE_TYPE['1.5'],
    DAMAGE_TYPE['0.5'],
    DAMAGE_TYPE[0],
]);
const ELEMENT_ELECTRO = new Element([
    DAMAGE_TYPE[2],
    DAMAGE_TYPE['1.5'],
    DAMAGE_TYPE['0.5'],
    DAMAGE_TYPE[0],
]);
const ELEMENT_MELEE = new Element([DAMAGE_TYPE['0.5']]);

ELEMENT_PYRO.strengths.get(DAMAGE_TYPE[2]).push(POWERS.Cryo);
ELEMENT_PYRO.strengths.get(DAMAGE_TYPE['1.5']).push(POWERS.Hydro);
ELEMENT_PYRO.strengths.get(DAMAGE_TYPE['1.5']).push(POWERS.Geo);
ELEMENT_PYRO.strengths.get(DAMAGE_TYPE[0]).push(POWERS.Pyro);

ELEMENT_HYDRO.strengths.get(DAMAGE_TYPE[2]).push(POWERS.Pyro);
ELEMENT_HYDRO.strengths.get(DAMAGE_TYPE['1.5']).push(POWERS.Electro);
ELEMENT_HYDRO.strengths.get(DAMAGE_TYPE[0]).push(POWERS.Hydro);

ELEMENT_GEO.strengths.get(DAMAGE_TYPE[2]).push(POWERS.Pyro);
ELEMENT_GEO.strengths.get(DAMAGE_TYPE[2]).push(POWERS.Electro);
ELEMENT_GEO.strengths.get(DAMAGE_TYPE[0]).push(POWERS.Geo);

ELEMENT_CRYO.strengths.get(DAMAGE_TYPE['1.5']).push(POWERS.Pyro);
ELEMENT_CRYO.strengths.get(DAMAGE_TYPE[0]).push(POWERS.Cryo);

ELEMENT_ELECTRO.strengths.get(DAMAGE_TYPE[2]).push(POWERS.Hydro);
ELEMENT_ELECTRO.strengths.get(DAMAGE_TYPE['1.5']).push(POWERS.Geo);
ELEMENT_ELECTRO.strengths.get(DAMAGE_TYPE[0]).push(POWERS.Electro);

ELEMENT_MELEE.strengths.get(DAMAGE_TYPE['0.5']).push(POWERS.Pyro);
ELEMENT_MELEE.strengths.get(DAMAGE_TYPE['0.5']).push(POWERS.Hydro);
ELEMENT_MELEE.strengths.get(DAMAGE_TYPE['0.5']).push(POWERS.Geo);
ELEMENT_MELEE.strengths.get(DAMAGE_TYPE['0.5']).push(POWERS.Cryo);
ELEMENT_MELEE.strengths.get(DAMAGE_TYPE['0.5']).push(POWERS.Electro);

function adjustMap() {
    let heightMap;
    let widthMap = sectionSeeMap.getBoundingClientRect().width - 20;

    heightMap = (widthMap * 600) / 800;

    if (widthMap > maxWidthMap) {
        widthMap = maxWidthMap - 20;
        heightMap = (widthMap * 600) / 800;
    }

    map.width = widthMap;
    map.height = heightMap;
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

    // joinGame();
}

// function joinGame() {
//     fetch('http://localhost:8080/join').then((res) => {
//         if (res.ok)
//             res.text().then((result) => {
//                 playerId = result;
//                 console.log(playerId);
//             });
//     });
// }

function selectCharacterPlayer() {
    if (inputBlaze.checked) currentCharacterPlayer = CHARACTER.Blaze;
    else if (inputAlexia.checked) currentCharacterPlayer = CHARACTER.Alexia;
    else if (inputZarek.checked) currentCharacterPlayer = CHARACTER.Zarek;
    else if (inputDraven.checked) currentCharacterPlayer = CHARACTER.Draven;
    else if (inputCrystalia.checked)
        currentCharacterPlayer = CHARACTER.Crystalia;
    else if (inputRaiven.checked) currentCharacterPlayer = CHARACTER.Raiven;
    else {
        alert('You must select a character ');
        return;
    }
    // selectCharacter(currentCharacterPlayer);

    startMap();
}

// function selectCharacter(characterPlayer) {
//     fetch(`http://localhost:8080/mired/${playerId}`, {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             character: characterPlayer,
//         }),
//     });
// }

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
                    <span id="span-${nameCharacter}" >${character.name}
                    <label id="label-powers-${nameCharacter}" ></label>
                    </span>
                    <div class="bar-container">
                    <div id="bar-life-${nameCharacter}" class="fill-life"></div>
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
    location.reload();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function startMap() {
    sectionSelectCharacter.style.display = 'none';
    sectionSeeMap.style.display = 'flex';

    objectCurrentCharacterPlayer = findCurrentCharacter();
    objectCurrentCharacterPlayer.setNumberPlayer(NUMBER_PLAYER.P1);

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
    objectCurrentCharacterPlayer.drawNumberPlayer(canvas);
    // sendPosition(
    //     objectCurrentCharacterPlayer.x,
    //     objectCurrentCharacterPlayer.y
    // );

    // charactersEnemies.forEach((character) => {
    //     character.drawCharacter(canvas);
    //     checkCollision(character);
    // });

    charactersEnemies.forEach(enemy => enemy.drawCharacter(canvas))

    if (
        objectCurrentCharacterPlayer.speedX !== 0 ||
        objectCurrentCharacterPlayer.speedY !== 0
    ) {
        charactersEnemies.forEach(enemy => checkCollision(enemy))
    }
}

// function sendPosition(x, y) {
//     fetch(`http://localhost:8080/mired/${playerId}/position`, {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             x,
//             y,
//         }),
//     }).then((res) => {
//         if (res.ok) {
//             res.json().then(({ enemies }) => {
//                 showEnemiesToMap(enemies);
//             });
//         }
//     });
// }

// function showEnemiesToMap(enemies) {
//     charactersEnemies = enemies.map((enemy) => {
//         let characterEnemy = null;
//         const characterName = enemy.character.name || '';

//         switch (characterName) {
//             case CHARACTER.Blaze:
//                 characterEnemy = new Character(
//                     'Blaze',
//                     200,
//                     50,
//                     30,
//                     'assets/Blaze.png',
//                     'assets/BlazeFace.png',
//                     map.width,
//                     map.height
//                 );
//                 break;
//             case CHARACTER.Alexia:
//                 characterEnemy = new Character(
//                     'Alexia',
//                     250,
//                     45,
//                     40,
//                     'assets/Alexia.png',
//                     'assets/AlexiaFace.png',
//                     map.width,
//                     map.height
//                 );
//                 break;
//             case CHARACTER.Zarek:
//                 characterEnemy = new Character(
//                     'Zarek',
//                     225,
//                     40,
//                     35,
//                     'assets/Zarek.png',
//                     'assets/ZarekFace.png',
//                     map.width,
//                     map.height
//                 );
//                 break;
//             case CHARACTER.Draven:
//                 characterEnemy = new Character(
//                     'Draven',
//                     300,
//                     35,
//                     50,
//                     'assets/Draven.png',
//                     'assets/DravenFace.png',
//                     map.width,
//                     map.height
//                 );
//                 break;
//             case CHARACTER.Crystalia:
//                 characterEnemy = new Character(
//                     'Crystalia',
//                     150,
//                     60,
//                     30,
//                     'assets/Crystalia.png',
//                     'assets/CrystaliaFace.png',
//                     map.width,
//                     map.height
//                 );
//                 break;
//             case CHARACTER.Raiven:
//                 characterEnemy = new Character(
//                     'Raiven',
//                     200,
//                     55,
//                     25,
//                     'assets/Raiven.png',
//                     'assets/RaivenFace.png',
//                     map.width,
//                     map.height
//                 );
//                 break;
//         }

//         characterEnemy.x = enemy.x;
//         characterEnemy.y = enemy.y;

//         return characterEnemy;
//     });
// }

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
    barLifePlayer = document.getElementById('bar-life-player');
    barLifeEnemy = document.getElementById('bar-life-enemy');

    labelPlayer = document.getElementById('span-player');
    labelEnemy = document.getElementById('span-enemy');

    informationDamagePlayer = document.getElementById(
        'information-damage-player'
    );
    informationDamagePlayer.style.display = 'none';
    informationDamageEnemy = document.getElementById(
        'information-damage-enemy'
    );
    informationDamageEnemy.style.display = 'none';

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            let power = e.target.textContent.trim();
            checkTurn(power);
        });
    });

    setTimeout(() => {
        getTurnRandom();
    }, 1100);
}

function getTurnRandom() {
    let turnRandom = random(1, Object.keys(TURN).length);

    currentTurn = turnRandom == 1 ? TURN.Player : TURN.Enemy;

    if (currentTurn == TURN.Enemy) {
        colorEnemyTurn();

        setTimeout(() => {
            setPowerEnemy();
        }, 500);
    } else colorPlayerTurn();
}

function checkTurn(power) {
    if (currentTurn == TURN.Player) getPowerToCharacter(power);
}

function getPowerToCharacter(power) {
    if (power === POWERS.Pyro) {
        powerPyro();
    } else if (power === POWERS.Hydro) {
        powerHydro();
    } else if (power === POWERS.Geo) {
        powerGeo();
    } else if (power === POWERS.Cryo) {
        powerCryo();
    } else if (power === POWERS.Electro) {
        powerElectro();
    } else if (power === POWERS.Melee) {
        powerMelee();
    } else if (power === POWERS.Defense) {
        powerDefense();
    }
    let characterEnemy =
        currentTurn == TURN.Player
            ? objectCurrentCharacterEnemy
            : objectCurrentCharacterPlayer;

    combat(characterEnemy);
}

function selectCharacterEnemy(enemy) {
    objectCurrentCharacterEnemy = enemy;
}

function powerPyro() {
    currentElement = ELEMENT_PYRO;
}

function powerHydro() {
    currentElement = ELEMENT_HYDRO;
}

function powerGeo() {
    currentElement = ELEMENT_GEO;
}

function powerCryo() {
    currentElement = ELEMENT_CRYO;
}

function powerElectro() {
    currentElement = ELEMENT_ELECTRO;
}

function powerMelee() {
    currentElement = ELEMENT_MELEE;
}

function powerDefense() {
    currentElement = POWERS.Defense;
}

function setPowerEnemy() {
    let powerRandom = random(0, objectCurrentCharacterEnemy.powers.length - 1);

    let attackEnemy = objectCurrentCharacterEnemy.powers[powerRandom].name;

    getPowerToCharacter(attackEnemy);
}

function combat(characterEnemy) {
    if (currentElement == POWERS.Defense) {
        const character =
            currentTurn == TURN.Player
                ? objectCurrentCharacterPlayer
                : objectCurrentCharacterEnemy;
        character.defenseIncrease(0.5);

        if (currentTurn == TURN.Player) {
            informationDamagePlayer.style.display = 'flex';
            informationDamagePlayer.style.backgroundColor = colorDamageNormal;
            informationDamagePlayer.innerHTML = `Defense <br> +50%`;
        } else {
            informationDamageEnemy.style.display = 'flex';
            informationDamageEnemy.style.backgroundColor = colorDamageNormal;
            informationDamageEnemy.innerHTML = `Defense <br> +50%`;
        }
    }

    if (currentElement != POWERS.Defense) {
        let weaknessEnemy = characterEnemy.powers[0].name;
        let multiplier = getMultiplierFactor(weaknessEnemy);
        characterEnemy.changeLife(getNetDamage(characterEnemy, multiplier));
        ChangeLifeUI(characterEnemy);
    }

    checkLives();

    changeTurn();
}

function getMultiplierFactor(weaknessEnemy) {
    let entries = currentElement.strengths.entries();
    let entriesArray = Array.from(entries);

    let result = entriesArray.find(([key, value]) =>
        value.includes(weaknessEnemy)
    );

    if (result === undefined) return 1;

    let [key, value] = result;

    return key;
}

function getNetDamage(characterEnemy, multiplier) {
    let character =
        currentTurn == TURN.Player
            ? objectCurrentCharacterPlayer
            : objectCurrentCharacterEnemy;

    let getNetDamage;

    if (currentElement == ELEMENT_MELEE)
        getNetDamage =
            character.damage * multiplier - characterEnemy.defense / 2;
    else getNetDamage = character.damage * multiplier - characterEnemy.defense;

    if (getNetDamage < 0) getNetDamage = 0;

    if (characterEnemy.timesDefenseIncrease >= 1)
        characterEnemy.defenseDecrease();

    if (currentTurn == TURN.Enemy) {
        let textMultiplier = getMultiplierText(multiplier);
        informationDamagePlayer.style.display = 'flex';
        informationDamagePlayer.style.backgroundColor = colorInformationDamage;
        informationDamagePlayer.innerHTML = `${textMultiplier} <br> ${getNetDamage}`;
    } else {
        let textMultiplier = getMultiplierText(multiplier);
        informationDamageEnemy.style.display = 'flex';
        informationDamageEnemy.style.backgroundColor = colorInformationDamage;
        informationDamageEnemy.innerHTML = `${textMultiplier} <br> ${getNetDamage}`;
    }

    return getNetDamage;
}

function getMultiplierText(multiplier) {
    if (multiplier == DAMAGE_TYPE[2]) {
        colorInformationDamage = colorDamageCritical;
        return 'Critical';
    } else if (multiplier == DAMAGE_TYPE['1.5']) {
        colorInformationDamage = colorDamageStrong;
        return 'Strong';
    } else if (multiplier == DAMAGE_TYPE[0]) {
        colorInformationDamage = colorDamageImmune;
        return 'Immune';
    } else {
        colorInformationDamage = colorDamageNormal;
        return '';
    }
}

function checkLives() {
    if (objectCurrentCharacterPlayer.life <= 0) lose();
    else if (objectCurrentCharacterEnemy.life <= 0) win();
}

function ChangeLifeUI(character) {
    let barLife = currentTurn == TURN.Player ? barLifeEnemy : barLifePlayer;

    let scale = character.life / character.maxLife;

    barLife.style.transform = `scaleX(${scale})`;
}

function changeTurn() {
    currentTurn = currentTurn == TURN.Player ? TURN.Enemy : TURN.Player;

    if (currentTurn == TURN.Enemy) {
        colorEnemyTurn();

        setTimeout(setPowerEnemy, 1000);
    } else colorPlayerTurn();
}

function colorPlayerTurn() {
    labelPlayer.style.backgroundColor = colorTurn;
    labelEnemy.style.backgroundColor = colorNormal;
    containerPowers.style.display = 'flex';
    if (currentElement != POWERS.Defense)
        informationDamageEnemy.style.display = 'none';
}

function colorEnemyTurn() {
    labelPlayer.style.backgroundColor = colorNormal;
    labelEnemy.style.backgroundColor = colorTurn;
    containerPowers.style.display = 'none';
    if (currentElement != POWERS.Defense)
        informationDamagePlayer.style.display = 'none';
}

function win() {
    sectionSelectPower.style.display = 'none';
    console.log(charactersEnemies);
    const indexEnemy = charactersEnemies.findIndex(enemy=> enemy.name == objectCurrentCharacterEnemy.name)
    charactersEnemies.splice(indexEnemy, 1)
    console.log("");
    console.log(charactersEnemies);
    // startMap();
}
function lose() {}

window.addEventListener('load', startGame);
