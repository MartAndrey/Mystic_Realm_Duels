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
const sectionButtonRestart = document.getElementById('restart');
const buttonRestart = document.getElementById('button-restart');

const buttonPyro = document.getElementById('button-pyro');
const buttonHydro = document.getElementById('button-hydro');
const buttonGeo = document.getElementById('button-geo');
const buttonCryo = document.getElementById('button-cryo');
const buttonElectro = document.getElementById('button-electro');

const spanLivesPlayer = document.getElementById('lives-player');
const spanLivesEnemy = document.getElementById('lives-enemy');
const spanCharacterPlayer = document.getElementById('character-player');
const spanCharacterEnemy = document.getElementById('character-enemy');

const sectionMessages = document.getElementById('result');
const pAttackPlayer = document.getElementById('attack-player');
const pAttackEnemy = document.getElementById('attack-enemy');
const containerCards = document.getElementById('container-cards');

let inputBlaze;
let inputAlexia;
let inputZarek;
let inputDraven;
let inputCrystalia;
let inputRaiven;

let characters = [];

let optionCharacter;

let currentCharacterPlayer;
let currentCharacterEnemy;

let attackPlayer;
let attackEnemy;

let livesPlayer = 3;
let livesEnemy = 3;

let blaze = new Character('Blaze', 'assets/Blaze.png', 5);
let alexia = new Character('Alexia', 'assets/Alexia.png', 5);
let zarek = new Character('Zarek', 'assets/Zarek.png', 5);
let draven = new Character('Draven', 'assets/Draven.png', 5);
let crystalia = new Character('Crystalia', 'assets/Crystalia.png', 5);
let raiven = new Character('Raiven', 'assets/Raiven.png', 5);

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
    { name: POWERS.Geo, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-geo' },
    { name: POWERS.Gep, id: 'button-pyro' },
    { name: POWERS.Pyro, id: 'button-geo' }
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

characters.push(blaze, alexia, zarek, draven, crystalia, raiven);

function startGame() {
    sectionSelectPower.style.display = 'none';
    sectionButtonRestart.style.display = 'none';

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
    sectionSelectPower.style.display = 'flex';

    if (inputBlaze.checked) currentCharacterPlayer = CHARACTER.Blaze;
    else if (inputAlexia.checked) currentCharacterPlayer = CHARACTER.Alexia;
    else if (inputZarek.checked) currentCharacterPlayer = CHARACTER.Zarek;
    else if (inputDraven.checked) currentCharacterPlayer = CHARACTER.Draven;
    else if (inputCrystalia.checked)
        currentCharacterPlayer = CHARACTER.Crystalia;
    else if (inputRaiven.checked) currentCharacterPlayer = CHARACTER.Raiven;
    else alert('You must select a character ');

    spanCharacterPlayer.innerHTML = currentCharacterPlayer;

    selectCharacterEnemy();

    SelectPower();
}

function selectCharacterEnemy() {
    let characterRandom = random(1, 6);

    if (characterRandom == 1) currentCharacterEnemy = CHARACTER.Blaze;
    else if (characterRandom == 2) currentCharacterEnemy = CHARACTER.Alexia;
    else if (characterRandom == 3) currentCharacterEnemy = CHARACTER.Zarek;
    else if (characterRandom == 4) currentCharacterEnemy = CHARACTER.Draven;
    else if (characterRandom == 5) currentCharacterEnemy = CHARACTER.Crystalia;
    else if (characterRandom == 6) currentCharacterEnemy = CHARACTER.Raiven;

    spanCharacterEnemy.innerHTML = currentCharacterEnemy;
}

function SelectPower() {
    buttonPyro.addEventListener('click', powerPyro);
    buttonHydro.addEventListener('click', powerHydro);
    buttonGeo.addEventListener('click', powerGeo);
    buttonCryo.addEventListener('click', powerCryo);
    buttonElectro.addEventListener('click', powerElectro);
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
    let powerRandom = random(1, 5);

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

    createMessage(result);

    checkLives();
}

function checkLives() {
    if (livesEnemy <= 0) createFinalMessage('Congratulation! YOU WIN😃');
    else if (livesPlayer <= 0) createFinalMessage('Sorry! YOU LOST😔');
}

function createMessage(result) {
    let newAttackPlayer = document.createElement('p');
    let newAttackEnemy = document.createElement('p');

    sectionMessages.innerHTML = result;
    newAttackPlayer.innerHTML = attackPlayer;
    newAttackEnemy.innerHTML = attackEnemy;

    pAttackPlayer.appendChild(newAttackPlayer);
    pAttackEnemy.appendChild(newAttackEnemy);
}

function createFinalMessage(finalResult) {
    sectionMessages.innerHTML = finalResult;

    disabledButtonsPower();

    sectionButtonRestart.style.display = 'block';
}

function disabledButtonsPower() {
    buttonPyro.disabled = true;
    buttonHydro.disabled = true;
    buttonGeo.disabled = true;
    buttonCryo.disabled = true;
    buttonElectro.disabled = true;
}

function restartGame() {
    location.reload();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', startGame);

// const cardContainer = document.getElementById("card-container");
// const scrollStep = 200; // la cantidad de píxeles para desplazarse
// window.addEventListener("keydown", (event) => {
//   if (event.keyCode === 39) { // tecla derecha
//     cardContainer.scrollLeft += scrollStep;
//   } else if (event.keyCode === 37) { // tecla izquierda
//     cardContainer.scrollLeft -= scrollStep;
//   }
// });
