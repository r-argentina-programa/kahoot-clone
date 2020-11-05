import React from "react";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

function generateTriviaId() {
  return v4();
}

const HostKahoot = () => {
  const triviaId = generateTriviaId();
  return (
    <React.Fragment>
      <Link to={`/lobby/${triviaId}`}>
        <button>Trivia 1</button>
      </Link>
    </React.Fragment>
  );
};

export default HostKahoot;
