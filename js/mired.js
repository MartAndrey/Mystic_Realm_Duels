const CHARACTER = {
    InfernoFury: 'Inferno Fury',
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

let currentCharacterPlayer;
let currentCharacterEnemy;

let attackPlayer;
let attackEnemy;

let livesPlayer = 3;
let livesEnemy = 3;

function startGame() {
    let sectionSelectPower = document.getElementById('select-power');
    sectionSelectPower.style.display = 'none';

    let sectionButtonRestart = document.getElementById('restart');
    sectionButtonRestart.style.display = 'none';

    let buttonCharacterPlayer = document.getElementById('button-character');
    buttonCharacterPlayer.addEventListener('click', selectCharacterPlayer);

    let buttonRestart = document.getElementById('button-restart');
    buttonRestart.addEventListener('click', restartGame);
}

function selectCharacterPlayer() {
    let sectionSelectCharacter = document.getElementById('select-character');
    sectionSelectCharacter.style.display = 'none';

    let sectionSelectPower = document.getElementById('select-power');
    sectionSelectPower.style.display = 'block';

    let infernoFury = document.getElementById('inferno-fury');
    let alexia = document.getElementById('alexia');
    let zarek = document.getElementById('zarek');
    let draven = document.getElementById('draven');
    let crystalia = document.getElementById('crystalia');
    let raiven = document.getElementById('raiven');

    let spanCharacterPlayer = document.getElementById('character-player');

    if (infernoFury.checked) currentCharacterPlayer = CHARACTER.InfernoFury;
    else if (alexia.checked) currentCharacterPlayer = CHARACTER.Alexia;
    else if (zarek.checked) currentCharacterPlayer = CHARACTER.Zarek;
    else if (draven.checked) currentCharacterPlayer = CHARACTER.Draven;
    else if (crystalia.checked) currentCharacterPlayer = CHARACTER.Crystalia;
    else if (raiven.checked) currentCharacterPlayer = CHARACTER.Raiven;
    else alert('You must select a character ');

    spanCharacterPlayer.innerHTML = currentCharacterPlayer;

    selectCharacterEnemy();

    SelectPower();
}

function selectCharacterEnemy() {
    let characterRandom = random(1, 6);
    let spanCharacterEnemy = document.getElementById('character-enemy');

    if (characterRandom == 1) currentCharacterEnemy = CHARACTER.InfernoFury;
    else if (characterRandom == 2) currentCharacterEnemy = CHARACTER.Alexia;
    else if (characterRandom == 3) currentCharacterEnemy = CHARACTER.Zarek;
    else if (characterRandom == 4) currentCharacterEnemy = CHARACTER.Draven;
    else if (characterRandom == 5) currentCharacterEnemy = CHARACTER.Crystalia;
    else if (characterRandom == 6) currentCharacterEnemy = CHARACTER.Raiven;

    spanCharacterEnemy.innerHTML = currentCharacterEnemy;
}

function SelectPower() {
    let buttonPyro = document.getElementById('button-pyro');
    buttonPyro.addEventListener('click', powerPyro);
    let buttonHydro = document.getElementById('button-hydro');
    buttonHydro.addEventListener('click', powerHydro);
    // let buttonGeo = document.getElementById('button-geo');
    // buttonGeo.addEventListener('click', powerGeo);
    let buttonCryo = document.getElementById('button-cryo');
    buttonCryo.addEventListener('click', powerCryo);
    let buttonElectro = document.getElementById('button-electro');
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
    else if (powerRandom == 3) attackEnemy = POWERS.Pyro; // Change to GEO
    else if (powerRandom == 4) attackEnemy = POWERS.Cryo;
    else if (powerRandom == 5) attackEnemy = POWERS.Electro;

    combat();
}

function createMessage(result) {
    let sectionMessages = document.getElementById('messages');
    let paragraph = document.createElement('p');

    paragraph.innerHTML = `Your character attacked with ${attackPlayer}, the enemy character attacked with ${attackEnemy} - ${result}`;

    sectionMessages.appendChild(paragraph);
}

function combat() {
    let result;

    let spanLivesPlayer = document.getElementById('lives-player');
    let spanLivesEnemy = document.getElementById('lives-enemy');

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
    // else if (attackPlayer == Powers.Geo && attackEnemy == Powers.Cryo) {

    // }

    createMessage(result);

    checkLives();
}

function checkLives() {
    if (livesEnemy <= 0) createFinalMessage('Congratulation! YOU WIN😃');
    else if (livesPlayer <= 0) createFinalMessage('Sorry! YOU LOST😔');
}

function createFinalMessage(finalResult) {
    let sectionMessages = document.getElementById('messages');
    let paragraph = document.createElement('p');

    paragraph.innerHTML = finalResult;

    sectionMessages.appendChild(paragraph);

    disabledButtonsPower();

    let sectionButtonRestart = document.getElementById('restart');
    sectionButtonRestart.style.display = 'block';
}

function disabledButtonsPower()
{
    let buttonPyro = document.getElementById('button-pyro');
    buttonPyro.disabled = true;
    let buttonHydro = document.getElementById('button-hydro');
    buttonHydro.disabled = true;
    // let buttonGeo = document.getElementById('button-geo');
    // buttonGeo.disabled = true;
    let buttonCryo = document.getElementById('button-cryo');
    buttonCryo.disabled = true;
    let buttonElectro = document.getElementById('button-electro');
    buttonElectro.disabled = true;
}

function restartGame() {
    location.reload();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', startGame);
