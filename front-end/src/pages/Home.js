import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [pin, setPin] = useState("");

  return (
    <React.Fragment>
      <form method="POST" action="/pin">
        <input
          type="text"
          name="pin"
          placeholder="Game PIN"
          value={pin}
          onChange={(event) => setPin(event.target.value)}
        ></input>
        <button>Enter</button>
      </form>
      <Link to="/newKahoot">
        <button>Create your own Kahoot here!</button>
      </Link>
    </React.Fragment>
  );
};

export default Home;
