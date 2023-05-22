const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const players = [];

class Player {
    constructor(id) {
        this.id = id;
    }

    setCharacter(character) {
        this.character = character;
    }
}

class Character {
    constructor(name) {
        this.name = name;
    }
}

app.get('/join', (req, res) => {
    const id = `${Math.random()}`;
    const player = new Player(id);

    players.push(player);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(id);
});

app.post('/mired/:playerId', (req, res) => {
    const playerId = req.params.playerId || '';
    const name = req.body.character || '';
    const character = new Character(name);

    const playerIndex = players.findIndex((player) => playerId === player.id);

    if (playerId != -1) {
        players[playerIndex].setCharacter(character);
    }

    console.log(players);
    console.log(playerId);

    res.end();
});

app.listen(8080, () => {
    console.log('Start Server');
});
