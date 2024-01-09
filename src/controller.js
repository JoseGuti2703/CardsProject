const mysql = require('mysql2');

class CardController {
  // Constructor para inicializar la conexión a MySQL
  constructor() {
    this.db = mysql.createConnection({
      host: process.env.DB_HOST || 'mysql-josebd',
      user: process.env.DB_USER || 'root',
      port: process.env.DB_PORT || '3306',
      password: process.env.DB_PASSWORD || 'j0s34ndr3s',
      database: process.env.DB_DATABASE || 'db_cards',
    });

    // Esperar 10 segundos antes de intentar conectarse a MySQL
    setTimeout(() => {
      this.connectToDatabase();
    }, 10000);
  }

  connectToDatabase() {
    this.db.connect(err => {
      if (err) {
        console.error('Error al conectar a MySQL:', err.message);
      } else {
        console.log('Conexión exitosa a MySQL');
      }
    });
  }

  // constructor() {
  //   // ...
  //   this.selectedCards = new Set(); // Conjunto para almacenar las cartas seleccionadas
  // }
  

  // Función para obtener una carta aleatoria de la base de datos
  async get_random() {
    const query = 'SELECT * FROM cards ORDER BY RAND() LIMIT 1';

    return new Promise((resolve, reject) => {
      this.db.query(query, (err, results) => {
        if (err) {
          console.error(err);
          reject('Error al obtener la carta');
        } else {
          const card = results[0];
          card.power = Math.random().toFixed(8);
          card.description = `${card.number} de ${this.getSuitDescription(card.id_suit)}`;

          // // Verificar si la carta ya ha sido seleccionada
          // if (this.selectedCards.has(card.id)) {
          //   // Si ya fue seleccionada, llamar recursivamente para obtener otra carta
          //   resolve(this.get_random());
          // } else {
          //   // Agregar la carta al conjunto de cartas seleccionadas
          //   this.selectedCards.add(card.id);
          //   resolve(card);
          // }
        }
      });
    });
  }

  // Función para obtener una mano de cartas aleatorias
  async get_hand(callback) {
    try {
      const card = await this.getRandomCard();
      const cards = await this.getRandomCards();
      const chance = this.calculateChance(cards);

      // Dar formato a la respuesta
      const formattedCards = cards.map(card => ({
        id: card.id,
        suit: {
          id: card.id_suit,
          description: this.getSuitDescription(card.id_suit),
        },
        number: card.number,
        power: parseFloat(card.power),
        description: `${card.number} de ${this.getSuitDescription(card.id_suit)}`,
      }));

      const response = {
        cards: formattedCards,
        chance: parseFloat(chance.toFixed(8)),
      };

      callback(null, response);
    } catch (error) {
      console.error(error);
      callback({ error: 'Error al obtener la mano y la chance' });
    }
  }

  // Función para simular una pelea entre dos jugadores
  async get_fight(callback) {
    try {
        // Obtener cartas y probabilidades para el jugador 1
        const cardPlayer1 = await this.getRandomCard();
        const cardsPlayer1 = await this.getRandomCards();
        const chancePlayer1 = this.calculateChance(cardsPlayer1);

        // Dar formato a las cartas del jugador 1
        const player1 = cardsPlayer1.map(card => ({
            id: card.id,
            suit: {
                id: card.id_suit,
                description: this.getSuitDescription(card.id_suit),
            },
            number: card.number,
            power: parseFloat(card.power),
            description: `${card.number} de ${this.getSuitDescription(card.id_suit)}`,
        }));

        // Obtener cartas y probabilidades para el jugador 2
        const cardPlayer2 = await this.getRandomCard(); 
        const cardsPlayer2 = await this.getRandomCards(); 
        const chancePlayer2 = this.calculateChance(cardsPlayer2); 

        // Dar formato a las cartas del jugador 2
        const player2 = cardsPlayer2.map(card => ({
            id: card.id,
            suit: {
                id: card.id_suit,
                description: this.getSuitDescription(card.id_suit),
            },
            number: card.number,
            power: parseFloat(card.power),
            description: `${card.number} de ${this.getSuitDescription(card.id_suit)}`,
        }));

        // Determinar al ganador
        let winner;
        if (chancePlayer1 > chancePlayer2) {
            winner = "player1";
        } else if (chancePlayer2 > chancePlayer1) {
            winner = "player2";
        } else {
            winner = "tie";
        }

        // Construir la respuesta Winner
        const response = {
            player1: {
                cards: player1,
                chance: parseFloat(chancePlayer1.toFixed(8)),
            },
            player2: {
                cards: player2,
                chance: parseFloat(chancePlayer2.toFixed(8)),
            },
            winner: winner,
        };

        callback(null, response);
    } catch (error) {
        console.error(error);
        callback({ error: 'Error al ejecutar la pelea' });
    }
  }

  // Función para obtener una carta aleatoria
  async getRandomCard() {
    const card = await this.get_random();
    return card;
  }

  // Función para obtener un conjunto de cartas aleatorias
  async getRandomCards() {
    const cards = await Promise.all(Array.from({ length: 3 }, () => this.getRandomCard()));
    return cards;
  }

  // Función para calcular la probabilidad promedio de un conjunto de cartas
  calculateChance(hand) {
    const powerSum = hand.reduce((sum, card) => sum + parseFloat(card.power), 0);
    const chance = powerSum / hand.length;
    return parseFloat(chance.toFixed(8));
  }

  // Función para obtener la descripción de un palo según su id
  getSuitDescription(id_suit) {
    switch (id_suit) {
      case 1:
        return 'oros';
      case 2:
        return 'espadas';
      case 3:
        return 'copas';
      case 4:
        return 'bastos';
      default:
        return '';
    }
  }
}

module.exports = CardController;
