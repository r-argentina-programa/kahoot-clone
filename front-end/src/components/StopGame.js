import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const StopGame = (props) => {
  return (
    <Link to="/">
      <Button
        className="stopGame"
        variant="danger"
        onClick={() => {
          props.socket.disconnect();
          props.setSocketUser(null);
          props.setSocket(null);
        }}
      >
        Go back to the Lobby
      </Button>
    </Link>
  );
};

export default StopGame;
