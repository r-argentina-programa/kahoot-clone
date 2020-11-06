import React from "react";
import { Link } from "react-router-dom";

const Home = ({ onClickSetPin, pin }) => (
  <React.Fragment>
    <input
      type="text"
      name="pin"
      placeholder="Game PIN"
      value={pin}
      onChange={(event) => onClickSetPin(event.target.value)}
    ></input>
    <Link to="/player/instructions">
      <button>Enter</button>
    </Link>
    <Link to="/newKahoot">
      <button>Create your own Kahoot here!</button>
    </Link>
  </React.Fragment>
);

export default Home;
