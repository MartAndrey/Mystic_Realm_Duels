function startGame() {
    let buttonPetPlayer = document.getElementById('button-pet');
    buttonPetPlayer.addEventListener('click', selectPetPlayer);
}

function selectPetPlayer() {
    let hipodoge = document.getElementById('hipodoge');
    let capipepo = document.getElementById('capipepo');
    let ratigueya = document.getElementById('ratigueya');

    let spanPetPlayer = document.getElementById('pet-player');

    if (hipodoge.checked) {
        spanPetPlayer.innerHTML = 'Hipodoge';
    } else if (capipepo.checked) {
        spanPetPlayer.innerHTML = 'Capipepo';
    } else if (ratigueya.checked) {
        spanPetPlayer.innerHTML = 'Ratigueya';
    } else {
        alert("You must select a pet ");
    }

    selectPetEnemy();
}

function selectPetEnemy() {
    let attackRandom = random(1, 3);
    let spanPetEnemy = document.getElementById('pet-enemy');

    if (attackRandom == 1) spanPetEnemy.innerHTML = 'Hipodoge';
    else if (attackRandom == 2) spanPetEnemy.innerHTML = 'Capipepo';
    else if (attackRandom == 3) spanPetEnemy.innerHTML = 'Ratigueya';
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', startGame);
