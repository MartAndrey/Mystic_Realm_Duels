const PETS = {
    Hipodoge: 'Hipodoge',
    Capipepo: 'Capipepo',
    Ratigueya: 'Ratigueya',
    Langostelvis: 'Langostelvis',
    Tucapalma: 'Tucapalma',
    Pydos: 'Pydos',
};

const POWERS = {
    Pyro: 'Pyro',
    Hydro: 'Hydro',
    Geo: 'Geo',
    Cryo: 'Cryo',
    Electro: 'Electro',
};

let currentPetPlayer;
let currentPetEnemy;

let attackPlayer;
let attackEnemy;

let livesPlayer = 3;
let livesEnemy = 3;

function startGame() {
    let sectionSelectPower = document.getElementById('select-power');
    sectionSelectPower.style.display = 'none';

    let sectionButtonRestart = document.getElementById('restart');
    sectionButtonRestart.style.display = 'none';

    let buttonPetPlayer = document.getElementById('button-pet');
    buttonPetPlayer.addEventListener('click', selectPetPlayer);

    let buttonRestart = document.getElementById('button-restart');
    buttonRestart.addEventListener('click', restartGame);
}

function selectPetPlayer() {
    let sectionSelectPet = document.getElementById('select-pet');
    sectionSelectPet.style.display = 'none';

    let sectionSelectPower = document.getElementById('select-power');
    sectionSelectPower.style.display = 'block';

    let hipodoge = document.getElementById('hipodoge');
    let capipepo = document.getElementById('capipepo');
    let ratigueya = document.getElementById('ratigueya');
    let langostelvis = document.getElementById('langostelvis');
    let tucapalma = document.getElementById('tucapalma');
    let pydos = document.getElementById('pydos');

    let spanPetPlayer = document.getElementById('pet-player');

    if (hipodoge.checked) currentPetPlayer = PETS.Hipodoge;
    else if (capipepo.checked) currentPetPlayer = PETS.Capipepo;
    else if (ratigueya.checked) currentPetPlayer = PETS.Ratigueya;
    else if (langostelvis.checked) currentPetPlayer = PETS.Langostelvis;
    else if (tucapalma.checked) currentPetPlayer = PETS.Tucapalma;
    else if (pydos.checked) currentPetPlayer = PETS.Pydos;
    else alert('You must select a pet ');

    spanPetPlayer.innerHTML = currentPetPlayer;

    selectPetEnemy();

    SelectPower();
}

function selectPetEnemy() {
    let petRandom = random(1, 6);
    let spanPetEnemy = document.getElementById('pet-enemy');

    if (petRandom == 1) currentPetEnemy = PETS.Hipodoge;
    else if (petRandom == 2) currentPetEnemy = PETS.Capipepo;
    else if (petRandom == 3) currentPetEnemy = PETS.Ratigueya;
    else if (petRandom == 4) currentPetEnemy = PETS.Langostelvis;
    else if (petRandom == 5) currentPetEnemy = PETS.Tucapalma;
    else if (petRandom == 6) currentPetEnemy = PETS.Pydos;

    spanPetEnemy.innerHTML = currentPetEnemy;
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

    paragraph.innerHTML = `Your pet attacked with ${attackPlayer}, the enemy pet attacked with ${attackEnemy} - ${result}`;

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
