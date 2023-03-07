function startGame() {
    let buttonPetPlayer = document.getElementById("button-pet");
    buttonPetPlayer.addEventListener("click", selectPetPlayer);
}

function selectPetPlayer() {
    let hipodoge = document.getElementById("hipodoge");
    let capipepo = document.getElementById("capipepo");
    let ratigueya = document.getElementById("ratigueya");

    if (hipodoge.checked) {
        alert("Your choose Hipodoge");
    } else if (capipepo.checked) {
        alert("Your choose Capipepo");
    } else if (ratigueya.checked) {
        alert("Your choose Ratigueya");
    } else {
        alert("You must select a pet ");
    }
}

window.addEventListener("load", startGame);
 