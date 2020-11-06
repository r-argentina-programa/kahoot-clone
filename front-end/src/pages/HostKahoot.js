import React from "react";
import { Link } from "react-router-dom";

const HostKahoot = () => (
  <React.Fragment>
    <Link to={`/host/lobby`}>
      <button>Trivia 1</button>
    </Link>
  </React.Fragment>
);

export default HostKahoot;
