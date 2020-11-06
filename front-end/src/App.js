import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import socketIO from 'socket.io-client';
// import Lobby from './pages/Lobby';
// import Trivia from './pages/Trivia';
import Podium from './pages/Podium';
import CreateTrivia from './components/CreateTrivia';
import HostHome from './pages/HostHome';
import HostChooseTrivia from './pages/HostChooseTrivia';
import HostLobby from './pages/HostLobby';
import UserHome from './pages/UserHome';
import UserLobby from './pages/UserLobby';
import Trivia from './pages/Trivia';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// let ENDPOINT;

// if (process.env.NODE_ENV === 'development') {
//   ENDPOINT = 'http://localhost:5000';
// } else if (process.env.NODE_ENV === 'production') {
//   ENDPOINT = 'inmental-kahoot-clone.herokuapp.com';
// }

// const socket = socketIO(ENDPOINT);

function App() {
  const [trivia, setTrivia] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketUser, setSocketUser] = useState(null);
  const [triviaData, setTriviaData] = useState({ options: [] });
  const [triviaDataUser, setTriviaDataUser] = useState({ options: [] });
  // const [players, setPlayers] = useState([]);
  // const [triviaData, setTriviaData] = useState({ options: [] });
  const [podium, setPodium] = useState([]);
  const history = useHistory();
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

  const onGameEnd = (result) => {
    setPodium(result);
    history.push('/podium');
  };
  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/">
          <Lobby triviaData={triviaData} socket={socket} players={players} />
        </Route>
        <Route exact path="/trivia">
          <Trivia onGameEnd={onGameEnd} triviaData={triviaData} socket={socket} />
        </Route> */}
        <Route path="/podium">
          <Podium socket={socketUser} ranking={podium} />
        </Route>
        <Route exact path="/host">
          <HostHome />
        </Route>
        <Route path="/add-trivia">
          <CreateTrivia />
        </Route>
        <Route path="/host/chooseTrivia">
          <HostChooseTrivia onClickTriviaButton={(selectedTrivia) => setTrivia(selectedTrivia)} />
        </Route>
        <Route path="/host/lobby">
          <HostLobby
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
        <UserLobby setSocketUser={setSocketUser} setTriviaDataUser={setTriviaDataUser} />
      </Route>
      <Route path="/user/trivia">
        <Trivia socket={socketUser} triviaData={triviaDataUser} />
      </Route>
      <Route path="/host/trivia">
        <Trivia socket={socket} triviaData={triviaData} />
      </Route>
    </div>
  );
}

export default App;
