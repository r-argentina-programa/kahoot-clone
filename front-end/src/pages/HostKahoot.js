import React from "react";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

function generateLobbyId() {
  return v4();
}

const HostKahoot = () => {
  const lobbyId = generateLobbyId();
  return (
    <React.Fragment>
      <Link to={`/lobby/${lobbyId}`}>
        <button>Trivia 1</button>
      </Link>
    </React.Fragment>
  );
};

export default HostKahoot;
