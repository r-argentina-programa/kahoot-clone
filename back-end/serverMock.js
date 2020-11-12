const express = require('express'); // requiero express
const socketIO = require('socket.io'); // requiero socket.io

const PORT = 5000; // creo un puerto (variable)
const app = express(); // creo la aplicacion
const server = app.listen(PORT, () => console.log(`Listening to port ${PORT}`)); // inicio el servidor

const io = socketIO(server); // configuracion de socketio
let namespace;
let playerSocket;

const trivia = [
  {
    question: 'Which is the biggest planet in the Solar System?',
    options: ['Venus', 'JUPITER', 'Mercury', 'Mars'],
    correct: 1,
  },
  {
    question: 'Which is the largest animal?',
    options: ['Cow', 'Dog', 'Mosquito', 'WHALE'],
    correct: 3,
  },
  {
    question: 'Which is the largest number?',
    options: ['1', '2'],
    correct: 2,
  },
];

app.get('/host-game', (req, res) => {
  // seteo una ruta
  const { pin } = req.query;

  namespace = io.of(`/${pin}`); // io.of('/my-namespace') --> creo un namespace

  namespace.on('connection', (socket) => {
    // escucho conexiones, socket representa un cliente
    console.log('client connected');

    playerSocket = socket;

    socket.join('gameroom'); // me uno a un room
  });

  res.json({ connected: true });
});

app.get('/start-game', (req, res) => {
  const { questionNumber } = req.query;

  namespace.emit('question', {
    // emit es para emitir un evento
    question: trivia[questionNumber].question,
    options: trivia[questionNumber].options,
  });

  res.json({ gameStarted: true });
});

app.get('/next-question', (req, res) => {
  const { questionNumber } = req.query;

  namespace.emit('question', {
    question: trivia[questionNumber].question,
    options: trivia[questionNumber].options,
  });

  res.json({ questionSent: true });
});

app.get('/podium', (req, res) => {
  namespace.emit('podium', {
    0: { name: 'Nicolas Rivarola', score: 3 },
    1: { name: 'Hernan Peralta', score: 2 },
    2: { name: 'Leonel Gauna', score: 1 },
  });

  res.json({ podiumSent: true });
});


//////////////////////// below this is the mock server for the host path

app.get('/trivialist', (req, res) => {
  const { questionNumber } = req.query;

  namespace.emit('question', {
    question: trivia[questionNumber].question,
    options: trivia[questionNumber].options,
  });

  res.json({ questionSent: true });
});

/*
app.get('ruta', (req,res) => {
	// lo que queres hacer cuando llega un request

	// req: request del cliente
	// res: respuesta del servidor

	req.query // objeto que tiene los parametros de la url
	res.json({}) // mandando al cliente un objeto
})
*/
