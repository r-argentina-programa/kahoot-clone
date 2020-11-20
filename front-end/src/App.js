import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
// import socketIO from 'socket.io-client';
// import Lobby from './pages/Lobby';
// import Trivia from './pages/Trivia';
import Home from "./pages/Home";
import Podium from "./pages/Podium";
import HostHome from "./pages/HostHome";
import HostChooseTrivia from "./pages/HostChooseTrivia";
import HostLobby from "./pages/HostLobby";
import UserHome from "./pages/UserHome";
import UserLobby from "./pages/UserLobby";
import Trivia from "./pages/Trivia";
import TriviaUser from "./pages/TriviaUser";
import DashBoard from "./pages/DashBoard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

let BASE_URL;

if (process.env.NODE_ENV === "production") {
  BASE_URL = "inmental-kahoot-clone.herokuapp.com";
} else if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:5000";
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
    history.push("/podium");
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
          <HostChooseTrivia
            onClickTriviaButton={(selectedTrivia) => setTrivia(selectedTrivia)}
          />
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
        <Route path="/admin/stats">
          <DashBoard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
