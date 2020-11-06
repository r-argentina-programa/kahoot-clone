import React, { useContext } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import { PlayerConnectionContext } from "./PlayerConnectionProvider";

const PlayerGameBoard = () => {
  const { path } = useParams();
  const socket = useContext(PlayerConnectionContext);
  const pin = socket.json.nsp.split("/")[1];

  return (
    <Switch>
      <Route path={path}>
        <React.Fragment>
          <div>Pin: {pin}</div>
          <div>You are in!</div>
          <div>See your nickname on screen?</div>
        </React.Fragment>
      </Route>
    </Switch>
  );
};

export default PlayerGameBoard;
