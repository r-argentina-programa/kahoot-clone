import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ConnectionContext } from "./ConnectionProvider";

const Lobby = () => {
  const socket = useContext(ConnectionContext);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <React.Fragment>
      <div>Pin:</div>
      <Link to="#">
        <button>Start</button>
      </Link>
    </React.Fragment>
  );
};
export default Lobby;
