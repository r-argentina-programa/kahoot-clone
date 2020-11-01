import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import socketIO from "socket.io-client";
import Lobby from "./components/Lobby";
import Trivia from "./components/Trivia";
import Podium from "./components/Podium";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

let ENDPOINT;

if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://localhost:5000";
} else if (process.env.NODE_ENV === "production") {
  ENDPOINT = "inmental-kahoot-clone.herokuapp.com";
}

const socket = socketIO(ENDPOINT);

function App() {
  const [players, setPlayers] = useState([]);
  const [triviaData, setTriviaData] = useState({ options: [] });
  const [podium, setPodium] = useState([]);
  const history = useHistory();

  useEffect(() => {
    socket.on("players", (playersData) => {
      const newPlayers = [...playersData];
      setPlayers(newPlayers);
    });

    socket.on("question", (triviaData) => {
      const newTriviaData = triviaData;
      setTriviaData(newTriviaData);
    });
  }, []);

  const onGameEnd = (result) => {
    setPodium(result);
    history.push("/podium");
  };
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Lobby triviaData={triviaData} socket={socket} players={players} />
        </Route>
        <Route path="/trivia">
          <Trivia
            onGameEnd={onGameEnd}
            triviaData={triviaData}
            socket={socket}
          />
        </Route>
        <Route path="/podium">
          <Podium socket={socket} players={players} ranking={podium} />
        </Route>
      </Switch>
      <Router></Router>
    </div>
  );
}

export default App;
