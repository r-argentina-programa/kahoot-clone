import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import NewKahoot from "./pages/NewKahoot";
import HostKahoot from "./pages/HostKahoot";
import Lobby from "./pages/Lobby";
import { ConnectionProvider } from "./pages/ConnectionProvider";
import "./App.css";

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/newKahoot">
        <NewKahoot />
      </Route>
      <Route path="/newKahoot/hostKahoot">
        <HostKahoot />
      </Route>
      <Route path="/lobby/:lobbyId">
        <ConnectionProvider>
          <Lobby />
        </ConnectionProvider>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  </React.Fragment>
);

export default App;
