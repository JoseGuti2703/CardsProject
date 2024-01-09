//app.js

const express = require('express');
const CardController = require('./controller.js'); // Asegúrate de que la ruta del controlador sea correcta

const app = express();
const port = 8000;

// Crear instancias de CardController para diferentes propósitos
const cardController = new CardController(); // Para obtener una carta aleatoria
const gameController = new CardController(); // Para simular un juego y obtener una mano de tres cartas
const fightController = new CardController(); // Para simular una pelea entre dos jugadores 

// Ruta para obtener una carta aleatoria
app.get('/cards', (req, res) => {
  cardController.get_random()
    .then(card => {
      res.json(card);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error al obtener la carta' });
    });
});

// Ruta para simular un juego y obtener una mano de tres cartas
app.get('/game', (req, res) => {
  gameController.get_hand((err, gameData) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    res.json(gameData);
  });
});

// Ruta para simular una pelea entre dos jugadores
app.get('/fight', (req, res) => {
  fightController.get_fight((err, result) => {
    if (err) {
      res.status(500).json(err);
      return ;
    }
    result.player1.cards.forEach((card1) => {
      if (result.player2.cards.find(card2 => card1.id === card2.id)) {
        console.log("Los players tiene una carta igual")
      }
    });
    res.json(result);
  });
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
