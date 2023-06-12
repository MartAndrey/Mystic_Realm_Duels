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

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
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

app.post('/mired/:playerId/position', (req, res) => {
    const playerId = req.params.playerId || '';
    const x = req.body.x || 0;
    const y = req.body.y || 0;

    const playerIndex = players.findIndex((player) => playerId === player.id);

    if (playerId != -1) {
        players[playerIndex].updatePosition(x, y);
    }

    const enemies = players.filter((player) => playerId !== player.id);

    res.send({ enemies });
});

app.listen(8080, () => {
    console.log('Start Server');
});


// app.get('/EndPoint/', (req, res) => {
//     const playerId = req.params.playerId || '';
//     const player = players.find((player) => player.id === playerId)

//     res.send({'Attack or powwer || []' : ''})
// })
