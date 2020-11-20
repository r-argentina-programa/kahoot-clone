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
          if (props.socket) {
            props.socket.disconnect();
            props.setSocket(null);
          }

          if (props.socketUser) {
            props.socketUser.disconnect();
            props.setSocketUser(null);
          }
        }}
      >
        Go back to the Lobby
      </Button>
    </Link>
  );
};

export default StopGame;
