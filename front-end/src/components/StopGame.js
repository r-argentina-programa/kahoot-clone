import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const StopGame = (props) => {
  const socket = props.socket;

  return (
    <Link to="/">
      <Button
        className="stopGame"
        onClick={() => socket.emit("exit")}
        variant="danger"
      >
        Go back to the Lobby
      </Button>
    </Link>
  );
};

export default StopGame;
