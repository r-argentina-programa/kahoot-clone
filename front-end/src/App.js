import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import NewKahoot from "./pages/NewKahoot";
import HostKahoot from "./pages/HostKahoot";
import Lobby from "./pages/Lobby";
import PlayerGameBoard from "./pages/PlayerGameBoard";
import { ConnectionProvider } from "./pages/ConnectionProvider";
import { PlayerConnectionProvider } from "./pages/PlayerConnectionProvider";
import "./App.css";

const App = () => {
  const [pin, setPin] = useState("");

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/">
          <Home onClickSetPin={setPin} pin={pin} />
        </Route>
        <Route exact path="/newKahoot">
          <NewKahoot />
        </Route>
        <Route path="/newKahoot/hostKahoot">
          <HostKahoot />
        </Route>
        <Route path="/host/lobby">
          <ConnectionProvider>
            <Lobby />
          </ConnectionProvider>
        </Route>
        <Route to="/player/instructions">
          <PlayerConnectionProvider pin={pin}>
            <PlayerGameBoard />
          </PlayerConnectionProvider>
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default App;
