import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Lobby from './components/Lobby';
import Trivia from './components/Trivia';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Traje la conexion del socket aca porque este componente no se desmonta nunca, siempre esta presente. El unico
// momento en donde se desmonta es cuando salis de la pagina.
const socket = socketIO.connect('http://localhost:5000');

function App() {
  const [players, setPlayers] = useState([]);

  // Esto corre una sola vez al montarse el componente (cuando abris el browser y vas a localhost:3000).
  // y tambien corre una sola vez al desmontarse (al salir de la pagina).
  useEffect(() => {
    console.log('Esta linea corre una sola vez');

    // Esto setea la conexion
    socket.on('players', (playersData) => {
      console.log('from App component:', playersData);
      const newPlayers = [...playersData];
      setPlayers(newPlayers);
    });
  }, []); // este array que paso como segundo parametro es lo que hace que el useEffect corra una sola vez.

  const [triviaData, setTriviaData] = useState('');
  socket.on('question', (triviaData) => {
    const newTriviaData = triviaData;
    console.log(triviaData);
    setTriviaData(newTriviaData);
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {/* Aca hago que el componente lobby reciba la lista de jugadores */}
            <Lobby data={triviaData} socket={socket} players={players} />
          </Route>
          <Route path="/trivia">
            <Trivia data={triviaData} socket={socket} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
