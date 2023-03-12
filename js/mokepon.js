const Pets = {
    Hipodoge: 'Hipodoge',
    Capipepo: 'Capipepo',
    Ratigueya: 'Ratigueya',
    Langostelvis: 'Langostelvis',
    Tucapalma: 'Tucapalma',
    Pydos: 'Pydos',
};

const Powers = {
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

    if (hipodoge.checked) currentPetPlayer = Pets.Hipodoge;
    else if (capipepo.checked) currentPetPlayer = Pets.Capipepo;
    else if (ratigueya.checked) currentPetPlayer = Pets.Ratigueya;
    else if (langostelvis.checked) currentPetPlayer = Pets.Langostelvis;
    else if (tucapalma.checked) currentPetPlayer = Pets.Tucapalma;
    else if (pydos.checked) currentPetPlayer = Pets.Pydos;
    else alert('You must select a pet ');

    spanPetPlayer.innerHTML = currentPetPlayer;

    selectPetEnemy();

    SelectPower();
}

function selectPetEnemy() {
    let petRandom = random(1, 6);
    let spanPetEnemy = document.getElementById('pet-enemy');

    if (petRandom == 1) currentPetEnemy = Pets.Hipodoge;
    else if (petRandom == 2) currentPetEnemy = Pets.Capipepo;
    else if (petRandom == 3) currentPetEnemy = Pets.Ratigueya;
    else if (petRandom == 4) currentPetEnemy = Pets.Langostelvis;
    else if (petRandom == 5) currentPetEnemy = Pets.Tucapalma;
    else if (petRandom == 6) currentPetEnemy = Pets.Pydos;

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
    attackPlayer = Powers.Pyro;
    SetPowerEnemy();
}

function powerHydro() {
    attackPlayer = Powers.Hydro;
    SetPowerEnemy();
}

function powerGeo() {
    attackPlayer = Powers.Geo;
    SetPowerEnemy();
}

function powerCryo() {
    attackPlayer = Powers.Cryo;
    SetPowerEnemy();
}

function powerElectro() {
    attackPlayer = Powers.Electro;
    SetPowerEnemy();
}

function SetPowerEnemy() {
    let powerRandom = random(1, 5);

    if (powerRandom == 1) attackEnemy = Powers.Pyro;
    else if (powerRandom == 2) attackEnemy = Powers.Hydro;
    else if (powerRandom == 3) attackEnemy = Powers.Pyro; // Change to GEO
    else if (powerRandom == 4) attackEnemy = Powers.Cryo;
    else if (powerRandom == 5) attackEnemy = Powers.Electro;

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
    } else if (attackPlayer == Powers.Pyro && attackEnemy == Powers.Cryo) {
        result = 'You win🎉';
        livesEnemy--;
        spanLivesEnemy.innerHTML = livesEnemy;
    } else if (attackPlayer == Powers.Hydro && attackEnemy == Powers.Pyro) {
        result = 'You win🎉';
        livesEnemy--;
        spanLivesEnemy.innerHTML = livesEnemy;
    } else if (attackPlayer == Powers.Cryo && attackEnemy == Powers.Electro) {
        result = 'You win🎉';
        livesEnemy--;
        spanLivesEnemy.innerHTML = livesEnemy;
    } else if (attackPlayer == Powers.Electro && attackEnemy == Powers.Hydro) {
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
