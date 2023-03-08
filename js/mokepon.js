const Pets = {
    Hipodoge: "Hipodoge",
    Capipepo: "Capipepo",
    Ratigueya: "Ratigueya",
    Langostelvis: "Langostelvis",
    Tucapalma: "Tucapalma",
    Pydos: "Pydos",
};

let currentPetPlayer;
let currentPetEnemy;

function startGame() {
    let buttonPetPlayer = document.getElementById("button-pet");
    buttonPetPlayer.addEventListener("click", selectPetPlayer);
}

function selectPetPlayer() {
    let hipodoge = document.getElementById("hipodoge");
    let capipepo = document.getElementById("capipepo");
    let ratigueya = document.getElementById("ratigueya");
    let langostelvis = document.getElementById("langostelvis");
    let tucapalma = document.getElementById("tucapalma");
    let pydos = document.getElementById("pydos");

    let spanPetPlayer = document.getElementById("pet-player");

    if (hipodoge.checked) currentPetPlayer = Pets.Hipodoge;
    else if (capipepo.checked) currentPetPlayer = Pets.Capipepo;
    else if (ratigueya.checked) currentPetPlayer = Pets.Ratigueya;
    else if (langostelvis.checked) currentPetPlayer = Pets.Langostelvis;
    else if (tucapalma.checked) currentPetPlayer = Pets.Tucapalma;
    else if (pydos.checked) currentPetPlayer = Pets.Pydos;
    else alert("You must select a pet ");

    spanPetPlayer.innerHTML = currentPetPlayer;
    
    selectPetEnemy();
}

function selectPetEnemy() {
    let attackRandom = random(1, 6);
    let spanPetEnemy = document.getElementById("pet-enemy");

    if (attackRandom == 1) currentPetEnemy = Pets.Hipodoge;
    else if (attackRandom == 2) currentPetEnemy = Pets.Capipepo;
    else if (attackRandom == 3) currentPetEnemy = Pets.Ratigueya;
    else if (attackRandom == 4) currentPetEnemy = Pets.Langostelvis;
    else if (attackRandom == 5) currentPetEnemy = Pets.Tucapalma;
    else if (attackRandom == 6) currentPetEnemy = Pets.Pydos;

    spanPetEnemy.innerHTML = currentPetEnemy;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", startGame);
