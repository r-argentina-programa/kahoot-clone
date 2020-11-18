import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import Podium from './pages/Podium';
import HostHome from './pages/HostHome';
import HostChooseTrivia from './pages/HostChooseTrivia';
import HostLobby from './pages/HostLobby';
import UserHome from './pages/UserHome';
import UserLobby from './pages/UserLobby';
import Trivia from './pages/Trivia';
import TriviaUser from './pages/TriviaUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

let BASE_URL;

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'inmental-kahoot-clone.herokuapp.com';
} else if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:5000';
}

function App() {
  const [trivia, setTrivia] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketUser, setSocketUser] = useState(null);
  const [triviaData, setTriviaData] = useState(null);
  const [triviaDataUser, setTriviaDataUser] = useState({ options: [] });
  const [podium, setPodium] = useState([]);
  const history = useHistory();

  const onGameEnd = (result) => {
    setPodium(result);
    history.push('/podium');
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/podium">
          <Podium
            socket={socketUser}
            setSocketUser={setSocketUser}
            setSocket={setSocket}
            ranking={podium}
          />
        </Route>
        <Route exact path="/host">
          <HostHome />
        </Route>
        <Route path="/host/chooseTrivia">
          <HostChooseTrivia onClickTriviaButton={(selectedTrivia) => setTrivia(selectedTrivia)} />
        </Route>
        <Route path="/host/lobby">
          <HostLobby
            BASE_URL={BASE_URL}
            trivia={trivia}
            setSocket={setSocket}
            setTriviaData={setTriviaData}
            socket={socket}
          />
        </Route>
        <Route exact path="/user">
          <UserHome />
        </Route>
      </Switch>
      <Route path="/user/lobby">
        <UserLobby
          BASE_URL={BASE_URL}
          setSocketUser={setSocketUser}
          socketUser={socketUser}
          setTriviaDataUser={setTriviaDataUser}
        />
      </Route>
      <Route path="/user/trivia">
        <TriviaUser
          socket={socketUser}
          socketUser={socketUser}
          onGameEnd={onGameEnd}
          triviaData={triviaDataUser}
          setSocketUser={setSocketUser}
          setSocket={setSocket}
        />
      </Route>
      <Route path="/host/trivia">
        <Trivia
          socketHost={socket}
          onGameEnd={onGameEnd}
          triviaData={triviaData}
          setSocketUser={setSocketUser}
          setSocket={setSocket}
        />
      </Route>
    </div>
  );
}

export default App;

// const [players, setPlayers] = useState([]);
// const [triviaData, setTriviaData] = useState({ options: [] });

/* <Route exact path="/">
          <Lobby triviaData={triviaData} socket={socket} players={players} />
        </Route>
        <Route exact path="/trivia">
          <Trivia onGameEnd={onGameEnd} triviaData={triviaData} socket={socket} />
        </Route> */

// const history = useHistory();

// useEffect(() => {
//   socket.on('players', (playersData) => {
//     const newPlayers = [...playersData];
//     setPlayers(newPlayers);
//   });

//   socket.on('question', (triviaData) => {
//     const newTriviaData = triviaData;
//     setTriviaData(newTriviaData);
//   });

//   socket.on('toTrivia', () => {
//     history.push('/trivia');
//   });
// }, [history]);

// let ENDPOINT;

// if (process.env.NODE_ENV === 'development') {
//   ENDPOINT = 'http://localhost:5000';
// } else if (process.env.NODE_ENV === 'production') {
//   ENDPOINT = 'inmental-kahoot-clone.herokuapp.com';
// }

// const socket = socketIO(ENDPOINT);
